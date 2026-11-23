import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SourcesFooter from "@/components/SourcesFooter";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Water & Hygiene Improvements Proposal",
  description:
    "Municipal discussion proposal for reliable water supply, quality checks, and sanitation access in Ambedkar Colony, Ward 4, Baranagar.",
  alternates: {
    canonical: canonicalUrl("/proposals/water-hygiene"),
  },
};

const pillars = [
  {
    num: "01",
    title: "Reliable Supply",
    items: [
      "Assess daily water pressure and supply timings across lanes",
      "Identify leaking pipelines and low-pressure bottlenecks",
      "Document household water access gaps in Ambedkar Colony",
    ],
  },
  {
    num: "02",
    title: "Water-Quality Checks",
    items: [
      "Periodic testing of drinking-water points for contamination",
      "Check proximity of water lines to open or overflowing drains",
      "Share test findings transparently with local residents",
    ],
  },
  {
    num: "03",
    title: "Sanitation Access",
    items: [
      "Review public toilet maintenance and handwashing facilities",
      "Improve solid-waste collection frequency near residential blocks",
      "Coordinate community hygiene awareness drives",
    ],
  },
];

export default function WaterHygieneProposalPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="wh-heading">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/proposals">Proposals</Link></li>
              <li aria-current="page">Water &amp; Hygiene Improvements</li>
            </ol>
          </nav>
          <p className="eyebrow">Discussion proposal</p>
          <h1 id="wh-heading">Water &amp; Hygiene Improvements</h1>
          <p className="lead">
            A discussion proposal for reliable water supply, water-quality monitoring, and sanitation
            access in Ambedkar Colony and surrounding areas of Ward 4.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="steps">
            {pillars.map((p) => (
              <div key={p.num} className="step-card">
                <div className="step-num" style={{ background: "var(--teal)" }}>{p.num}</div>
                <h3>{p.title}</h3>
                <ul>
                  {p.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <div className="split" style={{ marginTop: "4rem", alignItems: "center" }}>
            <div>
              <p className="eyebrow">Illustration</p>
              <h2>Community water &amp; hygiene</h2>
              <p style={{ color: "var(--ink-soft)" }}>
                AI-generated conceptual illustration depicting neighbourhood water access, testing,
                and sanitation facilities. Not a photograph of Ambedkar Colony.
              </p>
              <span className="tag tag-ai">AI illustration — not a photograph</span>
            </div>
            <figure className="figure">
              <div className="photo-frame ratio-4-3">
                <Image
                  src="/illustrations/ai-water-hygiene.png"
                  alt="AI-generated illustration of community water and hygiene facilities"
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <figcaption><span className="tag tag-ai">AI illustration</span><span>Not a real photograph</span></figcaption>
            </figure>
          </div>
        </div>
      </section>

      <SourcesFooter ids={["brief", "pdf", "who"]} />
    </>
  );
}
