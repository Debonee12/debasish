import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSocialSettings, updateSocialSettings } from "@/lib/settings-store";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const settings = await getSocialSettings();
  return NextResponse.json({ settings });
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      facebookUrl?: string;
      instagramUrl?: string;
    };
    const settings = await updateSocialSettings({
      facebookUrl: body.facebookUrl,
      instagramUrl: body.instagramUrl,
    });

    revalidatePath("/", "layout");
    revalidatePath("/contact");

    return NextResponse.json({ settings });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid social settings";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
