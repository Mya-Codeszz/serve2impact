'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import AuthBackdrop from '@/components/AuthBackdrop';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
      return;
    }
    router.push('/dashboard');
    router.refresh();
  }

  return (
    <AuthBackdrop>
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest">
            <Heart className="h-4 w-4 fill-cream text-cream" />
          </span>
          <span className="font-display text-lg font-semibold text-forest">
            Serve<span className="text-leaf-DEFAULT" style={{ color: '#8DC152' }}>Link</span>
          </span>
        </div>

        <h1 className="font-display text-2xl font-semibold text-forest">Welcome back</h1>
        <p className="mt-1 text-sm text-forest/60">Log in to keep tracking your impact.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-forest">Email</label>
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-leaf-circle px-3 py-2.5 text-sm text-forest focus-ring"
            />
          </div>
          {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-leaf px-4 py-2.5 font-display font-semibold text-forest transition hover:brightness-95 disabled:opacity-50 focus-ring"
          >
            {loading ? 'Logging in…' : 'Log in'}
          </button>
        </form>
        <p className="mt-5 text-center text-sm text-forest/60">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-medium text-forest hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </AuthBackdrop>
  );
}
