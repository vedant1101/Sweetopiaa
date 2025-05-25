'use client';

import React from 'react';
import HomeSection from '../components/homeSection';
import AboutSection from '../components/aboutSection';
import OfferingsSection from '../components/offeringsSection';
import ProductsSection from '../components/productsSection';
import ReviewsSection from '../components/reviewSection';
import ContactSection from '../components/contactSection';
import Footer from '../components/footerSection';

export default function Home() {
  return (
    <main>
      <HomeSection />
      <AboutSection />
      <OfferingsSection />
      <ProductsSection />
      <ReviewsSection />
      <ContactSection />
      <Footer/>
    </main>
  );
}