import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET - Fetch all social links
export async function GET() {
  try {
    const links = await db.socialLink.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(links);
  } catch (error) {
    console.error('Error fetching social links:', error);
    return NextResponse.json({ error: 'Failed to fetch social links' }, { status: 500 });
  }
}
