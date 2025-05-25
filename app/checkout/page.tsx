'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/cartContext';
import Image from 'next/image';

const CheckoutPage = () => {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();

  // Loading state for payment processing
  const [isProcessing, setIsProcessing] = useState(false);

  // Checkout step state
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Customer Info, 2: Shipping, 3: Payment

// ADD: Pincode delivery state
const [pincodeDeliveryInfo, setPincodeDeliveryInfo] = useState<{
  isValid: boolean | null;
  cost: number;
  isChecking: boolean;
  error: string | null;
}>({
  isValid: null,
  cost: 0,
  isChecking: false,
  error: null
});

interface PaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface PaymentData {
  transaction_id: string;
  razorpay_payment_id?: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

interface OrderResult {
  order_id: string;
  order_number: string;
}

// ADD: Pincode to delivery cost mapping
const pincodeDeliveryMap = {
  // ₹100 delivery charge
  '201301': { cost: 100 },
  '201303': { cost: 100 },
  '201304': { cost: 100 },
  '201307': { cost: 100 },
  // ₹150 delivery charge
  '110018': { cost: 150 },
  '110062': { cost: 150 },
  '110025': { cost: 150 },
  // ₹200 delivery charge
  '110003': { cost: 200 },
  '110001': { cost: 200 },
  '110014': { cost: 200 },
  '201306': { cost: 200 },
  '110024': { cost: 200 },
  '110044': { cost: 200 },
  '110096': { cost: 200 },
  '110020': { cost: 200 },
  '110032': { cost: 200 },
  '110065': { cost: 200 },
  '110002': { cost: 200 },
  '110019': { cost: 200 },
  '110013': { cost: 200 },
  '110091': { cost: 200 },
  '110092': { cost: 200 },
  '110023': { cost: 200 },
  '110011': { cost: 200 },
  '110048': { cost: 200 },
  '110049': { cost: 200 },
  // ₹250 delivery charge
  '201005': { cost: 250 },
  '201002': { cost: 250 },
  '110021': { cost: 250 },
  '201014': { cost: 250 },
  '110017': { cost: 250 },
  '110051': { cost: 250 },
  '110054': { cost: 250 },
  '110016': { cost: 250 },
  '110031': { cost: 250 },
  '110094': { cost: 250 },
  '110029': { cost: 250 },
  '110093': { cost: 250 },
  '110034': { cost: 250 },
  '110004': { cost: 250 },
  '201001': { cost: 250 },
  // ₹300 delivery charge
  '201308': { cost: 300 },
  '201009': { cost: 300 },
  '110005': { cost: 300 },
  '110006': { cost: 300 },
  '110007': { cost: 300 },
  '110010': { cost: 300 },
  '110067': { cost: 300 },
  '110057': { cost: 300 },
  '110041': { cost: 300 },
  '110055': { cost: 300 },
  '110022': { cost: 300 },
  '110053': { cost: 300 },
  // ₹350 delivery charge
  '201310': { cost: 350 },
  '110012': { cost: 350 },
  '101213': { cost: 350 },
  '110030': { cost: 350 },
  '110070': { cost: 350 },
  '110060': { cost: 350 },
  '110008': { cost: 350 },
  '110066': { cost: 350 },
  '110052': { cost: 350 },
  '121001': { cost: 350 },
  '121002': { cost: 350 },
  '121003': { cost: 350 },
  '121004': { cost: 350 },
  '121006': { cost: 350 },
  '121007': { cost: 350 },
  '121008': { cost: 350 },
  '121009': { cost: 350 },
  '121010': { cost: 350 },
  '121012': { cost: 350 },
  '121013': { cost: 350 },
  // ₹400 delivery charge
  '110047': { cost: 400 },
  '110033': { cost: 400 },
  '110035': { cost: 400 },
  '110042': { cost: 400 },
  '110028': { cost: 400 },
  '110046': { cost: 400 },
  '110026': { cost: 400 },
  '110058': { cost: 400 },
  '110063': { cost: 400 },
  '110027': { cost: 400 },
  '110015': { cost: 400 },
  '110074': { cost: 400 },
  // ₹450 delivery charge
  '110064': { cost: 450 },
  '110045': { cost: 450 },
  '110037': { cost: 450 },
  '110059': { cost: 450 },
  '110061': { cost: 450 },
  // ₹500 delivery charge
  '110038': { cost: 500 },
  '122001': { cost: 500 },
  '122002': { cost: 500 },
  '122007': { cost: 500 },
  '122008': { cost: 500 },
  '122010': { cost: 500 },
  '122016': { cost: 500 },
  // ₹600 delivery charge
  '122003': { cost: 600 },
  '122011': { cost: 600 },
  '122017': { cost: 600 },
  '122021': { cost: 600 },
  '122022': { cost: 600 },
  '122101': { cost: 600 },
  // ₹750 delivery charge
  '122005': { cost: 750 },
  '122015': { cost: 750 },
  // ₹1000 delivery charge
  '122004': { cost: 1000 },
  '122006': { cost: 1000 },
  '122009': { cost: 1000 },
  '122012': { cost: 1000 },
  '122018': { cost: 1000 },
  '122050': { cost: 1000 },
  '122051': { cost: 1000 },
  // ₹1200 delivery charge
  '122052': { cost: 1200 },
  '122102': { cost: 1200 },
  '122505': { cost: 1200 },
  '123506': { cost: 1200 },
  // ₹1500 delivery charge
  '122503': { cost: 1500 },
};

// ADD: Check pincode validity function
const checkPincodeDelivery = (pincode:string) => {
  if (!pincode || pincode.length !== 6) {
    setPincodeDeliveryInfo({
      isValid: null,
      cost: 0,
      isChecking: false,
      error: null
    });
    return;
  }

  setPincodeDeliveryInfo(prev => ({ ...prev, isChecking: true, error: null }));

  setTimeout(() => {
    const deliveryInfo = pincodeDeliveryMap[pincode as keyof typeof pincodeDeliveryMap];
    
    if (deliveryInfo) {
      setPincodeDeliveryInfo({
        isValid: true,
        cost: deliveryInfo.cost,
        isChecking: false,
        error: null
      });
    } else {
      setPincodeDeliveryInfo({
        isValid: false,
        cost: 0,
        isChecking: false,
        error: 'We do not deliver to this pincode'
      });
    }
  }, 500);
};

  // Form state
  const [formData, setFormData] = useState({
    // Customer Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Shipping Information
    address: '',
    city: '',
    state: '',
    pincode: '',
    shippingMethod: 'standard',
    
    // Payment Information
    paymentMethod: 'razorpay',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const generateOrderNumber = () => {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000);
    return `ORD-${timestamp}-${randomNum}`;
  };

  const createOrderInDatabase = async (paymentData: PaymentData): Promise<OrderResult> => {
    try {
      const orderData = {
        // Order details
        order_number: generateOrderNumber(),
        order_status: 'completed',
        
        // Customer information
        customer_name: `${formData.firstName} ${formData.lastName}`,
        customer_email: formData.email,
        customer_phone: formData.phone,
        
        // Billing address (same as shipping for now)
        billing_address_line1: formData.address,
        billing_city: formData.city,
        billing_state: formData.state,
        billing_postal_code: formData.pincode,
        billing_country: 'India',
        
        // Shipping address
        shipping_address_line1: formData.address,
        shipping_city: formData.city,
        shipping_state: formData.state,
        shipping_postal_code: formData.pincode,
        shipping_country: 'India',
        
        // Financial information
        subtotal: subtotal,
        tax_amount: 0,
        shipping_cost: getShippingCost(),
        shipping_method: formData.shippingMethod,
        discount_amount: 0,
        total_amount: totalAmount,
        currency: 'INR',
        
        // Payment information
        payment_method: formData.paymentMethod,
        payment_status: 'completed',
        payment_date: new Date().toISOString(),
        transaction_id: paymentData.transaction_id || paymentData.razorpay_payment_id || `COD-${Date.now()}`,
        payment_gateway: formData.paymentMethod === 'razorpay' ? 'razorpay' : 'cod',
        
        // Additional information
        special_instructions: '',
        coupon_code: '',
        
        products: cartItems.map(item => ({
          product_id: item.id,
          product_name: item.name,
          quantity: item.quantity,
          unit_price: parseFloat(item.price.replace('₹', '').replace(',', '')),
          total_price: parseFloat(item.price.replace('₹', '').replace(',', '')) * item.quantity
        }))
      };
  
      const response = await fetch('/api/orderplace', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create order in database');
      }
  
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to create order');
      }
  
      return result;
    } catch (error) {
      console.error('Error creating order in database:', error);
      throw error;
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));

  // Check pincode when it changes
  if (name === 'pincode') {
    checkPincodeDelivery(value);
  }
};

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price.replace('₹', '').replace(',', ''));
    return total + (price * item.quantity);
  }, 0);

  // Shipping cost based on pincode
  const getShippingCost = () => {
    const baseCost = pincodeDeliveryInfo.isValid ? pincodeDeliveryInfo.cost : 0;
    const expressCost = formData.shippingMethod === 'express' ? 150 : 0;
    return baseCost + expressCost;
  };
  


  // Total amount
  const totalAmount = subtotal + getShippingCost();

  // Handle navigation back to cart
  const goToCart = () => {
    router.push('/cart');
  };

  // Razorpay payment handler
  const initializeRazorpayPayment = async () => {
    try {
      setIsProcessing(true);
      
      // Load Razorpay script
      const res = await loadRazorpayScript();
      if (!res) {
        alert('Razorpay SDK failed to load. Please check your internet connection.');
        setIsProcessing(false);
        return;
      }
      
      // Create order on the server
      const response = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalAmount,
          currency: 'INR',
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create order');
      }
      
      const { orderId } = await response.json();
      
      // Create Razorpay payment object
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        amount: Math.round(totalAmount * 100), // in paise
        currency: 'INR',
        name: 'Sweetopiaa',
        description: 'Payment for your delicious treats',
        order_id: orderId,
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          shippingMethod: formData.shippingMethod,
        },
        theme: {
          color: 'var(--theme1-primary)',
        },
        handler: function (response: PaymentResponse) {
          // Handle successful payment
          handlePaymentSuccess(response);
        },
      };
      
      const paymentObject = new window.Razorpay(options);
      
      // Set up event handlers
      paymentObject.on('payment.failed', function () {
        alert('Payment failed. Please try again.');
        setIsProcessing(false);
      });
      
      // Open Razorpay payment window
      paymentObject.open();
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Something went wrong. Please try again.');
      setIsProcessing(false);
    }
  };

  // Load Razorpay script
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise(resolve => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Handle payment success
 const handlePaymentSuccess = async (response: PaymentResponse) => {
  try {
    // Create order in database
    const orderResult = await createOrderInDatabase({
      transaction_id: response.razorpay_payment_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_order_id: response.razorpay_order_id,
      razorpay_signature: response.razorpay_signature,
    });
    
    // Clear cart
    clearCart();
    
    // Redirect to order confirmation with the created order details
    router.push(`/orderConfirmation?order_id=${orderResult.order_id}&order_number=${orderResult.order_number}`);
  } catch (error) {
    console.error('Error handling payment success:', error);
    alert('Payment was successful, but there was an error saving your order. Please contact customer support.');
    setIsProcessing(false);
  }
};

  // Handle cash on delivery
const handleCashOnDelivery = async () => {
  try {
    setIsProcessing(true);
    
    // Create order in database
    const orderResult = await createOrderInDatabase({
      transaction_id: `COD-${Date.now()}`,
    });
    
    // Clear cart
    clearCart();
    
    // Redirect to order confirmation
    router.push(`/orderConfirmation?order_id=${orderResult.order_id}&order_number=${orderResult.order_number}&method=cod`);
  } catch (error) {
    console.error('Error processing cash on delivery:', error);
    alert('Something went wrong while creating your order. Please try again.');
    setIsProcessing(false);
  }
};

  // Handle form submission for each step
 const handleNextStep = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  // Special validation for step 2 (shipping) - check pincode validity
  if (checkoutStep === 2) {
    if (!pincodeDeliveryInfo.isValid) {
      alert('Please enter a valid pincode that we deliver to.');
      return;
    }
  }
  
  if (checkoutStep < 3) {
    setCheckoutStep(checkoutStep + 1);
    window.scrollTo(0, 0);
  } else {
    // Final submission - process payment
    if (formData.paymentMethod === 'razorpay') {
      initializeRazorpayPayment();
    } else if (formData.paymentMethod === 'cod') {
      handleCashOnDelivery();
    } else {
      alert('Please select a payment method');
    }
  }
};

  // Go back to previous step
  const handlePreviousStep = () => {
    if (checkoutStep > 1) {
      setCheckoutStep(checkoutStep - 1);
      window.scrollTo(0, 0);
    } else {
      goToCart();
    }
  };

  // Input field style class
  const inputClass = "w-full p-3 border border-theme1-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-theme1-tertiary focus:border-transparent transition-all duration-200 text-theme1-primary bg-theme1-bg";

  // Render the current step form
  const renderStepForm = () => {
    switch(checkoutStep) {
      case 1:
        return (
          <div className="bg-theme1-sidebar rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-theme1-primary/20">
              <h2 className="font-serif text-lg text-theme1-primary">Customer Information</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-theme1-primary mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-theme1-primary mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-theme1-primary mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-theme1-primary mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                  />
                </div>
              </div>
              
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className="px-4 py-2 text-sm border border-theme1-tertiary text-theme1-tertiary hover:bg-theme1-tertiary hover:text-theme1-bg rounded-md transition-colors duration-300"
                >
                  Back to Cart
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-white rounded-md bg-theme1-primary hover:bg-theme1-primary/90 transition-all duration-300"
                >
                  Continue to Shipping
                </button>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="bg-theme1-sidebar rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-theme1-primary/20">
              <h2 className="font-serif text-lg text-theme1-primary">Shipping Information</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-theme1-primary mb-2">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className={inputClass}
                />
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-theme1-primary mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-theme1-primary mb-2">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-theme1-primary mb-2">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    required
                    maxLength={6}
                    pattern="[0-9]{6}"
                    className={`${inputClass} ${pincodeDeliveryInfo.isValid === false ? 'border-red-500' : pincodeDeliveryInfo.isValid === true ? 'border-green-500' : ''}`}
                  />
                  {/* Pincode validation messages */}
                  {pincodeDeliveryInfo.isChecking && (
                    <p className="text-xs text-theme1-secondary mt-1 flex items-center">
                      <svg className="animate-spin h-3 w-3 mr-1" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      Checking delivery availability...
                    </p>
                  )}
                  {pincodeDeliveryInfo.isValid === true && (
                    <p className="text-xs text-green-600 mt-1 flex items-center">
                      <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      Delivery available • ₹{pincodeDeliveryInfo.cost} delivery charge
                    </p>
                  )}
                  {pincodeDeliveryInfo.isValid === false && (
                    <p className="text-xs text-red-600 mt-1 flex items-center">
                      <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                      {pincodeDeliveryInfo.error}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-theme1-primary mb-3">Delivery Options</label>
                <div className="space-y-3">
                  <label className={`flex items-center justify-between p-4 border rounded-md cursor-pointer transition-colors ${formData.shippingMethod === 'standard' ? 'border-theme1-primary bg-theme1-primary/10' : 'border-theme1-primary/20'}`}>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="standard"
                        checked={formData.shippingMethod === 'standard'}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <div>
                        <span className="font-medium text-theme1-primary">Standard Delivery</span>
                        <p className="text-sm text-theme1-secondary">Within 3 days</p>
                      </div>
                    </div>
                    <span className="text-theme1-primary font-medium">
                      {pincodeDeliveryInfo.isValid ? `₹${pincodeDeliveryInfo.cost}` : 'Free*'}
                    </span>
                  </label>
                  
                  <label className={`flex items-center justify-between p-4 border rounded-md cursor-pointer transition-colors ${formData.shippingMethod === 'express' ? 'border-theme1-primary bg-theme1-primary/10' : 'border-theme1-primary/20'}`}>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="express"
                        checked={formData.shippingMethod === 'express'}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <div>
                        <span className="font-medium text-theme1-primary flex items-center">
                          Express Delivery
                          <span className="ml-2 bg-theme1-primary text-white text-xs px-2 py-1 rounded-full">Fast</span>
                        </span>
                        <p className="text-sm text-theme1-secondary">Same Day delivery</p>
                      </div>
                    </div>
                    <span className="text-theme1-primary font-medium">
                      {pincodeDeliveryInfo.isValid ? `₹${pincodeDeliveryInfo.cost + 150}` : '+₹150'}
                    </span>
                  </label>
                </div>
                
                {pincodeDeliveryInfo.isValid && (
                  <p className="text-xs text-theme1-secondary mt-2">
                    * Base delivery charge applies based on your pincode
                  </p>
                )}
              </div>

              
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className="px-4 py-2 text-sm border border-theme1-tertiary text-theme1-tertiary hover:bg-theme1-tertiary hover:text-theme1-bg rounded-md transition-colors duration-300"
                >
                  Back to Customer Info
                </button>
                <button
 type="submit"
 disabled={!pincodeDeliveryInfo.isValid}
 className={`px-6 py-2 text-sm border border-theme1-tertiary rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
   pincodeDeliveryInfo.isValid 
     ? 'text-theme1-tertiary bg-transparent hover:bg-theme1-tertiary hover:text-theme1-bg' 
     : 'text-theme1-tertiary/50 bg-transparent'
 }`}
>
 Continue to Payment
</button>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="bg-theme1-sidebar rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-theme1-primary/20">
              <h2 className="font-serif text-lg text-theme1-primary">Payment Information</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-3">
                <label className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors ${formData.paymentMethod === 'razorpay' ? 'border-theme1-primary bg-theme1-primary/10' : 'border-theme1-primary/20'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="razorpay"
                    checked={formData.paymentMethod === 'razorpay'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <div className="flex items-center">
                    <span className="font-medium mr-2 text-theme1-primary">Pay with Razorpay</span>
                    <Image 
                      src="/razorpay-logo.png" 
                      alt="Razorpay" 
                      width={80}
                      height={24}
                      className="h-6" 
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  </div>
                </label>
                
                <label className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors ${formData.paymentMethod === 'cod' ? 'border-theme1-primary bg-theme1-primary/10' : 'border-theme1-primary/20'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="font-medium text-theme1-primary">Cash on Delivery</span>
                </label>
              </div>
              
              <div className="mt-6 pt-4 border-t border-theme1-primary/20">
                <p className="text-sm text-theme1-secondary mb-4">
                  {formData.paymentMethod === 'razorpay' 
                    ? 'You will be redirected to Razorpay to complete your payment securely.' 
                    : 'You will pay when your order is delivered.'}
                </p>
              </div>
              
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  disabled={isProcessing}
                  className="px-4 py-2 text-sm border border-theme1-tertiary text-theme1-tertiary hover:bg-theme1-tertiary hover:text-theme1-bg rounded-md transition-colors duration-300 disabled:opacity-50"
                >
                  Back to Shipping
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-6 py-2 text-white rounded-md bg-theme1-primary hover:bg-theme1-primary/90 transition-all duration-300 flex items-center disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    `Pay ₹${totalAmount.toLocaleString('en-IN')}`
                  )}
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-theme1-bg">
      {/* Main content */}
      <div className="flex-grow">
        {/* Header */}
        <header className="p-4 sm:p-6 flex justify-between items-center">
          <h1 className="text-2xl font-serif text-theme1-primary">
            Checkout
          </h1>
          <button
            onClick={goToCart}
            disabled={isProcessing}
            className="px-3 py-1 font-sans text-xs rounded-md border border-theme1-tertiary text-theme1-tertiary hover:bg-theme1-tertiary hover:text-theme1-bg transition-colors duration-300 disabled:opacity-50"
          >
            Back to Cart
          </button>
        </header>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${checkoutStep >= 1 ? 'bg-theme1-primary' : 'bg-theme1-secondary/40 border border-theme1-primary'}`}>
                1
              </div>
              <span className={`text-xs mt-1 ${checkoutStep >= 1 ? 'text-theme1-primary' : 'text-theme1-secondary'}`}>
                Customer
              </span>
            </div>
            
            <div className={`flex-grow h-1 mx-2 ${checkoutStep >= 2 ? 'bg-theme1-primary' : 'bg-theme1-secondary/20'}`}></div>
            
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${checkoutStep >= 2 ? 'bg-theme1-primary' : 'bg-theme1-secondary/40 border border-theme1-primary'}`}>
                2
              </div>
              <span className={`text-xs mt-1 ${checkoutStep >= 2 ? 'text-theme1-primary' : 'text-theme1-secondary'}`}>
                Shipping
              </span>
            </div>
            
            <div className={`flex-grow h-1 mx-2 ${checkoutStep >= 3 ? 'bg-theme1-primary' : 'bg-theme1-secondary/20'}`}></div>
            
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${checkoutStep >= 3 ? 'bg-theme1-primary' : 'bg-theme1-secondary/40 border border-theme1-primary'}`}>
                3
              </div>
              <span className={`text-xs mt-1 ${checkoutStep >= 3 ? 'text-theme1-primary' : 'text-theme1-secondary'}`}>
                Payment
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Side - Form Steps */}
            <div className="lg:col-span-3">
              <form onSubmit={handleNextStep}>
                {renderStepForm()}
              </form>
            </div>
            
            {/* Right Side - Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-theme1-sidebar rounded-lg shadow-sm overflow-hidden sticky top-6">
                <div className="p-4 border-b border-theme1-primary/20">
                  <h2 className="font-serif text-lg text-theme1-primary">Order Summary</h2>
                </div>
                
                <div className="p-4">
                  {/* Items */}
                  <div className="space-y-3 mb-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-sm pb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-md overflow-hidden mr-2">
                            <div className="w-full h-full bg-cover bg-center" style={{
                              backgroundImage: `url('${item.image}')`,
                            }}></div>
                          </div>
                          <div>
                            <p className="font-medium text-theme1-primary">{item.name}</p>
                            <p className="text-theme1-secondary">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="text-theme1-primary">
                          {`₹${(parseFloat(item.price.replace('₹', '').replace(',', '')) * item.quantity).toLocaleString('en-IN')}`}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Cost breakdown */}
                  <div className="space-y-3 border-t pt-3 mb-4 border-theme1-primary/20">
                    <div className="flex justify-between text-sm">
                      <span className="text-theme1-secondary">Subtotal</span>
                      <span className="text-theme1-secondary">
                        {`₹${subtotal.toLocaleString('en-IN')}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-theme1-secondary">
                        Delivery Charge {formData.shippingMethod === 'express' ? '(Express)' : '(Standard)'}
                      </span>
                      <span className="text-theme1-secondary">
                        {pincodeDeliveryInfo.isValid ? 
                          `₹${getShippingCost().toLocaleString('en-IN')}` : 
                          'Enter pincode'
                        }
                      </span>
                    </div>
                    {/* <div className="flex justify-between text-sm">
                      <span className="text-theme1-secondary">Tax (5%)</span>
                      <span className="text-theme1-secondary">{`₹${taxes.toLocaleString('en-IN')}`}</span>
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
                  
                  <div className="mt-4 text-xs text-center text-theme1-secondary/70">
                    <p>All transactions are secure and encrypted.</p>
                    <p className="mt-1">By placing your order, you agree to our Terms of Service and Privacy Policy.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-4 text-center mt-auto">
        <p className="text-theme1-secondary font-sans text-xs">
          © {new Date().getFullYear()} Sweetopiaa. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default CheckoutPage;