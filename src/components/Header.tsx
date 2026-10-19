"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site, utilityLinks, whatsappLink } from "@/lib/site";

/* ── Icons ─────────────────────────────────────────────── */
function ChevronDown() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M2.25 6.338c0 13.22 10.69 23.91 23.91 23.91" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.328 3.328a16.483 16.483 0 014.342 2.555c.468.368.556 1.05.198 1.54l-1.92 2.66a15.015 15.015 0 006.96 6.96l2.66-1.92a1.125 1.125 0 011.54.198 16.483 16.483 0 012.555 4.342c.177.559-.059 1.17-.556 1.463l-3.243 1.946A1.125 1.125 0 0114.75 23.4a21.75 21.75 0 01-13.15-13.15 1.125 1.125 0 01.247-1.121l1.946-3.243c.294-.497.904-.733 1.463-.557z" />
    </svg>
  );
}

/* ── Header ─────────────────────────────────────────────── */
export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll shadow
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile nav on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Trap focus / ESC for mobile panel
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="container header-inner">
          {/* Brand */}
          <Link href="/" className="brand" aria-label={`${site.name} – home`}>
            <div className="brand-mark" aria-hidden="true">DC</div>
            <div className="brand-text">
              <span className="brand-name">{site.name}</span>
              <span className="brand-sub">{site.label} · Ward 4</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="main-nav" aria-label="Main navigation">
            <ul role="list">
              {nav.map((item) =>
                item.children ? (
                  <li key={item.href} className="nav-item">
                    <button
                      className={`nav-link${isActive(item.href) ? " active" : ""}`}
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {item.label} <ChevronDown />
                    </button>
                    <ul className="dropdown" role="menu">
                      {item.children.map((child) => (
                        <li key={child.href} role="menuitem">
                          <Link href={child.href} className={isActive(child.href) ? "active" : ""}>
                            {child.label}
                            {child.hint && <small>{child.hint}</small>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={item.href} className="nav-item">
                    <Link href={item.href} className={`nav-link${isActive(item.href) ? " active" : ""}`}>
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          {/* Desktop CTA */}
          <div className="header-cta">
            <a href={site.contact.phoneHref} className="btn btn-sm btn-outline" style={{ color: "#fff", borderColor: "rgba(255,255,255,.4)" }}>
              <PhoneIcon />
              {site.contact.phoneDisplay}
            </a>
            <button
              className="menu-toggle"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav */}
      <div id="mobile-nav" className={`mobile-nav${mobileOpen ? " open" : ""}`} aria-hidden={!mobileOpen}>
        <div className="mobile-nav-backdrop" onClick={() => setMobileOpen(false)} aria-hidden="true" />
        <div className="mobile-nav-panel" ref={panelRef}>
          <div className="mobile-nav-head">
            <Link href="/" className="brand">
              <div className="brand-mark">DC</div>
              <div className="brand-text">
                <span className="brand-name">{site.name}</span>
                <span className="brand-sub" style={{ color: "var(--ink-muted)" }}>Ward 4</span>
              </div>
            </Link>
            <button className="menu-toggle" onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <CloseIcon />
            </button>
          </div>

          {nav.map((item) =>
            item.children ? (
              <div key={item.href} className="mobile-group">
                <details>
                  <summary className={isActive(item.href) ? "active" : ""}>
                    {item.label} <ChevronDown />
                  </summary>
                  <ul>
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} className={isActive(child.href) ? "active" : ""}>
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            ) : (
              <div key={item.href} className="mobile-group">
                <Link href={item.href} className={isActive(item.href) ? "active" : ""}>
                  {item.label}
                </Link>
              </div>
            )
          )}

          <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <a href={site.contact.phoneHref} className="btn btn-outline">
              <PhoneIcon /> {site.contact.phoneDisplay}
            </a>
            <a href={whatsappLink("Hello, I want to report a Ward 4 issue.")} target="_blank" rel="noreferrer" className="btn btn-green">
              WhatsApp
            </a>
          </div>

          {/* Utility links */}
          <div style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {utilityLinks.map((l) => (
              <Link key={l.href} href={l.href} style={{ fontSize: "0.85rem", color: "var(--ink-muted)" }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
