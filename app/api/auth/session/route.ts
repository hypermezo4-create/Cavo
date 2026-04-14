import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth-constants";
import { firebaseAdminAuth, isAdminEmail } from "@/lib/server/firebase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EXPIRES_IN = 1000 * 60 * 60 * 24 * 5;

export async function POST(request: Request) {
  try {
    const { idToken } = (await request.json()) as { idToken?: string };

    if (!idToken) {
      return NextResponse.json({ error: "Missing id token." }, { status: 400 });
    }

    const auth = firebaseAdminAuth();
    const decoded = await auth.verifyIdToken(idToken);

    if (!isAdminEmail(decoded.email)) {
      return NextResponse.json({ error: "This account does not have admin access." }, { status: 403 });
    }

    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn: EXPIRES_IN });

    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: ADMIN_SESSION_COOKIE,
      value: sessionCookie,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: EXPIRES_IN / 1000,
    });

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create session.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
