/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import InteractivePortfolio from "./InteractivePortfolio";
import { Portfolio } from "../types";

interface PreviewPageProps {
  portfolioId: string;
}

export default function PreviewPage({ portfolioId }: PreviewPageProps) {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/portfolio/preview/${portfolioId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Portfolio not found");
        return res.json();
      })
      .then((data) => {
        setPortfolio(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load preview");
        setLoading(false);
      });
  }, [portfolioId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-base text-text-muted font-sans text-sm flex items-center justify-center">
        Loading preview...
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen bg-bg-base text-error-main font-sans text-sm flex items-center justify-center">
        Error: {error || "Portfolio not found"}
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <InteractivePortfolio portfolio={portfolio} isDemo={false} />
    </div>
  );
}
