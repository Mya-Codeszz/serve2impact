'use client';

import { useMemo, useState } from 'react';
import OpportunityCard from '@/components/OpportunityCard';
import { mockOpportunities } from '@/lib/mockData';
import type { CommitmentType, LocationType } from '@/types/database.types';

/*
  Swap the mock filtering below for a real Supabase query once the schema is
  live, e.g.:

  const supabase = createClient();
  let query = supabase
    .from('opportunities')
    .select('*, organization:organizations(*), categories:opportunity_categories(category:categories(*))')
    .eq('status', 'verified');

  if (search) query = query.ilike('title', `%${search}%`);
  if (locationType) query = query.eq('location_type', locationType);
  if (commitmentType) query = query.eq('commitment_type', commitmentType);
  const { data } = await query;
*/

export default function SearchPage() {
  const [search, setSearch] = useState('');
  const [locationType, setLocationType] = useState<LocationType | ''>('');
  const [commitmentType, setCommitmentType] = useState<CommitmentType | ''>('');
  const [category, setCategory] = useState('');

  const results = useMemo(() => {
    return mockOpportunities.filter((o) => {
      if (search && !o.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (locationType && o.location_type !== locationType) return false;
      if (commitmentType && o.commitment_type !== commitmentType) return false;
      if (category && !o.categories?.some((c) => c.slug === category)) return false;
      return true;
    });
  }, [search, locationType, commitmentType, category]);

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      <aside className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Search</label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Keyword…"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <select
            value={locationType}
            onChange={(e) => setLocationType(e.target.value as LocationType | '')}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">Any</option>
            <option value="in_person">In-person</option>
            <option value="virtual">Virtual</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Commitment</label>
          <select
            value={commitmentType}
            onChange={(e) => setCommitmentType(e.target.value as CommitmentType | '')}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">Any</option>
            <option value="one_time">One-time</option>
            <option value="recurring">Recurring</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Cause</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">Any</option>
            <option value="animals">Animals & Wildlife</option>
            <option value="education">Education & Tutoring</option>
            <option value="food_insecurity">Food Insecurity</option>
            <option value="environment">Environment & Conservation</option>
          </select>
        </div>
      </aside>

      <div>
        <h1 className="text-xl font-bold">{results.length} opportunities found</h1>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {results.map((o) => (
            <OpportunityCard key={o.id} opportunity={o} />
          ))}
          {results.length === 0 && (
            <p className="text-sm text-gray-500">No opportunities match those filters yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
