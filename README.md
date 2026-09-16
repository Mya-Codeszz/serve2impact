# ServeLink

Student volunteer opportunity database for NHS/HHS members — Phase 1 (database) + Phase 2 (interface & branding).

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Supabase (Postgres, Auth, Row Level Security)
- Vercel (hosting)

## What's included in this scaffold

**Phase 1 — Database** (`supabase/schema.sql`)
- `profiles`, `organizations`, `opportunities`, `causes`, `opportunity_causes`,
  `saved_opportunities`, `applications`
- Organization + opportunity verification workflow (`pending` → `published`/`rejected`)
- Row Level Security policies so students only see published opportunities and
  can only manage their own saved items/applications
- Seeded starter causes (Animals, Environment, Tutoring, etc.)

**Phase 2 — Interface & Branding**
- `components/Navbar.tsx` — nav with Home / Opportunities / How It Works / Stories / For Organizations, plus Review + Dashboard for logged-in users
- `components/Hero.tsx` — "Find. Serve. Make an Impact." hero matching your mockup
- `components/FeatureGrid.tsx`, `HowItWorks.tsx`, `Testimonials.tsx` — homepage sections
- `app/page.tsx` — assembled homepage
- Brand tokens (forest green / sage / sun-yellow / cream) in `tailwind.config.ts`

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create a Supabase project** at supabase.com, then in the SQL editor run
   `supabase/schema.sql` to create Phase 1's tables.

3. **Copy env vars**
   ```bash
   cp .env.local.example .env.local
   ```
   Fill in your Supabase project URL and anon key (Project Settings → API).

4. **Run locally**
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000

5. **Deploy**: push to GitHub, import into Vercel, add the same two env vars
   in Vercel's project settings, deploy.

## Not yet built (next steps)
- `/opportunities` search & filter page (query `opportunities` + `causes` joined on `status = 'published'`)
- `/signup` and `/login` (Supabase Auth — email/password or magic link)
- `/dashboard` (student's saved + applied opportunities, logged hours)
- `/organizations` submission form (writes to `organizations` + `opportunities` as `pending`)
- `/review` admin queue (site_admin role approves/rejects pending orgs & opportunities)
- Replace the Unsplash hero photo with your own photography for the final brand
