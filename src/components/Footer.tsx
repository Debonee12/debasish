import Link from "next/link";
import { site, utilityLinks, whatsappLink } from "@/lib/site";
import SocialLinks from "@/components/SocialLinks";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ width: 20, height: 20 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" style={{ width: 18, height: 18 }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.5A1.5 1.5 0 014.5 4h2.379a.75.75 0 01.698.474l1.29 3.221a.75.75 0 01-.217.858l-1.428 1.071a11.025 11.025 0 005.155 5.155l1.071-1.428a.75.75 0 01.858-.217l3.221 1.29a.75.75 0 01.474.698V19.5A1.5 1.5 0 0119.5 21C10.44 21 3 13.56 3 4.5z" />
    </svg>
  );
}

type FooterProps = {
  facebookUrl?: string;
  instagramUrl?: string;
};

export default function Footer({ facebookUrl = "", instagramUrl = "" }: FooterProps) {
  const year = 2026;

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          {/* Brand col */}
          <div className="footer-brand">
            <div className="brand" style={{ marginBottom: "0.75rem" }}>
              <div className="brand-mark">DC</div>
              <div className="brand-text">
                <span className="brand-name" style={{ color: "#fff" }}>{site.name}</span>
                <span className="brand-sub">{site.label}</span>
              </div>
            </div>
            <p style={{ maxWidth: "30ch" }}>{site.tagline}</p>
            <p style={{ fontSize: "0.85rem", color: "#93b89c", marginTop: "0.75rem" }}>
              As of {site.asOf}
            </p>
            <div style={{ marginTop: "1rem" }}>
              <SocialLinks facebookUrl={facebookUrl} instagramUrl={instagramUrl} variant="footer" />
            </div>
            {/* Tricolour stripe */}
            <div style={{ height: 4, width: 64, marginTop: "1.25rem", background: "linear-gradient(90deg,#ff9933 0 33%,#fff 33% 66%,#138808 66%)", borderRadius: 4 }} aria-hidden="true" />
          </div>

          {/* Nav col: About + Community */}
          <div>
            <h2>About</h2>
            <ul>
              <li><Link href="/about">Profile</Link></li>
              <li><Link href="/about/education">Education</Link></li>
              <li><Link href="/about/political-engagement">Political engagement</Link></li>
            </ul>
            <h2 style={{ marginTop: "1.5rem" }}>Community Work</h2>
            <ul>
              <li><Link href="/community-work/health-blood-donation-camps">Health &amp; Blood-Donation Camps</Link></li>
              <li><Link href="/community-work/educational-assistance">Educational Assistance</Link></li>
              <li><Link href="/community-work/cleanliness-drives">Cleanliness Drives</Link></li>
              <li><Link href="/community-work/relief-work">Relief Work</Link></li>
            </ul>
          </div>

          {/* Nav col: Ward 4 */}
          <div>
            <h2>Ward 4 &amp; Baranagar</h2>
            <ul>
              <li><Link href="/ward-4">Overview</Link></li>
              <li><Link href="/ward-4/drainage-sanitation">Drainage &amp; Sanitation</Link></li>
              <li><Link href="/ward-4/ambedkar-colony">Ambedkar Colony</Link></li>
              <li><Link href="/ward-4/election-2022">2022 Election</Link></li>
              <li><Link href="/ward-4/evidence-sources">Evidence &amp; Sources</Link></li>
            </ul>
          </div>

          {/* Nav col: Proposals + Events */}
          <div>
            <h2>Proposals</h2>
            <ul>
              <li><Link href="/proposals/drainage">Drainage Improvements</Link></li>
              <li><Link href="/proposals/water-hygiene">Water &amp; Hygiene</Link></li>
            </ul>
            <h2 style={{ marginTop: "1.5rem" }}>Events &amp; More</h2>
            <ul>
              <li><Link href="/events">Events</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/contact/report-issue">Report an Issue</Link></li>
            </ul>
          </div>

          {/* Contact col */}
          <div>
            <h2>Contact</h2>
            <ul style={{ gap: "0.75rem" }}>
              <li>
                <a
                  href={site.contact.phoneHref}
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", color: "#d9ecdd" }}
                  aria-label={`Call ${site.contact.phoneDisplay}`}
                >
                  <PhoneIcon /> {site.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-wa-btn"
                  aria-label={`Chat on WhatsApp at ${site.contact.whatsappDisplay}`}
                >
                  <WhatsAppIcon /> WhatsApp {site.contact.whatsappDisplay}
                </a>
              </li>
              <li style={{ color: "#93b89c", fontSize: "0.9rem", marginTop: "0.35rem" }}>
                {site.contact.area}
              </li>
              <li style={{ color: "#93b89c", fontSize: "0.9rem" }}>
                {site.contact.hours}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p style={{ margin: 0 }}>
            © {year} {site.name}. Civic information only — see the{" "}
            <Link href="/disclaimer">Disclaimer</Link> and{" "}
            <Link href="/privacy">Privacy &amp; Photo Consent</Link> pages.
          </p>
          <nav aria-label="Utility links">
            {utilityLinks.map((l) => (
              <Link key={l.href} href={l.href}>{l.label}</Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
