import { FieldValue } from "firebase-admin/firestore";
import { currentUsageMonth, ensureUserDocument, isProStatus, publicAccount, usageLimits } from "../../../lib/account.js";
import { requireUser } from "../../../lib/auth.js";
import { assertAllowedOrigin, jsonResponse, optionsResponse } from "../../../lib/cors.js";
import { db } from "../../../lib/firebase-admin.js";
import { errorResponse } from "../../../lib/errors.js";
import { createTextResponse } from "../../../lib/openai.js";
import { buildPrompt } from "../../../lib/prompts.js";

export const runtime = "nodejs";
export const maxDuration = 30;
export function OPTIONS(request) { return optionsResponse(request); }

async function reserveGeneration(userRef) {
  const month = currentUsageMonth();
  return db.runTransaction(async (transaction) => {
    const snap = await transaction.get(userRef);
    const data = snap.data() || {};
    const isPro = isProStatus(data.subscriptionStatus);
    const limit = isPro ? usageLimits().pro : usageLimits().free;
    const count = data.usage?.month === month ? Number(data.usage?.count || 0) : 0;

    if (count >= limit) {
      const error = new Error(isPro
        ? "You reached this month's AI generation limit."
        : "You used all free AI generations. Upgrade to LinkedBoost Pro to continue.");
      error.status = 402;
      error.code = "QUOTA_EXCEEDED";
      throw error;
    }

    transaction.set(userRef, {
      usage: { month, count: count + 1 },
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });
    return { month };
  });
}

async function refundGeneration(userRef, reservation) {
  try {
    await db.runTransaction(async (transaction) => {
      const snap = await transaction.get(userRef);
      const data = snap.data() || {};
      if (data.usage?.month !== reservation.month) return;
      const current = Number(data.usage?.count || 0);
      transaction.set(userRef, {
        usage: { month: reservation.month, count: Math.max(0, current - 1) },
        updatedAt: FieldValue.serverTimestamp(),
      }, { merge: true });
    });
  } catch {
    // Do not hide the original AI error if a best-effort quota refund fails.
  }
}

export async function POST(request) {
  let userRef;
  let reservation;
  try {
    assertAllowedOrigin(request);
    const user = await requireUser(request);
    const body = await request.json();
    const featureId = String(body.featureId || "");
    const text = String(body.text || "").trim();
    if (!text) {
      const error = new Error("Enter a post or draft first.");
      error.status = 400;
      error.code = "EMPTY_TEXT";
      throw error;
    }
    if (text.length > 12000) {
      const error = new Error("The draft is too long. Keep it under 12,000 characters.");
      error.status = 400;
      error.code = "TEXT_TOO_LONG";
      throw error;
    }

    const prompt = buildPrompt(featureId, text);
    userRef = await ensureUserDocument(user);
    reservation = await reserveGeneration(userRef);
    const generated = await createTextResponse(prompt);
    const updated = await userRef.get();

    return jsonResponse(request, {
      text: generated,
      account: publicAccount(updated.data()),
    });
  } catch (error) {
    if (userRef && reservation) {
      await refundGeneration(userRef, reservation);
    }
    return errorResponse(request, error);
  }
}
