"use client"

import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { Dashboard } from "@/components/Dashboard";
import { PipelineBuilder } from "@/components/PipelineBuilder";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  GitBranch, 
  Home 
} from "lucide-react";

type View = 'hero' | 'dashboard' | 'pipeline';

const MainLayout = () => {
  const [currentView, setCurrentView] = useState<View>('hero');

  const renderContent = () => {
    switch (currentView) {
      case 'hero':
        return <HeroSection setCurrentView={setCurrentView} />;
      case 'dashboard':
        return (
          <div className="container py-8">
            <Dashboard />
          </div>
        );
      
      default:
        return <HeroSection setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-gradient-to-br from-[#10141a] via-[#181c27] to-[#23283a] text-white"
      style={{
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Quick Navigation */}
      <div className="border-b border-[#23283a] bg-[#181c27]/80 shadow-lg backdrop-blur-md sticky top-0 z-30">
        <div className="container flex items-center gap-2 py-3">
          <Button
            variant={currentView === 'hero' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setCurrentView('hero')}
            className={`gap-2 rounded-lg px-4 py-2 font-semibold transition-all duration-150
              ${currentView === 'hero'
                ? 'bg-gradient-to-r from-[#00f6ff] to-[#3b82f6] text-[#10141a] shadow-lg'
                : 'bg-[#23283a]/60 text-[#e0e7ef] hover:bg-[#23283a]/80 hover:text-[#00f6ff]'
              }`}
          >
            <Home className="h-4 w-4" />
            Home
          </Button>
          <Button
            variant={currentView === 'dashboard' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setCurrentView('dashboard')}
            className={`gap-2 rounded-lg px-4 py-2 font-semibold transition-all duration-150
              ${currentView === 'dashboard'
                ? 'bg-gradient-to-r from-[#00f6ff] to-[#3b82f6] text-[#10141a] shadow-lg'
                : 'bg-[#23283a]/60 text-[#e0e7ef] hover:bg-[#23283a]/80 hover:text-[#00f6ff]'
              }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Button>
          <Button
            variant={currentView === 'pipeline' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setCurrentView('pipeline')}
            className={`gap-2 rounded-lg px-4 py-2 font-semibold transition-all duration-150
              ${currentView === 'pipeline'
                ? 'bg-gradient-to-r from-[#00f6ff] to-[#3b82f6] text-[#10141a] shadow-lg'
                : 'bg-[#23283a]/60 text-[#e0e7ef] hover:bg-[#23283a]/80 hover:text-[#00f6ff]'
              }`}
          >
            <GitBranch className="h-4 w-4" />
            Pipeline Builder
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative min-h-[calc(100vh-4rem)] pt-12">
        {/* pt-12 ensures content starts after navbar (py-3 ≈ 48px) */}
        <div className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: "radial-gradient(ellipse at 60% 40%, #23283a 0%, #10141a 100%)",
            opacity: 0.7,
            zIndex: 0,
          }}
        />
        <div className="relative z-10">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;

