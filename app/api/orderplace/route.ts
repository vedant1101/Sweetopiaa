import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const supabaseUrl = 'https://aclnduopdhcvnelptrst.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey?.toString() ?? "")

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export interface OrderProduct {
    product_id: string;
    product_name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
}

export interface OrderRequest {
  // Order details
  order_number: string;
  order_status?: string;
  
  // Customer information
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  
  // Billing address
  billing_address_line1?: string;
  billing_address_line2?: string;
  billing_city?: string;
  billing_state?: string;
  billing_postal_code?: string;
  billing_country?: string;
  
  // Shipping address
  shipping_address_line1?: string;
  shipping_address_line2?: string;
  shipping_city?: string;
  shipping_state?: string;
  shipping_postal_code?: string;
  shipping_country?: string;
  
  // Financial information
  subtotal: number;
  tax_amount?: number;
  shipping_cost?: number;
  shipping_method?: string;
  discount_amount?: number;
  total_amount: number;
  currency?: string;
  
  // Payment information
  payment_method: string;
  payment_status: string;
  payment_date?: string;
  transaction_id?: string;
  payment_gateway?: string;
  
  // Additional information
  special_instructions?: string;
  coupon_code?: string;
  
  // Products in the order
  products: OrderProduct[];
}

// Function to send email notification
async function sendOrderNotification(orderData: OrderRequest, orderId: string) {
  try {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.NOTIFICATION_EMAIL, // Your notification email
      subject: `🛍️ New Order Received - ${orderData.order_number}`,
      html: `
        <div style="font-family: 'Arial', sans-serif; max-width: 700px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
          <div style="background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #8e8b63, #a09975); color: white; padding: 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px; font-weight: bold;">🛍️ New Order Alert</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Sweetopiaa Order Management</p>
            </div>

            <!-- Order Summary -->
            <div style="padding: 30px;">
              <div style="background: #f1f3f4; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <h2 style="color: #8e8b63; margin: 0 0 15px 0; font-size: 20px;">📋 Order Summary</h2>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                  <p style="margin: 5px 0;"><strong>Order Number:</strong> ${orderData.order_number}</p>
                  <p style="margin: 5px 0;"><strong>Order ID:</strong> ${orderId}</p>
                  <p style="margin: 5px 0;"><strong>Status:</strong> <span style="color: #28a745; font-weight: bold;">${orderData.order_status || 'Completed'}</span></p>
                  <p style="margin: 5px 0;"><strong>Payment:</strong> ${orderData.payment_method.toUpperCase()}</p>
                  <p style="margin: 5px 0;"><strong>Delivery:</strong> <span style="color: #8e8b63; font-weight: bold;">${orderData.shipping_method === 'express' ? 'Express Delivery' : 'Standard Delivery'}</span></p>
                </div>
              </div>

              <!-- Customer Details -->
              <div style="background: #e8f4f8; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <h3 style="color: #8e8b63; margin: 0 0 15px 0; font-size: 18px;">👤 Customer Information</h3>
                <p style="margin: 8px 0;"><strong>Name:</strong> ${orderData.customer_name}</p>
                <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${orderData.customer_email}" style="color: #8e8b63;">${orderData.customer_email}</a></p>
                <p style="margin: 8px 0;"><strong>Phone:</strong> <a href="tel:${orderData.customer_phone}" style="color: #8e8b63;">${orderData.customer_phone || 'Not provided'}</a></p>
              </div>

              <!-- Shipping Address -->
              <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <h3 style="color: #8e8b63; margin: 0 0 15px 0; font-size: 18px;">📍 Delivery Address</h3>
                <div style="line-height: 1.6;">
                  <p style="margin: 0; font-weight: bold;">${orderData.customer_name}</p>
                  <p style="margin: 5px 0 0 0;">${orderData.shipping_address_line1}</p>
                  ${orderData.shipping_address_line2 ? `<p style="margin: 0;">${orderData.shipping_address_line2}</p>` : ''}
                  <p style="margin: 5px 0 0 0;">${orderData.shipping_city}, ${orderData.shipping_state}</p>
                  <p style="margin: 0;"><strong>Pincode:</strong> ${orderData.shipping_postal_code}</p>
                  <p style="margin: 0;">${orderData.shipping_country}</p>
                </div>
              </div>

              <!-- Order Items -->
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <h3 style="color: #8e8b63; margin: 0 0 20px 0; font-size: 18px;">📦 Items Ordered</h3>
                <div style="overflow-x: auto;">
                  <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 6px; overflow: hidden;">
                    <thead>
                      <tr style="background: #8e8b63; color: white;">
                        <th style="padding: 12px; text-align: left; font-weight: 600;">Product</th>
                        <th style="padding: 12px; text-align: center; font-weight: 600;">Qty</th>
                        <th style="padding: 12px; text-align: right; font-weight: 600;">Unit Price</th>
                        <th style="padding: 12px; text-align: right; font-weight: 600;">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${orderData.products.map((item, index) => `
                        <tr style="background: ${index % 2 === 0 ? '#f8f9fa' : 'white'}; border-bottom: 1px solid #dee2e6;">
                          <td style="padding: 15px; font-weight: 500;">${item.product_name}</td>
                          <td style="padding: 15px; text-align: center;">${item.quantity}</td>
                          <td style="padding: 15px; text-align: right;">₹${item.unit_price.toLocaleString('en-IN')}</td>
                          <td style="padding: 15px; text-align: right; font-weight: 600;">₹${item.total_price.toLocaleString('en-IN')}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Payment Summary -->
              <div style="background: #d4edda; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <h3 style="color: #8e8b63; margin: 0 0 15px 0; font-size: 18px;">💰 Financial Summary</h3>
                <div style="background: white; padding: 15px; border-radius: 6px;">
                  <div style="display: flex; justify-content: space-between; margin: 8px 0; padding: 5px 0;">
                    <span>Subtotal:</span>
                    <span>₹${orderData.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; margin: 8px 0; padding: 5px 0;">
                    <span>Delivery Charges ${orderData.shipping_method === 'express' ? '(Express)' : '(Standard)'}:</span>
                    <span>₹${(orderData.shipping_cost || 0).toLocaleString('en-IN')}</span>
                  </div>
                  ${orderData.discount_amount ? `
                  <div style="display: flex; justify-content: space-between; margin: 8px 0; padding: 5px 0; color: #28a745;">
                    <span>Discount:</span>
                    <span>-₹${orderData.discount_amount.toLocaleString('en-IN')}</span>
                  </div>
                  ` : ''}
                  <hr style="border: none; border-top: 2px solid #8e8b63; margin: 15px 0;">
                  <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; color: #8e8b63;">
                    <span>Total Amount:</span>
                    <span>₹${orderData.total_amount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <!-- Payment & Transaction Info -->
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <h3 style="color: #8e8b63; margin: 0 0 15px 0; font-size: 18px;">💳 Payment Details</h3>
                <p style="margin: 8px 0;"><strong>Payment Method:</strong> ${orderData.payment_method.toUpperCase()}</p>
                <p style="margin: 8px 0;"><strong>Payment Status:</strong> <span style="color: #28a745; font-weight: bold;">${orderData.payment_status}</span></p>
                ${orderData.transaction_id ? `<p style="margin: 8px 0;"><strong>Transaction ID:</strong> ${orderData.transaction_id}</p>` : ''}
                ${orderData.payment_gateway ? `<p style="margin: 8px 0;"><strong>Gateway:</strong> ${orderData.payment_gateway}</p>` : ''}
              </div>

              <!-- Additional Info -->
              ${orderData.special_instructions ? `
              <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <h3 style="color: #8e8b63; margin: 0 0 15px 0; font-size: 18px;">📝 Special Instructions</h3>
                <p style="margin: 0; font-style: italic;">${orderData.special_instructions}</p>
              </div>
              ` : ''}

              <!-- Footer -->
              <div style="text-align: center; padding-top: 20px; border-top: 2px solid #8e8b63; color: #666;">
                <p style="margin: 10px 0; font-size: 14px;">⏰ Order placed on: ${new Date(orderData.payment_date || new Date()).toLocaleString('en-IN', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
                <p style="margin: 10px 0; font-size: 12px; color: #999;">This is an automated notification from Sweetopiaa Order Management System</p>
              </div>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Order notification email sent successfully');
  } catch (error) {
    console.error('Failed to send order notification email:', error);
    // Don't throw error - we don't want email failure to break order creation
  }
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const orderData: OrderRequest = await request.json();
    
    // Validate required fields
    if (!orderData.order_number || !orderData.customer_name || !orderData.customer_email || 
        !orderData.products || orderData.products.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields: order_number, customer_name, customer_email, or products'
        },
        { status: 400 }
      );
    }

    // Extract product IDs for the orders table
    const product_ids = orderData.products.map(product => product.product_id);

    // Insert the main order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderData.order_number,
        order_status: orderData.order_status || 'completed',
        customer_name: orderData.customer_name,
        customer_email: orderData.customer_email,
        customer_phone: orderData.customer_phone,
        billing_address_line1: orderData.billing_address_line1,
        billing_address_line2: orderData.billing_address_line2,
        billing_city: orderData.billing_city,
        billing_state: orderData.billing_state,
        billing_postal_code: orderData.billing_postal_code,
        billing_country: orderData.billing_country,
        shipping_address_line1: orderData.shipping_address_line1,
        shipping_address_line2: orderData.shipping_address_line2,
        shipping_city: orderData.shipping_city,
        shipping_state: orderData.shipping_state,
        shipping_postal_code: orderData.shipping_postal_code,
        shipping_country: orderData.shipping_country,
        product_ids: product_ids,
        subtotal: orderData.subtotal,
        tax_amount: orderData.tax_amount || 0,
        shipping_cost: orderData.shipping_cost || 0,
        shipping_method: orderData.shipping_method || 'standard',
        discount_amount: orderData.discount_amount || 0,
        total_amount: orderData.total_amount,
        currency: orderData.currency || 'INR',
        payment_method: orderData.payment_method,
        payment_status: orderData.payment_status,
        payment_date: orderData.payment_date,
        transaction_id: orderData.transaction_id,
        payment_gateway: orderData.payment_gateway,
        special_instructions: orderData.special_instructions,
        coupon_code: orderData.coupon_code
      })
      .select()
      .single();

    // Check for errors during order insertion
    if (orderError) {
      console.error('Error inserting order:', orderError);
      return NextResponse.json(
        {
          success: false,
          message: orderError.message
        },
        { status: 500 }
      );
    }

    // Insert order products
    const orderProductsData = orderData.products.map(product => ({
        order_id: order.order_id,
        product_id: product.product_id,
        product_name: product.product_name,
        quantity: product.quantity,
        unit_price: product.unit_price,
        total_price: product.total_price
    }));
    
    const { error: productsError } = await supabase
      .from('order_products')
      .insert(orderProductsData);
    
    // Check for errors during order products insertion
    if (productsError) {
      console.error('Error inserting order products:', productsError);
      
      // If products insertion fails, delete the order to maintain consistency
      await supabase
        .from('orders')
        .delete()
        .eq('order_id', order.order_id);
        
      return NextResponse.json(
        {
          success: false,
          message: productsError.message
        },
        { status: 500 }
      );
    }

    // Send email notification (don't let email failure break the order)
    try {
      await sendOrderNotification(orderData, order.order_id);
    } catch (emailError) {
      console.error('Email notification failed, but order was created successfully:', emailError);
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      order_id: order.order_id,
      order_number: order.order_number
    });

  } catch (error) {
    console.error('Unexpected error inserting order:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}