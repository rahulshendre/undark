# Undark — Marketing Landing

The public landing page for **Undark**, the case-intelligence copilot. This repo
is the *marketing site*, not the product. The product lives in the sibling repo
`../undark_build` (Next.js). Open `../undark.code-workspace` to work on both.

## Stack

Vite 6 + React 18 + TypeScript + Tailwind 3. `framer-motion` for animation,
`lucide-react` for icons. `npm run dev` → http://localhost:5173.

## Design system (do not drift)

Dark, moody, cinematic with a warm cream palette.

- **Fonts:** Almarai (global default; 300/400/700/800), Instrument Serif (italic
  accents only, Problem section). Loaded in `index.html`, set globally in
  `index.css`.
- **Color:** background black `#000000` (`#101010` Problem card, `#212121` How It
  Works cards). Primary text `#E1E0CC` (inline style). Tailwind `primary`
  `#DEDBC8`. Gray text via `text-gray-400/500`. Navbar links
  `rgba(225,224,204,0.8)`, hover `#E1E0CC`.
- Two SVG noise-texture utilities live in `index.css`.

## Layout

```
src/
  App.tsx                page shell
  main.tsx               entry
  sections/              Hero, Problem, HowItWorks, WhyNow, ProductPreview,
                         Contact, Footer
  components/            AnimatedLogo, Cursor, Magnetic, ScrollProgress,
                         StatsTicker, TextAnimations
  hooks/useAnimatedFavicon.ts
```

## Copy must match the product

Positioning here has to track what `../undark_build` actually does. Current
tagline: *"The case-intelligence copilot for loan recovery."* The site sells one
thing — upload a messy case file, get a clean workspace (timeline, missing docs,
risks, compliance, next action, draft notice) in under a minute. Audience is the
**practitioner** (recovery experts, boutique firms, small agencies), not lenders.
If product scope or claims change, update the relevant `src/sections/*`. Never
promise capabilities the product doesn't ship — and never drift back into dialer,
AI-voice, field-dispatch, or borrower-facing claims; those are explicitly out.
