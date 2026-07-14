import { getAccountForUser, getOrCreateStripeCustomer } from "../../../lib/account.js";
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
    const { interval } = await request.json();
    if (!["monthly", "yearly"].includes(interval)) {
      const error = new Error("Choose monthly or yearly billing.");
      error.status = 400;
      error.code = "INVALID_INTERVAL";
      throw error;
    }

    const { ref, data, account } = await getAccountForUser(user);
    if (account.isPro) {
      const error = new Error("This account already has an active Pro subscription. Use Manage Subscription.");
      error.status = 409;
      error.code = "ALREADY_SUBSCRIBED";
      throw error;
    }

    const priceId = interval === "yearly"
      ? process.env.STRIPE_YEARLY_PRICE_ID
      : process.env.STRIPE_MONTHLY_PRICE_ID;
    if (!priceId) throw new Error("Stripe pricing is not configured.");
    const appUrl = getAppUrl(request);

    const customer = await getOrCreateStripeCustomer(user, ref, data);
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customer.id,
      client_reference_id: user.uid,
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/cancel`,
      metadata: { firebaseUid: user.uid, interval },
      subscription_data: { metadata: { firebaseUid: user.uid } },
    });

    return jsonResponse(request, { url: session.url });
  } catch (error) {
    return errorResponse(request, error);
  }
}
