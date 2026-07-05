/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * SkillChip — Accessible skill indicator with dot and bar proficiency variants.
 * Keyboard navigable with aria labels and respects prefers-reduced-motion.
 */

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export type SkillChipVariant = 'dot' | 'bar';

export interface SkillChipProps {
  label: string;
  proficiency?: number;
  variant?: SkillChipVariant;
}

export const SkillChip: React.FC<SkillChipProps> = ({
  label, proficiency = 0, variant = 'dot'
}) => {
  const prefersReducedMotion = useReducedMotion();
  const normalizedProficiency = Math.max(0, Math.min(100, proficiency));

  const renderProficiencyIndicator = () => {
    if (!proficiency || normalizedProficiency === 0) return null;

    if (variant === 'dot') {
      const dotColor = normalizedProficiency >= 80
        ? 'oklch(0.55 0.15 150)'
        : normalizedProficiency >= 50
          ? 'oklch(0.70 0.12 80)'
          : 'oklch(0.75 0.08 70)';

      return (
        <span
          className="inline-block w-2 h-2 rounded-full ml-2 flex-shrink-0"
          style={{ background: dotColor }}
          aria-hidden="true"
          title={`${normalizedProficiency}% proficiency`}
        />
      );
    }

    return (
      <span
        className="inline-block h-1.5 rounded-full ml-2 flex-shrink-0"
        style={{
          width: `${Math.max(16, normalizedProficiency * 0.6)}px`,
          background: 'var(--theme-accent, #6366f1)',
          opacity: 0.7
        }}
        aria-hidden="true"
      />
    );
  };

  return (
    <motion.span
      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={prefersReducedMotion ? {} : { duration: 0.3 }}
      tabIndex={0}
      role="listitem"
      aria-label={`${label}${proficiency ? `, ${normalizedProficiency}% proficiency` : ''}`}
      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 cursor-default"
      style={{
        background: 'var(--theme-bg, #fff)',
        borderColor: 'var(--theme-border, #e5e5e5)',
        color: 'var(--theme-fg, #111)',
        '--tw-ring-color': 'var(--theme-accent, #6366f1)',
        '--tw-ring-offset-color': 'var(--theme-surface, #fff)'
      } as React.CSSProperties}
    >
      {label}
      {renderProficiencyIndicator()}
    </motion.span>
  );
};
