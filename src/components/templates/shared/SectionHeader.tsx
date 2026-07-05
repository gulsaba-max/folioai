/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * SectionHeader — Accessible section header with kicker, title, and description.
 * Supports optional alignment and respects prefers-reduced-motion.
 */

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export interface SectionHeaderProps {
  kicker?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
}

const alignClassMap: Record<string, string> = {
  left: 'text-left items-start',
  center: 'text-center items-center',
  right: 'text-right items-end'
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  kicker, title, description, align = 'left'
}) => {
  const prefersReducedMotion = useReducedMotion();
  const alignClasses = alignClassMap[align] ?? alignClassMap.left;

  return (
    <div
      className={`flex flex-col gap-2 mb-8 ${alignClasses}`}
    >
      {kicker && (
        <motion.span
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 8 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={prefersReducedMotion ? {} : { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-[10px] font-semibold tracking-[0.25em] uppercase"
          style={{ color: 'var(--theme-muted, #888)' }}
          aria-hidden="true"
        >
          {kicker}
        </motion.span>
      )}
      <motion.h2
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
        whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={prefersReducedMotion ? {} : { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-3xl md:text-4xl font-bold tracking-tight"
        style={{ color: 'var(--theme-fg, #111)' }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={prefersReducedMotion ? {} : { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          className="text-sm md:text-base max-w-2xl leading-relaxed"
          style={{ color: 'var(--theme-muted, #666)' }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};
