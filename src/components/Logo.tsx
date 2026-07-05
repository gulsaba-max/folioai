import React from "react";

interface LogoProps {
  className?: string;
  variant?: "full" | "minimal";
}

export function LogoMinimal({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8cba8" />
          <stop offset="100%" stopColor="#d4a574" />
        </linearGradient>
        <linearGradient id="accentGrad" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#a99d8f" />
          <stop offset="100%" stopColor="#8b7d6b" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Background shape - rounded document/portfolio */}
      <rect x="10" y="10" width="80" height="80" rx="24" fill="url(#primaryGrad)" />
      
      {/* Inner stylized F / Robot outline */}
      <path 
        d="M 30 35 C 30 25, 70 25, 70 35 L 70 45 C 70 55, 30 55, 30 45 Z" 
        fill="white" 
        opacity="0.2"
      />
      <rect x="35" y="30" width="30" height="8" rx="4" fill="white" />
      <rect x="35" y="45" width="20" height="8" rx="4" fill="white" />
      <rect x="35" y="60" width="30" height="8" rx="4" fill="white" />
      
      {/* Robot Eye accent */}
      <circle cx="65" cy="49" r="3" fill="#080B1A" />
      <circle cx="65" cy="34" r="3" fill="#080B1A" />
    </svg>
  );
}

export function Logo({ className = "h-12", variant = "full" }: LogoProps) {
  if (variant === "minimal") {
    return <LogoMinimal className={className} />;
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoMinimal className="w-10 h-10 shrink-0" />
      <div className="flex flex-col">
        <span className="font-heading font-bold text-xl tracking-tight text-text-main">
          Folio<span className="text-primary">AI</span>
        </span>
        <span className="text-xs text-text-muted font-medium">From Resume to Remarkable</span>
      </div>
    </div>
  );
}
