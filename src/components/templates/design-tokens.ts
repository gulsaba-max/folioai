/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Design Tokens — Theme definitions with light/dark CSS variable maps.
 * Uses oklch() for perceptual uniformity and modern browser support.
 */

import type { CSSProperties } from 'react';

export interface ThemeDefinition {
  id: string;
  name: string;
  display: string;
  description: string;
  light: CSSVariableMap;
  dark: CSSVariableMap;
}

export interface CSSVariableMap {
  bg: string;
  fg: string;
  muted: string;
  surface: string;
  accent: string;
  border: string;
}

export const THEME_IDS = [
  'editorial', 'engineer', 'bento', 'brutalist', 'aurora',
  'atelier', 'mono-lux', 'vibrant', 'architectural', 'vintage-modern'
] as const;

export type ThemeId = typeof THEME_IDS[number];

export interface TypographyTokens {
  fontDisplay: string;
  fontBody: string;
  fontMono: string;
}

export const PALETTE_BY_THEME: Record<ThemeId, CSSVariableMap> = {
  'editorial': {
    bg: 'oklch(0.98 0.003 90)', fg: 'oklch(0.15 0.01 260)',
    muted: 'oklch(0.55 0.015 90)', surface: 'oklch(0.96 0.004 90)',
    accent: 'oklch(0.35 0.12 270)', border: 'oklch(0.85 0.008 90)'
  },
  'engineer': {
    bg: 'oklch(0.99 0 0)', fg: 'oklch(0.15 0.005 260)',
    muted: 'oklch(0.50 0.005 260)', surface: 'oklch(0.96 0 0)',
    accent: 'oklch(0.55 0.14 210)', border: 'oklch(0.90 0.005 260)'
  },
  'bento': {
    bg: 'oklch(0.99 0.002 270)', fg: 'oklch(0.15 0.01 260)',
    muted: 'oklch(0.55 0.01 260)', surface: 'oklch(0.97 0.003 270)',
    accent: 'oklch(0.55 0.10 280)', border: 'oklch(0.90 0.008 270)'
  },
  'brutalist': {
    bg: 'oklch(1 0 0)', fg: 'oklch(0 0 0)',
    muted: 'oklch(0.55 0 0)', surface: 'oklch(1 0 0)',
    accent: 'oklch(0.55 0.20 25)', border: 'oklch(0 0 0)'
  },
  'aurora': {
    bg: 'oklch(0.97 0.008 250)', fg: 'oklch(0.15 0.02 250)',
    muted: 'oklch(0.50 0.015 250)', surface: 'oklch(0.94 0.012 250)',
    accent: 'oklch(0.60 0.12 170)', border: 'oklch(0.88 0.01 250)'
  },
  'atelier': {
    bg: 'oklch(0.96 0.012 80)', fg: 'oklch(0.20 0.015 70)',
    muted: 'oklch(0.50 0.015 70)', surface: 'oklch(0.93 0.010 80)',
    accent: 'oklch(0.50 0.12 45)', border: 'oklch(0.85 0.010 80)'
  },
  'mono-lux': {
    bg: 'oklch(0.99 0 0)', fg: 'oklch(0 0 0)',
    muted: 'oklch(0.50 0 0)', surface: 'oklch(0.97 0 0)',
    accent: 'oklch(0.70 0 0)', border: 'oklch(0.90 0 0)'
  },
  'vibrant': {
    bg: 'oklch(0.99 0.005 270)', fg: 'oklch(0.15 0.01 260)',
    muted: 'oklch(0.55 0.01 260)', surface: 'oklch(0.97 0.008 270)',
    accent: 'oklch(0.60 0.18 25)', border: 'oklch(0.88 0.01 270)'
  },
  'architectural': {
    bg: 'oklch(0.98 0.003 90)', fg: 'oklch(0.12 0.005 70)',
    muted: 'oklch(0.48 0.008 70)', surface: 'oklch(0.96 0.002 90)',
    accent: 'oklch(0.55 0.14 230)', border: 'oklch(0.88 0.005 70)'
  },
  'vintage-modern': {
    bg: 'oklch(0.97 0.008 80)', fg: 'oklch(0.20 0.015 60)',
    muted: 'oklch(0.50 0.012 60)', surface: 'oklch(0.95 0.006 80)',
    accent: 'oklch(0.55 0.10 70)', border: 'oklch(0.85 0.008 80)'
  }
};

