import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";

const SALT_ROUNDS = 12;

export async function hashPassword(password: string) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email: email.toLowerCase() } });
}

export async function findUserByGoogleId(googleId: string) {
  return prisma.user.findUnique({ where: { googleId } });
}

export async function createUser(data: {
  email: string;
  name?: string;
  password?: string;
  googleId?: string;
  image?: string;
}) {
  return prisma.user.create({
    data: {
      email: data.email.toLowerCase(),
      name: data.name,
      passwordHash: data.password ? await hashPassword(data.password) : undefined,
      googleId: data.googleId,
      image: data.image,
    },
  });
}

export async function upsertGoogleUser(data: {
  email: string;
  name?: string;
  googleId: string;
  image?: string;
}) {
  const existing = await findUserByGoogleId(data.googleId);
  if (existing) return existing;
  return prisma.user.upsert({
    where: { email: data.email.toLowerCase() },
    update: { googleId: data.googleId, image: data.image ?? undefined },
    create: {
      email: data.email.toLowerCase(),
      name: data.name,
      googleId: data.googleId,
      image: data.image,
    },
  });
}

export async function createSession(userId: string) {
  const token = nanoid(48);
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  await prisma.session.create({
    data: { userId, token, expiresAt },
  });
  return token;
}

export async function deleteSession(token: string) {
  await prisma.session.deleteMany({ where: { token } });
}