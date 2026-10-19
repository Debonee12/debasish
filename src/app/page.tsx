import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import StatCounter from "@/components/StatCounter";
import RevealWrapper from "@/components/RevealWrapper";
import SourcesFooter from "@/components/SourcesFooter";
import Photo from "@/components/Photo";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Home — Debashis Chowdhury, Ward 4 Baranagar",
  description: site.description,
};

function ArrowRight() {
  return (
    <svg className="arrow" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M4 10h12M12 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}
function DropIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c0 0-7 7.5-7 12a7 7 0 0014 0c0-4.5-7-12-7-12z" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  );
}
function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  );
}
function BroomIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12l6-9 6 9M6 12h12M10 12v9m4-9v9" />
    </svg>
  );
}
function HandIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l-.001-1.5a.375.375 0 00-.375-.375H14.25M16.5 28.35l2.472-2.472a4.5 4.5 0 00-.364-6.366M12 24.75a4.5 4.5 0 01-4.5-4.5" />
    </svg>
  );
}

const activities = [
  { icon: <HeartIcon />, label: "Health & Blood-Donation Camps", href: "/community-work/health-blood-donation-camps" },
  { icon: <BookIcon />, label: "Educational Assistance", href: "/community-work/educational-assistance" },
  { icon: <BroomIcon />, label: "Cleanliness Drives", href: "/community-work/cleanliness-drives" },
  { icon: <HandIcon />, label: "Relief Work", href: "/community-work/relief-work" },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="container hero-inner">
          {/* Left: text */}
          <div>
            <div className="hero-label">
              <span>Ward 4</span>
              Baranagar Municipality
            </div>

            <h1 id="hero-heading">
              <span className="accent">Debashis</span>
              <br />
              Chowdhury
            </h1>
            <p className="hero-sub">{site.tagline}</p>
            <p className="hero-bn">দেবাশিস চৌধুরী — বরানগর পৌরসভা, ওয়ার্ড ৪</p>

            <div className="btn-row">
              <Link href="/ward-4" className="btn btn-green">
                Ward 4 priorities <ArrowRight />
              </Link>
              <Link href="/contact/report-issue" className="btn btn-outline">
                Report an issue
              </Link>
            </div>

            <p className="hero-foot">
              Civic information and supplied profile • {site.asOf}
            </p>
          </div>

          {/* Right: photo collage */}
          <div className="hero-collage" aria-hidden="true">
            <Photo
              src={photos.laneDrain.src}
              alt={photos.laneDrain.alt}
              className="photo-a"
              ratioClass=""
              priority
            />
            <Photo
              src={photos.housingBlock.src}
              alt={photos.housingBlock.alt}
              className="photo-b"
              ratioClass=""
            />
            <div className="hero-badge">
              <strong>
                <StatCounter target={9000} suffix="+" />
              </strong>
              <small>residents reportedly affected</small>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="hero-wave">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" fill="currentColor">
            <path d="M0 30C240 0 480 60 720 30S1200 0 1440 30V60H0z" />
          </svg>
        </div>
      </section>

      {/* ── Stat band ────────────────────────────────────── */}
      <section className="section-tight" aria-label="Key statistics">
        <div className="container">
          <RevealWrapper className="stat-strip reveal">
            <div className="stat-tile highlight">
              <div className="num">
                <StatCounter target={9000} suffix="+" />
              </div>
              <div className="label">residents reportedly affected by drainage issues in Ward 4</div>
            </div>
            <div className="stat-tile">
              <div className="num">34</div>
              <div className="label">total seats in Baranagar Municipality</div>
            </div>
            <div className="stat-tile">
              <div className="num">56%</div>
              <div className="label">winning vote share in Ward 4, 2022 election</div>
            </div>
            <div className="stat-tile">
              <div className="num">747</div>
              <div className="label">vote margin in Ward 4, 2022 election</div>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* ── Ward 4 overview ──────────────────────────────── */}
      <section className="section section-leaf" aria-labelledby="ward4-heading">
        <div className="container">
          <div className="split">
            <div>
              <RevealWrapper className="reveal">
                <div className="section-head">
                  <p className="eyebrow">Ward 4 civic priorities</p>
                  <h2 id="ward4-heading">Drainage, sanitation and water</h2>
                  <p className="lead">
                    Overflowing drains and inadequate sanitation reportedly affect over 9,000 residents.
                    Ambedkar Colony faces daily gaps in water supply and hygiene access.
                  </p>
                </div>

                <ul className="checklist pending" style={{ marginBottom: "2rem" }}>
                  {[
                    "Overflow from major drains (self-reported)",
                    "Inadequate sanitation in several lanes",
                    "Water scarcity in Ambedkar Colony (self-reported)",
                    "Evidence gaps: official records still needed",
                  ].map((t) => (
                    <li key={t}>
                      <CheckIcon />
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="btn-row">
                  <Link href="/ward-4/drainage-sanitation" className="btn btn-green">
                    Drainage & Sanitation <ArrowRight />
                  </Link>
                  <Link href="/ward-4/ambedkar-colony" className="btn btn-outline">
                    Ambedkar Colony
                  </Link>
                </div>
              </RevealWrapper>
            </div>

            <RevealWrapper className="reveal" delay={120}>
              <Photo
                src={photos.wallTreatment.src}
                alt={photos.wallTreatment.alt}
                ratioClass="ratio-4-3"
              />
              <figcaption className="figure" style={{ marginTop: "0.85rem" }}>
                <span className="tag tag-unverified">Location & date unverified</span>
                <span style={{ fontSize: "0.9rem", color: "var(--ink-muted)" }}>
                  {photos.wallTreatment.caption}
                </span>
              </figcaption>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* ── Community work ───────────────────────────────── */}
      <section className="section" aria-labelledby="community-heading">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">Supplied profile</p>
            <h2 id="community-heading">Community activities</h2>
            <p className="lead">
              Health camps, educational assistance, cleanliness drives and relief work — self-reported activities
              listed in the supplied profile. Dates, numbers and independent verification are still needed.
            </p>
          </div>

          <div className="grid grid-4">
            {activities.map((a, i) => (
              <RevealWrapper key={a.label} className="reveal" delay={i * 80}>
                <Link href={a.href} className="card card-hover card-link activity-card">
                  <div className="activity-top" aria-hidden="true" />
                  <div className="activity-body">
                    <div className="icon-badge">{a.icon}</div>
                    <h3>{a.label}</h3>
                    <p style={{ color: "var(--ink-muted)", fontSize: "0.92rem" }}>
                      Dates, photos and numbers are needed to corroborate this activity.
                    </p>
                    <span className="link-arrow" aria-hidden="true">
                      Learn more <ArrowRight />
                    </span>
                  </div>
                </Link>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ── Proposals CTA ────────────────────────────────── */}
      <section className="section section-dark" aria-labelledby="proposals-heading">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Municipal discussion proposals</p>
            <h2 id="proposals-heading">Possible improvements for Ward 4</h2>
            <p className="lead">
              These are municipal discussion proposals. Engineering assessment and funding are required before any
              work begins. No commitments are implied.
            </p>
          </div>

          <div className="steps" style={{ maxWidth: 900 }}>
            {[
              {
                num: "01",
                title: "Drainage improvements",
                items: ["Map blockages and check drain gradients", "Schedule desilting and waste removal", "Track repeat overflow and verify repairs"],
                href: "/proposals/drainage",
              },
              {
                num: "02",
                title: "Water & hygiene",
                items: ["Assess pressure, leaks and supply schedules", "Test water-supply points for contamination", "Review toilets, handwashing and waste collection"],
                href: "/proposals/water-hygiene",
              },
            ].map((p) => (
              <div key={p.num} className="step-card">
                <div className="step-num">{p.num}</div>
                <h3>{p.title}</h3>
                <ul>
                  {p.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
                <Link href={p.href} className="link-arrow" style={{ marginTop: "1.25rem", display: "inline-flex", color: "var(--saffron)" }}>
                  View proposal <ArrowRight />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery teaser ───────────────────────────────── */}
      <section className="section section-saffron" aria-labelledby="gallery-heading">
        <div className="container">
          <div className="split split-reverse">
            <RevealWrapper className="reveal">
              <p className="eyebrow">Gallery</p>
              <h2 id="gallery-heading">Field work & public events</h2>
              <p className="lead" style={{ marginBottom: "1.75rem" }}>
                Six supplied photographs covering drain inspections, sanitation treatment, public events and
                community activities. Locations and dates for most photographs are unverified.
              </p>
              <Link href="/gallery" className="btn btn-green">
                View full gallery <ArrowRight />
              </Link>
            </RevealWrapper>

            <RevealWrapper className="reveal" delay={100}>
              <div className="gallery-grid-3">
                <Photo src={photos.laneDrain.src} alt={photos.laneDrain.alt} ratioClass="ratio-1" />
                <Photo src={photos.statueGarlanding.src} alt={photos.statueGarlanding.alt} ratioClass="ratio-1" />
                <Photo src={photos.healthCamp.src} alt={photos.healthCamp.alt} ratioClass="ratio-1" />
                <Photo src={photos.nightMarch.src} alt={photos.nightMarch.alt} ratioClass="ratio-1" />
                <Photo src={photos.communityWork1.src} alt={photos.communityWork1.alt} ratioClass="ratio-1" />
                <Photo src={photos.communityWork2.src} alt={photos.communityWork2.alt} ratioClass="ratio-1" />
                <Photo src={photos.housingBlock.src} alt={photos.housingBlock.alt} ratioClass="ratio-1" />
                <Photo src={photos.wallTreatment.src} alt={photos.wallTreatment.alt} ratioClass="ratio-1" />
                <Photo src={photos.communityWork3.src} alt={photos.communityWork3.alt} ratioClass="ratio-1" />
              </div>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* ── Sources ──────────────────────────────────────── */}
      <SourcesFooter ids={["brief", "pdf", "photos"]} />
    </>
  );
}
