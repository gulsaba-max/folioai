/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * TEMPLATE: EDITORIAL
 * High-end magazine/newspaper aesthetic with serif typography, sticky TOC,
 * pull quotes, footnotes, and elegant scroll reveals.
 */

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Sun, Moon, Quote, MapPin } from "lucide-react";
import type { TemplateProps } from "./templateUtils";
import { GOOGLE_FONTS } from "./templateUtils";
import { getThemeById, cssVarToStyle } from "./design-tokens";
import { SectionHeader } from "./shared/SectionHeader";
import { ProjectCard } from "./shared/ProjectCard";
import { SkillChip } from "./shared/SkillChip";
import { TimelineItem } from "./shared/TimelineItem";
import { ContactFooter } from "./shared/ContactFooter";
import { PrintButton } from "./shared/PrintButton";

const themeDef = getThemeById("editorial");

export default function EditorialTemplate({
  portfolio, isDark, setActiveMode, socialLinks, handleSocialClick,
  handleSendMessage, visitorName, setVisitorName, visitorEmail, setVisitorEmail,
  visitorMsg, setVisitorMsg, formLoading, formSuccess, isDemo, hue, labels, sectionOrder
}: TemplateProps) {
  const [tocVisible, setTocVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const motionPref = useReducedMotion();

  const theme = isDark ? themeDef.dark : themeDef.light;

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setTocVisible(current < 600 || current < lastScroll);
      setLastScroll(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScroll]);

  const readableDate = (d: string | undefined) => d || "Present";

  const visibleSections = sectionOrder.filter(s => !["hero", "about", "social-feed"].includes(s));

  return (
    <div
      className="min-h-screen relative"
      style={{
        ...cssVarToStyle(theme),
        background: theme.bg,
        color: theme.fg,
        fontFamily: "'Inter', sans-serif"
      }}
    >
      <link rel="stylesheet" href={GOOGLE_FONTS} />

      <style>{`
        @import url(${GOOGLE_FONTS});
        .font-display { font-family: 'Playfair Display', serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .skip-link {
          position: absolute; top: -100px; left: 1rem; z-index: 100;
          background: var(--theme-accent, ${hue.hex}); color: #fff;
          padding: 0.5rem 1rem; border-radius: 0.25rem; text-decoration: none; font-size: 0.875rem; font-weight: 600;
          transition: top 0.2s;
        }
        .skip-link:focus { top: 1rem; }
        .toc-sticky { transition: transform 0.3s ease, opacity 0.3s ease; }
        .toc-hidden { transform: translateX(-100%); opacity: 0; pointer-events: none; }
        .pull-quote {
          border-left: 3px solid var(--theme-accent, ${hue.hex});
          padding-left: 1.25rem;
          margin: 2rem 0;
        }
        .footnote {
          font-size: 0.75rem;
          color: var(--theme-muted, #888);
          border-top: 1px dashed var(--theme-border, #ccc);
          padding-top: 0.5rem;
        }
        @media print {
          .no-print { display: none !important; }
          .toc-sticky { display: none !important; }
        }
      `}</style>

      <a href="#portfolio-main" className="skip-link">Skip to content</a>

      {/** Masthead */}
      <header className="border-b" style={{ borderColor: "var(--theme-border)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: "var(--theme-muted)" }}>
              {portfolio.name?.split(" ")[0] ?? "Portfolio"}
            </span>
            <span className="font-mono text-[10px]" style={{ color: "var(--theme-border)" }}>VOL. {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-3">
            {socialLinks.slice(0, 3).map(({ key, url, Icon }) => (
              <a key={key} href={url} target="_blank" rel="noreferrer" onClick={() => handleSocialClick(key)}
                aria-label={`Visit ${key} profile`} className="transition-opacity hover:opacity-50 focus:outline-none focus-visible:ring-2 rounded"
                style={{ color: "var(--theme-muted)" }}>
                <Icon className="w-4 h-4" />
              </a>
            ))}
            <button onClick={() => setActiveMode(isDark ? "light" : "dark")} aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
              className="p-1.5 rounded-lg transition-opacity hover:opacity-60 focus:outline-none focus-visible:ring-2"
              style={{ color: "var(--theme-muted)" }}>
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <PrintButton label="Print" printLabel="Print this issue" className="ml-1" />
          </div>
        </div>
      </header>

      {/** Hero */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-12 md:pt-20 pb-8 border-b" style={{ borderColor: "var(--theme-border)" }}>
        <div className="grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <motion.div initial={motionPref ? {} : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
              {portfolio.location && (
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="w-3.5 h-3.5" style={{ color: hue.hex }} />
                  <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: "var(--theme-muted)" }}>
                    {portfolio.location}
                  </span>
                </div>
              )}
              <h1 className="font-display font-bold leading-[0.9] mb-6" style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)", color: "var(--theme-fg)" }}>
                {portfolio.name}
              </h1>
              <p className="text-xl md:text-2xl font-display italic mb-4" style={{ color: hue.hex }}>
                {portfolio.title}
              </p>
              <p className="text-sm md:text-base leading-relaxed max-w-xl" style={{ color: "var(--theme-muted)" }}>
                {portfolio.bio}
              </p>
            </motion.div>
          </div>
          <div className="md:col-span-5 flex justify-center">
            {portfolio.avatarUrl ? (
              <motion.div initial={motionPref ? {} : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
                className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-2"
                style={{ borderColor: "var(--theme-border)" }}>
                <img src={portfolio.avatarUrl} alt={portfolio.name} className="w-full h-full object-cover" />
              </motion.div>
            ) : (
              <motion.div initial={motionPref ? {} : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
                className="w-48 h-48 md:w-56 md:h-56 rounded-full border-2 flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
                style={{ background: `var(--theme-surface)`, borderColor: "var(--theme-border)" }}>
                <span className="font-display text-4xl font-bold" style={{ color: "var(--theme-muted)" }}>
                  {portfolio.name?.charAt(0).toUpperCase()}
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/** Issue line + Layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <nav aria-label="Table of contents" className="py-3 border-b flex items-center gap-6 overflow-x-auto" style={{ borderColor: "var(--theme-border)" }}>
          {visibleSections.map((s, i) => {
            const num = String(i + 1).padStart(2, "0");
            const anchor = `portfolio-${s}`;
            return (
              <a key={s} href={`#${anchor}`}
                className="text-[10px] tracking-[0.2em] uppercase font-bold whitespace-nowrap transition-opacity hover:opacity-60 focus:outline-none focus-visible:ring-2 rounded"
                style={{ color: "var(--theme-muted)" }}>
                <span aria-hidden="true" style={{ color: hue.hex }}>{num}</span>{" "}
                {labels[s as keyof typeof labels] ?? s}
              </a>
            );
          })}
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-12 gap-0">

          {/** Sticky left-rail TOC */}
          <aside className="hidden md:flex md:col-span-2 no-print" aria-label="Jump to sections">
            <div className={`toc-sticky top-8 flex flex-col gap-6 ${tocVisible ? "" : "toc-hidden"}`}>
              {visibleSections.map((s, i) => {
                const num = String(i + 1).padStart(2, "0");
                return (
                  <a key={s} href={`#portfolio-${s}`} aria-label={`Jump to ${labels[s as keyof typeof labels] ?? s}`}
                    className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 rounded">
                    <span className="text-[10px] font-mono font-bold" style={{ color: "var(--theme-muted)" }}>{num}</span>
                    <span className="h-px flex-1 transition-all group-hover:w-4" style={{ background: "var(--theme-border)", width: "12px" }} />
                  </a>
                );
              })}
            </div>
          </aside>

          {/** Main body — two_column on desktop */}
          <main id="portfolio-main" className="md:col-span-10">
            <div className="grid md:grid-cols-2 gap-0">

              {/** Left column */}
              <div className="border-r" style={{ borderColor: "var(--theme-border)" }}>
                <motion.div
                  initial={motionPref ? {} : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7 }}
                  className="p-8 md:px-10 md:py-12"
                >
                  <SectionHeader
                    kicker="About the author"
                    title="Editorial Bio"
                    description={portfolio.bio}
                    align="left"
                  />
                  {portfolio.location && (
                    <div className="mt-6 flex items-center gap-2">
                      <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: "var(--theme-muted)" }}>
                        Based in
                      </span>
                      <span className="text-sm font-medium" style={{ color: "var(--theme-fg)" }}>
                        {portfolio.location}
                      </span>
                    </div>
                  )}
                </motion.div>

                {sectionOrder.includes("skills") && (
                  <section id="portfolio-skills" className="p-8 md:px-10 md:py-12 border-t" style={{ borderColor: "var(--theme-border)" }} aria-labelledby="skills-heading">
                    <SectionHeader title={labels.skills} align="left" />
                    <div className="flex flex-wrap gap-3" role="list">
                      {portfolio.skills?.map((skill, i) => (
                        <SkillChip key={skill} label={skill} proficiency={70 + (i % 3) * 10} variant="dot" />
                      ))}
                    </div>
                  </section>
                )}

                {sectionOrder.includes("projects") && (
                  <section id="portfolio-projects" className="p-8 md:px-10 md:py-12 border-t" style={{ borderColor: "var(--theme-border)" }} aria-labelledby="projects-heading">
                    <SectionHeader title={labels.projects} align="left" />
                    <div className="space-y-10">
                      {portfolio.projects?.map((p, i) => (
                        <ProjectCard key={i} title={p.title} description={p.description} techStack={p.techStack} link={p.link} index={i} />
                      ))}
                    </div>
                  </section>
                )}

              </div>

              {/** Right column */}
              <div>
                {sectionOrder.includes("experience") && (
                  <section id="portfolio-experience" className="p-8 md:px-10 md:py-12 border-b" style={{ borderColor: "var(--theme-border)" }} aria-labelledby="experience-heading">
                    <SectionHeader title={labels.experience} align="left" />
                    <div className="space-y-0" role="list" aria-label="Experience timeline">
                      {portfolio.experience?.map((exp, i) => (
                        <TimelineItem
                          key={i}
                          title={exp.role}
                          subtitle={exp.company}
                          date={`${readableDate(exp.startDate)} — ${readableDate(exp.endDate)}`}
                          description={exp.description}
                          yearMarker={exp.startDate}
                          index={i}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {sectionOrder.includes("education") && (
                  <section id="portfolio-education" className="p-8 md:px-10 md:py-12 border-b" style={{ borderColor: "var(--theme-border)" }} aria-labelledby="education-heading">
                    <SectionHeader title={labels.education} align="left" />
                    <div className="space-y-8">
                      {portfolio.education?.map((edu, i) => (
                        <motion.div
                          key={i}
                          initial={motionPref ? {} : { opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ duration: 0.6, delay: i * 0.1 }}
                          className="pb-6"
                          style={{ borderBottom: i < portfolio.education.length - 1 ? `1px solid var(--theme-border)` : "none" }}
                        >
                          <h3 className="font-display text-xl font-bold mb-0.5" style={{ color: "var(--theme-fg)" }}>{edu.degree}</h3>
                          <p className="text-sm mb-1" style={{ color: "var(--theme-muted)" }}>{edu.school}</p>
                          <time className="text-xs font-mono" style={{ color: hue.hex }} dateTime={edu.year}>{edu.year}</time>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                )}

                {/** Pull quote */}
                <motion.div
                  initial={motionPref ? {} : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.8 }}
                  className="p-8 md:px-10 md:py-12 border-b shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
                  style={{ borderColor: "var(--theme-border)", background: "var(--theme-surface)" }}
                  aria-label="Editorial pull quote"
                >
                  <Quote className="w-6 h-6 mb-4" style={{ color: hue.hex }} />
                  <p className="font-display text-2xl md:text-3xl font-bold italic leading-snug mb-4" style={{ color: "var(--theme-fg)" }}>
                    Good design is silent.
                  </p>
                  <cite className="text-xs tracking-widest uppercase font-semibold not-italic" style={{ color: "var(--theme-muted)" }}>
                    — {portfolio.name || "Editor"}
                  </cite>
                </motion.div>

                {sectionOrder.includes("contact") && (
                  <section id="portfolio-contact" className="p-8 md:px-10 md:py-12 border-b" style={{ borderColor: "var(--theme-border)" }} aria-labelledby="contact-heading">
                    <SectionHeader title="Contact" align="left" />
                    <ContactFooter
                      email={portfolio.contactEmail}
                      name={portfolio.name}
                    />
                  </section>
                )}

                {/** Footnotes */}
                <footer className="p-8 md:px-10 md:py-12" style={{ color: "var(--theme-muted)" }}>
                  <h3 className="text-[10px] tracking-[0.3em] uppercase font-bold mb-4">Notes</h3>
                  <ul className="space-y-3 text-xs leading-relaxed">
                    <li className="footnote">¹ All projects displayed are the property of their respective owners.</li>
                    <li className="footnote">² Contact information is current as of {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" })}.</li>
                    {isDemo && (
                      <li className="footnote" style={{ borderColor: hue.hex, color: hue.hex }}>
                        This portfolio is running in demo mode. Edit data to personalize.
                      </li>
                    )}
                  </ul>
                </footer>

              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
