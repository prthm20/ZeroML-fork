"use client"

import { useState } from "react";
import { Navigation } from "./Navigation";
import { HeroSection } from "./HeroSection";
import { Dashboard } from "./Dashboard";
import { PipelineBuilder } from "./PipelineBuilder";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  GitBranch, 
  Home 
} from "lucide-react";

type View = 'hero' | 'dashboard' | 'pipeline';

export const MainLayout = () => {
  const [currentView, setCurrentView] = useState<View>('hero');

  const renderContent = () => {
    switch (currentView) {
      case 'hero':
        return <HeroSection />;
      case 'dashboard':
        return (
          <div className="container py-8">
            <Dashboard />
          </div>
        );
      case 'pipeline':
        return (
          <div className="h-[calc(100vh-4rem)]">
            <PipelineBuilder />
          </div>
        );
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Quick Navigation */}
      <div className="border-b border-border bg-card/30">
        <div className="container flex items-center gap-2 py-3">
          <Button
            variant={currentView === 'hero' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setCurrentView('hero')}
            className="gap-2"
          >
            <Home className="h-4 w-4" />
            Home
          </Button>
          <Button
            variant={currentView === 'dashboard' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setCurrentView('dashboard')}
            className="gap-2"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Button>
          <Button
            variant={currentView === 'pipeline' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setCurrentView('pipeline')}
            className="gap-2"
          >
            <GitBranch className="h-4 w-4" />
            Pipeline Builder
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative">
        {renderContent()}
      </main>
    </div>
  );
};