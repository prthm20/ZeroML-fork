import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="bg-gradient-to-r from-slate-900 via-violet-900/20 to-slate-900 border border-slate-700 rounded-3xl p-12 relative overflow-hidden">
          {/* Background animation */}
          <div className="absolute inset-0">
            <div className="absolute top-4 left-4 w-32 h-32 bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-4 right-4 w-24 h-24 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 bg-violet-500/20 backdrop-blur-sm border border-violet-500/30 rounded-full px-6 py-3 mb-8">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-violet-300 text-sm font-medium">Ready to Get Started?</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Start Building Your
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                ML Pipeline Today
              </span>
            </h2>
            
            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              Join thousands of data scientists who are already building the future with our platform.
              Start your free trial today.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="group bg-gradient-to-r from-violet-600 to-purple-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:from-violet-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 shadow-2xl shadow-violet-500/25">
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="text-slate-300 hover:text-white transition-colors text-lg font-medium">
                Schedule Demo
              </button>
            </div>
            
            <div className="mt-8 text-sm text-slate-400">
              No credit card required • 14-day free trial • Cancel anytime
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;