'use client';
import { loadScript } from './scriptLoader';

// Interface for order details
export interface OrderDetails {
  amount: number;  // amount in paise (100 paise = 1 INR)
  currency: string;
  orderId: string;
  notes?: Record<string, string>;
  customerInfo: {
    name: string;
    email: string;
    contact: string;
  };
}
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayError {
  code: string;
  description: string;
  source: string;
  step: string;
  reason: string;
  metadata: Record<string, unknown>;
}

interface RazorpayFailureResponse {
  error: RazorpayError;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
      on: (event: string, callback: (response: RazorpayFailureResponse) => void) => void;
    };
  }
}
// Interface for Razorpay options
export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  image?: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color: string;
  };
}

// Function to initiate Razorpay payment
export const initiateRazorpayPayment = async (
  orderDetails: OrderDetails,
  onSuccess: (paymentId: string, orderId: string, signature: string) => void,
  onFailure: (error: Error | RazorpayFailureResponse) => void
) => {
  try {
    // Load Razorpay script
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    
    if (!res) {
      onFailure(new Error('Razorpay SDK failed to load. Check your internet connection.'));
      return;
    }

    // Configure Razorpay options
    const options: RazorpayOptions = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'YOUR_KEY_ID', // Replace with your actual key
      amount: orderDetails.amount,
      currency: orderDetails.currency,
      name: 'Sweetopiaa',
      description: 'Payment for your order at Sweetopiaa',
      image: '/logo.png', // Replace with your logo URL
      order_id: orderDetails.orderId,
      handler: function (response) {
        // Handle successful payment
        onSuccess(
          response.razorpay_payment_id,
          response.razorpay_order_id,
          response.razorpay_signature
        );
      },
      prefill: {
        name: orderDetails.customerInfo.name,
        email: orderDetails.customerInfo.email,
        contact: orderDetails.customerInfo.contact,
      },
      notes: orderDetails.notes,
      theme: {
        color: '#8e8b63', // Your olive-gold color
      },
    };

    // Create Razorpay payment instance
    const paymentObject = new window.Razorpay(options);
    
    // Set up event handlers
    paymentObject.on('payment.failed', function (response: RazorpayFailureResponse) {
      onFailure({
        error: response.error,
        message: 'Payment failed',
      });
    });

    // Open Razorpay payment window
    paymentObject.open();
  } catch (error) {
    onFailure(error as Error);
  }
};

// Function to create a Razorpay order (to be called from server action)
export const createRazorpayOrder = async (amount: number, currency: string = 'INR') => {
  try {
    // This should be a server action or API endpoint
    const response = await fetch('/api/razorpay/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, currency }),
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    const data = await response.json();
    
    // Return just the orderId
    return data.orderId;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw error;
  }
};