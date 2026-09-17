-- ============================================================================
-- Student Volunteer Opportunity Database — Core Schema
-- Run this in the Supabase SQL editor (or via `supabase db push`).
-- Designed so auth + verification + saving/tracking all slot in without
-- later migrations reshaping the core tables.
-- ============================================================================

-- ---------- Extensions ----------
create extension if not exists "pgcrypto"; -- gen_random_uuid()

-- ---------- Enums ----------
create type opportunity_status as enum ('pending', 'verified', 'rejected', 'expired');
create type commitment_type as enum ('one_time', 'recurring');
create type location_type as enum ('in_person', 'virtual', 'hybrid');
create type application_status as enum ('interested', 'applied', 'accepted', 'completed', 'withdrawn');
create type user_role as enum ('student', 'org_admin', 'site_admin');

-- ============================================================================
-- PROFILES  (extends Supabase auth.users — 1:1, created on signup via trigger)
-- ============================================================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role user_role not null default 'student',
  full_name text,
  school text,
  grade_level int check (grade_level between 6 and 12),
  date_of_birth date,
  bio text,
  -- lightweight preference fields Phase 9 recommendations will read
  interests text[] default '{}',         -- category slugs, e.g. {'environment','animals'}
  preferred_location_type location_type,
  home_zip text,
  max_travel_miles int,
  availability jsonb default '{}',       -- e.g. {"weekday_evenings": true, "weekends": true}
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================================
-- ORGANIZATIONS
-- ============================================================================
create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete set null, -- org_admin who manages it (Phase 7)
  name text not null,
  description text,
  website text,
  contact_email text,
  contact_phone text,
  logo_url text,
  is_verified boolean not null default false, -- Phase 8: org itself can be verified, separate from each listing
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================================
-- CATEGORIES  (causes: environment, animals, education, health, seniors, etc.)
-- ============================================================================
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  icon text -- optional icon identifier for the UI
);

