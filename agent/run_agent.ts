/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * FolioAI — Agents CLI Entrypoint
 * ─────────────────────────────────
 * Run the FolioAI multi-agent pipeline from the command line.
 *
 * Usage:
 *   npx tsx agent/run_agent.ts
 *   npx tsx agent/run_agent.ts --agent resume-parser-agent --input "Jane Doe, React Dev..."
 *   npx tsx agent/run_agent.ts --list
 */

import { FolioSequentialAgent, AGENT_REGISTRY, AgentName, ResumeParserAgent } from "./index.js";
import * as dotenv from "dotenv";
dotenv.config();

// ─── CLI Argument Parsing ─────────────────────────────────────────────────────

const args = process.argv.slice(2);

function getArg(flag: string): string | undefined {
  const idx = args.indexOf(flag);
  return idx !== -1 ? args[idx + 1] : undefined;
}

function hasFlag(flag: string): boolean {
  return args.includes(flag);
}

// ─── Default Sample Resume (for demo runs) ────────────────────────────────────

const SAMPLE_RESUME = `
ALEX RIVERA
alex.rivera@devmail.io | +1 (415) 882-9201 | San Francisco, CA
GitHub: github.com/alexrivera | LinkedIn: linkedin.com/in/alexrivera

PROFESSIONAL SUMMARY
Full-stack engineer with 6+ years building high-throughput distributed systems and developer-facing APIs.
Passionate about cloud-native architectures, real-time data pipelines, and exceptional DX.

SKILLS
TypeScript, React, Node.js, Go, Python, GraphQL, gRPC, PostgreSQL, Redis,
Docker, Kubernetes, Google Cloud Run, Pub/Sub, Terraform, Vite, Tailwind CSS

EXPERIENCE

Senior Software Engineer — Nexus Systems Inc. (2023–Present)
- Designed event-driven microservices handling 15M+ daily requests with <50ms p99 latency
- Led migration of monolith to 12-service Kubernetes cluster; reduced deploy time by 65%
- Built real-time collaboration engine using WebSockets + Redis Pub/Sub for 40k concurrent users

Software Engineer — Beacon Digital (2021–2023)
- Delivered GraphQL API gateway unifying 6 internal REST services; cut client query time by 40%
- Shipped CI/CD pipelines on Google Cloud Run reducing release cycles from weekly to daily
- Mentored 4 junior engineers through structured code review and pair-programming sessions

PROJECTS

CloudSync Dashboard
Real-time infrastructure monitoring dashboard with alerting rules and cost optimization recommendations.
Tech: React, TypeScript, WebSocket, Redis, Docker

DataFlow CLI
Open-source ETL pipeline tool for schema transformations with 1,200+ GitHub stars.
Tech: Go, PostgreSQL, gRPC, Docker

EDUCATION
B.S. Computer Science — Stanford University, 2021
`;

// ─── Main CLI Runner ──────────────────────────────────────────────────────────

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║         FolioAI — Multi-Agent CLI (ADK Pattern)          ║
║  Agents: ResumeParser → PortfolioDesign → SEOOptimizer   ║
╚══════════════════════════════════════════════════════════╝
`);

  // --list: show all registered agents
  if (hasFlag("--list")) {
    console.log("📋 Registered Agents:\n");
    for (const [name, factory] of Object.entries(AGENT_REGISTRY)) {
      const agent = factory() as any;
      console.log(`  • ${name}`);
      console.log(`    ${agent.description}\n`);
    }
    return;
  }

  // --help
  if (hasFlag("--help")) {
    console.log(`Options:
  --list                     List all available agents
  --agent <name>             Run a specific agent (default: folio-sequential-agent)
  --input <text>             Resume/profile text to process
  --session <id>             Custom session ID
  --output json              Print full JSON output
  --help                     Show this help message

Examples:
  npx tsx agent/run_agent.ts
  npx tsx agent/run_agent.ts --list
  npx tsx agent/run_agent.ts --agent resume-parser-agent --input "Jane Doe..."
  npx tsx agent/run_agent.ts --output json
`);
    return;
  }

  // Get runtime options
  const agentName = (getArg("--agent") || "folio-sequential-agent") as AgentName;
  const inputText = getArg("--input") || SAMPLE_RESUME;
  const sessionId = getArg("--session") || `cli_${Date.now()}`;
  const outputFormat = getArg("--output");

  // Validate agent name
  if (!AGENT_REGISTRY[agentName]) {
    console.error(`❌ Unknown agent: "${agentName}"`);
    console.error(`   Run with --list to see available agents.`);
    process.exit(1);
  }

  console.log(`🤖 Agent:    ${agentName}`);
  console.log(`📋 Session:  ${sessionId}`);
  console.log(`📝 Input:    ${inputText.trim().slice(0, 60)}...`);
  console.log(`${"─".repeat(60)}`);

  try {
    if (agentName === "folio-sequential-agent") {
      // Run full sequential pipeline
      const orchestrator = new FolioSequentialAgent();
      const result = await orchestrator.run(inputText, sessionId);

      if (outputFormat === "json") {
        console.log("\n📄 Full Portfolio JSON Output:");
        console.log(JSON.stringify(result, null, 2));
      } else {
        console.log("\n✅ Portfolio Generated Successfully!\n");
        console.log(`  👤 Name:     ${result.name}`);
        console.log(`  💼 Title:    ${result.title}`);
        console.log(`  🎨 Theme:    ${result.designSettings.theme} (${result.designSettings.mode} mode)`);
        console.log(`  🎨 Palette:  ${result.designSettings.colorPalette}`);
        console.log(`  🔤 Font:     ${result.designSettings.fontSans}`);
        console.log(`  📦 Projects: ${result.projects.length}`);
        console.log(`  💡 Skills:   ${result.skills.slice(0, 5).join(", ")}...`);
        console.log(`  🔍 SEO:      ${result.seo.metaTitle}`);
        console.log(`  🔗 Slug:     ${result.slug}`);
        console.log(`\n  Run with --output json for full portfolio JSON.\n`);
      }

    } else if (agentName === "resume-parser-agent") {
      // Run just the resume parser sub-agent
      const agent = new ResumeParserAgent();
      const ctx = await agent.run({ sessionId, rawInput: inputText });
      const parsed = ctx.parsedProfile!;

      console.log("\n✅ Resume Parsed Successfully!\n");
      console.log(`  👤 Name:        ${parsed.name}`);
      console.log(`  💼 Title:       ${parsed.title}`);
      console.log(`  📧 Email:       ${parsed.contactEmail}`);
      console.log(`  📍 Location:    ${parsed.location || "N/A"}`);
      console.log(`  💡 Skills (${parsed.skills.length}): ${parsed.skills.slice(0, 6).join(", ")}`);
      console.log(`  📁 Projects:    ${parsed.projects.length}`);
      console.log(`  🏢 Experience:  ${parsed.experience.length} positions`);
      console.log(`  🎓 Education:   ${parsed.education.length} entries`);

      if (outputFormat === "json") {
        console.log("\n📄 Parsed Profile JSON:");
        console.log(JSON.stringify(parsed, null, 2));
      }
    } else {
      console.log(`ℹ️  Sub-agent "${agentName}" can be run as part of the full pipeline.`);
      console.log(`   Use --agent folio-sequential-agent to run all sub-agents.\n`);
    }

  } catch (err: any) {
    console.error(`\n❌ Agent execution failed: ${err.message}`);
    if (err.message?.includes("OPENAI_API_KEY")) {
      console.error(`\n💡 Set your API key: export OPENAI_API_KEY=your_key_here\n`);
    }
    process.exit(1);
  }
}

main();
