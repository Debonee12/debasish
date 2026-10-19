import type { Metadata } from "next";
import Link from "next/link";
import StatCounter from "@/components/StatCounter";
import RevealWrapper from "@/components/RevealWrapper";
import SourcesFooter from "@/components/SourcesFooter";
import Photo from "@/components/Photo";
import { photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Ward 4 & Baranagar Overview",
  description: "Overview of civic conditions in Baranagar Ward 4 — drainage, sanitation, Ambedkar Colony water access and the 2022 election picture.",
};

function ArrowRight() {
  return (
    <svg className="arrow" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M4 10h12M12 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const sections = [
  { title: "Drainage & Sanitation", href: "/ward-4/drainage-sanitation", desc: "Overflow from major drains and inadequate sanitation reportedly affect 9,000+ residents.", tag: "urgent" },
  { title: "Ambedkar Colony", href: "/ward-4/ambedkar-colony", desc: "Daily gaps in water supply, sanitation and public health in Ambedkar Colony.", tag: "water" },
  { title: "2022 Election Picture", href: "/ward-4/election-2022", desc: "Full results for Ward 4 and all 34 Baranagar Municipality seats.", tag: "" },
  { title: "Evidence & Sources", href: "/ward-4/evidence-sources", desc: "What is verified, what is self-reported and what evidence is still needed.", tag: "" },
];

export default function Ward4Page() {
  return (
    <>
      <section className="page-hero" aria-labelledby="ward4-heading">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol><li><Link href="/">Home</Link></li><li aria-current="page">Ward 4 &amp; Baranagar</li></ol>
          </nav>
          <p className="eyebrow">Civic priorities</p>
          <h1 id="ward4-heading">Ward 4 &amp; Baranagar</h1>
          <p className="lead">Drainage, sanitation and water conditions, the 2022 election picture and a summary of the evidence available.</p>
          <div className="tag-row">
            <span className="tag tag-urgent">Drainage issue</span>
            <span className="tag tag-water">Water access</span>
            <span className="tag">2022 election results</span>
          </div>
        </div>
      </section>

      {/* Stat hero */}
      <section className="section" aria-label="Key statistic">
        <div className="container">
          <RevealWrapper className="stat-hero reveal">
            <div className="stat-big">
              <StatCounter target={9000} suffix="+" />
            </div>
            <div>
              <div className="stat-caption">residents reportedly affected by drainage and sanitation issues in Ward 4, Baranagar</div>
              <p style={{ color: "var(--ink-muted)", marginTop: "0.65rem", fontSize: "0.95rem" }}>
                Population estimate and conditions are user-reported. Official count and documented overflow frequency are still needed.
              </p>
              <div className="tag-row" style={{ marginTop: "0.85rem" }}>
                <span className="tag tag-unverified">Reported, not independently verified</span>
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* Sub-pages */}
      <section className="section section-leaf" aria-labelledby="ward4-sections">
        <div className="container">
          <p className="eyebrow">Ward 4 pages</p>
          <h2 id="ward4-sections">Explore by topic</h2>
          <div className="grid grid-2" style={{ marginTop: "2rem" }}>
            {sections.map((s, i) => (
              <RevealWrapper key={s.href} className="reveal" delay={i * 80}>
                <Link href={s.href} className="card card-hover card-link">
                  {s.tag && <span className={`tag tag-${s.tag}`} style={{ marginBottom: "0.85rem" }}>{s.tag === "urgent" ? "Drainage issue" : "Water"}</span>}
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <span className="link-arrow" style={{ marginTop: "auto", paddingTop: "0.75rem" }}>
                    View <ArrowRight />
                  </span>
                </Link>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Photo */}
      <section className="section" aria-labelledby="field-photo-heading">
        <div className="container">
          <div className="split">
            <div>
              <p className="eyebrow">Field photograph</p>
              <h2 id="field-photo-heading">Ward 4 drain inspection</h2>
              <p>A supplied photograph showing what appears to be a drain-inspection activity in a narrow Ward 4 lane. Location and date are unverified.</p>
              <div className="note" style={{ marginTop: "1.25rem" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
                <p>Source: supplied photograph. Location and date unverified.</p>
              </div>
            </div>
            <figure className="figure">
              <Photo src={photos.laneDrain.src} alt={photos.laneDrain.alt} ratioClass="ratio-4-3" />
              <figcaption>
                <span className="tag tag-unverified">Unverified</span>
                <span>{photos.laneDrain.caption}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <SourcesFooter ids={["brief", "pdf", "photos"]} />
    </>
  );
}
