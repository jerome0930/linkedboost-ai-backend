import { EmailLink, PageHero, SiteShell } from "../site.js";

export default function RefundPolicy() {
  return (
    <SiteShell>
      <PageHero eyebrow="Billing" title="Refund Policy">
        <p className="meta">Last updated: July 19, 2026</p>
        <p>
          This policy applies to LinkedBoost Pro subscription payments for
          LinkedBoost AI.
        </p>
      </PageHero>

      <div className="page-inner">
        <section className="page-section" aria-labelledby="refund-policy">
          <h2 id="refund-policy">Subscription payments</h2>
          <p>
            Subscription payments are non-refundable except where required by law.
            Customers may cancel anytime through Stripe subscription management.
          </p>
          <p>
            Cancellation prevents future renewals. Pro access remains active until
            the current paid billing period ends.
          </p>
        </section>

        <section className="page-section" aria-labelledby="refund-help">
          <h2 id="refund-help">Billing help</h2>
          <p>
            For billing questions or help locating your subscription, email
            {" "}<EmailLink />.
          </p>
        </section>
      </div>
    </SiteShell>
  );
}
