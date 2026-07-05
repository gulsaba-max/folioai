/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Profession Detection & Adaptation System
 * Maps 42+ professions to templates, colors, labels, icons, and section configs.
 */

export type ThemeId = 
  | 'minimal' | 'glass' | 'developer' | 'futuristic'
  | 'creative' | 'corporate' | 'startup' | 'cyberpunk'
  | 'agency' | 'luxury';

export type ProfessionId =
  | 'software-engineer' | 'frontend-developer' | 'backend-developer'
  | 'fullstack-developer' | 'ai-engineer' | 'ml-engineer'
  | 'data-scientist' | 'data-analyst' | 'cybersecurity-engineer'
  | 'cloud-engineer' | 'devops-engineer' | 'blockchain-developer'
  | 'mobile-developer' | 'ui-ux-designer' | 'graphic-designer'
  | 'product-designer' | 'motion-designer' | 'video-editor'
  | 'digital-marketer' | 'seo-expert' | 'business-analyst'
  | 'product-manager' | 'project-manager' | 'sales-professional'
  | 'hr-professional' | 'accountant' | 'finance-professional'
  | 'teacher' | 'researcher' | 'lawyer' | 'doctor'
  | 'architect' | 'mechanical-engineer' | 'civil-engineer'
  | 'electrical-engineer' | 'marketing-specialist' | 'content-writer'
  | 'photographer' | 'freelancer' | 'entrepreneur' | 'student'
  | 'consultant' | 'general';

export interface SectionLabels {
  skills: string;
  projects: string;
  experience: string;
  education: string;
  about: string;
  contact: string;
}

export interface ProfessionConfig {
  id: ProfessionId;
  label: string;
  recommendedTheme: ThemeId;
  accentHex: string;
  sectionLabels: SectionLabels;
  sectionOrder: string[];
  iconSet: 'tech' | 'design' | 'business' | 'creative' | 'medical' | 'legal' | 'engineering' | 'education' | 'finance';
  highlightBio: string; // Placeholder bio hint for AI
  availableForWork: string; // "Available for work" → "Open to new cases" etc.
  ctaLabel: string; // CTA button text
}

