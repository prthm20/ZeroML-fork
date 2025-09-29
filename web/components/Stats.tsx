"use client"
import React, { useEffect, useState } from 'react';

type Stat = {
  label: string;
  value: number;
  suffix: string;
};

const stats = [
  { label: 'Models Deployed', value: 50000, suffix: '+' },
  { label: 'Data Scientists', value: 10000, suffix: '+' },
  { label: 'Enterprises', value: 500, suffix: '+' },
  { label: 'Uptime', value: 99.9, suffix: '%' }
];

const Stats = () => {
  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('stats-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, index) => {
        const duration = 2000;
        const steps = 60;
        const stepValue = stat.value / steps;
        let currentStep = 0;

        const timer = setInterval(() => {
          currentStep++;
          const currentValue = Math.min(stepValue * currentStep, stat.value);
          
          setAnimatedValues(prev => {
            const newValues = [...prev];
            newValues[index] = currentValue;
            return newValues;
          });

          if (currentStep >= steps) {
            clearInterval(timer);
          }
        }, duration / steps);
      });
    }
  }, [isVisible]);

  const formatValue = (value: number, stat: Stat) => {
    if (stat.suffix === '%') {
      return value.toFixed(1);
    }
    return Math.floor(value).toLocaleString();
  };

  return (
    <section id="stats-section" className="py-24 bg-slate-800/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Join thousands of data scientists and enterprises building the future with our platform
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-violet-500/50 transition-all duration-300 hover:transform hover:-translate-y-2">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-4">
                  <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                    {formatValue(animatedValues[index], stat)}
                  </span>
                  <span className="text-orange-400">{stat.suffix}</span>
                </div>
                <div className="text-slate-300 font-medium">{stat.label}</div>
                
                {/* Animated progress bar */}
                <div className="w-full bg-slate-700 rounded-full h-1 mt-4 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full transition-all duration-2000 ease-out"
                    style={{ 
                      width: isVisible ? '100%' : '0%',
                      transitionDelay: `${index * 200}ms`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;