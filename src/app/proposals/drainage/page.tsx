import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import RevealWrapper from "@/components/RevealWrapper";
import SourcesFooter from "@/components/SourcesFooter";

export const metadata: Metadata = {
  title: "Drainage Improvements Proposal",
  description: "A three-step discussion proposal for drainage improvements in Ward 4, Baranagar — inspection, maintenance and follow-up.",
};

const steps = [
  {
    num: "01",
    title: "Inspection",
    color: "var(--saffron)",
    items: [
      "Map blockages across all Ward 4 drains",
      "Check drain gradients and identify collapse points",
      "Photograph current conditions with GPS tags",
      "Compile affected-lane list with resident input",
    ],
    outcome: "A documented map of the drainage network and blockage points.",
  },
  {
    num: "02",
    title: "Maintenance",
    color: "var(--green)",
    items: [
      "Schedule desilting and waste removal",
      "Clear blockages identified in the inspection",
      "Remove solid-waste build-up near drain inlets",
      "Repair collapsed drain sections",
    ],
    outcome: "Cleared and functional drains across Ward 4.",
  },
  {
    num: "03",
    title: "Follow-up",
    color: "var(--teal)",
    items: [
      "Track overflow incidents post-maintenance",
      "Verify repairs against resident reports",
      "Establish a regular maintenance schedule",
      "Publish maintenance records for transparency",
    ],
    outcome: "An accountable, documented maintenance record.",
  },
];

export default function DrainageProposalPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="dp-heading">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/proposals">Proposals</Link></li>
              <li aria-current="page">Drainage Improvements</li>
            </ol>
          </nav>
          <p className="eyebrow">Discussion proposal</p>
          <h1 id="dp-heading">Drainage Improvements</h1>
          <p className="lead">
            A three-step municipal discussion proposal for addressing overflowing drains in Ward 4.
            Engineering assessment and funding are required before any work begins.
          </p>
          <div className="tag-row">
            <span className="tag">Discussion proposal only</span>
            <span className="tag tag-urgent">No commitments implied</span>
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
              <strong>Important:</strong> This proposal is a discussion document only. Engineering
              assessment, budget approval and any required permissions are needed before work can begin.
              No timescale or commitment to delivery is implied.
            </p>
          </div>

          <div className="steps">
            {steps.map((s, i) => (
              <RevealWrapper key={s.num} className="step-card reveal" delay={i * 100}>
                <div className="step-num" style={{ background: s.color }}>{s.num}</div>
                <h3>{s.title}</h3>
                <ul>
                  {s.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
                <div className="callout" style={{ marginTop: "1.5rem", padding: "0.85rem 1.1rem" }}>
                  <strong>Intended outcome:</strong> {s.outcome}
                </div>
              </RevealWrapper>
            ))}
          </div>

          {/* AI illustration */}
          <div className="split" style={{ marginTop: "4rem", alignItems: "center" }}>
            <div>
              <p className="eyebrow">Illustration</p>
              <h2>What drain maintenance looks like</h2>
              <p style={{ color: "var(--ink-soft)" }}>
                AI-generated illustration showing the type of drain-inspection and cleaning activity
                described in Step 1 and Step 2 of this proposal.
              </p>
              <span className="tag tag-ai">AI illustration — not a photograph</span>
            </div>
            <figure className="figure">
              <div className="photo-frame ratio-4-3" style={{ borderRadius: "var(--radius-xl)" }}>
                <Image
                  src="/illustrations/ai-drain-cleaning.png"
                  alt="AI-generated illustration of workers cleaning a drain"
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

      <SourcesFooter ids={["brief", "pdf"]} extra="Proposal steps are derived from the supplied PDF. No engineering reports or budget documents have been supplied." />
    </>
  );
}
