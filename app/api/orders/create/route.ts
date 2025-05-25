// app/api/orders/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Define interface for cart items
interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
  category: string;
}

// Define interface for the expected request body
interface OrderRequestBody {
  // Order and Payment Details
  orderId: string;
  paymentId?: string;
  paymentMethod: 'razorpay' | 'cod';
  // Customer Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // Shipping Information
  address: string;
  city: string;
  state: string;
  pincode: string;
  shippingMethod: string;
  // Order Amounts
  subtotal: number;
  shippingCost: number;
  tax: number;
  totalAmount: number;
  // Cart Items
  cartItems: CartItem[];
}

// Initialize Supabase client
const supabaseUrl = 'https://aclnduopdhcvnelptrst.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey?.toString() ?? "")

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body: OrderRequestBody = await request.json();

    // Insert order into Supabase
    const { data, error } = await supabase
      .from('Orders')
      .insert({
        order_id: body.orderId,
        payment_id: body.paymentId || null,
        payment_method: body.paymentMethod,
        first_name: body.firstName,
        last_name: body.lastName,
        email: body.email,
        phone: body.phone,
        address: body.address,
        city: body.city,
        state: body.state,
        pincode: body.pincode,
        shipping_method: body.shippingMethod,
        subtotal: body.subtotal,
        shipping_cost: body.shippingCost,
        tax: body.tax,
        total_amount: body.totalAmount,
        cart_items: JSON.stringify(body.cartItems)
      })
      .select();

    // Check for any errors during insertion
    if (error) {
      console.error('Error creating order:', error);
      return NextResponse.json(
        {
          success: false,
          message: error.message
        },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      orderId: body.orderId,
      data: data
    });
  } catch (error) {
    console.error('Unexpected error creating order:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}