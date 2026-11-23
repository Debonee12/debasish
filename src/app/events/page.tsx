import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { getSplitEvents } from "@/lib/events-store";
import { eventCategoryLabels, formatEventDate, type CivicEvent } from "@/lib/events-types";
import { canonicalUrl, site } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Community Events — Upcoming & Past",
  description:
    "Upcoming and past community events, health camps, cleanliness drives, and public meetings in Ward 4, Baranagar Municipality.",
  alternates: {
    canonical: "/events",
  },
  openGraph: {
    title: `Community Events | ${site.name}`,
    description:
      "Upcoming and past community events and photo galleries from Ward 4, Baranagar Municipality.",
    url: canonicalUrl("/events"),
  },
};

function EventCard({ event, upcoming }: { event: CivicEvent; upcoming: boolean }) {
  const cover = event.images[0];
  return (
    <Link href={`/events/${event.slug}`} className="card card-hover card-link event-card">
      <div className="event-card-media">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover.url}
            alt={cover.alt || event.title}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="photo-placeholder" style={{ height: "100%" }}>
            <strong>{eventCategoryLabels[event.category]}</strong>
          </div>
        )}
      </div>
      <div className="event-card-body">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          <span className={`tag ${upcoming ? "tag-water" : "tag-saffron"}`}>
            {upcoming ? "Upcoming" : "Past Event"}
          </span>
          <span className="tag">{eventCategoryLabels[event.category]}</span>
        </div>
        <h3 style={{ margin: "0.2rem 0 0" }}>{event.title}</h3>
        <div className="event-meta">
          <span>📅 {formatEventDate(event.date)}</span>
          <span>📍 {event.location}</span>
        </div>
        <p style={{ color: "var(--ink-soft)", fontSize: "0.94rem", margin: 0 }}>
          {event.description.length > 140
            ? `${event.description.slice(0, 140).trim()}…`
            : event.description}
        </p>
        <span className="link-arrow" style={{ marginTop: "auto", paddingTop: "0.5rem" }}>
          View event {event.images.length > 0 ? `& ${event.images.length} photo${event.images.length > 1 ? "s" : ""}` : ""} →
        </span>
      </div>
    </Link>
  );
}

export default async function EventsPage() {
  const { upcoming, past } = await getSplitEvents();
  const all = [...upcoming, ...past];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Events", item: canonicalUrl("/events") },
    ],
  };

  const eventsLd = all.map((ev) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: ev.title,
    description: ev.description,
    startDate: ev.date,
    ...(ev.endDate ? { endDate: ev.endDate } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: ev.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Baranagar",
        addressRegion: "West Bengal",
        addressCountry: "IN",
      },
    },
    organizer: {
      "@type": "Person",
      name: site.name,
    },
    url: canonicalUrl(`/events/${ev.slug}`),
    ...(ev.images.length > 0
      ? { image: ev.images.map((img) => (img.url.startsWith("http") ? img.url : `${site.url}${img.url}`)) }
      : {}),
  }));

  return (
    <>
      <JsonLd data={[breadcrumbLd, ...eventsLd]} />

      <section className="page-hero" aria-labelledby="events-heading">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li aria-current="page">Events</li>
            </ol>
          </nav>
          <p className="eyebrow">Ward 4 &amp; Baranagar</p>
          <h1 id="events-heading">Community Events</h1>
          <p className="lead">
            Upcoming schedules and past community events, health camps, cleanliness drives, and public
            programmes in Ward 4, Baranagar.
          </p>
          <div className="btn-row" style={{ marginTop: "1.25rem" }}>
            <a href="#upcoming-events" className="btn btn-green btn-sm">
              Upcoming ({upcoming.length})
            </a>
            <a href="#past-events" className="btn btn-outline btn-sm">
              Past Events ({past.length})
            </a>
          </div>
        </div>
      </section>

      <section id="upcoming-events" className="section" aria-labelledby="upcoming-heading">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Schedule</p>
            <h2 id="upcoming-heading">Upcoming Events</h2>
          </div>

          {upcoming.length === 0 ? (
            <div className="note" style={{ maxWidth: 680 }}>
              <p style={{ margin: 0 }}>
                No upcoming events are currently scheduled. Check back soon or{" "}
                <Link href="/contact">contact us</Link> for Ward 4 updates.
              </p>
            </div>
          ) : (
            <div className="grid grid-3">
              {upcoming.map((ev) => (
                <EventCard key={ev.id} event={ev} upcoming />
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="past-events" className="section section-leaf" aria-labelledby="past-heading">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Archive &amp; Photo Galleries</p>
            <h2 id="past-heading">Past Events</h2>
          </div>

          {past.length === 0 ? (
            <div className="note" style={{ maxWidth: 680 }}>
              <p style={{ margin: 0 }}>
                Past event galleries will appear here as events are published. Meanwhile, you can browse
                the <Link href="/gallery">field work photo gallery</Link>.
              </p>
            </div>
          ) : (
            <div className="grid grid-3">
              {past.map((ev) => (
                <EventCard key={ev.id} event={ev} upcoming={false} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