-- ============================================================================
-- OPPORTUNITIES
-- ============================================================================
create table public.opportunities (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  submitted_by uuid references auth.users(id) on delete set null,

  title text not null,
  description text not null,
  location_type location_type not null default 'in_person',
  address text,
  city text,
  state text,
  zip text,
  latitude double precision,
  longitude double precision,

  commitment_type commitment_type not null default 'one_time',
  start_date date,
  end_date date,
  recurring_schedule text, -- free text, e.g. "Every Saturday, 9-11am"
  estimated_hours numeric(5,1),

  min_age int,
  max_age int,
  requires_guardian_consent boolean not null default false,

  spots_available int,
  application_url text,
  application_instructions text,

  status opportunity_status not null default 'pending',
  rejection_reason text,
  verified_at timestamptz,
  verified_by uuid references auth.users(id) on delete set null,
  expires_at timestamptz, -- Phase 8: drives "expired" + reporting outdated listings

  view_count int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.opportunity_categories (
  opportunity_id uuid not null references public.opportunities(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete cascade,
  primary key (opportunity_id, category_id)
);

-- Users flagging outdated/incorrect listings (Phase 8)
create table public.opportunity_reports (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references public.opportunities(id) on delete cascade,
  reported_by uuid references auth.users(id) on delete set null,
  reason text not null,
  resolved boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- SAVED OPPORTUNITIES / APPLICATIONS  (Phase 5)
-- One row per student per opportunity; status progresses over time.
-- ============================================================================
create table public.student_opportunities (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users(id) on delete cascade,
  opportunity_id uuid not null references public.opportunities(id) on delete cascade,
  status application_status not null default 'interested',
  saved_at timestamptz not null default now(),
  applied_at timestamptz,
  completed_at timestamptz,
  hours_logged numeric(5,1),
  notes text,
  unique (student_id, opportunity_id)
);

-- ============================================================================
-- VOLUNTEER HOURS LOG  (Phase 6 — can log hours independent of an opportunity row,
-- e.g. hours from an org not in the database, plus hours tied to one that is)
-- ============================================================================
create table public.volunteer_hours_log (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users(id) on delete cascade,
  opportunity_id uuid references public.opportunities(id) on delete set null,
  organization_name text, -- freeform, in case opportunity_id is null
  date date not null,
  hours numeric(5,1) not null check (hours > 0),
  description text,
  verified boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- INDEXES
-- ============================================================================
create index idx_opportunities_status on public.opportunities(status);
create index idx_opportunities_location on public.opportunities(city, state);
create index idx_opportunities_dates on public.opportunities(start_date, end_date);
create index idx_opportunities_org on public.opportunities(organization_id);
create index idx_student_opps_student on public.student_opportunities(student_id);
create index idx_student_opps_opportunity on public.student_opportunities(opportunity_id);
create index idx_hours_log_student on public.volunteer_hours_log(student_id);
create index idx_opp_categories_category on public.opportunity_categories(category_id);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- auto-create a profile row whenever a new auth user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- generic updated_at bumper
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at_profiles before update on public.profiles
  for each row execute procedure public.set_updated_at();
create trigger set_updated_at_organizations before update on public.organizations
  for each row execute procedure public.set_updated_at();
create trigger set_updated_at_opportunities before update on public.opportunities
  for each row execute procedure public.set_updated_at();

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================
alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.categories enable row level security;
alter table public.opportunities enable row level security;
alter table public.opportunity_categories enable row level security;
alter table public.opportunity_reports enable row level security;
alter table public.student_opportunities enable row level security;
alter table public.volunteer_hours_log enable row level security;

-- Helper: is the current user a site admin?
create or replace function public.is_site_admin()
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'site_admin'
  );
$$ language sql stable security definer;

-- profiles: users manage their own; admins can read all
create policy "profiles_select_own_or_admin" on public.profiles
  for select using (auth.uid() = id or public.is_site_admin());
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- categories: public read, admin write
create policy "categories_public_read" on public.categories
  for select using (true);
create policy "categories_admin_write" on public.categories
  for all using (public.is_site_admin());

-- organizations: public read; owner or admin can write
create policy "organizations_public_read" on public.organizations
  for select using (true);
create policy "organizations_owner_write" on public.organizations
  for insert with check (auth.uid() = owner_id or public.is_site_admin());
create policy "organizations_owner_update" on public.organizations
  for update using (auth.uid() = owner_id or public.is_site_admin());

-- opportunities: public can see verified ones; submitters/admins see their own regardless of status
create policy "opportunities_public_read_verified" on public.opportunities
  for select using (
    status = 'verified'
    or submitted_by = auth.uid()
    or public.is_site_admin()
  );
create policy "opportunities_submit" on public.opportunities
  for insert with check (auth.uid() is not null);
create policy "opportunities_update_own_or_admin" on public.opportunities
  for update using (submitted_by = auth.uid() or public.is_site_admin());

-- opportunity_categories follows opportunity visibility
create policy "opp_categories_read" on public.opportunity_categories
  for select using (true);
create policy "opp_categories_write" on public.opportunity_categories
  for all using (
    exists (
      select 1 from public.opportunities o
      where o.id = opportunity_id
        and (o.submitted_by = auth.uid() or public.is_site_admin())
    )
  );

-- reports: any signed-in user can file; only admins can read/resolve
create policy "reports_insert" on public.opportunity_reports
  for insert with check (auth.uid() is not null);
create policy "reports_admin_read" on public.opportunity_reports
  for select using (public.is_site_admin());
create policy "reports_admin_update" on public.opportunity_reports
  for update using (public.is_site_admin());

-- student_opportunities: strictly own-row access
create policy "student_opps_own" on public.student_opportunities
  for all using (auth.uid() = student_id) with check (auth.uid() = student_id);

-- volunteer_hours_log: strictly own-row access (admins can read for verification)
create policy "hours_own_or_admin_read" on public.volunteer_hours_log
  for select using (auth.uid() = student_id or public.is_site_admin());
create policy "hours_own_write" on public.volunteer_hours_log
  for insert with check (auth.uid() = student_id);
create policy "hours_own_update" on public.volunteer_hours_log
  for update using (auth.uid() = student_id or public.is_site_admin());

-- ============================================================================
-- SEED DATA — starter categories
-- ============================================================================
insert into public.categories (slug, name, icon) values
  ('environment', 'Environment & Conservation', 'leaf'),
  ('animals', 'Animals & Wildlife', 'paw'),
  ('education', 'Education & Tutoring', 'book'),
  ('health', 'Health & Wellness', 'heart-pulse'),
  ('seniors', 'Senior Support', 'user-heart'),
  ('food_insecurity', 'Food Insecurity', 'utensils'),
  ('disaster_relief', 'Disaster Relief', 'life-buoy'),
  ('arts_culture', 'Arts & Culture', 'palette'),
  ('community', 'Community Development', 'users'),
  ('disability_support', 'Disability Support', 'accessibility'),
  ('homelessness', 'Homelessness', 'home'),
  ('sports_rec', 'Sports & Recreation', 'trophy')
on conflict (slug) do nothing;
