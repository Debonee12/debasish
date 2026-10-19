import type { Metadata } from "next";
import Link from "next/link";
import SourcesFooter from "@/components/SourcesFooter";

export const metadata: Metadata = {
  title: "Relief Work",
  description: "Relief work in Ward 4, Baranagar — self-reported in the supplied profile.",
};

export default function Page() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/community-work">Community Work</Link></li>
              <li aria-current="page">Relief Work</li>
            </ol>
          </nav>
          <p className="eyebrow">Community activity</p>
          <h1>Relief Work</h1>
          <p className="lead">Stated participation in local relief efforts — type and dates not specified in the supplied materials.</p>
          <div className="tag-row"><span className="tag tag-unverified">No details supplied</span></div>
        </div>
      </section>
      <section className="section">
        <div className="container container-narrow">
          <div className="note note-crimson" style={{ marginBottom: "2rem" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <p><strong>Evidence gap:</strong> The supplied PDF mentions relief work in a single line. The type of relief (flood, health, food), dates, scale and beneficiary numbers are not specified.</p>
          </div>
          <h2>Evidence needed</h2>
          <ul className="checklist pending">
            {["Type of relief (flood, food, health, etc.)","Dates of relief activities","Number of beneficiaries","Partner organisations","Photographs with confirmed captions","Third-party confirmation"].map((t) => (
              <li key={t}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <SourcesFooter ids={["pdf"]} extra="Self-reported only. No corroborating documents supplied." />
    </>
  );
}
