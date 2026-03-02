---
name: html-presentation-creation
description: Central design system and guidelines for creating premium HTML presentations, one-pagers, and slide decks. Includes viewport fitting, animation patterns, style presets, and content density rules.
---

# HTML Presentation Design System

Central reference for all presentation design. All presentations use **shared CSS/JS** from `shared/` and support **in-browser editing** with save-to-GitHub.

## Architecture

```
presentations/
├── shared/
│   ├── styles.css            ← Core design system (dark theme + viewport fitting)
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
    ├── rules/
    │   ├── typography.md     ← No em-dashes
    │   └── design-quality.md ← Anti-generic design rules
    └── workflows/
        ├── new-presentation.md
        └── review-presentation.md
```

---

## CRITICAL: Viewport Fitting Requirements

**Every slide MUST fit exactly within the viewport. No scrolling within slides, ever.**

### The Golden Rule

```
Each slide = exactly one viewport height (100vh/100dvh)
Content overflows? → Split into multiple slides or reduce content
Never scroll within a slide.
```

### Content Density Limits

To guarantee viewport fitting, enforce these limits per slide:

| Slide Type | Maximum Content |
|------------|-----------------|
| Title slide | 1 heading + 1 subtitle + optional tagline |
| Content slide | 1 heading + 4-6 bullet points OR 1 heading + 2 paragraphs |
| Feature grid | 1 heading + 6 cards maximum (2x3 or 3x2 grid) |
| Code slide | 1 heading + 8-10 lines of code maximum |
| Quote slide | 1 quote (max 3 lines) + attribution |
| Image slide | 1 heading + 1 image (max 60vh height) |

**If content exceeds these limits - split into multiple slides.**

### Overflow Prevention Checklist

Before generating any presentation, verify:

1. Every `.slide` has `height: 100vh; height: 100dvh; overflow: hidden;`
2. All font sizes use `clamp(min, preferred, max)`
3. All spacing uses `clamp()` or viewport units
4. Content containers have `max-height` constraints
5. Images have `max-height: min(50vh, 400px)` or similar
6. Grids use `auto-fit` with `minmax()` for responsive columns
7. Breakpoints exist for heights: 700px, 600px, 500px
8. No fixed pixel heights on content elements
9. Content per slide respects density limits

---

## Theme Variants

### Dark Theme (Presentations)

Used for: `presentation.html`, `presentation-short.html`, dashboard `index.html`

All dark-theme presentations link to `shared/styles.css` which provides the base tokens, viewport fitting, animations, and component styles.

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
- Scroll-snap with `100vh` slides and reveal animations

**HTML boilerplate for dark presentations:**

```html
<head>
    <meta name="gh-path" content="<project>/<filename>.html">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../shared/styles.css">
    <link rel="stylesheet" href="../shared/edit-mode.css">
</head>
<body>
    <nav class="nav">
        <div class="nav-brand">Brand · Title</div>
        <div class="nav-slides" id="navDots"></div>
        <div class="nav-counter" id="navCounter"></div>
    </nav>

    <!-- slides -->

    <script src="../shared/nav.js"></script>
    <script src="../shared/edit-mode.js"></script>
</body>
```

> **⚠️ CRITICAL:** The `#navDots` and `#navCounter` containers must be **empty** in the HTML.
> `nav.js` generates all nav dots and counter text dynamically. Hardcoding buttons
> or text inside these elements causes **duplicate dots and wrong slide counters**.

### White Theme (One-Pagers)

Used for: `onepager.html` - designed for **printing** (Ctrl+P - Save as PDF)

One-pagers use **inline CSS** because they need different color tokens and A4 print layout. They do NOT link to `shared/styles.css`.

**Characteristics:**

- White background, black text
- A4 page dimensions (`@page { size: A4; margin: 0; }`)
- `max-height: 297mm; overflow: hidden` - must fit one page
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

---

## Style Presets

While the default dark theme works for most presentations, you can apply alternative aesthetic presets by overriding the CSS custom properties. Each preset includes its own font, color palette, and mood.

### Default - Corporate Dark (Current)

The standard theme used in `shared/styles.css`. Professional, clean, glassmorphism.

- **Font:** Inter
- **Mood:** Professional, trustworthy
- **Best for:** Business presentations, technical assessments

### Preset: Bold Signal

Confident, high-impact with vibrant accent on dark background.

```css
:root {
    --bg-dark: #0a0a0a;
    --bg-card: rgba(255, 255, 255, 0.04);
    --bg-card-hover: rgba(255, 255, 255, 0.08);
    --accent-primary: #ff3366;
    --accent-secondary: #ffcc00;
    --text-primary: #ffffff;
    --text-secondary: #a0a0a0;
    --border: rgba(255, 255, 255, 0.08);
}
/* Font: Clash Display (heading) + Satoshi (body) */
/* https://api.fontshare.com/v2/css?f[]=clash-display@700&f[]=satoshi@400;500;700 */
```

- **Mood:** Confident, high-impact, bold
- **Best for:** Pitch decks, keynotes, product launches

### Preset: Dark Botanical

Elegant dark with warm gold accents and soft organic shapes.

```css
:root {
    --bg-dark: #0d1117;
    --bg-card: rgba(197, 160, 89, 0.05);
    --bg-card-hover: rgba(197, 160, 89, 0.1);
    --accent-primary: #c5a059;
    --accent-secondary: #8b9e7c;
    --text-primary: #e8e0d4;
    --text-secondary: #9a9080;
    --border: rgba(197, 160, 89, 0.15);
}
/* Font: Cormorant Garamond (heading) + DM Sans (body) */
/* https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;700 */
```

- **Mood:** Elegant, sophisticated, premium
- **Best for:** Premium brands, luxury pitches, strategy presentations

