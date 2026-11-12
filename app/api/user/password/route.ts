import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyPassword, hashPassword } from "@/lib/auth";

async function getUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) return null;
  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });
  if (!session || session.expiresAt < new Date()) return null;
  return { userId: session.user.id, passwordHash: session.user.passwordHash };
}

export async function POST(req: NextRequest) {
  const auth = await getUserId();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!auth.passwordHash) {
    return NextResponse.json({ error: "Cannot change password for OAuth accounts" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { current, new: newPassword } = body;

    const valid = await verifyPassword(current, auth.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
    }

    const newHash = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: auth.userId },
      data: { passwordHash: newHash },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Password change error:", err);
    return NextResponse.json({ error: "Failed to change password" }, { status: 500 });
  }
}