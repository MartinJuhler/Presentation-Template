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

6. **Update `index.html`** — Add a project card to the dashboard:

   ```html
   <div class="project">
       <div class="project-header">
           <span class="project-icon">🎯</span>
           <span class="project-title">Project Name</span>
       </div>
       <p class="project-desc">Brief description.</p>
       <div class="links">
           <a class="primary" href="<project>/presentation.html">📊 Full Presentation</a>
           <a class="primary" href="<project>/presentation-short.html">⚡ Executive Summary</a>
           <a class="primary" href="<project>/onepager.html">📄 One-Pager</a>
       </div>
   </div>
   ```

7. **Commit and push** to GitHub — GitHub Pages auto-deploys
