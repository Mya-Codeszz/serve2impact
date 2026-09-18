-- Adds the one field the matching quiz needs that isn't already on `profiles`.
-- Run this in the Supabase SQL editor (after the original schema.sql).

alter table profiles
  add column if not exists preferred_commitment_type text
    check (preferred_commitment_type in ('one_time', 'recurring', 'no_preference'));

alter table profiles
  add column if not exists onboarding_completed_at timestamptz;
