import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import ReportIssueClient from "@/components/ReportIssueClient";
import { canonicalUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Report a Ward 4 Issue",
  description:
    "Report drainage, water supply, sanitation, or civic issues in Ward 4, Baranagar Municipality.",
  alternates: {
    canonical: "/contact/report-issue",
  },
};

export default function ReportIssuePage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Contact", item: canonicalUrl("/contact") },
      { "@type": "ListItem", position: 3, name: "Report a Ward 4 Issue", item: canonicalUrl("/contact/report-issue") },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbLd} />

      <section className="page-hero" aria-labelledby="report-heading">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li aria-current="page">Report an Issue</li>
            </ol>
          </nav>
          <p className="eyebrow">Ward 4 Civic Desk</p>
          <h1 id="report-heading">Report a Ward 4 Issue</h1>
          <p className="lead">
            Share details about drainage overflow, water supply gaps, or sanitation concerns in Ward 4,
            Baranagar, and forward them directly via WhatsApp or phone.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container container-narrow">
          <ReportIssueClient />
        </div>
      </section>
    </>
  );
}
