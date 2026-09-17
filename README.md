# VolunteerHub — Student Volunteer Opportunity Database

A Next.js + Supabase app for discovering, saving, and tracking volunteer
opportunities. This scaffold covers the structural parts of Phases 1–6 from
the project plan: database schema, auth, homepage, search/filter, opportunity
detail, saving, and hours tracking. Phases 7–9 (org portal, admin
verification UI, recommendations) build on top of this foundation.

## What's here

```
supabase/schema.sql       Full Postgres schema + Row Level Security policies
app/                       Next.js App Router pages
  page.tsx                 Homepage
  search/page.tsx          Search & filters (Phase 3)
  opportunities/[id]/      Opportunity detail + Save button (Phase 5)
  login/, signup/          Auth pages (Phase 4)
  dashboard/               Student dashboard, saved list, hours log (Phase 5–6)
  auth/callback/           Handles Supabase email confirmation redirects
components/                Navbar, OpportunityCard, SaveButton
lib/supabase/              Browser + server Supabase clients
lib/mockData.ts            Sample opportunities so the UI renders before real data exists
middleware.ts              Keeps auth sessions fresh on every request
types/database.types.ts    Hand-written types matching schema.sql
```

Pages currently read from `lib/mockData.ts` so you can see the UI working
immediately. Each file that needs a real query has a comment showing the
Supabase call to swap in — the dashboard, saved-opportunities, and hours
pages are already wired to Supabase (they need a live project to run).

## Setup

### 1. Create a Supabase project
Go to [supabase.com](https://supabase.com), create a new project, then open
**SQL Editor** and run the contents of `supabase/schema.sql`. This creates
every table, the enums, RLS policies, and seeds starter categories.

### 2. Get your API keys
In **Project Settings → API**, copy the **Project URL** and **anon public
key**.

### 3. Configure environment variables
```bash
cp .env.local.example .env.local
```
Paste your URL and anon key into `.env.local`.

### 4. Install and run
```bash
npm install
npm run dev
```
Visit `http://localhost:3000`.

### 5. Try it end-to-end
- Sign up at `/signup` — this creates an `auth.users` row and, via the
  `handle_new_user` trigger, a matching `profiles` row automatically.
- Confirm the email (Supabase sends this automatically; in a fresh project
  you may need to check the spam folder or disable email confirmation in
  **Authentication → Providers → Email** while developing).
- Once logged in, the homepage/search still show mock data — see "Next
  steps" below for loading real opportunities.

## Deploying to Vercel
1. Push this repo to GitHub.
2. Import it in Vercel.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as
   environment variables in the Vercel project settings.
4. Deploy. Vercel will rebuild automatically on every push.

## Next steps (picking up the plan)

- **Load real opportunities**: insert a few rows into `organizations` and
  `opportunities` (status `'verified'`) via the Supabase table editor, then
  replace `mockOpportunities` in `app/search/page.tsx` and
  `app/opportunities/[id]/page.tsx` with the commented-out Supabase queries
  already in those files.
- **Regenerate types from the live schema** once it's running:
  ```bash
  npx supabase gen types typescript --project-id YOUR_PROJECT_REF > types/database.types.ts
  ```
- **Phase 7 (Organization Portal)**: add an `/org` route group, gate it by
  `profiles.role = 'org_admin'`, and give orgs a form that inserts into
  `opportunities` with `status = 'pending'`.
- **Phase 8 (Verification)**: add an `/admin` route gated by
  `is_site_admin()`, listing `pending` opportunities with approve/reject
  actions that update `status`, `verified_at`, `verified_by`.
- **Phase 9 (Recommendations)**: start simple — sort search results by how
  many of a student's `profiles.interests` match an opportunity's
  categories, plus distance from `profiles.home_zip`. No ML needed for the
  pilot.