export const PROFESSION_CONFIGS: Record<ProfessionId, ProfessionConfig> = {
  'software-engineer': {
    id: 'software-engineer', label: 'Software Engineer',
    recommendedTheme: 'developer', accentHex: '#6366f1',
    sectionLabels: { skills: 'Tech Stack', projects: 'Open Source & Projects', experience: 'Engineering Experience', education: 'Education', about: 'About Me', contact: 'Get in Touch' },
    sectionOrder: ['hero', 'skills', 'projects', 'experience', 'education', 'contact'],
    iconSet: 'tech', highlightBio: 'Senior software engineer specialized in...', availableForWork: 'Open to new roles', ctaLabel: 'View My Work'
  },
  'frontend-developer': {
    id: 'frontend-developer', label: 'Frontend Developer',
    recommendedTheme: 'developer', accentHex: '#06b6d4',
    sectionLabels: { skills: 'Tools & Technologies', projects: 'UI Projects', experience: 'Frontend Experience', education: 'Education', about: 'About Me', contact: 'Let\'s Build Something' },
    sectionOrder: ['hero', 'projects', 'skills', 'experience', 'education', 'contact'],
    iconSet: 'tech', highlightBio: 'Frontend developer crafting beautiful UIs with...', availableForWork: 'Available for projects', ctaLabel: 'See My Projects'
  },
  'backend-developer': {
    id: 'backend-developer', label: 'Backend Developer',
    recommendedTheme: 'developer', accentHex: '#10b981',
    sectionLabels: { skills: 'Backend Stack', projects: 'Systems & APIs', experience: 'Backend Experience', education: 'Education', about: 'About Me', contact: 'Let\'s Connect' },
    sectionOrder: ['hero', 'skills', 'projects', 'experience', 'education', 'contact'],
    iconSet: 'tech', highlightBio: 'Backend engineer building scalable systems with...', availableForWork: 'Open to opportunities', ctaLabel: 'Explore My Work'
  },
  'fullstack-developer': {
    id: 'fullstack-developer', label: 'Full Stack Developer',
    recommendedTheme: 'developer', accentHex: '#8b5cf6',
    sectionLabels: { skills: 'Full Stack', projects: 'Full Stack Projects', experience: 'Development Experience', education: 'Education', about: 'About Me', contact: 'Let\'s Work Together' },
    sectionOrder: ['hero', 'projects', 'skills', 'experience', 'education', 'contact'],
    iconSet: 'tech', highlightBio: 'Full stack developer building end-to-end solutions...', availableForWork: 'Open to full-time roles', ctaLabel: 'View Portfolio'
  },
  'ai-engineer': {
    id: 'ai-engineer', label: 'AI Engineer',
    recommendedTheme: 'futuristic', accentHex: '#a855f7',
    sectionLabels: { skills: 'AI/ML Stack', projects: 'AI Research & Products', experience: 'AI Engineering', education: 'Education', about: 'About Me', contact: 'Collaborate' },
    sectionOrder: ['hero', 'projects', 'skills', 'experience', 'education', 'contact'],
    iconSet: 'tech', highlightBio: 'AI Engineer building intelligent systems with LLMs...', availableForWork: 'Open to AI roles', ctaLabel: 'Explore AI Projects'
  },
  'ml-engineer': {
    id: 'ml-engineer', label: 'ML Engineer',
    recommendedTheme: 'futuristic', accentHex: '#7c3aed',
    sectionLabels: { skills: 'ML/Data Stack', projects: 'Models & Research', experience: 'ML Experience', education: 'Education', about: 'About Me', contact: 'Connect' },
    sectionOrder: ['hero', 'skills', 'projects', 'experience', 'education', 'contact'],
    iconSet: 'tech', highlightBio: 'ML Engineer shipping production ML systems...', availableForWork: 'Available for ML roles', ctaLabel: 'See My Research'
  },
  'data-scientist': {
    id: 'data-scientist', label: 'Data Scientist',
    recommendedTheme: 'futuristic', accentHex: '#0ea5e9',
    sectionLabels: { skills: 'Data Tools & Methods', projects: 'Data Projects & Research', experience: 'Data Science Experience', education: 'Education', about: 'About Me', contact: 'Let\'s Analyze Together' },
    sectionOrder: ['hero', 'skills', 'projects', 'experience', 'education', 'contact'],
    iconSet: 'tech', highlightBio: 'Data scientist turning raw data into insights...', availableForWork: 'Available for data roles', ctaLabel: 'View Analysis'
  },
  'data-analyst': {
    id: 'data-analyst', label: 'Data Analyst',
    recommendedTheme: 'corporate', accentHex: '#0ea5e9',
    sectionLabels: { skills: 'Analytics Tools', projects: 'Dashboards & Reports', experience: 'Analyst Experience', education: 'Education', about: 'About Me', contact: 'Let\'s Talk Data' },
    sectionOrder: ['hero', 'projects', 'skills', 'experience', 'education', 'contact'],
    iconSet: 'business', highlightBio: 'Data analyst delivering business insights through...', availableForWork: 'Open to analyst roles', ctaLabel: 'See Dashboards'
  },
  'cybersecurity-engineer': {
    id: 'cybersecurity-engineer', label: 'Cybersecurity Engineer',
    recommendedTheme: 'cyberpunk', accentHex: '#22d3ee',
    sectionLabels: { skills: 'Security Stack & Certifications', projects: 'Security Research & CVEs', experience: 'Security Experience', education: 'Education', about: 'About Me', contact: 'Secure Channel' },
    sectionOrder: ['hero', 'skills', 'projects', 'experience', 'education', 'contact'],
    iconSet: 'tech', highlightBio: 'Cybersecurity engineer protecting digital assets...', availableForWork: 'Available for security roles', ctaLabel: 'View Research'
  },
  'cloud-engineer': {
    id: 'cloud-engineer', label: 'Cloud Engineer',
    recommendedTheme: 'developer', accentHex: '#f97316',
    sectionLabels: { skills: 'Cloud & DevOps Stack', projects: 'Infrastructure Projects', experience: 'Cloud Experience', education: 'Education', about: 'About Me', contact: 'Let\'s Scale Together' },
    sectionOrder: ['hero', 'skills', 'projects', 'experience', 'education', 'contact'],
    iconSet: 'tech', highlightBio: 'Cloud engineer architecting scalable infrastructure on AWS/GCP/Azure...', availableForWork: 'Open to cloud roles', ctaLabel: 'See Architecture'
  },
  'devops-engineer': {
    id: 'devops-engineer', label: 'DevOps Engineer',
    recommendedTheme: 'developer', accentHex: '#f59e0b',
    sectionLabels: { skills: 'DevOps & Platform Stack', projects: 'Automation & CI/CD Projects', experience: 'DevOps Experience', education: 'Education', about: 'About Me', contact: 'Build Together' },
    sectionOrder: ['hero', 'skills', 'projects', 'experience', 'education', 'contact'],
    iconSet: 'tech', highlightBio: 'DevOps engineer automating deployments and building CI/CD pipelines...', availableForWork: 'Available for platform roles', ctaLabel: 'View Infrastructure'
  },
  'blockchain-developer': {
    id: 'blockchain-developer', label: 'Blockchain Developer',
    recommendedTheme: 'cyberpunk', accentHex: '#f59e0b',
    sectionLabels: { skills: 'Web3 & Blockchain Stack', projects: 'DApps & Smart Contracts', experience: 'Web3 Experience', education: 'Education', about: 'About Me', contact: 'Build Web3 Together' },
    sectionOrder: ['hero', 'projects', 'skills', 'experience', 'education', 'contact'],
    iconSet: 'tech', highlightBio: 'Blockchain developer building decentralized applications...', availableForWork: 'Open to Web3 roles', ctaLabel: 'View Smart Contracts'
  },
  'mobile-developer': {
    id: 'mobile-developer', label: 'Mobile Developer',
    recommendedTheme: 'developer', accentHex: '#10b981',
    sectionLabels: { skills: 'Mobile Stack', projects: 'App Portfolio', experience: 'Mobile Experience', education: 'Education', about: 'About Me', contact: 'Let\'s Build an App' },
    sectionOrder: ['hero', 'projects', 'skills', 'experience', 'education', 'contact'],
    iconSet: 'tech', highlightBio: 'Mobile developer crafting iOS & Android experiences...', availableForWork: 'Available for mobile roles', ctaLabel: 'See My Apps'
  },
  'ui-ux-designer': {
    id: 'ui-ux-designer', label: 'UI/UX Designer',
    recommendedTheme: 'creative', accentHex: '#ec4899',
    sectionLabels: { skills: 'Design Tools & Methods', projects: 'Case Studies', experience: 'Design Experience', education: 'Education', about: 'About Me', contact: 'Start a Project' },
    sectionOrder: ['hero', 'projects', 'skills', 'experience', 'education', 'contact'],
    iconSet: 'design', highlightBio: 'UI/UX designer crafting user-centered digital experiences...', availableForWork: 'Available for design roles', ctaLabel: 'View Case Studies'
  },
  'graphic-designer': {
    id: 'graphic-designer', label: 'Graphic Designer',
    recommendedTheme: 'agency', accentHex: '#f97316',
    sectionLabels: { skills: 'Design Tools', projects: 'Portfolio & Gallery', experience: 'Design Experience', education: 'Education', about: 'About Me', contact: 'Work Together' },
    sectionOrder: ['hero', 'projects', 'experience', 'skills', 'education', 'contact'],
    iconSet: 'design', highlightBio: 'Graphic designer creating compelling visual identities...', availableForWork: 'Available for design projects', ctaLabel: 'See Portfolio'
  },
  'product-designer': {
    id: 'product-designer', label: 'Product Designer',
    recommendedTheme: 'creative', accentHex: '#8b5cf6',
    sectionLabels: { skills: 'Product Design Tools', projects: 'Product Case Studies', experience: 'Product Design Experience', education: 'Education', about: 'About Me', contact: 'Let\'s Create' },
    sectionOrder: ['hero', 'projects', 'skills', 'experience', 'education', 'contact'],
    iconSet: 'design', highlightBio: 'Product designer shaping digital products from concept to launch...', availableForWork: 'Open to product design roles', ctaLabel: 'View Case Studies'
  },
  'motion-designer': {
    id: 'motion-designer', label: 'Motion Designer',
    recommendedTheme: 'agency', accentHex: '#f43f5e',
    sectionLabels: { skills: 'Motion & VFX Tools', projects: 'Showreel & Work', experience: 'Motion Experience', education: 'Education', about: 'About Me', contact: 'Collaborate' },
    sectionOrder: ['hero', 'projects', 'experience', 'skills', 'education', 'contact'],
    iconSet: 'creative', highlightBio: 'Motion designer bringing brands to life through animation...', availableForWork: 'Available for motion projects', ctaLabel: 'Watch Showreel'
  },
  'video-editor': {
    id: 'video-editor', label: 'Video Editor',
    recommendedTheme: 'agency', accentHex: '#ef4444',
    sectionLabels: { skills: 'Editing Tools & Software', projects: 'Showreel & Projects', experience: 'Editing Experience', education: 'Education', about: 'About Me', contact: 'Let\'s Create' },
    sectionOrder: ['hero', 'projects', 'experience', 'skills', 'education', 'contact'],
    iconSet: 'creative', highlightBio: 'Video editor crafting compelling narratives through film...', availableForWork: 'Available for video projects', ctaLabel: 'Watch Showreel'
  },
  'digital-marketer': {
    id: 'digital-marketer', label: 'Digital Marketer',
    recommendedTheme: 'startup', accentHex: '#f97316',
    sectionLabels: { skills: 'Marketing Tools & Channels', projects: 'Campaigns & Results', experience: 'Marketing Experience', education: 'Education', about: 'About Me', contact: 'Grow Together' },
    sectionOrder: ['hero', 'projects', 'skills', 'experience', 'education', 'contact'],
    iconSet: 'business', highlightBio: 'Digital marketer driving growth through data-driven campaigns...', availableForWork: 'Open to marketing roles', ctaLabel: 'See My Campaigns'
  },
  'seo-expert': {
    id: 'seo-expert', label: 'SEO Expert',
    recommendedTheme: 'startup', accentHex: '#16a34a',
    sectionLabels: { skills: 'SEO Tools & Techniques', projects: 'SEO Case Studies', experience: 'SEO Experience', education: 'Education', about: 'About Me', contact: 'Boost Your Rankings' },
    sectionOrder: ['hero', 'projects', 'skills', 'experience', 'education', 'contact'],
    iconSet: 'business', highlightBio: 'SEO expert driving organic growth and top search rankings...', availableForWork: 'Available for SEO consulting', ctaLabel: 'See Results'
  },
  'business-analyst': {
    id: 'business-analyst', label: 'Business Analyst',
    recommendedTheme: 'corporate', accentHex: '#2563eb',
    sectionLabels: { skills: 'Analytical Tools & Methods', projects: 'Case Studies & Reports', experience: 'Business Analysis', education: 'Education', about: 'About Me', contact: 'Let\'s Analyze' },
    sectionOrder: ['hero', 'experience', 'projects', 'skills', 'education', 'contact'],
    iconSet: 'business', highlightBio: 'Business analyst bridging the gap between business and technology...', availableForWork: 'Open to BA roles', ctaLabel: 'View Case Studies'
  },
  'product-manager': {
    id: 'product-manager', label: 'Product Manager',
    recommendedTheme: 'startup', accentHex: '#7c3aed',
    sectionLabels: { skills: 'PM Tools & Methodologies', projects: 'Products Shipped', experience: 'Product Experience', education: 'Education', about: 'About Me', contact: 'Build Together' },
    sectionOrder: ['hero', 'projects', 'experience', 'skills', 'education', 'contact'],
    iconSet: 'business', highlightBio: 'Product manager turning user pain points into shipped features...', availableForWork: 'Open to PM roles', ctaLabel: 'See Products'
  },
  'project-manager': {
    id: 'project-manager', label: 'Project Manager',
    recommendedTheme: 'corporate', accentHex: '#0891b2',
    sectionLabels: { skills: 'PM Tools & Methodologies', projects: 'Delivered Projects', experience: 'Project Management', education: 'Education & Certifications', about: 'About Me', contact: 'Let\'s Deliver Together' },
    sectionOrder: ['hero', 'experience', 'projects', 'skills', 'education', 'contact'],
    iconSet: 'business', highlightBio: 'Project manager delivering complex projects on time and budget...', availableForWork: 'Available for PM roles', ctaLabel: 'View Track Record'
  },
  'sales-professional': {
    id: 'sales-professional', label: 'Sales Professional',
    recommendedTheme: 'corporate', accentHex: '#16a34a',
    sectionLabels: { skills: 'Sales Tools & Techniques', projects: 'Key Wins & Deals', experience: 'Sales Experience', education: 'Education', about: 'About Me', contact: 'Connect With Me' },
    sectionOrder: ['hero', 'experience', 'projects', 'skills', 'education', 'contact'],
    iconSet: 'business', highlightBio: 'Sales professional consistently exceeding targets by...', availableForWork: 'Open to new opportunities', ctaLabel: 'Let\'s Talk'
  },
  'hr-professional': {
    id: 'hr-professional', label: 'HR Professional',
    recommendedTheme: 'corporate', accentHex: '#db2777',
    sectionLabels: { skills: 'HR Tools & Competencies', projects: 'HR Initiatives', experience: 'HR Experience', education: 'Education & Certifications', about: 'About Me', contact: 'Connect' },
    sectionOrder: ['hero', 'experience', 'skills', 'projects', 'education', 'contact'],
    iconSet: 'business', highlightBio: 'HR professional building people-first organizational cultures...', availableForWork: 'Open to HR roles', ctaLabel: 'View HR Initiatives'
  },
  'accountant': {
    id: 'accountant', label: 'Accountant',
    recommendedTheme: 'corporate', accentHex: '#0f766e',
    sectionLabels: { skills: 'Accounting Tools & Software', projects: 'Key Engagements', experience: 'Accounting Experience', education: 'Education & Certifications', about: 'About Me', contact: 'Get in Touch' },
    sectionOrder: ['hero', 'experience', 'skills', 'projects', 'education', 'contact'],
    iconSet: 'finance', highlightBio: 'Certified accountant managing financial reporting and compliance...', availableForWork: 'Open to accounting roles', ctaLabel: 'View Profile'
  },
  'finance-professional': {
    id: 'finance-professional', label: 'Finance Professional',
    recommendedTheme: 'luxury', accentHex: '#b45309',
    sectionLabels: { skills: 'Financial Tools & Expertise', projects: 'Notable Transactions', experience: 'Finance Experience', education: 'Education & Certifications', about: 'About Me', contact: 'Connect' },
    sectionOrder: ['hero', 'experience', 'projects', 'skills', 'education', 'contact'],
    iconSet: 'finance', highlightBio: 'Finance professional with expertise in investment and portfolio management...', availableForWork: 'Open to opportunities', ctaLabel: 'View Track Record'
  },
  'teacher': {
    id: 'teacher', label: 'Teacher / Educator',
    recommendedTheme: 'minimal', accentHex: '#0891b2',
    sectionLabels: { skills: 'Teaching Specialties', projects: 'Curriculum & Materials', experience: 'Teaching Experience', education: 'Education & Credentials', about: 'About Me', contact: 'Get in Touch' },
    sectionOrder: ['hero', 'experience', 'skills', 'projects', 'education', 'contact'],
    iconSet: 'education', highlightBio: 'Dedicated educator inspiring students through...', availableForWork: 'Open to teaching positions', ctaLabel: 'Learn More'
  },
  'researcher': {
    id: 'researcher', label: 'Researcher',
    recommendedTheme: 'minimal', accentHex: '#1d4ed8',
    sectionLabels: { skills: 'Research Methods & Tools', projects: 'Publications & Research', experience: 'Research Experience', education: 'Academic Background', about: 'About Me', contact: 'Collaborate' },
    sectionOrder: ['hero', 'projects', 'experience', 'skills', 'education', 'contact'],
    iconSet: 'education', highlightBio: 'Researcher advancing knowledge in the field of...', availableForWork: 'Open to research positions', ctaLabel: 'View Publications'
  },
  'lawyer': {
    id: 'lawyer', label: 'Lawyer / Attorney',
    recommendedTheme: 'luxury', accentHex: '#1e3a5f',
    sectionLabels: { skills: 'Practice Areas & Expertise', projects: 'Notable Cases', experience: 'Legal Experience', education: 'Legal Education & Bar Admissions', about: 'About Me', contact: 'Consult Me' },
    sectionOrder: ['hero', 'experience', 'skills', 'projects', 'education', 'contact'],
    iconSet: 'legal', highlightBio: 'Attorney specializing in corporate law and litigation...', availableForWork: 'Accepting new clients', ctaLabel: 'Schedule Consultation'
  },
  'doctor': {
    id: 'doctor', label: 'Doctor / Physician',
    recommendedTheme: 'corporate', accentHex: '#0369a1',
    sectionLabels: { skills: 'Clinical Specialties', projects: 'Research & Publications', experience: 'Clinical Experience', education: 'Medical Education & Residency', about: 'About Me', contact: 'Contact Me' },
    sectionOrder: ['hero', 'experience', 'skills', 'projects', 'education', 'contact'],
    iconSet: 'medical', highlightBio: 'Physician dedicated to patient-centered care in...', availableForWork: 'Accepting patients', ctaLabel: 'Schedule Appointment'
  },
  'architect': {
    id: 'architect', label: 'Architect',
    recommendedTheme: 'agency', accentHex: '#57534e',
    sectionLabels: { skills: 'Design Tools & Styles', projects: 'Built Work & Designs', experience: 'Architectural Experience', education: 'Architecture Education', about: 'About Me', contact: 'Commission Work' },
    sectionOrder: ['hero', 'projects', 'experience', 'skills', 'education', 'contact'],
    iconSet: 'design', highlightBio: 'Architect designing spaces that inspire and function...', availableForWork: 'Available for commissions', ctaLabel: 'View Portfolio'
  },
  'mechanical-engineer': {
    id: 'mechanical-engineer', label: 'Mechanical Engineer',
    recommendedTheme: 'corporate', accentHex: '#b45309',
    sectionLabels: { skills: 'Engineering Tools & Methods', projects: 'Engineering Projects', experience: 'Engineering Experience', education: 'Engineering Education', about: 'About Me', contact: 'Get in Touch' },
    sectionOrder: ['hero', 'experience', 'projects', 'skills', 'education', 'contact'],
    iconSet: 'engineering', highlightBio: 'Mechanical engineer designing precision systems and products...', availableForWork: 'Open to engineering roles', ctaLabel: 'View Projects'
  },
  'civil-engineer': {
    id: 'civil-engineer', label: 'Civil Engineer',
    recommendedTheme: 'corporate', accentHex: '#16a34a',
    sectionLabels: { skills: 'Engineering Tools & Standards', projects: 'Infrastructure Projects', experience: 'Civil Engineering Experience', education: 'Civil Engineering Education', about: 'About Me', contact: 'Connect' },
    sectionOrder: ['hero', 'experience', 'projects', 'skills', 'education', 'contact'],
    iconSet: 'engineering', highlightBio: 'Civil engineer designing resilient infrastructure and urban spaces...', availableForWork: 'Open to engineering roles', ctaLabel: 'View Projects'
  },
  'electrical-engineer': {
    id: 'electrical-engineer', label: 'Electrical Engineer',
    recommendedTheme: 'developer', accentHex: '#ca8a04',
    sectionLabels: { skills: 'Engineering Tools & Technologies', projects: 'Electrical Projects', experience: 'Electrical Engineering', education: 'Engineering Education', about: 'About Me', contact: 'Get in Touch' },
    sectionOrder: ['hero', 'experience', 'projects', 'skills', 'education', 'contact'],
    iconSet: 'engineering', highlightBio: 'Electrical engineer designing power systems and embedded solutions...', availableForWork: 'Open to engineering roles', ctaLabel: 'View Projects'
  },
  'marketing-specialist': {
    id: 'marketing-specialist', label: 'Marketing Specialist',
    recommendedTheme: 'startup', accentHex: '#ef4444',
    sectionLabels: { skills: 'Marketing Tools & Channels', projects: 'Campaigns & Results', experience: 'Marketing Experience', education: 'Education', about: 'About Me', contact: 'Let\'s Grow Together' },
    sectionOrder: ['hero', 'projects', 'skills', 'experience', 'education', 'contact'],
    iconSet: 'business', highlightBio: 'Marketing specialist creating brand strategies that drive results...', availableForWork: 'Open to marketing roles', ctaLabel: 'See My Work'
  },
  'content-writer': {
    id: 'content-writer', label: 'Content Writer',
    recommendedTheme: 'minimal', accentHex: '#0f172a',
    sectionLabels: { skills: 'Writing Specialties & Tools', projects: 'Published Work', experience: 'Writing Experience', education: 'Education', about: 'About Me', contact: 'Commission Me' },
    sectionOrder: ['hero', 'projects', 'experience', 'skills', 'education', 'contact'],
    iconSet: 'creative', highlightBio: 'Content writer crafting compelling narratives for brands...', availableForWork: 'Available for writing projects', ctaLabel: 'Read My Work'
  },
  'photographer': {
    id: 'photographer', label: 'Photographer',
    recommendedTheme: 'agency', accentHex: '#0f172a',
    sectionLabels: { skills: 'Photography Styles & Equipment', projects: 'Portfolio Gallery', experience: 'Photography Experience', education: 'Education', about: 'About Me', contact: 'Book a Session' },
    sectionOrder: ['hero', 'projects', 'skills', 'experience', 'education', 'contact'],
    iconSet: 'creative', highlightBio: 'Photographer capturing moments that tell powerful stories...', availableForWork: 'Available for bookings', ctaLabel: 'View Gallery'
  },
  'freelancer': {
    id: 'freelancer', label: 'Freelancer',
    recommendedTheme: 'minimal', accentHex: '#6366f1',
    sectionLabels: { skills: 'Services & Skills', projects: 'Client Projects', experience: 'Freelance History', education: 'Education', about: 'About Me', contact: 'Hire Me' },
    sectionOrder: ['hero', 'projects', 'skills', 'experience', 'education', 'contact'],
    iconSet: 'business', highlightBio: 'Freelancer delivering high-quality work for clients worldwide...', availableForWork: 'Available for hire', ctaLabel: 'Hire Me'
  },
  'entrepreneur': {
    id: 'entrepreneur', label: 'Entrepreneur',
    recommendedTheme: 'startup', accentHex: '#f59e0b',
    sectionLabels: { skills: 'Expertise & Domains', projects: 'Ventures & Products', experience: 'Founder Journey', education: 'Education', about: 'About Me', contact: 'Connect' },
    sectionOrder: ['hero', 'projects', 'experience', 'skills', 'education', 'contact'],
    iconSet: 'business', highlightBio: 'Entrepreneur building ventures that solve real problems...', availableForWork: 'Open to co-founding', ctaLabel: 'View Ventures'
  },
  'student': {
    id: 'student', label: 'Student',
    recommendedTheme: 'minimal', accentHex: '#6366f1',
    sectionLabels: { skills: 'Skills & Technologies', projects: 'Academic & Personal Projects', experience: 'Internships & Experience', education: 'Education', about: 'About Me', contact: 'Let\'s Connect' },
    sectionOrder: ['hero', 'education', 'projects', 'skills', 'experience', 'contact'],
    iconSet: 'education', highlightBio: 'Student passionate about learning and building impactful projects...', availableForWork: 'Seeking internships', ctaLabel: 'View Projects'
  },
  'consultant': {
    id: 'consultant', label: 'Consultant',
    recommendedTheme: 'luxury', accentHex: '#1e3a5f',
    sectionLabels: { skills: 'Expertise & Service Areas', projects: 'Client Engagements', experience: 'Consulting Experience', education: 'Education', about: 'About Me', contact: 'Book a Call' },
    sectionOrder: ['hero', 'experience', 'projects', 'skills', 'education', 'contact'],
    iconSet: 'business', highlightBio: 'Consultant helping organizations solve complex challenges...', availableForWork: 'Accepting new clients', ctaLabel: 'Book Consultation'
  },
  'general': {
    id: 'general', label: 'Professional',
    recommendedTheme: 'minimal', accentHex: '#6366f1',
    sectionLabels: { skills: 'Skills', projects: 'Projects', experience: 'Experience', education: 'Education', about: 'About Me', contact: 'Get in Touch' },
    sectionOrder: ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'contact'],
    iconSet: 'business', highlightBio: 'Professional with expertise in...', availableForWork: 'Open to opportunities', ctaLabel: 'View My Work'
  }
};

