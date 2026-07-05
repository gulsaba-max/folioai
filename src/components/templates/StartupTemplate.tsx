/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * TEMPLATE 7: STARTUP FOUNDER
 * Inspired by: Notion, Linear, Arc Browser
 * Features: Bento grid layout, startup metrics with counters, varied card sizes.
 */
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";
import { ExternalLink, Sun, Moon, Send, Check, Mail, MapPin, Zap, TrendingUp, Users, Star, Code2, ArrowUpRight } from "lucide-react";
import type { TemplateProps } from "./templateUtils";
import { GOOGLE_FONTS } from "./templateUtils";

function AnimatedMetric({ value, suffix="", label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const steps = 50; const inc = value / steps;
    let cur = 0;
    const t = setInterval(() => { cur += inc; if(cur >= value) { setCount(value); clearInterval(t); } else setCount(Math.floor(cur)); }, 20);
    return () => clearInterval(t);
  }, [inView, value]);
  return (
    <div ref={ref} className="flex flex-col">
      <span className="text-4xl font-black text-white">{count}{suffix}</span>
      <span className="text-xs mt-1 opacity-50">{label}</span>
    </div>
  );
}

export default function StartupTemplate({
  portfolio, isDark, setActiveMode, socialLinks, handleSocialClick,
  handleSendMessage, visitorName, setVisitorName, visitorEmail, setVisitorEmail,
  visitorMsg, setVisitorMsg, formLoading, formSuccess, isDemo, hue, labels, sectionOrder
}: TemplateProps) {
  const accent = hue.hex;
  const bg = "#09090b";
  const text = "#fafafa";
  const muted = "#71717a";
  const card = "#18181b";
  const border = "#27272a";

  return (
    <div className="min-h-screen" style={{ background: bg, color: text, fontFamily: "'Outfit', sans-serif" }}>
      <link rel="stylesheet" href={GOOGLE_FONTS} />

      {/* Minimal pill nav */}
      <nav className="flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center font-black text-white text-xs"
            style={{ background: accent }}>
            {portfolio.name?.charAt(0)}
          </div>
          <span className="font-bold text-sm">{portfolio.name?.split(" ")[0]}</span>
        </div>
        <div className="flex items-center gap-3">
          {socialLinks.map(({ key, url, Icon }) => (
            <a key={key} href={url} target="_blank" rel="noreferrer" onClick={() => handleSocialClick(key)}
              className="hover:opacity-70 transition-opacity" style={{ color: muted }}><Icon className="w-4 h-4" /></a>
          ))}
          <button onClick={() => setActiveMode(isDark ? "light" : "dark")} className="hover:opacity-70 transition-opacity" style={{ color: muted }}>
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* BENTO GRID */}
      <main className="px-4 md:px-6 pb-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-12 grid-rows-auto gap-3 md:gap-4">

          {/* [1] Hero card — wide */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="col-span-12 md:col-span-8 rounded-3xl p-8 relative overflow-hidden"
            style={{ background: card, border: `1px solid ${border}` }}>
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-20 pointer-events-none"
              style={{ background: accent }} />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: accent }} />
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: accent }}>Available for hire</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black leading-tight mb-3">{portfolio.name}</h1>
              <p className="text-base font-semibold mb-4" style={{ color: accent }}>{portfolio.title}</p>
              <p className="text-sm leading-relaxed mb-6 max-w-lg" style={{ color: muted }}>{portfolio.bio}</p>
              <div className="flex flex-wrap gap-3">
                <a href={`mailto:${portfolio.contactEmail}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-black"
                  style={{ background: accent }}>
                  <Mail className="w-4 h-4" /> Contact
                </a>
                {socialLinks.map(({ key, url, Icon }) => (
                  <a key={key} href={url} target="_blank" rel="noreferrer" onClick={() => handleSocialClick(key)}
                    className="w-10 h-10 rounded-full flex items-center justify-center border hover:scale-110 transition-transform"
                    style={{ borderColor: border, color: muted }}><Icon className="w-4 h-4" /></a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* [2] Metrics card */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="col-span-12 md:col-span-4 rounded-3xl p-6 flex flex-col justify-between"
            style={{ background: accent }}>
            <div className="text-[10px] font-bold uppercase tracking-widest text-black/60 mb-auto">Key Stats</div>
            <div className="space-y-4 mt-4">
              <AnimatedMetric value={portfolio.projects?.length || 5} suffix="+" label="Projects Shipped" />
              <AnimatedMetric value={(portfolio.experience?.length || 3) * 2} suffix="+" label="Years Experience" />
              <AnimatedMetric value={portfolio.skills?.length || 10} suffix="+" label="Technologies" />
            </div>
          </motion.div>

          {/* [3] Skills — compact */}
          {sectionOrder.includes("skills") && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="col-span-12 md:col-span-5 rounded-3xl p-6"
              id="portfolio-skills"
              style={{ background: card, border: `1px solid ${border}` }}>
              <h2 className="text-[10px] font-bold uppercase tracking-widest mb-5" style={{ color: muted }}>{labels.skills}</h2>
              <div className="flex flex-wrap gap-2">
                {portfolio.skills?.slice(0, 12).map((s, i) => (
                  <motion.span key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                    whileHover={{ scale: 1.08 }}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold cursor-default"
                    style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}25` }}>
                    {s}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {/* [4] Location + contact card */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="col-span-12 md:col-span-3 rounded-3xl p-6 flex flex-col gap-4"
            style={{ background: card, border: `1px solid ${border}` }}>
            <h2 className="text-[10px] font-bold uppercase tracking-widest" style={{ color: muted }}>Location</h2>
            {portfolio.location && <p className="text-sm font-semibold flex items-center gap-2"><MapPin className="w-4 h-4" style={{ color: accent }} />{portfolio.location}</p>}
            <div className="flex-1" />
            <a href={`mailto:${portfolio.contactEmail}`}
              className="flex items-center justify-between px-4 py-3 rounded-2xl border text-xs font-semibold hover:opacity-80 transition-opacity"
              style={{ borderColor: border, color: text }}>
              Email me <ArrowUpRight className="w-3.5 h-3.5" style={{ color: accent }} />
            </a>
          </motion.div>

          {/* [5] Quote card */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="col-span-12 md:col-span-4 rounded-3xl p-6 flex flex-col justify-center"
            style={{ background: `${accent}10`, border: `1px solid ${accent}20` }}>
            <Star className="w-6 h-6 mb-4" style={{ color: accent }} />
            <p className="text-sm font-medium leading-relaxed" style={{ color: text }}>
              "Building things that matter, one commit at a time."
            </p>
          </motion.div>

          {/* [6] Projects — takes full width */}
          {sectionOrder.includes("projects") && (
            <div className="col-span-12" id="portfolio-projects">
              <div className="rounded-3xl p-6 md:p-8" style={{ background: card, border: `1px solid ${border}` }}>
                <h2 className="text-[10px] font-bold uppercase tracking-widest mb-6" style={{ color: muted }}>{labels.projects}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {portfolio.projects?.map((p, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                      whileHover={{ y: -4, borderColor: accent }}
                      className="group rounded-2xl p-5 border transition-all"
                      style={{ background: bg, borderColor: border }}>
                      <div className="flex justify-between items-start mb-3">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${accent}20` }}>
                          <Code2 className="w-4 h-4" style={{ color: accent }} />
                        </div>
                        {p.link && <a href={p.link} target="_blank" rel="noreferrer"
                          className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: accent }}>
                          <ArrowUpRight className="w-4 h-4" /></a>}
                      </div>
                      <h3 className="font-bold text-sm mb-2">{p.title}</h3>
                      <p className="text-xs leading-relaxed mb-3" style={{ color: muted }}>{p.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                         {(Array.isArray(p.techStack) ? p.techStack : []).slice(0, 3).map((t, ti) => (
                          <span key={ti} className="text-[9px] font-semibold px-2 py-0.5 rounded-full border"
                            style={{ borderColor: border, color: muted }}>{t}</span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* [7] Experience + Education side by side */}
          {sectionOrder.includes("experience") && (
            <div className="col-span-12 md:col-span-7 rounded-3xl p-6 md:p-8" id="portfolio-experience"
              style={{ background: card, border: `1px solid ${border}` }}>
              <h2 className="text-[10px] font-bold uppercase tracking-widest mb-6" style={{ color: muted }}>{labels.experience}</h2>
              <div className="space-y-4">
                {portfolio.experience?.map((exp, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: accent }} />
                      {i < (portfolio.experience?.length || 0) - 1 && <div className="flex-1 w-px mt-1" style={{ background: border }} />}
                    </div>
                    <div className="pb-4">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-bold text-sm">{exp.role}</h3>
                        <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${accent}15`, color: accent }}>{exp.endDate}</span>
                      </div>
                      <p className="text-xs font-semibold mb-2" style={{ color: accent }}>{exp.company}</p>
                      <p className="text-xs leading-relaxed" style={{ color: muted }}>{exp.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {sectionOrder.includes("education") && (
            <div className="col-span-12 md:col-span-5 rounded-3xl p-6 md:p-8"
              style={{ background: card, border: `1px solid ${border}` }}>
              <h2 className="text-[10px] font-bold uppercase tracking-widest mb-6" style={{ color: muted }}>{labels.education}</h2>
              <div className="space-y-4">
                {portfolio.education?.map((edu, i) => (
                  <div key={i} className="rounded-2xl p-4 border" style={{ background: bg, borderColor: border }}>
                    <h3 className="font-bold text-sm mb-0.5">{edu.degree}</h3>
                    <p className="text-xs" style={{ color: muted }}>{edu.school}</p>
                    <p className="text-[10px] mt-1.5 font-semibold" style={{ color: accent }}>{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* [8] Contact bento */}
          {sectionOrder.includes("contact") && (
            <div className="col-span-12 rounded-3xl p-6 md:p-8" id="portfolio-contact"
              style={{ background: card, border: `1px solid ${border}` }}>
              <h2 className="text-[10px] font-bold uppercase tracking-widest mb-6" style={{ color: muted }}>Send a Message</h2>
              {formSuccess && (
                <div className="mb-4 p-3 rounded-2xl text-sm flex items-center gap-2"
                  style={{ background: `${accent}10`, color: accent, border: `1px solid ${accent}25` }}>
                  <Check className="w-4 h-4" />{formSuccess}
                </div>
              )}
              <form onSubmit={handleSendMessage} className="grid sm:grid-cols-3 gap-3">
                <input type="text" placeholder="Name" value={visitorName} onChange={e => setVisitorName(e.target.value)}
                  className="px-4 py-3 rounded-2xl text-sm outline-none border transition-all"
                  style={{ background: bg, borderColor: border, color: text }}
                  onFocus={e => (e.currentTarget.style.borderColor = accent)}
                  onBlur={e => (e.currentTarget.style.borderColor = border)} />
                <input type="email" required placeholder="Email" value={visitorEmail} onChange={e => setVisitorEmail(e.target.value)}
                  className="px-4 py-3 rounded-2xl text-sm outline-none border transition-all"
                  style={{ background: bg, borderColor: border, color: text }}
                  onFocus={e => (e.currentTarget.style.borderColor = accent)}
                  onBlur={e => (e.currentTarget.style.borderColor = border)} />
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit" disabled={formLoading}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold cursor-pointer"
                  style={{ background: accent, color: "#000" }}>
                  <Send className="w-4 h-4" />{formLoading ? "..." : "Send"}
                </motion.button>
                <textarea rows={2} required placeholder="Message..." value={visitorMsg} onChange={e => setVisitorMsg(e.target.value)}
                  className="sm:col-span-3 px-4 py-3 rounded-2xl text-sm outline-none resize-none border transition-all"
                  style={{ background: bg, borderColor: border, color: text }}
                  onFocus={e => (e.currentTarget.style.borderColor = accent)}
                  onBlur={e => (e.currentTarget.style.borderColor = border)} />
              </form>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t py-6 px-6 text-center text-[11px]" style={{ borderColor: border, color: muted }}>
        © {new Date().getFullYear()} {portfolio.name} · Powered by FolioAI
      </footer>
    </div>
  );
}
