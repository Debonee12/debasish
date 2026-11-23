import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Civic information disclaimer for ${site.name} — Ward 4, Baranagar.`,
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="disc-heading">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li aria-current="page">Disclaimer</li>
            </ol>
          </nav>
          <p className="eyebrow">Notice</p>
          <h1 id="disc-heading">Disclaimer</h1>
        </div>
      </section>

      <section className="section">
        <div className="container container-narrow prose">
          <p>
            This website is a civic information and community outreach portal for Ward 4, Baranagar
            Municipality. Content marked as self-reported or discussion proposals reflects local
            observations and proposed ideas rather than official municipal orders or funded commitments.
          </p>
          <p>
            For source transparency, please review{" "}
            <Link href="/ward-4/evidence-sources">Evidence &amp; Sources</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
