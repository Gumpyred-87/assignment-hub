import { NextRequest, NextResponse } from "next/server";
import { upsertGoogleUser, createSession } from "@/lib/auth";
import { cookies } from "next/headers";
import { z } from "zod";

const schema = z.object({
  credential: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { credential } = schema.parse(body);

    const response = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`
    );
    if (!response.ok) {
      return NextResponse.json({ error: "Invalid Google token" }, { status: 400 });
    }
    const payload = await response.json();

    if (payload.aud !== process.env.GOOGLE_CLIENT_ID) {
      return NextResponse.json({ error: "Invalid client ID" }, { status: 400 });
    }

    const user = await upsertGoogleUser({
      email: payload.email,
      name: payload.name,
      googleId: payload.sub,
      image: payload.picture,
    });

    const token = await createSession(user.id);

    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return NextResponse.json({
      user: { id: user.id, email: user.email, name: user.name, image: user.image, plan: user.plan },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.flatten().fieldErrors }, { status: 400 });
    }
    console.error("Google auth error:", err);
    return NextResponse.json({ error: "Google sign-in failed" }, { status: 500 });
  }
}