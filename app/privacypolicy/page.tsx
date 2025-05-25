'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import ContactSection from '@/components/contactSection';
import Footer from '@/components/footerSection';

const PrivacyPolicyPage = () => {
  const router = useRouter();
  
  const goBack = () => {
    router.back();
  };
  
  return (
    <main className="min-h-screen bg-theme1-bg">
      {/* Header */}
      <header className="p-6 sm:p-10 flex justify-between items-center">
        <h1 className="text-3xl font-serif text-theme1-primary">
          Privacy Policy
        </h1>
        <button
          onClick={goBack}
          className="px-4 py-2 font-sans text-sm rounded-md border border-theme1-tertiary text-theme1-tertiary hover:bg-theme1-tertiary hover:text-white transition-colors duration-300"
        >
          Back to Home
        </button>
      </header>
      
      {/* Privacy Policy Introduction */}
      <section className="p-6 sm:p-10 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-serif mb-6 text-theme1-primary">Our Privacy Practices</h2>
            <p className="text-theme1-secondary leading-relaxed font-sans mb-6">
            This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from sweetopiaa.com (the &ldquo;Site&rdquo;).
            </p>
          </div>
        </div>
      </section>
      
      {/* Privacy Policy Sections */}
      <section className="p-6 sm:p-10 mb-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Personal Information We Collect */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-serif mb-4 text-theme1-primary">Personal Information We Collect</h3>
            <div className="space-y-4">
              <p className="text-theme1-secondary leading-relaxed font-sans">
              We refer to this automatically-collected information as &ldquo;Device Information&rdquo;.
              </p>
              
              <p className="text-theme1-secondary leading-relaxed font-sans">
                We collect Device Information using the following technologies:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-theme1-secondary leading-relaxed font-sans">
              <li><span className="font-medium">&ldquo;Cookies&rdquo;</span> are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit <a href="http://www.allaboutcookies.org" className="text-theme1-tertiary hover:underline">http://www.allaboutcookies.org</a>.</li>
              <li><span className="font-medium">&ldquo;Log files&rdquo;</span> track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.</li>
              <li><span className="font-medium">&ldquo;Web beacons&rdquo;, &ldquo;tags&rdquo;, and &ldquo;pixels&rdquo;</span> are electronic files used to record information about how you browse the Site.</li>
              </ul>
              
              <p className="text-theme1-secondary leading-relaxed font-sans">
              We refer to this information as &ldquo;Order Information&rdquo;.
              </p>
              
              <p className="text-theme1-secondary leading-relaxed font-sans">
              When we talk about &ldquo;Personal Information&rdquo; in this Privacy Policy, we are talking both about Device Information and Order Information.
              </p>
            </div>
          </div>
          
          {/* How We Use Your Personal Information */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-serif mb-4 text-theme1-primary">How We Use Your Personal Information</h3>
            <div className="space-y-4">
              <p className="text-theme1-secondary leading-relaxed font-sans">
                We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-theme1-secondary leading-relaxed font-sans">
                <li>Communicate with you;</li>
                <li>Screen our orders for potential risk or fraud; and</li>
                <li>When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</li>
              </ul>
              
              <p className="text-theme1-secondary leading-relaxed font-sans">
                We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).
              </p>
            </div>
          </div>
          
          {/* Sharing Your Personal Information */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-serif mb-4 text-theme1-primary">Sharing Your Personal Information</h3>
            <div className="space-y-4">
              <p className="text-theme1-secondary leading-relaxed font-sans">
                We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Shopify to power our online store--you can read more about how Shopify uses your Personal Information here: <a href="https://www.shopify.com/legal/privacy" className="text-theme1-tertiary hover:underline">https://www.shopify.com/legal/privacy</a>. We also use Google Analytics to help us understand how our customers use the Site -- you can read more about how Google uses your Personal Information here: <a href="https://www.google.com/intl/en/policies/privacy/" className="text-theme1-tertiary hover:underline">https://www.google.com/intl/en/policies/privacy/</a>. You can also opt-out of Google Analytics here: <a href="https://tools.google.com/dlpage/gaoptout" className="text-theme1-tertiary hover:underline">https://tools.google.com/dlpage/gaoptout</a>.
              </p>
              
              <p className="text-theme1-secondary leading-relaxed font-sans">
                Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
              </p>
            </div>
          </div>
          
          {/* Behavioral Advertising */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-serif mb-4 text-theme1-primary">Behavioral Advertising</h3>
            <div className="space-y-4">
              <p className="text-theme1-secondary leading-relaxed font-sans">
              For more information about how targeted advertising works, you can visit the Network Advertising Initiative&apos;s (&ldquo;NAI&rdquo;) educational page at
              </p>
              
              <p className="text-theme1-secondary leading-relaxed font-sans">
                You can opt out of targeted advertising by using the links below:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-theme1-secondary leading-relaxed font-sans">
                <li>Facebook: <a href="https://www.facebook.com/settings/?tab=ads" className="text-theme1-tertiary hover:underline">https://www.facebook.com/settings/?tab=ads</a></li>
                <li>Google: <a href="https://www.google.com/settings/ads/anonymous" className="text-theme1-tertiary hover:underline">https://www.google.com/settings/ads/anonymous</a></li>
                <li>Bing: <a href="https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads" className="text-theme1-tertiary hover:underline">https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads</a></li>
              </ul>
              
              <p className="text-theme1-secondary leading-relaxed font-sans">
                Please note that we do not alter our Site&apos;s data collection and use practices when we see a Do Not Track signal from your browser.Please note that we do not alter our Site&apos;s data collection and use practices when we see a Do Not Track signal from your browser.
              </p>
            </div>
          </div>
          
          {/* Do Not Track */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-serif mb-4 text-theme1-primary">Do Not Track</h3>
            <div className="space-y-4">
              <p className="text-theme1-secondary leading-relaxed font-sans">
              We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.
              </p>
            </div>
          </div>
          
          {/* Your Rights */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-serif mb-4 text-theme1-primary">Your Rights</h3>
            <div className="space-y-4">
              <p className="text-theme1-secondary leading-relaxed font-sans">
                If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.
              </p>
              
              <p className="text-theme1-secondary leading-relaxed font-sans">
                Additionally, if you are a European resident we note that we are processing your information in order to fulfill contracts we might have with you (for example if you make an order through the Site), or otherwise to pursue our legitimate business interests listed above. Additionally, please note that your information will be transferred outside of Europe, including to Canada and the United States.
              </p>
            </div>
          </div>
          
          {/* Data Retention */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-serif mb-4 text-theme1-primary">Data Retention</h3>
            <div className="space-y-4">
              <p className="text-theme1-secondary leading-relaxed font-sans">
                When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
              </p>
            </div>
          </div>
          
          {/* Changes */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-serif mb-4 text-theme1-primary">Changes</h3>
            <div className="space-y-4">
              <p className="text-theme1-secondary leading-relaxed font-sans">
                We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.
              </p>
            </div>
          </div>
          
          {/* Contact Us */}
          <div className="bg-theme1-tertiary/10 p-8 rounded-lg">
            <h3 className="text-xl font-serif mb-4 text-theme1-primary">Contact Us</h3>
            <div className="space-y-4">
              <p className="text-theme1-secondary leading-relaxed font-sans">
                For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e‑mail at <a href="mailto:sweetopiaacakestudio@gmail.com" className="text-theme1-tertiary hover:underline">sweetopiaacakestudio@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <ContactSection />
      <Footer/>
    </main>
  );
};

export default PrivacyPolicyPage;