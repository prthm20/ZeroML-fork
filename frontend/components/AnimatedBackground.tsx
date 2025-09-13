import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
      
      {/* Animated SVG shapes */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Floating circles */}
        <circle cx="10" cy="20" r="2" fill="rgba(139, 92, 246, 0.3)" className="animate-pulse">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 10,5; 0,0"
            dur="6s"
            repeatCount="indefinite"
          />
        </circle>
        
        <circle cx="80" cy="30" r="1.5" fill="rgba(168, 85, 247, 0.4)" className="animate-pulse">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; -5,10; 0,0"
            dur="8s"
            repeatCount="indefinite"
          />
        </circle>
        
        <circle cx="30" cy="70" r="1" fill="rgba(147, 51, 234, 0.5)">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 8,-3; 0,0"
            dur="10s"
            repeatCount="indefinite"
          />
        </circle>
        
        <circle cx="70" cy="80" r="2.5" fill="rgba(126, 34, 206, 0.2)">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; -12,8; 0,0"
            dur="12s"
            repeatCount="indefinite"
          />
        </circle>
        
        {/* Animated ML Pipeline Visualization */}
        <g transform="translate(20, 10)">
          {/* Data Flow Lines */}
          <path
            d="M5,40 Q30,35 50,40"
            stroke="rgba(139, 92, 246, 0.6)"
            strokeWidth="0.5"
            fill="none"
            strokeDasharray="2,2"
            className="animate-pulse"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0;-4"
              dur="2s"
              repeatCount="indefinite"
            />
          </path>
          
          <path
            d="M50,40 Q70,45 85,40"
            stroke="rgba(168, 85, 247, 0.6)"
            strokeWidth="0.5"
            fill="none"
            strokeDasharray="2,2"
            className="animate-pulse"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0;-4"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </path>
          
          {/* Pipeline Nodes */}
          <rect x="2" y="38" width="6" height="4" rx="1" fill="rgba(16, 185, 129, 0.7)" />
          <rect x="47" y="38" width="6" height="4" rx="1" fill="rgba(139, 92, 246, 0.7)" />
          <rect x="82" y="38" width="6" height="4" rx="1" fill="rgba(244, 63, 94, 0.7)" />
        </g>
      </svg>
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(139, 92, 246, 0.2) 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
};

export default AnimatedBackground;