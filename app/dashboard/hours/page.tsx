'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
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

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold">Volunteer Hours</h1>
      <p className="mt-1 text-gray-600">Total logged: {total} hours</p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 rounded-lg border border-gray-200 bg-white p-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Organization</label>
          <input
            required
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            required
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Hours</label>
          <input
            required
            type="number"
            step="0.5"
            min="0.5"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">What did you do?</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            rows={2}
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="sm:col-span-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Log hours'}
        </button>
      </form>

      <ul className="mt-6 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
        {entries.map((entry) => (
          <li key={entry.id} className="flex items-center justify-between px-4 py-3 text-sm">
            <div>
              <div className="font-medium">{entry.organization_name}</div>
              <div className="text-gray-500">{entry.date} — {entry.description}</div>
            </div>
            <span className="font-semibold text-brand-700">{entry.hours}h</span>
          </li>
        ))}
        {entries.length === 0 && <li className="px-4 py-3 text-sm text-gray-500">No hours logged yet.</li>}
      </ul>
    </div>
  );
}
