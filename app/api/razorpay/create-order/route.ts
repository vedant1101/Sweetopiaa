// app/api/razorpay/create-order/route.ts
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    const { amount, currency = 'INR' } = body;

    // Validate required parameters
    if (!amount) {
      return NextResponse.json(
        { error: 'Amount is required' },
        { status: 400 }
      );
    }
    
    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || '',
      key_secret: process.env.RAZORPAY_KEY_SECRET || '',
    });

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert to paise (Razorpay uses smallest currency unit)
      currency,
      receipt: `receipt_${Date.now()}`,
      notes: {
        source: 'Sweetopiaa website'
      }
      // payment_capture is deprecated, auto-capture is now the default
    });

    // Return order details to client
    return NextResponse.json({
      orderId: order.id,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { error: 'Failed to create payment order' },
      { status: 500 }
    );
  }
}