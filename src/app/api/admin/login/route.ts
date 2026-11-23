import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  createAdminSessionToken,
  isAdminAuthenticated,
  isUsingDefaultPassword,
  verifyAdminPassword,
} from "@/lib/admin-auth";

export async function GET() {
  const authenticated = await isAdminAuthenticated();
  return NextResponse.json({
    authenticated,
    usingDefaultPassword: isUsingDefaultPassword(),
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { password?: string };
    const password = typeof body.password === "string" ? body.password : "";

    if (!password || !verifyAdminPassword(password)) {
      return NextResponse.json({ error: "Invalid administrator password." }, { status: 401 });
    }

    const token = createAdminSessionToken();
    const response = NextResponse.json({
      authenticated: true,
      usingDefaultPassword: isUsingDefaultPassword(),
    });

    response.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12,
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }
}
