import React from "react";
import { 
  Upload, Layout, MonitorSmartphone, Settings2, Github,
  ArrowRight, FileText, Bot, Rocket, Search, Edit3, Palette,
  CheckCircle2, Loader2, Sparkles, Zap, Shield, Globe, Play
} from "lucide-react";
import { CinematicHeroPreview } from "./CinematicHeroPreview";
import { useToast } from "./Toast";

interface LandingPageProps {
  onGetStarted: () => void;
  onOpenPanel?: (panel: any) => void;
  onTryDemo?: () => void;
}

export default function LandingPage({ onGetStarted, onOpenPanel, onTryDemo }: LandingPageProps) {
  const { toast } = useToast();
  return (
    <div className="bg-bg-base font-sans relative text-text-main selection:bg-primary/20 selection:text-primary overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none -z-10" />

      <main className="relative z-10 pt-8 pb-24 flex flex-col gap-16">
        {/* ──────────────────────────────────────────────────────────
            HERO SECTION
        ────────────────────────────────────────────────────────── */}
         <section className="max-w-7xl mx-auto px-6 pt-16 text-center flex flex-col items-center animate-fade-in">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-8 animate-slide-up" style={{animationDelay: '0.1s'}}>
              <Sparkles className="w-4 h-4" />
              AI Portfolio Generator
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 max-w-5xl mx-auto leading-tight text-text-main animate-slide-up" style={{animationDelay: '0.2s'}}>
             Transform your resume into a <br className="hidden md:block" />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
               professional portfolio.
             </span>
           </h1>
           
           <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-12 leading-relaxed animate-slide-up" style={{animationDelay: '0.3s'}}>
             Upload your resume or enter your details manually. Our multi-agent AI system generates a production-ready, beautiful portfolio website in under 5 minutes.
           </p>
           
             <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-20 animate-slide-up" style={{animationDelay: '0.4s'}}>
               <button onClick={onGetStarted} className="btn-primary w-full sm:w-auto text-lg px-8 py-4 flex items-center justify-center gap-2 group">
                 Start Generating <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </button>
               {onTryDemo && (
                 <button onClick={onTryDemo} className="btn-secondary w-full sm:w-auto text-lg px-8 py-4 flex items-center justify-center gap-2">
                   <Play className="w-5 h-5" /> Try Demo
                 </button>
               )}
             </div>


           {/* CINEMATIC HERO PREVIEW */}
           <div className="w-full animate-scale-in" style={{animationDelay: '0.6s'}}>
             <CinematicHeroPreview />
           </div>
         </section>


        {/* ──────────────────────────────────────────────────────────
            FEATURES SECTION
        ────────────────────────────────────────────────────────── */}
        <section id="features" className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-text-main">Everything you need to launch your portfolio</h2>
            <p className="text-text-muted max-w-2xl mx-auto text-lg leading-relaxed">
              FolioAI combines AI intelligence with powerful publishing tools so you can go from resume to a live portfolio site in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "AI Resume Parsing",
                desc: "Upload a PDF, DOCX, or TXT resume and our agents extract your experience, skills, education, and contact details automatically.",
                icon: FileText
              },
              {
                title: "Smart Content Enhancement",
                desc: "Rewrites and refines descriptions for stronger impact, better structure, and clearer professional storytelling.",
                icon: Sparkles
              },
              {
                title: "Template Recommendation",
                desc: "Selects layouts and visual direction that match your industry, from minimal personal sites to bold creative portfolios.",
                icon: Layout
              },
              {
                title: "Live Portfolio Preview",
                desc: "See changes instantly across desktop, tablet, and mobile previews before you publish.",
                icon: MonitorSmartphone
              },
              {
                title: "Built-in SEO & Sharing",
                desc: "Auto-generates page titles, meta descriptions, keywords, and social-ready profile links to help you get discovered.",
                icon: Search
              },
              {
                title: "One-Click Deploy",
                desc: "Publish to your own free subdomain or connect a custom domain with SSL handled automatically.",
                icon: Rocket
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white border border-border-subtle rounded-2xl p-6 shadow-sm flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-text-main">{feature.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────
            AI AGENTS PIPELINE WORKFLOW
        ────────────────────────────────────────────────────────── */}
        <section id="workflow" className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-text-main">Intelligent Multi-Agent System</h2>
            <p className="text-text-muted max-w-2xl mx-auto text-lg leading-relaxed">
              Our architecture utilizes specialized AI agents working in tandem. 
              Watch as they parse, strategize, design, and deploy your portfolio in real-time.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Visual Workflow Line */}
            <div className="absolute left-[39px] top-[40px] bottom-[40px] w-0.5 bg-border-subtle hidden md:block"></div>

            <div className="flex flex-col gap-6">
              {[
                { 
                  title: "Resume Parser Agent", 
                  desc: "Extracts structured data, skills, and work history from unstructured PDFs or Word documents.", 
                  icon: FileText, 
                  status: "Completed", 
                  statusText: "Successfully parsed 42 data points",
                  color: "text-primary" 
                },
                { 
                  title: "Content Enhancement Agent", 
                  desc: "Rewrites and refines your descriptions for maximum professional impact using Gemini.", 
                  icon: Edit3, 
                  status: "Running", 
                  statusText: "Improving experience descriptions...",
                  color: "text-secondary" 
                },
                { 
                  title: "Portfolio Strategy Agent", 
                  desc: "Determines the optimal section ordering and content hierarchy based on your industry.", 
                  icon: Layout, 
                  status: "Running", 
                  statusText: "Structuring layouts...",
                  color: "text-success-main" 
                },
                { 
                  title: "Theme Recommendation Agent", 
                  desc: "Selects the perfect typography, spacing, and color palette to match your personal brand.", 
                  icon: Palette, 
                  status: "Waiting", 
                  statusText: "Pending design strategy",
                  color: "text-warning-main" 
                },
                { 
                  title: "Deployment Agent", 
                  desc: "Compiles the React application, provisions SSL, and deploys to our global edge network.", 
                  icon: Rocket, 
                  status: "Waiting", 
                  statusText: "Pending generation",
                  color: "text-primary" 
                }
              ].map((agent, i) => (
                 <div key={i} className="bg-white border border-border-subtle rounded-2xl p-6 flex items-start gap-6 relative group hover:shadow-md hover:-translate-y-1 transition-all">
                   
                  {/* Icon Node */}
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border z-10 bg-white
                    ${agent.status === 'Completed' ? 'border-green-200 text-green-600' : 
                      agent.status === 'Running' ? 'border-primary/20 text-primary' : 
                      'border-border-subtle text-text-muted'}`}
                   >
                    {agent.status === 'Completed' ? <CheckCircle2 className="w-7 h-7" /> :
                     agent.status === 'Running' ? <Loader2 className="w-7 h-7 animate-spin" /> :
                     <agent.icon className="w-7 h-7" />}
                   </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                      <h3 className="font-bold text-lg text-text-main">{agent.title}</h3>
                      
                      {/* Status Badge */}
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider w-fit
                        ${agent.status === 'Completed' ? 'bg-green-50 text-green-700' : 
                          agent.status === 'Running' ? 'bg-primary/10 text-primary-hover' : 
                          'bg-gray-100 text-gray-500'}`}
                      >
                        {agent.status === 'Completed' && <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>}
                        {agent.status === 'Running' && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>}
                        {agent.status}
                      </span>
                    </div>
                    
                    <p className="text-text-muted leading-relaxed mb-3">{agent.desc}</p>
                    
                      <div className="flex items-center gap-2 text-xs font-medium text-text-muted bg-gray-50 px-3 py-2 rounded-lg border border-border-subtle w-fit">
                      {agent.status === 'Running' ? <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" /> : <Bot className="w-3.5 h-3.5" />}
                      {agent.statusText}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ──────────────────────────────────────────────────────────
          FOOTER
      ────────────────────────────────────────────────────────── */}
      <footer id="about" className="bg-white border-t border-border-subtle pt-16 pb-8 mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            {/* Brand */}
            <div className="md:col-span-2 flex flex-col gap-4">
              <span className="font-bold text-2xl tracking-tight text-text-main flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">F</div>
                FolioAI
              </span>
              <p className="text-sm text-text-muted leading-relaxed max-w-sm">
                The enterprise-grade platform for generating, deploying, and managing professional AI-powered portfolios.
              </p>
              <div className="flex gap-4 mt-2">
                <span className="flex items-center gap-1.5 text-xs font-bold text-text-muted uppercase tracking-wider bg-gray-50 px-2.5 py-1 rounded-md border border-border-subtle">
                  Built with Google ADK
                </span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-text-muted uppercase tracking-wider bg-gray-50 px-2.5 py-1 rounded-md border border-border-subtle">
                  Powered by AI Agents
                </span>
              </div>
            </div>

            {/* Links 1 */}
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-text-main">Product</h4>
              <a href="#features" className="text-sm text-text-muted hover:text-text-main transition-colors">Features</a>
              <a href="#workflow" className="text-sm text-text-muted hover:text-text-main transition-colors">How It Works</a>

              <button onClick={() => onOpenPanel?.('about')} className="text-sm text-text-muted hover:text-text-main transition-colors text-left">About</button>
            </div>

            {/* Links 2 */}
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-text-main">Resources</h4>
              <button onClick={() => onOpenPanel?.('docs')} className="text-sm text-text-muted hover:text-text-main transition-colors text-left">Documentation</button>
              <button onClick={() => onOpenPanel?.('privacy')} className="text-sm text-text-muted hover:text-text-main transition-colors text-left">Privacy Policy</button>
               <button onClick={() => toast('info', 'Coming Soon', 'Terms of Service will be available shortly.')} className="text-sm text-text-muted hover:text-text-main transition-colors text-left">Terms of Service</button>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-sm text-text-muted hover:text-text-main transition-colors">GitHub Repository</a>
            </div>

          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border-subtle">
            <p className="text-sm text-text-muted">© 2026 Vector Minds. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <button onClick={() => onOpenPanel?.('privacy')} title="Privacy Policy" className="text-text-muted hover:text-text-main transition-colors"><Shield className="w-4 h-4" /></button>
              <button onClick={() => onOpenPanel?.('about')} title="About FolioAI" className="text-text-muted hover:text-text-main transition-colors"><Globe className="w-4 h-4" /></button>
              <a href="https://github.com" target="_blank" rel="noreferrer" title="GitHub" className="text-text-muted hover:text-text-main transition-colors"><Github className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
