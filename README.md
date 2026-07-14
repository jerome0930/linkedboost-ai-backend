# LinkedBoost AI backend

This backend verifies Firebase users, creates Stripe Checkout and Customer Portal sessions, tracks monthly AI usage in Firestore, verifies Stripe webhooks, and calls OpenAI without exposing secret keys to the Chrome extension.

## 1. Create Stripe prices in Sandbox

Create one product named **LinkedBoost Pro** with two recurring prices:

- $7.99 monthly
- $59 yearly

Copy both `price_...` IDs.

## 2. Get Firebase Admin credentials

Firebase Console → Project settings → Service accounts → Generate new private key.

Do not place the downloaded JSON in the Chrome extension or commit it to GitHub. Copy these three values into Vercel environment variables:

- `project_id` → `FIREBASE_PROJECT_ID`
- `client_email` → `FIREBASE_CLIENT_EMAIL`
- `private_key` → `FIREBASE_PRIVATE_KEY`

## 3. Deploy to Vercel

Create a GitHub repository from this folder and import it into Vercel, or use the Vercel CLI. Set every variable from `.env.example` in Vercel Project Settings → Environment Variables.

Recommended Vercel project name: `linkedboost-ai-api-jerome`. After deployment, use `/privacy` as the Chrome Web Store privacy-policy URL and review the policy text before publishing.

## 4. Configure Stripe webhook

After deployment, create a Stripe Sandbox webhook destination:

`https://YOUR-VERCEL-DOMAIN.vercel.app/api/stripe-webhook`

Subscribe to:

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

Copy its `whsec_...` signing secret to `STRIPE_WEBHOOK_SECRET` in Vercel and redeploy.

## 5. Configure Stripe Customer Portal

Stripe Sandbox → Settings → Billing → Customer portal. Enable payment-method updates, invoice history, and subscription cancellation.

## 6. Configure the extension

In the extension's `config.js`, paste the Firebase Web API key and the exact deployed Vercel URL. The same Vercel hostname must be listed under `host_permissions` in `manifest.json`.

For unpacked testing, find the temporary extension ID at `chrome://extensions` and add its origin to `ALLOWED_ORIGINS`, separated by a comma:

`chrome-extension://kobkbgiclonfgcpkbmjiodmjioggjhfm,chrome-extension://YOUR_TEST_ID`

## 7. Test in Sandbox

1. Load the extension unpacked.
2. Create an email/password account.
3. Use all 3 free AI generations.
4. Confirm generation 4 opens the upgrade modal.
5. Buy monthly Pro using Stripe test card `4242 4242 4242 4242`, any future expiration, any CVC.
6. Confirm the webhook changes the Firestore user to `active` and the extension shows 100 monthly generations.
7. Open Manage Subscription, cancel through the portal, and confirm access updates correctly.
8. Repeat for the yearly price.

Only after this works should you activate the Stripe live account, create live prices and a live webhook, replace the sandbox environment variables with live values, and submit extension version 1.3.0.
