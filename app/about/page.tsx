'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ContactSection from '@/components/contactSection';
import Footer from '@/components/footerSection';

const AboutPage = () => {
  const router = useRouter();
  
  const goBack = () => {
    router.back();
  };
  
  return (
    <main className="min-h-screen bg-theme1-bg">
      {/* Header */}
      <header className="p-6 sm:p-10 flex justify-between items-center">
        <h1 className="text-3xl font-serif text-theme1-primary">
          About Sweetopiaa
        </h1>
        <button
          onClick={goBack}
          className="px-4 py-2 font-sans text-sm rounded-md border border-theme1-tertiary text-theme1-tertiary hover:bg-theme1-tertiary hover:text-white transition-colors duration-300"
        >
          Back to Home
        </button>
      </header>
      
      {/* Our Story Section */}
      <section className="p-6 sm:p-10 flex flex-col lg:flex-row items-center gap-12 mb-16">
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-2xl font-serif mb-4 text-theme1-primary">Our Story</h2>
          <div className="space-y-4">
          <p className="text-theme1-secondary leading-relaxed font-sans mb-4">
  You can&apos;t go looking for your passion; It finds You.
</p>

<p className="text-theme1-secondary leading-relaxed font-sans mb-4">
  Growing up with a Sikhni mom and Bundelkhandi dad, I lived at the intersection of diverse culinary traditions. Food became the epicenter of our lives, nourishing my soul first and stomach second.
</p>

<p className="text-theme1-secondary leading-relaxed font-sans mb-4">
  In college, I baked cakes for friends, exchanging them for treats from our St. Stephen&apos;s college Dhaba. But it was my son&apos;s love for fondant superhero cakes that turned this casual hobby into a serious pursuit.
</p>

<p className="text-theme1-secondary leading-relaxed font-sans mb-4">
  Soon the aromas from my tiny kitchen reached friends and acquaintances. As Julia Child famously said, &ldquo;A Party without a Cake, is Just a meeting.&rdquo; Before I knew it, I had become a full-time baker.
</p>

<p className="text-theme1-secondary leading-relaxed font-sans mb-4">
  Baking ignites my creativity. It&apos;s about crafting those special moments when the world pauses, you float in the clouds, and stop counting calories! Nothing brings me more joy than seeing people celebrate with a Sweetopia cake.
</p>

<p className="text-theme1-secondary leading-relaxed font-sans">
  This is how Sweetopia was born; spreading joy, creating memories, one cake at a time.
</p>
            {/* <p className="text-theme1-secondary leading-relaxed font-sans">
              Sweetopiaa began as a small kitchen experiment in 2018, when our founder Natalie discovered her passion for artisanal baking during a particularly challenging time in her life. What started as a form of therapy soon blossomed into a craft filled with creativity and joy.
            </p>
            <p className="text-theme1-secondary leading-relaxed font-sans">
              After sharing her creations with friends and family, the overwhelming positive response encouraged Natalie to take a leap of faith. She left her corporate job to pursue her dream of creating a space where people could experience the magic of handcrafted desserts made with love and intention.
            </p>
            <p className="text-theme1-secondary leading-relaxed font-sans">
              In 2020, despite the challenges of opening during a pandemic, Sweetopiaa's first bakery opened its doors. Our commitment to quality, creativity, and community quickly earned us a loyal following, and we've been growing ever since.
            </p> */}
          </div>
        </div>
        <div className="lg:w-1/2 relative aspect-square w-full max-w-lg">
          <div className="absolute inset-0 bg-cover bg-center rounded-lg shadow-md" style={{
            backgroundImage: `url('/images/story-image.webp')`
          }}></div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="bg-theme1-secondary/10 p-6 sm:p-10 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-serif mb-8 text-center text-theme1-primary">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-theme1-secondary/5 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-serif mb-3 text-theme1-primary">Quality Ingredients</h3>
              <p className="text-theme1-secondary leading-relaxed font-sans">
                We believe that exceptional desserts begin with exceptional ingredients. That&apos;s why we source only the finest organic flour, pure butter, free-range eggs, and seasonal fruits from local farmers whenever possible.
              </p>
            </div>
            <div className="bg-theme1-secondary/5 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-serif mb-3 text-theme1-primary">Artisanal Craft</h3>
              <p className="text-theme1-secondary leading-relaxed font-sans">
                Each creation is handcrafted with meticulous attention to detail. We honor traditional baking methods while embracing innovation, ensuring every bite tells a story of craftsmanship and creativity.
              </p>
            </div>
            <div className="bg-theme1-secondary/5 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-serif mb-3 text-theme1-primary">Sustainability</h3>
              <p className="text-theme1-secondary leading-relaxed font-sans">
                We&apos;re committed to minimizing our environmental footprint through eco-friendly packaging, reducing food waste, and supporting sustainable farming practices that nurture both our community and the planet.
              </p>
            </div>
          </div>
        </div>
      </section>
      
     {/* Team Section */}
<section className="p-6 sm:p-10 py-16">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-2xl font-serif mb-8 text-center text-theme1-primary">The Team Behind Sweetopiaa</h2>
    <div className="space-y-6">
      <p className="text-theme1-secondary leading-relaxed font-sans text-center max-w-3xl mx-auto mb-12">
        Our passionate team of bakers, decorators, and customer service specialists work together to create not just desserts, but memorable experiences. Each member brings their unique talents and perspectives, united by a shared love for creating joy through food.
      </p>
      
      {/* Centered staff cards in a single row */}
      <div className="flex justify-center">
        <div className="flex flex-row gap-8 max-w-4xl">
          <div className="text-center w-64">
            <div className="w-full aspect-square relative rounded-full mb-4 overflow-hidden">
              <Image 
                src="/images/staff1.jpeg" 
                alt="Marcus Rivera" 
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-serif text-theme1-primary">Marcus Rivera</h3>
            <p className="text-sm text-theme1-secondary">Executive Pastry Chef</p>
          </div>
          <div className="text-center w-64">
            <div className="w-full aspect-square relative rounded-full mb-4 overflow-hidden">
              <Image 
                src="/images/headchef.jpeg" 
                alt="Sapna Nigam" 
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-serif text-theme1-primary">Sapna Nigam</h3>
            <p className="text-sm text-theme1-secondary">Founder & Head Baker</p>
          </div>
          <div className="text-center w-64">
            <div className="w-full aspect-square relative rounded-full mb-4 overflow-hidden">
              <Image 
                src="/images/staff2.jpeg" 
                alt="Sophia Kim" 
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-serif text-theme1-primary">Sophia Kim</h3>
            <p className="text-sm text-theme1-secondary">Cake Designer</p>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</section>
      
      <ContactSection />
      <Footer/>
    </main>
  );
};

export default AboutPage;