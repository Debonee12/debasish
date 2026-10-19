import type { Metadata } from "next";
import Link from "next/link";
import SourcesFooter from "@/components/SourcesFooter";

export const metadata: Metadata = {
  title: "Proposals",
  description: "Municipal discussion proposals for drainage improvements and water & hygiene improvements in Ward 4, Baranagar.",
};

function ArrowRight() {
  return (
    <svg className="arrow" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M4 10h12M12 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ProposalsPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="prop-heading">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol><li><Link href="/">Home</Link></li><li aria-current="page">Proposals</li></ol>
          </nav>
          <p className="eyebrow">Municipal discussion proposals</p>
          <h1 id="prop-heading">Possible Improvements for Ward 4</h1>
          <p className="lead">
            These are discussion proposals only. Engineering assessment and funding are required
            before any work begins. No commitments are implied.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="note note-green" style={{ maxWidth: 780, marginBottom: "2.5rem" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            <p>
              <strong>Note:</strong> Both proposals below are municipal discussion items drawn from the
              supplied PDF. They describe possible approaches to civic problems, not approved or funded schemes.
            </p>
          </div>

          <div className="grid grid-2">
            <Link href="/proposals/drainage" className="card card-hover card-link">
              <div className="icon-badge green" style={{ fontSize: "1.5rem", width: 60, height: 60, borderRadius: "16px" }}>🚰</div>
              <h3>Drainage Improvements</h3>
              <p>A three-step approach: inspect, maintain and follow up on Ward 4's overflowing drains.</p>
              <div className="steps" style={{ marginTop: "1rem" }}>
                {["01 Inspection", "02 Maintenance", "03 Follow-up"].map((s) => (
                  <div key={s} className="tag" style={{ borderRadius: 8, padding: "0.35rem 0.65rem" }}>{s}</div>
                ))}
              </div>
              <span className="link-arrow" style={{ marginTop: "1.5rem", display: "inline-flex" }}>
                View proposal <ArrowRight />
              </span>
            </Link>

            <Link href="/proposals/water-hygiene" className="card card-hover card-link">
              <div className="icon-badge teal" style={{ fontSize: "1.5rem", width: 60, height: 60, borderRadius: "16px" }}>💧</div>
              <h3>Water &amp; Hygiene Improvements</h3>
              <p>Reliable supply, water-quality checks and improved sanitation access for Ambedkar Colony.</p>
              <div className="steps" style={{ marginTop: "1rem" }}>
                {["Reliable supply", "Water-quality checks", "Sanitation access"].map((s) => (
                  <div key={s} className="tag tag-water" style={{ borderRadius: 8, padding: "0.35rem 0.65rem" }}>{s}</div>
                ))}
              </div>
              <span className="link-arrow" style={{ marginTop: "1.5rem", display: "inline-flex" }}>
                View proposal <ArrowRight />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <SourcesFooter ids={["pdf"]} extra="Proposals are municipal discussion items only. No engineering assessment or funding confirmation has been supplied." />
    </>
  );
}
