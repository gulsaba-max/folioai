/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import AuthPage from "./components/AuthPage";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import InteractivePortfolio from "./components/InteractivePortfolio";
import PreviewPage from "./components/PreviewPage";
import { Layout } from "./components/Layout";
import { Sidebar } from "./components/Sidebar";
import { AppPanel, PanelType } from "./components/AppPanel";
import { Portfolio } from "./types";
import { Monitor, Tablet, Smartphone } from "lucide-react";

const DEMO_USER = {
  id: "demo",
  email: "demo@folioai.local",
  subscriptionTier: "free" as const,
  mfaEnabled: false,
};

export default function App() {
  const [livePortfolio, setLivePortfolio] = useState<Portfolio | null>(null);
  const [liveLoading, setLiveLoading] = useState(true);
  const [liveError, setLiveError] = useState("");

  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [activePortfolio, setActivePortfolio] = useState<Portfolio | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activePanel, setActivePanel] = useState<PanelType>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem("folioai_theme") as "light" | "dark") || "light";
    setTheme(saved);
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const updateTheme = (next: "light" | "dark") => {
    console.log("[theme] updateTheme", next, "hasDark=", document.documentElement.classList.contains("dark"));
    setTheme(next);
    localStorage.setItem("folioai_theme", next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    console.log("[theme] afterToggle hasDark=", document.documentElement.classList.contains("dark"));
  };

  const handleFinishGeneration = () => {
    console.log("[app] handleFinishGeneration", { activeTab, isOnboarding, activePortfolio: !!activePortfolio });
  };

  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith("/p/")) {
      const slug = path.split("/p/")[1];
      if (!slug) return;
      setLiveLoading(true);
      fetch(`${import.meta.env.VITE_API_URL}/api/portfolio/get/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) setLiveError(data.error);
          else setLivePortfolio(data);
        })
        .catch((err) => setLiveError(err.message))
        .finally(() => setLiveLoading(false));
    }
  }, []);

  // Controls preview device frames dynamically
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  // Tablet/Phone responsive layout tabs for managing builder view on smaller screens
  const [editorMobileView, setEditorMobileView] = useState<"dashboard" | "published">("dashboard");

  // Resizable panel states
  const [leftWidth, setLeftWidth] = useState(45);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newWidth = (e.clientX / window.innerWidth) * 100;
      if (newWidth > 25 && newWidth < 75) {
        setLeftWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    } else {
      document.body.style.cursor = "default";
      document.body.style.userSelect = "auto";
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  // Restore session from localStorage on app load
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("folioai_user");
      const storedPortfolio = localStorage.getItem("folioai_portfolio");

      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user?.id === "demo") {
          setIsDemoMode(true);
          setCurrentUser(null);
          setActivePortfolio(null);
          setIsOnboarding(false);
        } else {
          setCurrentUser(user);

          if (storedPortfolio) {
            try {
              setActivePortfolio(JSON.parse(storedPortfolio));
              setIsOnboarding(false);
            } catch {
              setActivePortfolio(null);
              setIsOnboarding(true);
            }
          } else {
            setIsOnboarding(true);
          }
        }
      }
    } catch (err) {
      console.error("Failed to restore session:", err);
      localStorage.removeItem("folioai_user");
      localStorage.removeItem("folioai_portfolio");
    }
  }, []);

  // Persist portfolio changes to localStorage (skip in demo mode)
  useEffect(() => {
    if (activePortfolio && !isDemoMode) {
      localStorage.setItem("folioai_portfolio", JSON.stringify(activePortfolio));
    }
  }, [activePortfolio, isDemoMode]);

  // Load standard seed portfolio into active workshop context on successful login
  const handleAuthSuccess = (user: any) => {
    setCurrentUser(user);
    localStorage.setItem("folioai_user", JSON.stringify(user));
    // Always start at the onboarding/upload page after login
    setActivePortfolio(null);
    setIsOnboarding(true);
  };

  const handleTryDemo = () => {
    setIsDemoMode(true);
    setCurrentUser(DEMO_USER);
    setActivePortfolio(null);
    setIsOnboarding(true);
    setShowAuth(false);
    localStorage.setItem("folioai_user", JSON.stringify(DEMO_USER));
    localStorage.removeItem("folioai_portfolio");
  };

  const handleLogout = () => {
    setIsDemoMode(false);
    setCurrentUser(null);
    setActivePortfolio(null);
    setIsOnboarding(false);
    localStorage.removeItem("folioai_user");
    localStorage.removeItem("folioai_portfolio");
  };

  // Render the Live Site view if we are on a portfolio path
  // This must be placed after all hooks!
  if (window.location.pathname.startsWith("/p/")) {
    const slug = window.location.pathname.split("/p/")[1];
    if (!slug) return <div className="min-h-screen bg-bg-base text-text-muted font-sans text-sm flex items-center justify-center">Invalid portfolio URL</div>;
    if (liveLoading) return <div className="min-h-screen bg-bg-base text-text-muted font-sans text-sm flex items-center justify-center">Loading live site...</div>;
    if (liveError || !livePortfolio) return <div className="min-h-screen bg-bg-base text-error-main font-sans text-sm flex items-center justify-center">Error: {liveError || "Portfolio not found"}</div>;
    return <InteractivePortfolio portfolio={livePortfolio} isDemo={false} />;
  }

  const previewMatch = window.location.pathname.match(/^\/preview\/(.+)/);
  if (previewMatch) {
    const portfolioId = previewMatch[1];
    if (!portfolioId) return <div className="min-h-screen bg-bg-base text-text-muted font-sans text-sm flex items-center justify-center">Invalid preview URL</div>;
    return <PreviewPage portfolioId={portfolioId} />;
  }

  if (!currentUser) {
    return (
      <Layout currentUser={null} onGetStarted={() => setShowAuth(true)} onLogout={handleLogout} onOpenPanel={setActivePanel}>
        <AppPanel open={activePanel} onClose={() => setActivePanel(null)} currentUser={null} theme={theme} onThemeChange={updateTheme} />
        {!showAuth ? (
          <LandingPage onGetStarted={() => setShowAuth(true)} onOpenPanel={setActivePanel} onTryDemo={handleTryDemo} />
        ) : (
          <AuthPage onSuccess={handleAuthSuccess} />
        )}
      </Layout>
    );
  }

  return (
    <Layout currentUser={currentUser} onGetStarted={() => setShowAuth(true)} onLogout={handleLogout} onOpenPanel={setActivePanel}>
      <AppPanel open={activePanel} onClose={() => setActivePanel(null)} currentUser={currentUser} theme={theme} onThemeChange={updateTheme} />
      {isDemoMode && (
        <div className="fixed top-[72px] left-0 right-0 z-40 bg-amber-50 border-b border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider text-center py-2">
          Demo Mode – Changes are not saved.
        </div>
      )}
      <div className={`flex h-[calc(100vh-72px)] w-full overflow-hidden relative bg-bg-base ${isDemoMode ? 'mt-8' : ''}`}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} onOpenPanel={setActivePanel} />
        <div className="flex-1 overflow-y-auto relative flex flex-col">

          {/* Main workspace */}
          <div className="flex-grow flex h-[calc(100vh-72px)] relative">
         
            {/* If onboarding is active or no portfolio yet, show Full Width Onboarding Dashboard */}
            {isOnboarding || !activePortfolio ? (
              <div className="w-full h-full overflow-y-auto bg-bg-base">
                <Dashboard 
                  user={currentUser} 
                  activePortfolio={activePortfolio} 
                  onUpdatePortfolio={(p) => setActivePortfolio(p)}
                  onPortfolioReady={() => setIsOnboarding(false)}
                  onLogout={handleLogout}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  isDemo={isDemoMode}
                />
              </div>
            ) : (
              /* Double-pane synchronized split workspace */
              <>
                {/* Left Pane: Dashboard Forms */}
                <div 
                  style={{ width: editorMobileView === "dashboard" ? "100%" : `${leftWidth}%` }}
                  className={`h-full border-r border-border-subtle bg-bg-base overflow-y-auto ${isDragging ? '' : 'transition-all duration-300'}
                    ${editorMobileView === 'dashboard' ? 'w-full block' : 'hidden lg:block'}`}
                >
                  {/* Mobile View Toggle (visible only on small screens) */}
                  <div className="lg:hidden flex bg-white rounded-xl border border-border-subtle p-1 m-4 shadow-sm">
                    <button onClick={() => setEditorMobileView('dashboard')} className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${editorMobileView === 'dashboard' ? 'bg-primary text-white shadow' : 'text-text-muted hover:text-text-main'}`}>Editor</button>
                    <button onClick={() => setEditorMobileView('published')} className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${editorMobileView === 'published' ? 'bg-primary text-white shadow' : 'text-text-muted hover:text-text-main'}`}>Preview</button>
                  </div>
                  <Dashboard 
                    user={currentUser} 
                    activePortfolio={activePortfolio} 
                    onUpdatePortfolio={(p) => setActivePortfolio(p)}
                    onPortfolioReady={() => setIsOnboarding(false)}
                    onLogout={handleLogout}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    isDemo={isDemoMode}
                  />
                </div>

                {/* Draggable Divider */}
                <div 
                  onMouseDown={() => setIsDragging(true)}
                  className="hidden lg:flex flex-col items-center justify-center w-4 bg-gray-50 border-x border-border-subtle cursor-col-resize hover:bg-gray-100 transition-colors z-10 group"
                >
                  <div className="h-8 w-1 bg-border-accent rounded-full group-hover:bg-primary transition-colors"></div>
                </div>

                {/* Right Pane: Live Portfolio Preview */}
                <div 
                  style={{ width: editorMobileView === 'published' ? '100%' : `${100 - leftWidth}%` }}
                  className={`h-[calc(100vh-72px)] bg-gray-50 flex flex-col justify-start items-center p-4 sm:p-6 lg:p-10 relative overflow-hidden ${isDragging ? '' : 'transition-all duration-300'}
                    ${editorMobileView === 'published' ? 'w-full flex' : 'hidden lg:flex'}`}
                >
                  {/* Mobile View Toggle (visible only on small screens) */}
                  <div className="lg:hidden flex bg-white rounded-xl border border-border-subtle p-1 mb-4 shadow-sm w-full max-w-xs">
                    <button onClick={() => setEditorMobileView('dashboard')} className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${editorMobileView === 'dashboard' ? 'bg-primary text-white shadow' : 'text-text-muted hover:text-text-main'}`}>Editor</button>
                    <button onClick={() => setEditorMobileView('published')} className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${editorMobileView === 'published' ? 'bg-primary text-white shadow' : 'text-text-muted hover:text-text-main'}`}>Preview</button>
                  </div>

                  {/* Device Toggle Bar */}
                  <div className="hidden lg:flex items-center gap-2 bg-white rounded-full border border-border-subtle p-1 mb-6 shadow-sm z-10">
                    <button onClick={() => setPreviewDevice('desktop')} className={`p-2 rounded-full transition-colors ${previewDevice === 'desktop' ? 'bg-gray-100 text-primary' : 'text-text-muted hover:text-text-main hover:bg-gray-50'}`} title="Desktop View"><Monitor className="w-4 h-4" /></button>
                    <button onClick={() => setPreviewDevice('tablet')} className={`p-2 rounded-full transition-colors ${previewDevice === 'tablet' ? 'bg-gray-100 text-primary' : 'text-text-muted hover:text-text-main hover:bg-gray-50'}`} title="Tablet View"><Tablet className="w-4 h-4" /></button>
                    <button onClick={() => setPreviewDevice('mobile')} className={`p-2 rounded-full transition-colors ${previewDevice === 'mobile' ? 'bg-gray-100 text-primary' : 'text-text-muted hover:text-text-main hover:bg-gray-50'}`} title="Mobile View"><Smartphone className="w-4 h-4" /></button>
                  </div>

                  {/* Device Wrapper */}
                  <div 
                    className={`w-full h-full bg-white rounded-2xl border border-border-subtle shadow-md transition-all duration-500 overflow-y-auto
                      ${previewDevice === 'desktop' ? 'max-w-none' : ''}
                      ${previewDevice === 'tablet' ? 'max-w-xl h-[85vh] rounded-3xl border-[10px] border-border-subtle' : ''}
                      ${previewDevice === 'mobile' ? 'max-w-xs h-[750px] rounded-3xl border-[12px] border-border-subtle' : ''}`}
                  >
                    <InteractivePortfolio portfolio={activePortfolio} isDemo={true} />
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </Layout>
  );
}
