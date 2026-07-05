/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * TEMPLATE: VIBRANT
 * Energetic and colorful with gradient hero text, offset colored shadows,
 * skill chip wiggles, and a gradient connector timeline.
 */
import React, { useRef, useCallback } from "react";
import { motion, useReducedMotion, useInView } from "motion/react";
import { Sun, Moon, ArrowUpRight, Heart, Send, Check } from "lucide-react";
import type { TemplateProps } from "./templateUtils";
import { getThemeById, cssVarToStyle } from "./design-tokens";
import { SectionHeader, ProjectCard, ContactFooter, SkillChip, TimelineItem, PrintButton } from "./shared";

const VIBRANT_GRADIENT =
  "linear-gradient(135deg, #ff6b6b, #f97316, #fbbf24, #10b981, #6366f1, #8b5cf6, #ec4899)";

const TECH_COLORS: Record<string, string> = {
  javascript: '#f7df1e', typescript: '#3178c6', python: '#3776ab', react: '#61dafb',
  nextjs: '#000000', nodejs: '#339933', rust: '#dea584', go: '#00add8',
  tailwind: '#38bdf8', figma: '#f24e1e', docker: '#2496ed', aws: '#ff9900',
  graphql: '#e535ab', redis: '#dc382d', postgres: '#4169e1', mongodb: '#47a248',
};

function getTechColor(tech: string): string {
  const key = tech.toLowerCase().replace(/[\s/]/g, '');
  return (
    TECH_COLORS[key] ??
    Object.entries(TECH_COLORS).find(([k]) => key.includes(k))?.[1] ??
    '#94a3b8'
  );
}

