import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { findUserByEmail, createUser, hashPassword, verifyPassword, createSession } from "@/lib/auth";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1).max(100).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, name } = schema.parse(body);

    const existing = await findUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    const user = await createUser({ email, password, name });
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
      user: { id: user.id, email: user.email, name: user.name, plan: user.plan },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.flatten().fieldErrors }, { status: 400 });
    }
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}