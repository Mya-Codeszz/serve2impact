import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import type {
  ApplicationStatus,
  StudentOpportunity,
  Opportunity,
} from '@/types/database.types';

const SECTIONS: { status: ApplicationStatus; label: string }[] = [
  { status: 'interested', label: 'Saved' },
  { status: 'applied', label: 'Applied' },
  { status: 'accepted', label: 'Accepted' },
  { status: 'completed', label: 'Completed' },
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
    <div>
      <h1 className="text-2xl font-bold">My Opportunities</h1>

      <div className="mt-6 space-y-8">
        {SECTIONS.map((section) => {
          const items = (rows ?? []).filter(
            (r) => r.status === section.status
          );

          return (
            <div key={section.status}>
              <h2 className="font-semibold text-gray-800">
                {section.label} ({items.length})
              </h2>

              {items.length === 0 ? (
                <p className="mt-1 text-sm text-gray-500">
                  Nothing here yet.
                </p>
              ) : (
                <ul className="mt-2 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
                  {items.map((row) => (
                    <li key={row.id} className="px-4 py-3 text-sm">
                      <Link
                        href={`/opportunities/${row.opportunity?.id}`}
                        className="hover:text-brand-700"
                      >
                        {row.opportunity?.title}
                      </Link>

                      <span className="ml-2 text-gray-500">
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
    </div>
  );
}
