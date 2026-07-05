import React, { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Github, LogOut, Settings, User } from "lucide-react";

interface NavbarProps {
  currentUser: any | null;
  onGetStarted: () => void;
  onLogout: () => void;
  onOpenPanel?: (panel: any) => void;
}

export function Navbar({ currentUser, onGetStarted, onLogout, onOpenPanel }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", updateScroll);
    updateScroll();
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || currentUser ? "bg-white border-b border-border-subtle shadow-sm py-3" : "bg-white py-5"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Logo />
        
        {/* Unauthenticated Navigation */}
        {!currentUser && (
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-text-muted hover:text-text-main transition-colors">Features</a>
            <a href="#workflow" className="text-sm font-medium text-text-muted hover:text-text-main transition-colors">How It Works</a>

            <button onClick={() => onOpenPanel?.('about')} className="text-sm font-medium text-text-muted hover:text-text-main transition-colors">About</button>
          </div>
        )}

        <div className="flex items-center gap-4">
          {!currentUser ? (
            <>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-text-muted hover:text-text-main transition-colors p-2">
                <Github className="w-5 h-5" />
              </a>
              <button onClick={onGetStarted} className="btn-primary">
                Get Started
              </button>
            </>
          ) : (
            <>
              <button onClick={() => onOpenPanel?.('settings')} className="p-2 text-text-muted hover:text-text-main transition-colors rounded-full hover:bg-gray-100">
                <Settings className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 pl-4 border-l border-border-subtle">
                <button onClick={() => onOpenPanel?.('profile')} className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 hover:bg-primary/20 transition-colors">
                  <User className="w-4 h-4 text-primary" />
                </button>
                <button onClick={onLogout} className="p-2 text-text-muted hover:text-error-main transition-colors ml-2" title="Logout">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
