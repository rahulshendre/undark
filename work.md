Got it. Here's the full prompt with only the content swapped out for Undark, design untouched, logo added, and a couple extra sections that make sense for what you're building.

Create a React + Vite + TypeScript + Tailwind CSS landing page for a fintech startup called "Undark". The page has 5 sections: Hero, Problem, How It Works, Why Now, and Contact. Use framer-motion for animations and lucide-react for icons. The design is dark, moody, and cinematic with a warm cream color palette.
FONTS
Load two Google Fonts in index.html:
Almarai (weights: 300, 400, 700, 800) — used as the global default font
Instrument Serif (italic only) — used for italic accent text in the Problem section
In index.css, set the global font family:
* { font-family: 'Almarai', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif; }
In tailwind.config.js, extend:
colors.primary: #DEDBC8 (warm cream, used for all primary text and accents)
fontFamily.serif: ['"Instrument Serif"', 'serif']
COLOR SYSTEM
Background: black (#000000) globally, #101010 for the Problem card, #212121 for How It Works cards
Primary text color: #E1E0CC (applied via inline style)
Tailwind primary: #DEDBC8
Gray text: text-gray-400, text-gray-500
Navbar link color: rgba(225, 224, 204, 0.8) with hover: #E1E0CC
CUSTOM CSS UTILITIES (index.css)
Two SVG noise texture utilities:
.noise-overlay: fractal noise (baseFrequency: 0.85, numOctaves: 3) used as overlay on hero
.bg-noise: fractal noise (baseFrequency: 0.9, numOctaves: 4) used as subtle background in How It Works section
Both use inline SVG data URIs with feTurbulence filter.
ANIMATED SVG LOGO
Create an AnimatedLogo component that renders an SVG logo for "Undark" inline in the navbar and as a standalone mark. The logo concept: a circle that is half dark half light — the left half filled #101010, the right half filled #E1E0CC — representing bringing light into darkness. Around the circle, draw a thin arc (only the right 270 degrees, not a full circle) that animates on mount: it draws itself using stroke-dasharray and stroke-dashoffset, going from fully hidden to fully visible over 1.2 seconds with ease-out. The circle itself fades in from opacity 0 to 1 over 0.6 seconds. Below or beside the mark, the wordmark "undark" in Almarai font-weight 300 tracking-widest, color #E1E0CC, also fades in with a 0.4s delay. The SVG viewBox should be 120x40 for the horizontal lockup version (mark on left, wordmark on right) and 40x40 for the mark-only version. Use framer-motion for all animations. Export both AnimatedLogoLockup and AnimatedLogoMark as named exports.
SECTION 1: HERO
Full viewport height (h-screen). The entire section has p-4 md:p-6 padding creating an inset effect. Inside is a container with rounded-2xl md:rounded-[2rem] and overflow-hidden.
Background: deep black with a very subtle radial gradient from #0a0f1a at center to #000000 at edges, giving a slight depth. On top of this place the .noise-overlay with opacity-[0.7] mix-blend-overlay pointer-events-none. Also a gradient overlay: bg-gradient-to-b from-black/30 via-transparent to-black/60.
Navbar:
Absolutely positioned at top center. Black background pill that hangs from top edge: bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8. Contains the AnimatedLogoLockup on the left and 4 nav items on the right: "Problem", "How it works", "Why now", "Talk to us". Text size: text-[10px] sm:text-xs md:text-sm. Gap between items: gap-3 sm:gap-6 md:gap-12 lg:gap-14. Link color: rgba(225, 224, 204, 0.8), hover: #E1E0CC.
Hero Content (bottom-aligned):
Absolutely positioned at bottom: absolute bottom-0 left-0 right-0. 12-column grid: left 8 columns for heading, right 4 columns for text + button.
Giant heading "Undark" using WordsPullUp component: Responsive sizes: text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw]. font-medium leading-[0.85] tracking-[-0.07em]. Color: #E1E0CC. Pull-up animation: each word slides up from y:20 with staggered delay of 0.08s, triggered by useInView.
Description paragraph (right column): "AI recovery infrastructure for sub-Rs.1L loans. We make small-ticket debt recovery economically viable for NBFCs and MFIs." text-primary/70 text-xs sm:text-sm md:text-base, line-height: 1.2. Framer motion: fade up from y:20, delay 0.5s, custom ease [0.16, 1, 0.3, 1].
CTA Button "Request early access": Pill shape: bg-primary rounded-full. Black text, font-medium, text-sm sm:text-base. Right side has a black circle containing a white/cream ArrowRight icon. Hover: gap increases (hover:gap-3), circle scales up (group-hover:scale-110). Framer motion: fade up from y:20, delay 0.7s, same custom ease.
SECTION 2: PROBLEM
bg-black, padded section with centered content. Inner card: bg-[#101010], centered text, max-w-6xl.
Top: small label "The problem" in text-primary, text-[10px] sm:text-xs.
Main heading uses WordsPullUpMultiStyle with 3 segments: "Sub-Rs.1L loans don't get recovered." — font-normal. "They get written off." — italic font-serif. "Rs.4,000-5,000 crore every year, quietly." — font-normal. Container: text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9]. Each word animates in with pull-up effect staggered at 0.08s.
Three stat blocks displayed in a row below the heading, each fading in staggered: "Rs.4,000-5,000 Cr" / "written off annually in sub-Rs.1L unsecured loans", "16%" / "MFI gross NPA as of March 2025", "Rs.480-850" / "cost per field visit vs Rs.10K loan value". Stats in text-primary text-4xl font-bold, labels in text-gray-400 text-sm.
Body paragraph below with scroll-linked character opacity animation: "When a borrower stops paying on a Rs.10,000 loan, the lender has no good option. Sending a field agent costs more than the loan is worth. Digital channels fail once a borrower goes silent. So the loan gets written off. No funded technology company is solving this specifically." text-[#DEDBC8], text-xs sm:text-sm md:text-base. Each character individually wrapped in AnimatedLetter component with scroll-linked opacity exactly as specified in the original prompt.
SECTION 3: HOW IT WORKS
min-h-screen bg-black, with subtle .bg-noise overlay at opacity-[0.15].
Header text uses WordsPullUpMultiStyle: Line 1: "Three things. That's it." in cream. Line 2: "No new dialers. No ripping out what works." in text-gray-500. Both: text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal.
3-column card grid (lg:h-[480px], gap-3 sm:gap-2 md:gap-1). Each card has staggered entrance animation: scale from 0.95 + fade in, triggered by useInView (once, margin "-100px"), staggered at 0.15s intervals with ease [0.22, 1, 0.36, 1].
Card 1 — "Intent scoring." (01): bg-[#212121]. Small icon at top. Title with number. 4 checklist items: "Analyses every prior borrower signal", "IVR responses, call patterns, payment timing", "Outputs a recovery probability score", "Routes each account to the right channel". "Learn more" link with rotated ArrowRight (-45deg).
Card 2 — "AI voice outreach." (02): bg-[#212121]. Same layout. 4 checklist items: "Calls in borrower's language — Hindi, Hinglish, Tamil, Marathi", "Full context of every prior interaction", "Rs.12-25 per resolved contact vs Rs.480-850 field visit", "8-10 attempts on a Rs.10K loan costs Rs.100-200 total". "Learn more" link with rotated ArrowRight.
Card 3 — "Surgical field dispatch." (03): bg-[#212121]. Same layout. 4 checklist items: "Only sends agents to accounts that need a visit", "Agent knows when to go, what to say, what worked before", "Converts blind visits into targeted ones", "Every outcome feeds back into the model". "Learn more" link with rotated ArrowRight.
All checklist items use Check icon from lucide-react in text-primary color, with text-gray-400 description text.
SECTION 4: WHY NOW
bg-black, padded, centered. max-w-4xl mx-auto.
Top label: "Why now" in text-primary text-xs.
Main heading using WordsPullUp: "The infrastructure for small-ticket recovery doesn't exist. We're building it." text-3xl sm:text-4xl md:text-5xl font-normal color #E1E0CC leading-tight.
Three cards in a row, each bg-[#101010] rounded-2xl p-6, staggered fade-in: Card 1: "MFI stress at a 7-year high" / "Gross NPA at 16% as of March 2025, up from 8.8% a year prior. Lenders are losing money they have no mechanism to recover." Card 2: "Human infrastructure is broken" / "Certified recovery agents don't exist in Tier-3/4/5 cities. The NBFC industry body is lobbying RBI to ease requirements because the people aren't there." Card 3: "Zero funded tech players here" / "Credgenics, DPDzero, Riverline — all built for digital-first Tier-1 borrowers. Sub-Rs.1L MFI borrowers in cash-economy India have nobody." Each card title in text-primary font-medium, body in text-gray-400 text-sm leading-relaxed.
SECTION 5: CONTACT
bg-black, full section, centered. The AnimatedLogoMark displayed large (80x80) centered at top of section.
Heading using WordsPullUp: "We are onboarding our first three NBFC partners." text-3xl sm:text-4xl md:text-5xl font-normal #E1E0CC.
Subtext: "If you run collections for an NBFC or MFI and sub-Rs.1L write-offs are a real problem for you, we want to talk." text-primary/70 text-sm md:text-base max-w-xl mx-auto.
Simple email input + submit button, same pill design as the CTA button in hero. Input placeholder "your@email.com", button text "Request access". Both fade in from y:20.
Below the form, two lines in text-gray-500 text-xs: "Rahul Bhosale — Vaibhav Gupta" and "IIMA AI Summer Residency 2026".
SHARED ANIMATION COMPONENTS
WordsPullUp: same as original. WordsPullUpMultiStyle: same as original. AnimatedLetter: same scroll-linked character opacity as original.
RESPONSIVE BREAKPOINTS
Fully responsive. Cards switch from 1-col mobile to 3-col lg. Hero text scales from 26vw to 19vw. All padding, font sizes, spacing use Tailwind responsive prefixes.
TECH STACK
Vite + React 18 + TypeScript, Tailwind CSS 3, framer-motion, lucide-react.