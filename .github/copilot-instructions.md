# Presentation Project - AI Instructions

These instructions apply to all AI models working in this repository. Read them fully before making any changes.

## Project Architecture

```
presentations/
├── shared/
│   ├── styles.css            ← Core design system (dark theme + viewport fitting)
│   ├── nav.js                ← Slide navigation + keyboard controls
│   ├── edit-mode.css         ← Floating toolbar & edit indicators
│   └── edit-mode.js          ← contenteditable toggle + GitHub/local save
├── index.html                ← Dashboard (project cards auto-regenerated from folders)
├── <project-name>/
│   ├── presentation.html     ← Full 5-10 slide deck (dark theme)
│   ├── presentation-short.html  ← 3-slide executive summary (dark theme)
│   └── onepager.html         ← A4 print-optimized (white theme, inline CSS)
└── .github/
    └── copilot-instructions.md  ← This file
```

## Three Formats Per Project

| Format | Theme | Purpose | Slides |
|--------|-------|---------|--------|
| `presentation.html` | Dark | Full detail deck | 5-10 |
| `presentation-short.html` | Dark | Executive summary | 3 |
| `onepager.html` | White | Print/PDF handout | 1 page |

---

## CRITICAL: Viewport Fitting

**Every slide MUST fit exactly within the viewport. No scrolling within slides, EVER.**

### Content Density Limits

| Slide Type | Maximum Content |
|------------|-----------------|
| Title slide | 1 heading + 1 subtitle + optional tagline |
| Content slide | 1 heading + 4-6 bullets OR 1 heading + 2 paragraphs |
| Feature grid | 1 heading + 6 cards max (2x3 or 3x2) |
| Code slide | 1 heading + 8-10 lines max |
| Quote slide | 1 quote (max 3 lines) + attribution |

**If content exceeds these limits - split into multiple slides.**

### Overflow Prevention

- Every `.slide` must have `height: 100vh; height: 100dvh; overflow: hidden;`
- All font sizes must use `clamp(min, preferred, max)`
- Use `height: 100vh` NOT `min-height: 100vh` for slides
- Content per slide must respect density limits above
- Never use `-clamp()` directly - use `calc(-1 * clamp(...))`

---

## Typography Rules

- **NEVER** use browser-default fonts (Times New Roman, Arial, Georgia)
- **NEVER** use more than 2 font families per presentation
- **ALWAYS** use Google Fonts or Fontshare with explicit weight loading
- Heading weights: 700-900 (never 400)
- Body text weights: 400-500
- Use `clamp()` for ALL responsive font sizes
- Minimum body text: `clamp(0.8rem, 1.2vw, 1rem)`
- **NEVER** use em-dashes (—). Always use a regular hyphen (-) instead.

---

## Color Rules

- **NEVER** use raw CSS color names (`red`, `blue`, `green`)
- **ALWAYS** define curated color tokens in `:root` variables
- Maximum 3 accent colors per theme
- Badge severity: Red = Critical, Amber = Warning, Green = OK, Blue = Info

### Default Dark Theme Tokens

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

---

## Design Quality Standards

Prevent generic "AI slide" aesthetics. Every presentation must feel intentional and premium.

### Anti-Generic Checklist

Before finalizing, verify NONE of these are present:

- Generic gradient backgrounds without purpose
- Drop shadows on every element
- Same border-radius on every element
- Centered-everything layout (vary alignment intentionally)
- Equal spacing everywhere (use rhythm)
- More than 6 cards visible on one slide
- Text that requires scrolling within a slide

### Required

- **ALWAYS** include `.reveal` animations on slide content
- **ALWAYS** add hover effects on interactive cards
- **ALWAYS** respect `prefers-reduced-motion`
- Use asymmetric layouts where possible (60/40 splits)
- Use whitespace as a design element

---

## Dark Theme Boilerplate

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

> ⚠️ The `#navDots` and `#navCounter` containers must be **empty** in the HTML. `nav.js` generates all nav dots and counter text dynamically.

## White Theme (One-Pager) Boilerplate

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
    <div class="page"> <!-- A4 constrained, max-height: 297mm -->
        <!-- content -->
    </div>
    <script src="../shared/edit-mode.js"></script>
</body>
```

One-pagers do NOT link to `shared/styles.css` - they use inline CSS.

---

## Slide Structure

```html
<section class="slide" id="slide-N">
    <div class="hero-glow" style="background: var(--accent-red);"></div>
    <div class="slide-label reveal">Section Label</div>
    <h2 class="slide-title reveal">Title</h2>
    <p class="slide-subtitle reveal">Subtitle text</p>
    <!-- Content: grids, cards, tables, quotes -->
</section>
```

## Card Patterns

- `card-danger` / `card-red` - Red left border - problems/risks
- `card-warn` / `card-amber` - Amber left border - warnings
- `card-ok` / `card-green` - Green left border - solutions/benefits
- `card-info` - Blue left border - neutral information

---

## Dashboard Auto-Regeneration

When adding a new project, regenerate `index.html` project cards:

1. Scan all project folders (exclude `shared/`, `.agent/`, `.git/`, `.github/`)
2. For each folder, check which formats exist
3. Extract the project title from the `<title>` tag
4. Generate a `.project` card div with links for existing formats only
5. Replace the projects section in `index.html`

---

## Tips

- Keep one-pagers under `max-height: 297mm` with `overflow: hidden`
- Use emoji icons for card headers
- Use `clamp()` for ALL responsive font sizes and spacing
- When content doesn't fit a slide - **split it**, never scroll
- Use `Ctrl+E` to edit directly in-browser, then save
