import React from 'react';
import HeroSection from '@/components/HeroSection';
import Features from '@/components/Features';
import Platform from '@/components/Platform';
import Stats from '@/components/Stats';
import CTA from '@/components/CTA';

function App() {
  return (
  <div className="min-h-screen bg-[#0b0f14] text-slate-200">
      <HeroSection />
      <Features />
      <Platform />
      <Stats />
      <CTA />
    </div>
  );
}

export default App;