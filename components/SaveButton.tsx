'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function SaveButton({ opportunityId }: { opportunityId: string }) {
  const [saved, setSaved] = useState(false);
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      setLoggedIn(!!data.user);
      if (!data.user) return;
      const { data: row } = await supabase
        .from('student_opportunities')
        .select('id')
        .eq('student_id', data.user.id)
        .eq('opportunity_id', opportunityId)
        .maybeSingle();
      setSaved(!!row);
    });
  }, [opportunityId, supabase]);

  async function toggleSave() {
    if (!loggedIn) {
      router.push('/login');
      return;
    }
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;

    if (saved) {
      await supabase
        .from('student_opportunities')
        .delete()
        .eq('student_id', userData.user.id)
        .eq('opportunity_id', opportunityId);
      setSaved(false);
    } else {
      await supabase.from('student_opportunities').insert({
        student_id: userData.user.id,
        opportunity_id: opportunityId,
        status: 'interested',
      });
      setSaved(true);
    }
  }

  return (
    <button
      onClick={toggleSave}
      className={`shrink-0 rounded-md border px-4 py-2 text-sm font-medium ${
        saved
          ? 'border-brand-600 bg-brand-50 text-brand-700'
          : 'border-gray-300 text-gray-700 hover:border-brand-400'
      }`}
    >
      {saved ? '★ Saved' : '☆ Save'}
    </button>
  );
}
