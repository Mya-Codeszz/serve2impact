'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PartyPopper, Clock } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import PageShell from '@/components/PageShell';
import type { VolunteerHoursLogEntry } from '@/types/database.types';

export default function HoursPage() {
  const supabase = createClient();
  const router = useRouter();
  const [entries, setEntries] = useState<VolunteerHoursLogEntry[]>([]);
  const [orgName, setOrgName] = useState('');
  const [date, setDate] = useState('');
  const [hours, setHours] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  async function load() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }
    const { data } = await supabase
      .from('volunteer_hours_log')
      .select('*')
      .eq('student_id', user.id)
      .order('date', { ascending: false });
    setEntries(data ?? []);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from('volunteer_hours_log').insert({
      student_id: user.id,
      organization_name: orgName,
      date,
      hours: Number(hours),
      description,
    } as any);

    setOrgName('');
    setDate('');
    setHours('');
    setDescription('');
    setSaving(false);
    load();
  }

  const total = entries.reduce((sum, e) => sum + Number(e.hours), 0);
  const nextMilestone = Math.ceil((total + 0.01) / 5) * 5;
  const hoursToGo = Math.max(0, nextMilestone - total);

  return (
    <PageShell narrow>
      <h1 className="font-display text-2xl font-semibold text-forest">Volunteer Hours</h1>

      {total > 0 && (
        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-forest px-5 py-4">
          <PartyPopper className="h-6 w-6 shrink-0 text-leaf" />
          <div>
            <p className="font-display text-sm font-semibold text-cream">
              {total} hours logged — nice work!
            </p>
            {hoursToGo > 0 && (
              <p className="text-xs text-cream/70">
                You&apos;re {hoursToGo} hours from your next badge.
              </p>
            )}
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-6 grid gap-4 rounded-2xl border border-leaf-circle bg-white p-5 sm:grid-cols-2"
      >
        <div>
          <label className="block text-sm font-medium text-forest">Organization</label>
          <input
            required
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-leaf-circle px-3 py-2 text-sm text-forest focus-ring"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-forest">Date</label>
          <input
            required
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-leaf-circle px-3 py-2 text-sm text-forest focus-ring"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-forest">Hours</label>
          <input
            required
            type="number"
            step="0.5"
            min="0.5"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="mt-1 w-full rounded-lg border border-leaf-circle px-3 py-2 text-sm text-forest focus-ring"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-forest">What did you do?</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full rounded-lg border border-leaf-circle px-3 py-2 text-sm text-forest focus-ring"
            rows={2}
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-leaf px-4 py-2.5 text-sm font-display font-semibold text-forest transition hover:brightness-95 disabled:opacity-50 focus-ring sm:col-span-2"
        >
          {saving ? 'Saving…' : 'Log hours'}
        </button>
      </form>

      <ul className="mt-6 divide-y divide-leaf-circle rounded-2xl border border-leaf-circle bg-white">
        {entries.map((entry) => (
          <li key={entry.id} className="flex items-center justify-between px-5 py-3.5 text-sm">
            <div>
              <div className="font-medium text-forest">{entry.organization_name}</div>
              <div className="text-forest/50">
                {entry.date} — {entry.description}
              </div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-leaf-circle px-2.5 py-1 font-semibold text-forest">
              <Clock className="h-3 w-3" /> {entry.hours}h
            </span>
          </li>
        ))}
        {entries.length === 0 && (
          <li className="px-5 py-3.5 text-sm text-forest/50">No hours logged yet.</li>
        )}
      </ul>
    </PageShell>
  );
}
