'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import ContactSection from '@/components/contactSection';
import Footer from '@/components/footerSection';

const TermsAndConditionsPage = () => {
  const router = useRouter();
  
  const goBack = () => {
    router.back();
  };
  
  return (
    <main className="min-h-screen bg-theme1-bg">
      {/* Header */}
      <header className="p-6 sm:p-10 flex justify-between items-center">
        <h1 className="text-3xl font-serif text-theme1-primary">
          Terms & Conditions
        </h1>
        <button
          onClick={goBack}
          className="px-4 py-2 font-sans text-sm rounded-md border border-theme1-tertiary text-theme1-tertiary hover:bg-theme1-tertiary hover:text-white transition-colors duration-300"
        >
          Back to Home
        </button>
      </header>
      
      {/* Introduction Section */}
      <section className="p-6 sm:p-10 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-serif mb-6 text-theme1-primary">Terms of Service</h2>
            <p className="text-theme1-secondary leading-relaxed font-sans mb-6">
              Welcome to Sweetopiaa. By accessing our website, placing orders, or using our services, you agree to be bound by the following terms and conditions. Please read them carefully before using our services.
            </p>
            <p className="text-theme1-secondary leading-relaxed font-sans">
              These terms constitute a legally binding agreement between you and Sweetopiaa regarding your use of our website and services. If you do not agree with any part of these terms, you may not use our website or services.
            </p>
          </div>
        </div>
      </section>
      
      {/* Terms Sections */}
      <section className="p-6 sm:p-10 mb-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Website Use */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-serif mb-4 text-theme1-primary">Website Use</h3>
            <div className="space-y-4">
              <p className="text-theme1-secondary leading-relaxed font-sans">
                By using the Sweetopiaa website, you agree to the following:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-theme1-secondary leading-relaxed font-sans">
                <li>You will not use our website for any illegal or unauthorized purpose</li>
                <li>You will not violate any laws in your jurisdiction, including copyright and trademark laws</li>
                <li>You will not upload or transmit viruses or any code of a destructive nature</li>
                <li>You will not attempt to modify, adapt, translate, reverse engineer, decompile, or disassemble any portion of the website</li>
                <li>We reserve the right to refuse service to anyone for any reason at any time</li>
              </ul>
            </div>
          </div>
          
          {/* Account Information */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-serif mb-4 text-theme1-primary">Account Information</h3>
            <div className="space-y-4">
              <p className="text-theme1-secondary leading-relaxed font-sans">
                When you create an account or place an order with us:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-theme1-secondary leading-relaxed font-sans">
                <li>You agree to provide accurate, current, and complete information</li>
                <li>You are responsible for maintaining the confidentiality of your account and password</li>
                <li>You accept responsibility for all activities that occur under your account</li>
                <li>You must notify us immediately of any unauthorized use of your account or any other breach of security</li>
              </ul>
            </div>
          </div>
          
          {/* Products and Orders */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-serif mb-4 text-theme1-primary">Products and Orders</h3>
            <div className="space-y-4">
              <p className="text-theme1-secondary leading-relaxed font-sans">
                Regarding our products and the ordering process:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-theme1-secondary leading-relaxed font-sans">
                <li>All products are subject to availability</li>
                <li>Prices are subject to change without notice</li>
                <li>We reserve the right to discontinue any product at any time</li>
                <li>We do not guarantee that the quality of any products, services, information, or other material purchased or obtained from us will meet your expectations</li>
                <li>Custom orders require specific lead times as outlined in our Shipping Policy</li>
                <li>Orders may be cancelled as per our Return and Refund Policy</li>
                <li>We reserve the right to refuse any order placed with us</li>
              </ul>
            </div>
          </div>
          
          {/* Payment Terms */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-serif mb-4 text-theme1-primary">Payment Terms</h3>
            <div className="space-y-4">
              <p className="text-theme1-secondary leading-relaxed font-sans">
                For all orders and payments:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-theme1-secondary leading-relaxed font-sans">
                <li>Payment must be received in full before order processing begins</li>
                <li>For custom orders, a non-refundable deposit may be required</li>
                <li>We accept various payment methods as indicated at checkout</li>
                <li>All payments are processed through secure payment gateways</li>
                <li>You represent and warrant that you have the legal right to use any payment method you provide</li>
              </ul>
            </div>
          </div>
          
          {/* Content and Intellectual Property */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-serif mb-4 text-theme1-primary">Content and Intellectual Property</h3>
            <div className="space-y-4">
              <p className="text-theme1-secondary leading-relaxed font-sans">
                All content on the Sweetopiaa website, including text, graphics, logos, images, and software, is the property of Sweetopiaa or its content suppliers and is protected by copyright and trademark laws.
              </p>
              <p className="text-theme1-secondary leading-relaxed font-sans">
                You may not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-theme1-secondary leading-relaxed font-sans">
                <li>Reproduce, duplicate, copy, sell, resell, or exploit any portion of the website without express written permission</li>
                <li>Use any trademarks, service marks, or logos displayed on the website without our written permission</li>
                <li>Remove any copyright, trademark, or other proprietary notices from any content on the website</li>
              </ul>
            </div>
          </div>
          
          {/* Limitation of Liability */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-serif mb-4 text-theme1-primary">Limitation of Liability</h3>
            <div className="space-y-4">
              <p className="text-theme1-secondary leading-relaxed font-sans">
                Sweetopiaa and its affiliates shall not be liable for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-theme1-secondary leading-relaxed font-sans">
                <li>Any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services</li>
                <li>Any loss or damage arising from unauthorized access to or use of your personal information</li>
                <li>Any issues related to allergies, food sensitivities, or dietary restrictions if not clearly communicated during the ordering process</li>
                <li>Damages or issues caused by factors outside our control, including but not limited to weather conditions, traffic, or third-party delivery services</li>
              </ul>
              <p className="text-theme1-secondary leading-relaxed font-sans">
                Our liability is limited to the amount paid by you for the specific product or service in question.
              </p>
            </div>
          </div>
          
          {/* Indemnification */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-serif mb-4 text-theme1-primary">Indemnification</h3>
            <div className="space-y-4">
              <p className="text-theme1-secondary leading-relaxed font-sans">
                You agree to indemnify, defend, and hold harmless Sweetopiaa, its affiliates, officers, directors, employees, and agents from any claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys&apos; fees) arising from:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-theme1-secondary leading-relaxed font-sans">
                <li>Your use of our website or services</li>
                <li>Your violation of these Terms and Conditions</li>
                <li>Your violation of any rights of a third party</li>
                <li>Your conduct in connection with the website or services</li>
              </ul>
            </div>
          </div>
          
          {/* Governing Law */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-serif mb-4 text-theme1-primary">Governing Law</h3>
            <div className="space-y-4">
              <p className="text-theme1-secondary leading-relaxed font-sans">
                These Terms and Conditions shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any dispute arising from these terms or your use of our website or services shall be subject to the exclusive jurisdiction of the courts in Delhi, India.
              </p>
            </div>
          </div>
          
          {/* Changes to Terms */}
          <div className="bg-theme1-tertiary/10 p-8 rounded-lg">
            <h3 className="text-xl font-serif mb-4 text-theme1-primary">Changes to Terms</h3>
            <div className="space-y-4">
              <p className="text-theme1-secondary leading-relaxed font-sans">
                We reserve the right to modify or replace these Terms and Conditions at any time. Changes will be effective immediately upon posting to the website. Your continued use of our website or services after any such changes constitutes your acceptance of the new Terms and Conditions.
              </p>
              <p className="text-theme1-secondary leading-relaxed font-sans">
                It is your responsibility to review these Terms and Conditions periodically for changes. If you do not agree with any of the changes, you should stop using our website and services.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="p-6 sm:p-10 mb-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-serif mb-6 text-theme1-primary">Questions About Our Terms?</h2>
          <p className="text-theme1-secondary leading-relaxed font-sans mb-8 max-w-2xl mx-auto">
            If you have any questions about these Terms and Conditions, please contact us:
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

export default TermsAndConditionsPage;