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

    if (gymClass.status !== 'scheduled') {
      return NextResponse.json(
        { error: 'Class is not available for enrollment' },
        { status: 400 }
      );
    }

    if (gymClass.enrolledMembers.includes(memberId)) {
      return NextResponse.json(
        { error: 'Already enrolled in this class' },
        { status: 400 }
      );
    }

    if (gymClass.enrolledMembers.length >= gymClass.capacity) {
      return NextResponse.json(
        { error: 'Class is full' },
        { status: 400 }
      );
    }

    // Add member to enrolled list
    const updatedClass = store.updateClass(classId, {
      enrolledMembers: [...gymClass.enrolledMembers, memberId],
    });

    if (!updatedClass) {
      return NextResponse.json(
        { error: 'Class not found' },
        { status: 404 }
      );
    }

    // Remove from waitlist if they were on it
    store.removeFromWaitlist(classId, memberId);

    // Create notification
    store.createNotification(
      memberId,
      'class_reminder',
      'Class Enrollment Confirmed',
      `You've been enrolled in ${updatedClass.name} on ${new Date(updatedClass.date).toLocaleDateString()} at ${updatedClass.startTime}.`
    );

    return NextResponse.json(updatedClass);
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

    const gymClass = store.getClass(classId);
    if (!gymClass) {
      return NextResponse.json(
        { error: 'Class not found' },
        { status: 404 }
      );
    }

    if (!gymClass.enrolledMembers.includes(memberId)) {
      return NextResponse.json(
        { error: 'Not enrolled in this class' },
        { status: 400 }
      );
    }

    // Remove member from enrolled list
    const updatedEnrolled = gymClass.enrolledMembers.filter(id => id !== memberId);
    const updatedClass = store.updateClass(classId, {
      enrolledMembers: updatedEnrolled,
    });

    if (!updatedClass) {
      return NextResponse.json(
        { error: 'Class not found' },
        { status: 404 }
      );
    }

    // Process waitlist - move next person up if available
    store.processWaitlist(classId);

    // Create notification
    store.createNotification(
      memberId,
      'class_cancelled',
      'Class Enrollment Cancelled',
      `Your enrollment in ${gymClass.name} has been cancelled.`
    );

    return NextResponse.json(updatedClass);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
