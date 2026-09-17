"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/opportunities", label: "Opportunities" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/stories", label: "Stories" },
  { href: "/organizations", label: "For Organizations" },
];

export default function Navbar({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur border-b border-leaf-light">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 focus-ring rounded-sm">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest">
            <Heart className="h-4 w-4 fill-cream text-cream" strokeWidth={1.5} />
          </span>
          <span className="font-display text-xl font-semibold">
            Serve<span className="text-leaf-DEFAULT" style={{ color: "#8DC152" }}>Link</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 text-sm font-medium text-forest/80 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-forest focus-ring rounded-sm">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <Link href="/login" className="text-sm font-medium hover:text-forest focus-ring rounded-sm">
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-cream hover:bg-forest-700 focus-ring"
          >
            Join ServeLink
          </Link>
        </div>
      </nav>
    </header>
  );
}
