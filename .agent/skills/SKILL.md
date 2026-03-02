---
name: html-presentation-creation
description: Central design system and guidelines for creating premium HTML presentations, one-pagers, and slide decks
---

# HTML Presentation Design System

Central reference for all presentation design. All presentations use **shared CSS/JS** from `shared/` and support **in-browser editing** with save-to-GitHub.

## Architecture

```
presentations/
├── shared/
│   ├── styles.css            ← Core design system (dark theme)
│   ├── nav.js                ← Slide navigation + keyboard controls
│   ├── edit-mode.css         ← Floating toolbar & edit indicators
│   └── edit-mode.js          ← contenteditable toggle + GitHub save
├── index.html                ← Dashboard linking all presentations
├── <project-name>/
│   ├── presentation.html     ← Full 5-10 slide deck (dark theme)
│   ├── presentation-short.html  ← 3-slide executive summary (dark theme)
│   └── onepager.html         ← A4 print-optimized (white theme, inline CSS)
└── .agent/
    ├── skills/SKILL.md       ← This file
    └── workflows/new-presentation.md
```

## Theme Variants

### 🖤 Dark Theme (Presentations)

Used for: `presentation.html`, `presentation-short.html`, dashboard `index.html`

All dark-theme presentations link to `shared/styles.css` which provides:

```css
:root {
    --bg-dark: #0a0e1a;
    --bg-card: #111827;
    --bg-card-hover: #1a2235;
    --accent-red: #ef4444;
    --accent-amber: #f59e0b;
    --accent-green: #10b981;
    --text-primary: #f1f5f9;
    --text-secondary: #94a3b8;
    --text-muted: #64748b;
    --border: #1e293b;
}
```

**Characteristics:**

- Dark gradient background (`#0a0e1a`)
- Glassmorphism cards with colored left borders
- Inter font, 700-800 for headings, 400-500 for body
- Hero-glow effects on slides, dot-based navigation
- Smooth scroll with `100vh` slides

**HTML boilerplate for dark presentations:**

```html
<head>
    <meta name="gh-path" content="<project>/<filename>.html">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../shared/styles.css">
    <link rel="stylesheet" href="../shared/edit-mode.css">
</head>
<body>
    <!-- slides -->
    <script src="../shared/nav.js"></script>
    <script src="../shared/edit-mode.js"></script>
</body>
```

### 🤍 White Theme (One-Pagers)

Used for: `onepager.html` — designed for **printing** (Ctrl+P → Save as PDF)

One-pagers use **inline CSS** because they need different color tokens and A4 print layout. They do NOT link to `shared/styles.css`.

**Characteristics:**

- White background, black text
- A4 page dimensions (`@page { size: A4; margin: 0; }`)
- `max-height: 297mm; overflow: hidden` — must fit one page
- Same Inter font family, same card pattern structure
- Same colored left-border cards (red/amber/green) but on white bg
- Still links to `shared/edit-mode.css` and `shared/edit-mode.js` for editing

**HTML boilerplate for one-pagers:**

```html
<head>
    <meta name="gh-path" content="<project>/onepager.html">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../shared/edit-mode.css">
    <style>
        @page { size: A4; margin: 0; }
        /* White-theme inline styles */
    </style>
</head>
<body>
    <div class="page"> <!-- A4 constrained -->
        <!-- content -->
    </div>
    <script src="../shared/edit-mode.js"></script>
</body>
```

## Shared Components

### Card Patterns

Used across both themes:

- `card-danger` / `card-red` — Red left border → problems/risks
- `card-warn` / `card-amber` — Amber left border → warnings/uncertainty
- `card-ok` / `card-green` — Green left border → solutions/benefits
- `card-info` — Blue left border → neutral information

### Badge System

```html
<span class="badge badge-red">Cannot</span>
<span class="badge badge-amber">Partial</span>
<span class="badge badge-green">Proven</span>
```

### Navigation (Dark Theme Only)

- Fixed top nav with dot indicators
- Keyboard: Arrow keys + Space
- IntersectionObserver updates active slide
- Counter: "N / total"

### Edit Mode (All Themes)

Toggle with `Ctrl+E`. Floating toolbar appears. Click any text to edit. Save commits directly to GitHub via Contents API.

Requires:

- `<meta name="gh-path" content="<project>/<file>.html">` in `<head>`
- `<link rel="stylesheet" href="../shared/edit-mode.css">` in `<head>`
- `<script src="../shared/edit-mode.js"></script>` before `</body>`
- GitHub PAT (prompted on first save, stored in `localStorage`)

## Three Formats Per Project

| Format | Theme | Purpose | Slides |
|--------|-------|---------|--------|
| `presentation.html` | Dark | Full detail deck | 5-10 |
| `presentation-short.html` | Dark | Executive summary | 3 |
| `onepager.html` | White | Print/PDF handout | 1 page |

## Slide Structure (Dark Theme)

```html
<section class="slide" id="slide-N">
    <div class="hero-glow" style="background: var(--accent-red);"></div>
    <div class="slide-label">Section Label</div>
    <h2 class="slide-title">Title</h2>
    <p class="slide-subtitle">Subtitle text</p>
    <!-- Content: grids, cards, tables, quotes -->
</section>
```

## One-Pager Structure (White Theme)

```html
<div class="page"> <!-- A4 constrained -->
    <div class="header">...</div>
    <div class="stats">...</div>
    <h2>Section</h2>
    <div class="cols">...</div>
    <div class="rec">...</div>
</div>
```

## Workflow

1. **Source content** — From Loop notes, project briefs, or markdown docs
2. **Create all three formats** using the design system above
3. **Push to GitHub** — Into the project subfolder
4. **Auto-deploy** — GitHub Pages serves at `<user>.github.io/Presentations/<project>/`
5. **Update dashboard** — Add a card to `index.html`

## Tips

- Keep one-pagers under `max-height: 297mm` with `overflow: hidden`
- Use emoji icons for card headers (🔄, 📂, 💥, ✅, ❌)
- Use `clamp()` for responsive font sizes
- Comparison tables with colored badges are very effective
- Split problems into categories with visual distinction
- Use `Ctrl+E` to edit directly in-browser, then save to GitHub
