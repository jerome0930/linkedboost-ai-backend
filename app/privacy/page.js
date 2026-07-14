const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "jeromeevans179@gmail.com";

export default function Privacy() {
  return <main style={{ maxWidth: 760, margin: "60px auto", padding: 24, lineHeight: 1.6 }}>
    <h1>LinkedBoost AI Privacy Policy</h1>
    <p><strong>Last updated:</strong> July 13, 2026</p>
    <h2>Information processed</h2>
    <p>LinkedBoost AI processes your account email address, Firebase user identifier, subscription status, monthly AI usage count, and Stripe customer and subscription identifiers. Payment-card information is entered directly into Stripe and is not received by LinkedBoost AI.</p>
    <p>When you use an AI feature, the draft text you submit is sent through the LinkedBoost AI server to OpenAI to generate the requested result. LinkedBoost AI does not intentionally save the submitted draft text in Firestore. Drafts saved by the extension remain in Chrome local storage on your device.</p>
    <h2>How information is used</h2>
    <p>Information is used to authenticate accounts, provide the extension, enforce usage limits, process and manage subscriptions, prevent abuse, respond to support requests, and generate AI-assisted writing results.</p>
    <h2>Service providers</h2>
    <p>LinkedBoost AI uses Google Firebase for authentication and account data, Stripe for payments and subscription management, Vercel for hosting, and OpenAI for AI text generation. These providers process information under their own terms and privacy policies.</p>
    <h2>Retention and deletion</h2>
    <p>Account, subscription, and usage records are retained while needed to provide the service, meet legal obligations, resolve disputes, and prevent abuse. To request account-data deletion, contact the address below. Stripe may retain transaction records as legally required.</p>
    <h2>Security</h2>
    <p>Secret API keys remain on the server. No online system is guaranteed to be completely secure, but reasonable safeguards are used to limit unauthorized access.</p>
    <h2>Contact</h2>
    <p>Email: <a href={`mailto:${supportEmail}`}>{supportEmail}</a></p>
    <p><a href="/terms">Terms of Service</a></p>
  </main>;
}
