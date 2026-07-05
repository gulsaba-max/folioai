import type { PortfolioImage } from "../lib/image-schema";

type ImageFallbackProps = {
  kind: "portrait" | "landscape" | "square" | "cover" | "avatar" | "logo";
  className?: string;
  rounded?: number;
  label?: string;
};

const aspect = {
  portrait: "3/4",
  landscape: "16/9",
  square: "1/1",
  cover: "21/9",
  avatar: "1/1",
  logo: "2/1",
};

export function ImageFallback({ kind, className = "", rounded, label }: ImageFallbackProps) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center ${className}`}
      style={{ aspectRatio: aspect[kind], borderRadius: rounded }}
      role="img"
      aria-label={label || `Placeholder (${kind})`}
    >
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-300">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      {label && <span className="absolute bottom-2 left-2 text-[10px] text-gray-400">{label}</span>}
    </div>
  );
}
