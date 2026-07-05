/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * VINTAGE MODERN TEMPLATE
 * Retro-modern blend with warm patina, paper texture, typographic elegance.
 */

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Sun, Moon, ExternalLink, ChevronRight } from "lucide-react";
import type { TemplateProps } from "./templateUtils";
import { GOOGLE_FONTS } from "./templateUtils";
import { getThemeById, cssVarToStyle } from "./design-tokens";
import { SectionHeader } from "./shared/SectionHeader";
import { SkillChip } from "./shared/SkillChip";
import { TimelineItem } from "./shared/TimelineItem";
import { ContactFooter } from "./shared/ContactFooter";

const themeDef = getThemeById("vintage-modern");
const ACCENT = "oklch(0.55 0.10 70)";
const NOISE_SVG = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E`;
const SIG = (n: string) => `<svg viewBox='0 0 320 60' xmlns='http://www.w3.org/2000/svg'><path d='M10 40 Q 30 10, 60 30 T 120 25 T 180 20 T 240 15 T 300 10' fill='none' stroke='currentColor' stroke-width='2.5' stroke-linecap='round'/><text x='10' y='50' font-family='Playfair Display,serif' font-style='italic' font-size='14' fill='currentColor' opacity='0.7'>${n}</text></svg>`;

const PROFICIENCY: Record<string, number> = { working: 55, proficient: 80, learning: 30 };

export default function VintageModernTemplate({
  portfolio, isDark, setActiveMode, socialLinks, handleSocialClick,
  handleSendMessage, visitorName, setVisitorName, visitorEmail, setVisitorEmail,
  visitorMsg, setVisitorMsg, formLoading, formSuccess, isDemo, hue, labels, sectionOrder
}: TemplateProps) {
  const motionPref = useReducedMotion();
  const theme = isDark ? themeDef.dark : themeDef.light;
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const visibleSections = sectionOrder.filter(s => !["hero", "about", "social-feed"].includes(s));
  const profileInitial = portfolio.name?.charAt(0).toUpperCase() ?? "?";
  const skillClusters = [
    { label: "Working Knowledge", items: portfolio.skills.slice(0, Math.ceil(portfolio.skills.length / 3)), level: "working" as const },
    { label: "Proficient", items: portfolio.skills.slice(Math.ceil(portfolio.skills.length / 3), Math.ceil(portfolio.skills.length * 2 / 3)), level: "proficient" as const },
    { label: "Learning", items: portfolio.skills.slice(Math.ceil(portfolio.skills.length * 2 / 3)), level: "learning" as const },
  ];

  return (
    <div className="min-h-screen relative" style={{
      ...cssVarToStyle(theme),
      background: "oklch(0.97 0.008 80)", color: "var(--theme-fg)", fontFamily: "'DM Sans',sans-serif"
    }}>
      <link rel="stylesheet" href={GOOGLE_FONTS} />
      <style>{`
        @import url(${GOOGLE_FONTS});
        .font-display{font-family:'Playfair Display',serif} .font-mono{font-family:'JetBrains Mono',monospace}
        .noise-bg{position:absolute;inset:0;pointer-events:none;z-index:0;background-image:url("${NOISE_SVG}");background-repeat:repeat;opacity:0.5}
        .content-layer{position:relative;z-index:1}
        .accordion-track{display:flex;gap:0.75rem;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:0.75rem;scrollbar-width:thin;scrollbar-color:var(--theme-border) transparent}
        .accordion-track::-webkit-scrollbar{height:4px} .accordion-track::-webkit-scrollbar-thumb{background:var(--theme-border);border-radius:4px}
        .accordion-card{scroll-snap-align:start;flex:0 0 auto;width:220px;min-width:220px;border-radius:0.75rem;border:1px solid var(--theme-border);background:var(--theme-surface);cursor:pointer;overflow:hidden;transition:width 0.4s cubic-bezier(0.25,0.46,0.45,0.94),min-width 0.4s cubic-bezier(0.25,0.46,0.45,0.94)}
        .accordion-card.expanded{width:42vw;min-width:320px;box-shadow:0 4px 20px rgba(0,0,0,0.06)}
        @media(max-width:640px){.accordion-card.expanded{width:85vw;min-width:0}}
        .word-bar-track{height:6px;border-radius:3px;overflow:hidden;background:var(--theme-bg);border:1px solid var(--theme-border)}
        .word-bar-fill{height:100%;border-radius:2px;background:linear-gradient(90deg,${isDark?"oklch(0.45 0.10 70)":"oklch(0.65 0.10 70)"},${isDark?"oklch(0.55 0.12 70)":"oklch(0.55 0.10 70)"});transition:width 0.7s ease}
        @media(prefers-reduced-motion:reduce){.word-bar-fill{transition:none}.accordion-card{transition:none}}
        .skip-link{position:absolute;top:-100px;left:1rem;z-index:100;background:var(--theme-accent,${hue.hex});color:#fff;padding:.5rem 1rem;border-radius:.25rem;text-decoration:none;font-size:.875rem;font-weight:600;transition:top .2s}
        .skip-link:focus{top:1rem}
        @media print{.no-print{display:none !important}.noise-bg{display:none !important}}
      `}</style>
      <a href="#portfolio-main" className="skip-link">Skip to content</a>

      <div className="noise-bg" aria-hidden="true" />

      <header className="content-layer border-b" style={{ borderColor: "var(--theme-border)" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-display text-lg font-bold italic" style={{ color: "var(--theme-fg)" }}>{portfolio.name?.split(" ")[0] ?? "Portfolio"}</span>
            <span className="hidden sm:inline text-xs font-mono px-2 py-0.5 rounded border" style={{ color: "var(--theme-muted)", borderColor: "var(--theme-border)" }}>{new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-3">
            <nav className="hidden md:flex items-center gap-6 no-print" aria-label="Section navigation">
              {visibleSections.slice(0,4).map(s => (<a key={s} href={`#portfolio-${s}`} className="text-xs font-semibold tracking-wide uppercase transition-opacity hover:opacity-60 focus:outline-none focus-visible:ring-2 rounded" style={{ color: "var(--theme-muted)" }}>{labels[s as keyof typeof labels] ?? s}</a>))}
            </nav>
            <div className="flex items-center gap-2">
              {socialLinks.slice(0,3).map(({ key, url, Icon }) => (<a key={key} href={url} target="_blank" rel="noreferrer" onClick={() => handleSocialClick(key)} aria-label={`Visit ${key} profile`} className="transition-opacity hover:opacity-60 focus:outline-none focus-visible:ring-2 rounded" style={{ color: "var(--theme-muted)" }}><Icon className="w-4 h-4" /></a>))}
              <button onClick={() => setActiveMode(isDark ? "light" : "dark")} aria-label={`Switch to ${isDark ? "light" : "dark"} mode`} className="p-1.5 rounded-lg transition-colors hover:opacity-60 focus:outline-none focus-visible:ring-2">{isDark ? <Sun className="w-4 h-4" style={{ color: "var(--theme-muted)" }} /> : <Moon className="w-4 h-4" style={{ color: "var(--theme-muted)" }} />}</button>
            </div>
          </div>
        </div>
      </header>

      <section className="content-layer max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-16">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-7">
            <motion.div initial={motionPref ? {} : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: "var(--theme-muted)" }}>{portfolio.location || "Available for work"}</p>
              <h1 className="font-display font-bold leading-[0.92] mb-6" style={{ fontSize: "clamp(3rem,7vw,5.5rem)", color: "var(--theme-fg)" }}>{portfolio.name}</h1>
              <p className="font-display text-xl md:text-2xl italic mb-6" style={{ color: ACCENT }}>{portfolio.title}</p>
              <p className="text-sm md:text-base leading-relaxed max-w-lg" style={{ color: "var(--theme-muted)" }}>{portfolio.bio}</p>
            </motion.div>
          </div>
          <motion.div initial={motionPref ? {} : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="md:col-span-5">
            <div className="rounded-xl border p-6" role="region" aria-label="Fact sheet" style={{ background: "var(--theme-surface)", borderColor: "var(--theme-border)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <h2 className="text-[10px] font-bold tracking-[0.25em] uppercase mb-4" style={{ color: "var(--theme-muted)" }}>Fact Sheet</h2>
              <dl className="space-y-3 text-sm">
                {portfolio.location && (<div className="flex justify-between"><dt style={{ color: "var(--theme-muted)" }}>Based in</dt><dd className="font-medium" style={{ color: "var(--theme-fg)" }}>{portfolio.location}</dd></div>)}
                {portfolio.contactEmail && (<div className="flex justify-between"><dt style={{ color: "var(--theme-muted)" }}>Email</dt><dd><a href={`mailto:${portfolio.contactEmail}`} className="font-medium hover:underline focus:outline-none focus-visible:ring-2 rounded" style={{ color: ACCENT }}>{portfolio.contactEmail}</a></dd></div>)}
                {portfolio.contactPhone && (<div className="flex justify-between"><dt style={{ color: "var(--theme-muted)" }}>Phone</dt><dd className="font-mono text-xs" style={{ color: "var(--theme-fg)" }}>{portfolio.contactPhone}</dd></div>)}
                <div className="flex justify-between"><dt style={{ color: "var(--theme-muted)" }}>Skills</dt><dd className="font-medium" style={{ color: "var(--theme-fg)" }}>{portfolio.skills.length}</dd></div>
              </dl>
              {portfolio.avatarUrl ? (<div className="mt-5 w-16 h-16 rounded-lg overflow-hidden border" style={{ borderColor: "var(--theme-border)" }}><img src={portfolio.avatarUrl} alt={portfolio.name} className="w-full h-full object-cover" /></div>) : (<div className="mt-5 w-16 h-16 rounded-lg border flex items-center justify-center font-display text-2xl font-bold" style={{ borderColor: "var(--theme-border)", background: "var(--theme-bg)", color: "var(--theme-muted)" }}>{profileInitial}</div>)}
            </div>
          </motion.div>
        </div>
      </section>

      <main id="portfolio-main" className="content-layer max-w-6xl mx-auto px-6 pb-20 space-y-16">
        {visibleSections.map(sectionId => {
          if (sectionId === "skills") return (
            <section key="skills" id="portfolio-skills" className="py-16 border-t" style={{ borderColor: "var(--theme-border)" }} aria-labelledby="skills-heading">
              <SectionHeader title={labels.skills} align="center" />
              <div className="grid sm:grid-cols-3 gap-8 mt-10">
                {skillClusters.map((cluster, ci) => (<motion.div key={cluster.label} initial={motionPref ? {} : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: ci * 0.1 }} className="rounded-xl border p-5" style={{ background: "var(--theme-surface)", borderColor: "var(--theme-border)" }}>
                  <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: ACCENT }}>{cluster.label}</h3>
                  <ul className="space-y-3" role="list" aria-label={`${cluster.label} skills`}>
                    {cluster.items.map(skill => (<li key={skill}>
                      <div className="flex justify-between text-xs mb-1.5"><span className="font-medium" style={{ color: "var(--theme-fg)" }}>{skill}</span><span className="font-mono" style={{ color: "var(--theme-muted)" }}>{PROFICIENCY[cluster.level]}%</span></div>
                      <div className="word-bar-track" role="progressbar" aria-valuenow={PROFICIENCY[cluster.level]} aria-valuemin={0} aria-valuemax={100} aria-label={`${skill} proficiency`}><div className="word-bar-fill" style={{ width: `${PROFICIENCY[cluster.level]}%` }} /></div>
                    </li>))}
                  </ul>
                </motion.div>))}
              </div>
            </section>
          );

          if (sectionId === "projects") return (
            <section key="projects" id="portfolio-projects" className="py-16 border-t" style={{ borderColor: "var(--theme-border)" }} aria-labelledby="projects-heading">
              <SectionHeader title={labels.projects} align="left" />
              <div className="accordion-track" role="list" aria-label="Projects accordion">
                {portfolio.projects?.map((p, i) => {
                  const isExpanded = expandedProject === i;
                  return (<motion.div key={i} role="listitem" className={`accordion-card ${isExpanded ? "expanded" : ""}`} aria-expanded={isExpanded} tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setExpandedProject(isExpanded ? null : i); } }} onClick={() => setExpandedProject(isExpanded ? null : i)} initial={motionPref ? {} : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-display text-base font-bold" style={{ color: "var(--theme-fg)" }}>{p.title}</h3>
                        <ChevronRight className="w-4 h-4 transition-transform duration-400" style={{ color: "var(--theme-muted)", transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }} />
                      </div>
                      {p.role && (<p className="text-xs font-mono mb-2" style={{ color: ACCENT }}>{p.role}</p>)}
                      <div className="h-2 rounded-full mb-3" style={{ background: "linear-gradient(135deg, #d4b483, #a67c52)" }} aria-hidden="true" />
                      {p.link && (<a href={p.link} target="_blank" rel="noreferrer" aria-label={`Open project "${p.title}"`} className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: ACCENT }}>View <ExternalLink className="w-3 h-3" aria-hidden="true" /></a>)}
                    </div>
                    {isExpanded && (<motion.div initial={motionPref ? {} : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.35 }} className="px-5 pb-5">
                      <div className="h-px mb-4" style={{ background: "var(--theme-border)" }} />
                      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--theme-muted)" }}>{p.description}</p>
                      {p.techStack?.length > 0 && (<ul className="flex flex-wrap gap-2" aria-label="Technologies">{p.techStack.map(t => (<li key={t} className="text-xs px-2.5 py-1 rounded-md border font-medium" style={{ borderColor: "var(--theme-border)", color: "var(--theme-fg)", background: "var(--theme-bg)" }}>{t}</li>))}</ul>)}
                    </motion.div>)}
                  </motion.div>);
                })}
              </div>
            </section>
          );

          if (sectionId === "experience") return (
            <section key="experience" id="portfolio-experience" className="py-16 border-t" style={{ borderColor: "var(--theme-border)" }} aria-labelledby="experience-heading">
              <SectionHeader title={labels.experience} align="left" />
              <div className="space-y-0" role="list">{portfolio.experience?.map((exp, i) => (<TimelineItem key={i} title={exp.role} subtitle={exp.company} date={`${exp.startDate} — ${exp.endDate}`} description={exp.description} yearMarker={exp.startDate} index={i} />))}</div>
            </section>
          );

          if (sectionId === "education") return (
            <section key="education" id="portfolio-education" className="py-16 border-t" style={{ borderColor: "var(--theme-border)" }} aria-labelledby="education-heading">
              <SectionHeader title={labels.education} align="left" />
              <div className="grid sm:grid-cols-2 gap-6">{portfolio.education?.map((edu, i) => (<motion.div key={i} initial={motionPref ? {} : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.1 }} className="p-6 rounded-xl border" style={{ background: "var(--theme-surface)", borderColor: "var(--theme-border)" }}>
                <h3 className="font-display text-lg font-bold mb-1" style={{ color: "var(--theme-fg)" }}>{edu.degree}</h3>
                <p className="text-sm" style={{ color: "var(--theme-muted)" }}>{edu.school}</p>
                <time className="text-xs font-mono mt-2 block" style={{ color: ACCENT }} dateTime={edu.year}>{edu.year}</time>
              </motion.div>))}</div>
            </section>
          );

          if (sectionId === "contact") return (
            <section key="contact" id="portfolio-contact" className="py-16 border-t" style={{ borderColor: "var(--theme-border)" }} aria-labelledby="contact-heading">
              <SectionHeader title="Get in Touch" align="center" />
              <ContactFooter email={portfolio.contactEmail} name={portfolio.name} />
            </section>
          );

          return null;
        })}
      </main>

      <footer className="content-layer border-t py-12" style={{ borderColor: "var(--theme-border)" }} role="contentinfo" aria-label="Site footer">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="w-48 h-12" aria-hidden="true" dangerouslySetInnerHTML={{ __html: SIG(portfolio.name?.split(" ")[0] || "") }} style={{ color: "var(--theme-muted)", opacity: 0.7 }} />
          <p className="text-xs font-mono" style={{ color: "var(--theme-muted)" }}>© {new Date().getFullYear()} {portfolio.name} · All rights reserved</p>
          <div className="flex gap-3">{socialLinks.map(({ key, url, Icon }) => (<a key={key} href={url} target="_blank" rel="noreferrer" onClick={() => handleSocialClick(key)} aria-label={`Visit ${key} profile`} className="p-2 rounded-full border transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2" style={{ borderColor: "var(--theme-border)", color: "var(--theme-muted)" }}><Icon className="w-3.5 h-3.5" aria-hidden="true" /></a>))}</div>
        </div>
      </footer>
    </div>
  );
}
