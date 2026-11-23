export type EventImage = {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  sizeBytes?: number;
  order: number;
};

export type EventCategory =
  | "community-camp"
  | "public-meeting"
  | "cleanliness-drive"
  | "relief-work"
  | "educational-support"
  | "civic-inspection";

export type CivicEvent = {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date or datetime string (YYYY-MM-DD or YYYY-MM-DDTHH:mm)
  endDate?: string;
  location: string;
  category: EventCategory;
  status: "published" | "draft";
  images: EventImage[];
  createdAt: string;
  updatedAt: string;
};

export const eventCategoryLabels: Record<EventCategory, string> = {
  "community-camp": "Health & Community Camp",
  "public-meeting": "Public Meeting",
  "cleanliness-drive": "Cleanliness Drive",
  "relief-work": "Relief Work",
  "educational-support": "Educational Support",
  "civic-inspection": "Civic Inspection",
};

/**
 * Determine whether an event is upcoming relative to the current date.
 * Events on today's date (or later) are considered upcoming.
 */
export function isUpcomingEvent(event: Pick<CivicEvent, "date" | "endDate">, now = new Date()): boolean {
  const reference = event.endDate || event.date;
  if (!reference) return false;
  const parsed = new Date(reference.length === 10 ? `${reference}T23:59:59` : reference);
  if (Number.isNaN(parsed.getTime())) return false;
  return parsed.getTime() >= now.getTime();
}

export function formatEventDate(dateStr: string): string {
  if (!dateStr) return "";
  const hasTime = dateStr.includes("T") && dateStr.length > 10;
  const parsed = new Date(hasTime ? dateStr : `${dateStr}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return dateStr;

  const dateFormatted = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsed);

  if (!hasTime) return dateFormatted;

  const timeFormatted = new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(parsed);

  return `${dateFormatted} · ${timeFormatted}`;
}

export function slugifyEventTitle(title: string): string {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return base || "ward-4-event";
}
