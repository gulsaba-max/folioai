import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Sun, Moon, Terminal, GitBranch, Zap, Code2, Briefcase, GraduationCap,
  Calendar, Clock, HardDrive, QrCode, ExternalLink, Send, Check, Mail
} from 'lucide-react';
import type { TemplateProps } from './templateUtils';
import { getThemeById, cssVarToStyle } from './design-tokens';
import { ProjectCard, TimelineItem, SkillChip, SectionHeader, ContactFooter } from './shared';

function useTyping(lines: string[], speed = 32) {
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
  return { displayed };
}

function TerminalHero({ name, title, email, accent, muted }: { name: string; title: string; email: string; accent: string; muted: string }) {
  const lines = [
    `$ whoami`,
    `→ ${name}`,
    `$ cat ~/about.txt`,
    `→ ${title}`,
    `$ git log -1 --oneline`,
    `→ a3f9c12 "Building robust systems"`,
    `$ echo $EMAIL`,
    `→ ${email}`,
  ];
  const { displayed } = useTyping(lines, 32);

  return (
    <div className="rounded-xl overflow-hidden border border-white/20 dark:border-slate-700/30 shadow-[0_8px_30px_rgba(0,0,0,0.04)]" style={{ background: 'var(--theme-surface)', borderColor: 'var(--theme-border)' }}>
      <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: 'var(--theme-border)', background: 'var(--theme-bg)' }}>
        <div className="w-3 h-3 rounded-full bg-red-400 opacity-80" />
        <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-80" />
        <div className="w-3 h-3 rounded-full bg-green-400 opacity-80" />
        <span className="ml-3 text-[11px] font-mono" style={{ color: 'var(--theme-muted)' }}>~/engineer — zsh</span>
      </div>
      <div className="p-5 md:p-6 font-mono text-sm min-h-[180px]">
        {lines.map((line, i) => (
          <div key={i} className="mb-1 leading-relaxed">
            {displayed[i] !== undefined ? (
              <span style={{ color: line.startsWith('$') ? accent : 'var(--theme-fg)' }}>
                {displayed[i]}
                {i === displayed.length - 1 && <span className="animate-pulse" style={{ color: 'var(--theme-fg)' }}>▌</span>}
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function DiffStat({ additions = 0, deletions = 0, commits = 0, accent }: { additions?: number; deletions?: number; commits?: number; accent: string }) {
  return (
    <div className="mt-3 pt-3 border-t flex flex-wrap items-center gap-4 text-[11px] font-mono" style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-muted)' }}>
      <span className="flex items-center gap-1"><span style={{ color: accent }}>+{additions}</span> additions</span>
      <span className="flex items-center gap-1"><span style={{ color: 'oklch(0.60 0.15 25)' }}>−{deletions}</span> deletions</span>
      <span className="flex items-center gap-1"><Clock className="w-3 h-3" aria-hidden="true" />{commits} commits</span>
    </div>
  );
}

export default function EngineerTemplate({
  portfolio, isDark, setActiveMode, socialLinks, handleSocialClick,
  handleSendMessage, visitorName, setVisitorName, visitorEmail, setVisitorEmail,
  visitorMsg, setVisitorMsg, formLoading, formSuccess, isDemo, hue, labels, sectionOrder
}: TemplateProps) {
  const prefersReducedMotion = useReducedMotion();
  const theme = getThemeById('engineer');
  const activePalette = isDark ? theme.dark : theme.light;
  const rootStyle = cssVarToStyle(activePalette);
  const accent = hue.hex;

  return (
    <div className="min-h-screen" style={{ ...rootStyle, fontFamily: "'Inter', sans-serif" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap" />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 border-b backdrop-blur-md" style={{ background: 'color-mix(in srgb, var(--theme-bg) 88%, transparent)', borderColor: 'var(--theme-border)' }} aria-label="Primary">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: accent }}>
            <Code2 className="w-3 h-3 text-white" aria-hidden="true" />
          </div>
          <span className="text-sm font-bold" style={{ color: 'var(--theme-fg)' }}>
            {portfolio.name?.split(' ')[0].toLowerCase()}<span style={{ color: accent }}>.engineer</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {['projects', 'experience', 'skills'].filter(s => sectionOrder.includes(s)).map(s => (
            <a key={s} href={`#portfolio-${s}`} className="text-xs font-mono transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded" style={{ color: 'var(--theme-muted)' }} aria-label={`Jump to ${labels[s as keyof typeof labels]}`}>
              {labels[s as keyof typeof labels]}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {socialLinks.map(({ key, url, Icon }) => (
            <a key={key} href={url} target="_blank" rel="noreferrer" onClick={() => handleSocialClick(key)} className="p-1.5 rounded-lg transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ color: 'var(--theme-muted)' }} aria-label={`Visit ${key} profile`}>
              <Icon className="w-4 h-4" />
            </a>
          ))}
          <button onClick={() => setActiveMode(isDark ? 'light' : 'dark')} className="p-1.5 rounded-lg transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ color: 'var(--theme-muted)' }} aria-label="Toggle color mode">
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 md:px-10 py-16 space-y-20">

        {/* Hero */}
        <section id="portfolio-hero" aria-label="Hero">
          <motion.div initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }} animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
            <div className="flex items-center gap-2 mb-5 text-xs font-mono" style={{ color: accent }}>
              <GitBranch className="w-3.5 h-3.5" aria-hidden="true" />
              <span>main</span>
              <span className="opacity-50">·</span>
              <span style={{ color: 'var(--theme-muted)' }}>latest: "Portfolio v5.0 — Open to offers"</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-3 tracking-tight" style={{ color: 'var(--theme-fg)', fontFamily: "'Space Grotesk', sans-serif" }}>
              {portfolio.name}
            </h1>
            <p className="text-lg md:text-xl mb-4 font-semibold" style={{ color: accent }}>{portfolio.title}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm mb-6" style={{ color: 'var(--theme-muted)' }}>
              {portfolio.location && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                  {portfolio.location}
                </span>
              )}
              <a href={`mailto:${portfolio.contactEmail}`} className="flex items-center gap-1 hover:opacity-70 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 rounded" style={{ color: 'var(--theme-muted)' }} aria-label={`Email ${portfolio.contactEmail}`}>
                <Mail className="w-3.5 h-3.5" aria-hidden="true" />{portfolio.contactEmail}
              </a>
            </div>
            <p className="text-sm leading-relaxed max-w-2xl mb-8" style={{ color: 'var(--theme-muted)' }}>{portfolio.bio}</p>
          </motion.div>
          <motion.div initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }} animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <TerminalHero name={portfolio.name} title={portfolio.title} email={portfolio.contactEmail} accent={accent} muted="var(--theme-muted)" />
          </motion.div>
        </section>

        {/* Projects */}
        {sectionOrder.includes('projects') && (
          <section id="portfolio-projects" aria-labelledby="projects-heading">
            <SectionHeader title={labels.projects} />
            <div className="grid md:grid-cols-2 gap-5">
              {portfolio.projects?.map((p, i) => (
                <motion.div key={i} initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }} whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group relative">
                  <div className="rounded-xl border border-white/20 dark:border-slate-700/30 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all" style={{ background: 'var(--theme-surface)', borderColor: 'var(--theme-border)' }}>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <GitBranch className="w-4 h-4" style={{ color: accent }} aria-hidden="true" />
                          <h3 className="font-bold font-sans text-base" style={{ color: 'var(--theme-fg)' }}>{p.title}</h3>
                        </div>
                        {p.link && (
                          <a href={p.link} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg transition-colors hover:opacity-70 focus:outline-none focus-visible:ring-2" style={{ color: accent }} aria-label={`Open project ${p.title}`}>
                            <ExternalLink className="w-4 h-4" aria-hidden="true" />
                          </a>
                        )}
                      </div>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--theme-muted)' }}>{p.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {p.techStack?.map((t, ti) => (
                          <span key={ti} className="text-[11px] px-2.5 py-1 rounded-md font-medium border border-white/20 dark:border-slate-700/30" style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-muted)', background: 'var(--theme-bg)' }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none p-5 flex flex-col justify-end" style={{ background: 'color-mix(in srgb, var(--theme-bg) 92%, transparent)' }}>
                    <DiffStat additions={12 + i * 7} deletions={3 + i * 2} commits={2 + i} accent={accent} />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Skills — Code Config Block */}
        {sectionOrder.includes('skills') && (
          <section id="portfolio-skills" aria-labelledby="skills-heading">
            <SectionHeader title={labels.skills} />
            <div className="rounded-xl border border-white/20 dark:border-slate-700/30 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden" style={{ background: 'var(--theme-surface)', borderColor: 'var(--theme-border)' }}>
              <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: 'var(--theme-border)', background: 'var(--theme-bg)' }}>
                <span className="text-xs font-mono font-semibold" style={{ color: 'var(--theme-muted)' }}>skills.config.ts</span>
                <span className="text-[10px] px-2 py-0.5 rounded border" style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-muted)' }}>TypeScript</span>
              </div>
              <div className="p-5 font-mono text-sm leading-7">
                <div><span style={{ color: 'var(--theme-muted)' }}>const</span> <span style={{ color: 'var(--theme-fg)' }}>engineer</span> <span style={{ color: 'var(--theme-muted)' }}>=</span> {'{'}</div>
                <div className="pl-4"><span style={{ color: 'var(--theme-muted)' }}>role:</span> <span style={{ color: accent }}>"{portfolio.title}"</span></div>
                <div className="pl-4"><span style={{ color: 'var(--theme-muted)' }}>skills:</span> {'['}</div>
                {portfolio.skills?.slice(0, 8).map((s, i) => (
                  <div key={i} className="pl-8"><span style={{ color: 'var(--theme-fg)' }}>"{s}"</span>{i < Math.min((portfolio.skills?.length || 0), 8) - 1 ? ',' : ''}</div>
                ))}
                {portfolio.skills && portfolio.skills.length > 8 && (
                  <div className="pl-8" style={{ color: 'var(--theme-muted)' }}>// ...{portfolio.skills.length} total</div>
                )}
                <div className="pl-4">{']'}</div>
                <div>{'}'}</div>
                <div className="mt-2" style={{ color: 'var(--theme-muted)' }}>export default engineer</div>
              </div>
            </div>
          </section>
        )}

        {/* Experience — Git log timeline */}
        {sectionOrder.includes('experience') && (
          <section id="portfolio-experience" aria-labelledby="experience-heading">
            <SectionHeader title={labels.experience} />
            <div className="space-y-0">
              {portfolio.experience?.map((exp, i) => (
                <TimelineItem
                  key={i}
                  title={exp.role}
                  subtitle={exp.company}
                  date={`${exp.startDate} → ${exp.endDate}`}
                  description={exp.description}
                  showConnector={i < (portfolio.experience?.length || 0) - 1}
                  index={i}
                />
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {sectionOrder.includes('education') && (
          <section id="portfolio-education" aria-labelledby="education-heading">
            <SectionHeader title={labels.education} />
            <div className="grid md:grid-cols-2 gap-5">
              {portfolio.education?.map((edu, i) => (
                <motion.div key={i} initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }} whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-5 rounded-xl border" style={{ background: 'var(--theme-surface)', borderColor: 'var(--theme-border)' }}>
                  <h3 className="font-bold font-sans mb-1" style={{ color: 'var(--theme-fg)' }}>{edu.degree}</h3>
                  <p className="text-sm" style={{ color: 'var(--theme-muted)' }}>{edu.school}</p>
                  <p className="text-xs mt-2 font-mono" style={{ color: accent }}>{edu.year}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        {sectionOrder.includes('contact') && (
          <section id="portfolio-contact" aria-labelledby="contact-heading">
            <SectionHeader title="Contact" />
            <div className="max-w-xl">
              {formSuccess && (
                <div className="mb-4 p-3 rounded-xl text-sm flex items-center gap-2 border" style={{ background: `${accent}15`, borderColor: `${accent}30`, color: accent }} role="status" aria-live="polite">
                  <Check className="w-4 h-4" aria-hidden="true" />{formSuccess}
                </div>
              )}
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                   <input type="text" placeholder="// your_name" value={visitorName} onChange={e => setVisitorName(e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm font-mono outline-none border border-white/20 dark:border-slate-700/30 transition-all focus:outline-none focus-visible:ring-2" style={{ background: 'var(--theme-surface)', borderColor: 'var(--theme-border)', color: 'var(--theme-fg)' }} onFocus={e => (e.currentTarget.style.borderColor = accent)} onBlur={e => (e.currentTarget.style.borderColor = 'var(--theme-border)')} aria-label="Your name" />
                   <input type="email" required placeholder="// email@domain.com" value={visitorEmail} onChange={e => setVisitorEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm font-mono outline-none border border-white/20 dark:border-slate-700/30 transition-all focus:outline-none focus-visible:ring-2" style={{ background: 'var(--theme-surface)', borderColor: 'var(--theme-border)', color: 'var(--theme-fg)' }} onFocus={e => (e.currentTarget.style.borderColor = accent)} onBlur={e => (e.currentTarget.style.borderColor = 'var(--theme-border)')} aria-label="Email address" />
                </div>
                 <textarea rows={4} required placeholder="// your message..." value={visitorMsg} onChange={e => setVisitorMsg(e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm font-mono outline-none resize-none border border-white/20 dark:border-slate-700/30 transition-all focus:outline-none focus-visible:ring-2" style={{ background: 'var(--theme-surface)', borderColor: 'var(--theme-border)', color: 'var(--theme-fg)' }} onFocus={e => (e.currentTarget.style.borderColor = accent)} onBlur={e => (e.currentTarget.style.borderColor = 'var(--theme-border)')} aria-label="Your message" />
                <motion.button whileHover={prefersReducedMotion ? {} : { scale: 1.02 }} whileTap={prefersReducedMotion ? {} : { scale: 0.97 }} type="submit" disabled={formLoading} className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold cursor-pointer font-sans shadow-[0_8px_30px_rgba(0,0,0,0.04)] border transition-colors focus:outline-none focus-visible:ring-2" style={{ background: accent, color: 'var(--theme-bg)', borderColor: accent }}>
                  <Send className="w-4 h-4" aria-hidden="true" />{formLoading ? 'Pushing...' : 'git commit -m "init"'}
                </motion.button>
              </form>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t py-10" style={{ borderColor: 'var(--theme-border)' }} role="contentinfo" aria-label="System status and contact">
        <div className="max-w-5xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[11px] font-mono" style={{ color: 'var(--theme-muted)' }}>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" aria-hidden="true" />uptime: 99.97%</span>
              <span className="flex items-center gap-1"><HardDrive className="w-3 h-3" aria-hidden="true" />last_deployed: 2026-07-03T12:00:00Z</span>
            </div>
            <span className="text-[11px]" style={{ color: 'var(--theme-muted)' }}>© {new Date().getFullYear()} {portfolio.name} · Powered by FolioAI</span>
          </div>
          {/* vCard QR placeholder */}
          <div className="w-24 h-24 rounded-lg border flex items-center justify-center" style={{ background: 'var(--theme-surface)' }} aria-label="vCard QR code placeholder">
            <div className="flex flex-col items-center gap-1">
              <QrCode className="w-8 h-8" style={{ color: 'var(--theme-muted)' }} aria-hidden="true" />
              <span className="text-[9px] font-mono" style={{ color: 'var(--theme-muted)' }}>vCard</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
