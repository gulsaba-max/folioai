/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * TimelineItem — Accessible timeline entry with optional connector line and year marker.
 * Respects prefers-reduced-motion.
 */

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export interface TimelineItemProps {
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
  showConnector?: boolean;
  yearMarker?: string;
  index?: number;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  title, subtitle, date, description, showConnector = true, yearMarker, index = 0
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={prefersReducedMotion ? {} : { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.1 }}
      className="relative flex gap-4 md:gap-6"
      role="listitem"
      aria-label={`${title}${subtitle ? ` at ${subtitle}` : ''}${date ? `, ${date}` : ''}`}
    >
      {/* Timeline spine */}
      {showConnector && (
        <div className="flex flex-col items-center" aria-hidden="true">
          <span
            className="w-3 h-3 rounded-full border-2 flex-shrink-0 mt-1"
            style={{
              borderColor: 'var(--theme-accent, #6366f1)',
              background: 'var(--theme-surface, #fff)'
            }}
          />
          {index < 99 && (
            <span
              className="w-px flex-1 my-1"
              style={{ background: 'var(--theme-border, #e5e5e5)' }}
            />
          )}
        </div>
      )}

      <div className="flex-1 pb-8">
        {yearMarker && (
          <div
            className="text-xs font-semibold tracking-wider uppercase mb-1"
            style={{ color: 'var(--theme-accent, #6366f1)' }}
            aria-hidden="true"
          >
            {yearMarker}
          </div>
        )}
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-1">
          <h3
            className="text-base md:text-lg font-semibold"
            style={{ color: 'var(--theme-fg, #111)' }}
          >
            {title}
          </h3>
          {subtitle && (
            <span
              className="text-sm font-medium"
              style={{ color: 'var(--theme-accent, #6366f1)' }}
            >
              {subtitle}
            </span>
          )}
        </div>
        {(date || description) && (
          <div className="flex flex-col gap-1">
            {date && (
              <time
                className="text-xs font-mono"
                style={{ color: 'var(--theme-muted, #666)' }}
                dateTime={date}
              >
                {date}
              </time>
            )}
            {description && (
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--theme-muted, #666)' }}
              >
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};
