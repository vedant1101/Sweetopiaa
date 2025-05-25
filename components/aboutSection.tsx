'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const AboutSection: React.FC = () => {
  const router = useRouter();

  const handleKnowMoreClick = () => {
    router.push('/about');
  };

  return (
    <section id="about" className="flex bg-theme1-bg">
      {/* Left Side - About Content */}
      <div className="w-1/2 p-16 flex flex-col justify-center">
        <h3 className="text-sm uppercase tracking-wider font-sans font-medium mb-12 text-theme1-tertiary">
          ABOUT SWEETOPIAA
        </h3>
        
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-serif mb-4 text-theme1-tertiary">Handcrafted with Love</h2>
            <p className="text-theme1-secondary leading-relaxed font-sans">
              At Sweetopiaa, every creation is made with love and attention to detail. Our dedication to quality 
              ingredients and artisanal techniques ensures a delightful experience with every bite.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4 text-theme1-tertiary">Custom Creations</h2>
            <p className="text-theme1-secondary leading-relaxed font-sans">
              From birthday celebrations to weddings, we design custom cakes and treats that perfectly match your 
              vision. Share your ideas, and we&apos;ll bring them to life with delicious artistry.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4 text-theme1-tertiary">Our Sweet Promise</h2>
            <p className="text-theme1-secondary leading-relaxed font-sans">
              We believe in creating moments of joy through our baked goods. Using only the finest ingredients, 
              we promise a taste experience that will leave you coming back for more!
            </p>
          </section>
        </div>

        <div className="mt-12">
          <button
            className="px-6 py-3 font-sans font-medium rounded-lg border-2 border-theme1-primary text-theme1-bg bg-theme1-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-theme1-tertiary focus:ring-opacity-50 transition-colors duration-300"
            onClick={handleKnowMoreClick}
          >
            Know More
          </button>
        </div>
      </div>

      {/* Right Side - Compact Aesthetic Facebook Card */}
      <div className="w-1/2 relative flex items-center justify-center p-6">
        {/* Subtle Background Decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30"></div>
        <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-r from-blue-200/40 to-purple-200/40 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-gradient-to-r from-pink-200/40 to-indigo-200/40 rounded-full blur-lg"></div>
        
        <div className="relative z-10 w-full max-w-md">
          {/* Compact Header */}
          <div className="mb-4 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl mb-3 shadow-md">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <h3 className="text-xl font-serif text-theme1-tertiary mb-2">
              Follow Our Journey
            </h3>
            <p className="text-theme1-secondary font-sans text-sm">
              Latest creations & sweet moments
            </p>
          </div>

          {/* Enhanced Facebook Card with Custom Posts Display */}
          <div className="relative">
            {/* Elegant Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-pink-400/30 rounded-xl blur-md"></div>
            
            {/* Main Card */}
            <div className="relative bg-white/98 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-white/50">
              {/* Refined Top Accent */}
              <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
              
              {/* Custom Header */}
              <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-blue-50/50 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">S</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">Sweetopiaa Cake Studio</h4>
                    <p className="text-xs text-gray-500">Food & Beverage Company</p>
                  </div>
                  <div className="ml-auto">
                    <button className="px-3 py-1 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 transition-colors">
                      Follow
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Posts Area */}
              <div className="relative overflow-hidden" style={{ height: '280px' }}>
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-blue-50/30"></div>
                
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-pink-200/40 to-purple-200/40 rounded-full blur-lg"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-r from-blue-200/40 to-indigo-200/40 rounded-full blur-md"></div>
                
                {/* Facebook Iframe with Overlay */}
                <div className="relative h-full">
                  <iframe
                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fsweetopiaa&tabs=timeline&width=400&height=280&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=false&appId"
                    width="100%"
                    height="280"
                    style={{ 
                      border: 'none', 
                      overflow: 'hidden'
                    }}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  />
                  
                  {/* Subtle Overlay for Better Integration */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-white/5 pointer-events-none"></div>
                </div>
              </div>
              
              {/* Enhanced Bottom Section */}
              <div className="px-4 py-3 bg-gradient-to-r from-gray-50/80 to-blue-50/50 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>Live</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span>Verified</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                    </svg>
                    <span>Daily updates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Compact Call to Action */}
          <div className="mt-4 text-center">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/40 shadow-md">
              <p className="text-theme1-secondary font-sans text-sm mb-3 flex items-center justify-center">
                <span className="text-lg mr-1">🍰</span>
                Join our sweet community!
              </p>
              
              <a 
                href="https://www.facebook.com/sweetopiaa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium text-sm rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Follow Page
                <svg className="w-3 h-3 ml-2 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              
              {/* Compact Social Indicators */}
              <div className="mt-3 flex items-center justify-center space-x-4 text-xs text-theme1-secondary">
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></div>
                  <span>Live</span>
                </div>
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-1.5"></div>
                  <span>Daily Posts</span>
                </div>
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-1.5"></div>
                  <span>Offers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;