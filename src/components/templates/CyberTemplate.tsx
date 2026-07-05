/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * TEMPLATE 2: CYBER
 * Visual Identity: Sci-fi cyberpunk with neon glows, grid lines, terminal aesthetics.
 * Layout: Full-width HUD-style navigation + sectioned main content.
 * Animations: Neon border pulses, typed text, scanline overlays, hover border draws.
 * Typography: Space Grotesk — geometric, techy, bold.
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink, MapPin, Mail, Sun, Moon, Send, Check,
  Code2, Briefcase, GraduationCap, Zap, Terminal
} from "lucide-react";
import type { TemplateProps } from "./templateUtils";
import { GOOGLE_FONTS } from "./templateUtils";

function TypewriterText({ text, speed = 40 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) { setDisplayed(text.slice(0, i + 1)); i++; }
      else clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return <span>{displayed}<span className="animate-pulse">_</span></span>;
}

export default function CyberTemplate({
  portfolio, isDark, setActiveMode, socialLinks, handleSocialClick,
  handleSendMessage, visitorName, setVisitorName, visitorEmail, setVisitorEmail,
  visitorMsg, setVisitorMsg, formLoading, formSuccess, isDemo, hue, labels, sectionOrder
}: TemplateProps) {
  const neon = hue.hex;
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#050508] text-slate-300 overflow-x-hidden relative" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <link rel="stylesheet" href={GOOGLE_FONTS} />

      {/* Animated grid background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: `linear-gradient(${neon}33 1px, transparent 1px), linear-gradient(90deg, ${neon}33 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />

      {/* Floating glow orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.06, 0.1, 0.06] }} transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px]" style={{ background: neon }} />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.08, 0.04] }} transition={{ duration: 12, repeat: Infinity, delay: 4 }}
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px]" style={{ background: neon }} />
      </div>

      {/* Scanline overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.015]"
        style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)" }} />

      {/* Navigation */}
      <nav className="relative z-20 flex justify-between items-center px-6 md:px-10 py-4 border-b border-white/[0.05] backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Terminal className="w-4 h-4" style={{ color: neon }} />
          <span className="text-sm font-bold tracking-[0.15em] uppercase font-mono" style={{ color: neon }}>
            {portfolio.name?.split(" ")[0]}
          </span>
          <span className="hidden md:inline text-[10px] text-slate-600 font-mono">// portfolio</span>
        </div>
        <div className="flex items-center gap-6">
          {["projects", "experience", "contact"].filter(s => sectionOrder.includes(s)).map(s => (
            <a key={s} href={`#portfolio-${s}`} className="hidden md:block text-xs font-mono uppercase tracking-widest text-slate-600 hover:text-slate-300 transition-colors"
              style={{ "--hover-color": neon } as any}
              onMouseEnter={e => (e.currentTarget.style.color = neon)}
              onMouseLeave={e => (e.currentTarget.style.color = "")}>{s}</a>
          ))}
          {socialLinks.map(({ key, url, Icon }) => (
            <a key={key} href={url} target="_blank" rel="noreferrer" onClick={() => handleSocialClick(key)}
              className="text-slate-600 hover:text-slate-300 transition-colors"><Icon className="w-4 h-4" /></a>
          ))}
          <button onClick={() => setActiveMode(isDark ? "light" : "dark")} className="text-slate-600 hover:text-slate-300 transition-colors">
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section id="portfolio-hero" className="relative z-10 px-6 md:px-10 py-24 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="mb-6 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full animate-ping" style={{ background: neon }} />
            <span className="text-xs font-mono tracking-[0.3em] uppercase" style={{ color: neon }}>
              <TypewriterText text="Available for opportunities" />
            </span>
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-none mb-4 tracking-tight">
            {portfolio.name?.split(" ")[0]}
            <br />
            <span style={{ color: neon, textShadow: `0 0 60px ${neon}40` }}>
              {portfolio.name?.split(" ").slice(1).join(" ")}
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-3 font-medium">{portfolio.title}</p>
          <p className="text-sm text-slate-500 leading-relaxed max-w-xl mb-8 font-sans">{portfolio.bio}</p>
          <div className="flex flex-wrap items-center gap-4">
            <motion.a whileHover={{ scale: 1.03, boxShadow: `0 0 30px ${neon}50` }} href={`mailto:${portfolio.contactEmail}`}
              className="flex items-center gap-2 px-6 py-3 font-bold text-sm uppercase tracking-wider text-black transition-all"
              style={{ background: neon }}>
              Get in Touch <Zap className="w-4 h-4" />
            </motion.a>
            {portfolio.location && (
              <span className="text-sm text-slate-600 flex items-center gap-1.5 font-mono">
                <MapPin className="w-3.5 h-3.5" style={{ color: neon }} />{portfolio.location}
              </span>
            )}
          </div>
        </motion.div>
      </section>

      {/* Sections */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 space-y-24 pb-24">
        {sectionOrder.filter(s => !["hero", "social-feed", "about"].includes(s)).map((sectionId) => {
          const dividerEl = (
            <div className="flex items-center gap-4 mb-10">
              <div className="w-px h-5 opacity-40" style={{ background: neon }} />
              <h2 className="text-[10px] font-mono uppercase tracking-[0.35em] text-slate-600">{
                sectionId === "skills" ? labels.skills :
                sectionId === "projects" ? labels.projects :
                sectionId === "experience" ? labels.experience :
                sectionId === "education" ? labels.education : sectionId
              }</h2>
              <div className="flex-1 h-px opacity-10" style={{ background: neon }} />
              {sectionId === "skills" && <Code2 className="w-4 h-4 opacity-30" style={{ color: neon }} />}
              {sectionId === "projects" && <Zap className="w-4 h-4 opacity-30" style={{ color: neon }} />}
              {sectionId === "experience" && <Briefcase className="w-4 h-4 opacity-30" style={{ color: neon }} />}
              {sectionId === "education" && <GraduationCap className="w-4 h-4 opacity-30" style={{ color: neon }} />}
              {sectionId === "contact" && <Mail className="w-4 h-4 opacity-30" style={{ color: neon }} />}
            </div>
          );

          if (sectionId === "skills") return (
            <motion.section key="skills" id="portfolio-skills" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              {dividerEl}
              <div className="flex flex-wrap gap-2">
                {portfolio.skills?.map((s, i) => (
                  <motion.span key={i} whileHover={{ scale: 1.05, boxShadow: `0 0 15px ${neon}30` }} transition={{ duration: 0.2 }}
                    className="px-4 py-2 text-xs font-mono border text-slate-300 cursor-default transition-all"
                    style={{ borderColor: `${neon}25`, color: `${neon}cc` }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${neon}70`; (e.currentTarget as HTMLElement).style.color = neon; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${neon}25`; (e.currentTarget as HTMLElement).style.color = `${neon}cc`; }}>
                    {s}
                  </motion.span>
                ))}
              </div>
            </motion.section>
          );

          if (sectionId === "projects") return (
            <motion.section key="projects" id="portfolio-projects" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              {dividerEl}
              <div className="grid md:grid-cols-2 gap-4">
                {portfolio.projects?.map((p, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="group relative border border-white/5 p-6 transition-all duration-300 cursor-default overflow-hidden"
                    onMouseEnter={() => setHoveredProject(i)} onMouseLeave={() => setHoveredProject(null)}
                    style={{ borderColor: hoveredProject === i ? `${neon}40` : undefined }}>
                    <AnimatePresence>
                      {hoveredProject === i && (
                        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0 }} style={{ background: neon, originX: 0 }}
                          className="absolute top-0 left-0 right-0 h-[1px]" />
                      )}
                    </AnimatePresence>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-white">{p.title}</h3>
                      {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-white"><ExternalLink className="w-4 h-4" /></a>}
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.techStack?.map((t, ti) => <span key={ti} className="text-[10px] font-mono px-2 py-0.5 bg-white/[0.04] border border-white/[0.06] text-slate-500">{t}</span>)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          );

          if (sectionId === "experience") return (
            <motion.section key="experience" id="portfolio-experience" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              {dividerEl}
              <div className="space-y-5">
                {portfolio.experience?.map((exp, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="border border-white/5 p-5 relative overflow-hidden group"
                    onMouseEnter={e => (e.currentTarget.style.borderColor = `${neon}25`)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}>
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] transition-colors duration-300 group-hover:opacity-100 opacity-0" style={{ background: neon }} />
                    <div className="flex justify-between items-start flex-wrap gap-2 mb-2 pl-2">
                      <div>
                        <h3 className="font-bold text-white">{exp.role}</h3>
                        <p className="text-sm font-semibold" style={{ color: neon }}>{exp.company}</p>
                      </div>
                      <span className="text-[10px] font-mono text-slate-600">{exp.startDate} — {exp.endDate}</span>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed pl-2">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          );

          if (sectionId === "education") return (
            <motion.section key="education" id="portfolio-education" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              {dividerEl}
              <div className="space-y-3">
                {portfolio.education?.map((edu, i) => (
                  <div key={i} className="border border-white/5 p-5 flex justify-between items-center">
                    <div><h3 className="font-bold text-white">{edu.degree}</h3><p className="text-sm text-slate-500">{edu.school}</p></div>
                    <span className="text-xs font-mono" style={{ color: neon }}>{edu.year}</span>
                  </div>
                ))}
              </div>
            </motion.section>
          );

          if (sectionId === "contact") return (
            <motion.section key="contact" id="portfolio-contact" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              {dividerEl}
              {formSuccess && <div className="p-4 border mb-5 text-sm flex items-center gap-2 text-emerald-400" style={{ borderColor: `${neon}30` }}><Check className="w-4 h-4" />{formSuccess}</div>}
              <form onSubmit={handleSendMessage} className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <input type="text" placeholder="Name" value={visitorName} onChange={e => setVisitorName(e.target.value)}
                    className="bg-transparent border border-white/10 px-4 py-3 text-sm text-slate-300 placeholder-slate-600 outline-none transition-all font-mono"
                    onFocus={e => (e.currentTarget.style.borderColor = `${neon}50`)} onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")} />
                  <input type="email" required placeholder="Email" value={visitorEmail} onChange={e => setVisitorEmail(e.target.value)}
                    className="bg-transparent border border-white/10 px-4 py-3 text-sm text-slate-300 placeholder-slate-600 outline-none transition-all font-mono"
                    onFocus={e => (e.currentTarget.style.borderColor = `${neon}50`)} onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")} />
                </div>
                <textarea rows={4} required placeholder="Message" value={visitorMsg} onChange={e => setVisitorMsg(e.target.value)}
                  className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-slate-300 placeholder-slate-600 outline-none resize-none transition-all font-mono"
                  onFocus={e => (e.currentTarget.style.borderColor = `${neon}50`)} onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")} />
                <motion.button whileHover={{ boxShadow: `0 0 30px ${neon}50` }} whileTap={{ scale: 0.97 }} type="submit" disabled={formLoading}
                  className="px-6 py-3 text-sm font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all text-black"
                  style={{ background: neon }}>
                  <Send className="w-4 h-4" />{formLoading ? "Transmitting..." : "Send Message"}
                </motion.button>
              </form>
            </motion.section>
          );

          return null;
        })}
      </div>

      <footer className="relative z-10 text-center py-8 border-t border-white/5 text-[11px] font-mono text-slate-700">
        © {new Date().getFullYear()} {portfolio.name} <span style={{ color: neon }}>·</span> Powered by FolioAI
      </footer>
    </div>
  );
}
