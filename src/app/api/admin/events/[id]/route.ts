import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { deleteEvent, getEventById, updateEvent, type EventInput } from "@/lib/events-store";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const existing = await getEventById(id);
    if (!existing) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 });
    }

    const body = (await request.json()) as Partial<EventInput>;
    const updated = await updateEvent(id, body);
    if (!updated) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 });
    }

    revalidatePath("/");
    revalidatePath("/events");
    revalidatePath(`/events/${existing.slug}`);
    revalidatePath(`/events/${updated.slug}`);
    revalidatePath("/sitemap.xml");

    return NextResponse.json({ event: updated });
  } catch {
    return NextResponse.json({ error: "Failed to update event." }, { status: 400 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const existing = await getEventById(id);
  const removed = await deleteEvent(id);
  if (!removed) {
    return NextResponse.json({ error: "Event not found." }, { status: 404 });
  }

  revalidatePath("/");
  revalidatePath("/events");
  if (existing) {
    revalidatePath(`/events/${existing.slug}`);
  }
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ deleted: true });
}
