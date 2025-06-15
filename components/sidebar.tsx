'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useCart } from '@/context/cartContext';
import Image from 'next/image';
const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { getCartCount } = useCart();

  // Set active section based on current path
  const [activeSection, setActiveSection] = useState('home');

  // Update active section when pathname changes
  useEffect(() => {
    const path = pathname || '';
    if (path === '/' || path === '/home') {
      setActiveSection('home');
    } else if (path.includes('/about')) {
      setActiveSection('about');
    } else if (path.includes('/shop')) {
      setActiveSection('shop');
    } else if (path.includes('/contact')) {
      setActiveSection('contact');
    } else if (path.includes('/cart')) {
      setActiveSection('cart');
    }
  }, [pathname]);

  // Navigation functions
  const navigateTo = (page: string) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  const menuItems = [
    { key: 'home', label: 'Home' },
    { key: 'about', label: 'About' },
    { key: 'shop', label: 'Shop' },
  ];

  return (
    <div className="h-full bg-theme1-sidebar flex flex-col">
      
      {/* Logo Section */}
      <div className="px-6 py-4 text-center border-b border-theme1-tertiary/20">
        <div className="mb-2">
        <Image
  src="/images/brand_logo_new.png"
  alt="Sweetopiaa"
  width={128}
  height={128}
  className="h-32 w-auto mx-auto object-contain"
  onError={(e) => (e.currentTarget.style.display = 'none')}
/>
        </div>
        <h2
  className="font-brownie italic text-xl cursor-pointer text-theme1-tertiary hover:text-theme1-primary transition-colors duration-300"
  onClick={() => navigateTo('home')}
>
  Sweetopiaa
</h2>
        <p className="text-xs text-theme1-tertiary/60 mt-1 font-serif">Artisanal Bakery</p>
      </div>

      {/* Navigation Section */}
      <div className="flex-1 py-6">
        
        {/* Main Menu */}
        <nav className="px-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.key} className="relative">
                {/* Active Indicator */}
                {activeSection === item.key && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-theme1-primary rounded-r-full"></div>
                )}
                
                <button
                  onClick={() => navigateTo(item.key)}
                  className={`
                    w-full text-left py-3 px-5 rounded-r-xl font-serif transition-all duration-300
                    ${activeSection === item.key 
                      ? 'text-theme1-primary bg-theme1-primary/10 pl-8' 
                      : 'text-theme1-tertiary/70 hover:text-theme1-tertiary hover:bg-theme1-tertiary/5 hover:pl-7'
                    }
                  `}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Cart Section */}
        <div className="mt-8 pt-6 border-t border-theme1-tertiary/20 px-4">
          <div className="relative">
            {/* Active Indicator */}
            {activeSection === 'cart' && (
              <div className="absolute left-0 top-2 bottom-2 w-1 bg-theme1-primary rounded-r-full"></div>
            )}
            
            <button
              onClick={() => navigateTo('cart')}
              className={`
                w-full py-3 px-5 rounded-r-xl font-serif transition-all duration-300 flex items-center justify-between
                ${activeSection === 'cart' 
                  ? 'text-theme1-primary bg-theme1-primary/10 pl-8' 
                  : 'text-theme1-tertiary/70 hover:text-theme1-tertiary hover:bg-theme1-tertiary/5 hover:pl-7'
                }
              `}
            >
              <span>Cart</span>
              
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                {getCartCount() > 0 && (
                  <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-theme1-tertiary text-white">
                    {getCartCount()}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="px-6 py-6 border-t border-theme1-tertiary/20">
        <div className="text-center space-y-3">
          <div className="w-12 h-px bg-theme1-tertiary/30 mx-auto"></div>
          <blockquote className="font-serif italic text-theme1-tertiary text-sm">
  &ldquo;Freshly baked with love&rdquo;
</blockquote>
          <div className="w-12 h-px bg-theme1-tertiary/30 mx-auto"></div>
          <p className="text-xs text-theme1-tertiary/50 font-sans">
  Est. 2012.<br />
  A unit of Sweetopiaa Hospitality LLP
</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;