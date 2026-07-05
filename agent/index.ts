/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * FolioAI — ADK Multi-Agent System
 * ─────────────────────────────────
 * Implements a Google ADK-style multi-agent architecture with three
 * specialized sub-agents orchestrated by a SequentialAgent pipeline:
 *
 *   1. ResumeParserAgent    — extracts structured data from raw resume text
 *   2. PortfolioDesignAgent — applies aesthetic preferences and themes
 *   3. SEOOptimizerAgent    — generates optimized SEO metadata
 *
 * Usage (Agents CLI):
 *   npx tsx agent/run_agent.ts --resume "John Doe, Engineer..."
 */

import OpenAI from "openai";
import * as dotenv from "dotenv";
dotenv.config();

// ─── Model Configuration ──────────────────────────────────────────────────────

const MODEL_ID = "gpt-4o-mini";

function getAI(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "[FolioAI Agent] OPENAI_API_KEY is not set. Configure it in your .env or Secrets panel."
    );
  }
  return new OpenAI({
    apiKey,
    defaultHeaders: { "HTTP-Referer": "https://folioai.local", "X-Title": "FolioAI Agent" },
  });
}

// Strip markdown fences and fix common AI wrapping artifacts before parsing
function safeJSONParse(text: string): any {
  const cleaned = (text || "").replace(/```(?:json)?\s*([\s\S]*?)```/g, "$1").trim();
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    const lastBrace = Math.max(cleaned.lastIndexOf("}"), cleaned.lastIndexOf("]"));
    if (lastBrace !== -1) {
      try {
        return JSON.parse(cleaned.slice(0, lastBrace + 1));
      } catch {
        throw new Error(`[FolioAI Agent] Failed to parse AI response as JSON: ${(err as Error).message}`);
      }
    }
    throw new Error(`[FolioAI Agent] Failed to parse AI response as JSON: ${(err as Error).message}`);
  }
}

// ─── Shared Types ─────────────────────────────────────────────────────────────

export interface AgentContext {
  sessionId: string;
  rawInput: string;
  parsedProfile?: ParsedProfile;
  designSettings?: DesignSettings;
  seoData?: SEOData;
  finalPortfolio?: FinalPortfolio;
}

export interface ParsedProfile {
  name: string;
  title: string;
  bio: string;
  contactEmail: string;
  contactPhone?: string;
  location?: string;
  skills: string[];
  projects: Array<{ id: string; title: string; description: string; techStack: string[] }>;
  experience: Array<{ id: string; role: string; company: string; startDate: string; endDate: string; description: string }>;
  education: Array<{ id: string; school: string; degree: string; year: string }>;
}

export interface DesignSettings {
  theme: 'minimal' | 'glass' | 'developer' | 'futuristic' | 'creative' | 'corporate' | 'startup' | 'cyberpunk' | 'agency' | 'luxury' | 'editorial' | 'engineer' | 'bento' | 'brutalist' | 'aurora' | 'atelier' | 'mono-lux' | 'vibrant' | 'architectural' | 'vintage-modern';
  mode: "light" | "dark";
  colorPalette: string;
  fontSans: string;
  fontMono: string;
  showSocialFeed: boolean;
  layoutReorder: string[];
}

export interface SEOData {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export interface FinalPortfolio extends ParsedProfile {
  designSettings: DesignSettings;
  seo: SEOData;
  slug: string;
}

// ─── Sub-Agent 1: ResumeParserAgent ──────────────────────────────────────────

/**
 * ResumeParserAgent
 *
 * Responsibility: Parse raw resume text or manual user inputs into a
 * structured professional profile. Extracts name, title, bio, skills,
 * projects, experience, and education using controlled JSON generation.
 */
export class ResumeParserAgent {
  readonly name = "ResumeParserAgent";
  readonly description =
    "Parses raw resume text into a structured professional profile with skills, projects, and experience.";

  private get ai(): OpenAI {
    if (!this._ai) this._ai = getAI();
    return this._ai;
  }
  private _ai: OpenAI | null = null;

  constructor() {
  }

