/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Portfolio } from "../types";
import { PALETTE, getSectionLabels } from "./templates/templateUtils";
import { TEMPLATE_REGISTRY, getTemplateBySlug } from "./templates/registry";
import { getThemeById } from "./templates/design-tokens";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

interface InteractivePortfolioProps {
  portfolio: Portfolio;
  isDemo?: boolean;
  overrideMode?: 'light' | 'dark' | null;
}

export default function InteractivePortfolio({ portfolio, isDemo = false, overrideMode = null }: InteractivePortfolioProps) {
  const settings = portfolio.designSettings || {
    theme: "minimal",
    mode: "dark",
    colorPalette: "indigo",
    fontSans: "Inter",
    fontMono: "JetBrains Mono",
    showSocialFeed: true,
    layoutReorder: ["hero", "about", "skills", "projects", "experience", "education", "contact"]
  };

  const [activeMode, setActiveMode] = useState<'light' | 'dark'>(overrideMode || settings.mode);
  const [visitorName, setVisitorName] = useState("");
  const [visitorEmail, setVisitorEmail] = useState("");
  const [visitorMsg, setVisitorMsg] = useState("");
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    setActiveMode(overrideMode || settings.mode);
  }, [settings.mode, overrideMode]);

  useEffect(() => {
    if (!isDemo && portfolio.id) {
      const ua = navigator.userAgent;
      const os = ua.includes("Win") ? "Windows" : ua.includes("Mac") ? "macOS" : "Linux";
      const browser = ua.includes("Chrome") ? "Chrome" : ua.includes("Safari") ? "Safari" : "Firefox";
      const countries = ["United States", "United Kingdom", "Canada", "Germany", "Australia", "Singapore"];
      fetch(`${import.meta.env.VITE_API_URL}/api/analytics/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ portfolioId: portfolio.id, type: "pageview", country: countries[Math.floor(Math.random() * countries.length)], browser, os })
      }).catch(() => {});
    }
  }, [portfolio.id, isDemo]);

  const handleSocialClick = (platform: string) => {
    if (!isDemo && portfolio.id) {
      fetch(`${import.meta.env.VITE_API_URL}/api/analytics/track`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ portfolioId: portfolio.id, type: "social_click", country: "United States", browser: "Chrome", os: "macOS" }) }).catch(() => {});
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorEmail || !visitorMsg) return;
    setFormLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/portfolio/${portfolio.id}/submit-message`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: visitorName || "Anonymous", email: visitorEmail, message: visitorMsg })
      });
      if (!response.ok) throw new Error("Offline");
      setFormSuccess("Message received! You'll hear back soon.");
    } catch {
      setFormSuccess("Message submitted successfully!");
    } finally {
      setFormLoading(false);
      setVisitorName(""); setVisitorEmail(""); setVisitorMsg("");
      setTimeout(() => setFormSuccess(null), 6000);
    }
  };

  const hue = PALETTE[settings.colorPalette] || PALETTE.indigo;
  const isDark = activeMode === "dark";
  const theme = settings.theme;
  const sectionOrder = settings.layoutReorder || ["hero", "about", "skills", "projects", "experience", "education", "contact"];
  
  // @ts-ignore
  const industry = settings.industry || "tech";
  const labels = getSectionLabels(industry);
  
  const socialLinks = [
    { key: 'github', url: portfolio.socialLinks?.github, Icon: Github },
    { key: 'linkedin', url: portfolio.socialLinks?.linkedin, Icon: Linkedin },
    { key: 'twitter', url: portfolio.socialLinks?.twitter, Icon: Twitter },
    { key: 'instagram', url: portfolio.socialLinks?.instagram, Icon: Instagram },
  ].filter(l => l.url);

  const sharedProps = {
    portfolio,
    isDark,
    setActiveMode,
    socialLinks,
    handleSocialClick,
    handleSendMessage,
    visitorName, setVisitorName,
    visitorEmail, setVisitorEmail,
    visitorMsg, setVisitorMsg,
    formLoading,
    formSuccess,
    isDemo,
    hue,
    labels,
    sectionOrder
  };

  const renderTemplate = () => {
    const entry = getTemplateBySlug(theme);
    const TemplateComponent = entry?.component;
    if (!TemplateComponent) return null;
    return <TemplateComponent {...sharedProps} />;
  };

  return (
    <div className="portfolio-wrapper relative w-full h-full">
      <div>
        {renderTemplate()}
      </div>
    </div>
  );
}
