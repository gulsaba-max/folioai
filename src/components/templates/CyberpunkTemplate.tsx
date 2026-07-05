/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * TEMPLATE 8: CYBERPUNK
 * Neon colors, matrix rain, glitch text, animated borders, scan-line overlay.
 */
import React, { useRef, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { ExternalLink, Send, Check, Sun, Moon, Terminal, Shield, Zap } from "lucide-react";
import type { TemplateProps } from "./templateUtils";
import { GOOGLE_FONTS } from "./templateUtils";

function MatrixRain({ color }: { color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ";
    const fontSize = 12; const cols = Math.floor(canvas.width / fontSize);
    const drops = Array(cols).fill(1);
    const r = parseInt(color.slice(1,3),16); const g = parseInt(color.slice(3,5),16); const b = parseInt(color.slice(5,7),16);
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = `rgba(${r},${g},${b},0.5)`; ctx.font = `${fontSize}px monospace`;
      drops.forEach((y, x) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, x * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[x] = 0;
        drops[x]++;
      });
    };
    const raf = setInterval(draw, 50);
    return () => { clearInterval(raf); window.removeEventListener("resize", resize); };
  }, [color]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" />;
}

export default function CyberpunkTemplate({
  portfolio, isDark, setActiveMode, socialLinks, handleSocialClick,
  handleSendMessage, visitorName, setVisitorName, visitorEmail, setVisitorEmail,
  visitorMsg, setVisitorMsg, formLoading, formSuccess, isDemo, hue, labels, sectionOrder
}: TemplateProps) {
  const accent = hue.hex;
  const bg = "#000000";
  const text = accent;
  const muted = `${accent}80`;
  const cardBg = "rgba(0,0,0,0.8)";

  return (
    <div className="min-h-screen relative" style={{ background: bg, color: text, fontFamily: "'Space Grotesk', monospace" }}>
      <link rel="stylesheet" href={GOOGLE_FONTS} />
      <style>{`
        @keyframes scan { from{top:-4px} to{top:100%} }
        @keyframes glitch1 { 0%,96%,100%{transform:translate(0)} 97%{transform:translate(-4px,2px)} 98%{transform:translate(4px,-2px)} }
        @keyframes glitch2 { 0%,96%,100%{transform:translate(0)} 97%{transform:translate(4px,-2px)} 98%{transform:translate(-4px,2px)} }
        @keyframes border-spin { to{--angle:360deg} }
        @keyframes neon-flicker { 0%,95%,100%{opacity:1} 96%{opacity:0.6} 97%{opacity:1} 98%{opacity:0.7} 99%{opacity:1} }
        .glitch-text { animation: glitch1 4s infinite; position:relative; }
        .glitch-text::before { content:attr(data-text); position:absolute; left:-2px; top:0; color:${accent}; clip-path:polygon(0 30%,100% 30%,100% 50%,0 50%); animation:glitch2 4s infinite; }
        .scanline { position:fixed; top:0; left:0; right:0; height:4px; background:linear-gradient(transparent,${accent}20,transparent); animation:scan 4s linear infinite; pointer-events:none; z-index:999; }
        .neon-border { border:1px solid ${accent}40; box-shadow:0 0 8px ${accent}20, inset 0 0 8px ${accent}08; transition:all 0.3s; }
        .neon-border:hover { border-color:${accent}80; box-shadow:0 0 20px ${accent}40, inset 0 0 15px ${accent}15; }
        .neon-text { text-shadow: 0 0 10px ${accent}, 0 0 20px ${accent}60; animation:neon-flicker 6s infinite; }
        @keyframes pulse-border { 0%,100%{border-color:${accent}30} 50%{border-color:${accent}70} }
        .pulse-border { animation:pulse-border 3s ease-in-out infinite; }
      `}</style>

      {/* Scan line overlay */}
      <div className="scanline" />

      {/* Scanline texture */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{ background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,255,0,0.3) 3px,rgba(0,255,0,0.3) 4px)" }} />

      {/* Nav */}
      <nav className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 border-b"
        style={{ background: "rgba(0,0,0,0.9)", backdropFilter: "blur(20px)", borderColor: `${accent}30` }}>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-sm flex items-center justify-center border" style={{ borderColor: accent }}>
            <Terminal className="w-3 h-3" style={{ color: accent }} />
          </div>
          <span className="font-bold text-sm neon-text">{portfolio.name?.replace(/\s+/, "_")}</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-xs font-bold font-mono" style={{ color: muted }}>
          {["skills", "projects", "experience"].filter(s => sectionOrder.includes(s)).map(s => (
            <a key={s} href={`#portfolio-${s}`} className="hover:text-current transition-all" style={{ color: muted }}>__{s}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {socialLinks.map(({ key, url, Icon }) => (
            <a key={key} href={url} target="_blank" rel="noreferrer" onClick={() => handleSocialClick(key)}
              className="hover:neon-text transition-all" style={{ color: muted }}><Icon className="w-4 h-4" /></a>
          ))}
          <button onClick={() => setActiveMode(isDark ? "light" : "dark")} style={{ color: muted }}>
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Hero with matrix background */}
      <section className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-16 overflow-hidden">
        <MatrixRain color={accent} />
        {/* Grid background */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        <div className="relative z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <div className="flex items-center gap-3 mb-8 text-xs font-mono" style={{ color: muted }}>
              <span>[</span>
              <span className="animate-pulse w-2 h-2 rounded-full" style={{ background: accent }} />
              <span>SYSTEM ONLINE</span>
              <span>]</span>
            </div>
            <h1 className="glitch-text neon-text font-black leading-none mb-6 tracking-tighter select-none"
              data-text={portfolio.name}
              style={{ fontSize: "clamp(3rem, 10vw, 9rem)", color: accent }}>
              {portfolio.name}
            </h1>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 max-w-[60px]" style={{ background: accent }} />
              <p className="text-lg font-bold font-mono" style={{ color: text }}>{portfolio.title}</p>
            </div>
            <p className="text-sm leading-relaxed max-w-xl mb-10 font-mono" style={{ color: muted }}>{portfolio.bio}</p>
            <div className="flex flex-wrap gap-4">
              <motion.a href={`mailto:${portfolio.contactEmail}`}
                whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${accent}60` }}
                className="px-8 py-3.5 rounded-sm font-bold text-sm font-mono border cursor-pointer"
                style={{ borderColor: accent, color: accent, background: `${accent}10` }}>
                ./contact --me
              </motion.a>
              <motion.a href="#portfolio-projects"
                whileHover={{ scale: 1.05 }}
                className="px-8 py-3.5 rounded-sm font-bold text-sm font-mono border cursor-pointer"
                style={{ borderColor: `${accent}40`, color: muted }}>
                ls ./projects
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 md:px-16 space-y-20 pb-20">

        {/* Skills */}
        {sectionOrder.includes("skills") && (
          <CyberSection title={`// ${labels.skills}`} accent={accent} muted={muted} id="portfolio-skills">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {portfolio.skills?.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                  whileHover={{ scale: 1.03 }}
                  className="neon-border rounded-sm px-4 py-3 text-sm font-mono cursor-default flex items-center gap-2"
                  style={{ background: cardBg }}>
                  <span className="text-[10px]" style={{ color: muted }}>&#62;</span>
                  <span>{s}</span>
                </motion.div>
              ))}
            </div>
          </CyberSection>
        )}

        {/* Projects */}
        {sectionOrder.includes("projects") && (
          <CyberSection title={`// ${labels.projects}`} accent={accent} muted={muted} id="portfolio-projects">
            <div className="space-y-4">
              {portfolio.projects?.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="neon-border rounded-sm p-5 group relative overflow-hidden"
                  style={{ background: cardBg }}>
                  <div className="absolute top-0 left-0 right-0 h-px transition-all duration-500 opacity-0 group-hover:opacity-100"
                    style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" style={{ color: accent }} />
                      <h3 className="font-bold">{p.title}</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-mono px-2 py-0.5 border" style={{ borderColor: `${accent}40`, color: muted }}>v1.0.0</span>
                      {p.link && <a href={p.link} target="_blank" rel="noreferrer"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: accent }}><ExternalLink className="w-4 h-4" /></a>}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed mb-4 font-mono" style={{ color: muted }}>{p.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.techStack?.map((t, ti) => (
                      <span key={ti} className="text-[10px] font-mono px-2 py-1 border"
                        style={{ borderColor: `${accent}30`, color: accent, background: `${accent}08` }}>{t}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </CyberSection>
        )}

        {/* Experience */}
        {sectionOrder.includes("experience") && (
          <CyberSection title={`// ${labels.experience}`} accent={accent} muted={muted} id="portfolio-experience">
            <div className="space-y-4">
              {portfolio.experience?.map((exp, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="neon-border rounded-sm p-5"
                  style={{ background: cardBg }}>
                  <div className="flex justify-between flex-wrap gap-2 mb-2">
                    <div>
                      <h3 className="font-bold">{exp.role}</h3>
                      <p className="text-sm" style={{ color: accent }}>{exp.company}</p>
                    </div>
                    <span className="text-[10px] font-mono" style={{ color: muted }}>{exp.startDate} — {exp.endDate}</span>
                  </div>
                  <p className="text-sm font-mono leading-relaxed" style={{ color: muted }}>{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </CyberSection>
        )}

        {/* Contact */}
        {sectionOrder.includes("contact") && (
          <CyberSection title="// get_in_touch()" accent={accent} muted={muted} id="portfolio-contact">
            {formSuccess && (
              <div className="mb-4 p-3 border text-sm flex items-center gap-2"
                style={{ borderColor: `${accent}40`, color: accent, background: `${accent}08` }}>
                <Check className="w-4 h-4" />{formSuccess}
              </div>
            )}
            <form onSubmit={handleSendMessage} className="space-y-3 max-w-lg">
              {[
                { ph:"// name", val:visitorName, set:setVisitorName },
                { ph:"// email@domain.com", val:visitorEmail, set:setVisitorEmail, type:"email", req:true }
              ].map((f,i) => (
                <input key={i} type={f.type||"text"} required={f.req} placeholder={f.ph} value={f.val}
                  onChange={e=>f.set(e.target.value)}
                  className="w-full px-4 py-3 rounded-sm text-sm font-mono outline-none transition-all border"
                  style={{ background: cardBg, borderColor: `${accent}30`, color: text }}
                  onFocus={e=>(e.currentTarget.style.borderColor = accent)}
                  onBlur={e=>(e.currentTarget.style.borderColor = `${accent}30`)} />
              ))}
              <textarea rows={4} required placeholder="// your message..." value={visitorMsg} onChange={e=>setVisitorMsg(e.target.value)}
                className="w-full px-4 py-3 rounded-sm text-sm font-mono outline-none resize-none border transition-all"
                style={{ background: cardBg, borderColor: `${accent}30`, color: text }}
                onFocus={e=>(e.currentTarget.style.borderColor = accent)}
                onBlur={e=>(e.currentTarget.style.borderColor = `${accent}30`)} />
              <motion.button whileHover={{ scale: 1.02, boxShadow: `0 0 25px ${accent}50` }} whileTap={{ scale: 0.97 }}
                type="submit" disabled={formLoading}
                className="flex items-center gap-2 px-8 py-3.5 rounded-sm text-sm font-bold font-mono cursor-pointer border"
                style={{ background: `${accent}15`, borderColor: accent, color: accent }}>
                <Send className="w-4 h-4" />{formLoading ? "transmitting..." : "send_message()"}
              </motion.button>
            </form>
          </CyberSection>
        )}
      </div>

      <footer className="border-t py-8 text-center text-[11px] font-mono" style={{ borderColor: `${accent}30`, color: muted }}>
        © {new Date().getFullYear()} {portfolio.name} | STATUS: ONLINE | Powered by FolioAI
      </footer>
    </div>
  );
}

function CyberSection({ title, children, accent, muted, id }: {
  title: string; children: React.ReactNode; accent: string; muted: string; id?: string
}) {
  return (
    <motion.section id={id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-80px" }}>
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-sm font-bold font-mono" style={{ color: accent }}>{title}</h2>
        <div className="flex-1 h-px" style={{ background: `${accent}20` }} />
      </div>
      {children}
    </motion.section>
  );
}
