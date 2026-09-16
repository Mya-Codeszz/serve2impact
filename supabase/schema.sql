-- ServeLink — Phase 1: Database Schema
-- Run this in the Supabase SQL editor (or via `supabase db push`).

-- =========================
-- Extensions
-- =========================
create extension if not exists "uuid-ossp";

-- =========================
-- Profiles (extends Supabase auth.users)
-- =========================
create type user_role as enum ('student', 'org_admin', 'site_admin');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role user_role not null default 'student',
  school text,
  grade text,
  avatar_url text,
  created_at timestamptz not null default now()
);

-- =========================
-- Organizations
-- =========================
create type org_status as enum ('pending', 'verified', 'rejected');

create table organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  website text,
  contact_email text,
  logo_url text,
  status org_status not null default 'pending',
  submitted_by uuid references profiles(id),
  created_at timestamptz not null default now()
);

-- =========================
-- Causes (tag taxonomy: environment, animals, tutoring, etc.)
-- =========================
create table causes (
  id serial primary key,
  name text unique not null,
  slug text unique not null
);

-- =========================
-- Opportunities
-- =========================
create type opportunity_status as enum ('pending', 'published', 'rejected', 'archived');
create type opportunity_format as enum ('in_person', 'virtual', 'hybrid');

create table opportunities (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references organizations(id) on delete cascade,
  title text not null,
  description text not null,
  format opportunity_format not null default 'in_person',
  location_city text,
  location_state text,
  location_lat double precision,
  location_lng double precision,
  min_age int,
  max_age int,
  start_date date,
  end_date date,
  hours_offered numeric(5,1),
  spots_available int,
  status opportunity_status not null default 'pending',
  reviewed_by uuid references profiles(id),
  created_at timestamptz not null default now()
);

create table opportunity_causes (
  opportunity_id uuid references opportunities(id) on delete cascade,
  cause_id int references causes(id) on delete cascade,
  primary key (opportunity_id, cause_id)
);

-- =========================
-- Saved opportunities (students bookmarking)
-- =========================
create table saved_opportunities (
  user_id uuid references profiles(id) on delete cascade,
  opportunity_id uuid references opportunities(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, opportunity_id)
);

-- =========================
-- Applications / sign-ups
-- =========================
create type application_status as enum ('applied', 'accepted', 'declined', 'completed');

create table applications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  opportunity_id uuid references opportunities(id) on delete cascade,
  status application_status not null default 'applied',
  hours_logged numeric(5,1) default 0,
  applied_at timestamptz not null default now(),
  unique (user_id, opportunity_id)
);

-- =========================
-- Row Level Security
-- =========================
alter table profiles enable row level security;
alter table organizations enable row level security;
alter table opportunities enable row level security;
alter table saved_opportunities enable row level security;
alter table applications enable row level security;

-- Profiles: users manage their own row; everyone can read basic profile info
create policy "profiles are viewable by everyone"
  on profiles for select using (true);
create policy "users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Organizations: anyone can view verified orgs; org submitters see their own pending ones; site_admins see all
create policy "verified orgs are public"
  on organizations for select using (status = 'verified' or submitted_by = auth.uid());
create policy "authenticated users can submit organizations"
  on organizations for insert with check (auth.uid() is not null);

-- Opportunities: published opportunities are public; org owners/admins see their pending ones
create policy "published opportunities are public"
  on opportunities for select using (
    status = 'published'
    or organization_id in (select id from organizations where submitted_by = auth.uid())
  );
create policy "org owners can insert opportunities"
  on opportunities for insert with check (
    organization_id in (select id from organizations where submitted_by = auth.uid())
  );

-- Saved opportunities: only the owning user can read/write
create policy "users manage their own saved opportunities"
  on saved_opportunities for all using (auth.uid() = user_id);

-- Applications: only the owning user can read/write their applications
create policy "users manage their own applications"
  on applications for all using (auth.uid() = user_id);

-- =========================
-- Seed causes
-- =========================
insert into causes (name, slug) values
  ('Animals', 'animals'),
  ('Environment', 'environment'),
  ('Education & Tutoring', 'education-tutoring'),
  ('Food Security', 'food-security'),
  ('Health & Wellness', 'health-wellness'),
  ('Seniors', 'seniors'),
  ('Community Development', 'community-development'),
  ('Disaster Relief', 'disaster-relief')
on conflict do nothing;
