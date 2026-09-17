import { notFound } from 'next/navigation';
import { mockOpportunities } from '@/lib/mockData';
import SaveButton from '@/components/SaveButton';

/*
  Once Supabase is live, replace the mock lookup below with:

  const supabase = createClient();
  const { data: opportunity } = await supabase
    .from('opportunities')
    .select('*, organization:organizations(*), categories:opportunity_categories(category:categories(*))')
    .eq('id', params.id)
    .single();
  if (!opportunity) notFound();
*/

export default function OpportunityDetailPage({ params }: { params: { id: string } }) {
  const opportunity = mockOpportunities.find((o) => o.id === params.id);
  if (!opportunity) notFound();

  return (
    <article className="mx-auto max-w-2xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{opportunity.title}</h1>
          <p className="mt-1 text-gray-500">{opportunity.organization?.name}</p>
        </div>
        <SaveButton opportunityId={opportunity.id} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-500">
        <span className="rounded-full bg-gray-100 px-2 py-1">
          {opportunity.location_type === 'virtual'
            ? 'Virtual'
            : `${opportunity.city ?? 'TBD'}, ${opportunity.state ?? ''}`}
        </span>
        <span className="rounded-full bg-gray-100 px-2 py-1">
          {opportunity.commitment_type === 'one_time' ? 'One-time' : 'Recurring'}
        </span>
        {opportunity.min_age && (
          <span className="rounded-full bg-gray-100 px-2 py-1">Ages {opportunity.min_age}+</span>
        )}
        {opportunity.estimated_hours && (
          <span className="rounded-full bg-gray-100 px-2 py-1">~{opportunity.estimated_hours} hrs</span>
        )}
      </div>

      <p className="mt-6 whitespace-pre-line text-gray-700">{opportunity.description}</p>

      {opportunity.recurring_schedule && (
        <p className="mt-4 text-sm text-gray-600">
          <strong>Schedule:</strong> {opportunity.recurring_schedule}
        </p>
      )}
      {opportunity.requires_guardian_consent && (
        <p className="mt-2 text-sm text-amber-700">Requires guardian consent for volunteers under 18.</p>
      )}
    </article>
  );
}
