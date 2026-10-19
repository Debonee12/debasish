import type { Metadata } from "next";
import Link from "next/link";
import SourcesFooter from "@/components/SourcesFooter";
import RevealWrapper from "@/components/RevealWrapper";

export const metadata: Metadata = {
  title: "Ambedkar Colony — Ward 4",
  description: "Water scarcity, sanitation gaps and public-health risks in Ambedkar Colony, Ward 4, Baranagar.",
};

const topics = [
  {
    icon: "💧",
    tag: "water",
    title: "Water supply (reported scarcity)",
    items: [
      "Measure supply hours and waiting time",
      "Assess water pressure and distribution equity",
      "Check access to safe / treated water",
    ],
    evidenceNote: "Scarcity is self-reported. Supply-hours records and pressure measurements are needed.",
  },
  {
    icon: "🚿",
    tag: "",
    title: "Sanitation (reported hygiene gaps)",
    items: [
      "Record toilet access and condition",
      "Assess wastewater / grey-water conditions",
      "Review waste collection frequency",
    ],
    evidenceNote: "Hygiene gaps are self-reported. On-site assessment and official records needed.",
  },
  {
    icon: "🏥",
    tag: "urgent",
    title: "Public health",
    items: [
      "Unsafe water and poor sanitation can increase disease risk (WHO)",
      "Water-quality tests at supply points needed",
      "Local health records needed to establish actual incidence",
    ],
    evidenceNote: "General health risks from WHO fact sheet. No local outbreak evidence supplied.",
  },
];

export default function AmbedkarColonyPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="amb-heading">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/ward-4">Ward 4</Link></li>
              <li aria-current="page">Ambedkar Colony</li>
            </ol>
          </nav>
          <p className="eyebrow">Civic issue</p>
          <h1 id="amb-heading">Ambedkar Colony</h1>
          <p className="lead">Daily service gaps in water supply, sanitation and public health — as reported in the user brief. Conditions are self-reported and evidence is still needed.</p>
          <div className="tag-row">
            <span className="tag tag-water tag-dot">Water</span>
            <span className="tag tag-urgent tag-dot">Sanitation</span>
            <span className="tag tag-unverified">Conditions self-reported</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="note note-crimson" style={{ maxWidth: 780, marginBottom: "2.5rem" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <p>
              <strong>Source note:</strong> Local conditions described below come from the user brief.
              The general health-risk information is from the WHO Drinking-water fact sheet.
              No local outbreak evidence was supplied.
            </p>
          </div>

          <div className="grid grid-3">
            {topics.map((t, i) => (
              <RevealWrapper key={t.title} className="reveal" delay={i * 100}>
                <div className="card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{t.icon}</div>
                  {t.tag && <span className={`tag tag-${t.tag}`} style={{ alignSelf: "flex-start", marginBottom: "0.85rem" }}>{t.tag === "water" ? "Water" : "Public health"}</span>}
                  <h3>{t.title}</h3>
                  <ul style={{ paddingLeft: "1.1rem", color: "var(--ink-soft)", flexGrow: 1 }}>
                    {t.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <div className="note" style={{ marginTop: "1.25rem", padding: "0.75rem 0.9rem" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" style={{ width: 18, height: 18 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                    <p style={{ margin: 0, fontSize: "0.88rem" }}>{t.evidenceNote}</p>
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>

          <div style={{ marginTop: "3rem" }}>
            <p className="eyebrow">Related proposal</p>
            <h2>Water &amp; Hygiene Improvements</h2>
            <p style={{ maxWidth: "60ch", color: "var(--ink-soft)", marginBottom: "1.5rem" }}>
              A discussion proposal covering reliable supply, water-quality checks and sanitation access
              is outlined on the proposals page. Feasibility and funding are required.
            </p>
            <Link href="/proposals/water-hygiene" className="btn btn-green">
              View water &amp; hygiene proposal →
            </Link>
          </div>
        </div>
      </section>

      <SourcesFooter ids={["brief", "who"]} extra="Local conditions are self-reported. No water-test results or health records were supplied." />
    </>
  );
}
