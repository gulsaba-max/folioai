/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * TemplateGallery — Browse all 10 templates with live preview, 
 * color/font customization, and one-click apply.
 */

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, X, ChevronLeft, ChevronRight, Sun, Moon, Palette, Type, Sparkles, Eye, Zap } from "lucide-react";

export type ThemeId = 'minimal' | 'glass' | 'developer' | 'futuristic' | 'creative' | 'corporate' | 'startup' | 'cyberpunk' | 'agency' | 'luxury' | 'editorial' | 'engineer' | 'bento' | 'brutalist' | 'aurora' | 'atelier' | 'mono-lux' | 'vibrant' | 'architectural' | 'vintage-modern';

interface TemplateGalleryProps {
  currentTheme: ThemeId;
  currentPalette: string;
  currentMode: 'light' | 'dark';
  currentFont: string;
  professionLabel?: string;
  recommendedTheme?: ThemeId;
  onApply: (theme: ThemeId, palette: string, mode: 'light' | 'dark', font: string) => void;
  onClose: () => void;
}

interface TemplateCard {
  id: ThemeId;
  name: string;
  tagline: string;
  bestFor: string;
  accent: string;
  bg: string;
  textColor: string;
}

const TEMPLATES: TemplateCard[] = [
  {
    id: 'minimal',
    name: 'Minimal Luxury',
    tagline: 'Apple · Linear · Vercel',
    bestFor: 'Writers, Students, Freelancers',
    accent: '#000000',
    bg: '#ffffff',
    textColor: '#000000',
  },
  {
    id: 'glass',
    name: 'Glassmorphism',
    tagline: 'Frosted · Gradient · Float',
    bestFor: 'Designers, AI, Data',
    accent: '#8b5cf6',
    bg: '#0f0523',
    textColor: '#e2d9f3',
  },
  {
    id: 'developer',
    name: 'Developer',
    tagline: 'GitHub · Vercel · Stripe',
    bestFor: 'Engineers, DevOps, Cloud',
    accent: '#10b981',
    bg: '#0d1117',
    textColor: '#c9d1d9',
  },
  {
    id: 'futuristic',
    name: 'AI Futuristic',
    tagline: 'Aurora · Neon · Deep Space',
    bestFor: 'AI, ML, Data Scientists',
    accent: '#a855f7',
    bg: '#00010f',
    textColor: '#c4b5fd',
  },
  {
    id: 'creative',
    name: 'Creative Designer',
    tagline: 'Bold · Visual · Immersive',
    bestFor: 'UX, Product, Graphic Design',
    accent: '#f43f5e',
    bg: '#fdf6ee',
    textColor: '#1c1917',
  },
  {
    id: 'corporate',
    name: 'Corporate Business',
    tagline: 'Premium · Trusted · Clean',
    bestFor: 'Executives, Finance, Law, Medicine',
    accent: '#1d4ed8',
    bg: '#f8fafc',
    textColor: '#0f172a',
  },
  {
    id: 'startup',
    name: 'Startup Founder',
    tagline: 'Notion · Linear · Arc',
    bestFor: 'Founders, PMs, Marketers',
    accent: '#f59e0b',
    bg: '#09090b',
    textColor: '#fafafa',
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    tagline: 'Neon · Matrix · Hacker',
    bestFor: 'Security, Blockchain, Web3',
    accent: '#22d3ee',
    bg: '#000000',
    textColor: '#22d3ee',
  },
  {
    id: 'agency',
    name: 'Creative Agency',
    tagline: 'Bold · Editorial · Gallery',
    bestFor: 'Photographers, Directors, Architects',
    accent: '#f97316',
    bg: '#0c0c0c',
    textColor: '#fafaf9',
  },
  {
    id: 'luxury',
    name: 'Luxury Portfolio',
    tagline: 'Rolex · Tesla · Apple',
    bestFor: 'Lawyers, Consultants, Executives',
    accent: '#c9a84c',
    bg: '#0a0a0a',
    textColor: '#f5f0e8',
  },
  {
    id: 'editorial',
    name: 'Editorial',
    tagline: 'High-end magazine aesthetic',
    bestFor: 'Writers, journalists, researchers',
    accent: '#6366f1',
    bg: '#f8f5f0',
    textColor: '#1a1a1a',
  },
  {
    id: 'engineer',
    name: 'Engineer',
    tagline: 'Terminal-inspired, developer-credible',
    bestFor: 'Software engineers, DevOps, ML',
    accent: '#6366f1',
    bg: '#0d1117',
    textColor: '#c9d1d9',
  },
  {
    id: 'bento',
    name: 'Bento',
    tagline: 'Apple-keynote modular grid',
    bestFor: 'Product designers, founders, generalists',
    accent: '#6366f1',
    bg: '#f5f5f7',
    textColor: '#1d1d1f',
  },
  {
    id: 'brutalist',
    name: 'Brutalist',
    tagline: 'Raw, bold, structural',
    bestFor: 'Art directors, architects, consultants',
    accent: '#f97316',
    bg: '#ffffff',
    textColor: '#000000',
  },
  {
    id: 'aurora',
    name: 'Aurora',
    tagline: 'Premium SaaS, gradient mesh',
    bestFor: 'Product marketers, founders, creatives',
    accent: '#6366f1',
    bg: '#0f0523',
    textColor: '#e2d9f3',
  },
  {
    id: 'atelier',
    name: 'Atelier',
    tagline: 'Architect monograph, image-led',
    bestFor: 'Architects, photographers, artists',
    accent: '#6366f1',
    bg: '#f5f2eb',
    textColor: '#1c1917',
  },
  {
    id: 'mono-lux',
    name: 'Mono Lux',
    tagline: 'Black-tie minimal luxury',
    bestFor: 'Luxury brands, executives, consultants',
    accent: '#6366f1',
    bg: '#fafafa',
    textColor: '#0a0a0a',
  },
  {
    id: 'vibrant',
    name: 'Vibrant',
    tagline: 'Playful, energetic, modern',
    bestFor: 'Indie hackers, creators, marketers',
    accent: '#6366f1',
    bg: '#fdf6ee',
    textColor: '#1c1917',
  },
  {
    id: 'architectural',
    name: 'Architectural',
    tagline: 'Mies van der Rohe, strict grid',
    bestFor: 'Architects, engineers, planners',
    accent: '#6366f1',
    bg: '#f4f4f5',
    textColor: '#18181b',
  },
  {
    id: 'vintage-modern',
    name: 'Vintage Modern',
    tagline: 'Mid-century print meets 2025',
    bestFor: 'Educators, historians, craftspeople',
    accent: '#6366f1',
    bg: '#f5f2eb',
    textColor: '#292524',
  },
];

