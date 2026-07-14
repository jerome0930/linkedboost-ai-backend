import { restorePurchaseForUser } from "../../../lib/account.js";
import { requireUser } from "../../../lib/auth.js";
import { assertAllowedOrigin, jsonResponse, optionsResponse } from "../../../lib/cors.js";
import { errorResponse } from "../../../lib/errors.js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export function OPTIONS(request) { return optionsResponse(request); }

export async function POST(request) {
  try {
    assertAllowedOrigin(request);
    const user = await requireUser(request);
    const result = await restorePurchaseForUser(user);
    return jsonResponse(request, result);
  } catch (error) {
    return errorResponse(request, error);
  }
}
