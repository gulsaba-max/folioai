import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  FileText, Edit3, Layout, Palette, Rocket, CheckCircle2, 
  Loader2, Activity, Clock, FileCheck, Check, Sparkles, Shield, BrainCircuit, Lightbulb,
  ChevronDown, ChevronUp, Download, Eye, FileCode2, ExternalLink
} from "lucide-react";

interface LoadingScreenProps {
  isFinished?: boolean;
  onView?: () => void;
  onDownload?: () => void;
  onDeploy?: () => void;
  onCreateAnother?: () => void;
}

const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 15); // Fast typing speed
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayedText}<span className="animate-pulse opacity-50">|</span></span>;
};

export default function LoadingScreen({ isFinished = false, onView, onDownload, onDeploy, onCreateAnother }: LoadingScreenProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [logs, setLogs] = useState<{ time: string, msg: string, agent: string }[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [smartFactIndex, setSmartFactIndex] = useState(0);
  
  // New state for the generation report
  const [showReport, setShowReport] = useState(false);
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);

  const smartFacts = [
    "Recruiters spend an average of only a few seconds reviewing a portfolio, so clear structure matters.",
    "Highlighting measurable achievements often makes experience descriptions more compelling.",
    "Well-organized portfolios are easier to scan and understand.",
    "Using action verbs increases the perceived impact of your professional experience."
  ];

  const pipeline = [
    { 
      id: 'parser', name: 'Resume Parser Agent', icon: FileText, desc: 'Extracting structured data from your resume.', 
      tasks: ['Reading uploaded resume', 'Detecting sections', 'Extracting skills', 'Identifying education', 'Finding projects'],
      thinking: "I'm reading your resume and identifying important information such as your work experience, education, technical skills, certifications, achievements, and projects.",
      insights: ["✓ 24 technical skills detected", "✓ 6 projects identified", "✓ 5 years of experience"],
      reportData: {
        time: '4.8 seconds', conf: '99%', output: '24 Skills Found, 6 Projects, 5 Work Experiences, 2 Education Records',
        details: ['✓ Parsed Resume', '✓ Extracted Skills', '✓ Extracted Education', '✓ Extracted Experience', '✓ Extracted Projects']
      }
    },
    { 
      id: 'enhancer', name: 'Content Enhancement Agent', icon: Edit3, desc: 'Rewriting and refining your descriptions.', 
      tasks: ['Rewriting summary', 'Improving job descriptions', 'Highlighting achievements', 'Optimizing project descriptions'],
      thinking: "I'm improving the wording of your resume to make it clearer, more professional, and more impactful while preserving your original experience.",
      insights: ["✓ Professional summary enhanced", "✓ Portfolio readability improved by 32%"],
      reportData: {
        time: '8.2 seconds', conf: '96%', output: 'All text content enhanced for maximum impact',
        details: ['✓ Improved Summary', '✓ Enhanced Experience', '✓ Optimized Projects', '✓ Corrected Grammar', '✓ Increased Readability'],
        beforeAfter: { before: 'Developed a website.', after: 'Designed and developed a responsive portfolio platform with improved accessibility and performance.' }
      }
    },
    { 
      id: 'strategy', name: 'Portfolio Strategy Agent', icon: Layout, desc: 'Determining the optimal section layout.', 
      tasks: ['Organizing sections', 'Prioritizing projects', 'Selecting featured skills', 'Choosing portfolio structure'],
      thinking: "I'm deciding how to organize your portfolio so recruiters can quickly understand your strengths and experience.",
      insights: ["✓ Strong backend profile", "✓ Optimized for 3-second scan"],
      reportData: {
        time: '3.1 seconds', conf: '98%', output: 'Optimized Section Hierarchy Created',
        details: ['✓ Reorganized Sections', '✓ Selected Featured Projects', '✓ Improved Content Order', '✓ Optimized User Flow']
      }
    },
    { 
      id: 'designer', name: 'Portfolio Design Agent', icon: Palette, desc: 'Selecting typography and visual hierarchy.', 
      tasks: ['Building homepage', 'Designing project cards', 'Creating responsive layout', 'Applying theme'],
      thinking: "I'm creating a beautiful, responsive portfolio using the best layout, typography, spacing, and visual hierarchy.",
      insights: ["✓ Layout engine initialized", "✓ Mobile breakpoints set"],
      reportData: {
        time: '6.4 seconds', conf: '97%', output: '32 Components Generated, Responsive Grid Applied',
        details: ['✓ Generated Responsive Layout', '✓ Applied Theme', '✓ Created Components', '✓ Optimized Typography']
      }
    },
    { 
      id: 'theme', name: 'Theme Recommendation Agent', icon: Palette, desc: 'Selecting the portfolio theme that matches your experience.', 
      tasks: ['Evaluating profile', 'Comparing themes', 'Applying branding'],
      thinking: "I'm selecting the portfolio theme that best matches your experience and professional profile.",
      insights: ["✓ Matched 'Tech Leader' persona", "✓ Applied brand colors"],
      reportData: {
        time: '2.5 seconds', conf: '99%', output: 'Modern Professional Theme Selected',
        details: ['✓ Brand Colors Synced', '✓ Typography Paired', '✓ Spacing Adjusted'],
        reason: 'Based on your software engineering background and technical project portfolio.'
      }
    },
    { 
      id: 'deployment', name: 'Deployment Agent', icon: Rocket, desc: 'Provisioning files and compiling assets.', 
      tasks: ['Optimizing assets', 'Compressing images', 'Building production files', 'Preparing deployment'],
      thinking: "I'm preparing your portfolio for publishing by optimizing performance, generating static pages, and creating deployment-ready files.",
      insights: ["✓ Code minified", "✓ Assets optimized"],
      reportData: {
        time: '9.3 seconds', conf: '100%', output: 'Production Build Ready',
        details: ['✓ Built Production Files', '✓ Optimized Images', '✓ Generated Metadata', '✓ Prepared Deployment Package']
      }
    },
  ];

  useEffect(() => {
    let timer: any;
    if (!isFinished) {
      timer = setInterval(() => {
        setElapsedTime(prev => prev + 1);
        if (elapsedTime > 0 && elapsedTime % 5 === 0) {
          setSmartFactIndex(prev => (prev + 1) % smartFacts.length);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isFinished, elapsedTime, smartFacts.length]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `00:${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const addLog = (msg: string, agent: string) => {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    setLogs(prev => [...prev, { time, msg, agent }]);
  };

  useEffect(() => {
    if (isFinished) {
      setActiveStep(pipeline.length);
      addLog("Portfolio successfully generated.", "System");
      return;
    }

    if (activeStep === 0 && logs.length === 0) {
      addLog("Resume uploaded.", "System");
      addLog("Pipeline initialized.", "System");
    }

    let timer: any;
    if (activeStep < pipeline.length) {
      timer = setTimeout(() => {
        if (!isFinished) {
          addLog(`${pipeline[activeStep].name} completed successfully.`, pipeline[activeStep].name);
          setActiveStep(prev => prev + 1);
          if (activeStep + 1 < pipeline.length) {
            addLog(`${pipeline[activeStep + 1].name} started.`, pipeline[activeStep + 1].name);
          }
        }
      }, 3500 + Math.random() * 2000);
    }

    return () => clearTimeout(timer);
  }, [activeStep, isFinished, logs.length]);

  useEffect(() => {
    if (logsEndRef.current && !isFinished) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, isFinished]);

  const getAgentStatus = (idx: number) => {
    if (isFinished || idx < activeStep) return 'completed';
    if (idx === activeStep) return 'running';
    return 'waiting';
  };

  const getAgentProgress = (idx: number) => {
    if (isFinished || idx < activeStep) return 100;
    if (idx === activeStep) return Math.min(95, Math.floor((elapsedTime % 5) * 20 + Math.random() * 10));
    return 0;
  };

  const activeAgentInfo = pipeline[Math.min(activeStep, pipeline.length - 1)];

  return (
    <div className="fixed inset-0 z-50 bg-[#FAFAFC] overflow-y-auto font-sans text-[#111827]">
      <div className="max-w-[1400px] mx-auto px-6 py-10 min-h-screen flex flex-col">
        
        {/* HEADER */}
        {!showReport ? (
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                AI Agent Mission Control
              </h1>
              <p className="text-gray-500 mt-2">Watch your portfolio being created in real time by multiple specialized AI agents.</p>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Pipeline Status</span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border
                  ${isFinished ? 'bg-green-50 text-green-700 border-green-200' : 'bg-primary/10 text-primary-hover border-primary/20'}`}>
                  {isFinished ? <><Check className="w-3.5 h-3.5" /> Completed</> : <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Running</>}
                </span>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Elapsed Time</span>
                <span className="text-xl font-mono font-medium text-gray-900">{formatTime(elapsedTime)}</span>
              </div>
            </div>
          </div>
        ) : null}

        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div key="processing" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
              {/* COLUMN 1: PIPELINE TIMELINE */}
              <div className="lg:col-span-3 flex flex-col gap-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Pipeline Progress</h3>
                
                <div className="bg-white border border-border-subtle rounded-2xl shadow-sm p-6 relative h-full">
                  <div className="absolute left-[39px] top-10 bottom-10 w-0.5 bg-gray-100" />
                  
                  <div className="flex flex-col gap-6 relative">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center shrink-0 z-10">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="pt-1"><p className="font-semibold text-sm text-gray-900">Resume Uploaded</p></div>
                    </div>

                    {pipeline.map((agent, i) => {
                      const status = getAgentStatus(i);
                      return (
                        <div key={agent.id} className="flex items-start gap-4 group">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors duration-300
                            ${status === 'completed' ? 'bg-green-100 border-2 border-green-500 text-green-600' : 
                              status === 'running' ? 'bg-primary/20 border-2 border-primary text-primary shadow-[0_0_10px_rgba(212,165,116,0.3)]' : 
                              'bg-gray-50 border-2 border-gray-200 text-gray-400'}`}>
                            {status === 'completed' ? <Check className="w-4 h-4" /> : 
                             status === 'running' ? <Loader2 className="w-4 h-4 animate-spin" /> : 
                             <agent.icon className="w-4 h-4" />}
                          </div>
                          <div className="pt-1">
                            <p className={`font-semibold text-sm ${status === 'waiting' ? 'text-gray-400' : 'text-gray-900'}`}>{agent.name}</p>
                            {status === 'running' && (
                              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-primary mt-1 font-medium flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin"/> Processing...</motion.p>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    <div className="flex items-start gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors bg-gray-50 border-2 border-gray-200 text-gray-400`}>
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className="pt-1"><p className={`font-semibold text-sm text-gray-400`}>Portfolio Ready</p></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* COLUMN 2: LIVE AGENT CARDS */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Active Multi-Agent Swarm</h3>
                <div className="flex flex-col gap-4 overflow-y-auto pr-2 no-scrollbar" style={{maxHeight: 'calc(100vh - 200px)'}}>
                  {pipeline.map((agent, i) => {
                    const status = getAgentStatus(i);
                    const progress = getAgentProgress(i);
                    return (
                      <motion.div key={agent.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className={`bg-white border border-border-subtle p-5 shadow-sm transition-all duration-300
                          ${status === 'running' ? 'border-primary/20 ring-2 ring-primary/10 shadow-md transform -translate-y-1' : ''}`}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                              ${status === 'completed' ? 'bg-green-50 text-green-600' : 
                                status === 'running' ? 'bg-primary/10 text-primary' : 'bg-gray-50 text-gray-400'}`}>
                              <agent.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900">{agent.name}</h4>
                              <p className="text-xs text-gray-500">{agent.desc}</p>
                            </div>
                          </div>
                          <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest
                            ${status === 'completed' ? 'bg-green-100 text-green-700' : 
                              status === 'running' ? 'bg-primary/20 text-primary-hover animate-pulse' : 'bg-gray-100 text-gray-500'}`}>
                            {status}
                          </span>
                        </div>
                        {status === 'running' && (
                          <div className="mt-4 space-y-4">
                            <div className="space-y-1.5">
                              <div className="flex justify-between text-xs font-medium">
                                <span className="text-gray-500">Execution Progress</span>
                                <span className="text-primary">{progress}%</span>
                              </div>
                              <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                <motion.div className="h-full bg-primary rounded-full" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ ease: "linear" }} />
                              </div>
                            </div>
                          </div>
                        )}
                        {status === 'completed' && (
                          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-xs">
                            <span className="text-gray-500 flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500" /> Finished in ~{(4 + Math.random()*2).toFixed(1)}s</span>
                            <span className="font-mono text-gray-400">100%</span>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* COLUMN 3: AI THINKING, LOGS & SUMMARY */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                <motion.div key="thinking" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-6 h-full">
                   <div className="bg-white border border-border-subtle p-6 shadow-md flex-1 relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-primary-hover" />
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100">
                        <BrainCircuit className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 leading-tight">AI Thinking</h3>
                        <p className="text-xs text-gray-500 font-medium">{activeAgentInfo.name}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 border border-border-subtle rounded-xl p-4 mb-5 relative min-h-[80px]">
                      <motion.p key={activeAgentInfo.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-gray-700 italic leading-relaxed">
                        "<TypewriterText text={activeAgentInfo.thinking} />"
                      </motion.p>
                    </div>
                    <div className="mb-5">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Current Tasks</h4>
                      <div className="space-y-2.5">
                        {activeAgentInfo.tasks.map((task, idx) => {
                          const isDone = idx < (elapsedTime % activeAgentInfo.tasks.length);
                          const isCurrent = idx === (elapsedTime % activeAgentInfo.tasks.length);
                          return (
                            <div key={idx} className="flex items-start gap-2.5">
                              {isDone ? <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> : isCurrent ? <Loader2 className="w-4 h-4 text-primary animate-spin shrink-0 mt-0.5" /> : <div className="w-4 h-4 rounded-full border-2 border-gray-200 shrink-0 mt-0.5" />}
                              <span className={`text-sm ${isDone ? 'text-gray-500 line-through' : isCurrent ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>{task}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div className="pt-5 border-t border-gray-100">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Agent Insights</h4>
                      <div className="flex flex-col gap-1.5">
                        {activeAgentInfo.insights.map((insight, idx) => (
                          <span key={idx} className="text-xs font-medium text-indigo-700 bg-indigo-50 px-2 py-1 rounded-md w-fit">{insight}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
                      <Lightbulb className="w-5 h-5 text-amber-500 mb-2" />
                      <div>
                        <h4 className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1">Smart Fact</h4>
                        <motion.p key={smartFactIndex} initial={{opacity:0}} animate={{opacity:1}} className="text-xs text-amber-900 font-medium leading-relaxed">{smartFacts[smartFactIndex]}</motion.p>
                      </div>
                    </div>
                     <div className="bg-white border border-border-subtle rounded-2xl p-4 shadow-sm">
                      <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Confidence Scores</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs"><span className="text-gray-600">Content Quality</span><span className="font-bold text-green-600">96%</span></div>
                        <div className="flex justify-between items-center text-xs"><span className="text-gray-600">Completeness</span><span className="font-bold text-green-600">94%</span></div>
                        <div className="flex justify-between items-center text-xs"><span className="text-gray-600">SEO Readiness</span><span className="font-bold text-green-600">95%</span></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            /* FINISHED STATE - EITHER SUCCESS HEADER OR REPORT */
            <motion.div key="finished-container" initial={{opacity:0}} animate={{opacity:1}} className="w-full max-w-5xl mx-auto flex flex-col items-center">
              
              {!showReport ? (
                /* SUCCESS HEADER */
                <div className="w-full bg-white border border-border-subtle p-12 text-center shadow-lg flex flex-col items-center">
                     <div className="w-24 h-24 rounded-full bg-green-50 border-8 border-green-100/40 text-green-500 flex items-center justify-center mb-8 mx-auto shadow-lg flex items-center justify-center mb-8 mx-auto shadow-lg">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">🎉 Portfolio Successfully Generated</h2>
                  <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto">Your AI agent team has completed building your professional portfolio.</p>
                  
                  <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                    <button onClick={onView} className="px-8 py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-all shadow-lg flex items-center gap-2"><Eye className="w-5 h-5"/> View Portfolio</button>
                    <button onClick={onDeploy} className="px-8 py-4 bg-gray-900 hover:bg-black text-white font-semibold rounded-xl transition-all shadow-lg flex items-center gap-2"><Rocket className="w-5 h-5"/> Deploy Portfolio</button>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
                    <button onClick={onDownload} className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold border border-gray-200 rounded-xl transition-all flex items-center gap-2"><Download className="w-4 h-4"/> Download Portfolio</button>
                                          <button onClick={onView} className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 dark:text-slate-100 font-semibold border border-gray-200 rounded-xl transition-all flex items-center gap-2"><Edit3 className="w-4 h-4"/> Edit Portfolio</button>
                  </div>

                  <div className="pt-8 border-t border-gray-100 w-full max-w-2xl mx-auto">
                    <button onClick={() => setShowReport(true)} className="px-6 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl transition-all flex items-center gap-2 mx-auto border border-indigo-200">
                      <FileCheck className="w-5 h-5" /> View AI Generation Report
                    </button>
                  </div>
                </div>
              ) : (
                /* AI GENERATION REPORT */
                <div className="w-full animate-fade-in text-left">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
                        <FileCheck className="w-8 h-8 text-primary" /> AI Generation Report
                      </h2>
                      <p className="text-gray-500 mt-2">Comprehensive audit of multi-agent activities.</p>
                    </div>
                    <button onClick={() => setShowReport(false)} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
                      Back to Summary
                    </button>
                  </div>

                  {/* Overview Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {[
                      { label: 'Generation Time', val: '2m 14s' },
                      { label: 'Overall Success', val: '100%', color: 'text-green-600' },
                      { label: 'Agents Completed', val: '6 / 6' },
                      { label: 'Theme Selected', val: 'Modern' },
                      { label: 'Readability', val: '96%', color: 'text-green-600' },
                      { label: 'SEO Readiness', val: '95%', color: 'text-green-600' },
                      { label: 'Accessibility', val: '98%', color: 'text-green-600' },
                      { label: 'Pages Generated', val: '6' },
                    ].map((s, i) => (
                       <div key={i} className="bg-white border border-border-subtle rounded-xl p-5 shadow-sm">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{s.label}</p>
                        <p className={`text-2xl font-bold ${s.color || 'text-gray-900'}`}>{s.val}</p>
                      </div>
                    ))}
                  </div>

                  {/* Detailed Agent Execution Report */}
                  <div className="mb-12">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Agent Execution Report</h3>
                    <div className="space-y-4">
                      {pipeline.map(agent => (
                         <div key={agent.id} className="bg-white border border-border-subtle overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                          <div 
                            className="p-5 flex items-center justify-between cursor-pointer bg-gray-50/50"
                            onClick={() => setExpandedAgent(expandedAgent === agent.id ? null : agent.id)}
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center text-green-600">
                                <agent.icon className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-900 text-lg">{agent.name}</h4>
                                <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> {agent.reportData.time}</span>
                                  <span className="flex items-center gap-1 text-green-600"><CheckCircle2 className="w-3.5 h-3.5"/> Completed</span>
                                  <span className="flex items-center gap-1"><Activity className="w-3.5 h-3.5"/> Conf: {agent.reportData.conf}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-gray-400">
                              {expandedAgent === agent.id ? <ChevronUp /> : <ChevronDown />}
                            </div>
                          </div>
                          
                          <AnimatePresence>
                            {expandedAgent === agent.id && (
                               <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-gray-200">
                                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white">
                                    
                                   <div>
                                     <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Tasks Completed</h5>
                                     <div className="space-y-2">
                                       {agent.reportData.details.map((task, i) => (
                                         <p key={i} className="text-sm text-gray-700 flex items-center gap-2 font-medium">
                                           <span className="text-green-500 font-bold">{task.split(' ')[0]}</span> {task.split(' ').slice(1).join(' ')}
                                         </p>
                                       ))}
                                     </div>
                                   </div>

                                   <div className="space-y-6">
                                     <div>
                                       <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Output Produced</h5>
                                       <p className="text-sm font-medium text-indigo-700 bg-indigo-50 px-4 py-3 rounded-lg border border-indigo-100">
                                         {agent.reportData.output}
                                       </p>
                                     </div>
                                     
                                     {agent.reportData.reason && (
                                       <div>
                                         <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Reasoning</h5>
                                         <p className="text-sm text-gray-600 italic bg-gray-50 px-4 py-3 rounded-lg">{agent.reportData.reason}</p>
                                       </div>
                                     )}

                                     {agent.reportData.beforeAfter && (
                                       <div>
                                         <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Enhancement Example</h5>
                                         <div className="flex flex-col gap-2 text-sm">
                                           <div className="bg-red-50 text-red-800 p-3 rounded-lg border border-red-100 line-through opacity-80">
                                             {agent.reportData.beforeAfter.before}
                                           </div>
                                           <div className="bg-green-50 text-green-800 p-3 rounded-lg border border-green-100 font-medium">
                                             {agent.reportData.beforeAfter.after}
                                           </div>
                                         </div>
                                       </div>
                                     )}
                                   </div>

                                </div>
                               </motion.div>
                             )}
                           </AnimatePresence>
                         </div>
                      ))}
                    </div>
                  </div>

                  {/* AI TIMELINE */}
                  <div className="mb-12">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">AI Generation Timeline</h3>
                    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                      <div className="relative border-l-2 border-gray-100 ml-4 space-y-8">
                        {[
                          { t: '10:12:14', l: 'Resume Uploaded' },
                          { t: '10:12:15', l: 'Resume Parsed' },
                          { t: '10:12:21', l: 'Content Enhanced' },
                          { t: '10:12:34', l: 'Portfolio Planned' },
                          { t: '10:12:58', l: 'Design Generated' },
                          { t: '10:13:20', l: 'Theme Applied' },
                          { t: '10:13:44', l: 'Deployment Prepared' },
                          { t: '10:14:02', l: 'Portfolio Completed' }
                        ].map((event, i) => (
                          <div key={i} className="relative pl-8">
                            <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1.5 ring-4 ring-white" />
                            <div className="flex flex-col">
                              <span className="text-xs font-mono font-bold text-gray-400">{event.t}</span>
                              <span className="text-sm font-semibold text-gray-900">{event.l}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* DOWNLOAD & FINAL MESSAGE */}
                   <div className="bg-indigo-900 rounded-3xl p-10 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 border border-indigo-700/30">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary blur-3xl opacity-20 rounded-full" />
                    
                    <div className="max-w-xl z-10">
                      <h3 className="text-2xl font-bold mb-4">Complete Transparency</h3>
                      <p className="text-indigo-200 leading-relaxed mb-6">
                        Your portfolio has been successfully created by a team of specialized AI agents working together. 
                        Every section has been analyzed, enhanced, organized, designed, and prepared for deployment.
                        Thank you for using FolioAI.
                      </p>
                      <div className="flex items-center gap-4">
                        <button onClick={() => alert('PDF report download will begin shortly.')} className="px-6 py-3 bg-white text-indigo-900 font-bold rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
                          <Download className="w-5 h-5"/> Download PDF Report
                        </button>
                        <button onClick={() => alert('ZIP download will begin shortly.')} className="px-6 py-3 bg-indigo-800 text-white font-bold rounded-xl hover:bg-indigo-700 border border-indigo-700 transition-colors flex items-center gap-2">
                          <FileCode2 className="w-5 h-5"/> Download ZIP
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 w-full z-10 flex justify-end">
                      <button onClick={onView} className="px-8 py-5 bg-primary hover:bg-primary-hover text-white text-lg font-bold rounded-xl shadow-2xl flex items-center gap-3">
                        Open Portfolio <ExternalLink className="w-6 h-6"/>
                      </button>
                    </div>
                  </div>

                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
