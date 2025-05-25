// OfferingsSection.tsx
'use client';
import React from 'react';

const OfferingsSection: React.FC = () => {
  return (
    <section id="services" className="py-16 bg-theme1-bg">
      <div className="container mx-auto px-6">
        <h3 className="text-sm uppercase tracking-wider font-sans font-medium mb-6 text-theme1-tertiary">OUR SPECIALTIES</h3>
        <h2 className="text-3xl font-serif mb-12 text-theme1-tertiary">Sweet Creations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-theme1-secondary/5 rounded-lg shadow-md border-l-4 border-theme1-primary hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-serif mb-2 text-theme1-tertiary">Custom Cakes</h3>
            <p className="text-theme1-secondary font-sans">Beautifully designed cakes for all occasions, from birthdays to weddings and everything in between.</p>
          </div>
          
          <div className="p-6 bg-theme1-secondary/5 rounded-lg shadow-md border-l-4 border-theme1-primary hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-serif mb-2 text-theme1-tertiary">Artisan Cookies</h3>
            <p className="text-theme1-secondary font-sans">Handcrafted cookies in a variety of flavors, from classic chocolate chip to elegant decorated treats.</p>
          </div>
          
          <div className="p-6 bg-theme1-secondary/5 rounded-lg shadow-md border-l-4 border-theme1-primary hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-serif mb-2 text-theme1-tertiary">Sweet Delights</h3>
            <p className="text-theme1-secondary font-sans">Cupcakes, pastries, and seasonal specialties made with the finest ingredients and creative flair.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferingsSection;