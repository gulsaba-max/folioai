/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * TEMPLATE: ATELIER
 * Art studio inspired warm tones with handcrafted feel, generous whitespace,
 * and numbered "plates" for projects.
 */

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Sun, Moon, Mail } from "lucide-react";
import type { TemplateProps } from "./templateUtils";
import { getThemeById, cssVarToStyle } from "./design-tokens";
import { ContactFooter } from "./shared/ContactFooter";
import { SectionHeader } from "./shared/SectionHeader";
import { SkillChip } from "./shared/SkillChip";
import { PrintButton } from "./shared/PrintButton";

const themeDef = getThemeById("atelier");

export default function AtelierTemplate({
  portfolio, isDark, setActiveMode, socialLinks, handleSocialClick,
  handleSendMessage, visitorName, setVisitorName, visitorEmail, setVisitorEmail,
  visitorMsg, setVisitorMsg, formLoading, formSuccess, isDemo, hue, labels, sectionOrder
}: TemplateProps) {
  const motionPref = useReducedMotion();
  const theme = isDark ? themeDef.dark : themeDef.light;

  const plateColors = [
    "oklch(0.85 0.06 70)", "oklch(0.80 0.08 50)", "oklch(0.82 0.05 90)",
    "oklch(0.78 0.10 40)", "oklch(0.84 0.04 120)", "oklch(0.81 0.07 80)"
  ];

  return (
    <div
      className="min-h-screen antialiased"
      style={{
        ...cssVarToStyle(theme),
        background: theme.bg,
        color: theme.fg,
        fontFamily: "'Inter', sans-serif",
        '--font-display': "'Cormorant Garamond', serif",
        '--font-mono': "'JetBrains Mono', monospace"
      } as React.CSSProperties}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .skip-link {
          position: absolute; top: -100px; left: 1rem; z-index: 100;
          background: var(--theme-accent, ${hue.hex}); color: #fff;
          padding: 0.5rem 1rem; border-radius: 0.25rem; text-decoration: none;
          font-size: 0.875rem; font-weight: 600; transition: top 0.2s;
        }
        .skip-link:focus { top: 1rem; }
        .plate-image {
          aspect-ratio: 4/3; width: 100%; object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .plate-wrapper:hover .plate-image { transform: scale(1.02); }
        @media (prefers-reduced-motion: reduce) {
          .plate-image { transition: none; }
          .plate-wrapper:hover .plate-image { transform: none; }
        }
        @media print {
          .no-print { display: none !important; }
        }
      `}</style>

      <a href="#atelier-main" className="skip-link">Skip to content</a>

      <header className="fixed top-0 left-0 right-0 z-50 no-print" role="banner">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex justify-between items-center">
          <a
            href="#atelier-main"
            className="text-[10px] tracking-[0.3em] uppercase font-bold font-display text-lg"
            style={{ color: "var(--theme-fg)" }}
            aria-label="Back to top"
          >
            {portfolio.name?.split(" ")[0] ?? "Atelier"}
          </a>
          <div className="flex items-center gap-3">
            {socialLinks.slice(0, 3).map(({ key, url, Icon }) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noreferrer"
                onClick={() => handleSocialClick(key)}
                aria-label={`Visit ${key} profile`}
                className="p-1.5 rounded-full transition-opacity hover:opacity-60 focus:outline-none focus-visible:ring-2"
                style={{ color: "var(--theme-muted)" }}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
            <button
              onClick={() => setActiveMode(isDark ? "light" : "dark")}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
              className="p-1.5 rounded-full transition-opacity hover:opacity-60 focus:outline-none focus-visible:ring-2"
              style={{ color: "var(--theme-muted)" }}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      <main id="atelier-main" role="main">
        {sectionOrder.includes("hero") && (
          <section
            className="relative h-screen min-h-[600px] flex items-end"
            aria-label="Hero"
            style={{ background: theme.surface }}
          >
            {portfolio.avatarUrl ? (
              <img
                src={portfolio.avatarUrl}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />
            ) : (
              <div
                className="absolute inset-0 opacity-10"
                style={{ background: `linear-gradient(135deg, ${plateColors[0]}, ${plateColors[1]})` }}
                aria-hidden="true"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true" />
            <div className="relative max-w-7xl mx-auto px-6 md:px-10 pb-16 md:pb-24 w-full">
              <motion.div
                initial={motionPref ? {} : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {portfolio.location && (
                  <p
                    className="text-[10px] tracking-[0.3em] uppercase font-bold mb-4"
                    style={{ color: "oklch(0.85 0.02 70)" }}
                  >
                    {portfolio.location}
                  </p>
                )}
                <h1
                  className="font-display font-bold leading-[0.85] mb-4"
                  style={{
                    fontSize: "clamp(3.5rem, 10vw, 9rem)",
                    color: "#fff",
                    textShadow: "0 2px 20px rgba(0,0,0,0.15)"
                  }}
                >
                  {portfolio.name}
                </h1>
                <p
                  className="font-display italic text-xl md:text-2xl max-w-xl"
                  style={{ color: "oklch(0.95 0.03 80)", textShadow: "0 1px 8px rgba(0,0,0,0.1)" }}
                >
                  {portfolio.title}
                </p>
              </motion.div>
            </div>
          </section>
        )}

        {sectionOrder.includes("about") && (
          <section className="py-20 md:py-32" aria-labelledby="about-heading">
            <div className="max-w-3xl mx-auto px-6 md:px-10">
              <SectionHeader
                kicker="About the artist"
                title="Bio"
                description={portfolio.bio}
                align="center"
              />
              <div className="flex flex-wrap justify-center gap-3 mt-8" role="list">
                {portfolio.skills?.map((skill, i) => (
                  <SkillChip key={skill} label={skill} proficiency={60 + (i % 4) * 10} variant="dot" />
                ))}
              </div>
            </div>
          </section>
        )}

        {sectionOrder.includes("projects") && (
          <section className="py-12 md:py-24" aria-labelledby="plates-heading">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
              <SectionHeader
                kicker="Selected works"
                title="Plates"
                align="left"
              />
              <div className="space-y-24 md:space-y-32 mt-16 md:mt-24">
                {portfolio.projects?.map((project, i) => {
                  const num = String(i + 1).padStart(2, "0");
                  const bgColor = plateColors[i % plateColors.length];

                  return (
                    <motion.article
                      key={project.id ?? i}
                      id={`plate-${num}`}
                      initial={motionPref ? {} : { opacity: 0, y: 40 }}
                      whileInView={motionPref ? {} : { opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="plate-wrapper"
                      aria-labelledby={`plate-title-${num}`}
                    >
                      <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
                        <div className="w-full md:w-2/3">
                          <div
                            className="w-full overflow-hidden"
                            style={{
                              background: bgColor,
                              aspectRatio: "4/3"
                            }}
                          >
                            {project.image ? (
                              <img
                                src={project.image}
                                alt={project.title}
                                className="plate-image"
                                loading="lazy"
                              />
                            ) : (
                              <div
                                className="w-full h-full flex items-center justify-center"
                                aria-hidden="true"
                              >
                                <span
                                  className="font-display font-bold opacity-20"
                                  style={{ fontSize: "clamp(4rem, 12vw, 10rem)", color: "var(--theme-fg)" }}
                                >
                                  {num}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="w-full md:w-1/3 pt-2">
                          <span
                            className="font-mono text-[10px] tracking-[0.3em] font-bold block mb-4"
                            style={{ color: "var(--theme-muted)" }}
                            aria-hidden="true"
                          >
                            PLATE {num}
                          </span>
                          <h3
                            id={`plate-title-${num}`}
                            className="font-display text-2xl md:text-3xl font-bold mb-3 leading-tight"
                            style={{ color: "var(--theme-fg)" }}
                          >
                            {project.title}
                          </h3>
                          <p
                            className="text-sm leading-relaxed mb-6"
                            style={{ color: "var(--theme-muted)" }}
                          >
                            {project.description}
                          </p>
                          {project.techStack && project.techStack.length > 0 && (
                            <ul
                              className="flex flex-wrap gap-2"
                              aria-label={`Technologies used in ${project.title}`}
                            >
                              {project.techStack.map((tech) => (
                                <li
                                  key={tech}
                                  className="text-[10px] px-2.5 py-1 rounded-full font-medium border font-mono tracking-wide"
                                  style={{
                                    color: "var(--theme-accent)",
                                    borderColor: "var(--theme-border)",
                                    background: "var(--theme-surface)"
                                  }}
                                >
                                  {tech}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {sectionOrder.includes("projects") && portfolio.projects?.length > 0 && (
          <section className="py-20 md:py-32 border-t" aria-labelledby="index-heading" style={{ borderColor: "var(--theme-border)" }}>
            <div className="max-w-7xl mx-auto px-6 md:px-10">
              <SectionHeader
                kicker="Reference"
                title="Index"
                align="left"
              />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px mt-12" role="list" aria-label="Plate index">
                {portfolio.projects.map((project, i) => {
                  const num = String(i + 1).padStart(2, "0");
                  return (
                    <a
                      key={project.id ?? i}
                      href={`#plate-${num}`}
                      className="group flex items-center gap-4 p-5 md:p-6 transition-colors hover:bg-black/[0.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset"
                      style={{
                        background: "var(--theme-surface)",
                        borderBottom: `1px solid var(--theme-border)`,
                        borderRight: `1px solid var(--theme-border)`,
                        '--tw-ring-color': "var(--theme-accent)"
                      } as React.CSSProperties}
                      aria-label={`Jump to plate ${num}: ${project.title}`}
                    >
                      <span
                        className="font-mono text-xs font-bold tracking-wider flex-shrink-0"
                        style={{ color: "var(--theme-muted)" }}
                        aria-hidden="true"
                      >
                        {num}
                      </span>
                      <span
                        className="text-sm md:text-base font-medium truncate transition-colors group-hover:opacity-70"
                        style={{ color: "var(--theme-fg)" }}
                      >
                        {project.title}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {sectionOrder.includes("contact") && (
          <section className="py-20 md:py-32" aria-labelledby="contact-heading">
            <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
              <SectionHeader
                kicker="Get in touch"
                title="Contact"
                align="center"
              />
              <ContactFooter
                email={portfolio.contactEmail}
                name={portfolio.name}
              />
            </div>
          </section>
        )}
      </main>

      <footer
        className="border-t py-10 md:py-14 no-print"
        style={{ borderColor: "var(--theme-border)" }}
        role="contentinfo"
        aria-label="Site footer"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "var(--theme-muted)" }}>
            {portfolio.name && `${portfolio.name} \u00b7 `}\u00a9 {new Date().getFullYear()} \u00b7 All rights reserved
          </p>
          <PrintButton label="Print" printLabel="Print this page" className="text-xs" />
        </div>
        {isDemo && (
          <p className="text-center text-[10px] mt-4 tracking-widest uppercase font-semibold" style={{ color: hue.hex }}>
            Demo mode — Edit data to personalize
          </p>
        )}
      </footer>
    </div>
  );
}
