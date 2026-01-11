import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Authenticate member with password
    const member = store.authenticateMember(email, password);

    if (!member) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Return member info (exclude password)
    const { password: _, ...memberInfo } = member;
    return NextResponse.json({
      memberId: member.id,
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email,
      completedSessions: member.completedSessions || 0,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
