import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

async function getUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) return null;
  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });
  if (!session || session.expiresAt < new Date()) return null;
  return session.user.id;
}

export async function GET() {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const projects = await prisma.project.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    include: {
      sections: { select: { id: true } },
      outline: { select: { id: true } },
    },
  });

  return NextResponse.json({ projects });
}

export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      title,
      subject,
      topic,
      type,
      level,
      wordCount,
      tone,
      citation,
      deadline,
    } = body;

    const project = await prisma.project.create({
      data: {
        userId,
        title,
        subject,
        topic,
        type,
        level,
        wordCount,
        tone,
        citation,
        deadline: deadline ? new Date(deadline) : null,
        status: "draft",
      },
    });

    await prisma.usageLog.create({
      data: { userId, projectId: project.id, action: "project_created" },
    });

    return NextResponse.json({ project });
  } catch (err) {
    console.error("Create project error:", err);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}