"use client"
import { Button } from "@/components/ui/button";
import { Brain, Menu, X, Star, Github } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

const GITHUB_REPO = "ParagGhatage/ZeroML";
const GITHUB_URL = "https://github.com/ParagGhatage/ZeroML";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [stars, setStars] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  // Fetch GitHub stars
  useEffect(() => {
    fetch(`https://api.github.com/repos/${GITHUB_REPO}`)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      });
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={"/"}>
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-neural-gradient rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">ZeroML</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#docs" className="text-muted-foreground hover:text-foreground transition-colors">
              Documentation
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
          </div>

          {/* GitHub Stars */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center group"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <span
                className="flex items-center gap-1 px-3 py-2 border border-yellow-400 rounded-lg bg-transparent hover:bg-yellow-400/10 transition cursor-pointer"
                style={{ minWidth: 0 }}
              >
                <Github className="w-5 h-5 text-white mr-1" />
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="font-semibold text-yellow-400">{stars !== null ? stars : "--"}</span>
              </span>
              {/* Tooltip */}
              {showTooltip && (
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 rounded bg-[#23283a] text-white text-xs shadow-lg animate-fade-in z-50 whitespace-nowrap">
                  ⭐ Give it a star!
                </span>
              )}
            </a>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Sign In
            </Button>
            <Button className="btn-hero">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-4 pt-4">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
              <a href="#docs" className="text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </a>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-yellow-400 hover:underline"
                >
                  <Star className="w-5 h-5" />
                  <span>{stars !== null ? stars : "--"}</span>
                  <span className="text-xs">Give it a star!</span>
                </a>
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  Sign In
                </Button>
                <Button className="btn-hero">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Tooltip animation */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.2s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </nav>
  );
};

export default Navigation;