'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import ContactSection from '@/components/contactSection';
import Footer from '@/components/footerSection';

const RefundPolicyPage = () => {
  const router = useRouter();
  
  const goBack = () => {
    router.back();
  };
  
  return (
    <main className="min-h-screen bg-theme1-bg">
      {/* Header */}
      <header className="p-6 sm:p-10 flex justify-between items-center">
        <h1 className="text-3xl font-serif text-theme1-primary">
          Return & Refund Policy
        </h1>
        <button
          onClick={goBack}
          className="px-4 py-2 font-sans text-sm rounded-md border border-theme1-tertiary text-theme1-tertiary hover:bg-theme1-tertiary hover:text-white transition-colors duration-300"
        >
          Back to Home
        </button>
      </header>
      
      {/* Policy Overview Section */}
      <section className="p-6 sm:p-10 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-serif mb-6 text-theme1-primary">Our Return & Refund Policy</h2>
            <p className="text-theme1-secondary leading-relaxed font-sans mb-6">
              At Sweetopiaa, we take immense pride in creating desserts that not only taste exceptional but also bring joy to your special moments. Each creation is crafted with care, using the finest ingredients, to ensure your complete satisfaction.
            </p>
            <p className="text-theme1-secondary leading-relaxed font-sans">
              As our products are perishable and made-to-order, we maintain a strict No Return/No Exchange policy. However, we are fully committed to addressing any concerns regarding quality or damage promptly and fairly. Please review our complete policy below.
            </p>
          </div>
        </div>
      </section>
      
      {/* Policy Details Section */}
      <section className="p-6 sm:p-10 mb-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Return Policy */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-serif mb-4 text-theme1-primary">Return Policy And Cancellation</h3>
            <div className="space-y-4">
              <p className="text-theme1-secondary leading-relaxed font-sans">
                We have a No Return/No Exchange policy as all items are perishable and made to order for you.
              </p>
              <p className="text-theme1-secondary leading-relaxed font-sans">
                To raise a concern, you can contact us at <span className="text-theme1-tertiary">sweetopiaacakestudio@gmail.com</span> or WhatsApp on <span className="text-theme1-tertiary">+91</span>
              </p>
            </div>
          </div>
          
          {/* Cancellation */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-serif mb-4 text-theme1-primary">Order Cancellation</h3>
            <div className="space-y-4">
              <p className="text-theme1-secondary leading-relaxed font-sans">
                In case of an order placed by mistake, it can be cancelled up to 36 hours before delivery. It can take 5-7 Business Days for the Amount to reflect in your account.
              </p>
            </div>
          </div>
          
          {/* Damages and Issues */}
          <div className="bg-theme1-tertiary/10 p-8 rounded-lg">
            <h3 className="text-xl font-serif mb-4 text-theme1-primary">Damages And Issues</h3>
            <div className="space-y-4">
              <p className="text-theme1-secondary leading-relaxed font-sans">
                Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="p-6 sm:p-10 mb-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-serif mb-6 text-theme1-primary">Questions About Our Policy?</h2>
          <p className="text-theme1-secondary leading-relaxed font-sans mb-8 max-w-2xl mx-auto">
            If you have any questions about our return policy or need assistance with an order, please feel free to contact us.
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

export default RefundPolicyPage;