import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getPlanLimits } from "@/lib/utils";

async function getUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) return null;
  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });
  if (!session || session.expiresAt < new Date()) return null;
  return { userId: session.user.id, plan: session.user.plan };
}

export async function GET() {
  const auth = await getUserId();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const planLimits = getPlanLimits(auth.plan);
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);

  const projectsThisMonth = await prisma.project.count({
    where: {
      userId: auth.userId,
      createdAt: { gte: monthStart },
    },
  });

  return NextResponse.json({
    used: projectsThisMonth,
    limit: planLimits.projectsPerMonth,
    plan: auth.plan,
  });
}