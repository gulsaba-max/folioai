/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * PortfolioThemeContext
 *
 * Provides a single centralized theme object to every template:
 * - palette/color
 * - typography
 * - mode (light/dark)
 * - industry
 *
 * No template should define its own independent theme values.
 */

import React, { createContext, useContext, useMemo } from 'react';
import { getThemeById } from '../components/templates/design-tokens';
import { COLOR_PALETTES, TYPOGRAPHY_PRESETS, INDUSTRY_CONFIG, normalizeTypographyKey, normalizePaletteKey, normalizeIndustryKey } from '../utils/portfolioTheme';

export interface DesignSettings {
  theme?: string;
  mode?: 'light' | 'dark';
  colorPalette?: string;
  fontSans?: string;
  fontMono?: string;
  showSocialFeed?: boolean;
  layoutReorder?: string[];
  industry?: string;
}

export interface ThemeContextValue {
  themeId: string;
  mode: 'light' | 'dark';
  palette: typeof COLOR_PALETTES['indigo'];
  typography: typeof TYPOGRAPHY_PRESETS['inter'];
  industry: typeof INDUSTRY_CONFIG['tech'];
  isDark: boolean;
  sectionOrder: string[];
  tokens: { bg: string; fg: string; muted: string; surface: string; accent: string; border: string };
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function usePortfolioTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    return getFallbackTheme();
  }
  return ctx;
}

function getFallbackTheme(): ThemeContextValue {
  const themeDef = getThemeById('editorial');
  return {
    themeId: 'editorial',
    mode: 'dark',
    palette: COLOR_PALETTES.indigo,
    typography: TYPOGRAPHY_PRESETS.inter,
    industry: INDUSTRY_CONFIG.tech,
    isDark: true,
    sectionOrder: ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'contact'],
    tokens: themeDef.dark,
  };
}

export interface PortfolioThemeProviderProps {
  designSettings?: DesignSettings;
  children: React.ReactNode;
}

export function PortfolioThemeProvider({ designSettings, children }: PortfolioThemeProviderProps) {
  const settings = useMemo(() => {
    const defaults: DesignSettings = {
      theme: 'minimal',
      mode: 'dark',
      colorPalette: 'indigo',
      fontSans: 'Inter',
      fontMono: 'JetBrains Mono',
      showSocialFeed: true,
      layoutReorder: ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'contact'],
      industry: 'tech',
    };
    return { ...defaults, ...designSettings };
  }, [designSettings]);

  const value = useMemo<ThemeContextValue>(() => {
    const themeId = settings.theme || 'minimal';
    const mode = settings.mode || 'dark';
    const isDark = mode === 'dark';
    const paletteKey = normalizePaletteKey(settings.colorPalette);
    const typographyKey = normalizeTypographyKey(settings.fontSans);
    const industryKey = normalizeIndustryKey(settings.industry);

    const themeDef = getThemeById(
      ['editorial', 'engineer', 'bento', 'brutalist', 'aurora', 'atelier', 'mono-lux', 'vibrant', 'architectural', 'vintage-modern'].includes(themeId)
        ? (themeId as any)
        : 'editorial'
    );

    return {
      themeId,
      mode,
      palette: COLOR_PALETTES[paletteKey],
      typography: TYPOGRAPHY_PRESETS[typographyKey],
      industry: INDUSTRY_CONFIG[industryKey],
      isDark,
      sectionOrder: settings.layoutReorder || getFallbackTheme().sectionOrder,
      tokens: isDark ? themeDef.dark : themeDef.light,
    };
  }, [settings]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
