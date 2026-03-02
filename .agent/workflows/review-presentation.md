---
description: Review an existing presentation for design quality, accessibility, viewport fitting, and visual polish
---

# Review Presentation Workflow

Use this workflow to audit an existing presentation before sharing or deployment.

## 1. Identify the presentation

Determine which project folder and which format(s) to review:

- `presentation.html` (full deck)
- `presentation-short.html` (executive summary)
- `onepager.html` (print handout)

## 2. Viewport Fitting Audit

For each slide in `presentation.html` and `presentation-short.html`:

- [ ] Slide uses `height: 100vh` (not `min-height`)
- [ ] No content overflows below the fold
- [ ] Content respects density limits from SKILL.md
- [ ] Font sizes use `clamp()` for responsive scaling
- [ ] Works at 1920x1080 (desktop) AND 1366x768 (laptop)

For `onepager.html`:

- [ ] Fits within A4 page (297mm height)
- [ ] `overflow: hidden` is set on the page container
- [ ] Print preview shows all content within one page

## 3. Design Quality Check

Reference `.agent/rules/design-quality.md`:

- [ ] No browser-default fonts
- [ ] Color tokens defined in `:root`, no raw color names
- [ ] Maximum 3 accent colors used
- [ ] Background has depth (gradients, glow effects, patterns)
- [ ] Text hierarchy uses 3+ tiers (primary, secondary, muted)
- [ ] Cards have colored left borders for visual categorization
- [ ] Spacing varies intentionally (not uniform everywhere)
- [ ] No more than 6 cards per slide

## 4. Typography Check

Reference `.agent/rules/typography.md`:

- [ ] No em-dashes (-) - use hyphens (-) only
- [ ] Font loaded from Google Fonts with explicit weights
- [ ] Heading weight is 700-900
- [ ] Body text is 400-500

## 5. Animation & Interaction Check

- [ ] `.reveal` class applied to slide content elements
- [ ] Staggered animation delays on child elements
- [ ] Hover effects on interactive cards
- [ ] `prefers-reduced-motion` media query present
- [ ] Navigation keyboard controls work (arrows + space)

## 6. Accessibility Check

- [ ] All images have `alt` attributes
- [ ] Color contrast ratio >= 4.5:1 for body text
- [ ] Focus indicators visible for keyboard navigation
- [ ] Semantic HTML (`section`, `h2`, `h3`, not just divs)
- [ ] `lang` attribute on `<html>` element

## 7. Edit Mode Check

- [ ] `<meta name="gh-path">` tag present with correct path
- [ ] `Ctrl+E` activates edit mode
- [ ] Text elements become editable
- [ ] Save button appears and functions

## 8. Cross-Format Consistency

- [ ] Key messages are consistent across all three formats
- [ ] Stats and data points match between formats
- [ ] Color coding and badges use same semantics
- [ ] Project name and branding consistent

## 9. Report Findings

After completing the audit, summarize:

- **Pass**: Items that meet standards
- **Fix**: Items that need correction (with specific recommendations)
- **Enhancement**: Optional improvements for extra polish

Fix all "Fix" items before sharing the presentation.
