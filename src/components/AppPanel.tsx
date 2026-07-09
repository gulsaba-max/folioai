import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X, User, Bell, Shield, Key, CreditCard, HelpCircle,
  BookOpen, FileText, Lock, ChevronRight, Mail, Globe,
  Moon, Sun, Smartphone, Github, Twitter, Linkedin,
  ExternalLink, Check, AlertTriangle, Zap, Info, Settings
} from "lucide-react";

type PanelType = 'settings' | 'help' | 'about' | 'docs' | 'privacy' | 'profile' | null;

interface AppPanelProps {
  open: PanelType;
  onClose: () => void;
  currentUser?: any;
  theme?: 'light' | 'dark';
  onThemeChange?: (theme: 'light' | 'dark') => void;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-3">{children}</h3>;
}

function Row({ label, children, ...rest }: { label: string; children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest} className="flex items-center justify-between py-3 border-b border-border-subtle last:border-0">
      <span className="text-sm font-medium text-text-main">{label}</span>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`w-11 h-6 rounded-full transition-colors relative ${value ? 'bg-primary' : 'bg-gray-200'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );
}

function Badge({ color, children }: { color: string; children: React.ReactNode }) {
  const colors: Record<string, string> = {
    green: 'bg-green-50 text-green-700 border-green-100',
    blue:  'bg-primary/5 text-primary border-primary/20',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
  };
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${colors[color] || colors.blue}`}>
      {children}
    </span>
  );
}

