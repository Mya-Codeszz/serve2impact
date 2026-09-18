'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, MailCheck } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import PageShell from '@/components/PageShell';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setErrorMsg(error.message);
      setStatus('error');
    } else {
      setStatus('sent');
    }
  }

  if (status === 'sent') {
    return (
      <div className="bg-leaf-light/60 py-16">
        <PageShell narrow>
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <MailCheck className="mx-auto h-8 w-8 text-leaf" strokeWidth={1.5} />
            <h1 className="mt-3 font-display text-2xl font-semibold text-forest">Check your email</h1>
            <p className="mt-2 text-sm text-forest/60">
              We sent a confirmation link to <strong className="text-forest">{email}</strong>. Click it to
              activate your account.
            </p>
          </div>
        </PageShell>
      </div>
    );
  }

  return (
    <div className="bg-leaf-light/60 py-16">
      <PageShell narrow>
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest">
              <Heart className="h-4 w-4 fill-cream text-cream" />
            </span>
            <span className="font-display text-lg font-semibold text-forest">
              Serve<span style={{ color: '#8DC152' }}>Link</span>
            </span>
          </div>

          <h1 className="font-display text-2xl font-semibold text-forest">Create your account</h1>
          <p className="mt-1 text-sm text-forest/60">
            Track opportunities, save hours, and get matched to causes you care about.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-forest">Full name</label>
              <input
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-leaf-circle px-3 py-2.5 text-sm text-forest focus-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-forest">School email</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@school.edu"
                className="mt-1 w-full rounded-lg border border-leaf-circle px-3 py-2.5 text-sm text-forest placeholder:text-forest/30 focus-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-forest">Password</label>
              <input
                required
                minLength={8}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-leaf-circle px-3 py-2.5 text-sm text-forest focus-ring"
              />
            </div>
            {status === 'error' && <p className="text-sm text-red-600">{errorMsg}</p>}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full rounded-full bg-leaf px-4 py-2.5 font-display font-semibold text-forest transition hover:brightness-95 disabled:opacity-50 focus-ring"
            >
              {status === 'loading' ? 'Creating account…' : 'Sign up'}
            </button>
          </form>
          <p className="mt-5 text-center text-sm text-forest/60">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-forest hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </PageShell>
    </div>
  );
}
