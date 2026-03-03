# 📊 Presentations

**An open-source framework for building beautiful, AI-powered HTML presentations.**

Create stunning slide decks, executive summaries, and one-pagers using pure HTML and CSS — then host them for free on GitHub Pages. Designed to work seamlessly with AI coding assistants (Cursor, Windsurf, Antigravity, Copilot) via built-in agent rules, skills, and workflows.

---

## 🎬 See It in Action

### [▶️ Interactive How-To Walkthrough](https://martinjuhler.github.io/Presentation-Template/walkthrough/)

### [🐟 Live Examples & Dashboard](https://martinjuhler.github.io/Presentation-Template/)

Includes AKVA Nautilus example presentations (full deck, 3-slide pitch, one-pager) — all generated from the same source material.

---

## ✨ What You Get

| Feature | Description |
|---------|-------------|
| 🎨 **Dark theme design system** | Premium color tokens, responsive typography with `clamp()`, and glassmorphism cards |
| 🔄 **Scroll-snap slides** | Full-viewport slides with smooth snap-to scrolling |
| ✨ **Reveal animations** | Top-to-bottom staggered fade-in on scroll (configurable speed and style) |
| ✏️ **Edit mode** | Press `E` to toggle inline editing — make quick text changes right in the browser |
| 🧭 **Auto navigation** | Dot indicators + slide counter generated automatically from your slides |
| 📄 **One-pager template** | A4 print-optimized layout for executive one-pagers |
| 🤖 **AI coding agent skills** | Pre-built rules, skills, and workflows for AI assistants |
| 🌐 **Zero dependencies** | No build step. Pure HTML/CSS/JS. Deploy anywhere. |

---

## 🚀 Quick Start

### 1. Use this template

Click **"Use this template"** on GitHub (or fork the repo), then clone:

```bash
git clone https://github.com/YOUR-USERNAME/Presentations.git
cd Presentations
```

### 2. Open in VS Code

```bash
code .
```

Copilot automatically reads the `.agent/` folder for design rules and skills.

### 3. Paste your knowledge into AI

Open Copilot Chat and paste in whatever you have — meeting notes, URLs, bullet points, product specs. No formatting needed.

### 4. Ask AI to build your slides

```
@workspace Read .agent/skills/SKILL.md for the design system.
Based on the knowledge I just shared, create three presentations:
a one-pager, a 3-slide pitch, and a full 6-slide deck about [your topic].
```

### 5. Preview locally

Open any HTML file directly in your browser — no build step, no server needed:

```bash
# Or use a local server:
python -m http.server 8000    # Python
npx serve .                   # Node.js
```

### 6. Deploy to GitHub Pages

1. Go to your repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` → `/ (root)`
4. Your presentations are live at `https://YOUR-USERNAME.github.io/Presentations/`

---

## 📁 Project Structure

```
Presentations/
├── shared/                    # Shared framework (don't modify unless customizing)
│   ├── styles.css             # Design system: tokens, layouts, animations
│   ├── nav.js                 # Scroll navigation + reveal animation engine
│   ├── edit-mode.css          # Edit mode styles
│   └── edit-mode.js           # Press E to edit text inline
│
├── akva-nautilus/              # ← Live example — copy this to start your own
│   ├── presentation.html      # Full 6-slide deck
│   ├── presentation-short.html # 3-slide pitch
│   └── onepager.html          # Executive one-pager
│
├── walkthrough/               # Interactive how-to guide
│   └── index.html             # Step-by-step walkthrough
│
├── my-project/                # ← Your presentations go here
│   ├── presentation.html      # Full slide deck
│   ├── presentation-short.html # Executive summary (optional)
│   └── onepager.html          # One-pager (optional)
│
├── .agent/                    # AI coding assistant configuration
│   ├── skills/SKILL.md        # Design system documentation for AI
│   ├── rules/                 # Design quality & typography rules
│   └── workflows/             # Step-by-step workflows
│
├── index.html                 # Dashboard linking to all projects
└── README.md                  # This file
```

---

## 🎨 Available Components

The design system in `shared/styles.css` provides:

### Slide Layouts

```html
<div class="slide slide-title">      <!-- Centered title slide -->
<div class="slide">                   <!-- Standard content slide -->
```

### Content Grids

```html
<div class="grid-2">...</div>        <!-- 2-column grid -->
<div class="grid-3">...</div>        <!-- 3-column grid -->
```

### Cards

```html
<div class="card">
    <div class="card-icon">⚡</div>
    <h3>Card Title</h3>
    <p>Card content here.</p>
</div>
```

### Badges & Labels

```html
<div class="badge">CATEGORY</div>
<div class="section-label">SECTION</div>
```

### Statistics

```html
<div class="stat-number" style="color: var(--accent-green);">42%</div>
```

### Reveal Animations

Add `class="reveal"` to any element for staggered top-to-bottom fade-in:

```html
<h2 class="reveal">This fades in first</h2>
<p class="reveal">This fades in second</p>
<div class="card reveal">This fades in third</div>
```

**Variants:**

