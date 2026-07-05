import React from 'react';

export function PortfolioWireframe({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full max-w-3xl mx-auto bg-white rounded-xl border border-border-subtle shadow-sm overflow-hidden ${className}`}>
      {/* Browser Header */}
      <div className="bg-gray-50/80 border-b border-border-subtle px-4 py-3 flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-amber-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-white border border-border-subtle rounded-md px-3 py-1 text-[11px] text-text-muted flex items-center gap-1.5 shadow-sm min-w-[200px] justify-center">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            folioai.com/preview
          </div>
        </div>
        <div className="w-10"></div>
      </div>
      
      {/* Browser Body (Wireframe) */}
      <div className="p-8 flex gap-8">
        {/* Left Sidebar */}
        <div className="w-1/3 flex flex-col gap-4 border-r border-border-subtle/50 pr-8">
          <div className="w-24 h-24 rounded-full bg-gray-100 mb-4"></div>
          <div className="w-full h-5 rounded bg-gray-200"></div>
          <div className="w-2/3 h-4 rounded bg-gray-100 mb-6"></div>
          
          <div className="w-full h-3 rounded bg-gray-50"></div>
          <div className="w-4/5 h-3 rounded bg-gray-50"></div>
          <div className="w-full h-3 rounded bg-gray-50"></div>
        </div>
        
        {/* Right Content */}
        <div className="w-2/3 flex flex-col gap-6">
          <div className="w-full h-48 rounded-xl bg-gray-50 border border-gray-100"></div>
          <div className="flex gap-6">
            <div className="flex-1 h-32 rounded-xl bg-gray-50 border border-gray-100"></div>
            <div className="flex-1 h-32 rounded-xl bg-gray-50 border border-gray-100"></div>
            <div className="flex-1 h-32 rounded-xl bg-gray-50 border border-gray-100"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