const PALETTES = [
  { id: 'indigo', hex: '#6366f1', label: 'Indigo' },
  { id: 'violet', hex: '#8b5cf6', label: 'Violet' },
  { id: 'emerald', hex: '#10b981', label: 'Emerald' },
  { id: 'sky', hex: '#0ea5e9', label: 'Sky' },
  { id: 'rose', hex: '#f43f5e', label: 'Rose' },
  { id: 'orange', hex: '#f97316', label: 'Orange' },
  { id: 'amber', hex: '#f59e0b', label: 'Amber' },
  { id: 'slate', hex: '#475569', label: 'Slate' },
];

const FONTS = [
  { id: 'Inter', label: 'Inter', style: 'Modern & Clean' },
  { id: 'DM Sans', label: 'DM Sans', style: 'Humanist & Warm' },
  { id: 'Space Grotesk', label: 'Space Grotesk', style: 'Geometric & Bold' },
  { id: 'Outfit', label: 'Outfit', style: 'Friendly & Round' },
  { id: 'Playfair Display', label: 'Playfair', style: 'Editorial & Serif' },
];

/** Miniature visual mockup for each template — CSS-crafted thumbnails */
function TemplateThumbnail({ template, selected }: { template: TemplateCard; selected: boolean }) {
  const { id, bg, accent, textColor } = template;

  return (
    <div className="w-full h-full overflow-hidden rounded-xl relative" style={{ background: bg }}>
      {/* Template-specific visual mockups */}
      {id === 'minimal' && (
        <>
          <div className="absolute top-0 left-0 right-0 h-5 flex items-center px-3 gap-2 border-b" style={{ borderColor: '#e5e5e5' }}>
            <div className="w-2 h-2 rounded-full" style={{ background: '#000' }} />
            <div className="flex-1 h-px bg-gray-200" />
            <div className="w-8 h-1.5 rounded bg-gray-900" />
          </div>
          <div className="px-5 pt-9">
            <div className="w-24 h-4 bg-black rounded-sm mb-2" />
            <div className="w-36 h-2 rounded bg-gray-300 mb-1" />
            <div className="w-28 h-1.5 rounded bg-gray-200 mb-4" />
            <div className="flex gap-2">
              <div className="w-14 h-5 rounded bg-black" />
              <div className="w-14 h-5 rounded border border-gray-300" />
            </div>
          </div>
          <div className="px-5 pt-6">
            <div className="w-full h-px bg-gray-100 mb-4" />
            <div className="grid grid-cols-3 gap-2">
              {[0,1,2].map(i => <div key={i} className="h-8 rounded bg-gray-50 border border-gray-100" />)}
            </div>
          </div>
        </>
      )}
      {id === 'glass' && (
        <>
          <div className="absolute top-2 left-2 w-20 h-20 rounded-full blur-2xl opacity-60" style={{ background: '#a855f7' }} />
          <div className="absolute bottom-2 right-2 w-16 h-16 rounded-full blur-2xl opacity-40" style={{ background: '#06b6d4' }} />
          <div className="relative z-10 px-4 pt-4">
            <div className="rounded-xl p-3 mb-2 border" style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.12)' }}>
              <div className="w-20 h-3 rounded mb-1" style={{ background: textColor }} />
              <div className="w-28 h-2 rounded opacity-50" style={{ background: textColor }} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[0,1,2,3].map(i => (
                <div key={i} className="rounded-lg p-2 border h-10" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.08)' }}>
                  <div className="w-full h-1.5 rounded mb-1" style={{ background: accent, opacity: 0.7 }} />
                  <div className="w-3/4 h-1 rounded opacity-30" style={{ background: textColor }} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {id === 'developer' && (
        <>
          <div className="px-3 pt-3">
            <div className="rounded-lg p-2 mb-2" style={{ background: '#161b22' }}>
              <div className="flex items-center gap-1 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-500 opacity-60" />
                <div className="w-2 h-2 rounded-full bg-yellow-500 opacity-60" />
                <div className="w-2 h-2 rounded-full bg-green-500 opacity-60" />
                <div className="flex-1" />
                <div className="w-8 h-1 rounded opacity-30" style={{ background: textColor }} />
              </div>
              <div className="space-y-1">
                <div className="flex gap-1"><div className="w-6 h-1.5 rounded" style={{ background: '#58a6ff' }} /><div className="w-14 h-1.5 rounded opacity-40" style={{ background: textColor }} /></div>
                <div className="flex gap-1"><div className="w-4 h-1.5 rounded" style={{ background: '#7ee787' }} /><div className="w-10 h-1.5 rounded" style={{ background: accent }} /></div>
                <div className="flex gap-1 ml-4"><div className="w-12 h-1.5 rounded opacity-40" style={{ background: textColor }} /></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[0,1,2,3].map(i => (
                <div key={i} className="rounded-lg p-2 border h-11" style={{ background: '#161b22', borderColor: '#30363d' }}>
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                    <div className="w-10 h-1 rounded opacity-60" style={{ background: textColor }} />
                  </div>
                  <div className="w-full h-1 rounded opacity-20" style={{ background: textColor }} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {id === 'futuristic' && (
        <>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(${accent}33 1px, transparent 1px), linear-gradient(90deg, ${accent}33 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
          <div className="absolute top-3 left-3 w-16 h-16 rounded-full blur-2xl" style={{ background: accent, opacity: 0.4 }} />
          <div className="relative z-10 px-4 pt-4">
            <div className="flex items-center gap-1 mb-3">
              <div className="w-1.5 h-1.5 rounded-full animate-ping" style={{ background: accent }} />
              <div className="w-16 h-1 rounded opacity-60" style={{ background: accent }} />
            </div>
            <div className="w-28 h-5 rounded mb-2" style={{ background: `${accent}40`, border: `1px solid ${accent}50` }} />
            <div className="w-20 h-2 rounded mb-4 opacity-50" style={{ background: textColor }} />
            <div className="grid grid-cols-3 gap-1.5">
              {[0,1,2,3,4,5].map(i => (
                <div key={i} className="h-6 rounded border" style={{ borderColor: `${accent}30`, background: `${accent}10` }} />
              ))}
            </div>
          </div>
        </>
      )}
      {id === 'creative' && (
        <>
          <div className="w-full h-16 relative overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #fde68a, #fca5a5, #c4b5fd)' }} />
            <div className="absolute inset-0 flex items-end px-3 pb-2">
              <div className="w-20 h-4 rounded" style={{ background: 'rgba(0,0,0,0.8)' }} />
            </div>
          </div>
          <div className="px-3 pt-3">
            <div className="w-32 h-3 rounded mb-2 opacity-80" style={{ background: textColor }} />
            <div className="w-24 h-2 rounded mb-3 opacity-40" style={{ background: textColor }} />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-14 rounded-lg overflow-hidden" style={{ background: '#f1f0ee' }}>
                <div className="w-full h-8" style={{ background: 'linear-gradient(135deg, #fbbf24, #f43f5e)' }} />
              </div>
              <div className="h-14 rounded-lg overflow-hidden" style={{ background: '#f1f0ee' }}>
                <div className="w-full h-8" style={{ background: 'linear-gradient(135deg, #a78bfa, #06b6d4)' }} />
              </div>
            </div>
          </div>
        </>
      )}
      {id === 'corporate' && (
        <>
          <div className="px-3 pt-2">
            <div className="flex items-center justify-between mb-3">
              <div className="w-16 h-2 rounded opacity-80" style={{ background: textColor }} />
              <div className="flex gap-1">
                {[0,1,2].map(i => <div key={i} className="w-5 h-1.5 rounded opacity-40" style={{ background: textColor }} />)}
              </div>
            </div>
            <div className="flex gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex-shrink-0" style={{ background: accent, opacity: 0.9 }} />
              <div>
                <div className="w-20 h-2.5 rounded mb-1" style={{ background: textColor }} />
                <div className="w-14 h-1.5 rounded" style={{ background: accent }} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {[0,1,2].map(i => (
                <div key={i} className="rounded-lg p-2 border" style={{ borderColor: '#e2e8f0' }}>
                  <div className="w-8 h-3 rounded mb-1" style={{ background: accent, opacity: 0.7 }} />
                  <div className="w-full h-1 rounded opacity-30" style={{ background: textColor }} />
                </div>
              ))}
            </div>
            <div className="space-y-1.5">
              {[0,1].map(i => (
                <div key={i} className="flex gap-2 items-center p-2 rounded border" style={{ borderColor: '#e2e8f0' }}>
                  <div className="w-1 h-6 rounded-full" style={{ background: accent }} />
                  <div className="flex-1">
                    <div className="w-16 h-1.5 rounded mb-1" style={{ background: textColor }} />
                    <div className="w-12 h-1 rounded opacity-40" style={{ background: textColor }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {id === 'startup' && (
        <>
          <div className="p-2">
            <div className="grid grid-cols-6 grid-rows-4 gap-1.5 h-44">
              <div className="col-span-4 row-span-2 rounded-xl p-2 relative overflow-hidden" style={{ background: '#18181b', border: '1px solid #27272a' }}>
                <div className="absolute top-1 right-1 w-8 h-8 rounded-full blur-lg opacity-40" style={{ background: accent }} />
                <div className="w-16 h-2.5 rounded mb-1" style={{ background: '#fff' }} />
                <div className="w-20 h-1.5 rounded opacity-40" style={{ background: accent }} />
              </div>
              <div className="col-span-2 row-span-2 rounded-xl p-2 flex flex-col justify-center items-center" style={{ background: accent }}>
                <div className="text-[10px] font-bold text-black">12K+</div>
                <div className="w-8 h-1 rounded bg-black opacity-30 mt-0.5" />
              </div>
              <div className="col-span-3 row-span-2 rounded-xl p-2" style={{ background: '#18181b', border: '1px solid #27272a' }}>
                <div className="w-10 h-1.5 rounded mb-1 opacity-60" style={{ background: '#fff' }} />
                <div className="space-y-1">
                  {[0,1,2].map(i => <div key={i} className="w-full h-1 rounded opacity-20" style={{ background: '#fff' }} />)}
                </div>
              </div>
              <div className="col-span-3 row-span-2 rounded-xl p-2" style={{ background: '#18181b', border: '1px solid #27272a' }}>
                <div className="w-8 h-1.5 rounded mb-1 opacity-60" style={{ background: '#fff' }} />
                <div className="flex flex-wrap gap-0.5">
                  {[0,1,2,3].map(i => <div key={i} className="w-5 h-2 rounded-sm" style={{ background: `${accent}60` }} />)}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {id === 'cyberpunk' && (
        <>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(${accent}80 1px, transparent 1px), linear-gradient(90deg, ${accent}80 1px, transparent 1px)`, backgroundSize: '15px 15px' }} />
          <div className="absolute inset-0 opacity-[0.03]" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,0,0.5) 3px, rgba(0,255,0,0.5) 4px)' }} />
          <div className="relative z-10 px-3 pt-3">
            <div className="mb-3">
              <div className="w-6 h-6 rounded-sm flex items-center justify-center mb-1" style={{ background: `${accent}20`, border: `1px solid ${accent}60` }}>
                <div className="w-2 h-2 rounded-sm" style={{ background: accent }} />
              </div>
              <div className="w-24 h-3 rounded-sm mb-1" style={{ background: `${accent}40` }} />
              <div className="w-16 h-1.5 rounded-sm opacity-40" style={{ background: accent }} />
            </div>
            <div className="space-y-1.5">
              {[0,1,2,3].map(i => (
                <div key={i} className="rounded-sm p-2 border" style={{ borderColor: `${accent}30`, background: `${accent}08` }}>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-sm" style={{ background: accent }} />
                    <div className="w-12 h-1 rounded-sm opacity-60" style={{ background: textColor }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {id === 'agency' && (
        <>
          <div className="w-full h-24 relative overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #1c1c1c 0%, #2d2d2d 100%)' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-4 rounded opacity-90" style={{ background: textColor }} />
            </div>
            <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full" style={{ background: accent, opacity: 0.8 }} />
          </div>
          <div className="px-3 pt-3">
            <div className="space-y-2">
              {[0,1].map(i => (
                <div key={i} className="rounded-lg h-10 relative overflow-hidden" style={{ background: '#1a1a1a' }}>
                  <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: accent }} />
                  <div className="pl-3 pt-2">
                    <div className="w-14 h-1.5 rounded opacity-70" style={{ background: textColor }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {id === 'luxury' && (
        <>
          <div className="px-4 pt-5">
            <div className="w-px h-6 mb-3" style={{ background: accent }} />
            <div className="w-28 h-5 rounded-sm mb-1.5" style={{ background: `${textColor}15` }}>
              <div className="w-full h-full rounded-sm" style={{ background: `${textColor}20` }} />
            </div>
            <div className="w-20 h-px mb-5" style={{ background: accent, opacity: 0.6 }} />
            <div className="space-y-4">
              {[0,1,2].map(i => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-px flex-shrink-0" style={{ background: accent }} />
                  <div className="flex-1 h-px" style={{ background: `${textColor}20` }} />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-3 left-4 right-4">
            <div className="w-full h-px mb-2" style={{ background: `${accent}40` }} />
            <div className="w-14 h-1.5 rounded" style={{ background: `${accent}60` }} />
          </div>
        </>
      )}
      {id === 'editorial' && (
        <>
          <div className="px-4 pt-5">
            <div className="w-16 h-2 rounded mb-3" style={{ background: accent }} />
            <div className="w-24 h-3 rounded mb-2 opacity-80" style={{ background: textColor }} />
            <div className="w-20 h-2 rounded mb-4 opacity-40" style={{ background: textColor }} />
            <div className="w-full h-px mb-3" style={{ background: accent, opacity: 0.4 }} />
            <div className="space-y-2">
              {[0,1,2].map(i => (
                <div key={i} className="flex gap-2 items-center">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold" style={{ background: accent, color: '#fff' }}>{i + 1}</div>
                  <div className="flex-1 h-2 rounded opacity-50" style={{ background: textColor }} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {id === 'engineer' && (
        <div className="px-3 pt-3">
          <div className="rounded-lg p-2 mb-2" style={{ background: '#161b22' }}>
            <div className="flex items-center gap-1 mb-2">
              <div className="w-2 h-2 rounded-full bg-red-500 opacity-60" />
              <div className="w-2 h-2 rounded-full bg-yellow-500 opacity-60" />
              <div className="w-2 h-2 rounded-full bg-green-500 opacity-60" />
              <div className="flex-1" />
              <div className="w-8 h-1 rounded opacity-30" style={{ background: textColor }} />
            </div>
            <div className="space-y-1">
              <div className="flex gap-1"><div className="w-6 h-1.5 rounded" style={{ background: '#58a6ff' }} /><div className="w-14 h-1.5 rounded opacity-40" style={{ background: textColor }} /></div>
              <div className="flex gap-1"><div className="w-4 h-1.5 rounded" style={{ background: accent }} /><div className="w-10 h-1.5 rounded opacity-40" style={{ background: textColor }} /></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {[0,1,2,3].map(i => (
              <div key={i} className="rounded-lg p-2 border h-11" style={{ background: '#161b22', borderColor: '#30363d' }}>
                <div className="flex items-center gap-1 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                  <div className="w-10 h-1 rounded opacity-60" style={{ background: textColor }} />
                </div>
                <div className="w-full h-1 rounded opacity-20" style={{ background: textColor }} />
              </div>
            ))}
          </div>
        </div>
      )}
      {id === 'bento' && (
        <div className="p-2">
          <div className="grid grid-cols-3 gap-1.5 h-44">
            <div className="col-span-2 row-span-2 rounded-xl p-2" style={{ background: accent, opacity: 0.1 }}>
              <div className="w-full h-full rounded-lg border flex items-center justify-center" style={{ borderColor: `${accent}30` }}>
                <div className="w-8 h-8 rounded-full" style={{ background: accent, opacity: 0.2 }} />
              </div>
            </div>
            <div className="rounded-xl p-2" style={{ background: '#fff', border: '1px solid #e5e5e5' }}>
              <div className="w-8 h-8 rounded-lg mb-1" style={{ background: accent, opacity: 0.15 }} />
              <div className="w-full h-1 rounded opacity-40" style={{ background: textColor }} />
            </div>
            <div className="rounded-xl p-2" style={{ background: '#fff', border: '1px solid #e5e5e5' }}>
              <div className="w-6 h-6 rounded mb-1" style={{ background: accent, opacity: 0.15 }} />
              <div className="w-full h-1 rounded opacity-40" style={{ background: textColor }} />
            </div>
            <div className="col-span-3 rounded-xl p-2" style={{ background: '#fff', border: '1px solid #e5e5e5' }}>
              <div className="flex gap-1">
                {[0,1,2,3].map(i => <div key={i} className="flex-1 h-6 rounded" style={{ background: accent, opacity: 0.08 }} />)}
              </div>
            </div>
          </div>
        </div>
      )}
      {id === 'brutalist' && (
        <div className="p-2">
          <div className="border border-black p-1">
            <div className="w-full h-3 bg-black mb-1" />
            <div className="w-2/3 h-2 bg-black mb-2" />
          </div>
          <div className="w-full border border-black mt-1">
            <div className="flex">
              <div className="w-1/3 p-1 border-r border-black"><div className="w-full h-1 bg-black" /></div>
              <div className="w-1/3 p-1 border-r border-black"><div className="w-full h-1 bg-black" /></div>
              <div className="w-1/3 p-1"><div className="w-full h-1 bg-black" /></div>
            </div>
          </div>
        </div>
      )}
      {id === 'aurora' && (
        <div className="w-full h-full relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/40 to-cyan-400/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white border border-white/30" />
          </div>
        </div>
      )}
      {id === 'atelier' && (
        <div className="w-full h-full relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
          <div className="absolute bottom-0 left-0 right-0 p-2">
            <div className="w-20 h-2 rounded mb-1" style={{ background: textColor }} />
            <div className="w-12 h-1.5 rounded opacity-60" style={{ background: textColor }} />
          </div>
        </div>
      )}
      {id === 'mono-lux' && (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-3">
          <div className="w-10 h-px bg-black" />
          <div className="w-6 h-px bg-black/60" />
          <div className="w-8 h-px bg-black/40" />
        </div>
      )}
      {id === 'vibrant' && (
        <div className="w-full h-full relative">
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/40 to-orange-400/40" />
          <div className="absolute bottom-2 left-2 right-2 flex gap-1">
            {[0,1,2].map(i => (
              <div key={i} className="flex-1 h-6 rounded-lg" style={{ background: ['#f43f5e', '#8b5cf6', '#06b6d4'][i], opacity: 0.7 }} />
            ))}
          </div>
        </div>
      )}
      {id === 'architectural' && (
        <div className="w-full h-full relative">
          <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
            {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => (
              <div key={i} className="bg-black/5" />
            ))}
          </div>
          <div className="absolute top-2 left-2 w-8 h-8 bg-black/10" />
           <div className="absolute bottom-2 right-2 w-12 h-2 bg-black/40" />
        </div>
      )}
      {id === 'vintage-modern' && (
        <div className="w-full h-full relative border border-amber-200 bg-amber-50">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
          <div className="relative p-2">
            <div className="w-16 h-2 rounded mb-1" style={{ background: accent }} />
            <div className="w-20 h-1.5 rounded opacity-60" style={{ background: textColor }} />
          </div>
        </div>
      )}

      {/* Recommended badge */}
      {selected && (
        <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: '#22c55e' }}>
          <Check className="w-3 h-3 text-white" />
        </div>
      )}
    </div>
  );
}

export default function TemplateGallery({
  currentTheme, currentPalette, currentMode, currentFont,
  professionLabel, recommendedTheme, onApply, onClose
}: TemplateGalleryProps) {
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>(currentTheme);
  const [selectedPalette, setSelectedPalette] = useState(currentPalette || 'indigo');
  const [selectedMode, setSelectedMode] = useState<'light' | 'dark'>(currentMode);
  const [selectedFont, setSelectedFont] = useState(currentFont || 'Inter');
  const [previewIndex, setPreviewIndex] = useState(() => TEMPLATES.findIndex(t => t.id === currentTheme));

  const template = TEMPLATES[previewIndex];

  const handlePrev = () => setPreviewIndex(i => (i - 1 + TEMPLATES.length) % TEMPLATES.length);
  const handleNext = () => setPreviewIndex(i => (i + 1) % TEMPLATES.length);

  const handleCardClick = (idx: number) => {
    setPreviewIndex(idx);
    setSelectedTheme(TEMPLATES[idx].id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col"
      style={{ background: 'rgba(5, 5, 8, 0.92)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07] flex-shrink-0">
        <div>
          <h2 className="text-white font-bold text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            Choose Your Template
          </h2>
          {professionLabel && (
            <p className="text-xs text-slate-500 mt-0.5">
              Showing templates for <span className="text-indigo-400">{professionLabel}</span>
              {recommendedTheme && <span className="ml-1">· AI recommends <span className="text-emerald-400">{TEMPLATES.find(t => t.id === recommendedTheme)?.name}</span></span>}
            </p>
          )}
        </div>
        <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/20 text-slate-400 hover:text-white transition-all cursor-pointer">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left: Template Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {TEMPLATES.map((tpl, idx) => (
              <motion.div
                key={tpl.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                onClick={() => handleCardClick(idx)}
                className="cursor-pointer group"
              >
                 <div className={`relative rounded-2xl overflow-hidden transition-all duration-200 ${
                   selectedTheme === tpl.id
                     ? 'ring-2 ring-indigo-500/60 shadow-xl shadow-indigo-500/20'
                     : 'ring-1 ring-white/[0.08] hover:ring-white/20'
                 }`} style={{ height: '180px' }}>
                  <TemplateThumbnail template={tpl} selected={selectedTheme === tpl.id} />

                  {/* Recommended badge */}
                  {tpl.id === recommendedTheme && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                      style={{ background: '#10b981', color: '#fff' }}>
                      AI Pick
                    </div>
                  )}

                  {/* Hover overlay */}
                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                     <div className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white flex items-center gap-1"
                       style={{ background: 'rgba(0,0,0,0.7)' }}>
                      <Eye className="w-3 h-3" /> Preview
                    </div>
                  </div>
                </div>

                <div className="mt-2.5">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-semibold ${selectedTheme === tpl.id ? 'text-white' : 'text-slate-400'}`}>
                      {tpl.name}
                    </span>
                    {selectedTheme === tpl.id && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <p className="text-[10px] text-slate-600 mt-0.5 truncate">{tpl.bestFor}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Customization Sidebar */}
        <div className="w-72 flex-shrink-0 border-l border-white/[0.07] flex flex-col overflow-y-auto bg-black/30">
          {/* Selected template info */}
          <div className="p-5 border-b border-white/[0.07]">
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-xl overflow-hidden w-14 h-10 flex-shrink-0 ring-1 ring-white/10">
                <TemplateThumbnail template={TEMPLATES.find(t => t.id === selectedTheme)!} selected={true} />
              </div>
              <div>
                <p className="text-white font-bold text-sm">{TEMPLATES.find(t => t.id === selectedTheme)?.name}</p>
                <p className="text-[10px] text-slate-500">{TEMPLATES.find(t => t.id === selectedTheme)?.tagline}</p>
              </div>
            </div>

             <div className="flex gap-1">
               <button onClick={handlePrev} className="p-1.5 rounded-lg border border-white/20 hover:bg-white/20 text-slate-400 hover:text-white transition-all cursor-pointer">
                 <ChevronLeft className="w-4 h-4" />
               </button>
               <div className="flex-1 flex items-center justify-center text-xs text-slate-600">
                 {previewIndex + 1} / {TEMPLATES.length}
               </div>
               <button onClick={handleNext} className="p-1.5 rounded-lg border border-white/20 hover:bg-white/20 text-slate-400 hover:text-white transition-all cursor-pointer">
                 <ChevronRight className="w-4 h-4" />
               </button>
             </div>
          </div>

          {/* Mode Toggle */}
          <div className="p-5 border-b border-white/[0.07]">
            <div className="flex items-center gap-2 mb-3">
              <Sun className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Mode</span>
            </div>
            <div className="flex rounded-xl overflow-hidden border border-white/10">
              {(['dark', 'light'] as const).map(mode => (
                <button key={mode} onClick={() => setSelectedMode(mode)}
                  className={`flex-1 py-2 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    selectedMode === mode ? 'bg-white/15 text-white' : 'text-slate-500 hover:text-slate-300'
                  }`}>
                  {mode === 'dark' ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Color Palette */}
          <div className="p-5 border-b border-white/[0.07]">
            <div className="flex items-center gap-2 mb-3">
              <Palette className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Accent Color</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {PALETTES.map(p => (
                <button key={p.id} onClick={() => setSelectedPalette(p.id)}
                  title={p.label}
                  className={`w-full aspect-square rounded-xl transition-all cursor-pointer ${
                    selectedPalette === p.id ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent scale-110' : 'hover:scale-105'
                  }`}
                  style={{ background: p.hex }}>
                  {selectedPalette === p.id && (
                    <div className="w-full h-full flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-white" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Font Selection */}
          <div className="p-5 border-b border-white/[0.07]">
            <div className="flex items-center gap-2 mb-3">
              <Type className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Typography</span>
            </div>
            <div className="space-y-1.5">
              {FONTS.map(f => (
                <button key={f.id} onClick={() => setSelectedFont(f.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                    selectedFont === f.id
                      ? 'bg-indigo-500/15 border border-indigo-500/30 text-white'
                      : 'border border-white/[0.06] hover:border-white/15 text-slate-400 hover:text-slate-200'
                  }`}>
                  <div className="font-semibold" style={{ fontFamily: f.id }}>{f.label}</div>
                  <div className="text-[10px] opacity-60">{f.style}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <div className="p-5 mt-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onApply(selectedTheme, selectedPalette, selectedMode, selectedFont)}
              className="w-full py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
            >
              <Zap className="w-4 h-4" />
              Apply This Template
            </motion.button>
            <p className="text-[10px] text-slate-600 text-center mt-2">
              Your content stays the same — only the design changes
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
