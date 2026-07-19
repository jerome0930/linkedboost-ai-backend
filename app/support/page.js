import { EmailLink, PageHero, SiteShell, SUPPORT_EMAIL } from "../site.js";

const supportTopics = [
  {
    title: "Account access",
    body: "Get help signing in, resetting your password, or restoring a subscription to the correct account.",
  },
  {
    title: "Billing and cancellation",
    body: "Ask about Stripe checkout, customer portal access, renewal status, cancellation, or Pro access through the paid period.",
  },
  {
    title: "Extension support",
    body: "Report issues with formatting tools, Pro AI tools, monthly usage counts, or extension setup.",
  },
];

export default function Support() {
  return (
    <SiteShell>
      <PageHero eyebrow="Support" title="Support">
        <p>
          Email <EmailLink /> for LinkedBoost AI account, billing, subscription,
          and Chrome extension support.
        </p>
      </PageHero>

      <div className="page-inner">
        <section className="page-section" aria-labelledby="support-email">
          <h2 id="support-email">Contact support</h2>
          <p>
            Send a message to <a className="contact-link" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
            Include the email address on your LinkedBoost AI account and a short
            description of what happened.
          </p>
        </section>

        <section className="page-section" aria-labelledby="support-topics">
          <h2 id="support-topics">What we can help with</h2>
          <div className="support-grid">
            {supportTopics.map((topic) => (
              <article className="support-card" key={topic.title}>
                <h3>{topic.title}</h3>
                <p>{topic.body}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
