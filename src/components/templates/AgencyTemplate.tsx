/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * TEMPLATE 9: CREATIVE AGENCY
 * Fullscreen sections, bold editorial typography, hover image reveals, diagonal layouts.
 */

import React, { useState, useMemo } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ExternalLink, Sun, Moon, Send, Check, ArrowUpRight, ArrowRight } from "lucide-react";
import type { TemplateProps } from "./templateUtils";
import { getThemeById, cssVarToStyle } from "./design-tokens";
import { GOOGLE_FONTS } from "./templateUtils";

const PROJECT_PALETTES = [
  { bg: "#1a0533", accent: "#f43f5e" },
  { bg: "#0c1a0c", accent: "#4ade80" },
  { bg: "#0d1b3e", accent: "#60a5fa" },
  { bg: "#1a0d00", accent: "#fb923c" },
  { bg: "#1a0033", accent: "#c084fc" },
  { bg: "#001a14", accent: "#34d399" },
];

const AGENCY_ID = "agency";

function getInitials(name?: string | null) {
  if (!name || !name.trim()) return "?";
  return name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
}

export default function AgencyTemplate({
  portfolio, isDark, setActiveMode, socialLinks, handleSocialClick,
  handleSendMessage, visitorName, setVisitorName, visitorEmail, setVisitorEmail,
  visitorMsg, setVisitorMsg, formLoading, formSuccess, isDemo, hue, labels, sectionOrder
}: TemplateProps) {
  const themeDef = getThemeById(AGENCY_ID);
  const theme = useMemo(() => {
    if (isDark) {
      return {
        bg: "#0c0c0c",
        text: "#fafaf9",
        muted: "#a3a3a3",
        border: "#2a2a2a",
        surface: "#161616",
        accent: hue.hex,
      };
    }
    return {
      bg: themeDef.light.bg,
      text: themeDef.light.fg,
      muted: themeDef.light.muted,
      border: themeDef.light.border,
      surface: themeDef.light.surface,
      accent: hue.hex,
    };
  }, [isDark, themeDef, hue.hex]);

  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = false;

  const initials = getInitials(portfolio.name);

  return (
    <div className="min-h-screen" style={{ background: theme.bg, color: theme.text, fontFamily: "'Cormorant Garamond', 'Inter', serif" }}>
      <link rel="stylesheet" href={GOOGLE_FONTS} />
      <style>{`
        .project-hover { transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        .project-hover:hover { background: ${isDark ? "#161616" : theme.surface}; }
        @keyframes reveal { from{clip-path:polygon(0 100%,100% 100%,100% 100%,0 100%)} to{clip-path:polygon(0 0,100% 0,100% 100%,0 100%)} }
        .text-reveal { animation: reveal 0.8s cubic-bezier(0.77, 0, 0.18, 1) forwards; }
      `}</style>

      {/* Ultra-minimal nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6"
        style={{ background: isDark ? "rgba(12,12,12,0.9)" : `${theme.surface}e6`, backdropFilter: "blur(20px)", borderBottom: `1px solid ${theme.border}` }}>
        <span className="text-sm font-bold tracking-wider uppercase" style={{ fontFamily: "'Inter', sans-serif", color: theme.text }}>
          {initials}
        </span>
        <div className="flex items-center gap-8">
          {socialLinks.map(({ key, url, Icon }) => (
            <a key={key} href={url} target="_blank" rel="noreferrer" onClick={() => handleSocialClick(key)}
              className="hover:opacity-60 transition-opacity" style={{ color: theme.muted }}><Icon className="w-4 h-4" /></a>
          ))}
          <button onClick={() => setActiveMode(isDark ? "light" : "dark")} className="hover:opacity-60 transition-opacity" style={{ color: theme.muted }}>
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Full-screen hero */}
      <section className="min-h-screen flex flex-col justify-between pt-28 px-8 pb-12 relative overflow-hidden">
        {/* Large background text */}
        <div className="absolute bottom-0 left-0 right-0 select-none pointer-events-none overflow-hidden leading-none font-black uppercase tracking-tighter"
          style={{ fontSize: "clamp(8rem, 20vw, 22rem)", color: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)", lineHeight: 0.85 }}>
          {portfolio.name?.split(" ")?.[0] ?? "?"}
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.77, 0, 0.18, 1] }}>
            <p className="text-sm font-sans font-semibold mb-6 flex items-center gap-3" style={{ color: theme.accent, fontFamily: "'Inter', sans-serif" }}>
              <span className="w-8 h-px" style={{ background: theme.accent }} /> {portfolio.title}
            </p>
            <h1 className="font-black italic leading-[0.88] tracking-tight mb-8" style={{ fontSize: "clamp(4rem, 11vw, 12rem)", color: theme.text }}>
              {portfolio.name ? portfolio.name.split(" ").map((w, i) => (
                <span key={i} className={i % 2 === 0 ? "" : "not-italic"}>
                  {w}{" "}
                </span>
              )) : "?"}
            </h1>
            <p className="text-lg leading-relaxed max-w-lg" style={{ color: theme.muted, fontFamily: "'Inter', sans-serif" }}>{portfolio.bio}</p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="flex justify-between items-end">
          <div className="flex gap-4 font-sans text-xs" style={{ fontFamily: "'Inter', sans-serif", color: theme.muted }}>
            {portfolio.location && <span>{portfolio.location}</span>}
            <span>·</span>
            <span>{portfolio.contactEmail}</span>
          </div>
          <a href="#portfolio-projects"
            className="flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-white"
            style={{ background: theme.accent, fontFamily: "'Inter', sans-serif" }}>
            View Work <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </section>

      {/* Projects — editorial list */}
      {sectionOrder.includes("projects") && (
        <section id="portfolio-projects" className="border-t relative" style={{ borderColor: theme.border }}>
          <div className="px-8 py-4 flex justify-between items-center border-b" style={{ borderColor: theme.border }}>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] font-sans" style={{ color: theme.muted, fontFamily: "'Inter', sans-serif" }}>
              Selected Work
            </p>
            <p className="text-[10px] font-sans" style={{ color: theme.muted, fontFamily: "'Inter', sans-serif" }}>
              {String(portfolio.projects?.length || 0).padStart(2, "0")} Projects
            </p>
          </div>

          <div
            onMouseMove={e => setMousePos({ x: e.clientX, y: e.clientY })}
          >
            {portfolio.projects?.map((p, i) => {
              const pal = PROJECT_PALETTES[i % PROJECT_PALETTES.length];
              return (
                <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="project-hover group px-8 py-7 border-b flex flex-col md:flex-row gap-4 md:gap-8 items-start md:items-center cursor-pointer"
                  style={{ borderColor: theme.border }}
                  onMouseEnter={() => setHoveredProject(i)}
                  onMouseLeave={() => setHoveredProject(null)}>
                  <span className="text-[10px] font-mono text-slate-600 min-w-[28px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-black italic mb-1 group-hover:text-current transition-colors" style={{ color: hoveredProject === i ? pal.accent : theme.text }}>
                      {p.title}
                    </h3>
                    <p className="text-sm leading-relaxed font-sans" style={{ color: theme.muted, fontFamily: "'Inter', sans-serif" }}>{p.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 min-w-[140px]">
                     {(Array.isArray(p.techStack) ? p.techStack : []).slice(0, 3).map((t, ti) => (
                      <span key={ti} className="text-[10px] font-sans px-2 py-1 rounded-full border"
                        style={{ borderColor: theme.border, color: theme.muted, fontFamily: "'Inter', sans-serif" }}>{t}</span>
                    ))}
                  </div>
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noreferrer"
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full border"
                      style={{ borderColor: theme.border, color: theme.text }}>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Floating preview on hover */}
          {hoveredProject !== null && (
            <div className="fixed pointer-events-none z-30 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] w-40 h-28 transition-none"
              style={{ left: mousePos.x + 20, top: mousePos.y - 56, background: PROJECT_PALETTES[hoveredProject % PROJECT_PALETTES.length].bg }}>
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-4xl font-black" style={{ color: PROJECT_PALETTES[hoveredProject % PROJECT_PALETTES.length].accent, opacity: 0.6 }}>
                  {String(hoveredProject + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Skills — horizontal */}
      {sectionOrder.includes("skills") && (
        <section id="portfolio-skills" className="px-8 py-16 border-b" style={{ borderColor: theme.border }}>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 font-sans" style={{ color: theme.muted, fontFamily: "'Inter', sans-serif" }}>
            {labels.skills}
          </p>
          <div className="flex flex-wrap gap-4">
            {portfolio.skills?.map((s, i) => (
              <motion.span key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                whileHover={{ color: theme.accent }}
                className="text-2xl md:text-4xl font-black italic cursor-default transition-colors"
                style={{ color: i % 3 === 0 ? theme.text : theme.muted }}>
                {s}
              </motion.span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {sectionOrder.includes("experience") && (
        <section id="portfolio-experience" className="px-8 py-16 border-b" style={{ borderColor: theme.border }}>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 font-sans" style={{ color: theme.muted, fontFamily: "'Inter', sans-serif" }}>
            {labels.experience}
          </p>
          <div className="space-y-0">
            {portfolio.experience?.map((exp, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="py-8 grid grid-cols-12 gap-4 border-t group"
                style={{ borderColor: theme.border }}>
                <div className="col-span-3 text-xs font-mono" style={{ color: theme.muted, fontFamily: "'JetBrains Mono', monospace" }}>
                  {exp.startDate}<br />{exp.endDate}
                </div>
                <div className="col-span-9">
                  <h3 className="text-2xl font-black italic mb-1">{exp.role}</h3>
                  <p className="text-sm font-bold mb-3 font-sans" style={{ color: theme.accent, fontFamily: "'Inter', sans-serif" }}>{exp.company}</p>
                  <p className="text-sm leading-relaxed font-sans" style={{ color: theme.muted, fontFamily: "'Inter', sans-serif" }}>{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Contact — fullscreen */}
      {sectionOrder.includes("contact") && (
        <section id="portfolio-contact" className="px-8 py-24 min-h-[70vh] flex flex-col justify-center"
          style={{ background: isDark ? "#0a0a0a" : theme.surface }}>
          <div className="max-w-3xl mx-auto w-full">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 font-sans" style={{ color: theme.muted, fontFamily: "'Inter', sans-serif" }}>
              Get in Touch
            </p>
            <h2 className="font-black italic leading-none mb-12" style={{ fontSize: "clamp(3rem, 9vw, 8rem)", color: theme.text }}>
              Let's<br /><span style={{ color: theme.accent }}>Collaborate.</span>
            </h2>
            {formSuccess && (
              <div className="mb-6 p-4 rounded-2xl flex items-center gap-2 text-sm font-sans"
                style={{ background: `${theme.accent}15`, color: theme.accent, border: `1px solid ${theme.accent}30`, fontFamily: "'Inter', sans-serif" }}>
                <Check className="w-4 h-4" />{formSuccess}
              </div>
            )}
            <form onSubmit={handleSendMessage} className="space-y-4 font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
              <div className="grid sm:grid-cols-2 gap-4">
                {[{ph:"Your name",val:visitorName,set:setVisitorName},{ph:"Email",val:visitorEmail,set:setVisitorEmail,type:"email",req:true}].map((f,i)=>(
                  <input key={i} type={f.type||"text"} required={f.req} placeholder={f.ph} value={f.val}
                    onChange={e=>f.set(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl text-sm outline-none border transition-all"
                    style={{ background: theme.bg, borderColor: theme.border, color: theme.text }}
                    onFocus={e=>(e.currentTarget.style.borderColor=theme.accent)}
                    onBlur={e=>(e.currentTarget.style.borderColor=theme.border)} />
                ))}
              </div>
              <textarea rows={4} required placeholder="Describe your project..." value={visitorMsg} onChange={e=>setVisitorMsg(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl text-sm outline-none resize-none border transition-all"
                style={{ background: theme.bg, borderColor: theme.border, color: theme.text }}
                onFocus={e=>(e.currentTarget.style.borderColor=theme.accent)}
                onBlur={e=>(e.currentTarget.style.borderColor=theme.border)} />
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit" disabled={formLoading}
                className="flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold text-white cursor-pointer"
                style={{ background: theme.accent }}>
                <Send className="w-4 h-4" />{formLoading ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </div>
        </section>
      )}

      <footer className="border-t py-8 px-8 flex justify-between items-center text-[11px] font-sans" style={{ borderColor: theme.border, color: theme.muted, fontFamily: "'Inter', sans-serif" }}>
        <span>© {new Date().getFullYear()} {portfolio.name || "Portfolio"}</span>
        <span>Powered by FolioAI</span>
      </footer>
    </div>
  );
}
