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
