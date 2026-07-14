const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "jeromeevans179@gmail.com";

export default function Terms() {
  return <main style={{ maxWidth: 760, margin: "60px auto", padding: 24, lineHeight: 1.6 }}>
    <h1>LinkedBoost AI Terms of Service</h1>
    <p><strong>Last updated:</strong> July 13, 2026</p>
    <h2>Service</h2>
    <p>LinkedBoost AI provides formatting and AI-assisted writing tools for LinkedIn content. AI-generated output can contain mistakes. You are responsible for reviewing content before publishing it and for ensuring that your posts are accurate, lawful, and appropriate.</p>
    <h2>Accounts</h2>
    <p>You are responsible for your account credentials and activity. Do not use the service to violate laws, impersonate others, misrepresent qualifications or achievements, distribute spam, or infringe third-party rights.</p>
    <h2>Subscriptions</h2>
    <p>LinkedBoost Pro renews automatically at the billing interval shown during checkout until canceled. You can manage or cancel through the Stripe Customer Portal. Cancellation normally takes effect at the end of the current paid billing period unless Stripe or applicable law provides otherwise.</p>
    <h2>Availability and changes</h2>
    <p>Features, usage limits, prices, and availability may change. Material pricing changes will apply as communicated through the service or billing flow.</p>
    <h2>Contact</h2>
    <p>Email: <a href={`mailto:${supportEmail}`}>{supportEmail}</a></p>
    <p><a href="/privacy">Privacy Policy</a></p>
  </main>;
}
