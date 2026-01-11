import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function POST(request: NextRequest) {
  try {
    const { memberId, membershipId, amount, paymentMethod } = await request.json();

    if (!memberId || !membershipId || !amount || !paymentMethod) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // In production, integrate with Stripe/PayPal/etc here
    // For demo, we'll simulate a successful payment
    const payment = store.createPayment({
      memberId,
      membershipId,
      amount,
      paymentMethod,
      status: 'completed',
      transactionId: `TXN-${Date.now()}`,
    });

    // Create notification
    const membership = store.getMembership(membershipId);
    store.createNotification(
      memberId,
      'payment_receipt',
      'Payment Received',
      `Your payment of $${amount.toFixed(2)} for ${membership?.name || 'membership'} has been processed. Transaction ID: ${payment.transactionId}`
    );

    return NextResponse.json(payment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const memberId = searchParams.get('memberId');

    if (!memberId) {
      return NextResponse.json(
        { error: 'Member ID is required' },
        { status: 400 }
      );
    }

    const payments = store.getMemberPayments(memberId);
    return NextResponse.json(payments);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
