import type { Metadata } from "next";
import Link from "next/link";
import SourcesFooter from "@/components/SourcesFooter";
import RevealWrapper from "@/components/RevealWrapper";

export const metadata: Metadata = {
  title: "Community Work",
  description: "Debashis Chowdhury — health camps, educational assistance, cleanliness drives and relief work in Ward 4, Baranagar.",
};

function ArrowRight() {
  return (
    <svg className="arrow" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M4 10h12M12 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const activities = [
  {
    title: "Health & Blood-Donation Camps",
    slug: "health-blood-donation-camps",
    description: "Organisation of health check-up and blood-donation camps for residents of Ward 4 and the wider Baranagar area.",
    note: "No dates, numbers or verification supplied. A photograph of what appears to be a health camp appears in the supplied PDF (see the supplied profile gallery).",
  },
  {
    title: "Educational Assistance",
    slug: "educational-assistance",
    description: "Stated support for educational initiatives in the local area — nature and scope not specified in the supplied materials.",
    note: "No details, dates or beneficiary numbers supplied.",
  },
  {
    title: "Cleanliness Drives",
    slug: "cleanliness-drives",
    description: "Field photographs suggest involvement in sanitation and drain-inspection activities in Ward 4 lanes.",
    note: "Field photographs are supplied but their location and date are unverified. Further documentary evidence needed.",
  },
  {
    title: "Relief Work",
    slug: "relief-work",
    description: "Stated participation in relief efforts — type of relief (flood, health, food) and dates not specified.",
    note: "No details supplied. This item is self-reported only.",
  },
];

export default function CommunityWorkPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="cw-heading">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li aria-current="page">Community Work</li>
            </ol>
          </nav>
          <p className="eyebrow">Supplied profile</p>
          <h1 id="cw-heading">Community Work</h1>
          <p className="lead">
            The supplied profile lists four community-activity areas. Dates, numbers and independent
            verification are still needed for each one.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="note note-crimson" style={{ marginBottom: "2.5rem", maxWidth: "780px" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9.303 3.376c.866 1.5-.217 3.374-1.948 3.374H4.645c-1.73 0-2.813-1.874-1.948-3.374L10.051 3.378c.866-1.5 3.032-1.5 3.898 0l7.354 12.748zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <p>
              <strong>Evidence gap:</strong> The supplied PDF provides only one line for community activities.
              The sub-pages below describe what is stated; they do not claim to document verified events.
              Dates, photographs, beneficiary numbers and third-party confirmation are all still required.
            </p>
          </div>

          <div className="grid grid-2">
            {activities.map((a, i) => (
              <RevealWrapper key={a.slug} className="reveal" delay={i * 80}>
                <div className="card card-hover">
                  <h3>
                    <Link href={`/community-work/${a.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                      {a.title}
                    </Link>
                  </h3>
                  <p>{a.description}</p>
                  <div className="note" style={{ marginTop: "1rem", padding: "0.75rem 1rem" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" style={{ width: 18, height: 18 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                    <p style={{ margin: 0, fontSize: "0.88rem" }}>{a.note}</p>
                  </div>
                  <Link href={`/community-work/${a.slug}`} className="link-arrow" style={{ marginTop: "1.25rem", display: "inline-flex" }}>
                    Details <ArrowRight />
                  </Link>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      <SourcesFooter ids={["pdf", "photos"]} extra="The supplied PDF has only one line on community activities. All sub-pages reflect that limited sourcing." />
    </>
  );
}
