import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { validateSession } from '@/lib/auth';

// GET - Fetch all core pillars
export async function GET() {
  try {
    const pillars = await db.corePillar.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(pillars);
  } catch (error) {
    console.error('Error fetching core pillars:', error);
    return NextResponse.json({ error: 'Failed to fetch core pillars' }, { status: 500 });
  }
}

// PUT - Update core pillars (admin only)
export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token || !(await validateSession(token))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const pillar = await db.corePillar.update({
      where: { id: body.id },
      data: {
        title: body.title,
        description: body.description,
        iconName: body.iconName,
        order: body.order,
        isActive: body.isActive,
      },
    });

    return NextResponse.json(pillar);
  } catch (error) {
    console.error('Error updating core pillar:', error);
    return NextResponse.json({ error: 'Failed to update core pillar' }, { status: 500 });
  }
}
