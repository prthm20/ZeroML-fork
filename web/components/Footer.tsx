import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0b0f14] border-t border-border text-slate-200">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg overflow-hidden">
                <Image src="/logo.png" alt="ZeroML logo" width={36} height={36} className="object-contain" unoptimized />
              </div>
              <span className="text-xl font-bold text-orange-400">ZeroML</span>
            </div>
            <p className="text-slate-400 mb-6 max-w-md">
              Empowering data scientists and ML engineers to build, train, and deploy 
              machine learning models at scale with our visual pipeline platform.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/ParagGhatage/ZeroML" className="text-slate-400 hover:text-orange-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:help@zeroml.dev" className="text-slate-400 hover:text-orange-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Product</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Enterprise
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Integrations
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors">
                  API
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Partners
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-muted-foreground text-sm mb-4 md:mb-0">
              © {currentYear} ZeroML. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;