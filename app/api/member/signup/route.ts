import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, password } = body;

    // Validation
    if (!firstName || !lastName || !email || !phone || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingMember = store.getMemberByEmail(email);
    if (existingMember) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Create new member using addMember
    const newMember = store.addMember({
      firstName,
      lastName,
      email,
      phone,
      password, // Store password (in production, this should be hashed!)
      dateOfBirth: new Date().toISOString().split('T')[0], // Default to today, can be updated later
      joinDate: new Date().toISOString(),
      membershipId: null, // No membership initially
      status: 'active',
      notes: 'Self-registered account',
      completedSessions: 0,
    });

    return NextResponse.json({
      success: true,
      memberId: newMember.id,
      firstName: newMember.firstName,
      lastName: newMember.lastName,
      email: newMember.email,
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
}
