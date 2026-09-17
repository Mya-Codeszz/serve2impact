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

  async function toggleSave() {
    setLoading(true);

    try {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return;
      }

      if (saved) {
        const { error } = await supabase
          .from('student_opportunities')
          .delete()
          .eq('student_id', user.id)
          .eq('opportunity_id', opportunityId);

        if (!error) {
          setSaved(false);
        }
      } else {
        // Supabase's current generated type is incorrectly resolving
        // this table's insert type to never[]. Keep the database call
        // itself unchanged while bypassing that incorrect TypeScript type.
        const untypedSupabase = supabase as any;

        const { error } = await untypedSupabase
          .from('student_opportunities')
          .insert({
            student_id: user.id,
            opportunity_id: opportunityId,
            status: 'interested',
          });

        if (!error) {
          setSaved(true);
        }
      }
    } finally {
      setLoading(false);
    }
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
