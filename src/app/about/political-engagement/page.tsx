import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import SourcesFooter from "@/components/SourcesFooter";
import { photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Political Association & Engagement",
  description: "Debashis Chowdhury — BJP association since 2019 (stated; needs documentary confirmation) and public engagement photos.",
};

export default function PoliticalEngagementPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="pol-heading">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li aria-current="page">Political association &amp; engagement</li>
            </ol>
          </nav>
          <p className="eyebrow">Supplied profile</p>
          <h1 id="pol-heading">Political association &amp; engagement</h1>
          <p className="lead">
            Stated BJP association from 2019 and a selection of supplied public-event photographs.
          </p>
          <div className="tag-row">
            <span className="tag tag-unverified">Start date needs documentary confirmation</span>
            <span className="tag tag-saffron">BJP</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <div className="note note-crimson" style={{ marginBottom: "2rem" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <p>
                  <strong>Verification note:</strong> The start date of 2019 comes from a user statement and
                  is not independently verified. Documentary confirmation is needed.
                </p>
              </div>

              <dl className="facts">
                <div><dt>Party</dt><dd>Bharatiya Janata Party (BJP)</dd></div>
                <div><dt>Association from</dt><dd>2019 (stated by user; unverified)</dd></div>
                <div><dt>State (Oct 2026)</dt><dd>BJP-led state government, Chief Minister Suvendu Adhikari</dd></div>
                <div><dt>Sources</dt><dd>Supplied PDF; user statement; wb.gov.in / Akashvani</dd></div>
              </dl>
            </div>

            <div className="grid" style={{ gap: "1rem" }}>
              <figure className="figure">
                <Photo src={photos.nightMarch.src} alt={photos.nightMarch.alt} ratioClass="ratio-4-3" />
                <figcaption>
                  <span className="tag tag-unverified">Unverified</span>
                  <span>{photos.nightMarch.note}</span>
                </figcaption>
              </figure>
              <figure className="figure">
                <Photo src={photos.statueGarlanding.src} alt={photos.statueGarlanding.alt} ratioClass="ratio-4-3" />
                <figcaption>
                  <span className="tag tag-unverified">Note</span>
                  <span>{photos.statueGarlanding.note}</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <SourcesFooter ids={["pdf", "userStatement", "wbgov"]} />
    </>
  );
}
