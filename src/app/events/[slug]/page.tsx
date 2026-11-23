import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import EventGallery from "@/components/EventGallery";
import JsonLd from "@/components/JsonLd";
import { getEventBySlug } from "@/lib/events-store";
import { eventCategoryLabels, formatEventDate, isUpcomingEvent } from "@/lib/events-types";
import { canonicalUrl, site, whatsappLink } from "@/lib/site";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug, false);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  const coverUrl = event.images[0]?.url;
  const absoluteImage = coverUrl
    ? coverUrl.startsWith("http")
      ? coverUrl
      : `${site.url}${coverUrl}`
    : `${site.url}/photos/debasis-3.jpg`;

  return {
    title: event.title,
    description: event.description.slice(0, 160),
    alternates: {
      canonical: `/events/${event.slug}`,
    },
    openGraph: {
      title: `${event.title} | ${site.name}`,
      description: event.description.slice(0, 160),
      url: canonicalUrl(`/events/${event.slug}`),
      type: "article",
      images: [{ url: absoluteImage, alt: event.images[0]?.alt || event.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: event.description.slice(0, 160),
      images: [absoluteImage],
    },
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug, false);

  if (!event) {
    notFound();
  }

  const upcoming = isUpcomingEvent(event);
  const pageUrl = canonicalUrl(`/events/${event.slug}`);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Events", item: canonicalUrl("/events") },
      { "@type": "ListItem", position: 3, name: event.title, item: pageUrl },
    ],
  };

  const eventLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.date,
    ...(event.endDate ? { endDate: event.endDate } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.location,
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
    url: pageUrl,
    ...(event.images.length > 0
      ? {
          image: event.images.map((img) =>
            img.url.startsWith("http") ? img.url : `${site.url}${img.url}`
          ),
        }
      : {}),
  };

  return (
    <>
      <JsonLd data={[breadcrumbLd, eventLd]} />

      <section className="page-hero" aria-labelledby="event-title">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/events">Events</Link></li>
              <li aria-current="page">{event.title}</li>
            </ol>
          </nav>

          <div className="tag-row" style={{ marginBottom: "0.75rem" }}>
            <span className={`tag ${upcoming ? "tag-water" : "tag-saffron"}`}>
              {upcoming ? "Upcoming Event" : "Past Event"}
            </span>
            <span className="tag">{eventCategoryLabels[event.category]}</span>
          </div>

          <h1 id="event-title">{event.title}</h1>
          <p className="lead">
            📅 {formatEventDate(event.date)}
            {event.endDate ? ` — ${formatEventDate(event.endDate)}` : ""} · 📍 {event.location}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split" style={{ alignItems: "start", marginBottom: "3rem" }}>
            <div className="prose">
              <h2>About this event</h2>
              <p style={{ whiteSpace: "pre-line" }}>{event.description}</p>
            </div>

            <div className="card">
              <h3>Event details</h3>
              <dl className="facts">
                <div><dt>Date</dt><dd>{formatEventDate(event.date)}</dd></div>
                {event.endDate && <div><dt>End</dt><dd>{formatEventDate(event.endDate)}</dd></div>}
                <div><dt>Location</dt><dd>{event.location}</dd></div>
                <div><dt>Category</dt><dd>{eventCategoryLabels[event.category]}</dd></div>
                <div><dt>Photos</dt><dd>{event.images.length}</dd></div>
              </dl>

              <div className="btn-row" style={{ marginTop: "1.25rem" }}>
                <a
                  href={whatsappLink(`Hello, I have a question about the event: ${event.title}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-green btn-sm"
                >
                  Ask on WhatsApp
                </a>
                <Link href="/events" className="btn btn-outline btn-sm">
                  All Events
                </Link>
              </div>
            </div>
          </div>

          <div className="section-head">
            <p className="eyebrow">Photographs</p>
            <h2>Event Gallery</h2>
          </div>
          <EventGallery images={event.images} eventTitle={event.title} />
        </div>
      </section>
    </>
  );
}
