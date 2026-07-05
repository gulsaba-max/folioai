/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * TEMPLATE 5: CREATIVE DESIGNER
 * Large images, horizontal project gallery, oversized typography, animated text loop.
 */
import React, { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { ExternalLink, Sun, Moon, Send, Check, ArrowRight, ArrowUpRight } from "lucide-react";
import type { TemplateProps } from "./templateUtils";
import { GOOGLE_FONTS } from "./templateUtils";

const PROJECT_COLORS = [
  "linear-gradient(135deg,#fbbf24,#f43f5e)",
  "linear-gradient(135deg,#a78bfa,#06b6d4)",
  "linear-gradient(135deg,#34d399,#3b82f6)",
  "linear-gradient(135deg,#f97316,#a855f7)",
  "linear-gradient(135deg,#ec4899,#f59e0b)",
  "linear-gradient(135deg,#6366f1,#10b981)",
];

export default function CreativeTemplate({
  portfolio, isDark, setActiveMode, socialLinks, handleSocialClick,
  handleSendMessage, visitorName, setVisitorName, visitorEmail, setVisitorEmail,
  visitorMsg, setVisitorMsg, formLoading, formSuccess, isDemo, hue, labels, sectionOrder
}: TemplateProps) {
  const accent = hue.hex;
  const bg = isDark ? "#0c0c0c" : "#fdf6ee";
  const text = isDark ? "#fafaf9" : "#1c1917";
  const muted = isDark ? "#78716c" : "#9ca3af";
  const card = isDark ? "#161412" : "#fff";
  const border = isDark ? "#292524" : "#e7e5e4";

  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ background: bg, color: text, fontFamily: "'DM Sans', sans-serif" }}>
      <link rel="stylesheet" href={GOOGLE_FONTS} />
      <style>{`
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .marquee-inner { animation: marquee 20s linear infinite; }
        .marquee-inner:hover { animation-play-state: paused; }
      `}</style>

      {/* Nav — minimal left-side */}
      <header className="flex items-center justify-between px-8 py-6 border-b sticky top-0 z-50"
        style={{ background: isDark ? "rgba(12,12,12,0.9)" : "rgba(253,246,238,0.9)", backdropFilter: "blur(16px)", borderColor: border }}>
        <div>
          <span className="text-sm font-black tracking-tight">{portfolio.name}</span>
          <span className="text-xs ml-2" style={{ color: accent }}>— {portfolio.title}</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          {["projects", "skills", "experience"].filter(s => sectionOrder.includes(s)).map(s => (
            <a key={s} href={`#portfolio-${s}`} className="text-xs font-semibold hover:opacity-60 transition-opacity capitalize"
              style={{ color: muted }}>{s}</a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          {socialLinks.map(({ key, url, Icon }) => (
            <a key={key} href={url} target="_blank" rel="noreferrer" onClick={() => handleSocialClick(key)}
              className="hover:opacity-60 transition-opacity" style={{ color: muted }}><Icon className="w-4 h-4" /></a>
          ))}
          <button onClick={() => setActiveMode(isDark ? "light" : "dark")} className="hover:opacity-60 transition-opacity" style={{ color: muted }}>
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Hero — oversized with animated text */}
      <section className="px-8 pt-24 pb-16 max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 mb-12">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-black leading-[0.85] tracking-tight" style={{ fontSize: "clamp(4rem, 13vw, 12rem)" }}>
              {portfolio.name?.split(" ")[0]}
            </h1>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center gap-4">
            <div className="w-12 h-1 rounded-full" style={{ background: accent }} />
            <h2 className="font-black leading-[0.85] tracking-tight" style={{ fontSize: "clamp(4rem, 13vw, 12rem)", color: accent }}>
              {portfolio.name?.split(" ").slice(1).join(" ")}
            </h2>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1 max-w-xl">
            <p className="text-lg font-semibold mb-3" style={{ color: accent }}>{portfolio.title}</p>
            <p className="text-base leading-relaxed" style={{ color: muted }}>{portfolio.bio}</p>
          </div>
          <div className="flex flex-col gap-3">
            <a href={`mailto:${portfolio.contactEmail}`}
              className="group flex items-center gap-3 px-6 py-3.5 rounded-full text-sm font-bold transition-all"
              style={{ background: accent, color: "#fff" }}>
              Start a Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="flex items-center gap-3 justify-center">
              {socialLinks.map(({ key, url, Icon }) => (
                <a key={key} href={url} target="_blank" rel="noreferrer" onClick={() => handleSocialClick(key)}
                  className="w-9 h-9 rounded-full flex items-center justify-center border hover:scale-110 transition-transform"
                  style={{ borderColor: border, color: muted }}><Icon className="w-4 h-4" /></a>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Marquee skill ticker */}
      {sectionOrder.includes("skills") && (
        <div className="border-y py-4 overflow-hidden" id="portfolio-skills" style={{ borderColor: border }}>
          <div className="marquee-inner flex whitespace-nowrap gap-6">
            {[...portfolio.skills || [], ...portfolio.skills || []].map((s, i) => (
              <span key={i} className="flex items-center gap-3 text-sm font-bold px-4">
                <span style={{ color: accent }}>✦</span>
                <span style={{ color: muted }}>{s}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects — large cards */}
      {sectionOrder.includes("projects") && (
        <section id="portfolio-projects" className="px-8 py-20 max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] mb-2" style={{ color: muted }}>Selected Work</p>
              <h2 className="text-4xl md:text-6xl font-black">{labels.projects}</h2>
            </div>
            <div className="text-sm font-semibold" style={{ color: muted }}>{portfolio.projects?.length || 0} projects</div>
          </div>
          <div className="space-y-6">
            {portfolio.projects?.map((p, i) => (
              <motion.article key={i}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                onHoverStart={() => setActiveProject(i)}
                onHoverEnd={() => setActiveProject(null)}
                className="group relative rounded-3xl overflow-hidden cursor-pointer"
                style={{ border: `1px solid ${border}` }}>
                {/* Color block hero */}
                <div className="h-48 md:h-64 relative overflow-hidden"
                  style={{ background: PROJECT_COLORS[i % PROJECT_COLORS.length] }}>
                  <motion.div
                    animate={activeProject === i ? { scale: 1.05 } : { scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                    style={{ background: PROJECT_COLORS[i % PROJECT_COLORS.length] }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl md:text-8xl font-black text-white/20 tracking-tighter select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noreferrer"
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/30">
                      <ArrowUpRight className="w-5 h-5" />
                    </a>
                  )}
                </div>
                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8" style={{ background: card }}>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-black mb-2">{p.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: muted }}>{p.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 md:flex-col md:items-end md:justify-center">
                    {p.techStack?.map((t, ti) => (
                      <span key={ti} className="text-[10px] font-bold px-3 py-1.5 rounded-full border"
                        style={{ borderColor: border, color: muted }}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {sectionOrder.includes("experience") && (
        <section id="portfolio-experience" className="px-8 py-16 border-t" style={{ borderColor: border }}>
          <div className="max-w-7xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-2" style={{ color: muted }}>Career</p>
            <h2 className="text-4xl md:text-5xl font-black mb-12">{labels.experience}</h2>
            <div className="space-y-0">
              {portfolio.experience?.map((exp, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="py-8 grid md:grid-cols-4 gap-4 group border-t"
                  style={{ borderColor: border }}>
                  <div className="text-xs font-mono" style={{ color: muted }}>{exp.startDate}<br />{exp.endDate}</div>
                  <div className="md:col-span-3">
                    <h3 className="text-xl font-black mb-1">{exp.role}</h3>
                    <p className="text-sm font-bold mb-3" style={{ color: accent }}>{exp.company}</p>
                    <p className="text-sm leading-relaxed" style={{ color: muted }}>{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      {sectionOrder.includes("contact") && (
        <section id="portfolio-contact" className="px-8 py-20 border-t" style={{ borderColor: border, background: isDark ? "#111" : "#fff" }}>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: muted }}>Let's Work Together</p>
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-none">Start a<br /><span style={{ color: accent }}>Project.</span></h2>
            {formSuccess && (
              <div className="mb-6 p-3 rounded-xl inline-flex items-center gap-2 text-sm"
                style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}30` }}>
                <Check className="w-4 h-4" />{formSuccess}
              </div>
            )}
            <form onSubmit={handleSendMessage} className="space-y-4 text-left">
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Your name" value={visitorName} onChange={e => setVisitorName(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl text-sm outline-none border transition-all"
                  style={{ background: isDark ? "#1a1a1a" : "#f5f5f4", borderColor: border, color: text }}
                  onFocus={e => (e.currentTarget.style.borderColor = accent)}
                  onBlur={e => (e.currentTarget.style.borderColor = border)} />
                <input type="email" required placeholder="Email" value={visitorEmail} onChange={e => setVisitorEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl text-sm outline-none border transition-all"
                  style={{ background: isDark ? "#1a1a1a" : "#f5f5f4", borderColor: border, color: text }}
                  onFocus={e => (e.currentTarget.style.borderColor = accent)}
                  onBlur={e => (e.currentTarget.style.borderColor = border)} />
              </div>
              <textarea rows={4} required placeholder="Tell me about your project..." value={visitorMsg} onChange={e => setVisitorMsg(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl text-sm outline-none border resize-none transition-all"
                style={{ background: isDark ? "#1a1a1a" : "#f5f5f4", borderColor: border, color: text }}
                onFocus={e => (e.currentTarget.style.borderColor = accent)}
                onBlur={e => (e.currentTarget.style.borderColor = border)} />
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit" disabled={formLoading}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-black cursor-pointer"
                style={{ background: accent, color: "#fff" }}>
                <Send className="w-4 h-4" />{formLoading ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </div>
        </section>
      )}

      <footer className="border-t py-10 px-8 max-w-7xl mx-auto flex justify-between items-center text-xs"
        style={{ borderColor: border, color: muted }}>
        <span>© {new Date().getFullYear()} {portfolio.name}</span>
        <span>Powered by FolioAI</span>
      </footer>
    </div>
  );
}
