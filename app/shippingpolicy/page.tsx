'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import ContactSection from '@/components/contactSection';
import Footer from '@/components/footerSection';

const ShippingPolicyPage = () => {
  const router = useRouter();
  
  const goBack = () => {
    router.back();
  };
  
  return (
    <main className="min-h-screen bg-theme1-bg">
      {/* Header */}
      <header className="p-6 sm:p-10 flex justify-between items-center">
        <h1 className="text-3xl font-serif text-theme1-primary">
          Shipping & Delivery
        </h1>
        <button
          onClick={goBack}
          className="px-4 py-2 font-sans text-sm rounded-md border border-theme1-tertiary text-theme1-tertiary hover:bg-theme1-tertiary hover:text-white transition-colors duration-300"
        >
          Back to Home
        </button>
      </header>
      
      {/* Overview Section */}
      <section className="p-6 sm:p-10 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-serif mb-6 text-theme1-primary">Our Shipping Policy</h2>
            <p className="text-theme1-secondary leading-relaxed font-sans mb-6">
              At Sweetopiaa, we understand that timely and careful delivery is just as important as the quality of our baked creations. Our shipping and delivery policy is designed to ensure your delicious treats arrive in perfect condition for your special occasions.
            </p>
            <p className="text-theme1-secondary leading-relaxed font-sans">
              Please review the information below to understand our delivery areas, timeframes, and special considerations for our perishable products.
            </p>
          </div>
        </div>
      </section>
      
      {/* Shipping Details Section */}
      <section className="p-6 sm:p-10 mb-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Delivery Areas */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-serif mb-4 text-theme1-primary">Delivery Areas</h3>
            <div className="space-y-4">
              <p className="text-theme1-secondary leading-relaxed font-sans">
                We currently offer delivery to the following areas:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-theme1-secondary leading-relaxed font-sans">
                <li>South Delhi</li>
                <li>Central Delhi</li>
                <li>Gurgaon/Gurugram</li>
                <li>Noida</li>
              </ul>
              <p className="text-theme1-secondary leading-relaxed font-sans">
                Delivery to areas outside these zones may be available for an additional fee. Please contact us directly to inquire about delivery to your specific location.
              </p>
            </div>
          </div>
          
          {/* Delivery Timeframes */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-serif mb-4 text-theme1-primary">Delivery Timeframes</h3>
            <div className="space-y-4">
              <p className="text-theme1-secondary leading-relaxed font-sans">
                We schedule deliveries within the following timeframes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-theme1-secondary leading-relaxed font-sans">
                <li><span className="font-medium">Regular Delivery Hours:</span> 10:00 AM to 7:00 PM, seven days a week</li>
                <li><span className="font-medium">Order Lead Time:</span> We require a minimum of 48 hours advance notice for most standard orders</li>
                <li><span className="font-medium">Custom and Special Orders:</span> Custom cakes and large orders require 3-5 days advance notice</li>
                <li><span className="font-medium">Same-day Delivery:</span> Limited same-day delivery may be available for select items, subject to availability and an additional express fee</li>
              </ul>
              <p className="text-theme1-secondary leading-relaxed font-sans">
                When placing your order, you can select a preferred delivery date and time window. We will do our best to accommodate your request and will confirm the delivery schedule when your order is confirmed.
              </p>
            </div>
          </div>
          
          {/* Delivery Fees */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-serif mb-4 text-theme1-primary">Delivery Fees</h3>
            <div className="space-y-4">
              <p className="text-theme1-secondary leading-relaxed font-sans">
                Our delivery fees are calculated based on the delivery location and order value:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-theme1-secondary leading-relaxed font-sans">
                <li>Orders above ₹1500 within South Delhi: Free delivery</li>
                <li>Orders below ₹1500 within South Delhi: ₹150 delivery fee</li>
                <li>Central Delhi: ₹200 delivery fee</li>
                <li>Gurgaon/Gurugram and Noida: ₹250-350 delivery fee (depending on specific location)</li>
                <li>Express/same-day delivery: Additional ₹200 fee (subject to availability)</li>
              </ul>
              <p className="text-theme1-secondary leading-relaxed font-sans">
                The exact delivery fee will be calculated and displayed at checkout before you complete your purchase.
              </p>
            </div>
          </div>
          
          {/* Special Considerations */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-serif mb-4 text-theme1-primary">Special Handling Considerations</h3>
            <div className="space-y-4">
              <p className="text-theme1-secondary leading-relaxed font-sans">
                As our products are freshly baked and often delicate, please keep the following in mind:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-theme1-secondary leading-relaxed font-sans">
                <li>Our baked goods are delivered in temperature-controlled packaging whenever possible, but should be refrigerated promptly upon receipt</li>
                <li>Cake deliveries require someone to be present at the delivery location to receive the order</li>
                <li>For multi-tier cakes and wedding cakes, we may provide on-site assembly to ensure perfect presentation (additional fees may apply)</li>
                <li>During extreme weather conditions (excessive heat, monsoons), we may recommend pickup or adjusted delivery times to ensure product quality</li>
              </ul>
            </div>
          </div>
          
          {/* Pickup Options */}
          <div className="bg-theme1-tertiary/10 p-8 rounded-lg">
            <h3 className="text-xl font-serif mb-4 text-theme1-primary">Pickup Options</h3>
            <div className="space-y-4">
              <p className="text-theme1-secondary leading-relaxed font-sans">
                If you prefer to pick up your order directly:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-theme1-secondary leading-relaxed font-sans">
                <li>Pickup is available at our location in South Delhi</li>
                <li>Pickup hours: 10:00 AM to 7:00 PM, seven days a week</li>
                <li>We recommend pre-ordering with at least 48 hours notice even for pickup orders</li>
                <li>Your order will be carefully packaged for safe transport</li>
                <li>We can provide guidance on proper handling and storage upon pickup</li>
              </ul>
              <p className="text-theme1-secondary leading-relaxed font-sans mt-4">
                For large orders, wedding cakes, or special events, please contact us directly to discuss the best delivery or pickup arrangements.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="p-6 sm:p-10 mb-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-serif mb-6 text-theme1-primary">Questions About Delivery?</h2>
          <p className="text-theme1-secondary leading-relaxed font-sans mb-8 max-w-2xl mx-auto">
            If you have any questions about delivery to your area, special handling requirements, or other shipping concerns, please don&apos;t hesitate to reach out.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a 
              href="mailto:sweetopiaacakestudio@gmail.com" 
              className="inline-block px-6 py-3 bg-theme1-tertiary text-white font-sans rounded-md hover:bg-theme1-tertiary/90 transition-colors duration-300"
            >
              Email Us
            </a>
            <a 
              href="https://wa.me/+91" 
              className="inline-block px-6 py-3 border border-theme1-tertiary text-theme1-tertiary font-sans rounded-md hover:bg-theme1-tertiary hover:text-white transition-colors duration-300"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
      
      <ContactSection />
      <Footer/>
    </main>
  );
};

export default ShippingPolicyPage;