export const THEME_DEFS: ThemeDefinition[] = [
  {
    id: 'editorial', name: 'Editorial', display: 'Editorial',
    description: 'High-end magazine/newspaper aesthetic with serif typography and elegant reveals.',
    light: PALETTE_BY_THEME['editorial'],
    dark: {
      bg: 'oklch(0.12 0.005 260)', fg: 'oklch(0.92 0.005 90)',
      muted: 'oklch(0.60 0.01 90)', surface: 'oklch(0.16 0.008 260)',
      accent: 'oklch(0.65 0.14 270)', border: 'oklch(0.25 0.008 260)'
    }
  },
  {
    id: 'engineer', name: 'Engineer', display: 'Engineer',
    description: 'Clean technical aesthetic for developers and engineers.',
    light: PALETTE_BY_THEME['engineer'],
    dark: {
      bg: 'oklch(0.10 0.005 260)', fg: 'oklch(0.92 0.005 260)',
      muted: 'oklch(0.60 0.005 260)', surface: 'oklch(0.14 0.005 260)',
      accent: 'oklch(0.70 0.15 210)', border: 'oklch(0.22 0.008 260)'
    }
  },
  {
    id: 'bento', name: 'Bento', display: 'Bento',
    description: 'Grid-based modern layout with rounded cards and soft shadows.',
    light: PALETTE_BY_THEME['bento'],
    dark: {
      bg: 'oklch(0.13 0.008 270)', fg: 'oklch(0.90 0.01 270)',
      muted: 'oklch(0.60 0.012 270)', surface: 'oklch(0.17 0.010 270)',
      accent: 'oklch(0.70 0.12 280)', border: 'oklch(0.25 0.01 270)'
    }
  },
  {
    id: 'brutalist', name: 'Brutalist', display: 'Brutalist',
    description: 'Raw, bold, unapologetic design with high contrast and stark borders.',
    light: PALETTE_BY_THEME['brutalist'],
    dark: {
      bg: 'oklch(0.05 0 0)', fg: 'oklch(0.95 0 0)',
      muted: 'oklch(0.60 0 0)', surface: 'oklch(0.08 0 0)',
      accent: 'oklch(0.65 0.20 25)', border: 'oklch(0.30 0 0)'
    }
  },
  {
    id: 'aurora', name: 'Aurora', display: 'Aurora',
    description: 'Northern lights inspired gradient aesthetics with depth and atmosphere.',
    light: PALETTE_BY_THEME['aurora'],
    dark: {
      bg: 'oklch(0.10 0.02 250)', fg: 'oklch(0.90 0.02 250)',
      muted: 'oklch(0.60 0.02 250)', surface: 'oklch(0.14 0.025 250)',
      accent: 'oklch(0.75 0.13 170)', border: 'oklch(0.22 0.02 250)'
    }
  },
  {
    id: 'atelier', name: 'Atelier', display: 'Atelier',
    description: 'Art studio inspired warm tones with handcrafted feel.',
    light: PALETTE_BY_THEME['atelier'],
    dark: {
      bg: 'oklch(0.14 0.015 70)', fg: 'oklch(0.92 0.012 80)',
      muted: 'oklch(0.60 0.015 70)', surface: 'oklch(0.18 0.012 70)',
      accent: 'oklch(0.65 0.12 45)', border: 'oklch(0.25 0.012 70)'
    }
  },
  {
    id: 'mono-lux', name: 'Mono Lux', display: 'Mono Lux',
    description: 'Minimal monochrome luxury with stark contrast and refined typography.',
    light: PALETTE_BY_THEME['mono-lux'],
    dark: {
      bg: 'oklch(0 0 0)', fg: 'oklch(0.95 0 0)',
      muted: 'oklch(0.55 0 0)', surface: 'oklch(0.10 0 0)',
      accent: 'oklch(0.75 0 0)', border: 'oklch(0.25 0 0)'
    }
  },
  {
    id: 'vibrant', name: 'Vibrant', display: 'Vibrant',
    description: 'Energetic and colorful with bold accents and dynamic interactions.',
    light: PALETTE_BY_THEME['vibrant'],
    dark: {
      bg: 'oklch(0.08 0.01 270)', fg: 'oklch(0.92 0.01 270)',
      muted: 'oklch(0.60 0.015 270)', surface: 'oklch(0.12 0.015 270)',
      accent: 'oklch(0.65 0.18 25)', border: 'oklch(0.22 0.01 270)'
    }
  },
  {
    id: 'architectural', name: 'Architectural', display: 'Architectural',
    description: 'Precise, structured and geometric with blueprint-inspired aesthetics.',
    light: PALETTE_BY_THEME['architectural'],
    dark: {
      bg: 'oklch(0.08 0.005 70)', fg: 'oklch(0.93 0.005 90)',
      muted: 'oklch(0.55 0.008 70)', surface: 'oklch(0.12 0.005 70)',
      accent: 'oklch(0.65 0.14 230)', border: 'oklch(0.22 0.008 70)'
    }
  },
  {
    id: 'vintage-modern', name: 'Vintage Modern', display: 'Vintage Modern',
    description: 'Retro-modern blend with warm patina and contemporary typography.',
    light: PALETTE_BY_THEME['vintage-modern'],
    dark: {
      bg: 'oklch(0.14 0.012 60)', fg: 'oklch(0.92 0.008 80)',
      muted: 'oklch(0.60 0.012 60)', surface: 'oklch(0.18 0.010 60)',
      accent: 'oklch(0.65 0.10 70)', border: 'oklch(0.28 0.01 60)'
    }
  }
];

export function getThemeById(id: string): ThemeDefinition {
  return THEME_DEFS.find(t => t.id === id) ?? THEME_DEFS[0];
}

export function cssVarToStyle(map: CSSVariableMap): CSSProperties {
  return {
    '--theme-bg': map.bg,
    '--theme-fg': map.fg,
    '--theme-muted': map.muted,
    '--theme-surface': map.surface,
    '--theme-accent': map.accent,
    '--theme-border': map.border,
  } as CSSProperties;
}
