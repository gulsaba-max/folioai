/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Template Registry — Maps template slugs to metadata and component placeholders.
 */

import type { FC, LazyExoticComponent } from 'react';
import type { ThemeId } from './design-tokens';
import EditorialTemplate from './EditorialTemplate';
import EngineerTemplate from './EngineerTemplate';
import BentoTemplate from './BentoTemplate';
import BrutalistTemplate from './BrutalistTemplate';
import AuroraTemplate from './AuroraTemplate';
import AtelierTemplate from './AtelierTemplate';
import MonoLuxTemplate from './MonoLuxTemplate';
import VibrantTemplate from './VibrantTemplate';
import ArchitecturalGridTemplate from './ArchitecturalGridTemplate';
import VintageModernTemplate from './VintageModernTemplate';
import MinimalTemplate from './MinimalTemplate';
import GlassTemplate from './GlassTemplate';
import DeveloperTemplate from './DeveloperTemplate';
import FuturisticTemplate from './FuturisticTemplate';
import CreativeTemplate from './CreativeTemplate';
import CorporateTemplate from './CorporateTemplate';
import StartupTemplate from './StartupTemplate';
import CyberpunkTemplate from './CyberpunkTemplate';
import AgencyTemplate from './AgencyTemplate';
import LuxuryTemplate from './LuxuryTemplate';
import SlateTemplate from './SlateTemplate';
import CyberTemplate from './CyberTemplate';

export interface TemplateRegistryEntry {
  slug: string;
  name: string;
  description: string;
  idealFor: string;
  component: LazyExoticComponent<FC<unknown>> | (() => null);
  paletteId: ThemeId;
  fontDisplay: string;
  fontBody: string;
  fontMono: string;
  defaultMode: 'light' | 'dark';
}

