# Persona

"I want to build a personal website using AI."

A project I built over winter break. AI has gotten great at building frontends, but to be honest, they often look very similar and are based on training by said AI company. Persona is a drop in "Kit", "Care Package", or anything else you want to call it for your CLI, that supports the setup, building, and deployment of your personal website.

<img width="2366" height="1196" alt="image" src="https://github.com/user-attachments/assets/e25a8419-4892-488d-9795-c7d25ee85728" />


## Quick Start

```bash
git clone https://github.com/JacbK/persona.git
# Or click use template in the top right of this Github page (RECOMMENDED)
cd persona
./setup.sh
```

That's it. The setup script walks you through everything:

1. **Repository** — Creates your own GitHub repo
2. **Dependencies** — Installs packages
3. **Configuration** — Opens a UI to set your preferences
4. **AI Assistant** — Configures your coding AI
5. **Launch** — AI starts building your portfolio

## Requirements

- Node.js 18+
- An AI coding assistant: [Claude Code](https://claude.ai/code), [Cursor](https://cursor.sh), [Codex](https://openai.com/codex), [Gemini CLI](https://github.com/google-gemini/gemini-cli), or [Aider](https://aider.chat)

## Recommended Models

For best results, use the most capable model available:

| CLI | Recommended Model | Command |
|-----|------------------|---------|
| Claude Code | Opus 4.5 | `claude --model opus` or `/model opus` in-session |
| Gemini CLI | Gemini 3 Pro | `gemini --model gemini-3-pro` |
| Codex | GPT-5.2-Codex | `codex --model gpt-5.2-codex` |
| Aider | Claude Opus 4.5 | `aider --model claude-opus-4-5-20251101` |

**Note:** Free tiers may have model restrictions. Gemini CLI free tier may downgrade to Flash due to quota limits.

## How It Works

Persona is a framework that gives AI coding agents everything they need to build you a portfolio from scratch.

1. **You configure** — Run `./setup.sh` to set your name, links, sections, and design preferences via a visual UI
2. **You upload** (optional) — Drop your resume, headshot, or project screenshots in `/materials`
3. **AI researches** — The agent reads your config, materials, GitHub, and searches the web to understand who you are
4. **AI designs** — Based on your chosen inspirations and preferences, it creates a unique visual direction and presents it for approval
5. **AI builds** — Once approved, it writes the actual React/Tailwind code from scratch in `src/app/page.tsx`
6. **You deploy** — One command to go live on Vercel, Netlify, or GitHub Pages

The result isn't a filled-in template, its a custom site based on your selections that doesn't look like AI model training datasets.

## Add Your Materials (Optional)

Drop files in `/materials` before running setup or upload them during setup:

```
materials/
├── documents/
│   └── resume.pdf       # AI extracts your experience
└── images/
    └── headshot.jpg     # Used in your portfolio
```

## After Setup

Talk to your AI assistant naturally:

- *"Add my new project X"*
- *"Update my work experience"*
- *"Make the hero section more bold"*
- *"Deploy to Vercel"*

Run `./setup.sh` again anytime to edit your config.

## Deploy

Ask your AI, or run directly:

```bash
vercel --prod      # Vercel (recommended)
netlify deploy     # Netlify
```

GitHub Actions workflows are pre-configured in `.github/workflows/`.

## License

MIT
