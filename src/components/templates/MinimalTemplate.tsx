/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * TEMPLATE 1: MINIMAL LUXURY
 * Inspired by: Apple, Linear, Vercel
 * Features: Huge typography, lots of whitespace, elegant animations, sticky nav
 */
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { MapPin, Mail, Phone, ExternalLink, ArrowRight, Sun, Moon, Send, Check, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import type { TemplateProps } from "./templateUtils";
import { GOOGLE_FONTS } from "./templateUtils";

const useScrollY = () => {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
};

function AnimatedWord({ word, delay = 0, ...rest }: { word: string; delay?: number } & React.HTMLAttributes<HTMLSpanElement>) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.span ref={ref} style={{ display: "inline-block", overflow: "hidden" }}>
      <motion.span
        style={{ display: "inline-block" }}
        initial={{ y: "110%" }}
        animate={inView ? { y: "0%" } : { y: "110%" }}
        transition={{ duration: 0.7, delay, ease: [0.77, 0, 0.18, 1] }}
      >
        {word}&nbsp;
      </motion.span>
    </motion.span>
  );
}

export default function MinimalTemplate({
  portfolio, isDark, setActiveMode, socialLinks, handleSocialClick,
  handleSendMessage, visitorName, setVisitorName, visitorEmail, setVisitorEmail,
  visitorMsg, setVisitorMsg, formLoading, formSuccess, isDemo, hue, labels, sectionOrder
}: TemplateProps) {
  const scrollY = useScrollY();
  const navScrolled = scrollY > 60;
  const bg = isDark ? "#0a0a0a" : "#ffffff";
  const text = isDark ? "#f5f5f5" : "#0a0a0a";
  const muted = isDark ? "#666" : "#999";
  const subtle = isDark ? "#1a1a1a" : "#f5f5f5";
  const border = isDark ? "#222" : "#eee";
  const accent = hue.hex;

  const nameWords = (portfolio.name || "").split(" ");

  return (
    <div className="min-h-screen" style={{ background: bg, color: text, fontFamily: "'Inter', sans-serif" }}>
      <link rel="stylesheet" href={GOOGLE_FONTS} />
      <style>{`
        @keyframes shimmer { from { background-position: -200% center; } to { background-position: 200% center; } }
        .gradient-text { background: linear-gradient(90deg, ${text} 0%, ${accent} 50%, ${text} 100%); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: shimmer 4s linear infinite; }
        .hover-line::after { content: ''; display: block; width: 0; height: 1px; background: currentColor; transition: width 0.4s ease; }
        .hover-line:hover::after { width: 100%; }
      `}</style>

      {/* Sticky Nav */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-300"
        style={{
          height: navScrolled ? 52 : 72,
          background: navScrolled ? (isDark ? "rgba(10,10,10,0.9)" : "rgba(255,255,255,0.9)") : "transparent",
          borderBottom: navScrolled ? `1px solid ${border}` : "none",
          backdropFilter: navScrolled ? "blur(20px)" : "none",
        }}
      >
        <span className="text-sm font-bold tracking-tight">{portfolio.name?.split(" ")[0] || "Portfolio"}</span>
        <div className="hidden md:flex items-center gap-8">
          {["projects", "experience", "skills"].filter(s => sectionOrder.includes(s)).map(s => (
            <a key={s} href={`#portfolio-${s}`}
              className="text-xs hover-line transition-opacity hover:opacity-70 capitalize"
              style={{ color: muted }}>
              {labels[s as keyof typeof labels] || s}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {socialLinks.slice(0, 3).map(({ key, url, Icon }) => (
            <a key={key} href={url} target="_blank" rel="noreferrer" onClick={() => handleSocialClick(key)}
              className="transition-opacity hover:opacity-60" style={{ color: muted }}><Icon className="w-4 h-4" /></a>
          ))}
          <button onClick={() => setActiveMode(isDark ? "light" : "dark")}
            className="p-1.5 rounded-lg transition-all hover:opacity-60" style={{ color: muted }}>
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          {portfolio.location && (
            <div className="flex items-center gap-2 mb-8" style={{ color: muted }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
              <span className="text-xs tracking-wider">{portfolio.location}</span>
            </div>
          )}
        </motion.div>

        <h1 className="mb-8 leading-[0.9] tracking-tight font-black" style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}>
          {nameWords.map((w, i) => <AnimatedWord key={i} word={w} delay={i * 0.12} />)}
        </h1>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex-1">
            <p className="text-lg md:text-xl font-medium mb-2" style={{ color: accent }}>{portfolio.title}</p>
            <p className="text-base leading-relaxed max-w-lg" style={{ color: muted }}>{portfolio.bio}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-col gap-3">
            <a href={`mailto:${portfolio.contactEmail}`}
              className="group flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:opacity-90"
              style={{ background: text, color: bg }}>
              Get in Touch <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href={`#portfolio-projects`}
              className="flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:opacity-80 border border-white/20 dark:border-slate-700/30"
              style={{ borderColor: border, color: text }}>
              {labels.projects}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Thin divider */}
      <div className="w-full h-px" style={{ background: border }} />

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-6 md:px-12">
        {sectionOrder.filter(s => !["hero", "about", "social-feed"].includes(s)).map((sectionId) => {
          if (sectionId === "skills") return (
            <Section key="skills" id="portfolio-skills" title={labels.skills} isDark={isDark} border={border}>
              <div className="flex flex-wrap gap-3">
                {portfolio.skills?.map((s, i) => (
                  <motion.span key={i}
                    initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 rounded-full text-sm font-medium border border-white/20 dark:border-slate-700/30 transition-all cursor-default"
                    style={{ borderColor: border, color: text, background: subtle }}>
                    {s}
                  </motion.span>
                ))}
              </div>
            </Section>
          );

          if (sectionId === "projects") return (
            <Section key="projects" id="portfolio-projects" title={labels.projects} isDark={isDark} border={border}>
              <div className="grid md:grid-cols-2 gap-6">
                {portfolio.projects?.map((p, i) => (
                  <motion.article key={i}
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="group p-6 rounded-2xl border border-white/20 dark:border-slate-700/30 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all"
                    style={{ borderColor: border, background: subtle }}>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-mono px-2 py-1 rounded-md" style={{ color: muted, background: border }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {p.link && (
                        <a href={p.link} target="_blank" rel="noreferrer"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: accent }}>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: muted }}>{p.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.techStack?.map((t, ti) => (
                        <span key={ti} className="text-[10px] font-medium px-2 py-1 rounded"
                          style={{ background: border, color: muted }}>{t}</span>
                      ))}
                    </div>
                  </motion.article>
                ))}
              </div>
            </Section>
          );

          if (sectionId === "experience") return (
            <Section key="experience" id="portfolio-experience" title={labels.experience} isDark={isDark} border={border}>
              <div className="space-y-0">
                {portfolio.experience?.map((exp, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="py-8 grid md:grid-cols-5 gap-6"
                    style={{ borderBottom: `1px solid ${border}` }}>
                    <div className="md:col-span-1">
                      <span className="text-xs font-mono" style={{ color: muted }}>{exp.startDate}<br />{exp.endDate}</span>
                    </div>
                    <div className="md:col-span-4">
                      <h3 className="text-lg font-bold mb-0.5">{exp.role}</h3>
                      <p className="text-sm font-semibold mb-3" style={{ color: accent }}>{exp.company}</p>
                      <p className="text-sm leading-relaxed" style={{ color: muted }}>{exp.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Section>
          );

          if (sectionId === "education") return (
            <Section key="education" id="portfolio-education" title={labels.education} isDark={isDark} border={border}>
              <div className="grid md:grid-cols-2 gap-6">
                {portfolio.education?.map((edu, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                    className="p-6 rounded-2xl border border-white/20 dark:border-slate-700/30 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
                    style={{ borderColor: border, background: subtle }}>
                    <h3 className="font-bold mb-1">{edu.degree}</h3>
                    <p className="text-sm" style={{ color: muted }}>{edu.school}</p>
                    <p className="text-xs mt-2 font-mono" style={{ color: accent }}>{edu.year}</p>
                  </motion.div>
                ))}
              </div>
            </Section>
          );

          if (sectionId === "contact") return (
            <Section key="contact" id="portfolio-contact" title="Get in Touch" isDark={isDark} border={border}>
              <div className="max-w-lg">
                {formSuccess && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-2xl flex items-center gap-2 text-sm"
                    style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}30` }}>
                    <Check className="w-4 h-4 flex-shrink-0" />{formSuccess}
                  </motion.div>
                )}
                <form onSubmit={handleSendMessage} className="space-y-4">
                  <input type="text" placeholder="Your name" value={visitorName} onChange={e => setVisitorName(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl text-sm outline-none transition-all border border-white/20 dark:border-slate-700/30"
                    style={{ background: subtle, borderColor: border, color: text }}
                    onFocus={e => (e.currentTarget.style.borderColor = accent)}
                    onBlur={e => (e.currentTarget.style.borderColor = border)} />
                  <input type="email" required placeholder="Email address" value={visitorEmail} onChange={e => setVisitorEmail(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl text-sm outline-none transition-all border border-white/20 dark:border-slate-700/30"
                    style={{ background: subtle, borderColor: border, color: text }}
                    onFocus={e => (e.currentTarget.style.borderColor = accent)}
                    onBlur={e => (e.currentTarget.style.borderColor = border)} />
                  <textarea rows={4} required placeholder="Your message..." value={visitorMsg} onChange={e => setVisitorMsg(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl text-sm outline-none resize-none border border-white/20 dark:border-slate-700/30"
                    style={{ background: subtle, borderColor: border, color: text }}
                    onFocus={e => (e.currentTarget.style.borderColor = accent)}
                    onBlur={e => (e.currentTarget.style.borderColor = border)} />
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    type="submit" disabled={formLoading}
                    className="flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold cursor-pointer transition-all shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
                    style={{ background: text, color: bg }}>
                    <Send className="w-4 h-4" />{formLoading ? "Sending..." : "Send Message"}
                  </motion.button>
                </form>
              </div>
            </Section>
          );
          return null;
        })}
      </main>

      <footer className="border-t py-12 px-6 md:px-12 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4"
        style={{ borderColor: border }}>
        <p className="text-xs" style={{ color: muted }}>© {new Date().getFullYear()} {portfolio.name}</p>
        <div className="flex gap-4">
          {socialLinks.map(({ key, url, Icon }) => (
            <a key={key} href={url} target="_blank" rel="noreferrer" onClick={() => handleSocialClick(key)}
              className="hover:opacity-60 transition-opacity" style={{ color: muted }}><Icon className="w-4 h-4" /></a>
          ))}
        </div>
        <p className="text-xs" style={{ color: muted }}>Powered by FolioAI</p>
      </footer>
    </div>
  );
}

function Section({ id, title, children, isDark, border, ...rest }: {
  id: string; title: string; children: React.ReactNode; isDark: boolean; border: string
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.section ref={ref} id={id} className="py-20 border-t" style={{ borderColor: border }}>
      <motion.h2
        initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-[10px] font-bold uppercase tracking-[0.25em] mb-10"
        style={{ color: isDark ? "#666" : "#999" }}>
        {title}
      </motion.h2>
      {children}
    </motion.section>
  );
}
