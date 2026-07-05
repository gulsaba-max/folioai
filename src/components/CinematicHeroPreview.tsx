import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, CheckCircle, BrainCircuit, ScanSearch, Code, Layout, Sparkles, User, Briefcase, GraduationCap, Github, Linkedin, Mail } from 'lucide-react';

export function CinematicHeroPreview() {
  const [phase, setPhase] = useState(0); // 0: Resume, 1: Scan, 2: Agent Control, 3: Transformation, 4: Final, 5: Reset
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax & Spotlight effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const rotateX = (mousePosition.y - 350) * -0.01;
  const rotateY = (mousePosition.x - 500) * 0.01;

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (phase === 0) {
      // Hold initial resume for 1s
      timeout = setTimeout(() => setPhase(1), 1000);
    } else if (phase === 1) {
      // Scanning phase takes 2s
      timeout = setTimeout(() => setPhase(2), 2000);
    } else if (phase === 2) {
      // Agent control takes 1.5s
      timeout = setTimeout(() => setPhase(3), 1500);
    } else if (phase === 3) {
      // Transformation takes 1s
      timeout = setTimeout(() => setPhase(4), 1000);
    } else if (phase === 4) {
      // Hold final portfolio for 4s
      timeout = setTimeout(() => setPhase(5), 4000);
    } else if (phase === 5) {
      // Reset immediately
      setPhase(0);
    }

    return () => clearTimeout(timeout);
  }, [phase]);

  return (
    <div 
      className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-bg-base perspective-[2000px] group"
      style={{ height: '700px' }}
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      {/* Ambient Backlight Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 opacity-50 blur-3xl z-0" />
      
      {/* Mouse Spotlight */}
      <div 
        className="absolute pointer-events-none z-10 rounded-full blur-[100px] opacity-30 mix-blend-screen transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
          width: '600px',
          height: '600px',
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
        }}
      />

      <motion.div 
        className="w-full h-full relative z-20 flex flex-col bg-white overflow-hidden rounded-2xl border border-white/10"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        {/* Browser Header */}
        <div className="bg-gray-50/90 backdrop-blur-md border-b border-border-subtle px-4 py-3 flex items-center justify-between shrink-0 relative z-50">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400 shadow-sm border border-black/10"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400 shadow-sm border border-black/10"></div>
            <div className="w-3 h-3 rounded-full bg-green-400 shadow-sm border border-black/10"></div>
          </div>
          <motion.div 
            className="bg-white border border-border-subtle rounded-md px-4 py-1 text-xs text-text-muted flex items-center gap-2 font-mono shadow-sm absolute left-1/2 -translate-x-1/2"
            animate={{ width: phase >= 3 ? '220px' : '180px' }}
          >
            <Search className="w-3 h-3" /> 
            {phase >= 3 ? 'johndoe.folioai.com' : 'folioai.com/preview'}
          </motion.div>
          <div className="w-10"></div>
        </div>

        {/* Browser Body Area */}
        <div className="flex-1 relative bg-[#F8FAFC] overflow-hidden">
          
          {/* ==========================================
              PHASE 0 & 1: RESUME & SCANNING
          ========================================== */}
          <AnimatePresence>
            {(phase === 0 || phase === 1 || phase === 2) && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center p-8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                {/* Resume Document Wrapper */}
                <div className="w-full max-w-2xl bg-white shadow-xl rounded-lg p-10 border border-gray-100 relative overflow-hidden h-[500px]">
                  
                  {/* Fake Resume Content */}
                  <div className="space-y-6 opacity-70">
                    <div className="border-b pb-4">
                      <div className="h-6 w-1/3 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 w-1/4 bg-gray-100 rounded mb-2"></div>
                      <div className="h-3 w-1/2 bg-gray-50 rounded"></div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 w-full bg-gray-100 rounded"></div>
                      <div className="h-3 w-full bg-gray-100 rounded"></div>
                      <div className="h-3 w-4/5 bg-gray-100 rounded"></div>
                    </div>

                    <div className="space-y-4">
                      <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                      {[1, 2].map(i => (
                        <div key={i} className="pl-4 border-l-2 border-gray-100 space-y-2">
                          <div className="h-3 w-1/3 bg-gray-200 rounded"></div>
                          <div className="h-3 w-1/4 bg-gray-100 rounded"></div>
                          <div className="h-2 w-full bg-gray-50 rounded"></div>
                          <div className="h-2 w-5/6 bg-gray-50 rounded"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Laser Scan Effect (Phase 1+) */}
                  {phase >= 1 && (
                    <motion.div 
                      className="absolute left-0 right-0 h-32 pointer-events-none z-20"
                      initial={{ top: '-20%' }}
                      animate={{ top: '120%' }}
                      transition={{ duration: 2, ease: "linear" }}
                      style={{
                        background: 'linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.1) 80%, rgba(59, 130, 246, 0.8) 100%)',
                        borderBottom: '2px solid #3b82f6',
                        boxShadow: '0 10px 20px rgba(59, 130, 246, 0.2)'
                      }}
                    >
                      {/* Scanning flare */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-white blur-[2px] opacity-80" />
                    </motion.div>
                  )}

                  {/* Floating Micro-labels (Phase 1+) */}
                  {phase >= 1 && (
                    <>
                      <MicroLabel delay={0.2} top="15%" left="-5%" icon={User} text="Parsing Profile" />
                      <MicroLabel delay={0.6} top="40%" right="-5%" icon={Code} text="Extracting Skills" />
                      <MicroLabel delay={1.0} top="65%" left="-10%" icon={Briefcase} text="Analyzing Experience" />
                      <MicroLabel delay={1.4} top="85%" right="-8%" icon={Layout} text="Detecting Projects" />
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ==========================================
              PHASE 2: MISSION CONTROL OVERLAY
          ========================================== */}
          <AnimatePresence>
            {(phase === 2 || phase === 3) && (
              <motion.div
                className="absolute top-6 right-6 w-72 bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl p-5 z-40"
                initial={{ opacity: 0, x: 50, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-4 border-b border-slate-700/50 pb-3">
                  <BrainCircuit className="w-5 h-5 text-indigo-400" />
                  <span className="text-sm font-semibold text-slate-100 uppercase tracking-wider">Multi-Agent System</span>
                </div>
                <div className="space-y-3">
                  <AgentTask name="Resume Parser" status="complete" />
                  <AgentTask name="Skills Analyzer" status="complete" delay={0.1} />
                  <AgentTask name="Project Extractor" status="complete" delay={0.2} />
                  <AgentTask name="Design Generator" status={phase === 3 ? "complete" : "working"} delay={0.3} />
                  <AgentTask name="Portfolio Builder" status={phase >= 3 ? "complete" : "working"} delay={0.4} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>


          {/* ==========================================
              PHASE 4: FINAL PORTFOLIO REVEAL
          ========================================== */}
          <AnimatePresence>
            {(phase >= 4) && (
              <motion.div 
                className="absolute inset-0 bg-white z-30"
                initial={{ opacity: 0, clipPath: 'circle(0% at 50% 50%)' }}
                animate={{ opacity: 1, clipPath: 'circle(150% at 50% 50%)' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Beautiful Mock Portfolio */}
                <div className="w-full h-full overflow-y-auto custom-scrollbar p-12">
                  <div className="max-w-4xl mx-auto space-y-16">
                    
                    {/* Hero Section */}
                    <motion.div 
                      className="flex items-center gap-10"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-lg border-4 border-white flex items-center justify-center shrink-0">
                        <span className="text-4xl text-white font-bold">JD</span>
                      </div>
                      <div className="space-y-3">
                        <h1 className="text-4xl font-bold text-slate-900">John Doe</h1>
                        <p className="text-xl text-slate-500">Senior Full Stack Engineer & Designer</p>
                        <div className="flex gap-4 pt-2">
                          <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full"><Github className="w-4 h-4"/> GitHub</div>
                          <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full"><Linkedin className="w-4 h-4"/> LinkedIn</div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Stats & Skills */}
                    <motion.div 
                      className="grid grid-cols-3 gap-6"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind', 'GraphQL'].map((skill, i) => (
                        <div key={skill} className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col justify-center items-center gap-2 shadow-sm hover:-translate-y-1 transition-transform cursor-pointer">
                          <Code className="w-6 h-6 text-indigo-500" />
                          <span className="font-semibold text-slate-700 text-sm">{skill}</span>
                        </div>
                      ))}
                    </motion.div>

                    {/* Projects */}
                    <motion.div 
                      className="space-y-6"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                    >
                      <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">Featured Projects</h2>
                      <div className="grid grid-cols-2 gap-6">
                        {[1, 2].map(i => (
                          <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-full h-32 bg-slate-100 rounded-lg mb-4"></div>
                            <h3 className="font-bold text-lg mb-2">E-Commerce Platform V{i}</h3>
                            <p className="text-sm text-slate-500 mb-4 line-clamp-2">A high-performance modern e-commerce platform with real-time inventory tracking and AI recommendations.</p>
                            <div className="flex gap-2">
                              <span className="text-xs font-medium bg-indigo-50 text-indigo-600 px-2 py-1 rounded">React</span>
                              <span className="text-xs font-medium bg-indigo-50 text-indigo-600 px-2 py-1 rounded">Node.js</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                  </div>
                </div>

                {/* Success Badge */}
                <motion.div 
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl z-50 border border-white/10"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, type: "spring" }}
                >
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span className="font-medium text-sm">Portfolio Generated Successfully</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>
    </div>
  );
}

// -------------------------------------------------------------
// Helper Components for the Cinematic Animation
// -------------------------------------------------------------

function MicroLabel({ delay, top, left, right, icon: Icon, text }: any) {
  return (
    <motion.div 
      className="absolute bg-white px-3 py-1.5 rounded-full shadow-lg border border-gray-100 flex items-center gap-2 z-30"
      style={{ top, left, right }}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
        <Icon className="w-3 h-3 text-blue-500" />
      </div>
      <span className="text-xs font-semibold text-slate-700">{text}</span>
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.8 }}
      >
        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 ml-1" />
      </motion.div>
    </motion.div>
  );
}

function AgentTask({ name, status, delay = 0 }: { name: string, status: 'working' | 'complete', delay?: number }) {
  return (
    <motion.div 
      className="flex items-center justify-between"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      <span className="text-xs text-slate-300 font-medium">{name}</span>
      {status === 'complete' ? (
        <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-sm">
          <CheckCircle className="w-3 h-3" /> Complete
        </span>
      ) : (
        <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-sm">
          <ScanSearch className="w-3 h-3 animate-spin" /> Working
        </span>
      )}
    </motion.div>
  );
}
