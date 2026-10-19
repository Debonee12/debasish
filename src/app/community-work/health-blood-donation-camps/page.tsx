import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import SourcesFooter from "@/components/SourcesFooter";
import { photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Health & Blood-Donation Camps",
  description: "Health and blood-donation camps organised in Ward 4, Baranagar — as stated in the supplied profile.",
};

export default function HealthCampsPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="health-heading">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/community-work">Community Work</Link></li>
              <li aria-current="page">Health &amp; Blood-Donation Camps</li>
            </ol>
          </nav>
          <p className="eyebrow">Community activity</p>
          <h1 id="health-heading">Health &amp; Blood-Donation Camps</h1>
          <p className="lead">Organisation of health and blood-donation camps for Ward 4 residents — self-reported in the supplied profile.</p>
          <div className="tag-row">
            <span className="tag tag-unverified">Dates and numbers needed</span>
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
                  <strong>Evidence gap:</strong> The supplied PDF mentions health and blood-donation camps
                  in a single line. No dates, beneficiary counts or organisation names are provided.
                  A photograph (below) appears to show a health or cancer-detection camp — the banner
                  text requires confirmation by a Bengali speaker.
                </p>
              </div>

              <h2>What is stated</h2>
              <p>
                The supplied profile lists organisation of health check-up and blood-donation camps among
                the community activities of Debashis Chowdhury. No further detail is provided in the
                supplied materials.
              </p>

              <h2>Evidence needed</h2>
              <ul className="checklist pending">
                {["Dates and locations of camps held","Number of beneficiaries","Names of partner organisations or hospitals","Photographic evidence with confirmed captions","Third-party confirmation (e.g. Red Cross, hospital)"].map((t) => (
                  <li key={t}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <figure className="figure">
              <Photo src={photos.healthCamp.src} alt={photos.healthCamp.alt} ratioClass="ratio-4-3" />
              <figcaption>
                <span className="tag tag-unverified">Unverified caption</span>
                <span>{photos.healthCamp.note}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <SourcesFooter ids={["pdf", "photos"]} extra="Banner text in the photograph awaits confirmation by a Bengali speaker." />
    </>
  );
}
