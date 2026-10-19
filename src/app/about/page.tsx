import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import SourcesFooter from "@/components/SourcesFooter";
import RevealWrapper from "@/components/RevealWrapper";
import { photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Profile",
  description: "Supplied civic profile of Debashis Chowdhury — community activities, political association and Ward 4 work.",
};

function ArrowRight() {
  return (
    <svg className="arrow" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M4 10h12M12 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="about-heading">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li aria-current="page">About</li>
            </ol>
          </nav>
          <p className="eyebrow">Supplied profile</p>
          <h1 id="about-heading">Debashis Chowdhury</h1>
          <p className="lead">
            Community work in Ward 4, Baranagar Municipality — health camps, educational assistance,
            cleanliness drives and relief work. Profile details are self-reported from the supplied PDF.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="profile-heading">
        <div className="container">
          <div className="split">
            <div>
              <RevealWrapper className="reveal">
                <p className="eyebrow">Supplied profile</p>
                <h2 id="profile-heading">At a glance</h2>
                <dl className="facts">
                  <div><dt>Name</dt><dd>Debashis Chowdhury</dd></div>
                  <div><dt>Bengali</dt><dd>দেবাশিস চৌধুরী</dd></div>
                  <div><dt>Ward</dt><dd>Ward 4, Baranagar Municipality, North 24 Parganas</dd></div>
                  <div><dt>Education</dt><dd>Diploma, Electronics &amp; Telecommunication Engineering</dd></div>
                  <div><dt>Political association</dt><dd>BJP, stated from 2019 (start date needs documentary confirmation)</dd></div>
                  <div><dt>Profile source</dt><dd>Supplied PDF, 8 October 2026</dd></div>
                </dl>

                <div className="btn-row" style={{ marginTop: "2rem" }}>
                  <Link href="/about/education" className="btn btn-green">
                    Education <ArrowRight />
                  </Link>
                  <Link href="/about/political-engagement" className="btn btn-outline">
                    Political engagement
                  </Link>
                </div>
              </RevealWrapper>
            </div>

            <RevealWrapper className="reveal" delay={120}>
              <Photo
                src={photos.statueGarlanding.src}
                alt={photos.statueGarlanding.alt}
                ratioClass="ratio-4-5"
              />
              <p style={{ marginTop: "0.85rem", fontSize: "0.9rem", color: "var(--ink-muted)" }}>
                <span className="tag tag-unverified" style={{ marginRight: "0.5rem" }}>Note</span>
                {photos.statueGarlanding.note}
              </p>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* Community activities summary */}
      <section className="section section-leaf" aria-labelledby="community-heading">
        <div className="container">
          <p className="eyebrow">Self-reported activities</p>
          <h2 id="community-heading">Community activities</h2>
          <p style={{ maxWidth: "65ch", color: "var(--ink-soft)", marginBottom: "2rem" }}>
            The supplied profile lists four areas of community activity. Dates, photographs and numbers
            are needed to corroborate each one.
          </p>
          <div className="grid grid-2">
            {[
              { title: "Health & Blood-Donation Camps", href: "/community-work/health-blood-donation-camps" },
              { title: "Educational Assistance", href: "/community-work/educational-assistance" },
              { title: "Cleanliness Drives", href: "/community-work/cleanliness-drives" },
              { title: "Relief Work", href: "/community-work/relief-work" },
            ].map((a) => (
              <Link key={a.href} href={a.href} className="card card-hover card-link">
                <h3>{a.title}</h3>
                <p style={{ color: "var(--ink-muted)", fontSize: "0.93rem" }}>
                  Dates, photos and numbers still needed.
                </p>
                <span className="link-arrow" style={{ marginTop: "auto", paddingTop: "0.75rem" }}>
                  Details <ArrowRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SourcesFooter ids={["pdf", "photos", "userStatement"]} />
    </>
  );
}
