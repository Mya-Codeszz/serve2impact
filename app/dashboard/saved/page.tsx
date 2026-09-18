import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Bookmark, Send, CheckCircle2, Trophy } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import PageShell from '@/components/PageShell';
import type {
  ApplicationStatus,
  StudentOpportunity,
  Opportunity,
} from '@/types/database.types';

const SECTIONS: { status: ApplicationStatus; label: string; icon: typeof Bookmark }[] = [
  { status: 'interested', label: 'Saved', icon: Bookmark },
  { status: 'applied', label: 'Applied', icon: Send },
  { status: 'accepted', label: 'Accepted', icon: CheckCircle2 },
  { status: 'completed', label: 'Completed', icon: Trophy },
];

export default async function SavedOpportunitiesPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: rows } = await supabase
    .from('student_opportunities')
    .select('*, opportunity:opportunities(id, title, city, state)')
    .eq('student_id', user.id) as {
      data:
        | (StudentOpportunity & {
            opportunity?: Pick<
              Opportunity,
              'id' | 'title' | 'city' | 'state'
            > | null;
          })[]
        | null;
    };

  return (
    <PageShell>
      <h1 className="font-display text-2xl font-semibold text-forest">My Opportunities</h1>

      <div className="mt-6 space-y-8">
        {SECTIONS.map((section) => {
          const items = (rows ?? []).filter(
            (r) => r.status === section.status
          );

          return (
            <div key={section.status}>
              <h2 className="flex items-center gap-2 font-display font-semibold text-forest">
                <section.icon className="h-4 w-4 text-leaf" strokeWidth={1.75} />
                {section.label} ({items.length})
              </h2>

              {items.length === 0 ? (
                <p className="mt-1 text-sm text-forest/50">Nothing here yet.</p>
              ) : (
                <ul className="mt-2 divide-y divide-leaf-circle rounded-2xl border border-leaf-circle bg-white">
                  {items.map((row) => (
                    <li key={row.id} className="px-5 py-3.5 text-sm">
                      <Link
                        href={`/opportunities/${row.opportunity?.id}`}
                        className="font-medium text-forest hover:underline"
                      >
                        {row.opportunity?.title}
                      </Link>

                      <span className="ml-2 text-forest/50">
                        {row.opportunity?.city
                          ? `— ${row.opportunity.city}, ${row.opportunity.state}`
                          : ''}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}
