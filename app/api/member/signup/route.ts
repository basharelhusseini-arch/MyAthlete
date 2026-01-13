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
    const existingMember = store.getAllMembers().find(m => m.email === email);
    if (existingMember) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Create new member
    const newMember = store.createMember({
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth: new Date().toISOString().split('T')[0], // Default to today, can be updated later
      emergencyContact: phone, // Default to their phone
      membershipId: null, // No membership initially
      status: 'active',
      notes: 'Self-registered account',
    });

    // Store password (in production, this should be hashed!)
    // For demo purposes, we're storing it in a simple way
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(`member_password_${newMember.id}`, password);
    }

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
