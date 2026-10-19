import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import SourcesFooter from "@/components/SourcesFooter";
import { photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Cleanliness Drives",
  description: "Cleanliness drives in Ward 4, Baranagar — field photographs and self-reported activity.",
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
              <li aria-current="page">Cleanliness Drives</li>
            </ol>
          </nav>
          <p className="eyebrow">Community activity</p>
          <h1>Cleanliness Drives</h1>
          <p className="lead">Involvement in drain inspection and sanitation treatment activities — documented by supplied field photographs. Location and dates unverified.</p>
          <div className="tag-row"><span className="tag tag-unverified">Location and dates unverified</span></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="note note-crimson" style={{ marginBottom: "2rem", maxWidth: 780 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <p><strong>Evidence note:</strong> Three field photographs are supplied (below). Their locations and dates are unverified. Geotagged photographs and dated work logs would strengthen this record.</p>
          </div>

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
            {[photos.healthCamp, photos.communityWork1, photos.communityWork3].map((p) => (
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

      <SourcesFooter ids={["pdf", "photos"]} extra="Field photographs supplied but location and date unverified." />
    </>
  );
}
