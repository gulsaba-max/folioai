/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * TEMPLATE 4: MONO LUX
 * Minimal monochrome luxury with stark contrast, refined spacing, and timeless sophistication.
 */
import React, { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { TemplateProps } from './templateUtils';
import { getThemeById } from './design-tokens';
import { SectionHeader, SkillChip, TimelineItem } from './shared';

const themeDef = getThemeById('mono-lux');
const FONT_DISPLAY = "'Space Grotesk', 'Inter', sans-serif";

interface ProjectItemProps {
  project: TemplateProps['portfolio']['projects'][number];
  hue: string;
  index: number;
}
const ProjectItem = (props: ProjectItemProps & { key?: React.Key | number }) => {
  const { project, hue } = props;
  const [open, setOpen] = useState(false);
  const [h, setH] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (ref.current && open) setH(ref.current.scrollHeight);
  }, [open]);

  return (
    <div className="border-t" style={{ borderColor: 'var(--mono-border)' }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="w-full text-left py-4 flex justify-between items-center gap-4 bg-transparent border-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{
          color: 'var(--mono-fg)',
          '--tw-ring-color': 'var(--mono-accent)',
          '--tw-ring-offset-color': 'var(--mono-bg)'
        } as React.CSSProperties}
      >
        <span className="font-medium tracking-wide">{project.title}</span>
        <span
          className="text-xs uppercase tracking-widest transition-transform duration-300"
          style={{ color: 'var(--mono-muted)', transform: open ? 'rotate(45deg)' : undefined }}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <motion.div
        style={{ height: open ? h : 0, overflow: 'hidden' }}
        animate={{ height: open ? h : 0 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }
        }
      >
        <div ref={ref} className="pb-6 space-y-4">
          <div
            className="w-full aspect-video solid-block transition-opacity duration-500"
            style={{ background: hue, opacity: open ? 0.15 : 0 }}
            aria-hidden="true"
          />
          <p className="text-sm leading-relaxed" style={{ color: 'var(--mono-muted)' }}>
            {project.description}
          </p>
          {project.techStack?.length > 0 && (
            <ul className="flex flex-wrap gap-2" aria-label={`Technologies: ${project.title}`}>
              {project.techStack.map(t => (
                <li
                  key={t}
                  className="text-xs px-2.5 py-1 rounded border"
                  style={{ color: 'var(--mono-muted)', borderColor: 'var(--mono-border)', background: 'var(--mono-bg)' }}
                >
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default function MonoLuxTemplate({
  portfolio, isDark, labels, sectionOrder, hue
}: TemplateProps) {
  const tokens = isDark ? themeDef.dark : themeDef.light;
  const prefersReducedMotion = useReducedMotion();
  const hex = hue.hex;

  const cssVars = {
    '--mono-bg': tokens.bg,
    '--mono-fg': tokens.fg,
    '--mono-muted': tokens.muted,
    '--mono-surface': tokens.surface,
    '--mono-accent': tokens.accent,
    '--mono-border': tokens.border,
  } as React.CSSProperties;

  return (
    <div
      className="min-h-screen"
      style={{
        ...cssVars,
        background: 'var(--mono-bg)',
        color: 'var(--mono-fg)',
        fontFamily: FONT_DISPLAY,
      }}
    >
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" />

      <style>{`
        a.mono-link {
          position: relative;
          display: inline-block;
          color: var(--mono-fg);
          text-decoration: none;
        }
        a.mono-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -1px;
          width: 0;
          height: 1px;
          background: currentColor;
          transition: width 0.3s ease;
        }
        a.mono-link:hover::after,
        a.mono-link:focus-visible::after {
          width: 100%;
        }
        .hairline { border-color: var(--mono-border); }
        .solid-block { background: var(--mono-border); }

        @media (prefers-reduced-motion: reduce) {
          a.mono-link::after { transition: none; }
        }

        :focus-visible {
          outline: 2px solid var(--mono-accent);
          outline-offset: 2px;
        }
        button::-moz-focus-inner { border: 0; }
      `}</style>

      <main
        className="mx-auto px-6 py-20 md:py-32"
        style={{ maxWidth: 640 }}
      >
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-thin tracking-widest uppercase leading-none">
            {portfolio.name}
          </h1>
          {portfolio.title && (
            <p className="mt-4 text-sm font-medium tracking-wide uppercase" style={{ color: 'var(--mono-muted)' }}>
              {portfolio.title}
            </p>
          )}
          {portfolio.bio && (
            <p className="mt-6 text-base leading-relaxed" style={{ color: 'var(--mono-muted)' }}>
              {portfolio.bio}
            </p>
          )}
          {portfolio.location && (
            <p className="mt-4 text-xs tracking-widest uppercase" style={{ color: 'var(--mono-muted)' }}>
              {portfolio.location}
            </p>
          )}
        </header>

        <div className="hairline h-px mb-16" />

        {sectionOrder.map(sectionId => {
          if (sectionId === 'skills') {
            return (
              <section key={sectionId} id={`portfolio-${sectionId}`} className="mb-16">
                <SectionHeader title={labels.skills} align="left" />
                <ul className="flex flex-wrap gap-3" role="list">
                  {portfolio.skills.map(s => (
                    <SkillChip key={s} label={s} />
                  ))}
                </ul>
              </section>
            );
          }

          if (sectionId === 'projects') {
            return (
              <section key={sectionId} id={`portfolio-${sectionId}`} className="mb-16">
                <SectionHeader title={labels.projects} align="left" />
                <div className="hairline border-t">
                  {portfolio.projects.map((p, i) => (
                    <ProjectItem key={p.id || i} project={p} hue={hex} index={i} />
                  ))}
                </div>
              </section>
            );
          }

          if (sectionId === 'experience') {
            return (
              <section key={sectionId} id={`portfolio-${sectionId}`} className="mb-16">
                <SectionHeader title={labels.experience} align="left" />
                <div className="hairline border-t">
                  {portfolio.experience.map((exp, i) => (
                    <TimelineItem
                      key={exp.id}
                      title={exp.role}
                      subtitle={exp.company}
                      date={`${exp.startDate} – ${exp.endDate}`}
                      description={exp.description}
                      index={i}
                    />
                  ))}
                </div>
              </section>
            );
          }

          if (sectionId === 'education') {
            return (
              <section key={sectionId} id={`portfolio-${sectionId}`} className="mb-16">
                <SectionHeader title={labels.education} align="left" />
                <div className="space-y-0">
                  {portfolio.education.map((edu, i) => (
                    <motion.div
                      key={edu.id}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={prefersReducedMotion ? {} : { delay: i * 0.1, duration: 0.4 }}
                      className="py-6 hairline border-t first:border-t-0"
                    >
                      <h3 className="font-medium" style={{ color: 'var(--mono-fg)' }}>{edu.degree}</h3>
                      <p className="text-sm mt-1" style={{ color: 'var(--mono-muted)' }}>{edu.school}</p>
                      <time
                        className="text-xs font-mono tracking-widest uppercase mt-2 block"
                        style={{ color: 'var(--mono-muted)' }}
                        dateTime={edu.year}
                      >
                        {edu.year}
                      </time>
                    </motion.div>
                  ))}
                </div>
              </section>
            );
          }

          if (sectionId === 'contact') {
            return (
              <section key={sectionId} id={`portfolio-${sectionId}`} className="mb-16">
                <SectionHeader title="Get in Touch" align="left" />
                <div className="hairline border-t pt-6">
                  <a href={`mailto:${portfolio.contactEmail}`} className="mono-link text-sm">
                    {portfolio.contactEmail}
                  </a>
                  {portfolio.contactPhone && (
                    <p className="text-sm mt-2" style={{ color: 'var(--mono-muted)' }}>
                      {portfolio.contactPhone}
                    </p>
                  )}
                </div>
              </section>
            );
          }

          return null;
        })}
      </main>

      <footer
        className="hairline border-t"
        style={{ maxWidth: 640, margin: '0 auto', padding: '2rem 1.5rem' }}
        role="contentinfo"
        aria-label="Portfolio footer"
      >
        <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--mono-muted)' }}>
          © {new Date().getFullYear()} {portfolio.name}
        </p>
      </footer>
    </div>
  );
}
