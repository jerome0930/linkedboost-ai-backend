import { FieldValue } from "firebase-admin/firestore";
import { db } from "./firebase-admin.js";
import { stripe } from "./stripe.js";

export function currentUsageMonth() {
  return new Date().toISOString().slice(0, 7);
}

export function isProStatus(status) {
  return status === "active" || status === "trialing";
}

export function usageLimits() {
  return {
    free: Math.max(0, Number(process.env.FREE_MONTHLY_LIMIT || 3)),
    pro: Math.max(1, Number(process.env.PRO_MONTHLY_LIMIT || 100)),
  };
}

export async function ensureUserDocument(decodedUser) {
  const ref = db.collection("users").doc(decodedUser.uid);
  const snap = await ref.get();
  if (!snap.exists) {
    await ref.set({
      email: decodedUser.email || null,
      plan: "free",
      subscriptionStatus: "inactive",
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      cancelAtPeriodEnd: false,
      currentPeriodEnd: null,
      usage: { month: currentUsageMonth(), count: 0 },
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
  } else if (decodedUser.email && snap.data().email !== decodedUser.email) {
    await ref.set({ email: decodedUser.email, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
  }
  return ref;
}

export function publicAccount(data = {}) {
  const month = currentUsageMonth();
  const count = data.usage?.month === month ? Number(data.usage?.count || 0) : 0;
  const isPro = isProStatus(data.subscriptionStatus);
  const limits = usageLimits();
  const limit = isPro ? limits.pro : limits.free;

  return {
    plan: isPro ? "pro" : "free",
    isPro,
    subscriptionStatus: data.subscriptionStatus || "inactive",
    usageCount: count,
    usageLimit: limit,
    usageRemaining: Math.max(0, limit - count),
    usageMonth: month,
    cancelAtPeriodEnd: Boolean(data.cancelAtPeriodEnd),
    currentPeriodEnd: data.currentPeriodEnd || null,
  };
}

export async function getAccountForUser(decodedUser) {
  const ref = await ensureUserDocument(decodedUser);
  const snap = await ref.get();
  return { ref, data: snap.data(), account: publicAccount(snap.data()) };
}

export async function getOrCreateStripeCustomer(decodedUser, userRef, userData) {
  if (userData.stripeCustomerId) {
    try {
      const customer = await stripe.customers.retrieve(userData.stripeCustomerId);
      if (!customer.deleted) return customer;
    } catch {
      // Create a replacement below if the stored customer no longer exists.
    }
  }

  const customer = await stripe.customers.create({
    email: decodedUser.email || undefined,
    metadata: { firebaseUid: decodedUser.uid },
  });
  await userRef.set({
    stripeCustomerId: customer.id,
    updatedAt: FieldValue.serverTimestamp(),
  }, { merge: true });
  return customer;
}

async function uidFromCustomer(customerId) {
  if (!customerId) return null;
  try {
    const customer = await stripe.customers.retrieve(customerId);
    return customer.deleted ? null : customer.metadata?.firebaseUid || null;
  } catch {
    return null;
  }
}

export async function syncSubscription(subscription) {
  const customerId = typeof subscription.customer === "string"
    ? subscription.customer
    : subscription.customer?.id;
  const uid = subscription.metadata?.firebaseUid || await uidFromCustomer(customerId);
  if (!uid) return false;

  const currentPeriodEnd = subscription.current_period_end
    ? new Date(subscription.current_period_end * 1000).toISOString()
    : null;

  await db.collection("users").doc(uid).set({
    plan: isProStatus(subscription.status) ? "pro" : "free",
    subscriptionStatus: subscription.status || "inactive",
    stripeCustomerId: customerId || null,
    stripeSubscriptionId: subscription.id,
    cancelAtPeriodEnd: Boolean(subscription.cancel_at_period_end),
    currentPeriodEnd,
    updatedAt: FieldValue.serverTimestamp(),
  }, { merge: true });
  return true;
}
