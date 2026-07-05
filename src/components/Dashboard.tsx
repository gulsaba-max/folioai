/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Activity, Zap, Clock, TrendingUp, Cpu, Plus, Trash2, Edit3, ArrowRight, Sparkles, Layout, Palette,
  Settings, Type, CheckCircle, Database, HelpCircle, Shield,
  DollarSign, Globe, Code, ArrowUpRight, BarChart3, FileText, FolderKanban,
  MapPin, UserCheck, RefreshCw, Layers, ShieldCheck, CreditCard,
  User, Check, AlertTriangle, Eye, BookOpen, MessageSquare, Bot, UploadCloud, ChevronRight, LogOut
} from "lucide-react";
import LoadingScreen from "./LoadingScreen";
import { useToast } from "./Toast";
import AIAssistantModal from "./AIAssistantModal";
import TemplateGallery from "./TemplateGallery";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";

// Configure PDF.js worker using Vite's URL import
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.mjs?url";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

// ... Interfaces ...
interface Project { id: string; title: string; description: string; techStack: string[]; link?: string; }
interface Experience { id: string; role: string; company: string; startDate: string; endDate: string; description: string; }
interface Certification { id: string; name: string; issuer: string; date: string; link?: string; }
interface Education { id: string; school: string; degree: string; year: string; }
interface Portfolio {
  id: string; userId: string; slug: string; name: string; title: string; bio: string;
  contactEmail: string; contactPhone?: string; location?: string; skills: string[];
  projects: Project[]; experience: Experience[]; education: Education[]; certifications?: Certification[]; avatarUrl?: string;
  designSettings: {
    theme: 'minimal' | 'glass' | 'developer' | 'futuristic' | 'creative' | 'corporate' | 'startup' | 'cyberpunk' | 'agency' | 'luxury' | 'editorial' | 'engineer' | 'bento' | 'brutalist' | 'aurora' | 'atelier' | 'mono-lux' | 'vibrant' | 'architectural' | 'vintage-modern';
    mode: 'light' | 'dark'; colorPalette: string; fontSans: string; fontMono: string;
    showSocialFeed: boolean; layoutReorder: string[]; industry?: 'tech' | 'creative' | 'business' | 'writing';
  };
  socialLinks: { github?: string; linkedin?: string; twitter?: string; instagram?: string };
  customDomain?: string; seo: { metaTitle: string; metaDescription: string; keywords: string[] };
  socialFeedSelected: 'github' | 'twitter' | 'linkedin' | 'instagram' | 'none';
  contactSubmissions: Array<{ id: string, name: string, email: string, message: string, timestamp: string }>;
}

interface DashboardProps {
  user: any; activePortfolio: Portfolio | null; onUpdatePortfolio: (portfolio: Portfolio) => void;
  onPortfolioReady?: () => void; onLogout: () => void;
  activeTab?: string; onTabChange?: (tab: string) => void;
}

