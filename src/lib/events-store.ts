import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import {
  type CivicEvent,
  type EventImage,
  isUpcomingEvent,
  slugifyEventTitle,
} from "./events-types";

const DATA_DIR = path.join(process.cwd(), "data");
const EVENTS_FILE = path.join(DATA_DIR, "events.json");

let memoryFallback: CivicEvent[] | null = null;

async function ensureEventsFile(): Promise<CivicEvent[]> {
  if (memoryFallback !== null) {
    return memoryFallback;
  }
  try {
    const raw = await fs.readFile(EVENTS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed as CivicEvent[];
    }
    return [];
  } catch (err: unknown) {
    const code = (err as NodeJS.ErrnoException)?.code;
    if (code === "ENOENT") {
      try {
        await fs.mkdir(DATA_DIR, { recursive: true });
        await fs.writeFile(EVENTS_FILE, "[]\n", "utf8");
      } catch {
        // Read-only filesystem (e.g. serverless without persistent disk)
        memoryFallback = [];
      }
      return [];
    }
    return [];
  }
}

async function persistEvents(events: CivicEvent[]): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const tmpFile = `${EVENTS_FILE}.${crypto.randomBytes(4).toString("hex")}.tmp`;
    await fs.writeFile(tmpFile, `${JSON.stringify(events, null, 2)}\n`, "utf8");
    await fs.rename(tmpFile, EVENTS_FILE);
    memoryFallback = null;
  } catch {
    // Fallback to in-memory store if disk is read-only
    memoryFallback = events;
  }
}

export async function getAllEvents(includeDrafts = false): Promise<CivicEvent[]> {
  const all = await ensureEventsFile();
  const filtered = includeDrafts ? all : all.filter((e) => e.status === "published");
  return [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getSplitEvents(now = new Date()): Promise<{
  upcoming: CivicEvent[];
  past: CivicEvent[];
}> {
  const published = await getAllEvents(false);
  const upcoming = published
    .filter((e) => isUpcomingEvent(e, now))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const past = published
    .filter((e) => !isUpcomingEvent(e, now))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return { upcoming, past };
}

export async function getEventBySlug(slug: string, includeDrafts = false): Promise<CivicEvent | null> {
  const all = await getAllEvents(includeDrafts);
  return all.find((e) => e.slug === slug) ?? null;
}

export async function getEventById(id: string): Promise<CivicEvent | null> {
  const all = await ensureEventsFile();
  return all.find((e) => e.id === id) ?? null;
}

function makeUniqueSlug(title: string, existing: CivicEvent[], ignoreId?: string): string {
  const base = slugifyEventTitle(title);
  const taken = new Set(existing.filter((e) => e.id !== ignoreId).map((e) => e.slug));
  if (!taken.has(base)) return base;
  let counter = 2;
  while (taken.has(`${base}-${counter}`)) {
    counter += 1;
  }
  return `${base}-${counter}`;
}

export type EventInput = {
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  category: CivicEvent["category"];
  status: CivicEvent["status"];
  images: EventImage[];
};

export async function createEvent(input: EventInput): Promise<CivicEvent> {
  const events = await ensureEventsFile();
  const now = new Date().toISOString();
  const id = crypto.randomUUID();
  const slug = makeUniqueSlug(input.title, events);
  const normalizedImages = input.images.map((img, index) => ({
    ...img,
    id: img.id || crypto.randomUUID(),
    order: index,
  }));

  const created: CivicEvent = {
    id,
    slug,
    title: input.title.trim(),
    description: input.description.trim(),
    date: input.date,
    endDate: input.endDate?.trim() || undefined,
    location: input.location.trim(),
    category: input.category,
    status: input.status,
    images: normalizedImages,
    createdAt: now,
    updatedAt: now,
  };

  events.push(created);
  await persistEvents(events);
  return created;
}

export async function updateEvent(id: string, input: Partial<EventInput>): Promise<CivicEvent | null> {
  const events = await ensureEventsFile();
  const idx = events.findIndex((e) => e.id === id);
  if (idx === -1) return null;

  const current = events[idx];
  const nextTitle = input.title !== undefined ? input.title.trim() : current.title;
  const nextSlug =
    input.title !== undefined && nextTitle !== current.title
      ? makeUniqueSlug(nextTitle, events, id)
      : current.slug;

  const nextImages =
    input.images !== undefined
      ? input.images.map((img, index) => ({
          ...img,
          id: img.id || crypto.randomUUID(),
          order: index,
        }))
      : current.images;

  const updated: CivicEvent = {
    ...current,
    slug: nextSlug,
    title: nextTitle,
    description: input.description !== undefined ? input.description.trim() : current.description,
    date: input.date !== undefined ? input.date : current.date,
    endDate: input.endDate !== undefined ? input.endDate.trim() || undefined : current.endDate,
    location: input.location !== undefined ? input.location.trim() : current.location,
    category: input.category !== undefined ? input.category : current.category,
    status: input.status !== undefined ? input.status : current.status,
    images: nextImages,
    updatedAt: new Date().toISOString(),
  };

  events[idx] = updated;
  await persistEvents(events);
  return updated;
}

export async function deleteEvent(id: string): Promise<boolean> {
  const events = await ensureEventsFile();
  const next = events.filter((e) => e.id !== id);
  if (next.length === events.length) return false;
  await persistEvents(next);
  return true;
}
