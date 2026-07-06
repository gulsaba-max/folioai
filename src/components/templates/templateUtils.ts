import type { PortfolioImage } from "../../lib/image-schema";
import React from 'react';
import { motion, useReducedMotion } from "motion/react";

export interface Project {
  id: string; title: string; description: string;
  techStack: string[]; link?: string; image?: string; thumbnail?: PortfolioImage; gallery?: PortfolioImage[]; role?: string;
}
export interface Experience {
  id: string; role: string; company: string;
  startDate: string; endDate: string; description: string;
}
export interface Education { id: string; school: string; degree: string; year: string; }
export interface DesignSettings {
  theme: 'minimal' | 'glass' | 'developer' | 'futuristic' | 'creative' | 'corporate' | 'startup' | 'cyberpunk' | 'agency' | 'luxury' | 'editorial' | 'engineer' | 'bento' | 'brutalist' | 'aurora' | 'atelier' | 'mono-lux' | 'vibrant' | 'architectural' | 'vintage-modern';
  mode: 'light' | 'dark'; colorPalette: string; fontSans: string; fontMono: string;
  showSocialFeed: boolean; layoutReorder: string[]; industry?: string;
}
export interface Portfolio {
  id: string; slug: string; name: string; title: string; bio: string;
  contactEmail: string; contactPhone?: string; location?: string; avatarUrl?: string; picture?: PortfolioImage;
  skills: string[]; projects: Project[]; experience: Experience[]; education: Education[];
  designSettings: DesignSettings;
  socialLinks: { github?: string; linkedin?: string; twitter?: string; instagram?: string; website?: string };
  customDomain?: string;
  seo: { metaTitle: string; metaDescription: string; keywords: string[] };
  socialFeedSelected: 'github' | 'twitter' | 'linkedin' | 'instagram' | 'none';
}
export interface PaletteEntry {
  primary: string; primaryBg: string; primaryText: string; primaryBorder: string;
  badge: string; button: string; glow: string; hex: string;
}
export interface TemplateProps {
  portfolio: Portfolio; isDark: boolean;
  setActiveMode: (mode: 'light' | 'dark') => void;
  socialLinks: { key: string; url: string; Icon: React.ComponentType<{ className?: string }> }[];
  handleSocialClick: (platform: string) => void;
  handleSendMessage: (e: React.FormEvent) => Promise<void>;
  visitorName: string; setVisitorName: (v: string) => void;
  visitorEmail: string; setVisitorEmail: (v: string) => void;
  visitorMsg: string; setVisitorMsg: (v: string) => void;
  formLoading: boolean; formSuccess: string | null;
  isDemo: boolean; hue: PaletteEntry;
  labels: { skills: string; projects: string; experience: string; education: string; contact: string };
  sectionOrder: string[];
}
export const PALETTE: Record<string, PaletteEntry> = {
  indigo: { primary: "indigo", primaryBg: "bg-indigo-600", primaryText: "text-indigo-400", primaryBorder: "border-indigo-500/30", badge: "bg-indigo-500/15 text-indigo-300 border border-indigo-500/25", button: "bg-indigo-600 hover:bg-indigo-500 text-white", glow: "shadow-indigo-500/30", hex: "#6366f1" },
  emerald: { primary: "emerald", primaryBg: "bg-emerald-500", primaryText: "text-emerald-400", primaryBorder: "border-emerald-500/30", badge: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25", button: "bg-emerald-500 hover:bg-emerald-400 text-black", glow: "shadow-emerald-500/30", hex: "#10b981" },
  sky: { primary: "sky", primaryBg: "bg-sky-500", primaryText: "text-sky-400", primaryBorder: "border-sky-500/30", badge: "bg-sky-500/15 text-sky-300 border border-sky-500/25", button: "bg-sky-500 hover:bg-sky-400 text-black", glow: "shadow-sky-500/30", hex: "#0ea5e9" },
  orange: { primary: "orange", primaryBg: "bg-orange-500", primaryText: "text-orange-400", primaryBorder: "border-orange-500/30", badge: "bg-orange-500/15 text-orange-300 border border-orange-500/25", button: "bg-orange-500 hover:bg-orange-400 text-black", glow: "shadow-orange-500/30", hex: "#f97316" },
  rose: { primary: "rose", primaryBg: "bg-rose-500", primaryText: "text-rose-400", primaryBorder: "border-rose-500/30", badge: "bg-rose-500/15 text-rose-300 border border-rose-500/25", button: "bg-rose-500 hover:bg-rose-400 text-white", glow: "shadow-rose-500/30", hex: "#f43f5e" },
  violet: { primary: "violet", primaryBg: "bg-violet-500", primaryText: "text-violet-400", primaryBorder: "border-violet-500/30", badge: "bg-violet-500/15 text-violet-300 border border-violet-500/25", button: "bg-violet-500 hover:bg-violet-400 text-white", glow: "shadow-violet-500/30", hex: "#8b5cf6" },
  slate: { primary: "slate", primaryBg: "bg-slate-600", primaryText: "text-slate-300", primaryBorder: "border-slate-500/30", badge: "bg-slate-500/15 text-slate-300 border border-slate-500/25", button: "bg-slate-800 hover:bg-slate-700 text-white", glow: "shadow-slate-500/20", hex: "#475569" },
  cyan: { primary: "cyan", primaryBg: "bg-cyan-500", primaryText: "text-cyan-400", primaryBorder: "border-cyan-500/30", badge: "bg-cyan-500/15 text-cyan-300 border border-cyan-500/25", button: "bg-cyan-500 hover:bg-cyan-400 text-black", glow: "shadow-cyan-500/30", hex: "#06b6d4" },
  teal: { primary: "teal", primaryBg: "bg-teal-500", primaryText: "text-teal-400", primaryBorder: "border-teal-500/30", badge: "bg-teal-500/15 text-teal-300 border border-teal-500/25", button: "bg-teal-500 hover:bg-teal-400 text-black", glow: "shadow-teal-500/30", hex: "#14b8a6" },
  green: { primary: "green", primaryBg: "bg-green-500", primaryText: "text-green-400", primaryBorder: "border-green-500/30", badge: "bg-green-500/15 text-green-300 border border-green-500/25", button: "bg-green-500 hover:bg-green-400 text-black", glow: "shadow-green-500/30", hex: "#22c55e" },
  lime: { primary: "lime", primaryBg: "bg-lime-500", primaryText: "text-lime-400", primaryBorder: "border-lime-500/30", badge: "bg-lime-500/15 text-lime-300 border border-lime-500/25", button: "bg-lime-500 hover:bg-lime-400 text-black", glow: "shadow-lime-500/30", hex: "#84cc16" },
  amber: { primary: "amber", primaryBg: "bg-amber-500", primaryText: "text-amber-400", primaryBorder: "border-amber-500/30", badge: "bg-amber-500/15 text-amber-300 border border-amber-500/25", button: "bg-amber-500 hover:bg-amber-400 text-black", glow: "shadow-amber-500/30", hex: "#f59e0b" },
  red: { primary: "red", primaryBg: "bg-red-500", primaryText: "text-red-400", primaryBorder: "border-red-500/30", badge: "bg-red-500/15 text-red-300 border border-red-500/25", button: "bg-red-500 hover:bg-red-400 text-white", glow: "shadow-red-500/30", hex: "#ef4444" },
  pink: { primary: "pink", primaryBg: "bg-pink-500", primaryText: "text-pink-400", primaryBorder: "border-pink-500/30", badge: "bg-pink-500/15 text-pink-300 border border-pink-500/25", button: "bg-pink-500 hover:bg-pink-400 text-white", glow: "shadow-pink-500/30", hex: "#ec4899" },
  fuchsia: { primary: "fuchsia", primaryBg: "bg-fuchsia-500", primaryText: "text-fuchsia-400", primaryBorder: "border-fuchsia-500/30", badge: "bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/25", button: "bg-fuchsia-500 hover:bg-fuchsia-400 text-white", glow: "shadow-fuchsia-500/30", hex: "#d946ef" },
  zinc: { primary: "zinc", primaryBg: "bg-zinc-600", primaryText: "text-zinc-300", primaryBorder: "border-zinc-500/30", badge: "bg-zinc-500/15 text-zinc-300 border border-zinc-500/25", button: "bg-zinc-800 hover:bg-zinc-700 text-white", glow: "shadow-zinc-500/20", hex: "#71717a" },
};
export const GOOGLE_FONTS = `https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Space+Grotesk:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap`;

export const getSectionLabels = (industry: string) => {
  switch(industry) {
    case "creative": return { skills: "Mediums & Techniques", projects: "Gallery & Exhibitions", experience: "Clients & Agencies", education: "Education" };
    case "business": return { skills: "Core Competencies", projects: "Case Studies", experience: "Professional Tenure", education: "Education" };
    case "writing": return { skills: "Specializations", projects: "Publications", experience: "Assignments", education: "Education" };
    case "tech": default: return { skills: "Tech Stack", projects: "Selected Work", experience: "Experience", education: "Education" };
  }
};