export default function Dashboard(props: DashboardProps) {
  const { user, activePortfolio, onUpdatePortfolio, onPortfolioReady, onLogout, activeTab: externalActiveTab, onTabChange } = props;
  const { toast } = useToast();
  const [internalTab, setInternalTab] = useState<string>('generate');

  const activeTab = externalActiveTab || internalTab;
  const setActiveTab = (tab: string) => {
    setInternalTab(tab);
    onTabChange?.(tab);
  };

  // Onboarding Preference Gatherer states
  const [gatherTheme, setGatherTheme] = useState<Portfolio['designSettings']['theme']>('minimal');
  const [gatherIndustry, setGatherIndustry] = useState<'tech' | 'creative' | 'business' | 'writing' | 'design' | 'finance' | 'healthcare' | 'education' | 'marketing' | 'legal'>('tech');
  const [gatherMode, setGatherMode] = useState<'light' | 'dark'>('dark');
  const [gatherPalette, setGatherPalette] = useState('indigo');
  const [gatherFontSans, setGatherFontSans] = useState('Inter');
  const [resumeText, setResumeText] = useState("");
  const [manualName, setManualName] = useState("");
  const [showTemplateGallery, setShowTemplateGallery] = useState(false);
  const [manualTitle, setManualTitle] = useState("");
  const [manualEmail, setManualEmail] = useState("");
  const [manualBio, setManualBio] = useState("");
  const [customPreferences, setCustomPreferences] = useState("");
  const [manualTab, setManualTab] = useState<'profile' | 'projects' | 'experience' | 'certifications'>('profile');
  const [manualProjects, setManualProjects] = useState<Project[]>([]);
  const [manualExperience, setManualExperience] = useState<Experience[]>([]);
  const [manualCertifications, setManualCertifications] = useState<Certification[]>([]);
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [creationMethod, setCreationMethod] = useState<'resume' | 'manual'>('resume');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map((item: any) => item.str).join(" ") + "\n";
        }
        setResumeText(text);
      } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.name.endsWith(".docx")) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        setResumeText(result.value);
        toast('success', 'Resume Parsed', 'Your DOCX resume has been extracted successfully.');
      } else {
        const text = await file.text();
        setResumeText(text);
        toast('success', 'Resume Loaded', 'Your resume text has been loaded.');
      }
    } catch (err: any) { toast('error', 'Upload Failed', `Could not parse the file: ${err.message}`); }
    finally { setIsUploading(false); e.target.value = ''; }
  };

  const [generating, setGenerating] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  const [connectDomainName, setConnectDomainName] = useState("");
  const [domainVerifying, setDomainVerifying] = useState(false);
  const [domainSteps, setDomainSteps] = useState<string[]>([]);
  const [domainStatus, setDomainStatus] = useState<string | null>(null);

  const [mfaActive, setMfaActive] = useState(user.mfaEnabled);
  const [mfaSecret, setMfaSecret] = useState(user.mfaCodeSecret);
  const [mfaLoading, setMfaLoading] = useState(false);

  const [metrics, setMetrics] = useState<any>({ pageViews: 0, socialClicks: 0, contactForms: 0 });
  const [countries, setCountries] = useState<any[]>([]);
  const [browsers, setBrowsers] = useState<any[]>([]);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [metricsLoading, setMetricsLoading] = useState(false);

  const [activeTier, setActiveTier] = useState<'free' | 'premium' | 'ultimate'>(user.subscriptionTier || 'free');
  const [billingLoading, setBillingLoading] = useState(false);
  const [billingLogs, setBillingLogs] = useState<any[]>(user.billingHistory || []);




  const fetchAnalytics = async () => {
    if (!activePortfolio?.id) return;
    setMetricsLoading(true);
    try {
      const response = await fetch(`/api/analytics/${activePortfolio.id}`);
      const data = await response.json();
      if (response.ok) {
        setMetrics(data.metrics || { pageViews: 0, socialClicks: 0, contactForms: 0 });
        setCountries(data.countries || []); setBrowsers(data.browsers || []); setTimeline(data.timeline || []);
      }
    } catch (err) { console.warn("Analytics retrieval error", err); }
    finally { setMetricsLoading(false); }
  };

  useEffect(() => { if (activeTab === 'analytics' && activePortfolio?.id) { fetchAnalytics(); } }, [activeTab, activePortfolio?.id]);

  const handleGeneratePortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    let payload: any = { preferencesText: `Theme: ${gatherTheme}, Industry: ${gatherIndustry}, Mode: ${gatherMode}, Palette: ${gatherPalette}, FontSans: ${gatherFontSans}. Other details: ${customPreferences}` };

    if (creationMethod === 'resume') {
      if (!resumeText.trim()) { toast('warning', 'Resume missing', 'Please paste resume text to continue parsing.'); setGenerating(false); return; }
      payload.resumeText = resumeText;
      if (avatarUrl) payload.manualData = { avatarUrl };
    } else {
      payload.manualData = {
        name: manualName || "Anonymous Creator",
        title: manualTitle || "Software Engineer",
        bio: manualBio || "Full-stack engineer crafting durable and performant cloud web systems.",
        contactEmail: manualEmail || user.email || "johndoe@example.com",
        avatarUrl: avatarUrl || undefined,
        skills: ["React", "TypeScript", "Node.js", "Express", "Tailwind CSS"],
        projects: manualProjects.length > 0 ? manualProjects : [{ id: "man_1", title: "Portfolio Project", description: "A professional project showcasing my skills.", techStack: ["React", "TypeScript"] }],
        experience: manualExperience.length > 0 ? manualExperience : [],
        certifications: manualCertifications.length > 0 ? manualCertifications : [],
        education: []
      };
    }

    try {
      const response = await fetch("/api/generate-portfolio", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Generation model failed");
      const generatedPort: Portfolio = {
        ...data, id: activePortfolio?.id || `port_${Date.now()}`, userId: user.id || "guest",
        slug: data.name.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Date.now().toString().slice(-4),
        socialLinks: activePortfolio?.socialLinks || { github: "", linkedin: "", twitter: "" },
        socialFeedSelected: activePortfolio?.socialFeedSelected || "none", contactSubmissions: activePortfolio?.contactSubmissions || [],
        designSettings: { ...data.designSettings, theme: gatherTheme, mode: gatherMode, colorPalette: gatherPalette, fontSans: gatherFontSans, industry: gatherIndustry }
      };
      onUpdatePortfolio(generatedPort);
      setGenerationComplete(true);
      // Wait for user to click "View Portfolio" in Mission Control to set activeTab and onPortfolioReady
    } catch (err: any) {
      setGenerating(false);
      const msg = err.message || "";
      if (msg.includes("429") || msg.includes("quota") || msg.includes("RESOURCE_EXHAUSTED")) {
        setSaveStatus("âš ï¸ API Quota Exceeded. Try again later.");
        setTimeout(() => setSaveStatus(null), 5000);
      } else { setSaveStatus(`Generation failed: ${msg}`); setTimeout(() => setSaveStatus(null), 5000); }
    }
  };

  const handleFinishGeneration = () => {
    console.log('[dashboard] handleFinishGeneration', { generating, generationComplete, activeTab, activePortfolio: !!activePortfolio });
    setGenerating(false);
    setGenerationComplete(false);
    setActiveTab('dashboard');
    onPortfolioReady?.();
    console.log('[dashboard] after handleFinishGeneration scheduled');
  };

  const handleSavePortfolio = async () => {
    if (!activePortfolio) return;
    setSaving(true); setSaveStatus("Publishing changes...");
    try {
      const response = await fetch("/api/portfolio/save", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ portfolio: activePortfolio }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Save operation failed");
      onUpdatePortfolio(data.portfolio);
      setSaveStatus("Successfully published.");
      setTimeout(() => setSaveStatus(null), 4000);
    } catch (err: any) { setSaveStatus(`Save failed: ${err.message}`); }
    finally { setSaving(false); }
  };

  const handleOrderUp = (idx: number) => {
    if (!activePortfolio || idx <= 0) return;
    const reorder = [...(activePortfolio.designSettings?.layoutReorder || ["hero", "about", "skills", "projects", "experience", "education", "social-feed", "contact"])];
    const temp = reorder[idx]; reorder[idx] = reorder[idx - 1]; reorder[idx - 1] = temp;
    onUpdatePortfolio({ ...activePortfolio, designSettings: { ...activePortfolio.designSettings, layoutReorder: reorder } });
  };

  const handleOrderDown = (idx: number) => {
    if (!activePortfolio) return;
    const reorder = [...(activePortfolio.designSettings?.layoutReorder || ["hero", "about", "skills", "projects", "experience", "education", "social-feed", "contact"])];
    if (idx >= reorder.length - 1) return;
    const temp = reorder[idx]; reorder[idx] = reorder[idx + 1]; reorder[idx + 1] = temp;
    onUpdatePortfolio({ ...activePortfolio, designSettings: { ...activePortfolio.designSettings, layoutReorder: reorder } });
  };

  const handleToggleMFA = async (enable: boolean) => {
    setMfaLoading(true);
    try {
      const response = await fetch("/api/auth/mfa-toggle", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: user.id, enabled: enable }) });
      const data = await response.json();
      if (response.ok) { setMfaActive(enable); setMfaSecret(data.user.mfaCodeSecret); }
    } catch (err: any) { toast('error', 'Update Failed', 'Could not update multi-factor profile'); }
    finally { setMfaLoading(false); }
  };

  const handleConnectDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connectDomainName || !connectDomainName.includes(".")) { toast('error', 'Invalid Domain', 'Enter a correct domain names string (example: domain.com)'); return; }
    setDomainVerifying(true); setDomainStatus("Resolving DNS target tags..."); setDomainSteps([]);
    try {
      const response = await fetch("/api/domain/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ domain: connectDomainName, portfolioId: activePortfolio?.id || "temporary" }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      for (let i = 0; i < data.steps.length; i++) {
        await new Promise(r => setTimeout(r, 1000));
        setDomainSteps(prev => [...prev, data.steps[i]]);
      }
      setDomainStatus("verified");
      if (activePortfolio) { onUpdatePortfolio({ ...activePortfolio, customDomain: connectDomainName }); }
    } catch (err: any) { setDomainStatus("failed"); toast('error', 'Connection Failed', err.message); }
    finally { setDomainVerifying(false); }
  };

  const handleUpgradeTier = async (tier: 'free' | 'premium' | 'ultimate') => {
    setBillingLoading(true);
    try {
      const response = await fetch("/api/billing/upgrade", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: user.id, tier }) });
      const data = await response.json();
      if (response.ok) { setActiveTier(tier); setBillingLogs(data.user.billingHistory); toast('success', 'Upgrade Successful', `Premium Upgrade simulated! Active Tier is now ${tier.toUpperCase()}.`); }
    } catch (err) { toast('error', 'Upgrade Failed', 'Billing simulation channel declined'); }
    finally { setBillingLoading(false); }
  };

  // Shared Animation Variants
  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
  const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

  return (
    <div className="min-h-screen bg-bg-base text-text-main font-sans">
      <main className="relative overflow-y-auto bg-bg-base">
        <div className="max-w-5xl mx-auto px-6 py-10 min-h-screen">

          {saveStatus && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-8 p-4 bg-white border border-border-subtle rounded-2xl flex items-center text-sm text-success-main shadow-sm">
              <CheckCircle className="w-5 h-5 mr-3" /> {saveStatus}
            </motion.div>
          )}

          {(generating || generationComplete) && (
            <LoadingScreen
              isFinished={generationComplete}
              onView={handleFinishGeneration}
              onDownload={handleFinishGeneration}
              onDeploy={handleFinishGeneration}
              onCreateAnother={() => {
                setGenerating(false);
                setGenerationComplete(false);
              }}
              accentColor={gatherPalette}
            />
          )}

          <AnimatePresence mode="wait">
            {activeTab === 'generate' && (
              <motion.div key="onboarding" variants={stagger} initial="hidden" animate="visible" className="space-y-12">
                {/* Hero Section */}
                <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-16">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
                    <Sparkles className="w-3.5 h-3.5" /> FolioAI Engine 2.0
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-main mb-6">
                    Craft your perfect portfolio in seconds.
                  </h1>
                  <p className="text-lg text-text-muted leading-relaxed">
                    Upload your resume, select a premium template, and let AI generate a stunning, professional website tailored to your exact career profile.
                  </p>
                </motion.div>

                <form onSubmit={handleGeneratePortfolio} className="space-y-12 max-w-4xl mx-auto">

                  {/* Step 1: Input Method */}
                  <motion.div variants={fadeUp} className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-border-accent text-sm font-medium text-text-main">1</div>
                      <h2 className="text-xl font-semibold text-text-main">Content Source</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-12">
                      <CardSelector active={creationMethod === 'resume'} onClick={() => setCreationMethod('resume')} icon={FileText} title="Upload Resume" desc="We'll extract your skills and experience automatically." />
                      <CardSelector active={creationMethod === 'manual'} onClick={() => setCreationMethod('manual')} icon={Code} title="Manual Input" desc="Write your own content step by step." />
                    </div>

                    <div className="pl-12">
                      {creationMethod === 'resume' ? (
                        <div className="space-y-4 mt-6">
                          <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white border border-border-subtle rounded-3xl shadow-sm">
                            <div className="w-24 h-24 rounded-full bg-white border-2 border-dashed border-border-subtle flex items-center justify-center relative group overflow-hidden shrink-0">
                              {avatarUrl ? (
                                <img src={avatarUrl} alt="Avatar preview" className="w-full h-full object-cover" />
                              ) : (
                                <User className="w-10 h-10 text-text-muted" />
                              )}
                              <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <span className="text-white text-xs font-medium">Upload</span>
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    const url = URL.createObjectURL(e.target.files[0]);
                                    setAvatarUrl(url);
                                    toast('success', 'Photo Uploaded', 'Your profile picture has been added.');
                                  }
                                }} />
                              </label>
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                              <p className="text-sm font-medium text-text-main mb-1">Profile Picture (Optional)</p>
                              <p className="text-xs text-text-muted">Upload a professional headshot. This will be used as your portfolio avatar.</p>
                              {avatarUrl && (
                                <button type="button" onClick={() => setAvatarUrl('')} className="text-xs font-medium text-red-500 hover:text-red-600 mt-2">Remove Photo</button>
                              )}
                            </div>
                          </div>
                          <div className="relative group/upload">
                            <input type="file" accept=".txt,.md,.rtf,.json,.pdf,.docx" onChange={handleFileUpload} disabled={isUploading} className={`absolute inset-0 w-full h-full opacity-0 z-10 ${isUploading ? 'cursor-not-allowed' : 'cursor-pointer'}`} />
                            <div className={`w-full flex flex-col items-center justify-center gap-3 py-10 px-6 border-2 border-dashed rounded-3xl transition-all duration-300 ${isUploading ? 'border-primary bg-primary/5 text-primary' : 'border-border-subtle bg-white text-text-muted hover:border-border-accent hover:bg-gray-50'}`}>
                              {isUploading ? (
                                <><RefreshCw className="w-8 h-8 animate-spin mb-2" /><span className="text-sm font-medium text-text-main">Parsing document...</span></>
                              ) : (
                                <><div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover/upload:bg-gray-100 transition-colors"><UploadCloud className="w-6 h-6 text-text-main" /></div><span className="text-sm font-medium text-text-main">Drag & drop your resume</span><span className="text-xs text-text-muted">Supports PDF, DOCX, TXT</span></>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-4 py-2">
                            <div className="flex-1 h-px bg-border-subtle" /><span className="text-xs text-text-muted font-medium uppercase tracking-wider">Or Paste</span><div className="flex-1 h-px bg-border-subtle" />
                          </div>
                          <textarea rows={6} value={resumeText} onChange={(e) => setResumeText(e.target.value)} placeholder="Paste your resume text here..." className="w-full p-5 bg-white border border-border-subtle focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl text-sm text-text-main placeholder:text-text-muted/50 outline-none transition-all resize-none" />
                        </div>
                      ) : (
                        <div className="mt-6 bg-white border border-border-subtle rounded-3xl shadow-sm overflow-hidden">
                          <div className="flex border-b border-border-subtle overflow-x-auto">
                            {[
                              { id: 'profile', label: 'Profile' },
                              { id: 'projects', label: 'Projects' },
                              { id: 'experience', label: 'Experience' },
                              { id: 'certifications', label: 'Certifications' }
                            ].map(tab => (
                              <button
                                key={tab.id}
                                type="button"
                                onClick={() => setManualTab(tab.id as any)}
                                className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${manualTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text-main hover:bg-gray-50'}`}
                              >
                                {tab.label}
                              </button>
                            ))}
                          </div>

                          <div className="p-6">
                            {manualTab === 'profile' && (
                              <div className="space-y-5">
                                <div className="flex items-center gap-6 mb-4">
                                  <div className="w-20 h-20 rounded-full bg-gray-100 border border-border-subtle overflow-hidden flex items-center justify-center shrink-0 relative group">
                                    {avatarUrl ? (
                                      <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                      <User className="w-8 h-8 text-text-muted" />
                                    )}
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                      <label className="cursor-pointer text-white text-xs font-medium">
                                        Upload
                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                                          if (e.target.files && e.target.files[0]) {
                                            const url = URL.createObjectURL(e.target.files[0]);
                                            setAvatarUrl(url);
                                          }
                                        }} />
                                      </label>
                                    </div>
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="text-sm font-medium text-text-main">Profile Picture</h4>
                                    <p className="text-xs text-text-muted">Upload a professional headshot.</p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                  <PremiumInput label="Full Name" value={manualName} onChange={(e) => setManualName(e.target.value)} placeholder="John Doe" />
                                  <PremiumInput label="Headline" value={manualTitle} onChange={(e) => setManualTitle(e.target.value)} placeholder="Senior Software Engineer" />
                                </div>
                                <PremiumInput label="Contact Email" type="email" value={manualEmail} onChange={(e) => setManualEmail(e.target.value)} placeholder="hello@example.com" />
                                <div className="space-y-1.5">
                                  <label className="text-xs font-medium text-text-muted">Short Bio</label>
                                  <textarea rows={3} value={manualBio} onChange={(e) => setManualBio(e.target.value)} placeholder="I build fast, scalable applications..." className="w-full p-4 bg-gray-50 border border-border-subtle focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl text-sm text-text-main outline-none transition-all resize-none" />
                                </div>
                              </div>
                            )}

                             {manualTab === 'projects' && (
                               <div className="space-y-4">
                                 {manualProjects.map((proj, idx) => (
                                   <div key={proj.id || idx} className="p-4 border border-border-subtle rounded-xl relative group space-y-3">
                                     <button type="button" onClick={() => setManualProjects(prev => prev.filter((_, i) => i !== idx))} className="absolute top-2 right-2 p-1.5 text-red-500 hover:bg-red-50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                                       <Trash2 className="w-4 h-4" />
                                     </button>
                                     <div className="grid grid-cols-1 gap-3">
                                       <input type="text" value={proj.title} onChange={(e) => setManualProjects(prev => prev.map((p, i) => i === idx ? { ...p, title: e.target.value } : p))} placeholder="Project title" className="w-full px-3 py-2 text-sm border border-border-subtle rounded-lg bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none" />
                                       <textarea value={proj.description} onChange={(e) => setManualProjects(prev => prev.map((p, i) => i === idx ? { ...p, description: e.target.value } : p))} placeholder="Description" rows={3} className="w-full px-3 py-2 text-sm border border-border-subtle rounded-lg bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none resize-none" />
                                       <input type="text" value={(proj.techStack || []).join(", ")} onChange={(e) => setManualProjects(prev => prev.map((p, i) => i === idx ? { ...p, techStack: e.target.value.split(",").map(t => t.trim()).filter(Boolean) } : p))} placeholder="Tech stack (comma separated)" className="w-full px-3 py-2 text-sm border border-border-subtle rounded-lg bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none" />
                                     </div>
                                   </div>
                                 ))}
                                 <button type="button" onClick={() => setManualProjects([...manualProjects, { id: `proj_${Date.now()}`, title: '', description: '', techStack: [] }])} className="w-full py-4 border-2 border-dashed border-border-subtle rounded-xl text-sm font-medium text-text-muted hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
                                   <Plus className="w-4 h-4" /> Add Project
                                 </button>
                               </div>
                             )}

                            {manualTab === 'experience' && (
                              <div className="space-y-4">
                                {manualExperience.map((exp, idx) => (
                                  <div key={idx} className="p-4 border border-border-subtle rounded-xl relative group">
                                    <button type="button" onClick={() => setManualExperience(prev => prev.filter((_, i) => i !== idx))} className="absolute top-2 right-2 p-1.5 text-red-500 hover:bg-red-50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                    <h4 className="font-medium text-sm mb-1">{exp.role || "Role"} at {exp.company || "Company"}</h4>
                                    <p className="text-xs text-text-muted">{exp.startDate} - {exp.endDate}</p>
                                  </div>
                                ))}
                                <button type="button" onClick={() => setManualExperience([...manualExperience, { id: `exp_${Date.now()}`, role: '', company: '', startDate: '', endDate: '', description: '' }])} className="w-full py-4 border-2 border-dashed border-border-subtle rounded-xl text-sm font-medium text-text-muted hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
                                  <Plus className="w-4 h-4" /> Add Experience
                                </button>
                              </div>
                            )}

                            {manualTab === 'certifications' && (
                              <div className="space-y-4">
                                {manualCertifications.map((cert, idx) => (
                                  <div key={idx} className="p-4 border border-border-subtle rounded-xl relative group">
                                    <button type="button" onClick={() => setManualCertifications(prev => prev.filter((_, i) => i !== idx))} className="absolute top-2 right-2 p-1.5 text-red-500 hover:bg-red-50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                    <h4 className="font-medium text-sm mb-1">{cert.name || "Certification Name"}</h4>
                                    <p className="text-xs text-text-muted">{cert.issuer} â€¢ {cert.date}</p>
                                  </div>
                                ))}
                                <button type="button" onClick={() => setManualCertifications([...manualCertifications, { id: `cert_${Date.now()}`, name: '', issuer: '', date: '' }])} className="w-full py-4 border-2 border-dashed border-border-subtle rounded-xl text-sm font-medium text-text-muted hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
                                  <Plus className="w-4 h-4" /> Add Certification
                                </button>
                              </div>
                            )}

                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Step 2: Theme Selection */}
                  <motion.div variants={fadeUp} className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-border-accent text-sm font-medium text-text-main">2</div>
                      <h2 className="text-xl font-semibold text-text-main">Design & Aesthetics</h2>
                    </div>

                    <div className="pl-12 space-y-8">
                      {/* Visual Theme Selection */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-text-main">Select Template Theme</label>
                          <button type="button" onClick={() => setShowTemplateGallery(true)} className="text-xs font-medium text-primary hover:underline">Open Template Gallery</button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                          {(['minimal', 'glass', 'developer', 'futuristic', 'creative', 'corporate', 'startup', 'cyberpunk', 'agency', 'luxury', 'editorial', 'engineer', 'bento', 'brutalist', 'aurora', 'atelier', 'mono-lux', 'vibrant', 'architectural', 'vintage-modern'] as const).map(theme => (
                            <ThemePreviewCard key={theme} theme={theme} active={gatherTheme === theme} onClick={() => setGatherTheme(theme)} />
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <label className="text-sm font-medium text-text-main">Color Palette</label>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { name: 'indigo', hex: '#6366F1' },
                              { name: 'violet', hex: '#7C3AED' },
                              { name: 'sky', hex: '#0EA5E9' },
                              { name: 'cyan', hex: '#06B6D4' },
                              { name: 'teal', hex: '#14B8A6' },
                              { name: 'emerald', hex: '#10B981' },
                              { name: 'green', hex: '#22C55E' },
                              { name: 'lime', hex: '#84CC16' },
                              { name: 'amber', hex: '#F59E0B' },
                              { name: 'orange', hex: '#F97316' },
                              { name: 'red', hex: '#EF4444' },
                              { name: 'rose', hex: '#F43F5E' },
                              { name: 'pink', hex: '#EC4899' },
                              { name: 'fuchsia', hex: '#D946EF' },
                              { name: 'slate', hex: '#64748B' },
                              { name: 'zinc', hex: '#71717A' },
                            ].map(({ name, hex }) => (
                              <button
                                key={name}
                                type="button"
                                onClick={() => setGatherPalette(name)}
                                title={name.charAt(0).toUpperCase() + name.slice(1)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${gatherPalette === name
                                    ? 'border-primary bg-primary/5 text-primary shadow-sm'
                                    : 'border-border-subtle bg-white text-text-muted hover:bg-gray-50 '
                                  }`}
                              >
                                <span className="w-3.5 h-3.5 rounded-full flex-shrink-0 ring-1 ring-black/10" style={{ backgroundColor: hex }} />
                                <span className="capitalize">{name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-4">
                          <label className="text-sm font-medium text-text-main">Typography</label>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { name: 'Inter', style: 'font-sans' },
                              { name: 'Sora', style: 'font-heading' },
                              { name: 'Geist', style: 'font-mono' },
                              { name: 'Plus Jakarta Sans', style: 'font-sans' },
                              { name: 'Manrope', style: 'font-sans' },
                              { name: 'DM Sans', style: 'font-sans' },
                              { name: 'Outfit', style: 'font-sans' },
                              { name: 'Raleway', style: 'font-sans' },
                              { name: 'Nunito', style: 'font-sans' },
                              { name: 'Poppins', style: 'font-sans' },
                            ].map(({ name }) => (
                              <button
                                key={name}
                                type="button"
                                onClick={() => setGatherFontSans(name)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${gatherFontSans === name
                                    ? 'border-primary bg-primary/5 text-primary shadow-sm'
                                    : 'bg-white border-border-subtle text-text-muted hover:bg-gray-50'
                                  }`}
                              >
                                {name}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <label className="text-sm font-medium text-text-main">Appearance</label>
                          <div className="flex gap-4">
                            {(['dark', 'light'] as const).map(mode => (
                              <button key={mode} type="button" onClick={() => setGatherMode(mode)} className={`flex-1 py-3 rounded-2xl text-sm font-medium capitalize transition-all border ${gatherMode === mode ? 'border-primary text-primary bg-primary/5' : 'border-border-subtle text-text-muted bg-white hover:bg-gray-50'
                                }`}>
                                 {mode === 'dark' ? '🌙 Dark' : '☀️ Light'}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-4">
                          <label className="text-sm font-medium text-text-main">Industry Profile</label>
                          <div className="grid grid-cols-2 gap-2">
                            {([
                              { id: 'tech', label: 'Technology', icon: 'ðŸ’»' },
                              { id: 'creative', label: 'Creative', icon: 'ðŸŽ¨' },
                              { id: 'business', label: 'Business', icon: 'ðŸ“Š' },
                              { id: 'writing', label: 'Writing', icon: 'âœï¸' },
                              { id: 'design', label: 'Design', icon: 'ðŸ–Œï¸' },
                              { id: 'finance', label: 'Finance', icon: 'ðŸ’°' },
                              { id: 'healthcare', label: 'Healthcare', icon: 'ðŸ¥' },
                              { id: 'education', label: 'Education', icon: 'ðŸ“š' },
                              { id: 'marketing', label: 'Marketing', icon: 'ðŸ“£' },
                              { id: 'legal', label: 'Legal', icon: 'âš–ï¸' },
                            ] as const).map(({ id, label, icon }) => (
                              <button
                                key={id}
                                type="button"
                                onClick={() => setGatherIndustry(id as any)}
                                className={`flex items-center gap-2 py-2 px-3 rounded-xl text-xs font-medium transition-all border ${gatherIndustry === id
                                    ? 'border-primary bg-primary/5 text-primary'
                                    : 'border-border-subtle bg-white text-text-muted hover:bg-gray-50 '
                                  }`}
                              >
                                <span>{icon}</span>
                                <span>{label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-4 border-t border-border-subtle/50">
                        <label className="text-sm font-medium text-text-main">Custom Directives (Optional)</label>
                        <p className="text-xs text-text-muted mb-2">Guide the AI with specific instructions for your layout.</p>
                        <PremiumInput value={customPreferences} onChange={(e) => setCustomPreferences(e.target.value)} placeholder="e.g. Focus heavily on my open source contributions." />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeUp} className="pt-8 pl-12 border-t border-border-subtle/50">
                    <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit" disabled={generating} className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-primary-hover text-text-main font-medium text-lg flex items-center justify-center gap-3 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 disabled:opacity-70">
                      {generating ? (<><RefreshCw className="w-5 h-5 animate-spin" /> Synthesizing Portfolio...</>) : (<><Sparkles className="w-5 h-5" /> Generate Portfolio</>)}
                    </motion.button>
                  </motion.div>

                </form>
              </motion.div>
            )}

            {activeTab === 'dashboard' && (
              <motion.div key="editor" variants={stagger} initial="hidden" animate="visible" className="space-y-10">
                {!activePortfolio ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
                    <h2 className="text-2xl font-bold text-text-main mb-3">No Portfolios Yet</h2>
                    <p className="text-text-muted max-w-md mb-8">You need to generate a portfolio before you can edit its content and settings.</p>
                    <button onClick={() => setActiveTab('generate')} className="btn-primary flex items-center gap-2"><Plus className="w-5 h-5" /> Create Your First Portfolio</button>
                  </div>
                ) : (
                  <>
                    <motion.div variants={fadeUp} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                      <div>
                        <h1 className="text-3xl font-bold tracking-tight text-text-main mb-1">Editor</h1>
                        <p className="text-text-muted text-sm">Customize your portfolio structure, content, and metadata.</p>
                      </div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setAiAssistantOpen(true)} className="btn-secondary text-sm px-4 py-2 flex items-center gap-2">
                          <Bot className="w-4 h-4" /> Ask AI
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { const url = `${window.location.origin}/p/${activePortfolio.slug}`; navigator.clipboard.writeText(url); toast('success', 'Link Copied!', 'Portfolio URL has been copied to clipboard.'); }} className="btn-secondary text-sm px-4 py-2 flex items-center gap-2">
                          <Globe className="w-4 h-4" /> Copy Link
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSavePortfolio} disabled={saving} className="btn-primary text-sm px-4 py-2 flex items-center gap-2">
                          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ArrowUpRight className="w-4 h-4" />}
                          {saving ? 'Saving...' : 'Publish'}
                        </motion.button>
                      </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Section Ordering */}
                      <motion.div variants={fadeUp} className="p-6 bg-white border border-border-subtle rounded-3xl shadow-sm space-y-6">
                        <div>
                          <h3 className="text-base font-semibold text-text-main mb-1 flex items-center gap-2"><Layers className="w-4 h-4 text-text-muted" /> Layout Order</h3>
                          <p className="text-xs text-text-muted">Reorder sections on your live site.</p>
                        </div>
                        <div className="space-y-3">
                          {(activePortfolio.designSettings?.layoutReorder || ["hero", "about", "skills", "projects", "experience", "education", "contact"]).map((section, idx) => (
                            <div key={section} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-border-subtle hover:border-border-accent transition-colors group">
                              <span className="text-sm font-medium capitalize text-text-main">{section.replace("-", " ")}</span>
                              <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleOrderUp(idx)} disabled={idx === 0} className="p-1.5 bg-white rounded hover:text-text-main disabled:opacity-30"><ChevronRight className="w-3.5 h-3.5 -rotate-90" /></button>
                                <button onClick={() => handleOrderDown(idx)} disabled={idx === (activePortfolio.designSettings?.layoutReorder?.length || 7) - 1} className="p-1.5 bg-white rounded hover:text-text-main disabled:opacity-30"><ChevronRight className="w-3.5 h-3.5 rotate-90" /></button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Settings Form */}
                      <motion.div variants={fadeUp} className="lg:col-span-2 space-y-8">
                        <div className="p-8 bg-white border border-border-subtle rounded-3xl shadow-sm space-y-6">
                          <h3 className="text-base font-semibold text-text-main flex items-center gap-2"><Edit3 className="w-4 h-4 text-text-muted" /> Content</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <PremiumInput label="Headline Title" value={activePortfolio.title} onChange={(e) => onUpdatePortfolio({ ...activePortfolio, title: e.target.value })} />
                            <PremiumInput label="Location" value={activePortfolio.location || ""} onChange={(e) => onUpdatePortfolio({ ...activePortfolio, location: e.target.value })} />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-text-muted">Bio</label>
                            <textarea rows={4} value={activePortfolio.bio} onChange={(e) => onUpdatePortfolio({ ...activePortfolio, bio: e.target.value })} className="w-full p-4 bg-gray-50 border border-border-subtle focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl text-sm text-text-main outline-none resize-none" />
                          </div>
                          <div className="pt-4 border-t border-border-subtle">
                            <h4 className="text-sm font-medium text-text-main mb-4">Social Links</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                              <PremiumInput label="LinkedIn" value={activePortfolio.socialLinks?.linkedin || ""} onChange={(e) => onUpdatePortfolio({ ...activePortfolio, socialLinks: { ...activePortfolio.socialLinks, linkedin: e.target.value } })} />
                              <PremiumInput label="GitHub" value={activePortfolio.socialLinks?.github || ""} onChange={(e) => onUpdatePortfolio({ ...activePortfolio, socialLinks: { ...activePortfolio.socialLinks, github: e.target.value } })} />
                            </div>
                          </div>
                        </div>

                        <div className="p-8 bg-white border border-border-subtle rounded-3xl shadow-sm space-y-6">
                          <h3 className="text-base font-semibold text-text-main flex items-center gap-2"><Settings className="w-4 h-4 text-text-muted" /> SEO Optimization</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <PremiumInput label="Meta Title" value={activePortfolio.seo?.metaTitle || ""} onChange={(e) => onUpdatePortfolio({ ...activePortfolio, seo: { ...activePortfolio.seo, metaTitle: e.target.value } })} />
                            <PremiumInput label="Keywords (comma separated)" value={Array.isArray(activePortfolio.seo?.keywords) ? activePortfolio.seo.keywords.join(", ") : (activePortfolio.seo?.keywords || "")} onChange={(e) => onUpdatePortfolio({ ...activePortfolio, seo: { ...activePortfolio.seo, keywords: e.target.value.split(",").map(k => k.trim()) } })} />
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </>
                )}
              </motion.div>
            )}


            {activeTab === 'portfolios' && (
              <motion.div key="portfolios" variants={stagger} initial="hidden" animate="visible" className="space-y-10">
                {!activePortfolio ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
                    <h2 className="text-2xl font-bold text-text-main mb-3">No Portfolios Yet</h2>
                    <p className="text-text-muted max-w-md mb-8">You didn't create anything yet. Generate a portfolio to see it here.</p>
                    <button onClick={() => setActiveTab('generate')} className="btn-primary flex items-center gap-2"><Plus className="w-5 h-5" /> Create Your First Portfolio</button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h1 className="text-3xl font-bold tracking-tight text-text-main mb-1">My Portfolios</h1>
                        <p className="text-text-muted text-sm">Manage and preview your generated portfolios.</p>
                      </div>
                      <button onClick={() => setActiveTab('generate')} className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" />New Portfolio</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white border border-border-subtle rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 hover:scale-[1.01] cursor-pointer p-6 space-y-4 group">
                        <div className="w-full h-40 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl border border-border-subtle flex items-center justify-center overflow-hidden">
                          <Layout className="w-12 h-12 text-primary/40" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-text-main">{activePortfolio.name}</h3>
                          <p className="text-sm text-text-muted capitalize">{activePortfolio.designSettings?.theme} theme Â· {activePortfolio.designSettings?.mode} mode</p>
                        </div>
                        <div className="flex gap-2 pt-2 border-t border-border-subtle">
                          <button onClick={() => setActiveTab('dashboard')} className="btn-secondary flex-1 flex items-center justify-center gap-1.5 text-sm py-2 px-3"><Edit3 className="w-3.5 h-3.5" />Edit</button>
                          <button onClick={() => { const url = `${window.location.origin}/p/${activePortfolio.slug}`; navigator.clipboard.writeText(url); toast('success', 'Link Copied!', 'Portfolio URL copied to clipboard.'); }} className="btn-secondary flex-1 flex items-center justify-center gap-1.5 text-sm py-2 px-3"><Globe className="w-3.5 h-3.5" />Copy Link</button>
                          <button onClick={() => handleSavePortfolio()} className="btn-primary flex-1 flex items-center justify-center gap-1.5 text-sm py-2 px-3"><ArrowUpRight className="w-3.5 h-3.5" />Publish</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'templates' && (
              <motion.div key="templates" variants={stagger} initial="hidden" animate="visible" className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-text-main mb-2">Templates</h1>
                  <p className="text-text-muted">Choose a premium template for your portfolio. Click to apply instantly.</p>
                </div>
                {!activePortfolio ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <h2 className="text-xl font-bold text-text-main mb-3">Generate a portfolio first</h2>
                    <p className="text-text-muted max-w-md mb-6">You need an active portfolio to apply templates.</p>
                    <button onClick={() => setActiveTab('generate')} className="btn-primary flex items-center gap-2"><Sparkles className="w-4 h-4" />Generate Portfolio</button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(['minimal', 'glass', 'developer', 'futuristic', 'creative', 'corporate', 'startup', 'cyberpunk', 'agency', 'luxury', 'editorial', 'engineer', 'bento', 'brutalist', 'aurora', 'atelier', 'mono-lux', 'vibrant', 'architectural', 'vintage-modern'] as const).map(themeId => {
                      const isActive = activePortfolio.designSettings?.theme === themeId;
                      const themeLabels: Record<string, string> = {
                        minimal: 'Minimal Luxury', glass: 'Glassmorphism', developer: 'Developer',
                        futuristic: 'AI Futuristic', creative: 'Creative Designer', corporate: 'Corporate',
                        startup: 'Startup Founder', cyberpunk: 'Cyberpunk', agency: 'Agency Pro', luxury: 'Luxury Dark',
                        editorial: 'Editorial', engineer: 'Engineer', bento: 'Bento', brutalist: 'Brutalist',
                        aurora: 'Aurora', atelier: 'Atelier', 'mono-lux': 'Mono Lux', vibrant: 'Vibrant',
                        architectural: 'Architectural', 'vintage-modern': 'Vintage Modern'
                      };
                      const themeBgs: Record<string, string> = {
                        minimal: 'bg-white', glass: 'bg-slate-900', developer: 'bg-gray-950',
                        futuristic: 'bg-indigo-950', creative: 'bg-orange-50', corporate: 'bg-blue-50',
                        startup: 'bg-zinc-900', cyberpunk: 'bg-purple-950', agency: 'bg-black', luxury: 'bg-stone-900',
                        editorial: 'bg-amber-50', engineer: 'bg-gray-950', bento: 'bg-slate-50', brutalist: 'bg-white',
                        aurora: 'bg-indigo-950', atelier: 'bg-orange-50', 'mono-lux': 'bg-white', vibrant: 'bg-fuchsia-50',
                        architectural: 'bg-slate-100', 'vintage-modern': 'bg-amber-50'
                      };
                      return (
                        <motion.div
                          key={themeId}
                          whileHover={{ y: -4, scale: 1.02 }}
                          className={`bg-white border border-border-subtle rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 hover:scale-[1.01] overflow-hidden transition-all duration-300 ${isActive ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                          onClick={() => {
                            onUpdatePortfolio({ ...activePortfolio, designSettings: { ...activePortfolio.designSettings, theme: themeId } });
                            toast('success', 'Template Applied', `${themeLabels[themeId]} template applied to your portfolio.`);
                          }}
                        >
                          <div className={`w-full h-32 ${themeBgs[themeId] || 'bg-gray-100'} flex items-center justify-center relative`}>
                            <Palette className="w-10 h-10 opacity-30 text-white" />
                            {isActive && (
                              <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" /> Active
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-text-main mb-1">{themeLabels[themeId]}</h3>
                            <p className="text-xs text-text-muted capitalize">{themeId} style</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
            {activeTab === 'analytics' && (
              <motion.div key="analytics" variants={stagger} initial="hidden" animate="visible" className="space-y-10">
                {!activePortfolio ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
                    <h2 className="text-2xl font-bold text-text-main mb-3">No Data Available</h2>
                    <p className="text-text-muted max-w-md mb-8">Generate and publish a portfolio to start tracking visitors and interactions.</p>
                    <button onClick={() => setActiveTab('generate')} className="btn-primary flex items-center gap-2"><Sparkles className="w-5 h-5" /> Generate Portfolio</button>
                  </div>
                ) : (
                  <>
                    <motion.div variants={fadeUp}>
                      <h1 className="text-3xl font-bold tracking-tight text-text-main mb-2">Analytics</h1>
                      <p className="text-text-muted">Insights into your portfolio's performance and visitors.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {metricsLoading ? (
                        <>
                          {[1, 2, 3].map(i => (
                            <div key={i} className="p-6 bg-white border border-border-subtle rounded-3xl shadow-sm flex items-center justify-between animate-pulse">
                              <div className="space-y-3 w-full">
                                <div className="h-4 bg-gray-100 rounded w-1/3"></div>
                                <div className="h-8 bg-gray-100 rounded w-1/2"></div>
                              </div>
                              <div className="w-12 h-12 bg-gray-100 rounded-2xl shrink-0"></div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          <StatCard title="Page Views" value={metrics.pageViews || 0} icon={Eye} color="blue" />
                          <StatCard title="Social Clicks" value={metrics.socialClicks || 0} icon={ArrowUpRight} color="indigo" />
                          <StatCard title="Contact Requests" value={metrics.contactForms || 0} icon={MessageSquare} color="emerald" />
                        </>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div variants={fadeUp} className="p-8 bg-white border border-border-subtle rounded-3xl shadow-sm">
                        <h3 className="text-sm font-medium text-text-main mb-8">Traffic Timeline</h3>
                        <div className="h-48 flex items-end justify-between gap-2 border-b border-border-subtle pb-2">
                          {timeline.length > 0 ? timeline.map((item, index) => {
                            const maxViews = Math.max(...timeline.map(t => t.views), 1);
                            const height = (item.views / maxViews) * 100;
                            return (
                              <div key={index} className="flex-1 flex flex-col items-center gap-2 group relative">
                                <span className="opacity-0 group-hover:opacity-100 absolute -top-8 text-[10px] bg-white text-black px-2 py-1 rounded shadow-lg transition-opacity">{item.views}</span>
                                <div style={{ height: `${height}%` }} className="w-full bg-primary/20 hover:bg-primary-hover/40 border border-primary/20 rounded-t-sm transition-all" />
                                <span className="text-[10px] text-text-muted">{item.date.slice(-5)}</span>
                              </div>
                            );
                          }) : metricsLoading ? (
                            <div className="w-full h-full flex items-end justify-between gap-2">
                              {[...Array(7)].map((_, i) => (
                                <div key={i} className="flex-1 bg-gray-100 rounded-t-sm animate-pulse" style={{ height: `${Math.max(20, Math.random() * 100)}%` }}></div>
                              ))}
                            </div>
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-center">
                              <BarChart3 className="w-8 h-8 text-gray-300 mb-2" />
                              <p className="text-sm font-medium text-gray-900">No Recent Activity</p>
                              <p className="text-xs text-gray-500 mt-1 max-w-[200px]">Your portfolio hasn't received any visitors yet. Share your link to get started.</p>
                            </div>
                          )}
                        </div>
                      </motion.div>

                      <motion.div variants={fadeUp} className="p-8 bg-white border border-border-subtle rounded-3xl shadow-sm">
                        <h3 className="text-sm font-medium text-text-main mb-8">Top Locations</h3>
                        <div className="space-y-6">
                          {countries.length > 0 ? countries.map((c, i) => {
                            const maxVal = Math.max(...countries.map(item => item.value), 1);
                            const width = (c.value / maxVal) * 100;
                            return (
                              <div key={i} className="space-y-2">
                                <div className="flex justify-between text-xs text-text-muted"><span>{c.name}</span><span>{c.value}</span></div>
                                <div className="h-1.5 bg-gray-50 rounded-full overflow-hidden"><div style={{ width: `${width}%` }} className="h-full bg-primary rounded-full" /></div>
                              </div>
                            );
                          }) : metricsLoading ? (
                            <div className="space-y-4">
                              {[...Array(4)].map((_, i) => (
                                <div key={i} className="space-y-2 animate-pulse">
                                  <div className="flex justify-between"><div className="h-3 bg-gray-100 rounded w-1/4"></div><div className="h-3 bg-gray-100 rounded w-1/12"></div></div>
                                  <div className="h-1.5 bg-gray-100 rounded-full w-full"></div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="py-6 flex flex-col items-center justify-center text-center">
                              <MapPin className="w-8 h-8 text-gray-300 mb-2" />
                              <p className="text-sm font-medium text-gray-900">No Location Data</p>
                              <p className="text-xs text-gray-500 mt-1">Visitor locations will appear here once your portfolio gets traffic.</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {activeTab === 'deployments' && (
              <motion.div key="domain" variants={fadeUp} initial="hidden" animate="visible" className="max-w-3xl space-y-10">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-text-main mb-2">Domains</h1>
                  <p className="text-text-muted">Connect a custom domain to your published portfolio.</p>
                </div>
                {!activePortfolio && (
                  <div className="flex flex-col items-center justify-center py-20 text-center bg-white border border-border-subtle rounded-2xl shadow-sm">
                    <Globe className="w-12 h-12 text-text-muted/40 mb-4" />
                    <h2 className="text-xl font-bold text-text-main mb-2">No Portfolio Yet</h2>
                    <p className="text-text-muted mb-6 max-w-sm">Generate a portfolio first before connecting a custom domain.</p>
                    <button onClick={() => setActiveTab('generate')} className="btn-primary flex items-center gap-2"><Sparkles className="w-4 h-4" />Generate Portfolio</button>
                  </div>
                )}
                {activePortfolio && (

                  <div className="p-8 bg-white border border-border-subtle rounded-3xl shadow-sm space-y-8">
                    <form onSubmit={handleConnectDomain} className="space-y-4">
                      <label className="text-sm font-medium text-text-main">Custom Domain</label>
                      <div className="flex gap-4">
                        <input type="text" placeholder="yourdomain.com" value={connectDomainName} onChange={(e) => setConnectDomainName(e.target.value)} disabled={domainVerifying} className="flex-1 px-4 py-3 bg-gray-50 border border-border-subtle focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl text-sm text-text-main outline-none focus:border-primary transition-all" />
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={domainVerifying || !connectDomainName} type="submit" className="px-6 py-3 bg-primary text-text-main hover:bg-primary-hover text-text-main text-sm font-medium rounded-2xl transition-all disabled:opacity-50">
                          {domainVerifying ? "Verifying..." : "Add Domain"}
                        </motion.button>
                      </div>
                    </form>
                    {domainSteps.length > 0 && (
                      <div className="p-6 bg-gray-50 rounded-2xl border border-border-subtle space-y-3">
                        {domainSteps.map((step, idx) => (
                          <p key={idx} className="flex items-center gap-2 text-sm text-text-main"><Check className="w-4 h-4 text-primary" /> {step}</p>
                        ))}
                      </div>
                    )}
                    {domainStatus === 'verified' && (
                      <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium text-success-main">Domain Connected</h4>
                          <p className="text-xs text-emerald-500/70 mt-1">Your domain has been successfully verified and mapped.</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'billing' && (
              <motion.div key="billing" variants={stagger} initial="hidden" animate="visible" className="space-y-10">
                <motion.div variants={fadeUp}>
                  <h1 className="text-3xl font-bold tracking-tight text-text-main mb-2">Plans & Billing</h1>
                  <p className="text-text-muted">Manage your subscription and premium features.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <PricingCard title="Free" price="$0" active={activeTier === 'free'} onSelect={() => handleUpgradeTier('free')} features={["1 Portfolio", "Basic Templates", "folioai.tech Subdomain"]} />
                  <PricingCard title="Pro" price="$15" active={activeTier === 'premium'} onSelect={() => handleUpgradeTier('premium')} features={["Unlimited Portfolios", "All 10 Premium Templates", "Custom Domains", "Advanced Analytics"]} recommended />
                  <PricingCard title="Enterprise" price="$39" active={activeTier === 'ultimate'} onSelect={() => handleUpgradeTier('ultimate')} features={["Priority Support", "Dedicated AI Models", "Team Collaboration"]} />
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div key="security" variants={fadeUp} initial="hidden" animate="visible" className="max-w-3xl space-y-10">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-text-main mb-2">Security</h1>
                  <p className="text-text-muted">Protect your account with multi-factor authentication.</p>
                </div>

                <div className="p-8 bg-white border border-border-subtle rounded-3xl shadow-sm space-y-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div>
                      <h3 className="text-base font-medium text-text-main mb-1">Two-Factor Authentication</h3>
                      <p className="text-sm text-text-muted">Add an extra layer of security to your account.</p>
                    </div>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleToggleMFA(!mfaActive)} disabled={mfaLoading} className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${mfaActive ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' : 'bg-primary text-text-main hover:bg-primary-hover text-text-main shadow-lg shadow-sm'}`}>
                      {mfaActive ? "Disable 2FA" : "Enable 2FA"}
                    </motion.button>
                  </div>

                  {mfaActive && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="pt-8 border-t border-border-subtle flex gap-8">
                      <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center border-4 border-[#151C2C]">
                        <ShieldCheck className="w-10 h-10 text-primary" />
                      </div>
                      <div className="space-y-4">
                        <p className="text-sm text-text-main leading-relaxed">Scan this QR code with your authenticator app, or enter the code manually:</p>
                        <code className="px-3 py-1.5 bg-gray-50 border border-border-subtle rounded-lg text-sm text-primary font-mono tracking-widest">{mfaSecret || "K52XG33XN5ZG6ZLM"}</code>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* AI Assistant Modal */}
      {activePortfolio && (
        <AIAssistantModal
          isOpen={aiAssistantOpen}
          onClose={() => setAiAssistantOpen(false)}
          currentPortfolio={activePortfolio}
          onUpdatePortfolio={onUpdatePortfolio}
        />
      )}
    </div>
  );
}

// --- Internal Reusable Components ---

function NavItem({ icon: Icon, label, id, active, onClick }: { icon: any, label: string, id: string, active: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all group outline-none ${active ? 'text-text-main bg-white border border-border-subtle shadow-sm' : 'text-text-muted hover:text-text-main hover:bg-gray-50 border border-transparent'}`}>
      {active && <motion.div layoutId="navIndicator" className="absolute left-0 w-1 h-5 bg-primary rounded-r-full" />}
      <Icon className={`w-4 h-4 transition-colors ${active ? 'text-primary' : 'group-hover:text-text-main'}`} />
      {label}
    </button>
  );
}

function CardSelector({ active, onClick, icon: Icon, title, desc }: { active: boolean, onClick: () => void, icon: any, title: string, desc: string }) {
  return (
    <button type="button" onClick={onClick} className={`text-left p-6 rounded-3xl border transition-all duration-300 group outline-none ${active ? 'bg-gray-50 border-primary/50 shadow-lg shadow-primary/5' : 'bg-white border border-border-subtle hover:shadow-lg hover:-translate-y-1 transition-all hover:border-border-accent hover:bg-gray-50 '}`}>
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-4 transition-colors ${active ? 'bg-primary text-text-main shadow-md shadow-sm' : 'bg-gray-50 border border-border-subtle text-text-muted group-hover:text-text-main'}`}>
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="text-base font-semibold text-text-main mb-1.5">{title}</h3>
      <p className="text-sm text-text-muted leading-relaxed">{desc}</p>
    </button>
  );
}

function PremiumInput({ label, value, onChange, placeholder, type = "text" }: any) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative group">
      <motion.label
        initial={false}
        animate={{
          y: (isFocused || value) ? -10 : 14,
          scale: (isFocused || value) ? 0.85 : 1,
          color: isFocused ? 'var(--color-primary)' : 'var(--color-text-muted)'
        }}
        className="absolute left-4 px-1 bg-white origin-left transition-colors pointer-events-none z-10 font-medium"
      >
        {label}
      </motion.label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-4 py-3.5 bg-gray-50 border-2 border-border-subtle rounded-xl text-sm text-text-main focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm group-hover:border-gray-300"
      />
      {value && value.length > 0 && !isFocused && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-4 top-4">
          <CheckCircle className="w-4 h-4 text-emerald-500" />
        </motion.div>
      )}
    </div>
  );
}

function ThemePreviewCard({ theme, active, onClick, key }: { theme: string, active: boolean, onClick: () => void, key?: React.Key }) {
  // Simple visual abstraction for themes
  const getLayoutPreview = () => {
    switch (theme) {
      case 'minimal': return <><div className="w-8 h-2 bg-slate-300 rounded mx-auto mb-4" /><div className="w-16 h-1 bg-slate-400 rounded mx-auto mb-2" /><div className="w-12 h-1 bg-slate-400 rounded mx-auto" /></>;
      case 'bento': case 'startup': return <div className="grid grid-cols-2 gap-1"><div className="bg-slate-300 h-6 rounded-sm col-span-2" /><div className="bg-slate-400 h-8 rounded-sm" /><div className="bg-slate-400 h-8 rounded-sm" /></div>;
      case 'glass': return <div className="w-full h-full border border-border-subtle bg-white rounded-lg p-2 flex flex-col justify-end"><div className="w-10 h-1 bg-gray-200 rounded" /></div>;
      case 'editorial': return <><div className="w-12 h-2 bg-slate-700 rounded mx-auto mb-3" /><div className="w-20 h-1 bg-slate-400 rounded mx-auto mb-2" /><div className="w-14 h-1 bg-slate-400 rounded mx-auto" /></>;
      case 'engineer': return <div className="font-mono text-[10px] leading-4 text-slate-500"><div>$ whoami</div><div className="text-slate-300">â†’ user</div></div>;
      case 'brutalist': return <div className="border border-black p-1"><div className="w-full h-2 bg-black mb-1" /><div className="w-2/3 h-1 bg-black" /></div>;
      case 'aurora': return <div className="w-full h-full bg-gradient-to-br from-indigo-500/40 to-cyan-400/40 rounded-lg" />;
      case 'atelier': return <div className="w-full h-full border border-slate-300 bg-slate-100 rounded-sm flex items-end p-1"><div className="w-full h-1 bg-slate-400" /></div>;
      case 'mono-lux': return <div className="w-full flex flex-col items-center gap-1"><div className="w-10 h-px bg-slate-300" /><div className="w-6 h-px bg-slate-200" /></div>;
      case 'vibrant': return <div className="w-full h-full bg-gradient-to-r from-fuchsia-500/40 to-orange-400/40 rounded-lg" />;
      case 'architectural': return <div className="w-full grid grid-cols-4 gap-px"><div className="bg-slate-200 h-3" /><div className="bg-slate-200 h-3" /><div className="bg-slate-200 h-3" /><div className="bg-slate-200 h-3" /></div>;
      case 'vintage-modern': return <div className="w-full h-full border border-amber-200 bg-amber-50 rounded-sm flex items-center justify-center text-[10px] text-amber-700">fact sheet</div>;
      default: return <><div className="w-full h-6 bg-slate-300 rounded-md mb-2" /><div className="flex gap-1"><div className="w-1/2 h-4 bg-slate-400 rounded-sm" /><div className="w-1/2 h-4 bg-slate-400 rounded-sm" /></div></>;
    }
  };

  return (
    <button type="button" onClick={onClick} className={`flex flex-col items-center gap-3 p-3 rounded-2xl border transition-all outline-none ${active ? 'bg-primary/10 border-primary ring-1 ring-primary/50' : 'bg-white border border-border-subtle hover:shadow-lg hover:-translate-y-1 transition-all hover:border-border-accent hover:bg-gray-50 '}`}>
      <div className="w-full aspect-[4/3] bg-bg-base border border-border-subtle rounded-xl flex flex-col justify-center p-3 relative overflow-hidden">
        {active && <div className="absolute inset-0 bg-primary/10 pointer-events-none" />}
        {getLayoutPreview()}
      </div>
      <span className="text-xs font-medium text-text-main capitalize">{theme}</span>
    </button>
  );
}

function StatCard({ title, value, icon: Icon, color }: any) {
  const colorMap: Record<string, string> = {
    blue: 'text-primary bg-primary/10 border-primary/20',
    indigo: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    emerald: 'text-success-main bg-emerald-500/10 border-emerald-500/20',
  };
  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="p-6 bg-white border border-border-subtle rounded-3xl shadow-sm flex items-center justify-between">
      <div>
        <h4 className="text-sm font-medium text-text-muted mb-2">{title}</h4>
        <span className="text-3xl font-bold text-text-main">{value}</span>
      </div>
      <div className={`p-4 rounded-2xl border ${colorMap[color]}`}><Icon className="w-6 h-6" /></div>
    </motion.div>
  );
}

function PricingCard({ title, price, active, onSelect, features, recommended }: any) {
  return (
    <motion.div whileHover={{ y: -5 }} className={`relative p-8 rounded-3xl border flex flex-col ${recommended ? 'bg-gradient-to-b from-[#151C2C] to-[#111827] border-primary shadow-xl shadow-sm' : 'bg-white border-border-subtle shadow-sm'}`}>
      {recommended && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-text-main text-[10px] font-bold uppercase tracking-widest rounded-full">Recommended</span>}
      <h3 className="text-lg font-medium text-text-main mb-4">{title}</h3>
      <div className="flex items-baseline gap-1 mb-8">
        <span className="text-4xl font-bold text-text-main">{price}</span><span className="text-sm text-text-muted">/mo</span>
      </div>
      <ul className="space-y-4 mb-8 flex-1">
        {features.map((f: string, i: number) => <li key={i} className="flex items-center gap-3 text-sm text-text-main"><Check className="w-4 h-4 text-primary" /> {f}</li>)}
      </ul>
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onSelect} className={`w-full py-3 rounded-2xl text-sm font-medium transition-all ${active ? 'bg-gray-50 border border-border-accent text-text-muted cursor-default' : recommended ? 'bg-primary text-text-main hover:bg-primary-hover text-text-main shadow-lg shadow-sm' : 'bg-gray-50 hover:bg-border-subtle border border-border-accent text-text-main'}`}>
        {active ? "Current Plan" : "Upgrade"}
      </motion.button>
    </motion.div>
  );
}