export default function VibrantTemplate({
  portfolio, isDark, setActiveMode, socialLinks, handleSocialClick,
  handleSendMessage, visitorName, setVisitorName, visitorEmail, setVisitorEmail,
  visitorMsg, setVisitorMsg, formLoading, formSuccess, isDemo, hue, labels, sectionOrder
}: TemplateProps) {
  const reducedMotion = useReducedMotion();
  const theme = getThemeById("vibrant");
  const themeMap = isDark ? theme.dark : theme.light;
  const accentHex = hue.hex;
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-60px" });

  const bg = isDark ? themeMap.bg : themeMap.bg;
  const surface = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.7)';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

  const rootStyle: React.CSSProperties = {
    ...cssVarToStyle(themeMap),
    '--theme-accent': accentHex,
    '--theme-gradient': VIBRANT_GRADIENT,
    fontFamily: "'Inter','DM Sans','Space Grotesk',sans-serif",
  };

  const handleChipWiggle = useCallback(
    (el: HTMLSpanElement | null) => {
      if (!el || reducedMotion) return;
      el.animate(
        [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-4deg)' }, { transform: 'rotate(4deg)' }, { transform: 'rotate(0deg)' }],
        { duration: 280, easing: 'ease-in-out' }
      );
    },
    [reducedMotion]
  );

  const chipColors = [
    '#ff6b6b22', '#f9731622', '#fbbf2422', '#10b98122', '#6366f122',
    '#8b5cf622', '#ec489922', '#06b6d422', '#84cc1622', '#f43f5e22',
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ ...rootStyle, background: bg, color: `var(--theme-fg)` }}>
      <style>{`
        @property --glow-shift { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
        .vibrant-hero-gradient {
          background: var(--theme-gradient, ${VIBRANT_GRADIENT});
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .vibrant-card-shadow {
          box-shadow: 6px 6px 0px ${accentHex}44, 0 4px 24px ${isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.06)'};
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .vibrant-card-shadow:hover {
          transform: translate(-2px, -2px);
          box-shadow: 10px 10px 0px ${accentHex}55, 0 8px 32px ${isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)'};
        }
        .vibrant-chip {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .vibrant-chip:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 16px ${accentHex}33;
        }
        .vibrant-timeline-line {
          background: ${VIBRANT_GRADIENT};
          opacity: 0.5;
        }
        .vibrant-focus-ring:focus-visible {
          outline: 3px solid ${accentHex};
          outline-offset: 3px;
          border-radius: 0.375rem;
        }
        .vibrant-avatar {
          background: ${VIBRANT_GRADIENT};
        }
        .made-with-gradient {
          background: ${VIBRANT_GRADIENT};
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        @media (prefers-reduced-motion: reduce) {
          .vibrant-card-shadow:hover { transform: none; }
          .vibrant-chip:hover { transform: none; }
        }
      `}</style>

      <header className="sticky top-0 z-40 border-b backdrop-blur-md" style={{ background: isDark ? 'rgba(8,8,23,0.88)' : 'rgba(250,250,255,0.88)', borderColor }}>
        <nav className="max-w-5xl mx-auto px-5 py-3 flex items-center justify-between" aria-label="Primary">
          <span className="text-sm font-bold tracking-tight" style={{ color: `var(--theme-fg)` }}>{portfolio.name.split(" ")[0]}</span>
          <div className="hidden md:flex items-center gap-7">
            {sectionOrder.filter(s => ["skills","projects","experience","education"].includes(s)).map(s => (
              <a key={s} href={`#portfolio-${s}`} className="text-xs font-semibold hover:opacity-70 transition-opacity capitalize vibrant-focus-ring rounded-sm" style={{ color: `var(--theme-muted)` }}>{s}</a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {socialLinks.map(({ key, url, Icon }) => (
              <a key={key} href={url} target="_blank" rel="noreferrer" onClick={() => handleSocialClick(key)} className="hidden md:flex p-2 rounded-lg hover:opacity-70 transition-opacity vibrant-focus-ring" style={{ color: `var(--theme-muted)` }} aria-label={key}>
                <Icon className="w-4 h-4" />
              </a>
            ))}
            <PrintButton />
            <button onClick={() => setActiveMode(isDark ? "light" : "dark")} className="p-2 rounded-lg hover:opacity-70 transition-opacity vibrant-focus-ring" style={{ color: `var(--theme-muted)` }} aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}>
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section ref={heroRef} className="max-w-5xl mx-auto px-5 pt-14 pb-10 md:pt-24 md:pb-16" aria-labelledby="hero-title">
          <div className="rounded-3xl p-8 md:p-14 relative overflow-hidden" style={{ background: surface, border: `1px solid ${borderColor}` }}>
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: VIBRANT_GRADIENT, filter: 'blur(60px)', transform: 'scale(1.2)' }} aria-hidden="true" />
            <div className="relative flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4" style={{ color: accentHex }}>{portfolio.title}</p>
                <h1 id="hero-title" className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-5 vibrant-hero-gradient">
                  {portfolio.name}
                </h1>
                <p className="text-base md:text-lg leading-relaxed max-w-2xl mb-7" style={{ color: `var(--theme-muted)` }}>{portfolio.bio}</p>
                <div className="flex flex-wrap gap-2.5">
                  {socialLinks.slice(0, 5).map(({ key, url, Icon }) => (
                    <motion.a key={key} href={url} target="_blank" rel="noreferrer" onClick={() => handleSocialClick(key)} whileHover={reducedMotion ? {} : { y: -3 }} className="vibrant-focus-ring p-2.5 rounded-xl border transition-opacity hover:opacity-80" style={{ background: `var(--theme-bg)`, borderColor, color: `var(--theme-fg)` }} aria-label={key}>
                      <Icon className="w-4 h-4" />
                    </motion.a>
                  ))}
                </div>
              </div>
              <motion.div initial={reducedMotion ? {} : { opacity: 0, scale: 0.9 }} animate={reducedMotion ? {} : { opacity: 1, scale: 1 }} transition={{ delay: 0.25 }} className="w-32 h-32 md:w-40 md:h-40 rounded-full vibrant-avatar flex items-center justify-center text-3xl md:text-4xl font-extrabold text-white shadow-xl flex-shrink-0" aria-label={`${portfolio.name} avatar`}>
                {portfolio.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
              </motion.div>
            </div>
          </div>
        </section>

        {sectionOrder.includes("skills") && (
          <section id="portfolio-skills" className="max-w-5xl mx-auto px-5 py-12">
            <SectionHeader title={labels.skills} kicker="Expertise" align="center" />
            <div className="flex flex-wrap gap-3 justify-center" role="list" aria-label={labels.skills}>
              {portfolio.skills?.map((skill, i) => (
                <span
                  key={i}
                  role="listitem"
                  tabIndex={0}
                  aria-label={skill}
                  className="vibrant-chip inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border vibrant-focus-ring cursor-default"
                  style={{
                    background: isDark ? chipColors[i % chipColors.length].replace('22', '33') : chipColors[i % chipColors.length],
                    borderColor: accentHex + '44',
                    color: `var(--theme-fg)`,
                  }}
                  onMouseEnter={(e) => !reducedMotion && handleChipWiggle(e.currentTarget)}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {sectionOrder.includes("projects") && (
          <section id="portfolio-projects" className="max-w-5xl mx-auto px-5 py-12">
            <SectionHeader title={labels.projects} kicker="Portfolio" description="Recently shipped work" align="center" />
            <div className="grid sm:grid-cols-2 gap-6">
              {portfolio.projects?.map((project, i) => (
                <motion.div key={project.id} initial={reducedMotion ? {} : { opacity: 0, y: 20 }} whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.1 }} className="vibrant-card-shadow rounded-2xl overflow-hidden" style={{ background: `var(--theme-surface)`, border: `1px solid ${borderColor}` }}>
                  <div className="w-full aspect-video flex items-center justify-center" style={{ background: VIBRANT_GRADIENT, opacity: 0.9 }}>
                    <span className="text-white/90 text-xs font-bold uppercase tracking-widest">{project.role || project.title}</span>
                  </div>
                  <div className="p-5 md:p-6">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-lg font-bold leading-tight" style={{ color: `var(--theme-fg)` }}>{project.title}</h3>
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg hover:opacity-70 transition-opacity vibrant-focus-ring flex-shrink-0" style={{ color: accentHex }} aria-label={`Open ${project.title}`}>
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: `var(--theme-muted)` }}>{project.description}</p>
                    <div className="flex flex-wrap gap-1.5" aria-label={`Tech stack for ${project.title}`}>
                       {(Array.isArray(project.techStack) ? project.techStack : []).map(tech => (
                         <span key={tech} className="text-[10px] px-2 py-1 rounded-md font-bold border" style={{ background: `var(--theme-bg)`, borderColor, color: getTechColor(tech) }}>
                           {tech}
                         </span>
                       ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {sectionOrder.includes("experience") && (
          <section id="portfolio-experience" className="max-w-5xl mx-auto px-5 py-12">
            <SectionHeader title={labels.experience} kicker="Career" align="center" />
            <div className="space-y-0" role="list" aria-label={labels.experience}>
              {portfolio.experience?.map((exp, i) => (
                <div key={exp.id} className="relative flex gap-4 md:gap-6" role="listitem">
                  <div className="flex flex-col items-center" aria-hidden="true">
                    <span className="w-3 h-3 rounded-full border-2 flex-shrink-0 mt-1 shadow-md" style={{ borderColor: accentHex, background: `var(--theme-bg)`, boxShadow: `0 0 0 4px ${accentHex}22` }} />
                    {i < portfolio.experience.length - 1 && <span className="vibrant-timeline-line w-0.5 flex-1 my-1.5 rounded-full" />}
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="text-base font-bold" style={{ color: `var(--theme-fg)` }}>{exp.role}</h3>
                    <p className="text-sm font-semibold mb-1" style={{ color: accentHex }}>{exp.company}</p>
                    <time className="text-xs font-mono block mb-2" style={{ color: `var(--theme-muted)` }} dateTime={exp.startDate}>{exp.startDate} – {exp.endDate}</time>
                    {exp.description && <p className="text-sm leading-relaxed" style={{ color: `var(--theme-muted)` }}>{exp.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {sectionOrder.includes("education") && (
          <section id="portfolio-education" className="max-w-5xl mx-auto px-5 py-12">
            <SectionHeader title={labels.education} kicker="Background" align="center" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {portfolio.education?.map((edu, i) => (
                <motion.div key={edu.id} initial={reducedMotion ? {} : { opacity: 0, y: 20 }} whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="vibrant-card-shadow rounded-2xl p-6" style={{ background: `var(--theme-surface)`, border: `1px solid ${borderColor}` }}>
                  <div className="w-full h-2 rounded-full mb-4" style={{ background: VIBRANT_GRADIENT }} aria-hidden="true" />
                  <h3 className="text-base font-bold mb-1" style={{ color: `var(--theme-fg)` }}>{edu.school}</h3>
                  <p className="text-sm" style={{ color: `var(--theme-muted)` }}>{edu.degree}</p>
                  <p className="text-xs mt-2.5 font-mono font-bold" style={{ color: accentHex }}>{edu.year}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {sectionOrder.includes("contact") && (
          <section id="portfolio-contact" className="max-w-5xl mx-auto px-5 py-16">
            <SectionHeader title="Get in Touch" kicker="Contact" align="center" />
            <div className="max-w-xl mx-auto">
              {formSuccess && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-5 p-4 rounded-xl flex items-center gap-2.5 text-sm font-medium" role="status" style={{ background: `${accentHex}18`, color: accentHex, border: `1px solid ${accentHex}28` }}>
                  <Check className="w-4 h-4 flex-shrink-0" />{formSuccess}
                </motion.div>
              )}
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Your name" required value={visitorName} onChange={e => setVisitorName(e.target.value)} className="w-full px-5 py-4 rounded-2xl text-sm outline-none border vibrant-focus-ring resize-none" style={{ background: `var(--theme-bg)`, borderColor, color: `var(--theme-fg)` }} onFocus={e => (e.currentTarget.style.borderColor = accentHex)} onBlur={e => (e.currentTarget.style.borderColor = borderColor)} />
                  <input type="email" required placeholder="Email address" value={visitorEmail} onChange={e => setVisitorEmail(e.target.value)} className="w-full px-5 py-4 rounded-2xl text-sm outline-none border vibrant-focus-ring resize-none" style={{ background: `var(--theme-bg)`, borderColor, color: `var(--theme-fg)` }} onFocus={e => (e.currentTarget.style.borderColor = accentHex)} onBlur={e => (e.currentTarget.style.borderColor = borderColor)} />
                </div>
                <textarea rows={4} placeholder="Tell me about your project..." value={visitorMsg} onChange={e => setVisitorMsg(e.target.value)} className="w-full px-5 py-4 rounded-2xl text-sm outline-none border vibrant-focus-ring resize-none" style={{ background: `var(--theme-bg)`, borderColor, color: `var(--theme-fg)` }} aria-label="Your message" onFocus={e => (e.currentTarget.style.borderColor = accentHex)} onBlur={e => (e.currentTarget.style.borderColor = borderColor)} />
                <motion.button whileHover={reducedMotion ? {} : { scale: 1.01 }} whileTap={reducedMotion ? {} : { scale: 0.97 }} type="submit" disabled={formLoading} className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold cursor-pointer transition-opacity hover:opacity-90 vibrant-focus-ring text-white" style={{ background: VIBRANT_GRADIENT, boxShadow: `0 6px 24px ${accentHex}44` }}>
                  <Send className="w-4 h-4" />{formLoading ? "Sending..." : "Send Message"}
                </motion.button>
              </form>
            </div>
          </section>
        )}
      </main>

      <ContactFooter email={portfolio.contactEmail} linkedin={socialLinks.find(l => l.key === "linkedin")?.url} github={socialLinks.find(l => l.key === "github")?.url} twitter={socialLinks.find(l => l.key === "twitter")?.url} name={portfolio.name} />

      <footer className="border-t py-8 text-center" style={{ borderColor }} role="contentinfo" aria-label="Portfolio footer">
        <p className="text-xs" style={{ color: `var(--theme-muted)` }}>
          Made with <Heart className="inline w-3.5 h-3.5 mx-0.5" style={{ color: '#ec4899' }} aria-hidden="true" /> by{" "}
          <span className="font-semibold made-with-gradient">{portfolio.name}</span>
        </p>
        <p className="text-[10px] mt-2" style={{ color: `var(--theme-muted)` }}>
          © {new Date().getFullYear()} {portfolio.name}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
