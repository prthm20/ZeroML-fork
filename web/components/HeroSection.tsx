import React from 'react';
import { ArrowRight, Play, Zap} from 'lucide-react';
import AnimatedBackground from "@/components/AnimatedBackground"
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />
      

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="inline-flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full px-6 py-3 mb-8">
          <Zap className="w-4 h-4 text-violet-400" />
          <span className="text-slate-300 text-sm">Next-Generation ML Platform</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Build ML Pipelines
          <br />
          <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
            Visually & Intuitively
          </span>
        </h1>
        
        <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Create, train, and deploy machine learning models with our drag-and-drop interface.
          From data preprocessing to model deployment - all in one platform.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">

			<Link
			href={"/builder"}>
          <button className="group bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-violet-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2">
            <span>Start Building</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
			</Link>

          
          <button className="group flex items-center space-x-2 text-slate-300 hover:text-white transition-colors">
            <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center group-hover:bg-slate-700 transition-colors">
              <Play className="w-5 h-5 ml-1" />
            </div>
            <span className="text-lg">Watch Demo</span>
          </button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;