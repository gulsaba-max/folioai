/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * TEMPLATE 1: SLATE
 * Visual Identity: Sophisticated dark sidebar with glassmorphism.
 * Layout: Sticky left sidebar + scrollable main content on the right.
 * Animations: Stagger slide-in, backdrop blur on nav, soft transitions.
 * Typography: DM Sans — clean, modern, humanist.
 */

import React from "react";
import { motion } from "framer-motion";
import {
  Github, Twitter, Linkedin, Instagram, ExternalLink,
  MapPin, Mail, Phone, Sun, Moon, Send, Check,
  Code2, Briefcase, GraduationCap, ArrowRight
} from "lucide-react";
import type { TemplateProps } from "./templateUtils";
import { GOOGLE_FONTS } from "./templateUtils";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] } })
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

export default function SlateTemplate({
  portfolio, isDark, setActiveMode, socialLinks, handleSocialClick,
  handleSendMessage, visitorName, setVisitorName, visitorEmail, setVisitorEmail,
  visitorMsg, setVisitorMsg, formLoading, formSuccess, isDemo, hue, labels, sectionOrder
}: TemplateProps) {
  const c = isDark
    ? { bg: "#09090b", sidebar: "bg-white/[0.03] border-white/[0.08]", card: "bg-white/[0.03] border-white/[0.06]", text: "text-slate-300", heading: "text-white", muted: "text-slate-500", input: "bg-white/5 border-white/10 text-slate-300 placeholder-slate-600", divider: "border-white/[0.07]" }
    : { bg: "#f8fafc", sidebar: "bg-white/70 dark:bg-slate-800/70 border-white/20 dark:border-slate-700/30 shadow-[0_8px_30px_rgba(0,0,0,0.04)]", card: "bg-white/70 dark:bg-slate-800/70 border-white/20 dark:border-slate-700/30 shadow-[0_8px_30px_rgba(0,0,0,0.04)]", text: "text-slate-600", heading: "text-slate-900", muted: "text-slate-400", input: "bg-white/70 dark:bg-slate-800/70 border-white/20 dark:border-slate-700/30 text-slate-800 placeholder-slate-400", divider: "border-slate-100" };

  return (
    <div className="min-h-screen transition-colors duration-300 font-sans" style={{ background: c.bg, fontFamily: "'DM Sans', sans-serif" }}>
      <link rel="stylesheet" href={GOOGLE_FONTS} />
      {isDemo && (
        <div className={`px-6 py-2 flex justify-between items-center text-[10px] font-mono ${isDark ? "bg-black/50 border-b border-white/[0.06] text-emerald-400" : "bg-white/70 dark:bg-slate-800/70 border-b border-white/20 dark:border-slate-700/30 text-emerald-600"}`}>
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />LIVE PREVIEW</span>
          <span className={isDark ? "text-slate-600" : "text-slate-400"}>{portfolio.slug}.folioai.tech</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-10">
        {/* Sticky Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
          className="lg:w-72 xl:w-80 flex-shrink-0"
        >
          <div className={`lg:sticky lg:top-10 rounded-2xl p-6 border backdrop-blur-xl ${c.sidebar}`}>
            {/* Avatar */}
            <div className={`w-16 h-16 rounded-2xl mb-5 flex items-center justify-center text-xl font-bold text-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] ${hue.primaryBg} ${hue.glow}`}>
              {portfolio.name?.charAt(0)}
            </div>
            <h1 className={`text-xl font-bold mb-0.5 ${c.heading}`}>{portfolio.name}</h1>
            <p className={`text-sm font-semibold mb-5 ${hue.primaryText}`}>{portfolio.title}</p>

            <div className="space-y-2.5 text-sm mb-6">
              {portfolio.location && <div className={`flex items-center gap-2 ${c.muted}`}><MapPin className="w-4 h-4 flex-shrink-0" />{portfolio.location}</div>}
              <div className={`flex items-center gap-2 ${c.muted} break-all`}><Mail className="w-4 h-4 flex-shrink-0" />{portfolio.contactEmail}</div>
              {portfolio.contactPhone && <div className={`flex items-center gap-2 ${c.muted}`}><Phone className="w-4 h-4 flex-shrink-0" />{portfolio.contactPhone}</div>}
            </div>

            {socialLinks.length > 0 && (
              <div className="flex gap-2 mb-6 flex-wrap">
                {socialLinks.map(({ key, url, Icon }) => (
                  <motion.a whileHover={{ scale: 1.1 }} key={key} href={url} target="_blank" rel="noreferrer" onClick={() => handleSocialClick(key)}
                    className={`p-2.5 rounded-xl border transition-all ${isDark ? "border-white/10 hover:border-white/20 hover:bg-white/10 text-slate-400 hover:text-white" : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-500 hover:text-slate-900"}`}>
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            )}

            <button onClick={() => setActiveMode(isDark ? "light" : "dark")}
              className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold border transition-all mb-5 ${isDark ? "border-white/10 hover:bg-white/10 text-slate-400" : "border-slate-200 hover:bg-slate-50 text-slate-600"}`}>
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              {isDark ? "Light Mode" : "Dark Mode"}
            </button>

            {/* Navigation links */}
            <nav className="space-y-1">
              {[
                { id: "skills", label: labels.skills, Icon: Code2 },
                { id: "projects", label: labels.projects, Icon: ArrowRight },
                { id: "experience", label: labels.experience, Icon: Briefcase },
                { id: "education", label: labels.education, Icon: GraduationCap },
                { id: "contact", label: "Contact", Icon: Mail },
              ].filter(item => sectionOrder.includes(item.id)).map(({ id, label, Icon }) => (
                <a key={id} href={`#portfolio-${id}`}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${isDark ? "text-slate-500 hover:text-white hover:bg-white/5" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"}`}>
                  <Icon className="w-4 h-4" />{label}
                </a>
              ))}
            </nav>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Hero */}
          <motion.section id="portfolio-hero" className="mb-16"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
            <p className={`text-sm leading-relaxed ${c.text} max-w-xl`}>{portfolio.bio}</p>
          </motion.section>

          <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-16">
            {sectionOrder.filter(s => s !== "hero" && s !== "social-feed").map((sectionId, idx) => {
              if (sectionId === "skills") return (
                <motion.section key="skills" id="portfolio-skills" custom={idx} variants={fadeUp}>
                  <SectionHeader label={labels.skills} isDark={isDark} c={c} />
                  <div className="flex flex-wrap gap-2">
                    {portfolio.skills?.map((s, i) => (
                      <motion.span key={i} whileHover={{ scale: 1.05 }}
                        className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${isDark ? "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10" : "bg-white/70 dark:bg-slate-800/70 border-white/20 dark:border-slate-700/30 text-slate-700 hover:bg-white/70 dark:hover:bg-slate-800/70"}`}>
                        {s}
                      </motion.span>
                    ))}
                  </div>
                </motion.section>
              );

              if (sectionId === "projects") return (
                <motion.section key="projects" id="portfolio-projects" custom={idx} variants={fadeUp}>
                  <SectionHeader label={labels.projects} isDark={isDark} c={c} />
                  <div className="grid sm:grid-cols-2 gap-4">
                    {portfolio.projects?.map((p, i) => (
                      <motion.div key={i} whileHover={{ y: -4 }} transition={{ duration: 0.25 }}
                        className={`group rounded-2xl p-5 border transition-all ${c.card} hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]`}>
                        <div className="flex justify-between items-start mb-3">
                          <h3 className={`font-bold text-base ${c.heading}`}>{p.title}</h3>
                          {p.link && <a href={p.link} target="_blank" rel="noreferrer" className={`opacity-0 group-hover:opacity-100 transition-opacity ${hue.primaryText}`}><ExternalLink className="w-4 h-4" /></a>}
                        </div>
                        <p className={`text-sm leading-relaxed mb-4 ${c.text}`}>{p.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {p.techStack?.map((t, ti) => <span key={ti} className={`text-[10px] px-2 py-1 rounded-md font-medium ${isDark ? "bg-white/5 text-slate-400" : "bg-white/70 dark:bg-slate-800/70 text-slate-600"}`}>{t}</span>)}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              );

              if (sectionId === "experience") return (
                <motion.section key="experience" id="portfolio-experience" custom={idx} variants={fadeUp}>
                  <SectionHeader label={labels.experience} isDark={isDark} c={c} />
                  <div className="space-y-4">
                    {portfolio.experience?.map((exp, i) => (
                      <div key={i} className={`rounded-2xl p-5 border ${c.card}`}>
                        <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                          <div>
                            <h3 className={`font-bold ${c.heading}`}>{exp.role}</h3>
                            <p className={`text-sm font-semibold ${hue.primaryText}`}>{exp.company}</p>
                          </div>
                          <span className={`text-[11px] font-mono ${c.muted}`}>{exp.startDate} — {exp.endDate}</span>
                        </div>
                        <p className={`text-sm leading-relaxed ${c.text}`}>{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.section>
              );

              if (sectionId === "education") return (
                <motion.section key="education" id="portfolio-education" custom={idx} variants={fadeUp}>
                  <SectionHeader label={labels.education} isDark={isDark} c={c} />
                  <div className="space-y-3">
                    {portfolio.education?.map((edu, i) => (
                      <div key={i} className={`rounded-2xl p-5 border ${c.card} flex justify-between items-center`}>
                        <div>
                          <h3 className={`font-bold ${c.heading}`}>{edu.degree}</h3>
                          <p className={`text-sm ${c.muted}`}>{edu.school}</p>
                        </div>
                        <span className={`text-xs font-mono ${hue.primaryText}`}>{edu.year}</span>
                      </div>
                    ))}
                  </div>
                </motion.section>
              );

              if (sectionId === "contact") return (
                <motion.section key="contact" id="portfolio-contact" custom={idx} variants={fadeUp}>
                  <SectionHeader label="Contact" isDark={isDark} c={c} />
                  {formSuccess && (
                    <div className={`mb-4 p-3 rounded-xl flex items-center gap-2 text-sm text-emerald-400 ${isDark ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-emerald-50 border border-emerald-200"}`}>
                      <Check className="w-4 h-4" />{formSuccess}
                    </div>
                  )}
                  <form onSubmit={handleSendMessage} className="space-y-3">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <input type="text" placeholder="Your name" value={visitorName} onChange={e => setVisitorName(e.target.value)}
                        className={`rounded-xl border px-4 py-3 text-sm outline-none transition-all focus:ring-2 ${c.input}`} style={{ focusRingColor: hue.hex } as any} />
                      <input type="email" required placeholder="Email address" value={visitorEmail} onChange={e => setVisitorEmail(e.target.value)}
                        className={`rounded-xl border px-4 py-3 text-sm outline-none transition-all ${c.input}`} />
                    </div>
                    <textarea rows={4} required placeholder="Your message..." value={visitorMsg} onChange={e => setVisitorMsg(e.target.value)}
                      className={`w-full rounded-xl border px-4 py-3 text-sm outline-none resize-none ${c.input}`} />
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={formLoading}
                      className={`px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-[0_8px_30px_rgba(0,0,0,0.04)] cursor-pointer transition-all ${hue.button} ${hue.glow}`}>
                      <Send className="w-4 h-4" />{formLoading ? "Sending..." : "Send Message"}
                    </motion.button>
                  </form>
                </motion.section>
              );

              return null;
            })}
          </motion.div>

          <footer className={`mt-20 pt-6 border-t text-[11px] text-center ${c.muted} ${c.divider}`}>
            © {new Date().getFullYear()} {portfolio.name} · Powered by FolioAI
          </footer>
        </main>
      </div>
    </div>
  );
}

function SectionHeader({ label, isDark, c }: { label: string; isDark: boolean; c: any }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <h2 className={`text-xs font-semibold uppercase tracking-[0.15em] ${c.muted}`}>{label}</h2>
      <div className={`flex-1 h-px ${isDark ? "bg-white/[0.06]" : "bg-slate-100"}`} />
    </div>
  );
}
