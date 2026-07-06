/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { Eye, ArrowLeft, RefreshCw, Maximize2, Monitor, Tablet, Smartphone, ArrowUpRight, Loader2 } from "lucide-react";
import InteractivePortfolio from "./InteractivePortfolio";
import { Portfolio } from "../types";

interface LivePreviewProps {
  portfolioId: string;
  onClose?: () => void;
}

export default function LivePreview({ portfolioId, onClose }: LivePreviewProps) {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [refreshing, setRefreshing] = useState(false);

  const fetchPortfolio = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/portfolio/preview/${portfolioId}`);
      if (!response.ok) throw new Error("Portfolio not found");
      const data = await response.json();
      setPortfolio(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to load preview");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [portfolioId]);

  useEffect(() => {
    fetchPortfolio();
    const interval = setInterval(fetchPortfolio, 5000);
    return () => clearInterval(interval);
  }, [fetchPortfolio]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPortfolio();
  };

  const handleDeploy = () => {
    if (portfolio?.slug) {
      window.open(`/p/${portfolio.slug}`, "_blank");
    }
  };

  const handleFullscreen = () => {
    window.open(window.location.href, "_blank");
  };

  const deviceClasses = {
    desktop: "w-full h-full",
    tablet: "w-[768px] h-[90vh] mx-auto rounded-2xl border-[6px] border-border-subtle shadow-2xl",
    mobile: "w-[375px] h-[90vh] mx-auto rounded-2xl border-[8px] border-border-subtle shadow-2xl",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-text-muted">Loading preview...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <div className="text-center">
          <p className="text-error-main mb-4">Error: {error || "Portfolio not found"}</p>
          {onClose && (
            <button onClick={onClose} className="btn-primary">Back to Editor</button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Floating Toolbar */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white rounded-full border border-border-subtle shadow-lg px-2 py-2 flex items-center gap-1">
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          title="Back to Editor"
        >
          <ArrowLeft className="w-4 h-4 text-text-main" />
        </button>

        <div className="w-px h-6 bg-border-subtle mx-1" />

        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
          title="Refresh Preview"
        >
          <RefreshCw className={`w-4 h-4 text-text-main ${refreshing ? 'animate-spin' : ''}`} />
        </button>

        <button
          onClick={handleFullscreen}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          title="Open Fullscreen"
        >
          <Maximize2 className="w-4 h-4 text-text-main" />
        </button>

        <button
          onClick={handleDeploy}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          title="Deploy Portfolio"
        >
          <ArrowUpRight className="w-4 h-4 text-text-main" />
        </button>

        <div className="w-px h-6 bg-border-subtle mx-1" />

        <div className="flex items-center gap-1 bg-gray-50 rounded-full p-1">
          <button
            onClick={() => setDevice("desktop")}
            className={`p-2 rounded-full transition-colors ${device === "desktop" ? "bg-white text-primary shadow-sm" : "text-text-muted hover:text-text-main"}`}
            title="Desktop View"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDevice("tablet")}
            className={`p-2 rounded-full transition-colors ${device === "tablet" ? "bg-white text-primary shadow-sm" : "text-text-muted hover:text-text-main"}`}
            title="Tablet View"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDevice("mobile")}
            className={`p-2 rounded-full transition-colors ${device === "mobile" ? "bg-white text-primary shadow-sm" : "text-text-muted hover:text-text-main"}`}
            title="Mobile View"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        <div className="w-px h-6 bg-border-subtle mx-1" />

        <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted px-2">
          Live Preview
        </span>
      </div>

      {/* Preview Canvas */}
      <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-10">
        <div className={`bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-500 ${deviceClasses[device]}`}>
          <InteractivePortfolio portfolio={portfolio} isDemo={false} />
        </div>
      </div>
    </div>
  );
}