### Preset: Neon Cyber

Futuristic with electric accent colors and tech aesthetics.

```css
:root {
    --bg-dark: #050510;
    --bg-card: rgba(0, 255, 204, 0.04);
    --bg-card-hover: rgba(0, 255, 204, 0.08);
    --accent-primary: #00ffcc;
    --accent-secondary: #ff00aa;
    --text-primary: #e0f0ff;
    --text-secondary: #607088;
    --border: rgba(0, 255, 204, 0.1);
}
/* Font: Space Grotesk (heading) + JetBrains Mono (code) + Inter (body) */
/* https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@400 */
```

- **Mood:** Futuristic, techy, cutting-edge
- **Best for:** Tech startups, developer tools, AI/ML presentations

### Preset: Terminal Green

Developer-focused with monospace aesthetic and classic green-on-dark.

```css
:root {
    --bg-dark: #0a0f0a;
    --bg-card: rgba(0, 255, 65, 0.04);
    --bg-card-hover: rgba(0, 255, 65, 0.08);
    --accent-primary: #00ff41;
    --accent-secondary: #00cc33;
    --text-primary: #c0ffc0;
    --text-secondary: #608060;
    --border: rgba(0, 255, 65, 0.1);
}
/* Font: JetBrains Mono (all) */
/* https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700 */
```

- **Mood:** Hacker, technical, developer-focused
- **Best for:** Dev tools, API presentations, technical deep-dives

### Mood-to-Preset Mapping

| Mood | Recommended Presets |
|------|-------------------|
| Impressed / Confident | Bold Signal, Corporate Dark |
| Excited / Energized | Neon Cyber, Bold Signal |
| Calm / Focused | Corporate Dark, Dark Botanical |
| Inspired / Moved | Dark Botanical, Terminal Green |

---

## Animation Patterns

### Reveal Animations (in shared/styles.css)

Elements with class `.reveal` will fade in when their parent slide becomes visible:

```css
/* Fade + Slide Up (default) */
.reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide.visible .reveal {
    opacity: 1;
    transform: translateY(0);
}

/* Staggered children */
.reveal:nth-child(1) { transition-delay: 0.1s; }
.reveal:nth-child(2) { transition-delay: 0.2s; }
.reveal:nth-child(3) { transition-delay: 0.3s; }
.reveal:nth-child(4) { transition-delay: 0.4s; }
```

### Additional Entrance Variants

```css
/* Scale In */
.reveal-scale {
    opacity: 0;
    transform: scale(0.9);
}
.slide.visible .reveal-scale {
    opacity: 1;
    transform: scale(1);
}

/* Slide from Left */
.reveal-left {
    opacity: 0;
    transform: translateX(-50px);
}
.slide.visible .reveal-left {
    opacity: 1;
    transform: translateX(0);
}

/* Blur In */
.reveal-blur {
    opacity: 0;
    filter: blur(10px);
}
.slide.visible .reveal-blur {
    opacity: 1;
    filter: blur(0);
}
```

### Background Effects

```css
/* Gradient Mesh - add to any slide */
.gradient-bg {
    background:
        radial-gradient(ellipse at 20% 80%, rgba(120, 0, 255, 0.3) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, rgba(0, 255, 200, 0.2) 0%, transparent 50%),
        var(--bg-dark);
}

/* Grid Pattern overlay */
.grid-bg {
    background-image:
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 50px 50px;
}

/* Noise Texture overlay */
.noise-bg::after {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    pointer-events: none;
}
```

---

## Shared Components

### Card Patterns

Used across both themes:

- `card-danger` / `card-red` - Red left border - problems/risks
- `card-warn` / `card-amber` - Amber left border - warnings/uncertainty
- `card-ok` / `card-green` - Green left border - solutions/benefits
- `card-info` - Blue left border - neutral information

### Badge System

```html
<span class="badge badge-red">Cannot</span>
<span class="badge badge-amber">Partial</span>
<span class="badge badge-green">Proven</span>
```

### Navigation (Dark Theme Only)

- Fixed top nav with dot indicators
- Keyboard: Arrow keys + Space
- IntersectionObserver updates active slide + triggers `.visible` class
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
    <div class="slide-label reveal">Section Label</div>
    <h2 class="slide-title reveal">Title</h2>
    <p class="slide-subtitle reveal">Subtitle text</p>
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

---

## CSS Gotchas

### Never negate CSS functions directly

`-clamp()`, `-min()`, `-max()` are **silently ignored** by browsers with no console error. Always use:

```css
/* WRONG - silently fails */
margin-top: -clamp(1rem, 2vw, 2rem);

/* CORRECT */
margin-top: calc(-1 * clamp(1rem, 2vw, 2rem));
```

### Always use `height: 100vh` NOT `min-height: 100vh` for slides

`min-height` allows content to push the slide taller, breaking the one-slide-per-viewport rule.

---

## Workflow

1. **Source content** - From Loop notes, project briefs, or markdown docs
2. **Create all three formats** using the design system above
3. **Push to GitHub** - Into the project subfolder
4. **Auto-deploy** - GitHub Pages serves at `<user>.github.io/Presentations/<project>/`
5. **Update dashboard** - Add a card to `index.html`

## Tips

- Keep one-pagers under `max-height: 297mm` with `overflow: hidden`
- Use emoji icons for card headers
- Use `clamp()` for ALL responsive font sizes and spacing
- Comparison tables with colored badges are very effective
- Split problems into categories with visual distinction
- Use `.reveal` class on elements for scroll-triggered animations
- Use `Ctrl+E` to edit directly in-browser, then save to GitHub
- When content doesn't fit a slide - **split it**, never scroll