/**
 * Detect profession from portfolio title and bio text.
 */
export function detectProfession(title: string = '', bio: string = ''): ProfessionId {
  const t = (title + ' ' + bio).toLowerCase();

  if (/ai engineer|artificial intelligence|llm|large language model|generative ai/.test(t)) return 'ai-engineer';
  if (/machine learning|ml engineer|deep learning|neural network/.test(t)) return 'ml-engineer';
  if (/data scientist|data science/.test(t)) return 'data-scientist';
  if (/data analyst|business intelligence|bi analyst/.test(t)) return 'data-analyst';
  if (/cybersecurity|security engineer|penetration test|ethical hack|infosec/.test(t)) return 'cybersecurity-engineer';
  if (/blockchain|web3|smart contract|solidity|defi|nft/.test(t)) return 'blockchain-developer';
  if (/devops|site reliability|sre|platform engineer|kubernetes|terraform/.test(t)) return 'devops-engineer';
  if (/cloud engineer|aws|azure|gcp|cloud architect/.test(t)) return 'cloud-engineer';
  if (/mobile developer|ios developer|android developer|flutter|react native/.test(t)) return 'mobile-developer';
  if (/frontend developer|front.end|ui engineer|react developer|vue|angular/.test(t)) return 'frontend-developer';
  if (/backend developer|back.end|api developer|node.js developer|django/.test(t)) return 'backend-developer';
  if (/full.?stack|fullstack/.test(t)) return 'fullstack-developer';
  if (/software engineer|software developer|programmer|coder/.test(t)) return 'software-engineer';
  if (/electrical engineer/.test(t)) return 'electrical-engineer';
  if (/mechanical engineer/.test(t)) return 'mechanical-engineer';
  if (/civil engineer/.test(t)) return 'civil-engineer';
  if (/ui.ux|ux designer|user experience|product designer|interaction design/.test(t)) return 'ui-ux-designer';
  if (/product designer/.test(t)) return 'product-designer';
  if (/motion designer|motion graphic|animator/.test(t)) return 'motion-designer';
  if (/graphic designer|visual designer|brand designer/.test(t)) return 'graphic-designer';
  if (/video editor|film editor|videographer/.test(t)) return 'video-editor';
  if (/photographer|photography/.test(t)) return 'photographer';
  if (/architect|architecture/.test(t)) return 'architect';
  if (/product manager|pm |head of product/.test(t)) return 'product-manager';
  if (/project manager|pmp|scrum master|agile/.test(t)) return 'project-manager';
  if (/business analyst|ba |requirements/.test(t)) return 'business-analyst';
  if (/digital marketer|growth hacker|performance marketer/.test(t)) return 'digital-marketer';
  if (/seo|search engine optimization/.test(t)) return 'seo-expert';
  if (/marketing specialist|brand manager|marketing manager/.test(t)) return 'marketing-specialist';
  if (/content writer|copywriter|technical writer|blogger/.test(t)) return 'content-writer';
  if (/sales|account executive|business development/.test(t)) return 'sales-professional';
  if (/hr |human resources|talent acquisition|recruiter/.test(t)) return 'hr-professional';
  if (/accountant|cpa|cfa|chartered accountant/.test(t)) return 'accountant';
  if (/finance|investment banker|financial analyst/.test(t)) return 'finance-professional';
  if (/lawyer|attorney|legal|solicitor|barrister/.test(t)) return 'lawyer';
  if (/doctor|physician|medical|surgeon|dentist|psychiatrist/.test(t)) return 'doctor';
  if (/teacher|professor|lecturer|instructor|educator/.test(t)) return 'teacher';
  if (/researcher|research scientist|phd|postdoc/.test(t)) return 'researcher';
  if (/entrepreneur|founder|co-founder|startup/.test(t)) return 'entrepreneur';
  if (/consultant|advisory|strategic advisor/.test(t)) return 'consultant';
  if (/freelancer|freelance/.test(t)) return 'freelancer';
  if (/student|undergraduate|graduate/.test(t)) return 'student';

  return 'general';
}

/**
 * Get the recommended theme for a profession.
 */
export function getRecommendedTheme(professionId: ProfessionId): ThemeId {
  return PROFESSION_CONFIGS[professionId]?.recommendedTheme ?? 'minimal';
}

/**
 * Get section labels for a profession.
 */
export function getProfessionLabels(professionId: ProfessionId): SectionLabels {
  return PROFESSION_CONFIGS[professionId]?.sectionLabels ?? PROFESSION_CONFIGS['general'].sectionLabels;
}

/**
 * Get the accent color for a profession.
 */
export function getProfessionAccent(professionId: ProfessionId): string {
  return PROFESSION_CONFIGS[professionId]?.accentHex ?? '#6366f1';
}
