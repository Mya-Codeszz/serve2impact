'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Search, ArrowRight } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/search', label: 'Opportunities' },
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/stories', label: 'Stories' },
  { href: '/organizations', label: 'For Organizations' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-leaf-circle bg-cream/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 focus-ring rounded-sm">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest">
            <Heart className="h-4 w-4 fill-cream text-cream" strokeWidth={1.5} />
          </span>
          <span className="font-heading text-xl font-extrabold text-forest">
            Serve<span style={{ color: '#8DC152' }}>Link</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 text-sm font-medium text-forest/80 md:flex">
          {links.map((l) => {
            const active = l.href === '/' ? pathname === '/' : pathname?.startsWith(l.href.split('#')[0]) && l.href !== '/#how-it-works';
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`focus-ring rounded-sm pb-1 hover:text-forest ${
                    active ? 'border-b-2 border-leaf font-semibold text-forest' : ''
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-5">
          <button
            type="button"
            aria-label="Search"
            className="text-forest/70 hover:text-forest focus-ring rounded-sm"
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </button>
          <Link href="/login" className="text-sm font-medium hover:text-forest focus-ring rounded-sm">
            Log in
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center gap-1.5 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-cream hover:bg-forest-700 focus-ring"
          >
            Join ServeLink
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
