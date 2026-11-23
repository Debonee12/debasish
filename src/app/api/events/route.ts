import { NextResponse } from "next/server";
import { getSplitEvents } from "@/lib/events-store";

export async function GET() {
  const { upcoming, past } = await getSplitEvents();
  return NextResponse.json({ upcoming, past });
}
