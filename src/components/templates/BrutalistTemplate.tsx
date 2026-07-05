/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * TEMPLATE: BRUTALIST
 * Raw, bold, unapologetic design. High contrast, hard borders, no border-radius.
 */

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Sun, Moon, Send, Check, ExternalLink, Grid3x3,
  Briefcase, GraduationCap, Mail, Github, Twitter, Linkedin
} from "lucide-react";
import type { TemplateProps } from "./templateUtils";
import { getThemeById, cssVarToStyle } from "./design-tokens";
import { SectionHeader } from "./shared/SectionHeader";
import { SkillChip } from "./shared/SkillChip";
import { ContactFooter } from "./shared/ContactFooter";

const SECTIONS = ["projects", "skills", "experience", "education"] as const;

export default function BrutalistTemplate({
  portfolio, isDark, setActiveMode, socialLinks, handleSocialClick,
  handleSendMessage, visitorName, setVisitorName, visitorEmail, setVisitorEmail,
  visitorMsg, setVisitorMsg, formLoading, formSuccess, isDemo, hue, labels, sectionOrder
}: TemplateProps) {
  const theme = getThemeById("brutalist");
  const palette = isDark ? theme.dark : theme.light;
  const styles = cssVarToStyle(palette);
  const prefersReducedMotion = useReducedMotion();
  const [gridOn, setGridOn] = useState(false);
  const [sortKey, setSortKey] = useState<string>("newest");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "g" && !e.metaKey && !e.ctrlKey && !e.altKey && document.activeElement === document.body) {
        setGridOn(v => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const accentHex = hue.hex;
  const bg = palette.bg;
  const fg = palette.fg;
  const surface = palette.surface;
  const border = palette.border;
  const muted = palette.muted;

  const sortedProjects = [...portfolio.projects].sort((a, b) => {
    if (sortKey === "alpha") return a.title.localeCompare(b.title);
    return b.title.localeCompare(a.title);
  });

  const toggleSort = (key: string) => setSortKey(key);

  return (
    <div
      className="min-h-screen font-sans"
      style={{ ...styles, background: bg, color: fg, fontFamily: "'Inter', sans-serif" }}
    >
      <link rel="stylesheet" href={`https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=JetBrains+Mono:wght@400;700&display=swap`} />

      {/* Grid overlay */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-50 transition-opacity duration-300"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)"} 1px, transparent 1px),
            linear-gradient(to bottom, ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)"} 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          opacity: gridOn ? 1 : 0
        }}
      />

      {/* Header / nav */}
      <header className="sticky top-0 z-40 border-b" style={{ background: bg, borderColor: border }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: accentHex }}>
              {portfolio.name?.split(" ")[0].toUpperCase()}
            </span>
            <span className="text-xs hidden sm:inline" style={{ color: muted }}>BRUTALIST PORTFOLIO</span>
          </div>
          <div className="flex items-center gap-3">
            {sectionOrder.filter(s => ["skills", "projects", "experience", "education"].includes(s)).map(s => (
              <a key={s} href={`#portfolio-${s}`} className="text-[10px] font-bold tracking-[0.2em] uppercase hidden md:inline-block hover:opacity-70 transition-opacity" style={{ color: muted }}>
                {s}
              </a>
            ))}
            <button
              onClick={() => setGridOn(v => !v)}
              aria-label={gridOn ? "Hide grid overlay" : "Show grid overlay"}
              aria-pressed={gridOn}
              className="p-2 border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
              style={{ borderColor: border, color: gridOn ? accentHex : muted, background: surface, "--tw-ring-color": accentHex, "--tw-ring-offset-color": bg }}
              title="Toggle grid overlay (keyboard: G)"
            >
              <Grid3x3 className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              onClick={() => setActiveMode(isDark ? "light" : "dark")}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2 border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 hover:opacity-70 transition-opacity"
              style={{ borderColor: border, color: fg, background: surface, "--tw-ring-color": accentHex, "--tw-ring-offset-color": bg }}
            >
              {isDark ? <Sun className="w-4 h-4" aria-hidden="true" /> : <Moon className="w-4 h-4" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Massive name + marquee ticker */}
      <section className="border-b" style={{ borderColor: border }} aria-label="Hero">
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-12 md:pt-20 pb-6">
          <h1 className="text-6xl md:text-[10rem] font-black leading-[0.85] tracking-tighter uppercase" style={{ color: fg, lineHeight: 0.9 }}>
            {portfolio.name}
          </h1>
          <p className="mt-4 text-lg md:text-2xl font-bold tracking-tight" style={{ color: accentHex }}>
            {portfolio.title}
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-xs font-bold tracking-[0.15em] uppercase" style={{ color: muted }}>
            {portfolio.location && <span>{portfolio.location}</span>}
            {portfolio.contactEmail && <span>· · · {portfolio.contactEmail}</span>}
            {!!portfolio.socialLinks?.github && <span>· · · GITHUB</span>}
          </div>
        </div>

        {/* Marquee ticker of skills */}
        {portfolio.skills?.length > 0 && (
          <div className="border-t border-b overflow-hidden" style={{ borderColor: border, background: isDark ? "#000" : "#fff" }}>
            <div className="relative py-2" style={{ background: accentHex }}>
              <div
                className="flex whitespace-nowrap"
                style={{
                  animation: `marquee 28s linear infinite`,
                  color: isDark ? "#000" : "#fff"
                }}
                aria-label="Skills marquee"
              >
                {[...portfolio.skills, ...portfolio.skills].map((skill, i) => (
                  <span key={i} className="inline-block px-6 text-xs font-black tracking-[0.2em] uppercase">
                    {skill}&nbsp;◆&nbsp;
                  </span>
                ))}
              </div>
              <style>{`
                @keyframes marquee {
                  0% { transform: translateX(0%); }
                  100% { transform: translateX(-50%); }
                }
              `}</style>
            </div>
          </div>
        )}
      </section>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-16">

        {/* Projects — sortable table with row hover inversion */}
        {sectionOrder.includes("projects") && (
          <section id="portfolio-projects" aria-labelledby="projects-heading">
            <SectionHeader kicker="INDEX" title={labels.projects} />

            {/* Sort controls */}
            <div className="flex flex-wrap items-center gap-2 mb-4" role="group" aria-label="Sort projects">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: muted }}>SORT:</span>
              {["newest", "alpha"].map(key => (
                <button
                  key={key}
                  onClick={() => toggleSort(key)}
                  aria-pressed={sortKey === key}
                  className="text-[10px] font-black tracking-[0.15em] uppercase px-3 py-2 border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 transition-all"
                  style={{
                    borderColor: sortKey === key ? accentHex : border,
                    background: sortKey === key ? accentHex : bg,
                    color: sortKey === key ? (isDark ? "#000" : "#fff") : fg,
                    "--tw-ring-color": accentHex,
                    "--tw-ring-offset-color": bg
                  }}
                >
                  {key === "newest" ? "DEFAULT" : "A → Z"}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto">
              <table className="w-full border-collapse" style={{ border: `1px solid ${border}` }}>
                <thead>
                  <tr style={{ background: isDark ? "#000" : surface }}>
                    <th scope="col" className="text-left p-3 md:p-4 text-[10px] font-black tracking-[0.2em] uppercase border-r" style={{ borderColor: border, color: muted }}>Project</th>
                    <th scope="col" className="text-left p-3 md:p-4 text-[10px] font-black tracking-[0.2em] uppercase border-r hidden md:table-cell" style={{ borderColor: border, color: muted }}>Tech</th>
                    <th scope="col" className="text-left p-3 md:p-4 text-[10px] font-black tracking-[0.2em] uppercase hidden md:table-cell" style={{ color: muted }}>Role</th>
                    <th scope="col" className="text-center p-3 md:p-4 text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: muted }}>Link</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedProjects.map((p, i) => (
                    <tr
                      key={p.id}
                      className="group cursor-pointer border-t transition-all duration-150"
                      style={{ borderColor: border }}
                      tabIndex={0}
                      onMouseEnter={(e) => {
                        const row = e.currentTarget;
                        row.style.background = isDark ? "#fff" : "#000";
                        row.style.color = isDark ? "#000" : "#fff";
                        row.querySelectorAll("td").forEach((td) => {
                          (td as HTMLElement).style.color = isDark ? "#000" : "#fff";
                        });
                      }}
                      onMouseLeave={(e) => {
                        const row = e.currentTarget;
                        row.style.background = "transparent";
                        row.style.color = fg;
                        row.querySelectorAll("td").forEach((td) => {
                          (td as HTMLElement).style.color = muted;
                        });
                      }}
                    >
                      <td className="p-3 md:p-4 border-r align-top" style={{ borderColor: border }}>
                        <div className="text-sm font-bold uppercase tracking-tight">{p.title}</div>
                         <p className="text-xs mt-1 md:hidden" style={{ color: muted }}>{(Array.isArray(p.techStack) ? p.techStack : []).slice(0, 3).join(", ")}</p>
                        {p.role && <p className="text-xs mt-1 hidden md:block" style={{ color: muted }}>{p.description?.slice(0, 120)}{p.description?.length > 120 ? "..." : ""}</p>}
                      </td>
                      <td className="p-3 md:p-4 border-r align-top hidden md:table-cell" style={{ borderColor: border }}>
                        <div className="flex flex-wrap gap-1">
                           {(Array.isArray(p.techStack) ? p.techStack : []).slice(0, 3).map(t => (
                            <span key={t} className="text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 border" style={{ borderColor: border, color: muted }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3 md:p-4 align-top hidden md:table-cell" style={{ color: muted }}>
                        <span className="text-xs font-medium">{p.role || "—"}</span>
                      </td>
                      <td className="p-3 md:p-4 text-center align-middle">
                        {p.link ? (
                          <a href={p.link} target="_blank" rel="noreferrer noopener"
                            aria-label={`Open project "${p.title}" in new tab`}
                            className="inline-flex items-center justify-center w-8 h-8 border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 hover:opacity-70 transition-opacity"
                            style={{ borderColor: border, "--tw-ring-color": accentHex, "--tw-ring-offset-color": bg }}>
                            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                          </a>
                        ) : (
                          <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: muted }}>—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {sortedProjects.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-xs font-bold tracking-[0.2em] uppercase" style={{ color: muted }}>
                        No projects found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Skills — marquee inline chips */}
        {sectionOrder.includes("skills") && (
          <section id="portfolio-skills" aria-labelledby="skills-heading">
            <SectionHeader kicker="ARSENAL" title={labels.skills} />
            <div className="flex flex-wrap gap-2 md:gap-3">
              {portfolio.skills?.map((skill, i) => (
                <SkillChip
                  key={skill}
                  label={skill}
                  variant="dot"
                />
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {sectionOrder.includes("experience") && (
          <section id="portfolio-experience" aria-labelledby="experience-heading">
            <SectionHeader kicker="TENURE" title={labels.experience} />
            <div className="border border-white/20 dark:border-slate-700/30 shadow-[0_8px_30px_rgba(0,0,0,0.04)]" style={{ borderColor: border }}>
              {portfolio.experience?.map((exp, i) => (
                <div key={exp.id} className="grid grid-cols-1 md:grid-cols-12 gap-0 border-b last:border-b-0" style={{ borderColor: border }}>
                  <div className="md:col-span-4 p-4 md:p-6 border-r border-b md:border-b-0" style={{ borderColor: border, background: isDark ? `hsl(0 0% ${8 + i * 2}%)` : surface }}>
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: accentHex }}>
                      {exp.startDate} → {exp.endDate}
                    </span>
                    <h3 className="text-lg font-black uppercase tracking-tight mt-2">{exp.role}</h3>
                    <p className="text-xs font-bold tracking-widest uppercase mt-1" style={{ color: muted }}>{exp.company}</p>
                  </div>
                  <div className="md:col-span-8 p-4 md:p-6">
                    <p className="text-sm leading-relaxed" style={{ color: muted }}>{exp.description}</p>
                  </div>
                </div>
              ))}
              {portfolio.experience?.length === 0 && (
                <div className="p-8 text-center text-xs font-bold tracking-[0.2em] uppercase" style={{ color: muted }}>No experience listed</div>
              )}
            </div>
          </section>
        )}

        {/* Education */}
        {sectionOrder.includes("education") && (
          <section id="portfolio-education" aria-labelledby="education-heading">
            <SectionHeader kicker="DEGREES" title={labels.education} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/20 dark:border-slate-700/30 shadow-[0_8px_30px_rgba(0,0,0,0.04)]" style={{ borderColor: border }}>
              {portfolio.education?.map((edu, i) => {
                const hueBlock = `hsl(${(i * 120 + 30) % 360} 70% ${isDark ? 50 : 45}%)`;
                return (
                  <div key={edu.id} className="border-r border-b md:border-b-0 last:border-r-0 relative" style={{ borderColor: border }}>
                    <div className="p-5 md:p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 shrink-0" style={{ background: hueBlock }} aria-hidden="true" />
                        <div>
                          <h4 className="text-sm font-black uppercase tracking-tight">{edu.degree}</h4>
                          <p className="text-xs font-bold tracking-wider uppercase mt-0.5" style={{ color: muted }}>{edu.school}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: accentHex }}>{edu.year}</span>
                    </div>
                  </div>
                );
              })}
              {portfolio.education?.length === 0 && (
                <div className="p-8 text-center text-xs font-bold tracking-[0.2em] uppercase col-span-2" style={{ color: muted }}>No education listed</div>
              )}
            </div>
          </section>
        )}

        {/* Contact */}
        {sectionOrder.includes("contact") && (
          <section id="portfolio-contact" aria-labelledby="contact-heading">
            <SectionHeader kicker="REACH OUT" title="Contact" />
            <div className="max-w-2xl">
              {formSuccess && (
                <div className="p-3 border border-white/20 dark:border-slate-700/30 shadow-[0_8px_30px_rgba(0,0,0,0.04)] text-sm font-bold tracking-wider uppercase flex items-center gap-2 mb-4" style={{ borderColor: accentHex, color: accentHex, background: isDark ? "#000" : surface }}>
                  <Check className="w-4 h-4" aria-hidden="true" /> {formSuccess}
                </div>
              )}
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-0 border border-white/20 dark:border-slate-700/30 shadow-[0_8px_30px_rgba(0,0,0,0.04)]" style={{ borderColor: border }}>
                  <div className="border-r border-b sm:border-b-0" style={{ borderColor: border }}>
                    <label htmlFor="vname" className="block p-3 text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: muted }}>Name</label>
                    <input id="vname" type="text" required value={visitorName} onChange={e => setVisitorName(e.target.value)}
                      className="w-full p-3 pt-0 text-sm font-medium bg-transparent border-0 outline-none focus:ring-2"
                      style={{ color: fg, background: bg, "--tw-ring-color": accentHex, "--tw-ring-offset-color": border }} />
                  </div>
                  <div>
                    <label htmlFor="vemail" className="block p-3 text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: muted }}>Email</label>
                    <input id="vemail" type="email" required value={visitorEmail} onChange={e => setVisitorEmail(e.target.value)}
                      className="w-full p-3 pt-0 text-sm font-medium bg-transparent border-0 outline-none focus:ring-2"
                      style={{ color: fg, background: bg, "--tw-ring-color": accentHex, "--tw-ring-offset-color": border }} />
                  </div>
                </div>
            <div className="border border-white/20 dark:border-slate-700/30 shadow-[0_8px_30px_rgba(0,0,0,0.04)]" style={{ borderColor: border }}>
                  <label htmlFor="vmsg" className="block p-3 text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: muted }}>Message</label>
                  <textarea id="vmsg" rows={5} required value={visitorMsg} onChange={e => setVisitorMsg(e.target.value)}
                    className="w-full p-3 pt-0 text-sm font-medium bg-transparent border-0 outline-none resize-none focus:ring-2"
                    style={{ color: fg, background: bg, "--tw-ring-color": accentHex, "--tw-ring-offset-color": border }} />
                </div>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit" disabled={formLoading || prefersReducedMotion}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 text-sm font-black tracking-[0.2em] uppercase border focus:outline-none focus-visible:ring-2 cursor-pointer"
                  style={{
                    background: accentHex,
                    color: isDark ? "#000" : "#fff",
                    borderColor: accentHex,
                    "--tw-ring-color": accentHex,
                    "--tw-ring-offset-color": bg
                  }}
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  {formLoading ? "SENDING..." : "Send Message"}
                </motion.button>
              </form>
            </div>
          </section>
        )}
      </main>

      <ContactFooter
        email={portfolio.contactEmail}
        name={portfolio.name}
      />

      <style>{`
        table { transition: background 150ms; }
        @media print {
          header, footer { border-left: none !important; border-right: none !important; }
        }
      `}</style>
    </div>
  );
}
