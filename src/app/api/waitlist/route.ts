import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { validateSession } from '@/lib/auth';

// GET - Fetch all waitlist entries (admin only)
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token || !(await validateSession(token))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const entries = await db.waitlistEntry.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(entries);
  } catch (error) {
    console.error('Error fetching waitlist:', error);
    return NextResponse.json({ error: 'Failed to fetch waitlist' }, { status: 500 });
  }
}

// POST - Join waitlist (public)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if email already exists
    const existing = await db.waitlistEntry.findUnique({
      where: { email: body.email },
    });

    if (existing) {
      return NextResponse.json({ success: true, message: 'Already on waitlist' });
    }

    await db.waitlistEntry.create({
      data: {
        email: body.email,
        source: body.source || 'portfolio',
      },
    });

    return NextResponse.json({ success: true, message: 'Added to waitlist' });
  } catch (error) {
    console.error('Error joining waitlist:', error);
    return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 });
  }
}
