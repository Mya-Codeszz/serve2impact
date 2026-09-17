import Link from 'next/link';
import type { Opportunity } from '@/types/database.types';

function formatLocation(o: Opportunity) {
  if (o.location_type === 'virtual') return 'Virtual';
  if (o.city && o.state) return `${o.city}, ${o.state}`;
  return o.location_type === 'hybrid' ? 'Hybrid' : 'Location TBD';
}

export default function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  return (
    <Link
      href={`/opportunities/${opportunity.id}`}
      className="block rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-brand-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-gray-900">{opportunity.title}</h3>
        {opportunity.status === 'verified' && (
          <span className="shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
            Verified
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-gray-500">{opportunity.organization?.name}</p>
      <p className="mt-2 line-clamp-2 text-sm text-gray-600">{opportunity.description}</p>
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500">
        <span className="rounded-full bg-gray-100 px-2 py-1">{formatLocation(opportunity)}</span>
        <span className="rounded-full bg-gray-100 px-2 py-1">
          {opportunity.commitment_type === 'one_time' ? 'One-time' : 'Recurring'}
        </span>
        {opportunity.min_age && (
          <span className="rounded-full bg-gray-100 px-2 py-1">Ages {opportunity.min_age}+</span>
        )}
        {opportunity.categories?.map((c) => (
          <span key={c.id} className="rounded-full bg-brand-50 px-2 py-1 text-brand-700">
            {c.name}
          </span>
        ))}
      </div>
    </Link>
  );
}
