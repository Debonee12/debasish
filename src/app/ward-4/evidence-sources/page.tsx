import type { Metadata } from "next";
import Link from "next/link";
import { sources, type Source } from "@/lib/sources";

export const metadata: Metadata = {
  title: "Evidence & Sources",
  description: "What is verified, what is self-reported and what evidence is still needed for Ward 4, Baranagar.",
};

const rows = [
  { claim: "9,000+ residents affected by drainage", status: "reported", note: "User estimate. Official population count and drain records needed." },
  { claim: "Overflow from major drains", status: "reported", note: "Self-reported. Overflow-frequency records needed." },
  { claim: "Inadequate sanitation in several lanes", status: "reported", note: "Self-reported. On-site assessment needed." },
  { claim: "Water scarcity in Ambedkar Colony", status: "reported", note: "Self-reported. Supply-hours records needed." },
  { claim: "Field photographs (drains, sanitation)", status: "supplied", note: "Supplied photographs. Location and date unverified." },
  { claim: "Health / cancer-detection camp photograph", status: "supplied", note: "Banner text needs confirmation by a Bengali speaker." },
  { claim: "Night-march photograph", status: "supplied", note: "Bengali banner text not reliably legible; transcription needed." },
  { claim: "Statue-garlanding photograph", status: "supplied", note: "Whose statue is not stated in the supplied PDF." },
  { claim: "2022 election results (all 34 seats)", status: "published", note: "Sangbad Pratidin, Wikipedia, myCorporator." },
  { claim: "Ward 4 results (votes and shares)", status: "published", note: "myCorporator Ward 4 results." },
  { claim: "Diploma in E&TC Engineering", status: "supplied", note: "Stated in supplied PDF. Institution and year not given." },
  { claim: "BJP association from 2019", status: "reported", note: "User statement. Documentary confirmation needed." },
  { claim: "State government composition, Oct 2026", status: "official", note: "wb.gov.in / Akashvani." },
  { claim: "AI illustrations (drainage, water)", status: "supplied", note: "Generated for this website — not photographs." },
  { claim: "General water/sanitation health risks", status: "published", note: "WHO Drinking-water fact sheet. No local outbreak evidence supplied." },
];

const statusLabel: Record<string, string> = {
  reported: "Self-reported / unverified",
  published: "Published source",
  official: "Official source",
  supplied: "Supplied material",
};
const statusColor: Record<string, string> = {
  reported: "tag-unverified",
  published: "",
  official: "tag-water",
  supplied: "tag-saffron",
};

export default function EvidenceSourcesPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="ev-heading">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/ward-4">Ward 4</Link></li>
              <li aria-current="page">Evidence &amp; Sources</li>
            </ol>
          </nav>
          <p className="eyebrow">Transparency</p>
          <h1 id="ev-heading">Evidence &amp; Sources</h1>
          <p className="lead">A full breakdown of every claim on this site: what is verified, what comes from supplied material and what is self-reported.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p style={{ color: "var(--ink-soft)", maxWidth: "65ch", marginBottom: "2rem" }}>
            This table lists every factual claim made on this site, its evidential status and any
            outstanding evidence that is still needed.
          </p>

          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ minWidth: 240 }}>Claim</th>
                  <th>Status</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.claim}>
                    <td>{r.claim}</td>
                    <td><span className={`tag ${statusColor[r.status]}`}>{statusLabel[r.status]}</span></td>
                    <td style={{ fontSize: "0.9rem", color: "var(--ink-soft)" }}>{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 style={{ marginTop: "3rem" }}>Published sources used</h2>
          <ol style={{ paddingLeft: "1.25rem", display: "grid", gap: "0.6rem", marginTop: "1rem" }}>
            {(["pratidin", "wikipedia", "mycorporator", "who", "wbgov"] as const).map((id) => {
              const s = sources[id] as Source;
              return (
                <li key={id}>
                  <span className={`tag ${statusColor[s.status]}`} style={{ marginRight: "0.5rem" }}>{statusLabel[s.status]}</span>
                  {s.url ? <a href={s.url} target="_blank" rel="noreferrer">{s.label}</a> : s.label}
                  {s.detail && <span style={{ color: "var(--ink-muted)", marginLeft: "0.4rem" }}>— {s.detail}</span>}
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </>
  );
}
