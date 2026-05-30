# Personal CV / Resume Website — PRD

## Original Problem Statement
"I want my website to by CV or resume. small but complex design I'm looking for I'll tell all the details plese kindly show a sasmples"

## User Choices
- Field: IT sector
- Style: Minimal & elegant with subtle futuristic background
- Sections: All (About, Experience, Education, Skills, Projects, Certifications, Testimonials, Contact, Download PDF, Blog)
- Features: Contact form, Download CV as PDF, Dark/Light mode toggle, Animated/interactive elements
- Content: Sample placeholder content (user will replace later)

## Architecture
- **Frontend**: React 19 + Tailwind + shadcn/ui + framer-motion + lucide-react
- **Backend**: FastAPI + Motor (MongoDB async)
- **Theme**: Custom ThemeProvider toggling `.dark` class
- **PDF**: `window.print()` triggers hidden printable CV (`PrintableCV` component) styled via @media print
- **Fonts**: Outfit (headings), Manrope (body), JetBrains Mono (accents)

## Implemented (sample build — Dec 2025)
- Hero with animated futuristic SVG grid + glow orbs + scan line + noise
- About with stats grid
- Experience timeline
- Skills bento grid with category icons
- Projects asymmetric (bento) grid
- Education + Certifications dual-column tabular layout
- Testimonials carousel (prev/next)
- Blog list
- Contact form → POST /api/contact → MongoDB `contact_messages`
- Light/Dark mode toggle (persisted in localStorage)
- Download CV → window.print() → printable A4 CV
- Mobile-responsive nav
- Tested: 100% backend / 100% frontend critical flows

## User Personas
- IT professional preparing personal portfolio/CV for hiring & networking

## Backlog (P0 / P1 / P2)
- **P0** Swap sample content with user's real bio, experience, projects, etc.
- **P1** Wire contact form to email delivery (Resend integration) so user actually gets messages
- **P1** Replace `window.print()` with a real, designed PDF (jsPDF / server-generated reportlab) for pixel-perfect download
- **P2** Add a small admin/dashboard page to view contact submissions
- **P2** SEO + Open Graph meta tags, favicon, custom domain
- **P2** Add blog detail pages (currently links are #)
- **P2** Analytics (Plausible / GA)

## Next Action Items
1. Collect real content from user (name, bio, photo, jobs, projects, certs, socials)
2. Replace `/app/frontend/src/data/portfolio.js`
3. Optionally add Resend integration for contact-form emails
