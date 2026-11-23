import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy & Photo Consent",
  description: `Privacy notice and photograph consent policy for ${site.name} — Ward 4, Baranagar.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="priv-heading">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li aria-current="page">Privacy &amp; Photo Consent</li>
            </ol>
          </nav>
          <p className="eyebrow">Policy</p>
          <h1 id="priv-heading">Privacy &amp; Photo Consent</h1>
        </div>
      </section>

      <section className="section">
        <div className="container container-narrow prose">
          <h2>Information Handling</h2>
          <p>
            This website provides civic information regarding Ward 4, Baranagar Municipality. Contact
            channels (WhatsApp and phone) are provided for direct resident communication.
          </p>
          <h2>Event &amp; Community Photographs</h2>
          <p>
            Photographs published on this website depict public community activities, civic inspections,
            and events. If you appear in a photograph and wish to request removal or a caption update,
            please reach out via the <Link href="/contact">Contact page</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