- `reveal` — Fade up (default)
- `reveal-scale` — Scale in
- `reveal-left` — Slide from left
- `reveal-blur` — Blur in

### Color Tokens

```css
var(--accent-red)       /* #ef4444 — alerts, critical */
var(--accent-amber)     /* #f59e0b — warnings, highlights */
var(--accent-green)     /* #10b981 — success, positive */
var(--bg-dark)          /* #0a0e1a — page background */
var(--bg-card)          /* #111827 — card background */
var(--text-primary)     /* #f1f5f9 — main text */
var(--text-secondary)   /* #94a3b8 — secondary text */
```

---

## ✏️ Edit Mode

Click the **⚡ Edit** button on any presentation to toggle inline editing:

- All text elements become editable — click and type to change content
- Click **💾 Save** to commit changes directly to your GitHub repo
- Your first save will ask for a GitHub Personal Access Token (PAT) with `contents:write` scope
- The token is stored in `localStorage` for future saves

**Repo auto-detection**: On GitHub Pages, the repo owner and name are auto-detected from the URL. For custom hosting, add meta tags to your HTML `<head>`:

```html
<meta name="gh-owner" content="YOUR-USERNAME">
<meta name="gh-repo" content="YOUR-REPO-NAME">
```

This lets you make quick edits and polish directly in the browser, with changes saved back to GitHub.

---

## 🤖 Supercharge with AI + MCP

This framework is designed to be **most powerful when paired with an AI coding assistant** that has access to note-taking tools via MCP (Model Context Protocol).

### The Workflow

1. **Gather your content** in a note-taking app (OneNote, Notion, Obsidian, etc.)
2. **Connect your AI assistant** to the notes via MCP
3. **Tell your AI**: *"Create a presentation about [topic] using the content from my notes"*
4. The AI reads the `.agent/skills/SKILL.md` and follows the design system automatically

### Supported AI Assistants

| Assistant | How to use |
|-----------|-----------|
| **Antigravity** | Skills and workflows are auto-detected from `.agent/` |
| **Cursor** | Add `.cursorrules` or use the `.agent/` folder |
| **Windsurf** | Reads `.agent/` configuration automatically |
| **GitHub Copilot** | Reference the SKILL.md in your prompt |
| **Any AI assistant** | Paste the SKILL.md content as context |

### MCP Servers That Pair Well

| MCP Server | Purpose |
|------------|---------|
| **MS365** | Read OneNote notebooks, Outlook emails, OneDrive files |
| **Notion** | Pull content from Notion databases and pages |
| **Obsidian** | Access Obsidian vault notes |
| **Google Drive** | Read Google Docs and Sheets |
| **Confluence** | Pull from Atlassian Confluence wikis |
| **GitHub** | Reference issues, PRs, and documentation |

### Example Prompts

```
"Read my OneNote page about the Q4 strategy and create a 5-slide presentation"

"Turn my meeting notes from last Tuesday into an executive one-pager"

"Create a presentation from the product brief in my OneDrive, 
 focus on the competitive analysis section"

"Read the wiki page about our architecture and make a technical overview deck"
```

---

## 📐 Design Rules

The `.agent/rules/` folder includes quality standards that AI assistants follow:

- **Typography**: Max 2 font families, specific weight hierarchy, `clamp()` for responsive sizing
- **Colors**: Curated tokens only — no raw hex values outside the design system
- **Density**: Max 6 bullet points per slide, 3 cards per row, 8 words per heading
- **Motion**: All animations respect `prefers-reduced-motion`
- **Print**: One-pagers are A4-optimized with `max-height: 297mm`

---

## 🛠️ Customizing the Design System

### Changing colors

Edit `shared/styles.css` root variables:

```css
:root {
    --bg-dark: #0a0e1a;      /* Change page background */
    --accent-red: #ef4444;    /* Change accent colors */
    --accent-amber: #f59e0b;
    --accent-green: #10b981;
}
```

### Changing fonts

Replace the Google Fonts import in your HTML `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=YOUR+FONT:wght@300;400;500;600;700;800&display=swap"
    rel="stylesheet">
```

### Adjusting animation speed

In `shared/styles.css`, the reveal animation uses:

- **Duration**: `0.4s` (change for slower/faster fade)
- **Stagger**: `0.06s` per element (change `* 0.06s` in `transition-delay`)
- **Distance**: `20px` translateY (change for more/less movement)

---

## 📊 Creating Multiple Formats

For each topic, consider creating three formats:

| Format | Use Case | File |
|--------|----------|------|
| **Full Deck** | Detailed walkthrough (5-10 slides) | `presentation.html` |
| **Executive Summary** | Quick overview (3 slides) | `presentation-short.html` |
| **One-Pager** | Print/email handout (single page) | `onepager.html` |

---

## 🤝 Contributing

1. Fork this repo
2. Create your feature branch: `git checkout -b feature/new-component`
3. Make your changes
4. Push and open a PR

Ideas for contributions:

- New slide layout components
- Additional theme variants (light mode, high contrast)
- Chart/diagram integration
- PDF export automation
- New style presets

---

## 📜 License

MIT — use it however you like, commercially or personally.
