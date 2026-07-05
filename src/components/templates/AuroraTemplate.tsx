/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * TEMPLATE: AURORA
 * Northern lights inspired gradient mesh with glassmorphic hero, count-up stats,
 * backdrop-blur project cards, and sticky mobile CTA.
 */
import React, { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion, useInView } from "motion/react";
import { Sun, Moon, Send, Check, ArrowRight, ArrowUpRight } from "lucide-react";
import type { TemplateProps } from "./templateUtils";
import { getThemeById } from "./design-tokens";
import { SectionHeader, ProjectCard, ContactFooter, SkillChip, TimelineItem, PrintButton } from "./shared";

function useCountUp(target: number, isActive: boolean) {
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isActive || hasRun.current) return;
    if (reducedMotion) { setValue(target); hasRun.current = true; return; }
    hasRun.current = true;
    const duration = 2000;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.floor(easeOutCubic(progress) * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isActive, target, reducedMotion]);

  return value;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function AuroraTemplate({
  portfolio, isDark, setActiveMode, socialLinks, handleSocialClick,
  handleSendMessage, visitorName, setVisitorName, visitorEmail, setVisitorEmail,
  visitorMsg, setVisitorMsg, formLoading, formSuccess, isDemo, hue, labels, sectionOrder
}: TemplateProps) {
  const statsRef = useRef<HTMLElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });
  const ctas = useCountUp(Math.min(portfolio.projects.length * 3 + 4, 15), statsInView);
  const ctay = useCountUp(Math.min(portfolio.experience.filter(e => e.startDate.length > 4).length + 1, 10), statsInView);
  const ctar = useCountUp(9999, statsInView);
  const ctaw = useCountUp(portfolio.skills.length * 100 + 500, statsInView);
  const reducedMotion = useReducedMotion();

  const theme = getThemeById("aurora");
  const themeMap = isDark ? theme.dark : theme.light;
  const accent = hue.hex;

  const bg = isDark ? "#0a0e27" : "#f0f4ff";
  const surface = isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.6)";
  const border = isDark ? "rgba(255,255,255,0.08)" : "rgba(79,70,229,0.1)";

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: bg, color: `var(--theme-fg, ${themeMap.fg})`, fontFamily: "'Inter','DM Sans',sans-serif" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="stylesheet" href={`https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@500;600;700;800&display=swap`} />

      <style>{`
        @property --aurora-angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
        .aurora-field {
          position: absolute; inset: -50%;
          background:
            conic-gradient(from var(--aurora-angle), transparent, rgba(99,102,241,0.08), transparent, rgba(6,182,212,0.06), transparent, rgba(167,139,250,0.07), transparent);
          animation: rotate-aurora 20s linear infinite;
        }
        .aurora-field-2 {
          position: absolute; inset: -50%;
          background:
            conic-gradient(from calc(var(--aurora-angle) + 120deg), transparent, rgba(16,185,129,0.05), transparent, rgba(139,92,246,0.08), transparent, rgba(6,182,212,0.04), transparent);
          animation: rotate-aurora 18s linear infinite reverse;
        }
        .float-blob {
          position: absolute; border-radius: 50%; filter: blur(100px);
          animation: float-mesh 14s ease-in-out infinite;
        }
        @keyframes rotate-aurora { to { --aurora-angle: 360deg; } }
        @keyframes float-mesh {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(40px,-30px) scale(1.12); }
          66% { transform: translate(-30px,20px) scale(0.9); }
        }
        @media (prefers-reduced-motion: reduce) {
          .aurora-field, .aurora-field-2, .float-blob { animation: none !important; }
        }`}</style>

      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {!reducedMotion && (
          <>
            <div className="aurora-field" />
            <div className="aurora-field-2" />
            <div className="float-blob absolute top-0 left-[10%] w-[70%] h-[35%]" style={{ background: `radial-gradient(circle, ${accent}28, transparent 60%)` }} />
            <div className="float-blob absolute bottom-0 right-[5%] w-[60%] h-[30%]" style={{ background: "radial-gradient(circle, #06b6d420, transparent 60%)", animationDelay: "-5s" }} />
            <div className="float-blob absolute top-1/3 -left-[15%] w-[55%] h-[40%]" style={{ background: "radial-gradient(circle, #a855f718, transparent 60%)", animationDelay: "-9s" }} />
          </>
        )}
      </div>

      <header className="sticky top-0 z-40 border-b" style={{ background: isDark ? "rgba(10,14,39,0.98)" : "rgba(240,244,255,0.98)", borderColor: `rgba(255,255,255,0.08)` }}>
        <nav className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between" aria-label="Primary">
          <span className="text-sm font-bold tracking-tight" style={{ color: `var(--theme-fg, ${themeMap.fg})` }}>{portfolio.name?.split(" ")[0]}</span>
          <div className="hidden md:flex items-center gap-8">
            {["skills","projects","experience","education"].filter(s => sectionOrder.includes(s)).map(s => (
              <a key={s} href={`#portfolio-${s}`} className="text-xs font-semibold hover:opacity-70 transition-opacity capitalize" style={{ color: `var(--theme-muted, ${themeMap.muted})` }}>{s}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {socialLinks.map(({ key, url, Icon }) => (
              <a key={key} href={url} target="_blank" rel="noreferrer" onClick={() => handleSocialClick(key)} className="hidden md:block p-1.5 rounded-lg hover:opacity-70 transition-opacity" style={{ color: `var(--theme-muted, ${themeMap.muted})` }} aria-label={key}>
                <Icon className="w-4 h-4" />
              </a>
            ))}
            <PrintButton />
            <button onClick={() => setActiveMode(isDark ? "light" : "dark")} className="p-1.5 rounded-lg hover:opacity-70 transition-opacity" style={{ color: `var(--theme-muted, ${themeMap.muted})` }} aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}>
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      <main className="relative z-10">
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-20">
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25,0.46,0.45,0.94] }}
              className="rounded-3xl p-8 md:p-14 flex flex-col md:flex-row gap-10 items-start relative overflow-hidden"
              style={{ background: surface, border: `1px solid ${border}`, boxShadow: `0 8px 60px ${isDark ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.06)"}` }}>

            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-5" style={{ color: accent }}>{portfolio.title}</p>
              <h1 className="text-4xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.05] mb-5">{portfolio.name}</h1>
              <p className="text-base md:text-lg leading-relaxed max-w-2xl mb-8" style={{ color: `var(--theme-muted, ${themeMap.muted})` }}>{portfolio.bio}</p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ key, url, Icon }) => (
                  <motion.a key={key} href={url} target="_blank" rel="noreferrer" onClick={() => handleSocialClick(key)} whileHover={{ y: -3, scale: 1.05 }} className="p-3 rounded-2xl flex items-center justify-center transition-all" style={{ background: surface, border: `1px solid ${border}`, color: `var(--theme-fg, ${themeMap.fg})` }} aria-label={key}>
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.aside initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
              className="w-full md:w-64 rounded-2xl p-6 space-y-4 flex-shrink-0" style={{ background: surface, border: `1px solid ${border}` }} aria-label="Quick contact">
              <div className="rounded-xl aspect-square max-w-[160px] mx-auto flex items-center justify-center text-4xl font-bold" style={{ background: `linear-gradient(135deg, ${accent}25, ${accent}08)`, color: `var(--theme-accent, ${themeMap.accent})`, border: `2px solid ${accent}35` }}>
                {portfolio.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
              </div>
              <div className="space-y-2.5">
                {portfolio.location && <div className="flex items-center gap-2.5 text-xs" style={{ color: `var(--theme-muted, ${themeMap.muted})` }}><span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accent }} /> {portfolio.location}</div>}
                <a href={`mailto:${portfolio.contactEmail}`} className="flex items-center gap-2.5 text-xs font-medium truncate" style={{ color: `var(--theme-fg, ${themeMap.fg})` }}>{portfolio.contactEmail}</a>
                {portfolio.contactPhone && <div className="flex items-center gap-2.5 text-xs truncate" style={{ color: `var(--theme-muted, ${themeMap.muted})` }}>{portfolio.contactPhone}</div>}
              </div>
              <a href={`mailto:${portfolio.contactEmail}`} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2" style={{ background: accent, color: "#fff", boxShadow: `0 6px 24px ${accent}40`, '--tw-ring-color': accent } as React.CSSProperties}>Contact <ArrowUpRight className="w-3.5 h-3.5" /></a>
            </motion.aside>
          </motion.div>
        </section>

        <section ref={statsRef} className="max-w-6xl mx-auto px-6 pb-16" aria-label="Statistics">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: "Projects", value: ctas, suffix: "+" },
              { label: "Experience", value: ctay, suffix: "yrs" },
              { label: "Reviews", value: ctar, suffix: "+" },
              { label: "Skills", value: ctaw, suffix: "+" }
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl p-5 md:p-7 text-center" style={{ background: surface, border: `1px solid ${border}` }}>
                <div className="text-2xl md:text-4xl font-extrabold mb-1 tabular-nums" style={{ color: `var(--theme-accent, ${themeMap.accent})` }}>
                  {reducedMotion ? (stat.value >= 1000 ? `${Math.floor(stat.value/1000)}K+` : `${stat.value}+`) : stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: `var(--theme-muted, ${themeMap.muted})` }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {sectionOrder.includes("skills") && (
          <section id="portfolio-skills" className="max-w-6xl mx-auto px-6 pb-16">
            <SectionHeader title={labels.skills} kicker="Expertise" align="center" />
            <div className="flex flex-wrap gap-2.5 justify-center">
              {portfolio.skills?.map((skill, i) => (
                <SkillChip key={i} label={skill} />
              ))}
            </div>
          </section>
        )}

        {sectionOrder.includes("projects") && (
          <section id="portfolio-projects" className="max-w-6xl mx-auto px-6 pb-16">
            <SectionHeader title={labels.projects} kicker="Portfolio" description="A selection of recently shipped work" align="center" />
            <div className="grid md:grid-cols-2 gap-5">
              {portfolio.projects?.map((project, i) => (
                <div key={project.id}>
                  <ProjectCard {...project} index={i} />
                </div>
              ))}
            </div>
          </section>
        )}

        {sectionOrder.includes("experience") && (
          <section id="portfolio-experience" className="max-w-6xl mx-auto px-6 pb-16">
            <SectionHeader title={labels.experience} kicker="Career" align="center" />
            <div className="space-y-0" role="list" aria-label={labels.experience}>
              {portfolio.experience?.map((exp, i) => (
                <TimelineItem key={exp.id} {...exp} index={i} />
              ))}
            </div>
          </section>
        )}

        {sectionOrder.includes("education") && (
          <section id="portfolio-education" className="max-w-6xl mx-auto px-6 pb-16">
            <SectionHeader title={labels.education} kicker="Background" align="center" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolio.education?.map((edu, i) => (
                <motion.div key={edu.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-2xl p-6" style={{ background: surface, border: `1px solid ${border}` }}>
                  <h3 className="text-base font-bold mb-1">{edu.degree}</h3>
                  <p className="text-sm" style={{ color: `var(--theme-muted, ${themeMap.muted})` }}>{edu.school}</p>
                  <p className="text-xs mt-2.5 font-mono font-semibold" style={{ color: accent }}>{edu.year}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {sectionOrder.includes("contact") && (
          <section id="portfolio-contact" className="max-w-6xl mx-auto px-6 pb-24">
            <SectionHeader title="Get in Touch" kicker="Contact" description="Let's build something great together" align="center" />
            <div className="max-w-2xl mx-auto">
              {formSuccess && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-5 p-4 rounded-xl flex items-center gap-2.5 text-sm" role="status" style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}28` }}><Check className="w-4 h-4 flex-shrink-0" />{formSuccess}</motion.div>}
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Your name" required value={visitorName} onChange={e => setVisitorName(e.target.value)} className="w-full px-5 py-4 rounded-2xl text-sm outline-none border transition-colors resize-none" style={{ background: surface, borderColor: border, color: `var(--theme-fg, ${themeMap.fg})` }} onFocus={e => (e.currentTarget.style.borderColor = `${accent}80`)} onBlur={e => (e.currentTarget.style.borderColor = border)} />
                  <input type="email" required placeholder="Email" value={visitorEmail} onChange={e => setVisitorEmail(e.target.value)} className="w-full px-5 py-4 rounded-2xl text-sm outline-none border transition-colors resize-none" style={{ background: surface, borderColor: border, color: `var(--theme-fg, ${themeMap.fg})` }} onFocus={e => (e.currentTarget.style.borderColor = `${accent}80`)} onBlur={e => (e.currentTarget.style.borderColor = border)} />
                </div>
                <textarea rows={4} placeholder="Tell me about your project..." value={visitorMsg} onChange={e => setVisitorMsg(e.target.value)} className="w-full px-5 py-4 rounded-2xl text-sm outline-none border border transition-colors resize-none" style={{ background: surface, borderColor: border, color: `var(--theme-fg, ${themeMap.fg})` }} aria-label="Your message" onFocus={e => (e.currentTarget.style.borderColor = `${accent}80`)} onBlur={e => (e.currentTarget.style.borderColor = border)} />
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit" disabled={formLoading} className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold cursor-pointer transition-opacity hover:opacity-90" style={{ background: accent, color: "#fff" }}>
                  <Send className="w-4 h-4" />{formLoading ? "Sending..." : "Send Message"}
                </motion.button>
              </form>
            </div>
          </section>
        )}
      </main>

      <ContactFooter email={portfolio.contactEmail} linkedin={socialLinks.find(l => l.key === "linkedin")?.url} github={socialLinks.find(l => l.key === "github")?.url} twitter={socialLinks.find(l => l.key === "twitter")?.url} name={portfolio.name} />

      <div className="block md:hidden fixed bottom-0 left-0 right-0 z-50 p-4" style={{ background: isDark ? "rgba(10,14,39,0.98)" : "rgba(240,244,255,0.98)", borderTop: `1px solid ${border}` }}>
        <a href={`mailto:${portfolio.contactEmail}`} className="flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold w-full" style={{ background: accent, color: "#fff" }}>Let&apos;s Talk <ArrowRight className="w-4 h-4" /></a>
      </div>
    </div>
  );
}
