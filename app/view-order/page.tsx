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
        return 'bg-green-500';
      case 'processing':
        return 'bg-amber-500';
      case 'shipped':
        return 'bg-blue-500';
      case 'delivered':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-theme1-primary';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'paid':
        return 'bg-green-500';
      case 'pending':
        return 'bg-amber-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-theme1-primary';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme1-bg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-theme1-primary mx-auto mb-4"></div>
          <p className="text-theme1-primary">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme1-bg">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold mb-4 text-theme1-primary font-serif">Order Not Found</h1>
          <p className="text-theme1-secondary mb-6 font-sans">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 text-white bg-theme1-primary hover:bg-theme1-primary/90 rounded-md transition-all duration-300 font-sans"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="min-h-screen bg-theme1-bg">
      {/* Header */}
      <header className="p-4 sm:p-6 border-b border-theme1-secondary/20">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-serif text-theme1-primary">
            Order Details
          </h1>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 border border-theme1-tertiary text-theme1-tertiary hover:bg-theme1-tertiary hover:text-white rounded-md transition-colors duration-300 font-sans"
          >
            Back to Home
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Order Header */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-theme1-secondary/20">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-theme1-primary font-serif">Order #{order.order_number}</h2>
                <p className="text-theme1-secondary font-sans">Placed on {formatDate(order.order_date)}</p>
              </div>
              <div className="mt-4 sm:mt-0 text-right">
                <div className="flex flex-col sm:items-end gap-2">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white ${getStatusColor(order.order_status)}`}
                  >
                    {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                  </span>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white ${getPaymentStatusColor(order.payment_status)}`}
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
                <h3 className="font-semibold mb-3 text-theme1-primary font-serif">Customer Information</h3>
                <div className="space-y-2 text-sm font-sans">
                  <p><span className="font-medium text-theme1-primary">Name:</span> <span className="text-theme1-secondary">{order.customer_name}</span></p>
                  <p><span className="font-medium text-theme1-primary">Email:</span> <span className="text-theme1-secondary">{order.customer_email}</span></p>
                  <p><span className="font-medium text-theme1-primary">Phone:</span> <span className="text-theme1-secondary">{order.customer_phone}</span></p>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="font-semibold mb-3 text-theme1-primary font-serif">Shipping Address</h3>
                <div className="space-y-1 text-sm text-theme1-secondary font-sans">
                  <p>{order.shipping_address_line1}</p>
                  <p>{order.shipping_city}, {order.shipping_state}</p>
                  <p>{order.shipping_postal_code}</p>
                  <p>{order.shipping_country}</p>
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h3 className="font-semibold mb-3 text-theme1-primary font-serif">Payment Information</h3>
                <div className="space-y-2 text-sm font-sans">
                  <p><span className="font-medium text-theme1-primary">Method:</span> <span className="text-theme1-secondary">{order.payment_method.charAt(0).toUpperCase() + order.payment_method.slice(1)}</span></p>
                  <p><span className="font-medium text-theme1-primary">Gateway:</span> <span className="text-theme1-secondary">{order.payment_gateway?.charAt(0).toUpperCase() + order.payment_gateway?.slice(1)}</span></p>
                  <p><span className="font-medium text-theme1-primary">Transaction ID:</span> <span className="text-theme1-secondary">{order.transaction_id}</span></p>
                  {order.payment_date && (
                    <p><span className="font-medium text-theme1-primary">Payment Date:</span> <span className="text-theme1-secondary">{formatDate(order.payment_date)}</span></p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-theme1-secondary/20">
            <h3 className="font-semibold text-theme1-primary font-serif">Order Items</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {order.products.map((product) => (
                <div key={product.order_product_id} className="flex justify-between items-center py-4 border-b border-theme1-secondary/10 last:border-b-0">
                  <div className="flex-grow">
                    <h4 className="font-medium text-theme1-primary font-serif">{product.product_name}</h4>
                    <p className="text-sm text-theme1-secondary font-sans">Product ID: {product.product_id}</p>
                    <p className="text-sm text-theme1-secondary font-sans">Quantity: {product.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-theme1-primary">₹{product.unit_price.toLocaleString('en-IN')}</p>
                    {/* <p className="text-sm text-theme1-secondary font-sans">Total: ₹{product.total_price.toLocaleString('en-IN')}</p> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-theme1-secondary/20">
            <h3 className="font-semibold text-theme1-primary font-serif">Order Summary</h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-sans">
                <span className="text-theme1-secondary">Subtotal</span>
                <span className="text-theme1-primary">₹{order.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm font-sans">
                <span className="text-theme1-secondary">Shipping</span>
                <span className="text-theme1-primary">₹{order.shipping_cost.toLocaleString('en-IN')}</span>
              </div>
              {/* <div className="flex justify-between text-sm font-sans">
                <span className="text-theme1-secondary">Tax</span>
                <span className="text-theme1-primary">₹{order.tax_amount.toLocaleString('en-IN')}</span>
              </div> */}
              {order.discount_amount > 0 && (
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-theme1-secondary">Discount</span>
                  <span className="text-green-600">-₹{order.discount_amount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span className="text-theme1-primary">Total</span>
                  <span className="text-theme1-primary">₹{order.total_amount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.print()}
            className="px-6 py-2 border border-theme1-tertiary text-theme1-tertiary hover:bg-theme1-tertiary hover:text-white rounded-md transition-colors duration-300 font-sans"
          >
            Print Order
          </button>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 text-white bg-theme1-primary hover:bg-theme1-primary/90 rounded-md transition-all duration-300 font-sans"
          >
            Continue Shopping
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-4 text-center mt-auto border-t border-theme1-secondary/20">
        <p className="text-theme1-secondary text-sm font-sans">
          © {new Date().getFullYear()} Sweetopiaa. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

// Loading fallback component
const LoadingFallback = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-theme1-bg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-theme1-primary mx-auto mb-4"></div>
        <p className="text-theme1-primary">Loading order details...</p>
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