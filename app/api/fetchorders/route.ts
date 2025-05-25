import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://aclnduopdhcvnelptrst.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey?.toString() ?? "")

// GET method to fetch a specific order
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('order_id');
    const orderNumber = searchParams.get('order_number');

    if (!orderId && !orderNumber) {
      return NextResponse.json(
        {
          success: false,
          message: 'order_id or order_number parameter is required'
        },
        { status: 400 }
      );
    }

    // Build query based on provided parameter
    let query = supabase.from('orders').select('*');
    
    if (orderId) {
      query = query.eq('order_id', orderId);
    } else if (orderNumber) {
      query = query.eq('order_number', orderNumber);
    }

    const { data: order, error: orderError } = await query.single();

    if (orderError) {
      console.error('Error fetching order:', orderError);
      return NextResponse.json(
        {
          success: false,
          message: orderError.message
        },
        { status: 404 }
      );
    }

    // Fetch order products
    const { data: orderProducts, error: productsError } = await supabase
      .from('order_products')
      .select('*')
      .eq('order_id', order.order_id);

    if (productsError) {
      console.error('Error fetching order products:', productsError);
      return NextResponse.json(
        {
          success: false,
          message: productsError.message
        },
        { status: 500 }
      );
    }

    // Return success response with order and products data
    return NextResponse.json({
      success: true,
      order: {
        ...order,
        products: orderProducts || []
      }
    });

  } catch (error) {
    console.error('Unexpected error fetching order:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}