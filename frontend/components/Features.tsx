import React from 'react';
import { Workflow, Zap, Shield, BarChart3, Cpu, Database } from 'lucide-react';

const features = [
  {
    icon: Workflow,
    title: 'Drag & Drop Interface',
    description: 'Build complex ML pipelines visually with our intuitive drag-and-drop builder. No coding required.',
    gradient: 'from-violet-500 to-purple-600'
  },
  {
    icon: Zap,
    title: 'Instant Deployment',
    description: 'Deploy your models to production with one click. Scale automatically based on demand.',
    gradient: 'from-blue-500 to-cyan-600'
  },
  {
    icon: Database,
    title: 'Data Preprocessing',
    description: 'Advanced data cleaning, transformation, and feature engineering tools built-in.',
    gradient: 'from-emerald-500 to-teal-600'
  },
  {
    icon: BarChart3,
    title: 'Model Monitoring',
    description: 'Real-time monitoring and analytics to track your model performance and drift.',
    gradient: 'from-orange-500 to-red-600'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC2 compliant with advanced security features and privacy controls.',
    gradient: 'from-indigo-500 to-purple-600'
  },
  {
    icon: Cpu,
    title: 'Auto-ML Capabilities',
    description: 'Automated hyperparameter tuning and model selection for optimal performance.',
    gradient: 'from-pink-500 to-rose-600'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Powerful Features for
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent"> Modern ML</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Everything you need to build, train, and deploy machine learning models at scale
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-violet-500/50 transition-all duration-300 hover:transform hover:-translate-y-2"
            >
              <div className={`w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-violet-400 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
              
              {/* Hover animation line */}
              <div className="w-0 h-0.5 bg-gradient-to-r from-violet-500 to-purple-500 mt-6 group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;