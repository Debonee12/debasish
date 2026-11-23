import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createEvent, getAllEvents, type EventInput } from "@/lib/events-store";
import { eventCategoryLabels, type EventCategory } from "@/lib/events-types";

function isValidCategory(value: unknown): value is EventCategory {
  return typeof value === "string" && value in eventCategoryLabels;
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const events = await getAllEvents(true);
  return NextResponse.json({ events });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Partial<EventInput>;

    if (!body.title?.trim()) {
      return NextResponse.json({ error: "Event title is required." }, { status: 400 });
    }
    if (!body.description?.trim()) {
      return NextResponse.json({ error: "Event description is required." }, { status: 400 });
    }
    if (!body.date?.trim()) {
      return NextResponse.json({ error: "Event date is required." }, { status: 400 });
    }
    if (!body.location?.trim()) {
      return NextResponse.json({ error: "Event location is required." }, { status: 400 });
    }

    const event = await createEvent({
      title: body.title,
      description: body.description,
      date: body.date,
      endDate: body.endDate,
      location: body.location,
      category: isValidCategory(body.category) ? body.category : "community-camp",
      status: body.status === "draft" ? "draft" : "published",
      images: Array.isArray(body.images) ? body.images : [],
    });

    revalidatePath("/");
    revalidatePath("/events");
    revalidatePath(`/events/${event.slug}`);
    revalidatePath("/sitemap.xml");

    return NextResponse.json({ event }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create event." }, { status: 400 });
  }
}
