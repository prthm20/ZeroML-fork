import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

const Platform = () => {
  return (
    <section id="platform" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              See Your ML Pipeline
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent"> Come to Life</span>
            </h2>
            
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Watch your data flow through preprocessing, model training, and deployment in real-time. 
              Our visual interface makes complex ML workflows intuitive and accessible.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                <div>
                  <h4 className="font-semibold text-white">Data Ingestion</h4>
                  <p className="text-slate-400">Connect and import data from multiple sources</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                <div>
                  <h4 className="font-semibold text-white">Model Training</h4>
                  <p className="text-slate-400">Automated training with hyperparameter optimization</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                <div>
                  <h4 className="font-semibold text-white">Deployment</h4>
                  <p className="text-slate-400">One-click deployment to production environments</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-violet-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2">
                <span>Try Demo</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors">
                <Play className="w-5 h-5" />
                <span>Watch Tutorial</span>
              </button>
            </div>
          </div>
          
          <div className="relative">
            {/* Platform Demo Visualization */}
            <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 relative overflow-hidden">
              {/* Animated Pipeline */}
              <svg className="w-full h-80" viewBox="0 0 400 320">
                {/* Background grid */}
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(148, 163, 184, 0.1)" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Data nodes */}
                <g>
                  {/* Input Data */}
                  <rect x="20" y="50" width="60" height="40" rx="8" fill="rgba(16, 185, 129, 0.8)" className="animate-pulse" />
                  <text x="50" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Data</text>
                  
                  {/* Preprocessing */}
                  <rect x="120" y="50" width="80" height="40" rx="8" fill="rgba(139, 92, 246, 0.8)" />
                  <text x="160" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Preprocess</text>
                  
                  {/* Model Training */}
                  <rect x="240" y="30" width="70" height="35" rx="8" fill="rgba(59, 130, 246, 0.8)" />
                  <text x="275" y="52" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">Training</text>
                  
                  <rect x="240" y="75" width="70" height="35" rx="8" fill="rgba(59, 130, 246, 0.8)" />
                  <text x="275" y="97" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">Validation</text>
                  
                  {/* Deployment */}
                  <rect x="340" y="50" width="60" height="40" rx="8" fill="rgba(244, 63, 94, 0.8)" />
                  <text x="370" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Deploy</text>
                  
                  {/* Monitoring */}
                  <rect x="170" y="150" width="80" height="40" rx="8" fill="rgba(245, 158, 11, 0.8)" />
                  <text x="210" y="175" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Monitor</text>
                </g>
                
                {/* Animated connections */}
                <g>
                  <path d="M80,70 L120,70" stroke="rgba(16, 185, 129, 0.8)" strokeWidth="3" fill="none" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" values="0;-10" dur="1s" repeatCount="indefinite" />
                  </path>
                  
                  <path d="M200,70 L240,50" stroke="rgba(139, 92, 246, 0.8)" strokeWidth="3" fill="none" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" values="0;-10" dur="1.2s" repeatCount="indefinite" />
                  </path>
                  
                  <path d="M200,70 L240,90" stroke="rgba(139, 92, 246, 0.8)" strokeWidth="3" fill="none" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" values="0;-10" dur="1.4s" repeatCount="indefinite" />
                  </path>
                  
                  <path d="M310,47 L340,70" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="3" fill="none" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" values="0;-10" dur="1.6s" repeatCount="indefinite" />
                  </path>
                  
                  <path d="M310,92 L340,70" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="3" fill="none" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" values="0;-10" dur="1.8s" repeatCount="indefinite" />
                  </path>
                  
                  <path d="M370,90 Q320,120 210,150" stroke="rgba(244, 63, 94, 0.6)" strokeWidth="2" fill="none" strokeDasharray="3,3">
                    <animate attributeName="stroke-dashoffset" values="0;-6" dur="2s" repeatCount="indefinite" />
                  </path>
                </g>
                
                {/* Status indicators */}
                <circle cx="385" cy="35" r="4" fill="rgba(16, 185, 129, 1)" className="animate-pulse" />
                <circle cx="385" cy="45" r="4" fill="rgba(245, 158, 11, 1)" className="animate-pulse" />
                <circle cx="385" cy="55" r="4" fill="rgba(239, 68, 68, 1)" className="animate-pulse" />
              </svg>
              
              {/* Floating particles */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-violet-400 rounded-full animate-ping"></div>
              <div className="absolute bottom-8 left-8 w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 right-8 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Platform;