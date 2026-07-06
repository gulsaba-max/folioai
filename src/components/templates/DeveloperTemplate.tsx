/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * TEMPLATE 3: DEVELOPER PORTFOLIO
 * Inspired by: GitHub, Vercel, Stripe
 * Features: Terminal hero, code snippets, repo-style cards, animated cursor, syntax colors.
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { ExternalLink, Sun, Moon, Send, Check, Terminal, GitBranch, Star, Code2, Briefcase, GraduationCap, Zap, MapPin, Mail } from "lucide-react";
import type { TemplateProps } from "./templateUtils";
import { getThemeById } from "./design-tokens";
import type { CSSVariableMap } from "./design-tokens";
import { GOOGLE_FONTS } from "./templateUtils";

function useTyping(lines: string[], speed = 45) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (done) return;
    if (lineIdx >= lines.length) { setDone(true); return; }
    const line = lines[lineIdx];
    if (charIdx <= line.length) {
      const t = setTimeout(() => {
        setDisplayed(prev => {
          const next = [...prev];
          next[lineIdx] = line.slice(0, charIdx);
          return next;
        });
        setCharIdx(c => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      setLineIdx(i => i + 1);
      setCharIdx(0);
    }
  }, [lineIdx, charIdx, lines, done, speed]);
  return displayed;
}

