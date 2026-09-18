'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { getRecommended, type ScoredOpportunity } from '@/lib/matching';
import { mockOpportunities } from '@/lib/mockData';

export default function RecommendedForYou() {
  const [status, setStatus] = useState<'loading' | 'no-quiz' | 'ready' | 'signed-out'>('loading');
  const [matches, setMatches] = useState<ScoredOpportunity[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        if (!cancelled) setStatus('signed-out');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('interests, preferred_location_type, preferred_commitment_type')
        .eq('id', user.id)
        .single() as {
          data: {
            interests: string[] | null;
            preferred_location_type: string | null;
            preferred_commitment_type: string | null;
          } | null;
        };

      if (cancelled) return;

      if (!profile?.interests?.length) {
        setStatus('no-quiz');
        return;
      }

      const recommended = getRecommended(
        {
          interests: profile.interests,
          preferredLocationType: (profile.preferred_location_type as any) ?? 'no_preference',
          preferredCommitmentType: (profile.preferred_commitment_type as any) ?? 'no_preference',
        },
        mockOpportunities,
        3
      );

      setMatches(recommended);
      setStatus('ready');
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === 'loading' || status === 'signed-out') return null;

  if (status === 'no-quiz') {
    return (
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-forest px-6 py-5">
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-leaf" />
          <div>
            <p className="font-display font-semibold text-cream">Get matched to opportunities</p>
            <p className="text-sm text-cream/70">Answer 3 quick questions for picks made for you.</p>
          </div>
        </div>
        <Link
          href="/onboarding"
          className="inline-flex items-center gap-2 rounded-full bg-leaf px-4 py-2 text-sm font-display font-semibold text-forest hover:brightness-95 focus-ring"
        >
          Take the quiz <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  if (!matches.length) return null;

  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-forest">
          <Sparkles className="h-4 w-4 text-leaf" /> Recommended for You
        </h2>
        <Link href="/onboarding" className="text-xs font-medium text-forest/50 hover:text-forest">
          Retake quiz
        </Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {matches.map(({ opportunity, score, reasons }) => (
          <Link
            key={opportunity.id}
            href={`/opportunities/${opportunity.id}`}
            className="rounded-2xl border border-leaf-circle bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md focus-ring"
          >
            <span className="inline-block rounded-full bg-leaf px-2.5 py-0.5 text-[11px] font-semibold text-forest">
              {score}% match
            </span>
            <p className="mt-2 font-display font-semibold text-forest">{opportunity.title}</p>
            <p className="mt-0.5 text-xs text-forest/60">{opportunity.organization?.name}</p>
            {reasons[0] && <p className="mt-2 text-xs text-forest/50">{reasons[0]}</p>}
          </Link>
        ))}
      </div>
    </div>
  );
}
