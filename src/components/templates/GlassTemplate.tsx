/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * TEMPLATE 2: GLASSMORPHISM
 * Frosted glass cards, animated gradient blobs, floating UI, neon highlights.
 */
import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { MapPin, Mail, Phone, ExternalLink, Sun, Moon, Send, Check, ArrowUpRight } from "lucide-react";
import type { TemplateProps } from "./templateUtils";
import { GOOGLE_FONTS } from "./templateUtils";

export default function GlassTemplate({
  portfolio, isDark, setActiveMode, socialLinks, handleSocialClick,
  handleSendMessage, visitorName, setVisitorName, visitorEmail, setVisitorEmail,
  visitorMsg, setVisitorMsg, formLoading, formSuccess, isDemo, hue, labels, sectionOrder
}: TemplateProps) {
  const accent = hue.hex;
  const bg = isDark ? "#0a0412" : "#f0edff";
  const glassBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.5)";
  const glassBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.8)";
  const text = isDark ? "#e8e0ff" : "#1a0a3d";
  const muted = isDark ? "#8b7faa" : "#7c6fa0";

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: bg, color: text, fontFamily: "'Outfit', sans-serif" }}>
      <link rel="stylesheet" href={GOOGLE_FONTS} />
      <style>{`
        @keyframes float1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-40px) scale(1.1)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-25px,35px) scale(1.08)} }
        @keyframes float3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,25px) scale(0.95)} }
        .blob1{animation:float1 12s ease-in-out infinite;}
        .blob2{animation:float2 16s ease-in-out infinite;}
        .blob3{animation:float3 20s ease-in-out infinite;}
        .glass{background:${glassBg};backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid ${glassBorder};}
        .glass-card{background:${glassBg};backdrop-filter:blur(16px);border:1px solid ${glassBorder};transition:all 0.3s;}
        .glass-card:hover{background:${isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.7)"};}
      `}</style>

      {/* Animated Blob Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="blob1 absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-[100px] opacity-30"
          style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }} />
        <div className="blob2 absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full blur-[120px] opacity-25"
          style={{ background: `radial-gradient(circle, #06b6d4, transparent 70%)` }} />
        <div className="blob3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[80px] opacity-20"
          style={{ background: `radial-gradient(circle, #a855f7, transparent 70%)` }} />
      </div>

      {/* Floating Nav */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 px-6 py-3 rounded-full glass shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        <span className="text-sm font-bold" style={{ color: accent }}>{portfolio.name?.split(" ")[0]}</span>
        <div className="w-px h-4 opacity-20" style={{ background: text }} />
        {["projects", "experience"].filter(s => sectionOrder.includes(s)).map(s => (
          <a key={s} href={`#portfolio-${s}`} className="text-xs font-medium capitalize hover:opacity-70 transition-opacity" style={{ color: muted }}>{s}</a>
        ))}
        <div className="w-px h-4 opacity-20" style={{ background: text }} />
        <button onClick={() => setActiveMode(isDark ? "light" : "dark")} className="text-xs hover:opacity-70 transition-opacity" style={{ color: muted }}>
          {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
        </button>
      </nav>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-20 space-y-8">

        {/* Hero Card */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="glass rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              {/* Floating badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-6"
                style={{ background: `${accent}20`, color: accent, border: `1px solid ${accent}30` }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
                Available for Work
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-3 leading-tight">{portfolio.name}</h1>
              <p className="text-lg font-semibold mb-4" style={{ color: accent }}>{portfolio.title}</p>
              <p className="text-sm leading-relaxed mb-8" style={{ color: muted }}>{portfolio.bio}</p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ key, url, Icon }) => (
                  <motion.a key={key} whileHover={{ y: -4, scale: 1.05 }} href={url} target="_blank" rel="noreferrer"
                    onClick={() => handleSocialClick(key)}
                    className="glass p-3 rounded-2xl transition-all hover:shadow-lg cursor-pointer"
                    style={{ boxShadow: `0 0 0 0 ${accent}` }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 20px ${accent}30`)}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}>
                    <Icon className="w-5 h-5" style={{ color: accent }} />
                  </motion.a>
                ))}
              </div>
            </div>
            <div className="glass rounded-2xl p-5 space-y-3 min-w-[180px]">
              {portfolio.location && <div className="flex items-center gap-2 text-xs" style={{ color: muted }}><MapPin className="w-3.5 h-3.5" />{portfolio.location}</div>}
              <div className="flex items-center gap-2 text-xs" style={{ color: muted }}><Mail className="w-3.5 h-3.5" />{portfolio.contactEmail}</div>
              {portfolio.contactPhone && <div className="flex items-center gap-2 text-xs" style={{ color: muted }}><Phone className="w-3.5 h-3.5" />{portfolio.contactPhone}</div>}
              <a href={`mailto:${portfolio.contactEmail}`}
                className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all"
                style={{ background: accent, color: "#fff" }}>
                Contact <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Skills */}
        {sectionOrder.includes("skills") && (
          <GlassSection title={labels.skills} accent={accent} muted={muted} index={1}>
            <div className="flex flex-wrap gap-2">
              {portfolio.skills?.map((s, i) => (
                <motion.span key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                  whileHover={{ scale: 1.08, boxShadow: `0 0 15px ${accent}40` }}
                  className="px-4 py-2 rounded-full text-sm font-medium cursor-default"
                  style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}25` }}>
                  {s}
                </motion.span>
              ))}
            </div>
          </GlassSection>
        )}

        {/* Projects */}
        {sectionOrder.includes("projects") && (
          <GlassSection title={labels.projects} accent={accent} muted={muted} index={2} id="portfolio-projects">
            <div className="grid md:grid-cols-2 gap-4">
              {portfolio.projects?.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6, boxShadow: `0 20px 60px ${accent}20` }}
                  className="glass-card group rounded-2xl p-5 cursor-pointer">
                  <div className="flex justify-between mb-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${accent}20` }}>
                      <span className="text-xs font-bold" style={{ color: accent }}>{String(i+1).padStart(2,"0")}</span>
                    </div>
                    {p.link && <a href={p.link} target="_blank" rel="noreferrer"
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg"
                      style={{ color: accent }}><ArrowUpRight className="w-4 h-4" /></a>}
                  </div>
                  <h3 className="font-bold text-base mb-2">{p.title}</h3>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: muted }}>{p.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.techStack?.map((t, ti) => (
                      <span key={ti} className="text-[9px] font-medium px-2 py-0.5 rounded-full"
                        style={{ background: `${accent}10`, color: accent, border: `1px solid ${accent}20` }}>{t}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassSection>
        )}

        {/* Experience */}
        {sectionOrder.includes("experience") && (
          <GlassSection title={labels.experience} accent={accent} muted={muted} index={3} id="portfolio-experience">
            <div className="space-y-4">
              {portfolio.experience?.map((exp, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl" style={{ background: accent }} />
                  <div className="pl-4">
                    <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                      <div>
                        <h3 className="font-bold">{exp.role}</h3>
                        <p className="text-sm font-semibold" style={{ color: accent }}>{exp.company}</p>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-1 rounded-full" style={{ background: `${accent}15`, color: muted }}>
                        {exp.startDate} – {exp.endDate}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: muted }}>{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassSection>
        )}

        {/* Education */}
        {sectionOrder.includes("education") && (
          <GlassSection title={labels.education} accent={accent} muted={muted} index={4}>
            <div className="grid md:grid-cols-2 gap-4">
              {portfolio.education?.map((edu, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                  className="glass-card rounded-2xl p-5">
                  <h3 className="font-bold mb-1">{edu.degree}</h3>
                  <p className="text-sm" style={{ color: muted }}>{edu.school}</p>
                  <p className="text-xs mt-2 font-mono" style={{ color: accent }}>{edu.year}</p>
                </motion.div>
              ))}
            </div>
          </GlassSection>
        )}

        {/* Contact */}
        {sectionOrder.includes("contact") && (
          <GlassSection title="Get in Touch" accent={accent} muted={muted} index={5} id="portfolio-contact">
            {formSuccess && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="mb-4 p-3 rounded-xl flex items-center gap-2 text-sm"
                style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}25` }}>
                <Check className="w-4 h-4" />{formSuccess}
              </motion.div>
            )}
            <form onSubmit={handleSendMessage} className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <GlassInput placeholder="Your name" value={visitorName} onChange={e => setVisitorName(e.target.value)} accent={accent} muted={muted} />
                <GlassInput type="email" required placeholder="Email" value={visitorEmail} onChange={e => setVisitorEmail(e.target.value)} accent={accent} muted={muted} />
              </div>
              <GlassInput as="textarea" rows={4} required placeholder="Your message..." value={visitorMsg} onChange={e => setVisitorMsg(e.target.value)} accent={accent} muted={muted} />
              <motion.button whileHover={{ scale: 1.02, boxShadow: `0 0 30px ${accent}50` }} whileTap={{ scale: 0.97 }}
                type="submit" disabled={formLoading}
                className="flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-bold cursor-pointer shadow-lg"
                style={{ background: accent, color: "#fff" }}>
                <Send className="w-4 h-4" />{formLoading ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </GlassSection>
        )}
      </div>

      <footer className="relative z-10 text-center py-8 text-xs" style={{ color: muted }}>
        © {new Date().getFullYear()} {portfolio.name} · Powered by FolioAI
      </footer>
    </div>
  );
}

function GlassSection({ title, children, accent, muted, index, id }: {
  title: string; children: React.ReactNode; accent: string; muted: string; index: number; id?: string;
}) {
  return (
    <motion.section id={id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay: 0.1 }}
      className="glass rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
      <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] mb-6" style={{ color: muted }}>{title}</h2>
      {children}
    </motion.section>
  );
}

function GlassInput({ as: As = "input", accent, muted, ...props }: any) {
  const Tag = As as any;
  return (
    <Tag {...props}
      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "inherit" }}
      onFocus={(e: any) => (e.currentTarget.style.borderColor = `${accent}60`)}
      onBlur={(e: any) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")} />
  );
}
