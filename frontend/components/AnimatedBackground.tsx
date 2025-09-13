import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950"></div>
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0">
        {/* Large floating circles */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-violet-600/10 to-purple-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl animate-float-delayed"></div>
        
        {/* Small floating particles */}
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-violet-400 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse-slow animation-delay-1000"></div>
        <div className="absolute top-2/3 left-1/5 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse-slow animation-delay-2000"></div>
      </div>
      
      {/* Animated ML Pipeline Visualization */}
      <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Pipeline nodes */}
        <circle cx="15" cy="30" r="1" fill="rgba(16, 185, 129, 0.6)" className="animate-pulse-slow" />
        <circle cx="35" cy="25" r="0.8" fill="rgba(139, 92, 246, 0.6)" className="animate-pulse-slow animation-delay-500" />
        <circle cx="55" cy="35" r="1.2" fill="rgba(59, 130, 246, 0.6)" className="animate-pulse-slow animation-delay-1000" />
        <circle cx="75" cy="30" r="0.9" fill="rgba(244, 63, 94, 0.6)" className="animate-pulse-slow animation-delay-1500" />
        
        {/* Connecting lines with flow animation */}
        <path
          d="M16,30 Q25,28 34,25"
          stroke="rgba(139, 92, 246, 0.4)"
          strokeWidth="0.3"
          fill="none"
          strokeDasharray="1,1"
          className="animate-flow"
        />
        <path
          d="M36,25 Q45,30 54,35"
          stroke="rgba(139, 92, 246, 0.4)"
          strokeWidth="0.3"
          fill="none"
          strokeDasharray="1,1"
          className="animate-flow animation-delay-500"
        />
        <path
          d="M56,35 Q65,32 74,30"
          stroke="rgba(139, 92, 246, 0.4)"
          strokeWidth="0.3"
          fill="none"
          strokeDasharray="1,1"
          className="animate-flow animation-delay-1000"
        />
      </svg>
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(139, 92, 246, 0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
};

export default AnimatedBackground;