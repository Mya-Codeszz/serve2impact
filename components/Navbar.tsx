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
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur border-b border-sage-light">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 focus-ring rounded-sm">
          <Heart className="h-5 w-5 fill-sage text-sage" strokeWidth={1.5} />
          <span className="font-display text-xl">
            Serve<span className="text-sage-DEFAULT" style={{ color: "#8FAE93" }}>Link</span>
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
          {isLoggedIn && (
            <>
              <li>
                <Link href="/review" className="hover:text-forest focus-ring rounded-sm">
                  Review
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-forest focus-ring rounded-sm">
                  Dashboard
                </Link>
              </li>
            </>
          )}
        </ul>

        {isLoggedIn ? (
          <button className="rounded-full bg-forest px-5 py-2 text-sm font-medium text-cream hover:bg-forest-700 focus-ring">
            Log out
          </button>
        ) : (
          <Link
            href="/login"
            className="rounded-full bg-forest px-5 py-2 text-sm font-medium text-cream hover:bg-forest-700 focus-ring"
          >
            Log in
          </Link>
        )}
      </nav>
    </header>
  );
}
