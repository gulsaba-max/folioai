/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * TEMPLATE: ARCHITECTURAL GRID
 * Inspired by: blueprint drawings, modernist architecture, Le Corbusier
 * Features: strict grid, toggleable grid overlay, oversized year/stat anchors, column alignment
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Sun, Moon, Grid3X3, EyeOff } from 'lucide-react';
import type { TemplateProps } from './templateUtils';
import { GOOGLE_FONTS } from './templateUtils';
import { getThemeById } from './design-tokens';
import { SectionHeader, ContactFooter, SkillChip, TimelineItem } from './shared';

const THEME = getThemeById('architectural');

export default function ArchitecturalGridTemplate({
  portfolio, isDark, setActiveMode, socialLinks, handleSocialClick,
  handleSendMessage, visitorName, setVisitorName, visitorEmail, setVisitorEmail,
  visitorMsg, setVisitorMsg, formLoading, formSuccess, isDemo, hue, labels, sectionOrder
}: TemplateProps) {
  const [showGrid, setShowGrid] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const themeMap = isDark ? THEME.dark : THEME.light;
  const themeStyle = {
    '--theme-bg': themeMap.bg,
    '--theme-fg': themeMap.fg,
    '--theme-muted': themeMap.muted,
    '--theme-surface': themeMap.surface,
    '--theme-accent': themeMap.accent,
    '--theme-border': themeMap.border,
  } as React.CSSProperties;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'g' && !e.ctrlKey && !e.metaKey && !e.altKey &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName || '')) {
        setShowGrid(p => !p);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const toggleGrid = useCallback(() => setShowGrid(p => !p), []);

  return (
    <div className="min-h-screen font-body" style={{ ...themeStyle, fontFamily: "'Inter', 'Space Grotesk', sans-serif" }}>
      <link rel="stylesheet" href={GOOGLE_FONTS} />

      <style>{`
        .arch-grid-line { position: absolute; top: 0; bottom: 0; width: 1px; background: var(--theme-accent); opacity: 0.25; }
        .arch-hero-name { font-family: 'Space Grotesk', sans-serif; }
        .arch-stat { font-family: 'Space Grotesk', sans-serif; }
        .arch-year { font-family: 'Space Grotesk', sans-serif; }
        .arch-card-img { filter: grayscale(100%); transition: filter 0.4s ease; }
        .arch-card:hover .arch-card-img { filter: grayscale(0%); }
        @media (max-width: 767px) { .arch-grid-line { display: none; } }
        @media (prefers-reduced-motion: reduce) {
          .arch-card-img { transition: none; }
        }
      `}</style>

      {/* Grid Overlay */}
      {showGrid && (
        <div className="fixed inset-0 pointer-events-none z-50 hidden md:block" aria-hidden="true">
          <div className="max-w-7xl mx-auto h-full relative px-6 md:px-12">
            {Array.from({ length: 11 }).map((_, i) => (
              <div key={i} className="arch-grid-line" style={{ left: `${((i + 1) / 12) * 100}%` }} />
            ))}
          </div>
        </div>
      )}

      {/* Skip to content */}
      <a href="#arch-main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-semibold" style={{ background: 'var(--theme-accent)', color: 'var(--theme-bg)' }}>
        Skip to content
      </a>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 h-14 md:h-16" style={{ borderBottom: '1px solid var(--theme-border)', background: 'color-mix(in srgb, var(--theme-bg) 85%, transparent)', backdropFilter: 'blur(8px)' }} role="navigation" aria-label="Primary">
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--theme-fg)' }}>
          {portfolio.name?.split(' ')[0] || 'Architect'}
        </span>
        <div className="flex items-center gap-2">
          <button onClick={toggleGrid} aria-label={`Toggle grid overlay (key: G). Currently ${showGrid ? 'on' : 'off'}`} aria-pressed={showGrid} className="p-2 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1" style={{ color: 'var(--theme-muted)', '--tw-ring-color': 'var(--theme-accent)' } as React.CSSProperties}>
            {showGrid ? <EyeOff className="w-4 h-4" aria-hidden="true" /> : <Grid3X3 className="w-4 h-4" aria-hidden="true" />}
          </button>
          <button onClick={() => setActiveMode(isDark ? 'light' : 'dark')} aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`} className="p-2 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1" style={{ color: 'var(--theme-muted)', '--tw-ring-color': 'var(--theme-accent)' } as React.CSSProperties}>
            {isDark ? <Sun className="w-4 h-4" aria-hidden="true" /> : <Moon className="w-4 h-4" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <main id="arch-main">
        {/* Hero */}
        <section className="px-6 md:px-12 pt-28 pb-16 md:pt-36 md:pb-24 max-w-7xl mx-auto" aria-labelledby="hero-name">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
            <div className="md:col-span-7 lg:col-span-8">
              {portfolio.avatarUrl && (
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border mb-8" style={{ borderColor: 'var(--theme-border)' }}>
                  <img src={portfolio.avatarUrl} alt="" aria-hidden="true" className="w-full h-full object-cover arch-card-img" loading="lazy" />
                </div>
              )}
              <h1 id="hero-name" className="arch-hero-name text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-6" style={{ color: 'var(--theme-fg)' }}>
                {portfolio.name}
              </h1>
              <p className="text-base md:text-lg font-medium mb-4" style={{ color: 'var(--theme-accent)' }}>{portfolio.title}</p>
              <p className="text-sm md:text-base leading-relaxed max-w-2xl" style={{ color: 'var(--theme-muted)' }}>{portfolio.bio}</p>
            </div>

            {/* Stats */}
            <aside className="md:col-span-5 lg:col-span-4 flex flex-col gap-8 md:gap-10 md:border-l md:pl-8" style={{ borderColor: 'var(--theme-border)' }} aria-label="Key statistics">
              {portfolio.experience.length > 0 && (
                <div>
                  <div className="arch-stat text-5xl md:text-6xl font-bold tracking-tighter leading-none" style={{ color: 'var(--theme-accent)' }}>
                    {portfolio.experience.length}
                  </div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] mt-2" style={{ color: 'var(--theme-muted)' }}>
                    {portfolio.experience.length === 1 ? 'Year of' : 'Years of'} Experience
                  </div>
                </div>
              )}
              {portfolio.projects.length > 0 && (
                <div>
                  <div className="arch-stat text-5xl md:text-6xl font-bold tracking-tighter leading-none" style={{ color: 'var(--theme-accent)' }}>
                    {portfolio.projects.length}
                  </div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] mt-2" style={{ color: 'var(--theme-muted)' }}>
                    {portfolio.projects.length === 1 ? 'Project' : 'Projects'} Delivered
                  </div>
                </div>
              )}
              {portfolio.education.length > 0 && (
                <div>
                  <div className="arch-stat text-5xl md:text-6xl font-bold tracking-tighter leading-none" style={{ color: 'var(--theme-accent)' }}>
                    {portfolio.education[0].year}
                  </div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] mt-2" style={{ color: 'var(--theme-muted)' }}>
                    Graduated
                  </div>
                </div>
              )}
            </aside>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="h-px w-full" style={{ background: 'var(--theme-border)' }} />
        </div>

        {/* Skills */}
        {sectionOrder.includes('skills') && (
          <section id="portfolio-skills" className="px-6 md:px-12 py-16 md:py-20 max-w-7xl mx-auto" aria-labelledby="skills-heading">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
              <div className="md:col-span-3">
                <SectionHeader title={labels.skills} align="left" />
              </div>
              <div className="md:col-span-9">
                <div className="flex flex-wrap gap-2 md:gap-3" role="list" aria-label={labels.skills}>
                  {portfolio.skills.map((skill, i) => (
                    <SkillChip key={i} label={skill} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Projects */}
        {sectionOrder.includes('projects') && (
          <section id="portfolio-projects" className="px-6 md:px-12 py-16 md:py-20 max-w-7xl mx-auto" aria-labelledby="projects-heading">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
              <div className="md:col-span-3">
                <SectionHeader title={labels.projects} align="left" />
              </div>
              <div className="md:col-span-9">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  {portfolio.projects.map((project, i) => {
                    const blockHue = (parseInt(hue.hex.replace('#', ''), 16) + i * 15) % 360;
                    const blockColor = isDark ? `oklch(0.35 0.08 ${blockHue / 10})` : `oklch(0.88 0.04 ${blockHue / 10})`;
                    return (
                      <motion.article
                        key={project.id || i}
                        initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
                        whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={prefersReducedMotion ? {} : { duration: 0.5, delay: i * 0.08 }}
                        className="arch-card border rounded-lg overflow-hidden transition-all focus-within:ring-2 focus-within:ring-offset-1"
                        style={{ borderColor: 'var(--theme-border)', background: 'var(--theme-surface)', '--tw-ring-color': 'var(--theme-accent)', '--tw-ring-offset-color': 'var(--theme-bg)' } as React.CSSProperties}
                        tabIndex={0}
                        aria-label={`${project.title}${project.role ? `, ${project.role}` : ''}`}
                      >
                        <div className="w-full aspect-video" style={{ background: blockColor }} aria-hidden="true" />
                        <div className="p-5 md:p-6">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <h3 className="text-base md:text-lg font-semibold leading-tight" style={{ color: 'var(--theme-fg)' }}>{project.title}</h3>
                            {project.link && (
                              <a href={project.link} target="_blank" rel="noreferrer noopener" aria-label={`Open project "${project.title}" in new tab`} className="mt-1 flex-shrink-0 p-1.5 rounded-md transition-colors hover:opacity-70 focus:outline-none focus-visible:ring-1" style={{ color: 'var(--theme-accent)' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                              </a>
                            )}
                          </div>
                          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--theme-muted)' }}>{project.description}</p>
                          {project.techStack && project.techStack.length > 0 && (
                            <ul className="flex flex-wrap gap-2" aria-label={`Technologies used in ${project.title}`}>
                              {project.techStack.map((tech, ti) => (
                                <li key={ti} className="text-[10px] font-medium px-2 py-1 rounded border" style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-muted)', background: 'var(--theme-bg)' }}>{tech}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Experience */}
        {sectionOrder.includes('experience') && (
          <section id="portfolio-experience" className="px-6 md:px-12 py-16 md:py-20 max-w-7xl mx-auto" aria-labelledby="experience-heading">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
              <div className="md:col-span-3">
                <SectionHeader title={labels.experience} align="left" />
              </div>
              <div className="md:col-span-9">
                <div className="space-y-0">
                  {portfolio.experience.map((exp, i) => {
                    const yearMatch = exp.startDate.match(/\d{4}/);
                    const year = yearMatch ? yearMatch[0] : exp.startDate;
                    return (
                      <motion.div
                        key={exp.id || i}
                        initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
                        whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={prefersReducedMotion ? {} : { duration: 0.5, delay: i * 0.08 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8"
                        style={{ borderBottom: i < portfolio.experience.length - 1 ? '1px solid var(--theme-border)' : 'none' }}
                      >
                        <div className="md:col-span-3">
                          <div className="arch-year text-4xl md:text-5xl font-bold tracking-tighter leading-none" style={{ color: 'var(--theme-accent)' }}>
                            {year}
                          </div>
                        </div>
                        <div className="md:col-span-4">
                          <h3 className="text-base md:text-lg font-semibold mb-1" style={{ color: 'var(--theme-fg)' }}>{exp.role}</h3>
                          <p className="text-sm font-medium" style={{ color: 'var(--theme-accent)' }}>{exp.company}</p>
                        </div>
                        <div className="md:col-span-5">
                          <p className="text-sm leading-relaxed" style={{ color: 'var(--theme-muted)' }}>{exp.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Education */}
        {sectionOrder.includes('education') && (
          <section id="portfolio-education" className="px-6 md:px-12 py-16 md:py-20 max-w-7xl mx-auto" aria-labelledby="education-heading">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
              <div className="md:col-span-3">
                <SectionHeader title={labels.education} align="left" />
              </div>
              <div className="md:col-span-9">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  {portfolio.education.map((edu, i) => (
                    <motion.div
                      key={edu.id || i}
                      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={prefersReducedMotion ? {} : { duration: 0.5, delay: i * 0.1 }}
                      className="p-5 md:p-6 rounded-lg border"
                      style={{ borderColor: 'var(--theme-border)', background: 'var(--theme-surface)' }}
                    >
                      <h3 className="font-semibold text-base md:text-lg mb-1" style={{ color: 'var(--theme-fg)' }}>{edu.degree}</h3>
                      <p className="text-sm mb-2" style={{ color: 'var(--theme-muted)' }}>{edu.school}</p>
                      <p className="text-xs font-mono" style={{ color: 'var(--theme-accent)' }}>{edu.year}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Contact */}
        {sectionOrder.includes('contact') && (
          <section id="portfolio-contact" className="px-6 md:px-12 py-16 md:py-20 max-w-7xl mx-auto" aria-labelledby="contact-heading">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
              <div className="md:col-span-3">
                <SectionHeader title="Get in Touch" align="left" />
              </div>
              <div className="md:col-span-9">
                <ContactFooter
                  email={portfolio.contactEmail}
                  linkedin={portfolio.socialLinks.linkedin}
                  github={portfolio.socialLinks.github}
                  twitter={portfolio.socialLinks.twitter}
                  name={portfolio.name}
                />
                <div className="mt-10 max-w-lg">
                  {formSuccess && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-4 p-4 rounded-lg text-sm font-medium border" style={{ background: 'color-mix(in srgb, var(--theme-accent) 12%, transparent)', color: 'var(--theme-accent)', borderColor: 'color-mix(in srgb, var(--theme-accent) 30%, transparent)' }}>
                      {formSuccess}
                    </motion.div>
                  )}
                  <form onSubmit={handleSendMessage} className="space-y-4">
                    <label htmlFor="arch-name" className="sr-only">Your name</label>
                    <input id="arch-name" type="text" required placeholder="Your name" value={visitorName} onChange={e => setVisitorName(e.target.value)} className="w-full px-4 py-3 rounded-md text-sm outline-none transition-colors border focus:ring-2" style={{ background: 'var(--theme-surface)', borderColor: 'var(--theme-border)', color: 'var(--theme-fg)', '--tw-ring-color': 'var(--theme-accent)' } as React.CSSProperties} onFocus={e => (e.currentTarget.style.borderColor = 'var(--theme-accent)')} onBlur={e => (e.currentTarget.style.borderColor = 'var(--theme-border)')} />
                    <label htmlFor="arch-email" className="sr-only">Email address</label>
                    <input id="arch-email" type="email" required placeholder="Email address" value={visitorEmail} onChange={e => setVisitorEmail(e.target.value)} className="w-full px-4 py-3 rounded-md text-sm outline-none transition-colors border focus:ring-2" style={{ background: 'var(--theme-surface)', borderColor: 'var(--theme-border)', color: 'var(--theme-fg)', '--tw-ring-color': 'var(--theme-accent)' } as React.CSSProperties} onFocus={e => (e.currentTarget.style.borderColor = 'var(--theme-accent)')} onBlur={e => (e.currentTarget.style.borderColor = 'var(--theme-border)')} />
                    <label htmlFor="arch-msg" className="sr-only">Your message</label>
                    <textarea id="arch-msg" rows={4} required placeholder="Your message..." value={visitorMsg} onChange={e => setVisitorMsg(e.target.value)} className="w-full px-4 py-3 rounded-md text-sm outline-none transition-colors border resize-none focus:ring-2" style={{ background: 'var(--theme-surface)', borderColor: 'var(--theme-border)', color: 'var(--theme-fg)', '--tw-ring-color': 'var(--theme-accent)' } as React.CSSProperties} onFocus={e => (e.currentTarget.style.borderColor = 'var(--theme-accent)')} onBlur={e => (e.currentTarget.style.borderColor = 'var(--theme-border)')} />
                    <motion.button whileHover={prefersReducedMotion ? {} : { scale: 1.01 }} whileTap={prefersReducedMotion ? {} : { scale: 0.98 }} type="submit" disabled={formLoading} className="w-full md:w-auto px-6 py-3 rounded-md text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 disabled:opacity-60 cursor-pointer" style={{ background: 'var(--theme-accent)', color: 'var(--theme-bg)', '--tw-ring-color': 'var(--theme-accent)' } as React.CSSProperties}>
                      {formLoading ? 'Sending...' : 'Send Message'}
                    </motion.button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t px-6 md:px-12 py-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: 'var(--theme-border)' }} role="contentinfo" aria-label="Portfolio footer">
        <p className="text-xs" style={{ color: 'var(--theme-muted)' }}>© {new Date().getFullYear()} {portfolio.name}. All rights reserved.</p>
        <div className="flex items-center gap-4">
          {socialLinks.map(({ key, url, Icon }) => (
            <a key={key} href={url} target="_blank" rel="noreferrer" onClick={() => handleSocialClick(key)} aria-label={`Visit ${key} profile`} className="transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-1 rounded" style={{ color: 'var(--theme-muted)' }}>
              <Icon className="w-4 h-4" aria-hidden="true" />
            </a>
          ))}
        </div>
        <p className="text-xs" style={{ color: 'var(--theme-muted)' }}>Built with precision</p>
      </footer>
    </div>
  );
}
