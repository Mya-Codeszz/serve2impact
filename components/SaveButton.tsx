'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

type SaveButtonProps = {
  opportunityId: string;
  initialSaved?: boolean;
};

export default function SaveButton({
  opportunityId,
  initialSaved = false,
}: SaveButtonProps) {
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  async function toggleSave() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    if (saved) {
      await supabase
        .from('student_opportunities')
        .delete()
        .eq('student_id', user.id)
        .eq('opportunity_id', opportunityId);
    } else {
      await supabase
        .from('student_opportunities')
        .insert({
          student_id: user.id,
          opportunity_id: opportunityId,
          status: 'interested',
        });
    }

    setSaved(!saved);
    setLoading(false);
  }

  return (
    <button
      type="button"
      onClick={toggleSave}
      disabled={loading}
      className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
    >
      {saved ? 'Saved' : 'Save'}
    </button>
  );
}
