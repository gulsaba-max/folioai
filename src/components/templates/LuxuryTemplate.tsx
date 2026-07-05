/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * TEMPLATE 10: LUXURY PORTFOLIO
 * Inspired by: Rolex, Tesla, Apple
 * Cinematic hero, gold accent, Cormorant Garamond, ultra-premium spacing, elegant transitions.
 */
import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { MapPin, Mail, Phone, ExternalLink, Sun, Moon, Send, Check, ArrowRight } from "lucide-react";
import type { TemplateProps } from "./templateUtils";
import { GOOGLE_FONTS } from "./templateUtils";

export default function LuxuryTemplate({
  portfolio, isDark, setActiveMode, socialLinks, handleSocialClick,
  handleSendMessage, visitorName, setVisitorName, visitorEmail, setVisitorEmail,
  visitorMsg, setVisitorMsg, formLoading, formSuccess, isDemo, hue, labels, sectionOrder
}: TemplateProps) {
  const gold = "#c9a84c";
  const accent = hue?.hex || gold;
  const bg = isDark ? "#0a0a0a" : "#faf7f2";
  const text = isDark ? "#f0ebe0" : "#1a1610";
  const muted = isDark ? "#6b6560" : "#9a9590";
  const card = isDark ? "#111110" : "#f5f0e8";
  const border = isDark ? "#1e1c18" : "#e8e3d8";

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.25], ["0%", "30%"]);

  return (
    <div className="min-h-screen" style={{ background: bg, color: text, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
      <link rel="stylesheet" href={GOOGLE_FONTS} />
      <style>{`
        @keyframes gold-shimmer { from{background-position:-200% center} to{background-position:200% center} }
        .gold-line { height:1px; background: linear-gradient(90deg, transparent, ${gold}, transparent); }
        .luxury-underline { position:relative; }
        .luxury-underline::after { content:''; position:absolute; bottom:-4px; left:0; width:0; height:1px; background:${gold}; transition:width 0.5s ease; }
        .luxury-underline:hover::after { width:100%; }
        .serif-title { font-family:'Cormorant Garamond', Georgia, serif; font-style:italic; }
        .sans-body { font-family:'Inter', sans-serif; }
      `}</style>

      {/* Ultra-minimal nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-7"
        style={{ background: isDark ? "rgba(10,10,10,0.95)" : "rgba(250,247,242,0.95)", backdropFilter: "blur(30px)" }}>
        <div>
          <span className="tracking-[0.3em] text-xs font-light uppercase"
            style={{ color: gold, fontFamily: "'Inter', sans-serif" }}>
            {portfolio.name?.split(" ")[0]} {portfolio.name?.split(" ")[1]?.[0]}.
          </span>
        </div>
        <div className="hidden md:flex items-center gap-10">
          {["projects", "experience"].filter(s => sectionOrder.includes(s)).map(s => (
            <a key={s} href={`#portfolio-${s}`}
              className="luxury-underline text-[11px] uppercase tracking-[0.25em] hover:opacity-70 transition-opacity"
              style={{ color: muted, fontFamily: "'Inter', sans-serif" }}>
              {labels[s as keyof typeof labels] || s}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-5">
          {socialLinks.map(({ key, url, Icon }) => (
            <a key={key} href={url} target="_blank" rel="noreferrer" onClick={() => handleSocialClick(key)}
              className="luxury-underline hover:opacity-60 transition-opacity" style={{ color: muted }}><Icon className="w-3.5 h-3.5" /></a>
          ))}
          <button onClick={() => setActiveMode(isDark ? "light" : "dark")} className="hover:opacity-60 transition-opacity" style={{ color: muted }}>
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>
      </nav>

      {/* Cinematic hero */}
      <motion.section style={{ opacity: heroOpacity }} className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: isDark
            ? "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 70%)"
            : "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 70%)"
        }} />

        <motion.div
          style={{ y: heroY }}
          className="relative z-10 max-w-4xl">
          {/* Gold accent line */}
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, delay: 0.2, ease: [0.77, 0, 0.18, 1] }}
            className="w-12 h-px mb-10 origin-left" style={{ background: gold }} />

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.4 }}>
            <p className="text-sm tracking-[0.4em] uppercase mb-4 sans-body" style={{ color: gold, fontFamily: "'Inter', sans-serif" }}>
              {portfolio.title}
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.77, 0, 0.18, 1] }}
            className="serif-title font-black leading-[0.88] mb-8 tracking-tight"
            style={{ fontSize: "clamp(5rem, 12vw, 11rem)" }}>
            {portfolio.name}
          </motion.h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.9 }}
            className="gold-line mb-8 max-w-sm" />

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="text-lg md:text-xl leading-relaxed mb-10 max-w-xl sans-body"
            style={{ color: muted, fontFamily: "'Inter', sans-serif" }}>
            {portfolio.bio}
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
            className="flex flex-wrap gap-5">
            <a href={`mailto:${portfolio.contactEmail}`}
              className="group flex items-center gap-3 px-8 py-4 text-sm uppercase tracking-[0.2em] font-semibold transition-all sans-body"
              style={{ background: gold, color: "#0a0a0a", fontFamily: "'Inter', sans-serif" }}>
              {labels.contact || "Connect"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#portfolio-projects"
              className="group flex items-center gap-3 px-8 py-4 text-sm uppercase tracking-[0.2em] border transition-all hover:bg-white/5 sans-body"
              style={{ borderColor: gold, color: gold, fontFamily: "'Inter', sans-serif" }}>
              View Work
            </a>
          </motion.div>
        </motion.div>

        {/* Info strip at bottom */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center">
          <div className="flex gap-8 sans-body" style={{ fontFamily: "'Inter', sans-serif" }}>
            {portfolio.location && <span className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase" style={{ color: muted }}><MapPin className="w-3 h-3" />{portfolio.location}</span>}
            <span className="text-[11px] tracking-[0.15em] uppercase" style={{ color: muted }}>{portfolio.contactEmail}</span>
          </div>
          <div className="flex gap-5">
            {socialLinks.slice(0, 3).map(({ key, url, Icon }) => (
              <a key={key} href={url} target="_blank" rel="noreferrer" onClick={() => handleSocialClick(key)}
                className="hover:opacity-60 transition-opacity" style={{ color: muted }}><Icon className="w-3.5 h-3.5" /></a>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-8 md:px-16 space-y-28 pb-28">

        {/* Skills */}
        {sectionOrder.includes("skills") && (
          <LuxSection title={labels.skills} gold={gold} muted={muted} text={text} border={border}>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {portfolio.skills?.map((s, i) => (
                <motion.span key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="text-xl font-medium serif-title" style={{ color: i % 3 === 0 ? text : muted }}>
                  {s}
                </motion.span>
              ))}
            </div>
          </LuxSection>
        )}

        {/* Projects */}
        {sectionOrder.includes("projects") && (
          <LuxSection title={labels.projects} gold={gold} muted={muted} text={text} border={border} id="portfolio-projects">
            <div className="space-y-0">
              {portfolio.projects?.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="group py-10 grid grid-cols-12 gap-6 border-t"
                  style={{ borderColor: border }}>
                  <div className="col-span-1 pt-1">
                    <span className="text-[11px] font-light tracking-wider sans-body" style={{ color: gold, fontFamily: "'Inter', sans-serif" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="col-span-11">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-2xl md:text-3xl serif-title font-semibold group-hover:opacity-80 transition-opacity">
                        {p.title}
                      </h3>
                      {p.link && <a href={p.link} target="_blank" rel="noreferrer"
                        className="opacity-0 group-hover:opacity-100 transition-all p-2" style={{ color: gold }}>
                        <ExternalLink className="w-4 h-4" /></a>}
                    </div>
                    <p className="text-sm leading-relaxed mb-5 sans-body" style={{ color: muted, fontFamily: "'Inter', sans-serif" }}>{p.description}</p>
                    <div className="flex flex-wrap gap-3">
                      {p.techStack?.map((t, ti) => (
                        <span key={ti} className="text-[10px] px-3 py-1 border sans-body"
                          style={{ borderColor: border, color: muted, fontFamily: "'Inter', sans-serif" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </LuxSection>
        )}

        {/* Experience */}
        {sectionOrder.includes("experience") && (
          <LuxSection title={labels.experience} gold={gold} muted={muted} text={text} border={border} id="portfolio-experience">
            <div className="space-y-0">
              {portfolio.experience?.map((exp, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="py-10 grid grid-cols-12 gap-6 border-t" style={{ borderColor: border }}>
                  <div className="col-span-3 sans-body" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <p className="text-[10px] tracking-[0.15em] uppercase" style={{ color: gold }}>{exp.startDate}</p>
                    <p className="text-[10px] tracking-[0.15em] uppercase" style={{ color: muted }}>{exp.endDate}</p>
                  </div>
                  <div className="col-span-9">
                    <h3 className="text-2xl serif-title font-semibold mb-1">{exp.role}</h3>
                    <p className="text-sm uppercase tracking-[0.15em] mb-4 sans-body" style={{ color: gold, fontFamily: "'Inter', sans-serif" }}>{exp.company}</p>
                    <p className="text-sm leading-relaxed sans-body" style={{ color: muted, fontFamily: "'Inter', sans-serif" }}>{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </LuxSection>
        )}

        {/* Education */}
        {sectionOrder.includes("education") && (
          <LuxSection title={labels.education} gold={gold} muted={muted} text={text} border={border}>
            <div className="grid md:grid-cols-2 gap-6">
              {portfolio.education?.map((edu, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                  className="p-8 border" style={{ borderColor: border, background: card }}>
                  <div className="gold-line w-8 mb-5" />
                  <h3 className="text-xl serif-title font-semibold mb-2">{edu.degree}</h3>
                  <p className="text-sm sans-body" style={{ color: muted, fontFamily: "'Inter', sans-serif" }}>{edu.school}</p>
                  <p className="text-[10px] mt-3 tracking-[0.2em] uppercase sans-body" style={{ color: gold, fontFamily: "'Inter', sans-serif" }}>{edu.year}</p>
                </motion.div>
              ))}
            </div>
          </LuxSection>
        )}

        {/* Contact */}
        {sectionOrder.includes("contact") && (
          <LuxSection title={labels.contact || "Get in Touch"} gold={gold} muted={muted} text={text} border={border} id="portfolio-contact">
            {formSuccess && (
              <div className="mb-8 p-4 flex items-center gap-3 text-sm border sans-body"
                style={{ borderColor: gold, background: `${gold}08`, color: gold, fontFamily: "'Inter', sans-serif" }}>
                <Check className="w-4 h-4" />{formSuccess}
              </div>
            )}
            <form onSubmit={handleSendMessage} className="space-y-5 sans-body" style={{ fontFamily: "'Inter', sans-serif" }}>
              <div className="grid sm:grid-cols-2 gap-5">
                {[{ph:"Your name",val:visitorName,set:setVisitorName},{ph:"Email address",val:visitorEmail,set:setVisitorEmail,type:"email",req:true}].map((f,i)=>(
                  <div key={i} className="relative">
                    <input type={f.type||"text"} required={f.req} placeholder=" " value={f.val}
                      onChange={e=>f.set(e.target.value)}
                      className="w-full px-5 pt-5 pb-3 text-sm outline-none border transition-all peer"
                      style={{ background: "transparent", borderColor: border, color: text }}
                      onFocus={e=>(e.currentTarget.style.borderColor=gold)}
                      onBlur={e=>(e.currentTarget.style.borderColor=border)} />
                    <label className="absolute top-2 left-5 text-[10px] uppercase tracking-[0.2em]"
                      style={{ color: gold }}>{f.ph}</label>
                  </div>
                ))}
              </div>
              <div className="relative">
                <textarea rows={4} required placeholder=" " value={visitorMsg} onChange={e=>setVisitorMsg(e.target.value)}
                  className="w-full px-5 pt-6 pb-3 text-sm outline-none resize-none border transition-all"
                  style={{ background: "transparent", borderColor: border, color: text }}
                  onFocus={e=>(e.currentTarget.style.borderColor=gold)}
                  onBlur={e=>(e.currentTarget.style.borderColor=border)} />
                <label className="absolute top-2 left-5 text-[10px] uppercase tracking-[0.2em]" style={{ color: gold }}>Message</label>
              </div>
              <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit" disabled={formLoading}
                className="group flex items-center gap-4 px-10 py-4 text-[11px] uppercase tracking-[0.3em] font-semibold cursor-pointer transition-all"
                style={{ background: gold, color: "#0a0a0a" }}>
                {formLoading ? "Sending..." : "Send Message"}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </form>
          </LuxSection>
        )}
      </div>

      <footer className="border-t py-10 px-8 md:px-16 flex flex-col md:flex-row justify-between items-center gap-4"
        style={{ borderColor: border }}>
        <div className="gold-line w-8" />
        <p className="text-[10px] tracking-[0.3em] uppercase sans-body" style={{ color: muted, fontFamily: "'Inter', sans-serif" }}>
          {portfolio.name} · {new Date().getFullYear()} · Powered by FolioAI
        </p>
        <div className="flex gap-5">
          {socialLinks.map(({ key, url, Icon }) => (
            <a key={key} href={url} target="_blank" rel="noreferrer" onClick={() => handleSocialClick(key)}
              className="hover:opacity-60 transition-opacity" style={{ color: muted }}><Icon className="w-3.5 h-3.5" /></a>
          ))}
        </div>
      </footer>
    </div>
  );
}

function LuxSection({ title, children, gold, muted, text, border, id }: {
  title: string; children: React.ReactNode; gold: string; muted: string; text: string; border: string; id?: string
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.section ref={ref} id={id}
      initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
      <motion.div
        initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: [0.77, 0, 0.18, 1] }}
        className="h-px w-8 mb-6 origin-left" style={{ background: gold }} />
      <p className="text-[10px] tracking-[0.4em] uppercase mb-12"
        style={{ color: gold, fontFamily: "'Inter', sans-serif" }}>{title}</p>
      {children}
    </motion.section>
  );
}
