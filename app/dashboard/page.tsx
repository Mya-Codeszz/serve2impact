import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', user.id)
  .single() as { data: { full_name?: string | null } | null };

  const { data: savedRows } = await supabase
    .from('student_opportunities')
    .select('*, opportunity:opportunities(title)')
    .eq('student_id', user.id)
    .order('saved_at', { ascending: false });

  const { data: hoursRows } = await supabase
    .from('volunteer_hours_log')
    .select('hours')
    .eq('student_id', user.id);

  const totalHours = (hoursRows ?? []).reduce((sum, r: { hours: number }) => sum + Number(r.hours), 0);
  const savedCount = (savedRows ?? []).filter((r: { status: string }) => r.status === 'interested').length;
  const appliedCount = (savedRows ?? []).filter((r: { status: string }) => r.status === 'applied').length;
  const completedCount = (savedRows ?? []).filter((r: { status: string }) => r.status === 'completed').length;
  return (
    <div>
      <h1 className="text-2xl font-bold">
  Welcome back{profile?.full_name ? `, ${profile.full_name}` : ''}
</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Saved', value: savedCount },
          { label: 'Applied', value: appliedCount },
          { label: 'Completed', value: completedCount },
          { label: 'Total hours', value: totalHours },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-gray-200 bg-white p-4 text-center">
            <div className="text-2xl font-bold text-brand-700">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-4">
        <Link href="/dashboard/saved" className="text-sm font-medium text-brand-700 hover:underline">
          View saved & applications →
        </Link>
        <Link href="/dashboard/hours" className="text-sm font-medium text-brand-700 hover:underline">
          Log volunteer hours →
        </Link>
      </div>

      <div className="mt-8">
        <h2 className="font-semibold">Recent activity</h2>
        {!savedRows?.length && (
          <p className="mt-2 text-sm text-gray-500">
            Nothing saved yet — <Link href="/search" className="text-brand-700 hover:underline">browse opportunities</Link> to get started.
          </p>
        )}
        <ul className="mt-2 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
          {savedRows?.slice(0, 5).map((row) => (
            <li key={row.id} className="flex items-center justify-between px-4 py-3 text-sm">
              <span>{row.opportunity?.title ?? 'Opportunity'}</span>
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs capitalize text-gray-600">
                {row.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
