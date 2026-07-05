import { useState, useEffect } from "react";
import { ImageFallback } from "./ImageFallback";
import { resolveFileKey, generateBlurPlaceholder, defaultAspect } from "../lib/image-utils";
import type { PortfolioImage } from "../lib/image-schema";

type SmartImageProps = {
  image?: PortfolioImage;
  fallback?: "portrait" | "landscape" | "square" | "cover" | "avatar" | "logo";
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: number;
  objectFit?: "cover" | "contain" | "fill";
  alt?: string;
};

export function SmartImage({
  image,
  fallback = "cover",
  className = "",
  imgClassName = "",
  sizes = "100vw",
  priority = false,
  rounded,
  objectFit = "cover",
  alt,
}: SmartImageProps) {
  const [errored, setErrored] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [debug, setDebug] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setDebug(params.get("debug") === "images");
  }, []);

  if (!image || (!image.url && !image.dataUrl && !image.fileKey) || errored) {
    return (
      <ImageFallback
        kind={fallback}
        className={className}
        rounded={rounded}
        label={errored ? "image unavailable" : undefined}
      />
    );
  }

  const src = image.url ?? image.dataUrl ?? resolveFileKey(image.fileKey);
  const isDataUrl = Boolean(image.dataUrl);
  const aspectRatio = image.aspectRatio ?? (image.width && image.height ? image.width / image.height : defaultAspect(fallback));
  const blur = image.blurDataURL ?? generateBlurPlaceholder(image);
  const sourceType = image.url ? "url" : image.dataUrl ? "dataUrl" : image.fileKey ? "fileKey" : "fallback";

  return (
    <div
      className={`relative overflow-hidden bg-gray-100 ${className} ${debug ? "outline outline-1 outline-red-500" : ""}`}
      style={{ aspectRatio: String(aspectRatio), borderRadius: rounded }}
      data-img-source={debug ? sourceType : undefined}
    >
      {debug && (
        <span className="absolute top-1 left-1 z-10 text-[10px] bg-red-500 text-white px-1 rounded">
          {sourceType}
        </span>
      )}
      <img
        src={src}
        alt={alt || image.alt || "Portfolio image"}
        loading={priority ? "eager" : "lazy"}
        onError={() => setErrored(true)}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-${objectFit} ${imgClassName} ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
        style={{
          aspectRatio: String(aspectRatio),
          ...(blur && !loaded ? { filter: "blur(20px)", transform: "scale(1.05)" } : {}),
        }}
      />
      {!loaded && blur && (
        <img
          src={blur}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ aspectRatio: String(aspectRatio) }}
        />
      )}
    </div>
  );
}
