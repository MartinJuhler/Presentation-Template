# Design Quality Standards

## Purpose

Prevent generic "AI slide" aesthetics. Every presentation must feel intentional, distinctive, and premium.

## Typography Rules

- **NEVER** use browser-default fonts (Times New Roman, Arial, Georgia)
- **NEVER** use more than 2 font families per presentation
- **ALWAYS** use Google Fonts or Fontshare with explicit weight loading
- Heading weights: 700-900 (never 400)
- Body text weights: 400-500
- Use `clamp()` for ALL responsive font sizes - no fixed `px` for text
- Minimum body text: `clamp(0.8rem, 1.2vw, 1rem)` - never smaller

## Color Rules

- **NEVER** use raw CSS color names (`red`, `blue`, `green`, `orange`)
- **ALWAYS** define curated color tokens in `:root` variables
- Maximum 3 accent colors per theme
- Accent colors must have matching glow variants (`rgba()` with 0.1-0.2 opacity)
- Background must have depth - use subtle gradients, not flat colors
- Text colors need at least 3 tiers: primary, secondary, muted

## Anti-Generic Visual Checklist

Before finalizing any presentation, verify NONE of these are present:

- [ ] Generic gradient backgrounds (rainbow, blue-to-purple without purpose)
- [ ] Drop shadows on every element (use sparingly for depth)
- [ ] Rounded rectangles with no visual hierarchy
- [ ] Same border-radius on every element
- [ ] Stock-looking placeholder icons
- [ ] Centered-everything layout (vary alignment intentionally)
- [ ] Equal spacing everywhere (use rhythm - vary padding/margins)
- [ ] More than 6 cards visible on one slide
- [ ] Text that requires scrolling within a slide

## Spatial Composition

- Use **asymmetric layouts** where possible (60/40 splits, offset grids)
- **Vary card sizes** - not every card in a grid should be identical
- **Use whitespace** as a design element - generous padding on hero slides
- **Hero glow effects** should use accent colors, positioned off-center
- **Background patterns** (grid, noise, gradient mesh) add depth

## Motion & Interaction

- **ALWAYS** include `.reveal` animations on slide content
- **ALWAYS** add hover effects on interactive cards
- **ALWAYS** respect `prefers-reduced-motion` with a media query
- Transition timing: `cubic-bezier(0.16, 1, 0.3, 1)` for smooth deceleration
- Stagger animation delays by 0.1s per child element
- Never animate more than 2 properties simultaneously

## Badge & Severity Consistency

- Red = Problem / Cannot / Critical
- Amber = Warning / Partial / Medium
- Green = OK / Proven / Low risk
- Blue = Info / Neutral / Reference

Never mix these meanings within a presentation.
