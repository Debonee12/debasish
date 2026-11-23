import type { Metadata } from "next";
import Link from "next/link";
import GalleryClient from "@/components/GalleryClient";
import JsonLd from "@/components/JsonLd";
import SourcesFooter from "@/components/SourcesFooter";
import { galleryPhotos } from "@/lib/photos";
import { canonicalUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Photo Gallery — Field Work & Public Events",
  description:
    "Supplied photographs of field work, community health camps, and public events in Ward 4, Baranagar.",
  alternates: {
    canonical: "/gallery",
  },
};

export default function GalleryPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Gallery", item: canonicalUrl("/gallery") },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbLd} />

      <section className="page-hero" aria-labelledby="gallery-page-heading">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li aria-current="page">Gallery</li>
            </ol>
          </nav>
          <p className="eyebrow">Photographs</p>
          <h1 id="gallery-page-heading">Field Work &amp; Public Events</h1>
          <p className="lead">
            Supplied photographs covering drain inspections, community welfare camps, and public events.
            For newly published event albums, visit the <Link href="/events">Events</Link> section.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <GalleryClient items={galleryPhotos} />
        </div>
      </section>

      <SourcesFooter ids={["photos", "pdf"]} />
    </>
  );
}
