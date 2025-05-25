'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/cartContext';

const CartPage = () => {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  
  const goBack = () => {
    router.back();
  };

  const goToShop = () => {
    router.push('/shop');
  };

  // Format price to Indian Rupees
  const formatPrice = (price: string) => {
    return price;
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => {
    // Remove '₹' and convert to number
    const price = parseFloat(item.price.replace('₹', '').replace(',', ''));
    return total + (price * item.quantity);
  }, 0);

  // Delivery charge
  const deliveryCharge = 100;

  // Total amount
  const totalAmount = subtotal;

  const goToCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className="flex flex-col min-h-screen bg-theme1-bg">
      {/* Main content */}
      <div className="flex-grow">
        {/* Header */}
        <header className="p-4 sm:p-6 flex justify-between items-center">
          <h1 className="text-2xl font-serif text-theme1-primary">
            Your Cart
          </h1>
          <button
            onClick={goBack}
            className="px-3 py-1 font-sans text-xs rounded-md border border-theme1-tertiary text-theme1-tertiary hover:bg-theme1-tertiary hover:text-theme1-bg transition-colors duration-300"
          >
            Back
          </button>
        </header>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items - Left Side */}
              <div className="lg:col-span-2">
                <div className="bg-theme1-sidebar rounded-lg shadow-sm overflow-hidden mb-6">
                  <div className="p-4 border-b border-theme1-primary/20">
                    <h2 className="font-serif text-lg text-theme1-primary">
                      Shopping Cart ({cartItems.length} items)
                    </h2>
                  </div>
                  
                  <ul className="divide-y divide-theme1-primary/10">
                    {cartItems.map((item) => (
                      <li key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                        {/* Product Image */}
                        <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                          <div className="w-full h-full bg-cover bg-center" style={{
                            backgroundImage: `url('${item.image}')`,
                          }}></div>
                        </div>
                        
                        {/* Product Info */}
                        <div className="flex-grow text-center sm:text-left">
                          <h3 className="font-serif text-theme1-primary">{item.name}</h3>
                          <p className="text-sm text-theme1-secondary mt-1">Unit Price: {item.price}</p>
                          
                          <div className="flex items-center justify-center sm:justify-start mt-3 space-x-1">
                            <button 
                              className="w-6 h-6 flex items-center justify-center border rounded border-theme1-primary/40 bg-theme1-bg text-theme1-primary"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </button>
                            <input
  type="number"
  min="1"
  value={item.quantity}
  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
  className="w-10 text-center border-none text-sm bg-theme1-bg text-theme1-primary"
/>
                            <button 
                              className="w-6 h-6 flex items-center justify-center border rounded border-theme1-primary/40 bg-theme1-bg text-theme1-primary"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        
                        {/* Price and Remove */}
                        <div className="flex flex-col items-end">
                          <div className="font-medium text-theme1-primary">
                            {/* Remove '₹' and recalculate price */}
                            {formatPrice(
                              `₹${(parseFloat(item.price.replace('₹', '').replace(',', '')) * item.quantity).toLocaleString('en-IN')}`
                            )}
                          </div>
                          <button 
                            className="text-xs text-theme1-secondary mt-2 hover:underline"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-between">
                  <button
                    onClick={goToShop}
                    className="text-sm flex items-center gap-1 text-theme1-secondary hover:underline"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                    Continue Shopping
                  </button>
                </div>
              </div>
              
              {/* Order Summary - Right Side */}
              <div className="lg:col-span-1">
                <div className="bg-theme1-sidebar rounded-lg shadow-sm overflow-hidden sticky top-6">
                  <div className="p-4 border-b border-theme1-primary/20">
                    <h2 className="font-serif text-lg text-theme1-primary">Order Summary</h2>
                  </div>
                  
                  <div className="p-4">
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-theme1-secondary">Subtotal</span>
                        <span className="text-theme1-secondary">
                          {`₹${subtotal.toLocaleString('en-IN')}`}
                        </span>
                      </div>
                      {/* <div className="flex justify-between text-sm">
                        <span className="text-theme1-secondary">Delivery Charge</span>
                        <span className="text-theme1-secondary">{`₹${deliveryCharge.toLocaleString('en-IN')}`}</span>
                      </div> */}
                      <div className="border-t pt-3 border-theme1-primary/20">
                        <div className="flex justify-between font-medium">
                          <span className="text-theme1-secondary">Total</span>
                          <span className="text-theme1-primary">
                            {`₹${totalAmount.toLocaleString('en-IN')}`}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={goToCheckout}
                      className="w-full py-3 rounded-md text-white font-medium bg-theme1-primary hover:bg-theme1-primary/90 transition-all duration-300"
                    >
                      Proceed to Checkout
                    </button>
                    
                    <div className="mt-4 text-xs text-center text-theme1-secondary/70">
                      <p>Taxes and shipping calculated at checkout</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-theme1-sidebar rounded-lg shadow-sm">
              <div className="w-20 h-20 mx-auto mb-4 opacity-30">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-theme1-primary">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </div>
              <h2 className="text-xl font-serif mb-2 text-theme1-primary">Your cart is empty</h2>
              <p className="text-theme1-secondary mb-6">Looks like you haven&apos;t added anything to your cart yet.</p>
              <button
                onClick={goToShop}
                className="px-6 py-2 rounded-md border-2 border-theme1-tertiary text-theme1-tertiary hover:bg-theme1-tertiary hover:text-theme1-bg transition-colors duration-300"
              >
                Browse Products
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer - Now stays at the bottom */}
      <footer className="p-4 text-center mt-auto">
        <p className="text-theme1-secondary font-sans text-xs">
          © {new Date().getFullYear()} Sweetopiaa. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default CartPage;