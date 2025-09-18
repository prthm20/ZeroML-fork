import React from 'react';
import HeroSection from '@/components/HeroSection';
import Features from '@/components/Features';
import Platform from '@/components/Platform';
import Stats from '@/components/Stats';
import CTA from '@/components/CTA';

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <HeroSection />
      <Features />
      <Platform />
      <Stats />
      <CTA />
    </div>
  );
}

export default App;