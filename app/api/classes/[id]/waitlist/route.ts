import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { memberId } = await request.json();
    const classId = params.id;

    if (!memberId) {
      return NextResponse.json(
        { error: 'Member ID is required' },
        { status: 400 }
      );
    }

    const gymClass = store.getClass(classId);
    if (!gymClass) {
      return NextResponse.json(
        { error: 'Class not found' },
        { status: 404 }
      );
    }

    if (gymClass.enrolledMembers.includes(memberId)) {
      return NextResponse.json(
        { error: 'You are already enrolled in this class' },
        { status: 400 }
      );
    }

    const success = store.addToWaitlist(classId, memberId);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to add to waitlist' },
        { status: 400 }
      );
    }

    // Create notification
    store.createNotification(
      memberId,
      'class_reminder',
      'Added to Waitlist',
      `You've been added to the waitlist for ${gymClass.name}. You'll be notified if a spot becomes available.`
    );

    return NextResponse.json({
      message: 'Added to waitlist',
      position: gymClass.waitlist.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { memberId } = await request.json();
    const classId = params.id;

    if (!memberId) {
      return NextResponse.json(
        { error: 'Member ID is required' },
        { status: 400 }
      );
    }

    const success = store.removeFromWaitlist(classId, memberId);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Not on waitlist' },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: 'Removed from waitlist' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
