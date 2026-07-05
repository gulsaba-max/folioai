/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * BENTO GRID TEMPLATE
 * Apple-inspired modular layout with rounded cards, soft shadows, and a structured grid.
 * Responsive: 12-col desktop, 4-col tablet, 1-col mobile.
 */

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { MapPin } from "lucide-react";
import type { TemplateProps } from "./templateUtils";
import { getThemeById } from "./design-tokens";
import { ContactFooter, PrintButton, ProjectCard, SectionHeader, SkillChip, TimelineItem } from "./shared";

const BENTO_ID = "bento" as const;

const SPANS: Record<string, { d: number; t: number }> = {
  hero: { d: 12, t: 4 },
  portrait: { d: 4, t: 4 },
  quote: { d: 8, t: 4 },
  stats: { d: 4, t: 4 },
  skills: { d: 4, t: 4 },
  projects: { d: 8, t: 4 },
  timeline: { d: 12, t: 4 },
  contact: { d: 12, t: 4 },
};

function Cell({ children, name, className = "" }: {
  children: React.ReactNode;
  name: string;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const span = SPANS[name] || { d: 12, t: 4 };

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={prefersReducedMotion ? {} : { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={prefersReducedMotion ? {} : { scale: 1.015, y: -2 }}
      className={`rounded-2xl border border-white/20 dark:border-slate-700/30 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow duration-300 focus-within:ring-2 focus-within:ring-offset-2 ${className}`}
      style={{
        background: "var(--theme-surface)",
        borderColor: "var(--theme-border)",
        "--tw-ring-color": "var(--theme-accent, #6366f1)",
        "--tw-ring-offset-color": "var(--theme-bg, #fff)",
        "--desktop-span": span.d,
        "--tablet-span": span.t,
        gridColumn: "span 12",
      } as React.CSSProperties}
    >
      {children}
    </motion.div>
  );
}

function EmptyCell({ label }: { label: string }) {
  return (
    <div
      className="relative rounded-2xl border flex items-center justify-center overflow-hidden"
      style={{
        background: "var(--theme-surface)",
        borderColor: "var(--theme-border)",
        minHeight: 140,
        gridColumn: "span 12",
      }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: "radial-gradient(circle, var(--theme-muted) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <span className="relative text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--theme-muted)" }}>
        {label}
      </span>
    </div>
  );
}

export default function BentoTemplate({
  portfolio, isDark, setActiveMode, socialLinks, handleSocialClick,
  handleSendMessage, visitorName, setVisitorName, visitorEmail, setVisitorEmail,
  visitorMsg, setVisitorMsg, formLoading, formSuccess, isDemo, hue, labels, sectionOrder
}: TemplateProps) {
  const theme = getThemeById(BENTO_ID);
  const palette = isDark ? theme.dark : theme.light;
  const prefersReducedMotion = useReducedMotion();
  const hasProjects = portfolio.projects && portfolio.projects.length > 0;
  const hasExperience = portfolio.experience && portfolio.experience.length > 0;

  return (
    <div
      className="min-h-screen"
      style={{
        background: palette.bg,
        color: palette.fg,
        fontFamily: "'Inter', sans-serif",
        "--theme-bg": palette.bg,
        "--theme-fg": palette.fg,
        "--theme-muted": palette.muted,
        "--theme-surface": palette.surface,
        "--theme-accent": palette.accent,
        "--theme-border": palette.border,
      } as React.CSSProperties}
    >
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" />

      <style>{`
        .bento-grid {
          display: grid;
          gap: 1rem;
          grid-template-columns: repeat(1, 1fr);
        }
        @media (min-width: 640px) {
          .bento-grid { grid-template-columns: repeat(4, 1fr); }
          .bento-grid > * { grid-column: span var(--tablet-span, 4); }
        }
        @media (min-width: 1024px) {
          .bento-grid { grid-template-columns: repeat(12, 1fr); }
          .bento-grid > * { grid-column: span var(--desktop-span, 12); }
        }
      `}</style>

      <div className="bento-grid max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">

        {/* Hero */}
        <Cell name="hero" className="p-6 md:p-10">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div
              className="w-20 h-20 md:w-28 md:h-28 rounded-2xl flex-shrink-0 border-2 flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${hue.hex}40, ${hue.hex}20)`,
                borderColor: "var(--theme-border)",
              }}
              aria-hidden="true"
            >
              <span className="text-3xl md:text-4xl font-bold" style={{ color: "var(--theme-accent)", fontFamily: "'Space Grotesk', sans-serif" }}>
                {portfolio.name?.charAt(0)?.toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              {portfolio.location && (
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-3.5 h-3.5" style={{ color: "var(--theme-accent)" }} aria-hidden="true" />
                  <span className="text-xs tracking-wider uppercase" style={{ color: "var(--theme-muted)" }}>
                    {portfolio.location}
                  </span>
                </div>
              )}
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {portfolio.name}
              </h1>
              <p className="text-base md:text-lg font-semibold mb-3" style={{ color: "var(--theme-accent)" }}>
                {portfolio.title}
              </p>
              <p className="text-sm md:text-base leading-relaxed max-w-2xl" style={{ color: "var(--theme-muted)" }}>
                {portfolio.bio}
              </p>
            </div>
          </div>
        </Cell>

        {/* Portrait */}
        <Cell name="portrait" className="p-6 md:p-8 flex flex-col items-center justify-center text-center">
          <div
            className="w-full aspect-square max-w-[220px] rounded-2xl border-2 flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${hue.hex}30, ${hue.hex}10)`,
              borderColor: "var(--theme-border)",
            }}
            role="img"
            aria-label={`Portrait placeholder for ${portfolio.name}`}
          >
            <span className="text-5xl font-bold" style={{ color: "var(--theme-accent)", fontFamily: "'Space Grotesk', sans-serif" }}>
              {portfolio.name?.charAt(0)?.toUpperCase()}
            </span>
          </div>
          <h3 className="mt-4 text-base font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {portfolio.name}
          </h3>
          <p className="text-xs mt-1" style={{ color: "var(--theme-muted)" }}>
            {portfolio.title}
          </p>
        </Cell>

        {/* Quote */}
        <Cell name="quote" className="p-6 md:p-8 flex flex-col justify-center">
          <blockquote className="text-base md:text-lg font-medium leading-relaxed" style={{ color: "var(--theme-fg)" }}>
            "{portfolio.bio}"
          </blockquote>
          <cite className="mt-3 text-xs not-italic font-semibold uppercase tracking-wider block" style={{ color: "var(--theme-muted)" }}>
            — {portfolio.name}
          </cite>
        </Cell>

        {/* Stats */}
        <Cell name="stats" className="p-6 md:p-8">
          <SectionHeader kicker="Overview" title="Stats" align="left" />
          <div className="grid grid-cols-2 gap-3 mt-4" role="list" aria-label="Portfolio statistics">
            {[
              { label: "Projects", value: portfolio.projects?.length || 0 },
              { label: "Skills", value: portfolio.skills?.length || 0 },
              { label: "Roles", value: portfolio.experience?.length || 0 },
              { label: "Degrees", value: portfolio.education?.length || 0 },
            ].map((stat, i) => (
              <div key={i} className="p-3 rounded-xl border border-white/20 dark:border-slate-700/30 shadow-[0_8px_30px_rgba(0,0,0,0.04)]" style={{ borderColor: "var(--theme-border)", background: "var(--theme-bg)" }} role="listitem">
                <p className="text-xl font-bold" style={{ color: "var(--theme-accent)", fontFamily: "'Space Grotesk', sans-serif" }}>
                  {stat.value}
                </p>
                <p className="text-[11px] mt-0.5 uppercase tracking-wider" style={{ color: "var(--theme-muted)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Cell>

        {/* Skills */}
        <Cell name="skills" className="p-6 md:p-8">
          <SectionHeader kicker="Expertise" title={labels.skills} align="left" />
          <ul className="flex flex-wrap gap-2 mt-4" aria-label={labels.skills} role="list">
            {portfolio.skills?.map((skill, i) => (
              <SkillChip key={i} label={skill} />
            ))}
          </ul>
        </Cell>

        {/* Projects */}
        <Cell name="projects" className="p-6 md:p-8">
          <SectionHeader kicker="Work" title={labels.projects} align="left" />
          {hasProjects ? (
            <div className="grid gap-4 mt-4">
              {portfolio.projects!.slice(0, 4).map((p, i) => (
                <ProjectCard key={p.id || i} title={p.title} description={p.description} techStack={p.techStack} link={p.link} index={i} />
              ))}
            </div>
          ) : (
            <EmptyCell label="Projects" />
          )}
        </Cell>

        {/* Timeline */}
        <Cell name="timeline" className="p-6 md:p-8">
          <SectionHeader kicker="Career" title={labels.experience} align="left" />
          {hasExperience ? (
            <div role="list" className="mt-4">
              {portfolio.experience!.map((exp, i) => (
                <TimelineItem
                  key={exp.id}
                  title={exp.role}
                  subtitle={exp.company}
                  date={`${exp.startDate} — ${exp.endDate}`}
                  description={exp.description}
                  index={i}
                  showConnector={i < portfolio.experience!.length - 1}
                />
              ))}
            </div>
          ) : (
            <EmptyCell label="Experience" />
          )}
        </Cell>

        {/* Contact */}
        <Cell name="contact" className="p-6 md:p-8">
          <ContactFooter
            email={portfolio.contactEmail}
            linkedin={portfolio.socialLinks?.linkedin}
            github={portfolio.socialLinks?.github}
            twitter={portfolio.socialLinks?.twitter}
            name={portfolio.name}
          />
        </Cell>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <PrintButton />
      </div>
    </div>
  );
}
