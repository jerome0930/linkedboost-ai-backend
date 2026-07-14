import { getAccountForUser } from "../../../lib/account.js";
import { requireUser } from "../../../lib/auth.js";
import { assertAllowedOrigin, jsonResponse, optionsResponse } from "../../../lib/cors.js";
import { errorResponse } from "../../../lib/errors.js";
import { getAppUrl } from "../../../lib/app-url.js";
import { stripe } from "../../../lib/stripe.js";

export const runtime = "nodejs";
export function OPTIONS(request) { return optionsResponse(request); }

export async function POST(request) {
  try {
    assertAllowedOrigin(request);
    const user = await requireUser(request);
    const { data } = await getAccountForUser(user);
    if (!data.stripeCustomerId) {
      const error = new Error("No Stripe customer exists for this account yet.");
      error.status = 404;
      error.code = "NO_STRIPE_CUSTOMER";
      throw error;
    }

    const appUrl = getAppUrl(request);
    const session = await stripe.billingPortal.sessions.create({
      customer: data.stripeCustomerId,
      return_url: `${appUrl}/success`,
    });
    return jsonResponse(request, { url: session.url });
  } catch (error) {
    return errorResponse(request, error);
  }
}