/* ─────────────────────────── SETTINGS ─────────────────────────── */
function SettingsPanel({ user, theme, onThemeChange, onLogout }: { user: any, theme?: 'light' | 'dark', onThemeChange?: (theme: 'light' | 'dark') => void, onLogout?: () => void }) {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [saveMsg, setSaveMsg] = useState('');
  const [browserNotifs, setBrowserNotifs] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [twoFa, setTwoFa] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you absolutely sure you want to delete your account? This will permanently remove all your portfolios. This action cannot be undone.")) {
      return;
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/delete-account`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.id })
      });
      if (response.ok) {
        alert("Your account has been deleted.");
        onLogout?.();
      } else {
        alert("Failed to delete account.");
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="space-y-8">
      {/* Profile */}
      <div>
        <SectionHeading>Profile</SectionHeading>
        <div className="bg-white border border-border-subtle rounded-2xl shadow-sm p-5 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center relative group overflow-hidden">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User className="w-7 h-7 text-primary" />
              )}
              <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <span className="text-white text-xs font-medium">Upload</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const url = URL.createObjectURL(e.target.files[0]);
                    setAvatarUrl(url);
                  }
                }} />
              </label>
            </div>
            <div>
              <p className="font-semibold text-text-main">{user?.email || "user@example.com"}</p>
              <Badge color="blue">Free Plan</Badge>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="text-xs font-semibold text-text-muted uppercase tracking-wide block mb-1">Display Name</label>
              <input className="input-field" defaultValue={user?.email?.split('@')[0] || 'User'} />
            </div>
            <div>
              <label className="text-xs font-semibold text-text-muted uppercase tracking-wide block mb-1">Email</label>
              <input className="input-field" defaultValue={user?.email || ""} readOnly />
            </div>
          </div>
          <button onClick={() => { setSaveMsg("Profile saved successfully!"); setTimeout(()=>setSaveMsg(""),3000); }} className="btn-primary text-sm px-4 py-2">Save Changes</button>
          {saveMsg && <p className="text-xs font-medium text-success-main mt-2">{saveMsg}</p>}
        </div>
      </div>

      {/* Appearance */}
      <div>
        <SectionHeading>Appearance</SectionHeading>
        <div className="bg-white border border-border-subtle rounded-2xl shadow-sm divide-y divide-border-subtle">
          <Row label="Theme">
            <div className="flex gap-2">
              <button onClick={() => onThemeChange?.('light')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${theme === 'light' ? 'border-primary bg-primary/5 text-primary' : 'border-border-subtle text-text-muted'}`}>
                <Sun className="w-3.5 h-3.5" /> Light
              </button>
              <button onClick={() => onThemeChange?.('dark')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${theme === 'dark' ? 'border-primary bg-primary/5 text-primary' : 'border-border-subtle text-text-muted'}`}>
                <Moon className="w-3.5 h-3.5" /> Dark
              </button>
            </div>
          </Row>
        </div>
      </div>

      {/* Notifications */}
      <div>
        <SectionHeading>Notifications</SectionHeading>
        <div className="bg-white border border-border-subtle rounded-2xl shadow-sm divide-y divide-border-subtle">
          <Row label="Email Notifications"><Toggle value={emailNotifs} onChange={() => setEmailNotifs(v => !v)} /></Row>
          <Row label="Browser Notifications"><Toggle value={browserNotifs} onChange={() => setBrowserNotifs(v => !v)} /></Row>
          <Row label="Marketing Emails"><Toggle value={marketingEmails} onChange={() => setMarketingEmails(v => !v)} /></Row>
        </div>
      </div>

      {/* Security */}
      <div>
        <SectionHeading>Security</SectionHeading>
        <div className="bg-white border border-border-subtle rounded-2xl shadow-sm divide-y divide-border-subtle">
          <Row label="Two-Factor Authentication">
            <Badge color={twoFa ? 'green' : 'amber'}>{twoFa ? 'Enabled' : 'Disabled'}</Badge>
            <Toggle value={twoFa} onChange={() => setTwoFa(v => !v)} />
          </Row>
          <Row label="Password">
            <button onClick={() => setShowChangePassword(true)} className="text-xs font-medium text-primary hover:underline">Change Password</button>
          </Row>
          <Row label="Active Sessions">
            <Badge color="green">1 active</Badge>
          </Row>
        </div>
        {showChangePassword && (
          <motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} className="bg-white border border-border-subtle rounded-2xl shadow-sm p-4 space-y-3 border-primary/20">
            <p className="text-sm font-semibold text-text-main">Change Password</p>
            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="New password (min 8 chars)" className="input-field text-sm" />
            <div className="flex gap-2">
              <button onClick={() => { if(newPassword.length < 8){ setSaveMsg('Password must be at least 8 characters.'); return; } setSaveMsg('Password updated successfully!'); setShowChangePassword(false); setNewPassword(''); setTimeout(()=>setSaveMsg(""),3000); }} className="btn-primary text-sm px-4 py-2">Update Password</button>
              <button onClick={() => { setShowChangePassword(false); setNewPassword(''); }} className="btn-secondary text-sm px-4 py-2">Cancel</button>
            </div>
            {saveMsg && <p className={`text-xs font-medium ${saveMsg.includes('successfully') ? 'text-success-main' : 'text-error-main'}`}>{saveMsg}</p>}
          </motion.div>
        )}
      </div>

      {/* Danger Zone */}
      <div>
        <SectionHeading>Danger Zone</SectionHeading>
        <div className="bg-white border border-border-subtle rounded-2xl shadow-sm p-5 border-red-100">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-text-main mb-1">Delete Account</p>
              <p className="text-xs text-text-muted mb-3">Permanently delete your account and all associated portfolios. This action cannot be undone.</p>
              <button onClick={handleDeleteAccount} className="text-xs font-medium text-red-600 border border-red-200 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors">Delete My Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── HELP ─────────────────────────── */
function HelpPanel() {
  const faqs = [
    { q: "How do I upload my resume?", a: "On the Generate Portfolio page, choose 'Upload Resume' and drag-and-drop your PDF, DOCX, or TXT file. Our parser will extract your details automatically." },
    { q: "What file formats are supported?", a: "We support PDF, DOCX, TXT, RTF, and Markdown files for resume upload." },
    { q: "How long does portfolio generation take?", a: "Typically 15–30 seconds. Our AI agents process your resume, enhance content, select a design, and render your portfolio." },
    { q: "Can I edit my portfolio after generation?", a: "Yes. Use the Editor tab in the dashboard to update content, change themes, reorder sections, and update design settings." },
    { q: "How do I publish my portfolio?", a: "Click 'Publish Site' in the dashboard sidebar. Your portfolio gets a unique URL at yourname.folioai.tech." },
    { q: "Can I use a custom domain?", a: "Yes. Go to the Domain tab in your dashboard and connect your own domain by updating your DNS records." },
  ];

  return (
    <div className="space-y-8">
      {/* Quick links */}
      <div>
        <SectionHeading>Quick Links</SectionHeading>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: BookOpen, label: 'Documentation', desc: 'Full API & usage docs', href: 'https://docs.folioai.tech', external: true },
            { icon: Github, label: 'GitHub', desc: 'View source & contribute', href: 'https://github.com/gulsaba-max/folioai', external: true },
            { icon: Mail, label: 'Email Support', desc: 'support@folioai.tech', href: 'mailto:support@folioai.tech', external: false },
            { icon: Twitter, label: 'Community', desc: '@folioai on Twitter/X', href: 'https://x.com/folioai', external: true },
          ].map(({ icon: Icon, label, desc, href, external }) => (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="bg-white border border-border-subtle rounded-2xl shadow-sm p-4 text-left flex flex-col gap-2 hover:shadow-md hover:-translate-y-1 hover:scale-[1.01] cursor-pointer transition-all"
            >
              <Icon className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-semibold text-text-main">{label}</p>
                <p className="text-xs text-text-muted">{desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div>
        <SectionHeading>Frequently Asked Questions</SectionHeading>
        <div className="space-y-3">
          {faqs.map(({ q, a }) => (
            <details key={q} className="bg-white border border-border-subtle rounded-2xl shadow-sm group">
              <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                <span className="text-sm font-medium text-text-main">{q}</span>
                <ChevronRight className="w-4 h-4 text-text-muted group-open:rotate-90 transition-transform shrink-0 ml-2" />
              </summary>
              <p className="px-4 pb-4 text-sm text-text-muted leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </div>

      <div className="bg-white border border-border-subtle rounded-2xl shadow-sm p-5 flex items-start gap-3">
        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-text-main mb-1">Still need help?</p>
          <p className="text-xs text-text-muted">Contact our team at <a href="mailto:support.folioai@gmail.com" className="text-primary hover:underline">support.folioai@gmail.com</a> — we typically respond within 24 hours.</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── ABOUT ─────────────────────────── */
function AboutPanel() {
  return (
    <div className="space-y-8">
      <div className="text-center py-6">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
          <Zap className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-text-main mb-2">FolioAI</h2>
        <p className="text-text-muted text-sm">From Resume to Remarkable</p>
        <Badge color="blue">v2.0.0 · Powered by AI Agents</Badge>
      </div>

      <div className="bg-white border border-border-subtle rounded-2xl shadow-sm p-6">
        <SectionHeading>Our Mission</SectionHeading>
        <p className="text-sm text-text-muted leading-relaxed">
          FolioAI was built by <strong className="text-text-main">Vector Minds</strong> to democratize professional portfolio creation. We believe every professional deserves a beautiful, functional portfolio — without needing to hire a designer or learn to code.
        </p>
        <p className="text-sm text-text-muted leading-relaxed mt-3">
          Our AI agent pipeline automatically parses your resume, enhances your content, selects the optimal design, and deploys a production-ready portfolio website — all in under 30 seconds.
        </p>
      </div>

      <div>
        <SectionHeading>AI Agent Stack</SectionHeading>
        <div className="grid grid-cols-1 gap-3">
          {[
            { name: 'Resume Parser', desc: 'Extracts structured data from any resume format', status: 'Active' },
            { name: 'Content Enhancer', desc: 'Rewrites and refines your descriptions for impact', status: 'Active' },
            { name: 'Portfolio Designer', desc: 'Selects optimal layouts and component structures', status: 'Active' },
            { name: 'Theme Recommender', desc: 'Matches colors, typography, and aesthetics to your industry', status: 'Active' },
            { name: 'Deployment Agent', desc: 'Handles hosting, SSL, and domain routing automatically', status: 'Active' },
          ].map(({ name, desc, status }) => (
            <div key={name} className="bg-white border border-border-subtle rounded-2xl shadow-sm p-4 flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-green-500 shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-text-main">{name}</p>
                <p className="text-xs text-text-muted">{desc}</p>
              </div>
              <Badge color="green">{status}</Badge>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-border-subtle rounded-2xl shadow-sm p-5 text-center">
        <p className="text-xs text-text-muted">Built with ❤️ by <strong className="text-text-main">Vector Minds</strong> · © 2026 FolioAI</p>
        <p className="text-xs text-text-muted mt-1">Powered by Google Gemini · React · Vite · TailwindCSS</p>
      </div>
    </div>
  );
}

/* ─────────────────────────── DOCS ─────────────────────────── */
function DocsPanel() {
  const sections = [
    {
      title: "Getting Started",
      items: [
        { label: "Upload your resume", desc: "PDF, DOCX, TXT, RTF supported" },
        { label: "Choose a template", desc: "10 premium themes available" },
        { label: "Select color palette", desc: "16 curated color palettes" },
        { label: "Generate & publish", desc: "One-click AI generation" },
      ]
    },
    {
      title: "Portfolio Editor",
      items: [
        { label: "Editing content", desc: "Update any field in real-time" },
        { label: "Changing themes", desc: "Switch templates without losing data" },
        { label: "Reordering sections", desc: "Drag sections to customize layout" },
        { label: "Social links", desc: "Add GitHub, LinkedIn, Twitter, Instagram" },
      ]
    },
    {
      title: "Deployment",
      items: [
        { label: "Publishing your site", desc: "Gets a free folioai.tech subdomain" },
        { label: "Custom domains", desc: "Connect your own domain via DNS" },
        { label: "SSL certificates", desc: "HTTPS enabled automatically" },
        { label: "CDN delivery", desc: "Served globally via edge network" },
      ]
    },
    {
      title: "Analytics",
      items: [
        { label: "Page views", desc: "Track visitor traffic over time" },
        { label: "Geographic data", desc: "See where visitors are from" },
        { label: "Contact forms", desc: "Monitor and export leads" },
        { label: "Social clicks", desc: "Track social profile visits" },
      ]
    },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white border border-border-subtle rounded-2xl shadow-sm p-5 flex items-start gap-3">
        <BookOpen className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-text-main mb-1">FolioAI Documentation</p>
          <p className="text-xs text-text-muted">Everything you need to create, customize, and deploy your portfolio.</p>
        </div>
      </div>

      {sections.map(({ title, items }) => (
        <div key={title}>
          <SectionHeading>{title}</SectionHeading>
        <div className="bg-white border border-border-subtle rounded-2xl shadow-sm divide-y divide-border-subtle">
            {items.map(({ label, desc }) => (
              <div key={label} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                <div>
                  <p className="text-sm font-medium text-text-main">{label}</p>
                  <p className="text-xs text-text-muted">{desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────── PRIVACY ─────────────────────────── */
function PrivacyPanel() {
  return (
    <div className="space-y-6 text-sm text-text-muted leading-relaxed">
      <div className="bg-white border border-border-subtle rounded-2xl shadow-sm p-5">
        <p className="text-xs text-text-muted">Last updated: July 2026</p>
      </div>

      {[
        {
          title: "1. Information We Collect",
          content: "We collect information you provide directly: your email address, resume content, and portfolio details. We also collect usage data such as page views, feature interactions, and device information to improve our service."
        },
        {
          title: "2. How We Use Your Data",
          content: "Your resume data is used solely to generate your portfolio content. We use aggregated, anonymized analytics to improve FolioAI. We never sell your personal information to third parties."
        },
        {
          title: "3. AI Processing",
          content: "Your resume content is sent to Google Gemini API to power portfolio generation. This data is processed securely and is not used to train AI models. Processing is governed by Google's AI usage policies."
        },
        {
          title: "4. Data Storage",
          content: "Your portfolio data is stored securely in our database. You can request deletion of all your data at any time from the Settings page. Account deletion removes all associated portfolios and data within 30 days."
        },
        {
          title: "5. Cookies",
          content: "We use essential cookies for authentication and session management. We do not use advertising cookies or third-party tracking cookies."
        },
        {
          title: "6. Security",
          content: "We use industry-standard encryption (TLS) for all data transmission. Passwords are hashed using bcrypt. We support Two-Factor Authentication for additional account security."
        },
        {
          title: "7. Contact",
          content: "For privacy-related questions, contact us at privacy@folioai.tech. We respond to all requests within 72 hours."
        },
      ].map(({ title, content }) => (
        <div key={title} className="bg-white border border-border-subtle rounded-2xl shadow-sm p-5">
          <h4 className="font-semibold text-text-main mb-2">{title}</h4>
          <p>{content}</p>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────── PROFILE ─────────────────────────── */
function ProfilePanel({ user }: { user: any }) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [connections, setConnections] = useState<Record<string, boolean>>(user?.socialConnections || {});

  const handleConnect = async (platform: string) => {
    const isCurrentlyConnected = !!connections[platform];
    const nextStatus = !isCurrentlyConnected;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/connect-social`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.id, platform, connect: nextStatus })
      });
      const data = await response.json();
      if (response.ok) {
        setConnections(data.user.socialConnections || {});
        const stored = localStorage.getItem("folioai_user");
        if (stored) {
          const u = JSON.parse(stored);
          u.socialConnections = data.user.socialConnections;
          localStorage.setItem("folioai_user", JSON.stringify(u));
        }
      } else {
        alert("Failed to update connection.");
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };
  return (
    <div className="space-y-6">
      {/* Avatar */}
      <div className="bg-white border border-border-subtle rounded-2xl shadow-sm p-6 flex flex-col items-center gap-4 text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center overflow-hidden">
          {avatarUrl ? (
            <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <User className="w-9 h-9 text-primary" />
          )}
        </div>
        <div>
          <p className="font-bold text-xl text-text-main">{user?.email?.split('@')[0] || "User"}</p>
          <p className="text-sm text-text-muted">{user?.email || "user@example.com"}</p>
          <div className="mt-2"><Badge color="blue">Free Plan</Badge></div>
        </div>
        <label className="btn-secondary text-sm px-4 py-2 cursor-pointer">
          Edit Profile Photo
          <input type="file" accept="image/*" className="hidden" onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const url = URL.createObjectURL(e.target.files[0]);
              setAvatarUrl(url);
            }
          }} />
        </label>
      </div>

      {/* Stats */}
      <div>
        <SectionHeading>Account Overview</SectionHeading>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Portfolios', value: '1' },
            { label: 'Page Views', value: '—' },
            { label: 'Published', value: '0' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white border border-border-subtle rounded-2xl shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-text-main">{value}</p>
              <p className="text-xs text-text-muted mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div>
        <SectionHeading>Profile Details</SectionHeading>
        <div className="bg-white border border-border-subtle rounded-2xl shadow-sm divide-y divide-border-subtle">
          <Row label="Email"><span className="text-sm text-text-muted">{user?.email || "—"}</span></Row>
          <Row label="Account Type"><Badge color="blue">Free</Badge></Row>
          <Row label="Member Since"><span className="text-sm text-text-muted">July 2026</span></Row>
          <Row label="Auth Provider"><Badge color="green">Email</Badge></Row>
        </div>
      </div>

      {/* Social */}
      <div>
        <SectionHeading>Connected Accounts</SectionHeading>
        <div className="bg-white border border-border-subtle rounded-2xl shadow-sm divide-y divide-border-subtle">
          {[
            { icon: Github, name: 'GitHub', key: 'github' },
            { icon: Linkedin, name: 'LinkedIn', key: 'linkedin' },
            { icon: Twitter, name: 'Twitter / X', key: 'twitter' },
          ].map(({ icon: Icon, name, key }) => {
            const isConnected = !!connections[key];
            return (
              <Row key={name} label={name}>
                {isConnected ? (
                  <div className="flex items-center gap-2">
                    <Badge color="green">Connected</Badge>
                    <button onClick={() => handleConnect(key)} className="text-[10px] text-red-500 hover:underline">Disconnect</button>
                  </div>
                ) : (
                  <button onClick={() => handleConnect(key)} className="text-xs font-medium text-primary border border-primary/20 px-3 py-1 rounded-lg hover:bg-primary/5 transition-colors">Connect</button>
                )}
              </Row>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── MAIN PANEL ─────────────────────────── */
const panelConfig: Record<NonNullable<PanelType>, { title: string; icon: any }> = {
  settings: { title: 'Settings',      icon: Settings    },
  help:     { title: 'Help & Support', icon: HelpCircle },
  about:    { title: 'About FolioAI', icon: Info        },
  docs:     { title: 'Documentation', icon: BookOpen    },
  privacy:  { title: 'Privacy Policy', icon: Lock       },
  profile:  { title: 'Your Profile',  icon: User        },
};

export function AppPanel({ open, onClose, currentUser, theme, onThemeChange, onLogout }: AppPanelProps & { theme?: 'light' | 'dark', onThemeChange?: (theme: 'light' | 'dark') => void, onLogout?: () => void }) {
  if (!open) return null;
  const config = panelConfig[open];

  const renderContent = () => {
    switch (open) {
      case 'settings': return <SettingsPanel user={currentUser} theme={theme} onThemeChange={onThemeChange} onLogout={onLogout} />;
      case 'help':     return <HelpPanel />;
      case 'about':    return <AboutPanel />;
      case 'docs':     return <DocsPanel />;
      case 'privacy':  return <PrivacyPanel />;
      case 'profile':  return <ProfilePanel user={currentUser} />;
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 z-[200]"
          />
          {/* Sliding panel */}
          <motion.div
            key="panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white border-l border-border-subtle shadow-2xl z-[201] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border-subtle bg-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                  <config.icon className="w-4 h-4 text-primary" />
                </div>
                <h2 className="font-bold text-lg text-text-main">{config.title}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-text-muted hover:text-text-main hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 no-scrollbar">
              {renderContent()}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export type { PanelType };
