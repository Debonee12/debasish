import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import StatCounter from "@/components/StatCounter";
import RevealWrapper from "@/components/RevealWrapper";
import SourcesFooter from "@/components/SourcesFooter";
import { photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Drainage & Sanitation — Ward 4",
  description: "Overflowing drains and inadequate sanitation reportedly affecting 9,000+ residents in Baranagar Ward 4.",
};

export default function DrainagePage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="drain-heading">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/ward-4">Ward 4</Link></li>
              <li aria-current="page">Drainage &amp; Sanitation</li>
            </ol>
          </nav>
          <p className="eyebrow">Civic issue</p>
          <h1 id="drain-heading">Drainage &amp; Sanitation</h1>
          <p className="lead">Overflow from major drains and inadequate sanitation reportedly affect more than 9,000 residents. Conditions and population estimate are user-reported.</p>
          <div className="tag-row">
            <span className="tag tag-urgent tag-dot">Urgent</span>
            <span className="tag tag-unverified">Conditions self-reported</span>
          </div>
        </div>
      </section>

      {/* Stat + callout */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            <RevealWrapper className="reveal">
              <div className="callout">
                <strong className="big">
                  <StatCounter target={9000} suffix="+" />
                </strong>
                <p>residents reportedly affected by overflowing drains and inadequate sanitation in Ward 4.</p>
              </div>
            </RevealWrapper>
            <RevealWrapper className="reveal" delay={120}>
              <div className="note note-crimson" style={{ height: "100%" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <div>
                  <strong>Evidence needed to verify this figure:</strong>
                  <ul style={{ marginTop: "0.6rem", paddingLeft: "1.1rem", lineHeight: 1.65 }}>
                    <li>Affected-lane list with GPS coordinates</li>
                    <li>Overflow frequency records</li>
                    <li>Cleaning / desilting logs</li>
                    <li>Current official population count for Ward 4</li>
                  </ul>
                </div>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* Photos */}
      <section className="section section-leaf" aria-labelledby="drain-photos">
        <div className="container">
          <p className="eyebrow">Supplied field photographs</p>
          <h2 id="drain-photos">Photographs from the field</h2>
          <p style={{ color: "var(--ink-soft)", maxWidth: "65ch", marginBottom: "2rem" }}>
            Photographs supplied showing ward field and community activities.
            Locations and dates are unverified.
          </p>
          <div className="grid grid-3">
            {[photos.laneDrain, photos.housingBlock, photos.wallTreatment].map((p) => (
              <figure key={p.id} className="figure">
                <Photo src={p.src} alt={p.alt} ratioClass="ratio-4-3" />
                <figcaption>
                  <span className="tag tag-unverified">Unverified</span>
                  <span>{p.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="grid grid-3" style={{ marginTop: "1.5rem" }}>
            {[photos.communityWork1, photos.communityWork2, photos.communityWork3].map((p) => (
              <figure key={p.id} className="figure">
                <Photo src={p.src} alt={p.alt} ratioClass="ratio-4-3" />
                <figcaption>
                  <span className="tag tag-unverified">Unverified</span>
                  <span>{p.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* What is known */}
      <section className="section" aria-labelledby="drain-known">
        <div className="container container-narrow">
          <h2 id="drain-known">What the brief reports</h2>
          <dl className="facts">
            <div><dt>Issue</dt><dd>Overflowing drains; inadequate sanitation in several lanes</dd></div>
            <div><dt>Reported scale</dt><dd>9,000+ residents affected (user estimate)</dd></div>
            <div><dt>Source</dt><dd>User-reported conditions</dd></div>
            <div><dt>Photographs</dt><dd>Supplied (location and date unverified)</dd></div>
          </dl>

          <h2 style={{ marginTop: "2.5rem" }}>Discussion proposal</h2>
          <p>
            A three-step proposal — inspection, maintenance and follow-up — is outlined on the{" "}
            <Link href="/proposals/drainage">Drainage Improvements proposal page</Link>.
            Engineering assessment and funding are required before any work begins.
          </p>
        </div>
      </section>

      <SourcesFooter ids={["brief", "pdf", "photos"]} extra="The 9,000+ figure is a user-reported estimate. An official ward population count is needed." />
    </>
  );
}
