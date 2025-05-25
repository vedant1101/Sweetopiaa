'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const OrderConfirmationContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const oliveGold = '#8e8b63';

  // State to hold search params values
  const [orderData, setOrderData] = useState({
    orderId: '',
    orderNumber: '',
    paymentMethod: ''
  });

  // Set mounted state and get search params on client side only
  useEffect(() => {
    setMounted(true);
    setOrderData({
      orderId: searchParams.get('order_id') || '',
      orderNumber: searchParams.get('order_number') || '',
      paymentMethod: searchParams.get('method') || ''
    });
  }, [searchParams]);

  // Navigate to home
  const goToHome = () => {
    router.push('/');
  };

  // Navigate to specific order page
  const goToOrders = () => {
    if (orderData.orderId) {
      router.push(`/view-order?order_id=${orderData.orderId}`);
    } else {
      router.push('/orders'); // fallback to orders history
    }
  };

  // Don't render until mounted on client
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FEFAFC' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4" style={{ borderColor: oliveGold }}></div>
          <p style={{ color: oliveGold }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FEFAFC' }}>
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full" style={{ backgroundColor: `${oliveGold}20` }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" style={{ color: oliveGold }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-4 text-2xl font-serif" style={{ color: oliveGold }}>Order Confirmed!</h2>
            <p className="mt-2 text-gray-600">Thank you for your purchase</p>
          </div>
          
          <div className="border-t border-b py-4 my-4" style={{ borderColor: `${oliveGold}20` }}>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Order Number</span>
              <span className="font-medium">{orderData.orderNumber || 'N/A'}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Order ID</span>
              <span className="font-medium">{orderData.orderId || 'N/A'}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Date</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Payment Status</span>
              <span className="font-medium text-green-600">
                {orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Paid'}
              </span>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-600">
            <p>We&apos;ve sent a confirmation email to your registered email address with all the details.</p>
            <p className="mt-2">Your order will be processed shortly and we&apos;ll notify you once it&apos;s on the way.</p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row sm:justify-between gap-4">
            <button
              onClick={goToHome}
              className="px-4 py-2 text-sm border rounded-md transition-colors duration-300 flex-1"
              style={{
                borderColor: oliveGold,
                color: oliveGold,
                backgroundColor: 'transparent'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = oliveGold;
                e.currentTarget.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = oliveGold;
              }}
            >
              Continue Shopping
            </button>
            <button
              onClick={goToOrders}
              className="px-4 py-2 text-sm text-white rounded-md transition-all duration-300 flex-1"
              style={{ backgroundColor: oliveGold }}
              onMouseOver={(e) => {
                e.currentTarget.style.opacity = '0.9';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              View Order
            </button>
          </div>
        </div>
      </div>
      
      <footer className="p-4 text-center">
        <p className="text-dark-text font-sans text-xs">
          © {new Date().getFullYear()} Sweetopiaa. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

// Loading fallback component
const LoadingFallback = () => {
  const oliveGold = '#8e8b63';
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FEFAFC' }}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4" style={{ borderColor: oliveGold }}></div>
        <p style={{ color: oliveGold }}>Loading order confirmation...</p>
      </div>
    </div>
  );
};

const OrderConfirmationPage = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <OrderConfirmationContent />
    </Suspense>
  );
};

export default OrderConfirmationPage;