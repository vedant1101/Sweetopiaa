import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://aclnduopdhcvnelptrst.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey?.toString() ?? "")

export interface Product {
  id: number;
  product_name: string;
  small_price: number | null;
  large_price: number;
  product_description: string;
  category: string;
}

export async function GET() {
  try {
    // Fetch all products from the Products_master table using Supabase
    const { data: products, error } = await supabase
      .from('products')
      .select('*');

    // Check for any errors during fetching
    if (error) {
      console.error('Error fetching products:', error);
      return NextResponse.json(
        {
          success: false,
          message: error.message
        },
        { status: 500 }
      );
    }

    // Return success response with products data
    return NextResponse.json({
      success: true,
      products
    });
  } catch (error) {
    console.error('Unexpected error fetching products:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}