  async run(ctx: AgentContext): Promise<AgentContext> {
    console.log(`\n[${this.name}] Starting resume parsing for session: ${ctx.sessionId}`);

    const systemInstruction = `You are ResumeParserAgent, a specialist sub-agent within the FolioAI multi-agent system.
Your ONLY job is to extract structured professional profile data from raw resume text.
Be precise, extract real data — do not fabricate facts not present in the input.
Return ONLY valid JSON matching the schema.`;

    const prompt = `Parse this resume/profile input into a structured JSON object.

INPUT:
${ctx.rawInput}

Return a JSON object with these exact fields:
{
  "name": "Full name",
  "title": "Professional headline",
  "bio": "2-3 sentence professional summary",
  "contactEmail": "email",
  "contactPhone": "phone or empty string",
  "location": "city, country or empty string",
  "skills": ["JavaScript", "React", "TypeScript"],
  "projects": [{ "id": "p1", "title": "Project title", "description": "results-oriented description", "techStack": ["TypeScript"] }],
  "experience": [{ "id": "e1", "role": "Role", "company": "Company", "startDate": "YYYY-MM", "endDate": "Present or YYYY-MM", "description": "achievements" }],
  "education": [{ "id": "edu1", "school": "School", "degree": "Degree", "year": "YYYY" }]
}`;

    const response = await this.ai.chat.completions.create({
      model: MODEL_ID,
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
    });

    const text = response.choices[0]?.message?.content;
    if (!text) throw new Error(`[${this.name}] No output returned from AI model`);

    const parsed: ParsedProfile = JSON.parse(text);

    // Ensure IDs exist on all items
    parsed.projects = (parsed.projects || []).map((p, i) => ({ ...p, id: p.id || `p_${i + 1}` }));
    parsed.experience = (parsed.experience || []).map((e, i) => ({ ...e, id: e.id || `e_${i + 1}` }));
    parsed.education = (parsed.education || []).map((e, i) => ({ ...e, id: e.id || `edu_${i + 1}` }));

    console.log(`[${this.name}] ✅ Parsed profile for: ${parsed.name}`);

    return { ...ctx, parsedProfile: parsed };
  }
}

// ─── Sub-Agent 2: PortfolioDesignAgent ───────────────────────────────────────

/**
 * PortfolioDesignAgent
 *
 * Responsibility: Analyze the parsed profile and recommend the best
 * visual design settings — theme, color palette, fonts, and section
 * layout ordering — to match the candidate's professional brand.
 */
export class PortfolioDesignAgent {
  readonly name = "PortfolioDesignAgent";
  readonly description =
    "Recommends visual design settings (theme, palette, fonts, layout) tailored to the candidate's professional brand.";

  private get ai(): OpenAI {
    if (!this._ai) this._ai = getAI();
    return this._ai;
  }
  private _ai: OpenAI | null = null;

  constructor() {
  }

  async run(ctx: AgentContext): Promise<AgentContext> {
    if (!ctx.parsedProfile) {
      throw new Error(`[${this.name}] parsedProfile missing — ResumeParserAgent must run first.`);
    }

    console.log(`\n[${this.name}] Generating design settings for: ${ctx.parsedProfile.name}`);

    const systemInstruction = `You are PortfolioDesignAgent, a sub-agent in the FolioAI multi-agent system.
Your ONLY job is to recommend the optimal visual design configuration for a professional portfolio
based on the candidate's role, skills, and industry.
Available themes: editorial, engineer, bento, brutalist, aurora, atelier, mono-lux, vibrant, architectural, vintage-modern
Available palettes: indigo, sky, emerald, orange, rose, slate
Available fonts: Inter, Space Grotesk, Outfit, Playfair Display, Cormorant Garamond
Return ONLY valid JSON.`;

    const prompt = `Given this professional profile, recommend the ideal portfolio design settings.

PROFILE SUMMARY:
- Name: ${ctx.parsedProfile.name}
- Title: ${ctx.parsedProfile.title}
- Skills: ${ctx.parsedProfile.skills.slice(0, 8).join(", ")}
- Projects count: ${ctx.parsedProfile.projects.length}

Return JSON:
{
  "theme": "one of: editorial|engineer|bento|brutalist|aurora|atelier|mono-lux|vibrant|architectural|vintage-modern",
  "mode": "dark or light",
  "colorPalette": "one of: indigo|sky|emerald|orange|rose|slate",
  "fontSans": "one of: Inter|Space Grotesk|Outfit|Playfair Display|Cormorant Garamond",
  "fontMono": "JetBrains Mono",
  "showSocialFeed": true,
  "layoutReorder": ["hero", "about", "skills", "projects", "experience", "education", "social-feed", "contact"]
}`;

    const response = await this.ai.chat.completions.create({
      model: MODEL_ID,
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
    });

    const text = response.choices[0]?.message?.content;
    if (!text) throw new Error(`[${this.name}] No output returned from AI model`);

    const designSettings: DesignSettings = JSON.parse(text);

    // Ensure required fields have defaults
    designSettings.showSocialFeed = designSettings.showSocialFeed ?? true;
    designSettings.layoutReorder = designSettings.layoutReorder?.length
      ? designSettings.layoutReorder
      : ["hero", "about", "skills", "projects", "experience", "education", "social-feed", "contact"];

    console.log(`[${this.name}] ✅ Theme: ${designSettings.theme} | Palette: ${designSettings.colorPalette}`);

    return { ...ctx, designSettings };
  }
}

// ─── Sub-Agent 3: SEOOptimizerAgent ──────────────────────────────────────────

/**
 * SEOOptimizerAgent
 *
 * Responsibility: Generate optimized SEO metadata — meta title, meta
 * description, and targeted keywords — to maximize the portfolio's
 * discoverability in search engines.
 */
export class SEOOptimizerAgent {
  readonly name = "SEOOptimizerAgent";
  readonly description =
    "Generates optimized SEO metadata (title, description, keywords) for maximum search engine discoverability.";

