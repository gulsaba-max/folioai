import React from "react";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
  currentUser: any | null;
  onGetStarted: () => void;
  onLogout: () => void;
  onOpenPanel?: (panel: any) => void;
}

export function Layout({ children, currentUser, onGetStarted, onLogout, onOpenPanel }: LayoutProps) {
  return (
    <div className="min-h-screen bg-bg-base text-text-main flex flex-col font-sans overflow-hidden selection:bg-primary/30 selection:text-primary">
      <Navbar currentUser={currentUser} onGetStarted={onGetStarted} onLogout={onLogout} onOpenPanel={onOpenPanel} />
      <main className="flex-grow pt-[72px]">
        {children}
      </main>
    </div>
  );
}
