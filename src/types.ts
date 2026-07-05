/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { PortfolioImage } from "./lib/image-schema";

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  image?: string;
  thumbnail?: PortfolioImage;
  gallery?: PortfolioImage[];
  role?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface DesignSettings {
  theme: 'minimal' | 'glass' | 'developer' | 'futuristic' | 'creative' | 'corporate' | 'startup' | 'cyberpunk' | 'agency' | 'luxury' | 'editorial' | 'engineer' | 'bento' | 'brutalist' | 'aurora' | 'atelier' | 'mono-lux' | 'vibrant' | 'architectural' | 'vintage-modern';
  mode: 'light' | 'dark';
  colorPalette: string;
  fontSans: string;
  fontMono: string;
  showSocialFeed: boolean;
  layoutReorder: string[];
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
}

export interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export interface Portfolio {
  id: string;
  userId: string;
  slug: string;
  name: string;
  title: string;
  bio: string;
  contactEmail: string;
  contactPhone?: string;
  location?: string;
  avatarUrl?: string;
  picture?: PortfolioImage;
  skills: string[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  certifications?: Certification[];
  designSettings: DesignSettings;
  socialLinks: SocialLinks;
  customDomain?: string;
  seo: SEOSettings;
  socialFeedSelected: 'github' | 'twitter' | 'linkedin' | 'instagram' | 'none';
  contactSubmissions: ContactSubmission[];
}

export interface AnalyticsEvent {
  id: string;
  portfolioId: string;
  type: 'pageview' | 'click' | 'contact_form' | 'social_click';
  timestamp: string;
  country: string;
  browser: string;
  os: string;
}

export interface User {
  id: string;
  email: string;
  mfaEnabled: boolean;
  mfaCodeSecret?: string; // Mock authenticator key
  subscriptionTier: 'free' | 'premium' | 'ultimate';
  billingHistory: Array<{
    date: string;
    amount: number;
    plan: string;
    invoiceId: string;
    status: 'paid' | 'pending';
  }>;
}

export interface SocialFeedPost {
  id: string;
  platform: 'github' | 'twitter' | 'linkedin' | 'instagram';
  author: string;
  text: string;
  timestamp: string;
  likes?: number;
  shares?: number;
  url?: string;
}
