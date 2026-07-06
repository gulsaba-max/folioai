/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Sparkles, Send, Bot, Check, HelpCircle, X, ShieldAlert } from "lucide-react";

interface AIAssistantModalProps {
  currentPortfolio: any;
  onUpdatePortfolio: (newPortfolio: any) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function AIAssistantModal({ currentPortfolio, onUpdatePortfolio, isOpen, onClose }: AIAssistantModalProps) {
  const [chatPrompt, setChatPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const samplePrompts = [
    "Make my bio sound highly outcome-focused and professional.",
    "Add Tailwind, TypeScript, and Docker elements to my projects lists.",
    "Order the portfolio by showcasing projects first, then work experiences.",
    "Set the design theme to editorial with sky color palette and Playfair Display font.",
    "Make the experience achievements sound more metrics-driven with specific business figures."
  ];

  const handleAICustomize = async (promptText: string) => {
    if (!promptText.trim()) return;
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ai-chat-customize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPortfolio, chatPrompt: promptText })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "AI Customizer failed to update portfolio parameters");
      }

      onUpdatePortfolio(data);
      setSuccess(true);
      setChatPrompt("");
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Model failed to interpret edit instruction.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div id="ai-panel-wrapper" className="fixed inset-y-0 right-0 w-full sm:w-96 bg-slate-900 border-l border-slate-800 shadow-2xl z-50 flex flex-col justify-between font-sans text-slate-100">
      
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
            <Bot className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight text-text-main">FolioAI Brand Assistant</h3>
            <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider">AI Integration Active</span>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-text-main"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow p-5 overflow-y-auto space-y-6">
        
        {/* Intro Banner */}
        <div className="bg-slate-950/45 p-4 rounded-xl border border-slate-800">
          <p className="text-xs text-slate-400 leading-relaxed">
            I can automatically restructure sections, optimize resume parameters, draft achievements, suggest customized color schemes, or inject industry keywords to align the portfolio with your dream jobs.
          </p>
        </div>

        {error && (
          <div className="bg-red-950/40 p-3.5 rounded-lg border border-red-500/30 text-red-200 text-xs flex gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-emerald-500/30 p-3.5 rounded-lg border border-emerald-500/30 text-emerald-200 text-xs flex gap-2">
            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>AI customizer updated the schema and reordered coordinates dynamically! Check preview.</span>
          </div>
        )}

        {/* Suggested Prompts Block */}
        <div className="space-y-2.5">
          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-sky-400" /> Suggested Guidelines
          </label>
          <div className="space-y-1.5">
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleAICustomize(prompt)}
                className="w-full text-left p-2.5 bg-slate-800/60 hover:bg-slate-800 rounded-lg text-[11px] leading-relaxed text-slate-300 transition-colors border border-slate-700/50 hover:border-slate-600/80"
              >
                "{prompt}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lower Input Box */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleAICustomize(chatPrompt);
          }}
          className="relative"
        >
          <input
            id="ai-prompt-input"
            type="text"
            value={chatPrompt}
            onChange={(e) => setChatPrompt(e.target.value)}
            disabled={loading}
            placeholder={loading ? "Generating layout elements..." : "Ask AI to change layout details..."}
            className="w-full pl-3.5 pr-10 py-3 bg-slate-900 border border-slate-750 focus:border-emerald-500 rounded-xl text-xs outline-none transition-all text-slate-200 focus:ring-1 focus:ring-emerald-500"
          />
          <button
            type="submit"
            disabled={loading || !chatPrompt.trim()}
            className="absolute right-2.5 top-2.5 p-1.5 bg-emerald-500 text-slate-950 hover:bg-emerald-400 disabled:opacity-30 disabled:hover:bg-emerald-500 rounded-lg transition-all"
            title="Send layout instructions"
          >
            {loading ? (
              <span className="flex h-3.5 w-3.5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
          </button>
        </form>
        <p className="text-[10px] text-center text-slate-500 mt-2 font-mono">
          Interactive components and metadata align automatically.
        </p>
      </div>

    </div>
  );
}
