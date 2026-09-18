'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import PageShell from '@/components/PageShell';

const CAUSES = [
  { slug: 'animals', name: 'Animals', emoji: '🐾' },
  { slug: 'education', name: 'Education & Tutoring', emoji: '📚' },
  { slug: 'food_insecurity', name: 'Food Insecurity', emoji: '🍲' },
  { slug: 'environment', name: 'Environment', emoji: '🌱' },
  { slug: 'seniors', name: 'Seniors', emoji: '💛' },
  { slug: 'community', name: 'Community Events', emoji: '🎪' },
];

const LOCATION_OPTIONS: { value: 'in_person' | 'virtual' | 'no_preference'; label: string }[] = [
  { value: 'in_person', label: 'In-person' },
  { value: 'virtual', label: 'Virtual' },
  { value: 'no_preference', label: 'No preference' },
];

const COMMITMENT_OPTIONS: { value: 'one_time' | 'recurring' | 'no_preference'; label: string; body: string }[] = [
  { value: 'one_time', label: 'One-time events', body: 'A single day here and there' },
  { value: 'recurring', label: 'Ongoing roles', body: 'Same time each week' },
  { value: 'no_preference', label: 'Either works', body: "I'll take what fits" },
];

const STEPS = ['causes', 'location', 'commitment'] as const;

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClient();
  const [step, setStep] = useState(0);
  const [causes, setCauses] = useState<string[]>([]);
  const [locationType, setLocationType] = useState<string>('');
  const [commitmentType, setCommitmentType] = useState<string>('');
  const [saving, setSaving] = useState(false);

  function toggleCause(slug: string) {
    setCauses((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }

  const canContinue =
    (step === 0 && causes.length > 0) ||
    (step === 1 && locationType !== '') ||
    (step === 2 && commitmentType !== '');

  async function finish() {
    setSaving(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      // Supabase's generated types don't yet know about the columns added in
      // supabase/002_matching_quiz.sql (preferred_commitment_type,
      // onboarding_completed_at), so bypass strict typing here the same way
      // SaveButton.tsx does for its insert.
      const untypedSupabase = supabase as any;

      await untypedSupabase
        .from('profiles')
        .update({
          interests: causes,
          preferred_location_type: locationType === 'no_preference' ? null : locationType,
          preferred_commitment_type: commitmentType,
          onboarding_completed_at: new Date().toISOString(),
        })
        .eq('id', user.id);
    }

    setSaving(false);
    router.push('/search?matched=1');
  }

  return (
    <div className="bg-leaf-light/60 py-16">
      <PageShell narrow>
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-2 text-sm font-medium text-forest/50">
            <Sparkles className="h-4 w-4 text-leaf" />
            Step {step + 1} of {STEPS.length}
          </div>

          <div className="mb-6 flex gap-1.5">
            {STEPS.map((s, i) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-leaf' : 'bg-leaf-circle'}`}
              />
            ))}
          </div>

          {step === 0 && (
            <>
              <h1 className="font-display text-2xl font-semibold text-forest">
                What causes do you care about?
              </h1>
              <p className="mt-1 text-sm text-forest/60">Pick as many as you like.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {CAUSES.map((c) => (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => toggleCause(c.slug)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition focus-ring ${
                      causes.includes(c.slug)
                        ? 'bg-leaf text-forest'
                        : 'bg-leaf-circle text-forest/70 hover:bg-leaf-light'
                    }`}
                  >
                    {c.emoji} {c.name}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h1 className="font-display text-2xl font-semibold text-forest">
                How do you like to volunteer?
              </h1>
              <div className="mt-5 space-y-2">
                {LOCATION_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => setLocationType(o.value)}
                    className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition focus-ring ${
                      locationType === o.value
                        ? 'border-leaf bg-leaf-circle text-forest'
                        : 'border-leaf-circle bg-white text-forest hover:bg-leaf-light/40'
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="font-display text-2xl font-semibold text-forest">
                How much time can you commit?
              </h1>
              <div className="mt-5 space-y-2">
                {COMMITMENT_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => setCommitmentType(o.value)}
                    className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition focus-ring ${
                      commitmentType === o.value
                        ? 'border-leaf bg-leaf-circle'
                        : 'border-leaf-circle bg-white hover:bg-leaf-light/40'
                    }`}
                  >
                    <span className="font-medium text-forest">{o.label}</span>
                    <span className="block text-forest/50">{o.body}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="mt-8 flex items-center justify-between">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="text-sm font-medium text-forest/60 hover:text-forest"
              >
                Back
              </button>
            ) : (
              <span />
            )}

            {step < STEPS.length - 1 ? (
              <button
                type="button"
                disabled={!canContinue}
                onClick={() => setStep((s) => s + 1)}
                className="inline-flex items-center gap-2 rounded-full bg-leaf px-5 py-2.5 text-sm font-display font-semibold text-forest transition hover:brightness-95 disabled:opacity-40 focus-ring"
              >
                Next <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={!canContinue || saving}
                onClick={finish}
                className="inline-flex items-center gap-2 rounded-full bg-leaf px-5 py-2.5 text-sm font-display font-semibold text-forest transition hover:brightness-95 disabled:opacity-40 focus-ring"
              >
                {saving ? 'Saving…' : 'See my matches'} <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </PageShell>
    </div>
  );
}
