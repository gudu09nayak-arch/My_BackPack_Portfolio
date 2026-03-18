import { db } from './db';
import { randomBytes } from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export interface AdminSession {
  token: string;
  expiresAt: Date;
}

export async function createSession(): Promise<string> {
  const token = randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + SESSION_DURATION);

  await db.adminSession.create({
    data: {
      token,
      expiresAt,
    },
  });

  return token;
}

export async function validateSession(token: string): Promise<boolean> {
  if (!token) return false;

  const session = await db.adminSession.findUnique({
    where: { token },
  });

  if (!session) return false;

  if (new Date() > session.expiresAt) {
    await db.adminSession.delete({ where: { token } });
    return false;
  }

  return true;
}

export async function deleteSession(token: string): Promise<void> {
  try {
    await db.adminSession.delete({ where: { token } });
  } catch {
    // Session might not exist
  }
}

export async function cleanExpiredSessions(): Promise<void> {
  await db.adminSession.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });
}

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function getAdminPassword(): string {
  return ADMIN_PASSWORD;
}
