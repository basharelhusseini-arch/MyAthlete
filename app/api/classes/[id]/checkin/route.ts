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

    const success = store.checkInMember(classId, memberId);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to check in. Make sure you are enrolled in this class.' },
        { status: 400 }
      );
    }

    const gymClass = store.getClass(classId);
    return NextResponse.json({
      message: 'Successfully checked in',
      class: gymClass,
      sessionsCompleted: store.getMemberSessions(memberId),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