function TerminalHero({ name, title, email, theme, accent }: { name: string; title: string; email: string; theme: { bg: string; surface: string; border: string; fg: string; muted: string; accent: string }; accent: string }) {
  const lines = [
    `$ whoami`,
    `→ ${name}`,
    `$ cat about.txt`,
    `→ ${title}`,
    `$ git log --oneline -1`,
    `→ a3f9c12 "Available for new projects"`,
    `$ echo $CONTACT`,
    `→ ${email}`,
  ];
  const displayed = useTyping(lines, 40);
  return (
    <div className="rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] border" style={{ borderColor: theme.border, background: theme.bg }}>
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: theme.border, background: theme.surface }}>
        <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
        <div className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
        <span className="ml-3 text-[11px] font-mono" style={{ color: theme.muted }}>~/portfolio — zsh</span>
      </div>
      <div className="p-6 font-mono text-sm min-h-[200px]">
        {lines.map((line, i) => (
          <div key={i} className="mb-1 leading-relaxed">
            {displayed[i] !== undefined ? (
              <span style={{ color: line.startsWith("$") ? theme.accent : line.startsWith("→") ? theme.fg : theme.fg }}>
                {displayed[i]}
                {i === displayed.length - 1 && <span className="animate-pulse ml-0.5" style={{ color: theme.fg }}>▌</span>}
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillBar({ skill, i, theme, accent, key }: { skill: string; i: number; theme: CSSVariableMap; accent: string; key?: React.Key }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const width = 65 + ((i * 13) % 35);
  return (
    <div ref={ref} className="mb-3">
      <div className="flex justify-between text-xs mb-1.5" style={{ color: theme.muted }}>
        <span className="font-mono">{skill}</span>
        <span>{width}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: theme.bg }}>
        <motion.div className="h-full rounded-full" style={{ background: accent }}
          initial={{ width: 0 }} animate={inView ? { width: `${width}%` } : {}}
          transition={{ duration: 1, delay: i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }} />
      </div>
    </div>
  );
}

export default function DeveloperTemplate({
  portfolio, isDark, setActiveMode, socialLinks, handleSocialClick,
  handleSendMessage, visitorName, setVisitorName, visitorEmail, setVisitorEmail,
  visitorMsg, setVisitorMsg, formLoading, formSuccess, isDemo, hue, labels, sectionOrder
}: TemplateProps) {
  const themeDef = getThemeById("developer");
  const theme = isDark ? themeDef.dark : themeDef.light;
  const accent = hue.hex;
  const name = portfolio.name || "";
  const firstName = name.split(" ")[0] || "dev";

  return (
    <div className="min-h-screen" style={{ background: theme.bg, color: theme.fg, fontFamily: "'JetBrains Mono', monospace" }}>
      <link rel="stylesheet" href={GOOGLE_FONTS} />

      {/* Nav */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 border-b"
        style={{ background: `color-mix(in srgb, ${theme.bg} 92%, transparent)`, backdropFilter: "blur(20px)", borderColor: theme.border }}>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: accent }}>
            <Code2 className="w-3 h-3" style={{ color: theme.bg }} />
          </div>
           <span className="text-sm font-bold" style={{ color: theme.fg }}>{firstName.toLowerCase()}<span style={{ color: accent }}>.dev</span></span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {["projects", "experience", "skills"].filter(s => sectionOrder.includes(s)).map(s => (
            <a key={s} href={`#portfolio-${s}`} className="text-xs hover:opacity-70 transition-opacity font-mono" style={{ color: theme.muted }}>/{s}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {socialLinks.map(({ key, url, Icon }) => (
            <a key={key} href={url} target="_blank" rel="noreferrer" onClick={() => handleSocialClick(key)}
              className="hover:opacity-70 transition-opacity" style={{ color: theme.muted }}><Icon className="w-4 h-4" /></a>
          ))}
          <button onClick={() => setActiveMode(isDark ? "light" : "dark")} className="hover:opacity-70 transition-opacity" style={{ color: theme.muted }}>
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Main */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 space-y-20">

        {/* Hero */}
        <section id="portfolio-hero">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="mb-8">
            <div className="flex items-center gap-2 mb-4 text-xs font-mono" style={{ color: accent }}>
              <GitBranch className="w-3.5 h-3.5" />
              <span>main</span>
              <span style={{ color: theme.border }}>·</span>
              <span style={{ color: theme.muted }}>latest commit: "Portfolio v3.0 — Available for hire"</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-3" style={{ color: theme.fg, fontFamily: "'Inter', sans-serif" }}>
              {portfolio.name}
            </h1>
            <p className="text-lg mb-2 font-sans" style={{ color: accent }}>{portfolio.title}</p>
            <div className="flex items-center gap-4 text-sm mb-6" style={{ color: theme.muted }}>
              {portfolio.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{portfolio.location}</span>}
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{portfolio.contactEmail}</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xl font-sans mb-8" style={{ color: theme.muted }}>{portfolio.bio}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <TerminalHero name={portfolio.name} title={portfolio.title} email={portfolio.contactEmail} theme={theme} accent={accent} />
          </motion.div>
        </section>

        {/* Projects — GitHub repo card style */}
        {sectionOrder.includes("projects") && (
          <section id="portfolio-projects">
            <DevSectionHeader icon={<Zap className="w-4 h-4" />} title={labels.projects} accent={accent} muted={theme.muted} border={theme.border} />
            <div className="grid md:grid-cols-2 gap-4">
              {portfolio.projects?.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  whileHover={{ borderColor: accent }}
                  className="group rounded-xl p-5 border transition-all"
                  style={{ background: theme.surface, borderColor: theme.border }}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <GitBranch className="w-4 h-4" style={{ color: accent }} />
                      <h3 className="font-bold font-sans text-sm" style={{ color: theme.fg }}>{p.title}</h3>
                    </div>
                    {p.link && <a href={p.link} target="_blank" rel="noreferrer"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: accent }}><ExternalLink className="w-3.5 h-3.5" /></a>}
                  </div>
                  <p className="text-xs leading-relaxed mb-4 font-sans" style={{ color: theme.muted }}>{p.description}</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1 text-[10px]" style={{ color: theme.muted }}>
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: accent }} />
                      {p.techStack?.[0]}
                    </div>
                     {(Array.isArray(p.techStack) ? p.techStack : []).slice(1, 4).map((t, ti) => (
                      <span key={ti} className="text-[10px] px-2 py-0.5 rounded-full border" style={{ borderColor: theme.border, color: theme.muted }}>{t}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Skills — animated bars */}
        {sectionOrder.includes("skills") && (
          <section id="portfolio-skills">
            <DevSectionHeader icon={<Code2 className="w-4 h-4" />} title={labels.skills} accent={accent} muted={theme.muted} border={theme.border} />
            <div className="grid md:grid-cols-2 gap-x-12">
              {portfolio.skills?.map((s, i) => <SkillBar key={i} skill={s} i={i} theme={theme} accent={accent} />)}
            </div>
          </section>
        )}

        {/* Experience */}
        {sectionOrder.includes("experience") && (
          <section id="portfolio-experience">
            <DevSectionHeader icon={<Briefcase className="w-4 h-4" />} title={labels.experience} accent={accent} muted={theme.muted} border={theme.border} />
            <div className="space-y-0">
              {portfolio.experience?.map((exp, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="py-6 border-l-2 pl-6 ml-2 relative"
                  style={{ borderColor: i === 0 ? accent : theme.border }}>
                  <div className="absolute -left-[9px] top-7 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: i === 0 ? accent : theme.border, background: theme.bg }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: i === 0 ? accent : theme.border }} />
                  </div>
                  <div className="flex justify-between flex-wrap gap-2 mb-1.5">
                    <div>
                      <h3 className="font-bold font-sans" style={{ color: theme.fg }}>{exp.role}</h3>
                      <p className="text-sm font-semibold" style={{ color: accent }}>{exp.company}</p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-1 rounded" style={{ background: theme.surface, color: theme.muted }}>
                      {exp.startDate} → {exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed font-sans" style={{ color: theme.muted }}>{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {sectionOrder.includes("education") && (
          <section id="portfolio-education">
            <DevSectionHeader icon={<GraduationCap className="w-4 h-4" />} title={labels.education} accent={accent} muted={theme.muted} border={theme.border} />
            <div className="grid md:grid-cols-2 gap-4">
              {portfolio.education?.map((edu, i) => (
                <div key={i} className="rounded-xl p-5 border" style={{ background: theme.surface, borderColor: theme.border }}>
                  <h3 className="font-bold font-sans mb-0.5" style={{ color: theme.fg }}>{edu.degree}</h3>
                  <p className="text-sm font-sans" style={{ color: theme.muted }}>{edu.school}</p>
                  <p className="text-xs mt-2 font-mono" style={{ color: accent }}>{edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        {sectionOrder.includes("contact") && (
          <section id="portfolio-contact">
            <DevSectionHeader icon={<Mail className="w-4 h-4" />} title="Contact" accent={accent} muted={theme.muted} border={theme.border} />
            {formSuccess && (
              <div className="mb-4 p-3 rounded-xl text-sm flex items-center gap-2 border"
                style={{ background: `${accent}15`, borderColor: `${accent}30`, color: accent }}>
                <Check className="w-4 h-4" />{formSuccess}
              </div>
            )}
            <form onSubmit={handleSendMessage} className="space-y-3 max-w-xl">
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { ph: "// your name", val: visitorName, set: setVisitorName },
                  { ph: "// email@domain.com", val: visitorEmail, set: setVisitorEmail, type: "email", req: true }
                ].map((f, i) => (
                  <input key={i} type={f.type || "text"} required={f.req} placeholder={f.ph} value={f.val}
                    onChange={e => f.set(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm font-mono outline-none transition-all border"
                    style={{ background: theme.surface, borderColor: theme.border, color: theme.fg }}
                    onFocus={e => (e.currentTarget.style.borderColor = accent)}
                    onBlur={e => (e.currentTarget.style.borderColor = theme.border)} />
                ))}
              </div>
              <textarea rows={4} required placeholder="// your message..." value={visitorMsg}
                onChange={e => setVisitorMsg(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm font-mono outline-none resize-none border transition-all"
                style={{ background: theme.surface, borderColor: theme.border, color: theme.fg }}
                onFocus={e => (e.currentTarget.style.borderColor = accent)}
                onBlur={e => (e.currentTarget.style.borderColor = theme.border)} />
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit" disabled={formLoading}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold cursor-pointer font-sans"
                style={{ background: accent, color: theme.bg }}>
                <Send className="w-4 h-4" />{formLoading ? "Pushing..." : "git commit -m 'sent message'"}
              </motion.button>
            </form>
          </section>
        )}
      </div>

      <footer className="border-t py-8 text-center text-[11px] font-mono" style={{ borderColor: theme.border, color: theme.muted }}>
        © {new Date().getFullYear()} · {portfolio.name || "Portfolio"} · Powered by FolioAI
      </footer>
    </div>
  );
}

function DevSectionHeader({ icon, title, accent, muted, border }: {
  icon: React.ReactNode; title: string; accent: string; muted: string; border: string
}) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="p-1.5 rounded-lg" style={{ background: `${accent}20`, color: accent }}>{icon}</div>
      <h2 className="text-sm font-bold font-sans">{title}</h2>
      <div className="flex-1 h-px" style={{ background: border }} />
    </div>
  );
}
