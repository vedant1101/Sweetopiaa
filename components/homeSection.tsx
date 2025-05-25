'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const HomeSection: React.FC = () => {
  const router = useRouter();
  
  const handleShopNowClick = () => {
    router.push('/shop');
  };
  
  return (
    <section className="relative min-h-screen bg-theme1-bg overflow-hidden">
      {/* Aesthetic Background */}
      <div className="absolute inset-0">
        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-theme1-primary/5 via-transparent to-theme1-secondary/8"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-radial from-theme1-primary/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-radial from-theme1-tertiary/8 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-gradient-radial from-theme1-secondary/6 to-transparent rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        
        {/* Hero Content */}
        <div className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="max-w-7xl w-full grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content - Text */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-theme1-bg/60 backdrop-blur-xl rounded-full border border-theme1-primary/20 shadow-lg">
                <div className="w-2 h-2 bg-theme1-primary rounded-full animate-pulse"></div>
                <span className="text-theme1-primary font-semibold text-sm tracking-wide uppercase">
                  Premium Artisanal Bakery
                </span>
                <div className="w-8 h-px bg-gradient-to-r from-theme1-primary/50 to-transparent"></div>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="font-serif leading-tight">
                  <div className="text-7xl lg:text-8xl font-light text-theme1-primary mb-2">
                    Sweetopiaa
                  </div>
                  <div className="text-4xl lg:text-5xl text-theme1-tertiary/90 font-light">
                    Crafted with passion,
                  </div>
                  <div className="text-4xl lg:text-5xl text-theme1-tertiary/90 font-light">
                    served with love
                  </div>
                </h1>
              </div>

              {/* Description */}
              <div className="max-w-xl">
                <p className="text-xl text-theme1-tertiary/80 leading-relaxed">
                  Discover our exquisite collection of handcrafted cakes, artisanal cookies, and premium desserts. 
                  Each creation tells a story of quality, tradition, and pure sweetness.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <button
                  onClick={handleShopNowClick}
                  className="group relative px-8 py-4 bg-theme1-primary text-theme1-bg rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-theme1-secondary/20 to-theme1-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center justify-center gap-2">
                    Explore Our Collection
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
                
                <button
                  onClick={() => router.push('/about')}
                  className="group px-8 py-4 border-2 border-theme1-tertiary/40 text-theme1-tertiary rounded-2xl font-semibold text-lg hover:bg-theme1-tertiary/10 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                >
                  <span className="flex items-center justify-center gap-2">
                    Our Story
                    <svg className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="lg:col-span-5">
              <div className="relative group">
                
                {/* Decorative Elements */}
                <div className="absolute -inset-4 bg-gradient-to-r from-theme1-primary/20 to-theme1-secondary/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-60"></div>
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-theme1-primary/30 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-theme1-tertiary/20 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>
                
                {/* Main Image Container */}
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-theme1-primary/20 bg-theme1-bg/50 backdrop-blur-sm">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url('/images/DSC04620.JPG')`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover'
                    }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-theme1-primary/20 via-transparent to-theme1-secondary/10 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  
                  {/* Floating Info Card */}
                  <div className="absolute bottom-6 left-6 right-6 bg-theme1-bg/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-theme1-primary/20 transform group-hover:translate-y-1 transition-transform duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-serif text-theme1-tertiary font-semibold">Featured Creation</h3>
                        <p className="text-sm text-theme1-tertiary/70">Seasonal Special Collection</p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-theme1-primary to-theme1-secondary rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-theme1-bg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Features */}
        <div className="pb-12">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Feature 1 */}
              <div className="group bg-theme1-bg/60 backdrop-blur-xl rounded-2xl p-6 border border-theme1-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-theme1-primary/20 to-theme1-secondary/20 rounded-xl flex items-center justify-center border border-theme1-primary/20">
                    <svg className="w-6 h-6 text-theme1-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-theme1-tertiary text-lg">Premium Quality</h3>
                    <p className="text-theme1-tertiary/70 text-sm">Finest ingredients sourced globally</p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group bg-theme1-bg/60 backdrop-blur-xl rounded-2xl p-6 border border-theme1-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-theme1-primary/20 to-theme1-secondary/20 rounded-xl flex items-center justify-center border border-theme1-primary/20">
                    <svg className="w-6 h-6 text-theme1-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-theme1-tertiary text-lg">Fresh Daily</h3>
                    <p className="text-theme1-tertiary/70 text-sm">Baked fresh every morning</p>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group bg-theme1-bg/60 backdrop-blur-xl rounded-2xl p-6 border border-theme1-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-theme1-primary/20 to-theme1-secondary/20 rounded-xl flex items-center justify-center border border-theme1-primary/20">
                    <svg className="w-6 h-6 text-theme1-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-theme1-tertiary text-lg">Made with Love</h3>
                    <p className="text-theme1-tertiary/70 text-sm">Crafted with passion and care</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;