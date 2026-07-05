import type { PortfolioImage } from "./image-schema";

export function resolveFileKey(fileKey?: string): string {
  if (!fileKey) return "";
  return "";
}

export function generateBlurPlaceholder(_image?: PortfolioImage): string {
  return "data:image/gif;base64,R0lGODlhAQABAIAAANbt7v///yH5BAEAAAEALAAAAAABAAEAAAICRAEAOw==";
}

export function defaultAspect(kind: string): number {
  return {
    portrait: 3/4,
    landscape: 16/9,
    square: 1,
    cover: 21/9,
    avatar: 1,
    logo: 2,
  }[kind] ?? 16/9;
}
