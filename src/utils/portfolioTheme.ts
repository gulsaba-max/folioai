/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Centralized theme configuration for all portfolio templates.
 */

export const COLOR_PALETTES: Record<string, { name: string; hex: string; rgb: string }> = {
  indigo:   { name: 'Indigo',   hex: '#6366f1', rgb: '99, 102, 241' },
  violet:   { name: 'Violet',   hex: '#8b5cf6', rgb: '139, 92, 246' },
  sky:      { name: 'Sky',      hex: '#0ea5e9', rgb: '14, 165, 233' },
  cyan:     { name: 'Cyan',     hex: '#06b6d4', rgb: '6, 182, 212' },
  teal:     { name: 'Teal',     hex: '#14b8a6', rgb: '20, 184, 166' },
  emerald:  { name: 'Emerald',  hex: '#10b981', rgb: '16, 185, 129' },
  green:    { name: 'Green',    hex: '#22c55e', rgb: '34, 197, 94' },
  lime:     { name: 'Lime',     hex: '#84cc16', rgb: '132, 204, 22' },
  amber:    { name: 'Amber',    hex: '#f59e0b', rgb: '245, 158, 11' },
  orange:   { name: 'Orange',   hex: '#f97316', rgb: '249, 115, 22' },
  red:      { name: 'Red',      hex: '#ef4444', rgb: '239, 68, 68' },
  rose:     { name: 'Rose',     hex: '#f43f5e', rgb: '244, 63, 94' },
  pink:     { name: 'Pink',     hex: '#ec4899', rgb: '236, 72, 153' },
  fuchsia:  { name: 'Fuchsia',  hex: '#d946ef', rgb: '217, 70, 239' },
  slate:    { name: 'Slate',    hex: '#64748b', rgb: '100, 116, 139' },
  zinc:     { name: 'Zinc',     hex: '#71717a', rgb: '113, 113, 122' },
};

export const TYPOGRAPHY_PRESETS: Record<string, { display: string; body: string; mono: string }> = {
  inter:         { display: "'Inter', sans-serif", body: "'Inter', sans-serif", mono: "'JetBrains Mono', monospace" },
  sora:          { display: "'Sora', sans-serif", body: "'Sora', sans-serif", mono: "'JetBrains Mono', monospace" },
  geist:         { display: "'Geist', sans-serif", body: "'Geist', sans-serif", mono: "'JetBrains Mono', monospace" },
  'plus-jakarta':{ display: "'Plus Jakarta Sans', sans-serif", body: "'Plus Jakarta Sans', sans-serif", mono: "'JetBrains Mono', monospace" },
  manrope:       { display: "'Manrope', sans-serif", body: "'Manrope', sans-serif", mono: "'JetBrains Mono', monospace" },
  'dm-sans':     { display: "'DM Sans', sans-serif", body: "'DM Sans', sans-serif", mono: "'JetBrains Mono', monospace" },
  outfit:        { display: "'Outfit', sans-serif", body: "'Outfit', sans-serif", mono: "'JetBrains Mono', monospace" },
  raleway:       { display: "'Raleway', sans-serif", body: "'Raleway', sans-serif", mono: "'JetBrains Mono', monospace" },
  nunito:        { display: "'Nunito', sans-serif", body: "'Nunito', sans-serif", mono: "'JetBrains Mono', monospace" },
  poppins:       { display: "'Poppins', sans-serif", body: "'Poppins', sans-serif", mono: "'JetBrains Mono', monospace" },
};

export const INDUSTRY_CONFIG: Record<string, { label: string; icon: string; accentShift: number }> = {
  tech:       { label: 'Technology', icon: '💻', accentShift: 0 },
  creative:   { label: 'Creative', icon: '🎨', accentShift: 30 },
  business:   { label: 'Business', icon: '📊', accentShift: 60 },
  writing:    { label: 'Writing', icon: '✍️', accentShift: 90 },
  design:     { label: 'Design', icon: '🎨', accentShift: 120 },
  finance:    { label: 'Finance', icon: '💰', accentShift: 150 },
  healthcare: { label: 'Healthcare', icon: '🏥', accentShift: 180 },
  education:  { label: 'Education', icon: '📚', accentShift: 210 },
  marketing:  { label: 'Marketing', icon: '📣', accentShift: 240 },
  legal:      { label: 'Legal', icon: '⚖️', accentShift: 270 },
};

export const DEFAULT_TYPOGRAPHY = TYPOGRAPHY_PRESETS.inter;
export const DEFAULT_PALETTE = COLOR_PALETTES.indigo;
export const DEFAULT_INDUSTRY = INDUSTRY_CONFIG.tech;

export function normalizeTypographyKey(raw: string | undefined): string {
  if (!raw) return 'inter';
  const key = raw.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  return TYPOGRAPHY_PRESETS[key] ? key : 'inter';
}

export function normalizePaletteKey(raw: string | undefined): string {
  if (!raw) return 'indigo';
  const key = raw.toLowerCase().trim();
  return COLOR_PALETTES[key] ? key : 'indigo';
}

export function normalizeIndustryKey(raw: string | undefined): string {
  if (!raw) return 'tech';
  const key = raw.toLowerCase().trim();
  return INDUSTRY_CONFIG[key] ? key : 'tech';
}
