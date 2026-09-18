'use client';

import { useMemo, useState } from 'react';
import { Search, Sprout } from 'lucide-react';
import OpportunityCard from '@/components/OpportunityCard';
import RecommendedForYou from '@/components/RecommendedForYou';
import PageShell from '@/components/PageShell';
import { mockOpportunities } from '@/lib/mockData';
import type { CommitmentType, LocationType } from '@/types/database.types';

const CAUSES = [
  { slug: 'animals', name: 'Animals' },
  { slug: 'education', name: 'Education & Tutoring' },
  { slug: 'food_insecurity', name: 'Food Insecurity' },
  { slug: 'environment', name: 'Environment & Conservation' },
];

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <p className="mb-1.5 text-sm font-medium text-forest">{label}</p>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-leaf-circle bg-white px-3 py-2 text-sm text-forest focus-ring"
      >
        <option value="">Any</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

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
    <PageShell>
      <RecommendedForYou />

      <div className="mb-8 flex items-center gap-3 rounded-full border border-leaf-circle bg-white px-5 py-3">
        <Search className="h-4 w-4 text-forest/50" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by cause, location, or keyword…"
          className="w-full bg-transparent text-sm text-forest placeholder:text-forest/40 focus:outline-none"
        />
      </div>

      <div className="grid gap-10 lg:grid-cols-[200px_1fr]">
        <aside className="space-y-6">
          <FilterSelect
            label="Location"
            value={locationType}
            onChange={(v) => setLocationType(v as LocationType | '')}
            options={[
              { value: 'in_person', label: 'In-person' },
              { value: 'virtual', label: 'Virtual' },
              { value: 'hybrid', label: 'Hybrid' },
            ]}
          />
          <FilterSelect
            label="Commitment"
            value={commitmentType}
            onChange={(v) => setCommitmentType(v as CommitmentType | '')}
            options={[
              { value: 'one_time', label: 'One-time' },
              { value: 'recurring', label: 'Recurring' },
            ]}
          />
          <div>
            <p className="mb-1.5 text-sm font-medium text-forest">Cause</p>
            <div className="flex flex-wrap gap-1.5">
              {CAUSES.map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => setCategory(category === c.slug ? '' : c.slug)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition focus-ring ${
                    category === c.slug
                      ? 'bg-leaf text-forest'
                      : 'bg-leaf-circle text-forest/70 hover:bg-leaf-light'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <h1 className="font-display text-xl font-semibold text-forest">
            {results.length} opportunit{results.length === 1 ? 'y' : 'ies'} found
          </h1>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {results.map((o, i) => (
              <OpportunityCard key={o.id} opportunity={o} tilt={i % 3 === 0} />
            ))}
          </div>
          {results.length === 0 && (
            <div className="mt-6 rounded-2xl bg-leaf-light/60 p-10 text-center">
              <Sprout className="mx-auto h-8 w-8 text-leaf" strokeWidth={1.5} />
              <p className="mt-3 font-display font-semibold text-forest">No matches yet</p>
              <p className="mt-1 text-sm text-forest/60">
                Try clearing a filter or searching a different keyword.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
