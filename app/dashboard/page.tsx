import type { StudentOpportunity, Opportunity } from '@/types/database.types';

import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Bookmark, Send, Trophy, Clock, Sprout } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import PageShell from '@/components/PageShell';
import RecommendedForYou from '@/components/RecommendedForYou';

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
    .single() as {
      data: { full_name?: string | null } | null;
    };

  const { data: savedRows } = await supabase
    .from('student_opportunities')
    .select('*, opportunity:opportunities(*)')
    .eq('student_id', user.id) as {
      data: (StudentOpportunity & {
        opportunity?: Opportunity | null;
      })[] | null;
    };

  const { data: hoursRows } = await supabase
    .from('volunteer_hours_log')
    .select('hours')
    .eq('student_id', user.id);

  const totalHours = (hoursRows ?? []).reduce(
    (sum, r: { hours: number }) => sum + Number(r.hours),
    0
  );

  const savedCount = (savedRows ?? []).filter(
    (r) => r.status === 'interested'
  ).length;

  const appliedCount = (savedRows ?? []).filter(
    (r) => r.status === 'applied'
  ).length;

  const completedCount = (savedRows ?? []).filter(
    (r) => r.status === 'completed'
  ).length;

  const stats = [
    { label: 'Saved', value: savedCount, icon: Bookmark, tint: 'bg-leaf-circle' },
    { label: 'Applied', value: appliedCount, icon: Send, tint: 'bg-leaf-circle' },
    { label: 'Completed', value: completedCount, icon: Trophy, tint: 'bg-leaf' },
    { label: 'Total hours', value: totalHours, icon: Clock, tint: 'bg-leaf' },
  ];

  return (
    <PageShell>
      <h1 className="font-display text-2xl font-semibold text-forest">
        Welcome back{profile?.full_name ? `, ${profile.full_name}` : ''}!
      </h1>
      <p className="mt-1 text-sm text-forest/60">Here&apos;s where your service journey stands.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className={`rounded-2xl ${stat.tint} p-4 text-center`}>
            <stat.icon className="mx-auto h-5 w-5 text-forest/70" strokeWidth={1.75} />
            <div className="mt-2 font-display text-2xl font-semibold text-forest">{stat.value}</div>
            <div className="text-xs text-forest/60">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/dashboard/saved"
          className="rounded-full border border-leaf-circle bg-white px-4 py-2 text-sm font-medium text-forest hover:bg-leaf-light/60 focus-ring"
        >
          View saved & applications →
        </Link>

        <Link
          href="/dashboard/hours"
          className="rounded-full border border-leaf-circle bg-white px-4 py-2 text-sm font-medium text-forest hover:bg-leaf-light/60 focus-ring"
        >
          Log volunteer hours →
        </Link>
      </div>

      <div className="mt-10">
        <RecommendedForYou />
      </div>

      <div>
        <h2 className="font-display font-semibold text-forest">Recent activity</h2>

        {!savedRows?.length ? (
          <div className="mt-3 rounded-2xl bg-leaf-light/60 p-10 text-center">
            <Sprout className="mx-auto h-8 w-8 text-leaf" strokeWidth={1.5} />
            <p className="mt-3 font-display font-semibold text-forest">Nothing saved yet</p>
            <p className="mt-1 text-sm text-forest/60">
              Your saved opportunities will sprout up here.
            </p>
            <Link
              href="/search"
              className="mt-4 inline-block rounded-full bg-leaf px-5 py-2 text-sm font-semibold text-forest hover:brightness-95 focus-ring"
            >
              Browse opportunities
            </Link>
          </div>
        ) : (
          <ul className="mt-3 divide-y divide-leaf-circle rounded-2xl border border-leaf-circle bg-white">
            {savedRows?.slice(0, 5).map((row) => (
              <li key={row.id} className="flex items-center justify-between px-5 py-3.5 text-sm">
                <span className="text-forest">{row.opportunity?.title ?? 'Opportunity'}</span>
                <span className="rounded-full bg-leaf-circle px-2.5 py-0.5 text-xs font-medium capitalize text-forest/70">
                  {row.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </PageShell>
  );
}
