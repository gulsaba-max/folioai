export type PortfolioImage = {
  url?: string;
  dataUrl?: string;
  fileKey?: string;
  alt: string;
  width?: number;
  height?: number;
  aspectRatio?: number;
  blurDataURL?: string;
  caption?: string;
  priority?: boolean;
};

export type ResumeWithImages = {
  basics: {
    name: string;
    picture?: PortfolioImage;
    coverImage?: PortfolioImage;
  };
  projects: Array<{
    title: string;
    thumbnail?: PortfolioImage;
    gallery?: PortfolioImage[];
  }>;
  experience: Array<{
    company: string;
    logo?: PortfolioImage;
  }>;
  education: Array<{
    institution: string;
    logo?: PortfolioImage;
  }>;
  certifications: Array<{
    name: string;
    badge?: PortfolioImage;
  }>;
};

export function toPortfolioImage(src?: string, alt = "Portfolio image"): PortfolioImage {
  const isDataUrl = Boolean(src?.startsWith("data:"));
  return {
    ...(isDataUrl ? { dataUrl: src } : { url: src }),
    alt,
  };
}
