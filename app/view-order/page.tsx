'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface OrderProduct {
  order_product_id: number;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface Order {
  order_id: number;
  order_number: string;
  order_date: string;
  order_status: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  billing_address_line1: string;
  billing_city: string;
  billing_state: string;
  billing_postal_code: string;
  billing_country: string;
  shipping_address_line1: string;
  shipping_city: string;
  shipping_state: string;
  shipping_postal_code: string;
  shipping_country: string;
  subtotal: number;
  tax_amount: number;
  shipping_cost: number;
  discount_amount: number;
  total_amount: number;
  currency: string;
  payment_method: string;
  payment_status: string;
  payment_date: string;
  transaction_id: string;
  payment_gateway: string;
  products: OrderProduct[];
}

const ViewOrderContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const oliveGold = '#8e8b63';

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get order ID from URL parameters
  const orderId = searchParams.get('order_id');
  const orderNumber = searchParams.get('order_number');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (orderId) params.append('order_id', orderId);
        if (orderNumber) params.append('order_number', orderNumber);

        const response = await fetch(`/api/fetchorders?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }

        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.message || 'Failed to fetch order details');
        }

        setOrder(data.order);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load order');
      } finally {
        setLoading(false);
      }
    };

    if (orderId || orderNumber) {
      fetchOrder();
    } else {
      setError('No order ID or order number provided');
      setLoading(false);
    }
  }, [orderId, orderNumber]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return '#10b981'; // green
      case 'processing':
        return '#f59e0b'; // amber
      case 'shipped':
        return '#3b82f6'; // blue
      case 'delivered':
        return '#10b981'; // green
      case 'cancelled':
        return '#ef4444'; // red
      default:
        return oliveGold;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'paid':
        return '#10b981'; // green
      case 'pending':
        return '#f59e0b'; // amber
      case 'failed':
        return '#ef4444'; // red
      default:
        return oliveGold;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FEFAFC' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4" 
               style={{ borderColor: oliveGold }}></div>
          <p style={{ color: oliveGold }}>Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FEFAFC' }}>
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold mb-4" style={{ color: oliveGold }}>Order Not Found</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 text-white rounded-md transition-all duration-300"
            style={{ backgroundColor: oliveGold }}
            onMouseOver={(e) => {
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FEFAFC' }}>
      {/* Header */}
      <header className="p-4 sm:p-6 border-b border-gray-200">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-serif" style={{ color: oliveGold }}>
            Order Details
          </h1>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 border rounded-md transition-colors duration-300"
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
            Back to Home
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Order Header */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Order #{order.order_number}</h2>
                <p className="text-gray-600">Placed on {formatDate(order.order_date)}</p>
              </div>
              <div className="mt-4 sm:mt-0 text-right">
                <div className="flex flex-col sm:items-end gap-2">
                  <span 
                    className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: getStatusColor(order.order_status) }}
                  >
                    {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                  </span>
                  <span 
                    className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: getPaymentStatusColor(order.payment_status) }}
                  >
                    Payment {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Customer Information */}
              <div>
                <h3 className="font-semibold mb-3" style={{ color: oliveGold }}>Customer Information</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Name:</span> {order.customer_name}</p>
                  <p><span className="font-medium">Email:</span> {order.customer_email}</p>
                  <p><span className="font-medium">Phone:</span> {order.customer_phone}</p>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="font-semibold mb-3" style={{ color: oliveGold }}>Shipping Address</h3>
                <div className="space-y-1 text-sm">
                  <p>{order.shipping_address_line1}</p>
                  <p>{order.shipping_city}, {order.shipping_state}</p>
                  <p>{order.shipping_postal_code}</p>
                  <p>{order.shipping_country}</p>
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h3 className="font-semibold mb-3" style={{ color: oliveGold }}>Payment Information</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Method:</span> {order.payment_method.charAt(0).toUpperCase() + order.payment_method.slice(1)}</p>
                  <p><span className="font-medium">Gateway:</span> {order.payment_gateway?.charAt(0).toUpperCase() + order.payment_gateway?.slice(1)}</p>
                  <p><span className="font-medium">Transaction ID:</span> {order.transaction_id}</p>
                  {order.payment_date && (
                    <p><span className="font-medium">Payment Date:</span> {formatDate(order.payment_date)}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <h3 className="font-semibold" style={{ color: oliveGold }}>Order Items</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {order.products.map((product) => (
                <div key={product.order_product_id} className="flex justify-between items-center py-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex-grow">
                    <h4 className="font-medium">{product.product_name}</h4>
                    <p className="text-sm text-gray-600">Product ID: {product.product_id}</p>
                    <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{product.unit_price.toLocaleString('en-IN')}</p>
                    <p className="text-sm text-gray-600">Total: ₹{product.total_price.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="font-semibold" style={{ color: oliveGold }}>Order Summary</h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span>₹{order.shipping_cost.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span>₹{order.tax_amount.toLocaleString('en-IN')}</span>
              </div>
              {order.discount_amount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-green-600">-₹{order.discount_amount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span style={{ color: oliveGold }}>₹{order.total_amount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.print()}
            className="px-6 py-2 border rounded-md transition-colors duration-300"
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
            Print Order
          </button>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 text-white rounded-md transition-all duration-300"
            style={{ backgroundColor: oliveGold }}
            onMouseOver={(e) => {
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-4 text-center mt-auto border-t border-gray-200">
        <p className="text-gray-600 text-sm">
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
        <p style={{ color: oliveGold }}>Loading order details...</p>
      </div>
    </div>
  );
};

const ViewOrderPage = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ViewOrderContent />
    </Suspense>
  );
};

export default ViewOrderPage;