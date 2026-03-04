---
description: How to create a new presentation project with all three formats
---

# Create a New Presentation

## Prerequisites

Read the design system skill first:

```
.agent/skills/SKILL.md
```

## Steps

1. **Create project folder** at `presentations/<project-name>/`

2. **Read the shared CSS** at `shared/styles.css` to understand available classes and tokens

3. **Create `presentation.html`** (full deck, 5-10 slides)
   - Use the **dark theme** boilerplate from SKILL.md
   - Link to `../shared/styles.css`, `../shared/edit-mode.css`
   - Include the `<nav>` with **empty** `#navDots` and `#navCounter` containers (nav.js populates them)
   - Include `../shared/nav.js` and `../shared/edit-mode.js` scripts
   - Add `<meta name="gh-path" content="<project>/presentation.html">`

4. **Create `presentation-short.html`** (3-slide executive summary)
   - Same dark theme setup as above
   - Condense to 3 key slides

5. **Create `onepager.html`** (A4 print-optimized)
   - Use the **white theme** boilerplate from SKILL.md
   - Inline CSS for print styles (do NOT link `shared/styles.css`)
   - Still link `../shared/edit-mode.css` and `../shared/edit-mode.js`
   - Add `<meta name="gh-path" content="<project>/onepager.html">`
   - Must fit within `max-height: 297mm`

6. **Regenerate `index.html` project cards** — Scan all project folders in the repo root (exclude `shared/`, `.agent/`, `.git/`) and rebuild the project cards section of `index.html` from scratch:

   - For each project folder, check which formats exist (`presentation.html`, `presentation-short.html`, `onepager.html`)
   - Extract the project title from the `<title>` tag of the first HTML file found
   - Choose an appropriate emoji icon based on the project topic
   - Write a one-line description based on the presentation content
   - Generate a `.project` card div with links only for the formats that actually exist
   - Replace the entire projects section between `<p class="subtitle">` and `<p class="footer">` with the new cards
   - This ensures the index always reflects the actual filesystem state

7. **Commit and push** to GitHub — GitHub Pages auto-deploys
