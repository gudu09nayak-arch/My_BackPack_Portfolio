import { NextRequest, NextResponse } from 'next/server';
import { validateSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ valid: false }, { status: 401 });
    }

    const isValid = await validateSession(token);

    return NextResponse.json({ valid: isValid });
  } catch (error) {
    console.error('Verify error:', error);
    return NextResponse.json({ valid: false }, { status: 500 });
  }
}
