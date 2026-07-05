/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ProjectCard — Accessible card for portfolio projects with hover lift, focus ring, and print hidden.
 */

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

export interface ProjectCardProps {
  title: string;
  description: string;
  techStack?: string[];
  link?: string;
  image?: string;
  index?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title, description, techStack, link, image, index = 0
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [isFocused, setIsFocused] = useState(false);

  const cardContent = (
    <article
      className="relative rounded-xl border border-border-subtle transition-shadow duration-300 focus-within:ring-2 focus-within:ring-offset-2 bg-white"
      style={{
        '--tw-ring-color': 'var(--theme-accent, #6366f1)',
        '--tw-ring-offset-color': 'var(--theme-bg, #fff)'
      } as React.CSSProperties}
    >
      {image && (
        <div className="w-full aspect-video overflow-hidden rounded-t-xl">
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3
            className="text-lg md:text-xl font-semibold leading-tight"
            style={{ color: 'var(--theme-fg, #111)' }}
          >
            {title}
          </h3>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Open project "${title}" in new tab`}
              className="mt-1 flex-shrink-0 p-1.5 rounded-lg transition-colors hover:opacity-70"
              style={{ color: 'var(--theme-accent, #6366f1)' }}
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          )}
        </div>
        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: 'var(--theme-muted, #666)' }}
        >
          {description}
        </p>
        {techStack && techStack.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label={`Technologies used in ${title}`}>
            {techStack.map((tech) => (
              <li
                key={tech}
                className="text-xs px-2.5 py-1 rounded-md font-medium border"
                style={{
                  color: 'var(--theme-accent, #6366f1)',
                  borderColor: 'var(--theme-border, #e5e5e5)',
                  background: 'var(--theme-bg, #fff)'
                }}
              >
                {tech}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={prefersReducedMotion ? {} : { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.08 }}
      whileHover={prefersReducedMotion ? {} : { scale: 1.01 }}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={() => setIsFocused(false)}
      className="print:hidden"
    >
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noreferrer noopener"
          className="block focus:outline-none"
          style={{ textDecoration: 'none' }}
        >
          {cardContent}
        </a>
      ) : (
        <div className="block focus-within:ring-2 focus-within:ring-offset-2 rounded-xl" style={{ '--tw-ring-color': 'var(--theme-accent, #6366f1)' } as React.CSSProperties}>
          {cardContent}
        </div>
      )}
    </motion.div>
  );
};
