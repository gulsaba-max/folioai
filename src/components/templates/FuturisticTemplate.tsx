/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * TEMPLATE 4: AI FUTURISTIC
 * Aurora background, floating particles, neon glow, animated grid, dark deep-space.
 */
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";
import { ExternalLink, Sun, Moon, Send, Check, MapPin, Mail, Cpu, Layers, BookOpen, Star } from "lucide-react";
import type { TemplateProps } from "./templateUtils";
import { GOOGLE_FONTS } from "./templateUtils";

function ParticleCanvas({ accent }: { accent: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5, a: Math.random() });
    }
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const r = parseInt(accent.slice(1, 3), 16);
      const g = parseInt(accent.slice(3, 5), 16);
      const b = parseInt(accent.slice(5, 7), 16);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.a * 0.6})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [accent]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

function CounterNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0; const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function FuturisticTemplate({
  portfolio, isDark, setActiveMode, socialLinks, handleSocialClick,
  handleSendMessage, visitorName, setVisitorName, visitorEmail, setVisitorEmail,
  visitorMsg, setVisitorMsg, formLoading, formSuccess, isDemo, hue, labels, sectionOrder
}: TemplateProps) {
  const accent = hue.hex;
  const bg = "#00010f";
  const text = "#e0d8ff";
  const muted = "#6b5f8a";
  const cardBg = "rgba(255,255,255,0.03)";
  const cardBorder = `rgba(${parseInt(accent.slice(1,3),16)},${parseInt(accent.slice(3,5),16)},${parseInt(accent.slice(5,7),16)},0.15)`;

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: bg, color: text, fontFamily: "'Space Grotesk', sans-serif" }}>
      <link rel="stylesheet" href={GOOGLE_FONTS} />
      <style>{`
        @keyframes aurora1 {0%,100%{transform:translate(-50%,-50%) rotate(0deg) scale(1)}50%{transform:translate(-50%,-50%) rotate(180deg) scale(1.2)}}
        @keyframes aurora2 {0%,100%{transform:translate(-50%,-50%) rotate(0deg) scale(1)}50%{transform:translate(-50%,-50%) rotate(-180deg) scale(1.15)}}
        @keyframes gridpulse {0%,100%{opacity:0.04}50%{opacity:0.08}}
        .aurora1{animation:aurora1 20s ease-in-out infinite;}
        .aurora2{animation:aurora2 25s ease-in-out infinite;}
        .grid-bg{animation:gridpulse 6s ease-in-out infinite;}
        @keyframes neon-pulse {0%,100%{box-shadow:0 0 8px ${accent}40,0 0 20px ${accent}20}50%{box-shadow:0 0 15px ${accent}70,0 0 40px ${accent}30}}
        .neon-btn{animation:neon-pulse 2.5s ease-in-out infinite;}
      `}</style>

      {/* Aurora Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="aurora1 absolute top-1/4 left-1/3 w-[800px] h-[800px] rounded-full blur-[160px]"
          style={{ background: `radial-gradient(ellipse, ${accent}25 0%, transparent 70%)` }} />
        <div className="aurora2 absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{ background: `radial-gradient(ellipse, #06b6d425 0%, transparent 70%)` }} />
      </div>

      {/* Grid background */}
      <div className="fixed inset-0 z-0 grid-bg pointer-events-none"
        style={{ backgroundImage: `linear-gradient(${accent}33 1px, transparent 1px), linear-gradient(90deg, ${accent}33 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />

      {/* Particles */}
      <div className="fixed inset-0 z-0">
        <ParticleCanvas accent={accent} />
      </div>

      {/* Nav */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-12 py-5 border-b"
        style={{ borderColor: cardBorder, background: "rgba(0,1,15,0.7)", backdropFilter: "blur(20px)" }}>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `${accent}20`, border: `1px solid ${accent}40` }}>
            <Cpu className="w-3.5 h-3.5" style={{ color: accent }} />
          </div>
          <span className="font-bold text-sm">{portfolio.name?.split(" ")[0]}</span>
        </div>
        <div className="flex items-center gap-5">
          {["projects", "experience"].filter(s => sectionOrder.includes(s)).map(s => (
            <a key={s} href={`#portfolio-${s}`} className="text-xs font-medium hover:opacity-70 transition-opacity" style={{ color: muted }}>{s}</a>
          ))}
          {socialLinks.map(({ key, url, Icon }) => (
            <a key={key} href={url} target="_blank" rel="noreferrer" onClick={() => handleSocialClick(key)}
              className="hover:opacity-70 transition-opacity" style={{ color: muted }}><Icon className="w-4 h-4" /></a>
          ))}
          <button onClick={() => setActiveMode(isDark ? "light" : "dark")} className="hover:opacity-70 transition-opacity" style={{ color: muted }}>
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 min-h-[90vh] flex flex-col justify-center px-6 md:px-12 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: accent }}>
              AI-Powered Portfolio
            </span>
          </div>
          <h1 className="font-black leading-none mb-6 tracking-tight"
            style={{ fontSize: "clamp(3rem, 9vw, 8rem)", color: "#fff", textShadow: `0 0 80px ${accent}30` }}>
            {portfolio.name}
          </h1>
          <p className="text-xl md:text-2xl font-semibold mb-4" style={{ color: accent }}>{portfolio.title}</p>
          <p className="text-base leading-relaxed max-w-xl mb-10" style={{ color: muted }}>{portfolio.bio}</p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mb-10">
            {[
              { label: "Projects", value: portfolio.projects?.length || 0, suffix: "+" },
              { label: "Years Exp.", value: portfolio.experience?.length || 0, suffix: "+" },
              { label: "Skills", value: portfolio.skills?.length || 0, suffix: "+" },
            ].map(({ label, value, suffix }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-black mb-1" style={{ color: "#fff" }}>
                  <CounterNumber target={value} suffix={suffix} />
                </div>
                <div className="text-xs" style={{ color: muted }}>{label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <motion.a href={`mailto:${portfolio.contactEmail}`}
              className="neon-btn flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-black cursor-pointer"
              style={{ background: accent }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              Let's Collaborate
            </motion.a>
            <a href="#portfolio-projects"
              className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold border cursor-pointer hover:bg-white/5 transition-all"
              style={{ borderColor: cardBorder, color: text }}>
              View Work
            </a>
          </div>
        </motion.div>
      </section>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 space-y-20 pb-20">

        {/* Skills */}
        {sectionOrder.includes("skills") && (
          <FutSection title={labels.skills} accent={accent} muted={muted} cardBorder={cardBorder} id="portfolio-skills">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {portfolio.skills?.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                  whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${accent}30` }}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-center cursor-default transition-all"
                  style={{ background: cardBg, border: `1px solid ${cardBorder}`, color: text }}>
                  {s}
                </motion.div>
              ))}
            </div>
          </FutSection>
        )}

        {/* Projects */}
        {sectionOrder.includes("projects") && (
          <FutSection title={labels.projects} accent={accent} muted={muted} cardBorder={cardBorder} id="portfolio-projects">
            <div className="grid md:grid-cols-2 gap-4">
              {portfolio.projects?.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6, boxShadow: `0 20px 60px ${accent}15` }}
                  className="group rounded-2xl p-6 border transition-all relative overflow-hidden"
                  style={{ background: cardBg, borderColor: cardBorder }}>
                  <div className="absolute top-0 left-0 right-0 h-px transition-all duration-500 opacity-0 group-hover:opacity-100"
                    style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
                  <div className="flex justify-between mb-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center border"
                      style={{ background: `${accent}15`, borderColor: cardBorder }}>
                      <Star className="w-3.5 h-3.5" style={{ color: accent }} />
                    </div>
                    {p.link && <a href={p.link} target="_blank" rel="noreferrer"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: accent }}><ExternalLink className="w-4 h-4" /></a>}
                  </div>
                  <h3 className="font-bold text-base mb-2" style={{ color: "#fff" }}>{p.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: muted }}>{p.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.techStack?.map((t, ti) => (
                      <span key={ti} className="text-[10px] font-medium px-2 py-0.5 rounded-full border"
                        style={{ borderColor: cardBorder, color: accent, background: `${accent}10` }}>{t}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </FutSection>
        )}

        {/* Experience */}
        {sectionOrder.includes("experience") && (
          <FutSection title={labels.experience} accent={accent} muted={muted} cardBorder={cardBorder} id="portfolio-experience">
            <div className="space-y-4">
              {portfolio.experience?.map((exp, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="rounded-2xl p-6 border relative overflow-hidden group"
                  style={{ background: cardBg, borderColor: cardBorder }}>
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 group-hover:opacity-100 opacity-0 transition-opacity"
                    style={{ background: accent }} />
                  <div className="flex justify-between items-start flex-wrap gap-3 mb-3">
                    <div>
                      <h3 className="font-bold" style={{ color: "#fff" }}>{exp.role}</h3>
                      <p className="text-sm" style={{ color: accent }}>{exp.company}</p>
                    </div>
                    <span className="text-[10px] font-mono px-3 py-1 rounded-full border"
                      style={{ borderColor: cardBorder, color: muted }}>
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: muted }}>{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </FutSection>
        )}

        {/* Education */}
        {sectionOrder.includes("education") && (
          <FutSection title={labels.education} accent={accent} muted={muted} cardBorder={cardBorder}>
            <div className="grid md:grid-cols-2 gap-4">
              {portfolio.education?.map((edu, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                  className="rounded-2xl p-5 border" style={{ background: cardBg, borderColor: cardBorder }}>
                  <h3 className="font-bold mb-1" style={{ color: "#fff" }}>{edu.degree}</h3>
                  <p className="text-sm" style={{ color: muted }}>{edu.school}</p>
                  <p className="text-xs mt-2 font-mono" style={{ color: accent }}>{edu.year}</p>
                </motion.div>
              ))}
            </div>
          </FutSection>
        )}

        {/* Contact */}
        {sectionOrder.includes("contact") && (
          <FutSection title="Get in Touch" accent={accent} muted={muted} cardBorder={cardBorder} id="portfolio-contact">
            {formSuccess && (
              <div className="mb-4 p-3 rounded-xl text-sm flex items-center gap-2 border"
                style={{ borderColor: `${accent}30`, background: `${accent}10`, color: accent }}>
                <Check className="w-4 h-4" />{formSuccess}
              </div>
            )}
            <form onSubmit={handleSendMessage} className="space-y-3 max-w-lg">
              <div className="grid sm:grid-cols-2 gap-3">
                <FutInput placeholder="Your name" value={visitorName} onChange={e => setVisitorName(e.target.value)} accent={accent} cardBorder={cardBorder} muted={muted} />
                <FutInput type="email" required placeholder="Email" value={visitorEmail} onChange={e => setVisitorEmail(e.target.value)} accent={accent} cardBorder={cardBorder} muted={muted} />
              </div>
              <FutInput as="textarea" rows={4} required placeholder="Your message..." value={visitorMsg} onChange={e => setVisitorMsg(e.target.value)} accent={accent} cardBorder={cardBorder} muted={muted} />
              <motion.button whileHover={{ scale: 1.03, boxShadow: `0 0 30px ${accent}50` }} whileTap={{ scale: 0.97 }}
                type="submit" disabled={formLoading}
                className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold cursor-pointer neon-btn"
                style={{ background: accent, color: "#000" }}>
                <Send className="w-4 h-4" />{formLoading ? "Sending..." : "Send Signal"}
              </motion.button>
            </form>
          </FutSection>
        )}
      </div>

      <footer className="relative z-10 text-center py-8 border-t text-[11px]" style={{ borderColor: cardBorder, color: muted }}>
        © {new Date().getFullYear()} {portfolio.name} · Powered by FolioAI
      </footer>
    </div>
  );
}

function FutSection({ title, children, accent, muted, cardBorder, id }: {
  title: string; children: React.ReactNode; accent: string; muted: string; cardBorder: string; id?: string
}) {
  return (
    <motion.section id={id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-80px" }}>
      <div className="flex items-center gap-4 mb-8">
        <div className="w-1 h-5 rounded-full" style={{ background: accent }} />
        <h2 className="text-sm font-bold uppercase tracking-wider">{title}</h2>
        <div className="flex-1 h-px" style={{ background: cardBorder }} />
      </div>
      {children}
    </motion.section>
  );
}

function FutInput({ as: As = "input", accent, cardBorder, muted, ...props }: any) {
  const Tag = As as any;
  return (
    <Tag {...props} className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all border"
      style={{ background: "rgba(255,255,255,0.03)", borderColor: cardBorder, color: "inherit" }}
      onFocus={(e: any) => (e.currentTarget.style.borderColor = `${accent}60`)}
      onBlur={(e: any) => (e.currentTarget.style.borderColor = cardBorder)} />
  );
}
