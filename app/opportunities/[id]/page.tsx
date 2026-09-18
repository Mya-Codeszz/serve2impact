import { notFound } from 'next/navigation';
import { MapPin, Repeat, Users, Clock, ShieldAlert } from 'lucide-react';
import { mockOpportunities } from '@/lib/mockData';
import SaveButton from '@/components/SaveButton';
import PageShell from '@/components/PageShell';

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
    <PageShell narrow>
      <article className="rounded-2xl border border-leaf-circle bg-white p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-semibold text-forest">{opportunity.title}</h1>
            <p className="mt-1 text-sm text-forest/60">{opportunity.organization?.name}</p>
          </div>
          <SaveButton opportunityId={opportunity.id} />
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5 text-xs">
          <span className="inline-flex items-center gap-1 rounded-full bg-leaf-circle px-2.5 py-1 text-forest/80">
            <MapPin className="h-3 w-3" />
            {opportunity.location_type === 'virtual'
              ? 'Virtual'
              : `${opportunity.city ?? 'TBD'}, ${opportunity.state ?? ''}`}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-leaf-circle px-2.5 py-1 text-forest/80">
            <Repeat className="h-3 w-3" />
            {opportunity.commitment_type === 'one_time' ? 'One-time' : 'Recurring'}
          </span>
          {opportunity.min_age && (
            <span className="inline-flex items-center gap-1 rounded-full bg-leaf-circle px-2.5 py-1 text-forest/80">
              <Users className="h-3 w-3" /> Ages {opportunity.min_age}+
            </span>
          )}
          {opportunity.estimated_hours && (
            <span className="inline-flex items-center gap-1 rounded-full bg-leaf-circle px-2.5 py-1 text-forest/80">
              <Clock className="h-3 w-3" /> ~{opportunity.estimated_hours} hrs
            </span>
          )}
        </div>

        <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-forest/80">
          {opportunity.description}
        </p>

        {opportunity.recurring_schedule && (
          <p className="mt-4 text-sm text-forest/70">
            <strong className="text-forest">Schedule:</strong> {opportunity.recurring_schedule}
          </p>
        )}
        {opportunity.requires_guardian_consent && (
          <div className="mt-4 flex items-start gap-2 rounded-xl bg-blush/60 px-4 py-3 text-sm text-forest">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
            Requires guardian consent for volunteers under 18.
          </div>
        )}
      </article>
    </PageShell>
  );
}
