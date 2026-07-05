# Contributing to FolioAI

Thank you for your interest in contributing to **FolioAI**!

FolioAI is an AI-powered multi-agent platform that transforms resumes into professional portfolio websites using Google ADK, Gemini, MCP, and modern web technologies.

We welcome contributions that improve the project, fix bugs, enhance the user experience, or expand the capabilities of our AI agents.

---

# Getting Started

## 1. Fork the Repository

Click the **Fork** button on GitHub to create your own copy of the project.

## 2. Clone Your Fork

```bash
git clone https://github.com/gulsaba-max/folioai.git
cd folioai
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Configure Environment Variables

Create a `.env.local` file and add the required API keys.

```env
GOOGLE_API_KEY=your_google_api_key

GEMINI_API_KEY=your_gemini_api_key

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Never commit API keys or secrets to GitHub.

---

## 5. Start the Development Server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

# Creating a Feature Branch

Before making changes, create a new branch.

```bash
git checkout -b feature/your-feature-name
```

Example:

```bash
git checkout -b feature/mission-control
```

---

# Coding Guidelines

Please follow these best practices:

- Write clean and readable code.
- Use TypeScript whenever possible.
- Keep components modular and reusable.
- Follow the existing folder structure.
- Use meaningful variable and function names.
- Add comments where necessary.
- Maintain responsive design.
- Ensure compatibility across modern browsers.

---

# AI Agent Development

When adding or modifying AI agents:

- Keep each agent focused on a single responsibility.
- Follow the existing Google ADK architecture.
- Maintain compatibility with MCP.
- Ensure secure handling of API requests.
- Document any new agent behavior.

---

# Testing

Before submitting your contribution:

- Test all affected features.
- Verify responsive layouts.
- Check for console errors.
- Confirm AI workflows execute correctly.
- Ensure no sensitive information is exposed.

---

# Commit Messages

Use clear and descriptive commit messages.

Examples:

```text
Add AI Mission Control dashboard

Improve resume parsing accuracy

Fix responsive navigation

Update portfolio generation workflow
```

---

# Submitting Changes

1. Commit your changes.

```bash
git add .

git commit -m "Describe your changes"
```

2. Push your branch.

```bash
git push origin feature/your-feature-name
```

3. Open a Pull Request describing your contribution.

---

# Reporting Bugs

If you discover a bug, please include:

- Description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Browser and operating system

---

# Feature Requests

We welcome ideas that improve:

- Multi-Agent Architecture
- Portfolio Design
- User Experience
- AI Performance
- Accessibility
- Documentation
- Deployment
- Security

---

# Code of Conduct

Please be respectful and constructive when contributing.

We value collaboration, inclusivity, and professionalism.

---

# Thank You

Thank you for helping improve **FolioAI**.

Together, we can build a smarter and more accessible AI-powered portfolio generation platform.

Happy Coding! 🚀