export const TEMPLATE_REGISTRY: TemplateRegistryEntry[] = [
  {
    slug: 'minimal',
    name: 'Minimal',
    description: 'Huge typography, lots of whitespace, elegant animations, sticky nav.',
    idealFor: 'Designers, photographers, writers, and minimalists.',
    component: MinimalTemplate,
    paletteId: 'minimal',
    fontDisplay: "'Inter', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    defaultMode: 'light'
  },
  {
    slug: 'glass',
    name: 'Glass',
    description: 'Frosted glass cards, animated gradient blobs, floating UI, neon highlights.',
    idealFor: 'UI designers, creative developers, modern SaaS founders.',
    component: GlassTemplate,
    paletteId: 'glass',
    fontDisplay: "'Outfit', sans-serif",
    fontBody: "'Outfit', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    defaultMode: 'dark'
  },
  {
    slug: 'developer',
    name: 'Developer',
    description: 'Terminal hero, code snippets, repo-style cards, animated cursor.',
    idealFor: 'Software engineers, backend developers, DevOps engineers.',
    component: DeveloperTemplate,
    paletteId: 'developer',
    fontDisplay: "'Space Grotesk', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    defaultMode: 'dark'
  },
  {
    slug: 'futuristic',
    name: 'Futuristic',
    description: 'Aurora background, floating particles, neon glow, animated grid, deep-space.',
    idealFor: 'AI researchers, tech futurists, space-tech founders.',
    component: FuturisticTemplate,
    paletteId: 'futuristic',
    fontDisplay: "'Space Grotesk', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    defaultMode: 'dark'
  },
  {
    slug: 'creative',
    name: 'Creative',
    description: 'Large images, horizontal project gallery, oversized typography, animated text loop.',
    idealFor: 'Art directors, illustrators, graphic designers.',
    component: CreativeTemplate,
    paletteId: 'creative',
    fontDisplay: "'DM Sans', sans-serif",
    fontBody: "'DM Sans', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    defaultMode: 'light'
  },
  {
    slug: 'corporate',
    name: 'Corporate',
    description: 'Elegant navy theme, KPI counters, professional timeline, premium cards.',
    idealFor: 'Executives, management consultants, enterprise professionals.',
    component: CorporateTemplate,
    paletteId: 'corporate',
    fontDisplay: "'Inter', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    defaultMode: 'light'
  },
  {
    slug: 'startup',
    name: 'Startup',
    description: 'Bento grid layout, startup metrics with counters, varied card sizes.',
    idealFor: 'Startup founders, product managers, growth hackers.',
    component: StartupTemplate,
    paletteId: 'startup',
    fontDisplay: "'Outfit', sans-serif",
    fontBody: "'Outfit', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    defaultMode: 'dark'
  },
  {
    slug: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Neon colors, matrix rain, glitch text, animated borders, scan-line overlay.',
    idealFor: 'Game devs, blockchain devs, cyber-security engineers.',
    component: CyberpunkTemplate,
    paletteId: 'cyberpunk',
    fontDisplay: "'Space Grotesk', monospace",
    fontBody: "'Space Grotesk', monospace",
    fontMono: "'JetBrains Mono', monospace",
    defaultMode: 'dark'
  },
  {
    slug: 'agency',
    name: 'Agency',
    description: 'Fullscreen sections, bold editorial typography, hover image reveals, diagonal layouts.',
    idealFor: 'Creative agencies, branding studios, marketing teams.',
    component: AgencyTemplate,
    paletteId: 'agency',
    fontDisplay: "'Cormorant Garamond', serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    defaultMode: 'light'
  },
  {
    slug: 'luxury',
    name: 'Luxury',
    description: 'Cinematic hero, gold accent, Cormorant Garamond, ultra-premium spacing.',
    idealFor: 'Luxury brands, high-end services, premium professionals.',
    component: LuxuryTemplate,
    paletteId: 'luxury',
    fontDisplay: "'Cormorant Garamond', Georgia, serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    defaultMode: 'light'
  },
  {
    slug: 'slate',
    name: 'Slate',
    description: 'Sophisticated dark sidebar with glassmorphism, sticky nav, clean content.',
    idealFor: 'Developers, designers, writers who love clean layouts.',
    component: SlateTemplate,
    paletteId: 'slate',
    fontDisplay: "'DM Sans', sans-serif",
    fontBody: "'DM Sans', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    defaultMode: 'light'
  },
  {
    slug: 'cyber',
    name: 'Cyber',
    description: 'Neon-drenched terminal aesthetic with glitch effects and scanlines.',
    idealFor: 'Security engineers, game devs, crypto builders.',
    component: CyberTemplate,
    paletteId: 'cyber',
    fontDisplay: "'Space Grotesk', monospace",
    fontBody: "'Space Grotesk', monospace",
    fontMono: "'JetBrains Mono', monospace",
    defaultMode: 'dark'
  },
  {
    slug: 'editorial',
    name: 'Editorial',
    description: 'High-end magazine aesthetic with serif typography, elegant reveals, and a two-column editorial grid.',
    idealFor: 'Writers, journalists, literary professionals, and anyone seeking a sophisticated editorial presence.',
    component: EditorialTemplate,
    paletteId: 'editorial',
    fontDisplay: "'Playfair Display', serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    defaultMode: 'light'
  },
  {
    slug: 'engineer',
    name: 'Engineer',
    description: 'Clean technical aesthetic with precise typography, code-inspired elements, and sharp structure.',
    idealFor: 'Software engineers, backend developers, DevOps engineers, and technical professionals.',
    component: EngineerTemplate,
    paletteId: 'engineer',
    fontDisplay: "'Space Grotesk', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    defaultMode: 'dark'
  },
  {
    slug: 'bento',
    name: 'Bento',
    description: 'Grid-based modular layout with rounded cards, soft shadows, and Apple-inspired visual rhythm.',
    idealFor: 'Product designers, frontend developers, and creators who love structured grids.',
    component: BentoTemplate,
    paletteId: 'bento',
    fontDisplay: "'Space Grotesk', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    defaultMode: 'light'
  },
  {
    slug: 'brutalist',
    name: 'Brutalist',
    description: 'Raw, bold, unapologetic design with high contrast, stark borders, and brutal honesty.',
    idealFor: 'Art directors, experimental designers, and those who reject conventional aesthetics.',
    component: BrutalistTemplate,
    paletteId: 'brutalist',
    fontDisplay: "'Space Grotesk', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    defaultMode: 'light'
  },
  {
    slug: 'aurora',
    name: 'Aurora',
    description: 'Northern lights inspired gradients with atmospheric depth and ethereal transitions.',
    idealFor: 'Creative professionals, designers, and those who want a dreamy, immersive presence.',
    component: AuroraTemplate,
    paletteId: 'aurora',
    fontDisplay: "'Space Grotesk', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    defaultMode: 'dark'
  },
  {
    slug: 'atelier',
    name: 'Atelier',
    description: 'Art studio inspired warm tones with handcrafted feel, sketch-like elements, and creative warmth.',
    idealFor: 'Artists, illustrators, designers, and creatives who appreciate warm, human-centered design.',
    component: AtelierTemplate,
    paletteId: 'atelier',
    fontDisplay: "'Cormorant Garamond', serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    defaultMode: 'light'
  },
  {
    slug: 'mono-lux',
    name: 'Mono Lux',
    description: 'Minimal monochrome luxury with stark contrast, refined spacing, and timeless sophistication.',
    idealFor: 'Luxury brands, minimalist artists, architects, and premium service professionals.',
    component: MonoLuxTemplate,
    paletteId: 'mono-lux',
    fontDisplay: "'Space Grotesk', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    defaultMode: 'light'
  },
  {
    slug: 'vibrant',
    name: 'Vibrant',
    description: 'Energetic and colorful with bold accents, dynamic interactions, and youthful exuberance.',
    idealFor: 'Marketing professionals, social media experts, creative agencies, and startups.',
    component: VibrantTemplate,
    paletteId: 'vibrant',
    fontDisplay: "'Space Grotesk', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    defaultMode: 'dark'
  },
  {
    slug: 'architectural',
    name: 'Architectural',
    description: 'Precise, structured, and geometric with blueprint-inspired lines and intentional whitespace.',
    idealFor: 'Architects, engineers, urban planners, and design-conscious professionals.',
    component: ArchitecturalGridTemplate,
    paletteId: 'architectural',
    fontDisplay: "'Space Grotesk', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    defaultMode: 'light'
  },
  {
    slug: 'vintage-modern',
    name: 'Vintage Modern',
    description: 'Retro-modern blend with warm patina, contemporary typography, and nostalgic warmth.',
    idealFor: 'Craftspeople, boutique owners, heritage brands, and those who value timeless elegance.',
    component: VintageModernTemplate,
    paletteId: 'vintage-modern',
    fontDisplay: "'Cormorant Garamond', serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    defaultMode: 'light'
  }
];

export function getTemplateBySlug(slug: string): TemplateRegistryEntry | undefined {
  return TEMPLATE_REGISTRY.find(t => t.slug === slug);
}
