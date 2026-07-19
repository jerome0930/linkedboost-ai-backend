import { EmailLink, SiteShell } from "./site.js";

const features = [
  {
    title: "Create stronger posts",
    body: "Rewrite drafts, sharpen hooks, adjust tone, generate CTAs, add hashtags, expand ideas, and condense long posts.",
  },
  {
    title: "Built for LinkedIn",
    body: "LinkedBoost AI keeps the workflow focused on professional posts, recruiter visibility, and clear business writing.",
  },
  {
    title: "Simple subscription tools",
    body: "Free users get 3 AI generations each month. Pro users get 100 generations with Stripe-powered subscription management.",
  },
];

const plans = [
  {
    title: "Free",
    price: "$0",
    detail: "3 AI generations per month",
    items: ["Formatting tools", "Post templates", "Local draft saving"],
  },
  {
    title: "Pro Monthly",
    price: "$7.99",
    detail: "100 AI generations per month",
    items: ["AI rewrites and tones", "Hooks, CTAs, hashtags", "Expand and condense tools"],
    highlight: true,
  },
  {
    title: "Pro Yearly",
    price: "$59",
    detail: "100 AI generations per month",
    items: ["Same Pro tools", "Annual billing", "Cancel future renewals anytime"],
  },
];

export default function Home() {
  return (
    <SiteShell>
      <section className="hero" aria-labelledby="home-title">
        <div className="section-inner hero-inner">
          <div>
            <p className="eyebrow">Chrome extension for LinkedIn writing</p>
            <h1 id="home-title">LinkedBoost AI</h1>
            <p className="hero-copy">
              Create and improve LinkedIn posts with focused AI tools for rewrites,
              hooks, tone, hashtags, calls to action, expansion, and condensation.
            </p>
            <div className="hero-actions">
              <a className="button-link" href="#plans">View plans</a>
              <a className="button-link secondary" href="/support">Get support</a>
            </div>
            <ul className="hero-facts" aria-label="Plan highlights">
              <li>3 free AI generations/month</li>
              <li>100 Pro generations/month</li>
              <li>$7.99 monthly or $59 yearly</li>
            </ul>
          </div>

          <div className="product-preview" aria-label="LinkedBoost AI extension preview">
            <div className="preview-header">
              <span className="brand-mark" aria-hidden="true">in</span>
              <span className="preview-title">LinkedBoost AI</span>
              <span className="plan-pill">PRO</span>
            </div>
            <div className="preview-body">
              <div>
                <p className="preview-label">Draft</p>
                <div className="preview-textbox">I launched a project and want to share the lesson clearly.</div>
              </div>
              <div className="preview-tools">
                <div className="preview-tool">AI Rewrite <span className="pro-badge">PRO</span></div>
                <div className="preview-tool">Hook Generator <span className="pro-badge">PRO</span></div>
                <div className="preview-tool">Executive Tone <span className="pro-badge">PRO</span></div>
              </div>
              <div>
                <p className="preview-label">Output</p>
                <div className="preview-output">
                  Today I shipped a project that reminded me how much clarity matters...
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band" aria-labelledby="features-title">
        <div className="section-inner">
          <div className="section-heading">
            <p className="eyebrow">What it does</p>
            <h2 id="features-title">A focused writing assistant for professional posts.</h2>
          </div>
          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="plans" className="section-band alt" aria-labelledby="plans-title">
        <div className="section-inner">
          <div className="section-heading">
            <p className="eyebrow">Plans</p>
            <h2 id="plans-title">Start free, upgrade when you need more AI generations.</h2>
          </div>
          <div className="plan-grid">
            {plans.map((plan) => (
              <article className={`plan-card${plan.highlight ? " highlight" : ""}`} key={plan.title}>
                <h3>{plan.title}</h3>
                <p className="plan-price">{plan.price}</p>
                <p>{plan.detail}</p>
                <ul className="plan-list">
                  {plan.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band" aria-labelledby="support-title">
        <div className="section-inner">
          <h2 id="support-title">Need help with your account or subscription?</h2>
          <p>
            Contact support at <EmailLink /> for account access, billing questions,
            subscription management, or extension setup help.
          </p>
          <a className="button-link secondary" href="/support">Support options</a>
        </div>
      </section>
    </SiteShell>
  );
}
