/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * TEMPLATE 6: CORPORATE BUSINESS
 * Elegant navy theme, KPI counters, professional timeline, premium cards.
 */
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";
import { MapPin, Mail, Phone, ExternalLink, Sun, Moon, Send, Check, Briefcase, GraduationCap, BarChart3, TrendingUp, Users, Award } from "lucide-react";
import type { TemplateProps } from "./templateUtils";
import { GOOGLE_FONTS } from "./templateUtils";

function KPICounter({ value, label, suffix = "", icon: Icon }: { value: number; label: string; suffix?: string; icon: any }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);
  return (
    <div ref={ref} className="flex flex-col items-center p-6 rounded-2xl border text-center"
      style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "rgba(255,255,255,0.1)" }}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="text-3xl font-black text-white mb-1">{count}{suffix}</div>
      <div className="text-xs font-semibold uppercase tracking-wider opacity-60">{label}</div>
    </div>
  );
}

export default function CorporateTemplate({
  portfolio, isDark, setActiveMode, socialLinks, handleSocialClick,
  handleSendMessage, visitorName, setVisitorName, visitorEmail, setVisitorEmail,
  visitorMsg, setVisitorMsg, formLoading, formSuccess, isDemo, hue, labels, sectionOrder
}: TemplateProps) {
  const accent = hue.hex;
  const navyDark = "#0f172a";
  const navyMid = "#1e293b";
  const bg = isDark ? "#0f172a" : "#f8fafc";
  const text = isDark ? "#f1f5f9" : "#0f172a";
  const muted = isDark ? "#64748b" : "#94a3b8";
  const card = isDark ? "#1e293b" : "#ffffff";
  const border = isDark ? "#334155" : "#e2e8f0";

  return (
    <div className="min-h-screen" style={{ background: bg, color: text, fontFamily: "'Inter', sans-serif" }}>
      <link rel="stylesheet" href={GOOGLE_FONTS} />

      {/* Professional Nav */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 border-b shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
        style={{ background: isDark ? "rgba(15,23,42,0.95)" : "rgba(248,250,252,0.95)", backdropFilter: "blur(20px)", borderColor: border }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-sm"
            style={{ background: accent }}>
            {portfolio.name?.charAt(0)}
          </div>
          <span className="font-bold text-sm">{portfolio.name}</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["projects", "experience", "skills", "contact"].filter(s => sectionOrder.includes(s)).map(s => (
            <a key={s} href={`#portfolio-${s}`}
              className="text-xs font-semibold capitalize hover:opacity-70 transition-opacity"
              style={{ color: muted }}>{labels[s as keyof typeof labels] || s}</a>
          ))}
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

      {/* Hero — two-column */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${navyDark} 0%, ${navyMid} 100%)` }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: "40px 40px" }} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-24 flex flex-col md:flex-row gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-6"
              style={{ background: `${accent}20`, color: accent, border: `1px solid ${accent}30` }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
              Open to Opportunities
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">{portfolio.name}</h1>
            <p className="text-xl font-semibold mb-4" style={{ color: accent }}>{portfolio.title}</p>
            <p className="text-base leading-relaxed mb-8 text-slate-300">{portfolio.bio}</p>
            <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-8">
              {portfolio.location && <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{portfolio.location}</span>}
              <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" />{portfolio.contactEmail}</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={`mailto:${portfolio.contactEmail}`}
                className="px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
                style={{ background: accent }}>
                Contact Me
              </a>
              <a href="#portfolio-experience"
                className="px-6 py-3 rounded-xl font-bold text-sm border border-white/20 text-white hover:bg-white/10 transition-all">
                View Resume
              </a>
            </div>
          </motion.div>

          {/* KPIs */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 w-full md:w-auto md:min-w-[320px]">
            <KPICounter value={portfolio.projects?.length || 5} label="Projects" suffix="+" icon={BarChart3} />
            <KPICounter value={(portfolio.experience?.length || 3) * 2} label="Years Exp." suffix="+" icon={TrendingUp} />
            <KPICounter value={portfolio.skills?.length || 12} label="Skills" suffix="+" icon={Award} />
            <KPICounter value={98} label="Success Rate" suffix="%" icon={Users} />
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 md:px-12 py-16 space-y-16">

        {/* Skills */}
        {sectionOrder.includes("skills") && (
          <CorpSection title={labels.skills} accent={accent} muted={muted} id="portfolio-skills">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {portfolio.skills?.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                  whileHover={{ y: -3, boxShadow: `0 8px 30px ${accent}20` }}
                  className="px-4 py-3 rounded-xl text-sm font-semibold border text-center transition-all"
                  style={{ background: card, borderColor: border, color: text }}>
                  {s}
                </motion.div>
              ))}
            </div>
          </CorpSection>
        )}

        {/* Projects */}
        {sectionOrder.includes("projects") && (
          <CorpSection title={labels.projects} accent={accent} muted={muted} id="portfolio-projects">
            <div className="grid md:grid-cols-2 gap-6">
              {portfolio.projects?.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group rounded-2xl border overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
                  style={{ background: card, borderColor: border }}>
                  {/* Header accent */}
                  <div className="h-2" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}80)` }} />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-base">{p.title}</h3>
                      {p.link && <a href={p.link} target="_blank" rel="noreferrer"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: accent }}><ExternalLink className="w-4 h-4" /></a>}
                    </div>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: muted }}>{p.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.techStack?.map((t, ti) => (
                        <span key={ti} className="text-[10px] font-semibold px-2.5 py-1 rounded-lg border"
                          style={{ borderColor: border, color: muted, background: bg }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CorpSection>
        )}

        {/* Experience — Professional Timeline */}
        {sectionOrder.includes("experience") && (
          <CorpSection title={labels.experience} accent={accent} muted={muted} id="portfolio-experience">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px" style={{ background: border }} />
              <div className="space-y-6">
                {portfolio.experience?.map((exp, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="flex gap-6">
                    <div className="flex-shrink-0 w-16 flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full border-2 z-10 mt-1" style={{ borderColor: accent, background: bg }}>
                        <div className="w-2 h-2 rounded-full m-auto mt-0.5" style={{ background: accent }} />
                      </div>
                    </div>
                    <div className="flex-1 rounded-2xl p-5 border mb-2 shadow-sm" style={{ background: card, borderColor: border }}>
                      <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                        <div>
                          <h3 className="font-bold">{exp.role}</h3>
                          <p className="text-sm font-semibold" style={{ color: accent }}>{exp.company}</p>
                        </div>
                        <span className="text-[10px] font-mono px-3 py-1 rounded-full"
                          style={{ background: `${accent}15`, color: accent }}>
                          {exp.startDate} — {exp.endDate}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: muted }}>{exp.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </CorpSection>
        )}

        {/* Education */}
        {sectionOrder.includes("education") && (
          <CorpSection title={labels.education} accent={accent} muted={muted}>
            <div className="grid md:grid-cols-2 gap-4">
              {portfolio.education?.map((edu, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex gap-4 p-5 rounded-2xl border" style={{ background: card, borderColor: border }}>
                  <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center"
                    style={{ background: `${accent}15` }}>
                    <GraduationCap className="w-5 h-5" style={{ color: accent }} />
                  </div>
                  <div>
                    <h3 className="font-bold">{edu.degree}</h3>
                    <p className="text-sm" style={{ color: muted }}>{edu.school}</p>
                    <p className="text-xs mt-1 font-semibold" style={{ color: accent }}>{edu.year}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CorpSection>
        )}

        {/* Contact */}
        {sectionOrder.includes("contact") && (
          <CorpSection title="Get in Touch" accent={accent} muted={muted} id="portfolio-contact">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-base leading-relaxed mb-6" style={{ color: muted }}>
                  Ready to discuss your next opportunity or collaboration? Feel free to reach out.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm" style={{ color: muted }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${accent}15` }}>
                      <Mail className="w-4 h-4" style={{ color: accent }} />
                    </div>
                    {portfolio.contactEmail}
                  </div>
                  {portfolio.location && (
                    <div className="flex items-center gap-3 text-sm" style={{ color: muted }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${accent}15` }}>
                        <MapPin className="w-4 h-4" style={{ color: accent }} />
                      </div>
                      {portfolio.location}
                    </div>
                  )}
                </div>
              </div>
              <div>
                {formSuccess && (
                  <div className="mb-4 p-3 rounded-xl flex items-center gap-2 text-sm"
                    style={{ background: `${accent}10`, color: accent, border: `1px solid ${accent}25` }}>
                    <Check className="w-4 h-4" />{formSuccess}
                  </div>
                )}
                <form onSubmit={handleSendMessage} className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[{ph:"Full name",val:visitorName,set:setVisitorName},{ph:"Email",val:visitorEmail,set:setVisitorEmail,type:"email",req:true}].map((f,i)=>(
                      <input key={i} type={f.type||"text"} required={f.req} placeholder={f.ph} value={f.val}
                        onChange={e=>f.set(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none border transition-all"
                        style={{ background: bg, borderColor: border, color: text }}
                        onFocus={e=>(e.currentTarget.style.borderColor=accent)}
                        onBlur={e=>(e.currentTarget.style.borderColor=border)} />
                    ))}
                  </div>
                  <textarea rows={3} required placeholder="Your message..." value={visitorMsg} onChange={e=>setVisitorMsg(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none border transition-all"
                    style={{ background: bg, borderColor: border, color: text }}
                    onFocus={e=>(e.currentTarget.style.borderColor=accent)}
                    onBlur={e=>(e.currentTarget.style.borderColor=border)} />
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit" disabled={formLoading}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
                    style={{ background: accent, color: "#fff" }}>
                    <Send className="w-4 h-4" />{formLoading ? "Sending..." : "Send Message"}
                  </motion.button>
                </form>
              </div>
            </div>
          </CorpSection>
        )}
      </main>

      <footer className="border-t py-8 px-6 md:px-12 max-w-6xl mx-auto flex justify-between items-center text-xs"
        style={{ borderColor: border, color: muted }}>
        <span>© {new Date().getFullYear()} {portfolio.name}</span>
        <span>Powered by FolioAI</span>
      </footer>
    </div>
  );
}

function CorpSection({ title, children, accent, muted, id }: {
  title: string; children: React.ReactNode; accent: string; muted: string; id?: string
}) {
  return (
    <motion.section id={id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}>
      <div className="flex items-center gap-4 mb-8">
        <div className="w-1 h-6 rounded-full" style={{ background: accent }} />
        <h2 className="text-xl font-black">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}
