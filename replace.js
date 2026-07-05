const fs = require('fs');
let content = fs.readFileSync('src/components/InteractivePortfolio.tsx', 'utf8');

const replacement = `const googleFonts = \`https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap\`;

  const industry = settings.industry || "tech";
  const getSectionLabels = () => {
    switch(industry) {
      case "creative": return { skills: "Mediums & Techniques", projects: "Gallery & Exhibitions", experience: "Clients & Agencies", education: "Education" };
      case "business": return { skills: "Core Competencies", projects: "Case Studies", experience: "Professional Tenure", education: "Education" };
      case "writing": return { skills: "Specializations", projects: "Publications", experience: "Assignments", education: "Education" };
      case "tech": default: return { skills: "Tech Stack", projects: "Selected Work", experience: "Experience", education: "Education" };
    }
  };
  const labels = getSectionLabels();
  
  const getBackgroundStyle = () => {
    if (theme === "vibrant" || theme === "cyber") return {};
    switch(industry) {
      case "creative": return { backgroundImage: "radial-gradient(circle at 50% 50%, rgba(120,120,120,0.05) 0%, transparent 60%)", backgroundSize: "100px 100px" };
      case "business": return { backgroundImage: "linear-gradient(45deg, rgba(120,120,120,0.03) 25%, transparent 25%, transparent 75%, rgba(120,120,120,0.03) 75%, rgba(120,120,120,0.03)), linear-gradient(45deg, rgba(120,120,120,0.03) 25%, transparent 25%, transparent 75%, rgba(120,120,120,0.03) 75%, rgba(120,120,120,0.03))", backgroundSize: "40px 40px", backgroundPosition: "0 0, 20px 20px" };
      case "writing": return { backgroundImage: "url(\\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\\")", backgroundSize: "200px 200px" };
      case "tech": default: return { backgroundImage: "radial-gradient(rgba(120, 120, 120, 0.1) 1px, transparent 1px)", backgroundSize: "24px 24px" };
    }
  };
  const bgStyle = getBackgroundStyle();`;

content = content.replace(/const googleFonts = `https.*?`;/, replacement);

content = content.replace(/>Skills</g, ">{labels.skills}<");
content = content.replace(/>Projects</g, ">{labels.projects}<");
content = content.replace(/>Experience</g, ">{labels.experience}<");
content = content.replace(/>Education</g, ">{labels.education}<");
content = content.replace(/>Core Stack</g, ">{labels.skills}<");
content = content.replace(/>Career History</g, ">{labels.experience}<");
content = content.replace(/>Skills & Technologies</g, ">{labels.skills}<");

// Inject bgStyle into the top level templates (slate, editorial, minimalist)
// slate:
content = content.replace(/style=\{\{ fontFamily: "'DM Sans', sans-serif" \}\}/g, 'style={{ fontFamily: "\\'DM Sans\\', sans-serif", ...bgStyle }}');

// editorial:
content = content.replace(/style=\{\{ fontFamily: "'Playfair Display', serif" \}\}/g, 'style={{ fontFamily: "\\'Playfair Display\\', serif", ...bgStyle }}');

// minimalist:
content = content.replace(/style=\{\{ fontFamily: "'Inter', sans-serif" \}\}/g, 'style={{ fontFamily: "\\'Inter\\', sans-serif", ...bgStyle }}');

fs.writeFileSync('src/components/InteractivePortfolio.tsx', content);
console.log("Replacements complete!");
