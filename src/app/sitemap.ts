import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllEvents } from "@/lib/events-store";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/about",
    "/about/education",
    "/about/political-engagement",
    "/community-work",
    "/community-work/health-blood-donation-camps",
    "/community-work/educational-assistance",
    "/community-work/cleanliness-drives",
    "/community-work/relief-work",
    "/events",
    "/gallery",
    "/ward-4",
    "/ward-4/drainage-sanitation",
    "/ward-4/ambedkar-colony",
    "/ward-4/election-2022",
    "/ward-4/evidence-sources",
    "/proposals",
    "/proposals/drainage",
    "/proposals/water-hygiene",
    "/contact",
    "/contact/report-issue",
    "/privacy",
    "/disclaimer",
  ];

  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: route ? `${site.url}${route}` : site.url,
    lastModified: now,
    changeFrequency: route === "" || route === "/events" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/events" || route === "/contact" ? 0.9 : 0.7,
  }));

  const events = await getAllEvents(false);
  const eventEntries: MetadataRoute.Sitemap = events.map((ev) => ({
    url: `${site.url}/events/${ev.slug}`,
    lastModified: new Date(ev.updatedAt || ev.createdAt || now),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...eventEntries];
}
