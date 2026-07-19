import { EmailLink, PageHero, SiteShell } from "../site.js";

export default function Privacy() {
  return (
    <SiteShell>
      <PageHero eyebrow="Policy" title="Privacy Policy">
        <p className="meta">Last updated: July 19, 2026</p>
        <p>
          This policy explains how LinkedBoost AI processes information for its
          Chrome extension, public website, accounts, subscriptions, and AI generation features.
        </p>
      </PageHero>

      <div className="page-inner">
        <section className="page-section" aria-labelledby="privacy-data">
          <h2 id="privacy-data">Information processed</h2>
          <p>
            LinkedBoost AI uses Firebase Authentication so users can sign in with
            an email address and password. The backend verifies Firebase ID tokens
            before serving account, billing, and AI generation requests.
          </p>
          <p>
            The backend stores account records in Firestore. Based on the current
            code, those records can include account email address, Firebase user
            identifier, plan, subscription status, Stripe customer ID, Stripe
            subscription ID, cancellation status, current subscription period end,
            current usage month, monthly AI generation count, creation time, and
            update time.
          </p>
          <p>
            The Chrome extension stores some information locally in Chrome storage,
            including the Firebase auth session, cached subscription status, and
            saved draft input/output. Local drafts remain on the user's device
            unless the user submits text to an AI feature.
          </p>
        </section>

        <section className="page-section" aria-labelledby="privacy-ai">
          <h2 id="privacy-ai">AI generation</h2>
          <p>
            When a user runs an AI feature, the submitted draft text, selected
            feature, and LinkedBoost AI prompt instructions are sent to the
            LinkedBoost AI backend. The backend sends that request to OpenAI to
            generate the result. The current backend does not intentionally save
            submitted draft text or generated AI output in Firestore.
          </p>
          <p>
            The backend increments the monthly usage count before a generation
            request and refunds that count if the AI request fails.
          </p>
        </section>

        <section className="page-section" aria-labelledby="privacy-billing">
          <h2 id="privacy-billing">Payments and subscriptions</h2>
          <p>
            Stripe processes subscription checkout, billing portal sessions,
            subscription status, customer records, cancellation status, and billing
            period information. Payment-card details are entered directly through
            Stripe and are not received by LinkedBoost AI's backend.
          </p>
          <p>
            LinkedBoost AI stores Stripe customer and subscription identifiers so
            accounts can be restored, subscription status can be checked, and Pro
            access can remain active until the paid billing period ends.
          </p>
        </section>

        <section className="page-section" aria-labelledby="privacy-use">
          <h2 id="privacy-use">How information is used</h2>
          <ul className="policy-list">
            <li>Authenticate users and protect account-specific endpoints.</li>
            <li>Show account plan, subscription status, cancellation status, and usage.</li>
            <li>Process checkout, billing portal, webhook, and restore-purchase flows.</li>
            <li>Enforce the Free and Pro monthly AI generation limits.</li>
            <li>Send submitted draft text to OpenAI only when an AI feature is used.</li>
            <li>Respond to support requests sent by email.</li>
          </ul>
        </section>

        <section className="page-section" aria-labelledby="privacy-providers">
          <h2 id="privacy-providers">Service providers</h2>
          <p>
            LinkedBoost AI uses Firebase for authentication and Firestore account
            data, Stripe for subscriptions and billing, OpenAI for AI text
            generation, and Vercel for hosting the public website and backend API.
            These providers process information under their own terms and policies.
          </p>
        </section>

        <section className="page-section" aria-labelledby="privacy-contact">
          <h2 id="privacy-contact">Contact</h2>
          <p>
            For privacy questions or account-data requests, email <EmailLink />.
            Stripe may retain transaction records as required by law.
          </p>
        </section>
      </div>
    </SiteShell>
  );
}
