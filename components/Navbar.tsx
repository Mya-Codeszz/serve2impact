'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-leaf-light bg-cream/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 rounded-sm focus-ring">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-lg text-cream">♡</span>
          <span className="font-display text-xl font-semibold text-forest">Serve<span style={{ color: '#8DC152' }}>Link</span></span>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium text-forest/80 md:flex">
          <Link href="/" className="hover:text-forest focus-ring rounded-sm">Home</Link>
          <Link href="/search" className="hover:text-forest focus-ring rounded-sm">Opportunities</Link>
          <Link href="#how-it-works" className="hover:text-forest focus-ring rounded-sm">How It Works</Link>
          {user && <Link href="/dashboard" className="hover:text-forest focus-ring rounded-sm">My Dashboard</Link>}
        </div>

        <div className="flex items-center gap-5">
          {user ? (
            <button onClick={handleSignOut} className="text-sm font-medium hover:text-forest focus-ring rounded-sm">Sign out</button>
          ) : (
            <Link href="/login" className="text-sm font-medium hover:text-forest focus-ring rounded-sm">Log in</Link>
          )}
          <Link href="/signup" className="rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-cream hover:bg-forest-700 focus-ring">Join ServeLink</Link>
        </div>
      </nav>
    </header>
  );
}
