# Collectible Appraisal — Product Requirements Document

## Original Problem Statement
Build a production-quality frontend shell (React SPA) for "Collectible Appraisal" — an AI-powered collectible marketplace inspired by Apple × Sotheby's × Linear × Arc. Users can:
1. Photograph a collectible → 
2. Receive an AI-powered market valuation (with confidence, comparable sales, rationale, improvement suggestions) → 
3. List for sale on the curated marketplace.

Categories: Fine Art, Pokémon, Magic: The Gathering, Comics, Coins, Signed Memorabilia.

Scope: Frontend + application shell only. All backend calls stubbed via a service layer (`services/*.service.js`).

## Design Philosophy
"Apple Store inside Sotheby's." Minimal, sophisticated, premium, calm. Photography is the hero. Dark theme only (MVP). Space Grotesk headings, Inter body. Palette: #0B0F14 bg, #151B23 surface, #2A3441 border, #F8FAFC text, #94A3B8 muted, #2563EB primary blue, #D4AF37 accent gold.

## Architecture
- React SPA (CRA + CRACO), Tailwind CSS, React Router v6, Lucide icons.
- Feature-based folder structure: `pages/`, `components/{ui,layout,marketplace,appraise}/`, `services/`, `data/`, `lib/`.
- Service layer isolates data source — UI never knows if data comes from AI, DB, REST, etc.
- Stub backend (`/app/backend/server.py`): minimal FastAPI with `/api/health` only.

## User Personas
- **The uncertain owner** — inherited something, curious about value. First-time visitor.
- **The active collector** — Pokémon/MTG/comics buyer/seller, wants quick, trustworthy valuations.
- **The seller** — has a valuable piece, wants premium listing experience.
- **The buyer/curator** — browses the marketplace, values presentation and trust signals.

## Core Requirements (Static)
- Fully navigable app — every page clickable, every modal opens, every animation works.
- Only data is missing; UI must feel real.
- Every backend interaction goes through `services/*.service.js` and is stubbed with mock data (`data/mock.js`) or `throw new Error("Not implemented")`.
- Photography-first UI, WCAG AA, keyboard accessible, mobile-first responsive.

## What's Been Implemented (2026-01-09)
- Full application shell: sticky glass header, footer, routing, responsive design.
- 12 routes: Landing, Marketplace, Item Detail, Appraise (4-step flow), Valuation Result, 6× Category pages, Seller Dashboard, My Collection (empty state), Saved Items (empty state), Admin Review Queue (empty state), Sign In, Sign Up, 404.
- UI primitives: Button (6 variants), Badge (7 tones), Input, Textarea, Select, Modal, EmptyState, ConfidenceMeter (circular SVG), SkeletonCard.
- Marketplace: filter sidebar (Category, Price bucket, Condition) synced to URL params, sort, ItemCard with hover animation, CategoryTile, mobile filter drawer.
- Appraise flow: 4 steps (Photos → Details → Condition → Analyzing), drag-drop dropzone (6 photo max, HEIC/JPG/PNG), step indicator, animated "Analyzing" state.
- Valuation Result: Big value reveal, ConfidenceMeter, rationale card, "Improve confidence" tips, 3 comparable sales cards, category momentum indicator.
- Item Detail: Split gallery (60/40) with thumbnails, Buy Now / Make Offer modals, seller card, provenance, "why this valuation" explanation, related items grid.
- Service layer: `valuation.service.js`, `marketplace.service.js`, `item.service.js`, `auth.service.js`, `search.service.js` — all stubbed with realistic latency simulation.
- Mock data: 12 items across 6 categories, curated Unsplash imagery.
- Design tokens in Tailwind config (`ink.*`, `brand.*`, `status.*`).
- Custom subtle animations (fade, fade-up, soft-scale) with 150-250ms durations and prefers-reduced-motion support.

## Backlog / Next
### P0 — Data wiring (when backend is ready)
- Replace `services/*.service.js` mock implementations with real API calls (OpenAI vision for valuation, DB for marketplace, Stripe for payments, UploadThing for uploads, NextAuth for auth).
- Wire real image upload to backend.
- Persist valuations and listings to DB.

### P1 — Feature polish
- Global search results page (currently redirects to marketplace with `?q=`).
- Wishlist / saved item persistence.
- Seller listing analytics with charts.
- Admin curator review flow (queue + accept/reject actions).
- Notifications drawer.

### P2 — Nice-to-have
- Light theme (design system already prepared).
- Live category momentum chart on category pages.
- Buyer-side inbox for offers.
- Multi-image comparison / 360° viewer for high-value items.

## Testing
- All interactive/informational elements have `data-testid` for automation.
- Frontend runs on `:3000` via supervisor.
- Backend runs on `:8001` (health only).

## Deployment
- Supervisor manages `frontend`, `backend`, `mongodb`.
- Frontend uses `REACT_APP_BACKEND_URL` env var.

## Session Log

### 2026-01-09 — Initial MVP shipped
- All 12 routes implemented, 18/18 QA flows pass (95% success).
- Fixed post-QA: broken Magic tile image, off-topic Coins/Memorabilia tiles, unused imports, ScrollToTop bug (now uses `useLocation`), added React Router v7 future flags to silence warnings, added onError fallback on ItemCard imagery.
