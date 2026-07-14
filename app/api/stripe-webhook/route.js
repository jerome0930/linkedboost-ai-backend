import { syncSubscription } from "../../../lib/account.js";
import { stripe } from "../../../lib/stripe.js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  const signature = request.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !secret) return new Response("Webhook is not configured.", { status: 400 });

  let event;
  try {
    const payload = await request.text();
    event = stripe.webhooks.constructEvent(payload, signature, secret);
  } catch (error) {
    console.error("STRIPE_SIGNATURE_ERROR", error.message);
    return new Response("Invalid webhook signature.", { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      if (session.subscription) {
        const subscription = await stripe.subscriptions.retrieve(session.subscription);
        await syncSubscription(subscription, {
          firebaseUid: session.client_reference_id || session.metadata?.firebaseUid,
        });
      }
    } else if ([
      "customer.subscription.created",
      "customer.subscription.updated",
      "customer.subscription.deleted",
    ].includes(event.type)) {
      await syncSubscription(event.data.object);
    }
  } catch (error) {
    console.error("STRIPE_WEBHOOK_HANDLER_ERROR", error.message);
    return new Response("Webhook handler failed.", { status: 500 });
  }

  return Response.json({ received: true });
}
