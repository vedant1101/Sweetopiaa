// Footer.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-theme1-bg text-theme1-primary py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div className="md:col-span-1">
          <h2 className="text-3xl font-serif font-light mb-4">Sweetopiaa</h2>
          <p className="text-sm text-theme1-secondary mb-4">
            Crafting delightful artisanal cakes and cookies that bring joy to every celebration.
          </p>
          <div className="flex space-x-4">
            <Link 
              href="https://facebook.com" 
              className="text-theme1-tertiary hover:text-opacity-80 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={24} />
            </Link>
            <Link 
              href="https://instagram.com" 
              className="text-theme1-tertiary hover:text-opacity-80 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </Link>
            <Link 
              href="https://twitter.com" 
              className="text-theme1-tertiary hover:text-opacity-80 transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={24} />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-1">
          <h3 className="font-semibold mb-4 text-theme1-primary">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link 
                href="/about" 
                className="text-theme1-secondary hover:text-theme1-tertiary transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link 
                href="/returnpolicy" 
                className="text-theme1-secondary hover:text-theme1-tertiary transition-colors"
              >
                Returns and Refund Policy
              </Link>
            </li>
            <li>
              <Link 
                href="/privacypolicy" 
                className="text-theme1-secondary hover:text-theme1-tertiary transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link 
                href="/shippingpolicy" 
                className="text-theme1-secondary hover:text-theme1-tertiary transition-colors"
              >
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link 
                href="/termsandconditions" 
                className="text-theme1-secondary hover:text-theme1-tertiary transition-colors"
              >
                Terms and Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div className="md:col-span-1">
          <h3 className="font-semibold mb-4 text-theme1-primary">Our Services</h3>
          <ul className="space-y-2">
            <li className="text-theme1-secondary">Wedding Cakes</li>
            <li className="text-theme1-secondary">Birthday Cakes</li>
            <li className="text-theme1-secondary">Custom Orders</li>
            <li className="text-theme1-secondary">Corporate Events</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="md:col-span-1">
          <h3 className="font-semibold mb-4 text-theme1-primary">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-center space-x-2">
              <Mail size={20} className="text-theme1-tertiary" />
              <span className="text-theme1-secondary">info@sweetopiaa.com</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone size={20} className="text-theme1-tertiary" />
              <span className="text-theme1-secondary">(123) 456-7890</span>
            </li>
            <li className="flex items-center space-x-2">
              <MapPin size={20} className="text-theme1-tertiary" />
              <span className="text-theme1-secondary">B-234, Sector-46 Noida UP 201303</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-theme1-primary/20 mt-8 pt-6 text-center">
        <p className="text-sm text-theme1-secondary">
          © {currentYear} Sweetopiaa. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;