  private get ai(): OpenAI {
    if (!this._ai) this._ai = getAI();
    return this._ai;
  }
  private _ai: OpenAI | null = null;

  constructor() {
  }

  async run(ctx: AgentContext): Promise<AgentContext> {
    if (!ctx.parsedProfile) {
      throw new Error(`[${this.name}] parsedProfile missing — ResumeParserAgent must run first.`);
    }

    console.log(`\n[${this.name}] Generating SEO metadata for: ${ctx.parsedProfile.name}`);

    const systemInstruction = `You are SEOOptimizerAgent, a sub-agent in the FolioAI multi-agent system.
Your ONLY job is to craft high-impact SEO metadata for a personal portfolio page.
Optimize for search intent: recruiters looking for this candidate's specific skills and role.
Return ONLY valid JSON.`;

    const profile = ctx.parsedProfile;
    const prompt = `Generate SEO metadata for this professional portfolio.

CANDIDATE:
- Name: ${profile.name}
- Title: ${profile.title}
- Key Skills: ${profile.skills.slice(0, 10).join(", ")}
- Location: ${profile.location || ""}

Rules:
- metaTitle: 50-60 chars, include name and title
- metaDescription: 120-160 chars, compelling with key skills
- keywords: 8-12 targeted terms

Return JSON:
{
  "metaTitle": "...",
  "metaDescription": "...",
  "keywords": ["keyword1", "keyword2", ...]
  }`;

    const response = await this.ai.chat.completions.create({
      model: MODEL_ID,
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
    });

    const text = response.choices[0]?.message?.content;
    if (!text) throw new Error(`[${this.name}] No output returned from AI model`);

    const seoData: SEOData = JSON.parse(text);
    console.log(`[${this.name}] ✅ Meta title: "${seoData.metaTitle}"`);

    return { ...ctx, seoData };
  }
}

// ─── SequentialAgent Orchestrator ────────────────────────────────────────────

/**
 * FolioSequentialAgent
 *
 * Multi-agent orchestrator that runs sub-agents in sequence, passing
 * the enriched AgentContext from one agent to the next.
 * This is the ADK "SequentialAgent" pattern.
 *
 * Pipeline:
 *   ResumeParserAgent → PortfolioDesignAgent → SEOOptimizerAgent
 */
export class FolioSequentialAgent {
  readonly name = "FolioSequentialAgent";
  readonly description =
    "Orchestrates the FolioAI multi-agent pipeline: parse → design → SEO → assemble final portfolio.";

  private subAgents: Array<{ name: string; run: (ctx: AgentContext) => Promise<AgentContext> }>;

  constructor() {
    this.subAgents = [
      new ResumeParserAgent(),
      new PortfolioDesignAgent(),
      new SEOOptimizerAgent(),
    ];
  }

  /**
   * Run the full sequential pipeline.
   * Each sub-agent receives the context output of the previous one.
   */
  async run(input: string, sessionId?: string): Promise<FinalPortfolio> {
    const sid = sessionId || `session_${Date.now()}`;
    console.log(`\n${"═".repeat(60)}`);
    console.log(`[FolioSequentialAgent] Starting pipeline — Session: ${sid}`);
    console.log(`${"═".repeat(60)}`);

    let ctx: AgentContext = {
      sessionId: sid,
      rawInput: input,
    };

    // Run each sub-agent sequentially, threading context
    for (const agent of this.subAgents) {
      console.log(`\n→ Running sub-agent: ${agent.name}`);
      ctx = await agent.run(ctx);
    }

    // Assemble final portfolio from all agent outputs
    if (!ctx.parsedProfile || !ctx.designSettings || !ctx.seoData) {
      throw new Error("[FolioSequentialAgent] Pipeline incomplete — missing outputs from sub-agents.");
    }

    const slug = ctx.parsedProfile.name.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Date.now().toString().slice(-4);

    const finalPortfolio: FinalPortfolio = {
      ...ctx.parsedProfile,
      designSettings: ctx.designSettings,
      seo: ctx.seoData,
      slug,
    };

    console.log(`\n${"═".repeat(60)}`);
    console.log(`[FolioSequentialAgent] ✅ Pipeline complete — Portfolio: "${finalPortfolio.name}"`);
    console.log(`${"═".repeat(60)}\n`);

    return finalPortfolio;
  }
}

// ─── Agent Registry (ADK pattern) ────────────────────────────────────────────

/**
 * Agent registry — maps agent names to their instances.
 * This follows the ADK convention for discovering available agents.
 */
export const AGENT_REGISTRY = {
  "folio-sequential-agent": () => new FolioSequentialAgent(),
  "resume-parser-agent": () => new ResumeParserAgent(),
  "portfolio-design-agent": () => new PortfolioDesignAgent(),
  "seo-optimizer-agent": () => new SEOOptimizerAgent(),
} as const;

export type AgentName = keyof typeof AGENT_REGISTRY;
