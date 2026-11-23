import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SocialLinks from "@/components/SocialLinks";
import { getSocialSettings } from "@/lib/settings-store";
import { canonicalUrl, site, whatsappLink } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact — Ward 4, Baranagar",
  description:
    "Contact Debashis Chowdhury for Ward 4, Baranagar civic issues, community events, and public outreach via WhatsApp (+91 9051268110) or phone (+91 7003238851).",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Contact | ${site.name}`,
    description:
      "Reach out via WhatsApp (+91 9051268110) or Phone (+91 7003238851) for Ward 4, Baranagar civic matters.",
    url: canonicalUrl("/contact"),
  },
};

export default async function ContactPage() {
  const social = await getSocialSettings();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Contact", item: canonicalUrl("/contact") },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbLd} />

      <section className="page-hero" aria-labelledby="contact-heading">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li aria-current="page">Contact</li>
            </ol>
          </nav>
          <p className="eyebrow">Get in touch</p>
          <h1 id="contact-heading">Contact &amp; Civic Support</h1>
          <p className="lead">
            Connect directly via WhatsApp or phone for Ward 4, Baranagar civic concerns, community
            events, and local support.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            <div className="card">
              <span className="tag tag-water" style={{ marginBottom: "0.75rem" }}>Direct Channels</span>
              <h2>Phone &amp; WhatsApp</h2>
              <p style={{ color: "var(--ink-soft)" }}>
                Available {site.contact.hours} for residents of {site.contact.area}.
              </p>

              <div className="btn-row" style={{ marginTop: "1.5rem", flexDirection: "column", alignItems: "flex-start" }}>
                <a
                  href={whatsappLink("Hello, I would like to connect regarding Ward 4, Baranagar.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-green"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  WhatsApp: {site.contact.whatsappDisplay}
                </a>
                <a
                  href={site.contact.phoneHref}
                  className="btn btn-outline"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Call: {site.contact.phoneDisplay}
                </a>
              </div>

              <dl className="facts" style={{ marginTop: "1.75rem" }}>
                <div><dt>WhatsApp</dt><dd><a href={whatsappLink()} target="_blank" rel="noopener noreferrer">{site.contact.whatsappDisplay}</a></dd></div>
                <div><dt>Phone</dt><dd><a href={site.contact.phoneHref}>{site.contact.phoneDisplay}</a></dd></div>
                <div><dt>Area</dt><dd>{site.contact.area}</dd></div>
                <div><dt>Hours</dt><dd>{site.contact.hours}</dd></div>
              </dl>
            </div>

            <div className="card">
              <span className="tag tag-saffron" style={{ marginBottom: "0.75rem" }}>Community &amp; Updates</span>
              <h2>Social Media &amp; Issue Reporting</h2>
              <p style={{ color: "var(--ink-soft)" }}>
                Follow official social media channels for community updates, or submit a Ward 4 drainage,
                water, or sanitation issue online.
              </p>

              <div style={{ marginTop: "1.25rem", marginBottom: "1.75rem" }}>
                <h3 style={{ fontSize: "1rem", marginBottom: "0.75rem" }}>Official Profiles</h3>
                <SocialLinks
                  facebookUrl={social.facebookUrl}
                  instagramUrl={social.instagramUrl}
                  variant="contact"
                />
              </div>

              <div className="note note-green">
                <p style={{ margin: 0 }}>
                  Need to report an overflowing drain, water shortage, or sanitation problem in Ward 4?
                </p>
              </div>
              <div className="btn-row" style={{ marginTop: "1.25rem" }}>
                <Link href="/contact/report-issue" className="btn btn-green">
                  Report a Ward 4 Issue →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
