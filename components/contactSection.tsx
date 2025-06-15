'use client';
import { Phone } from 'lucide-react';
import React from 'react';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="relative">
      <div className="flex flex-col md:flex-row">
        {/* Left side - Contact Information */}
        <div className="w-full md:w-1/2 p-10 md:p-16 bg-theme1-bg">
          <h3 className="text-sm uppercase tracking-wider font-sans font-medium mb-6 text-theme1-primary">CONTACT US</h3>
          <h2 className="text-3xl font-serif mb-8 text-theme1-primary">
  Better yet, see us in person!
</h2>
<p className="text-theme1-secondary leading-relaxed font-sans mb-4">
  We love our customers, so feel free to visit during our business hours- 10:00 am- 6:00 pm.
</p>
<p className="text-theme1-secondary leading-relaxed font-sans mb-10 text-sm">
  (Sundays closed)
</p>
 {/* Contact Numbers */}
 <div className="mb-8">
            <h4 className="text-lg font-serif mb-4 text-theme1-primary">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-theme1-tertiary" />
                <a 
                  href="tel:+919810013545" 
                  className="text-theme1-secondary hover:text-theme1-tertiary transition-colors font-sans"
                >
                  +91 9810013545
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-theme1-tertiary" />
                <a 
                  href="tel:+919643727210" 
                  className="text-theme1-secondary hover:text-theme1-tertiary transition-colors font-sans"
                >
                  +91 9643727210
                </a>
              </div>
            </div>
          </div>
          {/* WhatsApp Button */}
          <a
            href="https://wa.me/+919599213545"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-theme1-tertiary text-white py-3 px-6 rounded mb-12 hover:bg-theme1-tertiary/80 transition-colors"
          >
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Message us on WhatsApp
          </a>
          {/* Business Name and Address */}
          <div className="mb-6">
            <h3 className="text-2xl font-serif mb-4 text-theme1-primary">Sweetopiaa</h3>
            <p className="text-theme1-secondary font-sans">Sector 46- Sweetopiaa, B-234, Gulmohar Avenue, sector-46, Noida, Gautam Buddha nagar, Uttar Pradesh-201303</p>
          </div>
          {/* Phone Number */}
          {/* <div>
            <p className="text-theme1-secondary font-sans">
              <a href="tel:+919599213545" className="hover:text-theme1-tertiary transition-colors">
                +91 9599213545
              </a>
            </p>
          </div> */}
        </div>
        {/* Right side - Map */} 
        <div className="w-full md:w-1/2 h-[500px] md:h-auto relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d876.1458213814883!2d77.35907566593558!3d28.55224258772243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce500427363a1%3A0xe270d8bdfebe2633!2sGulmohar%20avenue!5e0!3m2!1sen!2sin!4v1749975702160!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            className="absolute inset-0"
          ></iframe>
           <div className="absolute top-4 right-4 z-10">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=28.55229913178388, 77.35972744274977"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white border border-theme1-tertiary/20 py-2 px-4 rounded shadow hover:bg-theme1-bg/90 transition-colors"
            >
              <svg className="w-5 h-5 mr-2 text-theme1-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <span className="font-sans text-theme1-secondary tracking-wide">GET DIRECTIONS</span>
            </a>
          </div>
        </div>  
      </div>
    </section>
  );
};

export default ContactSection;