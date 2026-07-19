import { EmailLink, PageHero, SiteShell } from "../site.js";

export default function Terms() {
  return (
    <SiteShell>
      <PageHero eyebrow="Terms" title="Terms of Service">
        <p className="meta">Last updated: July 19, 2026</p>
        <p>
          These terms apply to LinkedBoost AI, a Chrome extension and hosted
          backend service for creating and improving LinkedIn posts.
        </p>
      </PageHero>

      <div className="page-inner">
        <section className="page-section" aria-labelledby="terms-service">
          <h2 id="terms-service">Service</h2>
          <p>
            LinkedBoost AI provides formatting tools and AI-assisted writing tools
            for LinkedIn content. AI-generated output can contain mistakes. Users
            are responsible for reviewing content before publishing and for making
            sure posts are accurate, lawful, and appropriate.
          </p>
        </section>

        <section className="page-section" aria-labelledby="terms-accounts">
          <h2 id="terms-accounts">Accounts and acceptable use</h2>
          <p>
            Users are responsible for their account credentials and activity. Do
            not use LinkedBoost AI to violate laws, impersonate others, misrepresent
            qualifications or achievements, distribute spam, or infringe third-party
            rights.
          </p>
        </section>

        <section className="page-section" aria-labelledby="terms-plans">
          <h2 id="terms-plans">Plans and subscriptions</h2>
          <p>
            The Free plan includes 3 AI generations per month. LinkedBoost Pro
            includes 100 AI generations per month and is available for $7.99
            monthly or $59 yearly.
          </p>
          <p>
            Pro subscriptions renew automatically at the selected billing interval
            until canceled through Stripe. Cancellation prevents future renewals,
            and Pro remains active until the current paid billing period ends.
          </p>
        </section>

        <section className="page-section" aria-labelledby="terms-refunds">
          <h2 id="terms-refunds">Refunds</h2>
          <p>
            Subscription payments are non-refundable except where required by law.
            See the <a className="contact-link" href="/refund-policy">Refund Policy</a>
            for more details.
          </p>
        </section>

        <section className="page-section" aria-labelledby="terms-contact">
          <h2 id="terms-contact">Contact</h2>
          <p>Questions about these terms can be sent to <EmailLink />.</p>
        </section>
      </div>
    </SiteShell>
  );
}
