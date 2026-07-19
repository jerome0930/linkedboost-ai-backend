export const SUPPORT_EMAIL = "linkedboostai55@gmail.com";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/refund-policy", label: "Refunds" },
  { href: "/support", label: "Support" },
];

export function SiteShell({ children }) {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <nav className="site-nav" aria-label="Main navigation">
          <a className="brand-link" href="/" aria-label="LinkedBoost AI home">
            <span className="brand-mark" aria-hidden="true">in</span>
            <span>LinkedBoost AI</span>
          </a>
          <div className="nav-links">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
          </div>
        </nav>
      </header>
      <main id="main">{children}</main>
      <footer className="site-footer">
        <div className="site-footer-inner">
          <span>LinkedBoost AI</span>
          <div className="footer-links" aria-label="Footer navigation">
            {navLinks.slice(1).map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export function PageHero({ eyebrow, title, children }) {
  return (
    <section className="page-hero">
      <div className="section-inner">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {children}
      </div>
    </section>
  );
}

export function EmailLink() {
  return <a className="contact-link" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>;
}
