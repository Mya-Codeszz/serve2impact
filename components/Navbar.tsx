"use client";

import Link from "next/link";
import { ArrowRight, Heart, Search } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/search", label: "Opportunities" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/stories", label: "Stories" },
  { href: "/organizations", label: "For Organizations" },
];

export default function Navbar({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E9ECE4]/80 bg-[#FBFAF6]/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-6 sm:px-10 lg:px-12">
        <Link href="/" className="group flex items-center gap-2.5 rounded-full focus-ring">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#123B2C] shadow-[0_5px_14px_rgba(18,59,44,0.15)] transition group-hover:rotate-[-6deg]">
            <Heart className="h-[18px] w-[18px] fill-white text-white" strokeWidth={1.5} />
          </span>
          <span className="font-display text-[25px] font-semibold tracking-[-0.04em] text-[#123B2C]">
            Serve<span className="text-[#8DC152]">Link</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 text-sm font-semibold text-[#315648] lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="relative rounded-md px-1 py-2 transition hover:text-[#123B2C]">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/search"
            aria-label="Search opportunities"
            className="hidden h-9 w-9 items-center justify-center rounded-full text-[#234C3C] hover:bg-[#EEF4E9] sm:flex"
          >
            <Search className="h-[19px] w-[19px]" strokeWidth={2} />
          </Link>
          <Link href="/login" className="hidden text-sm font-semibold text-[#183F31] hover:text-[#8BAF4D] sm:block">
            Log in
          </Link>
          <Link
            href="/signup"
            className="group inline-flex items-center gap-2 rounded-full bg-[#123B2C] px-5 py-3 text-sm font-semibold text-white shadow-[0_7px_20px_rgba(18,59,44,0.15)] transition hover:-translate-y-0.5 hover:bg-[#0E2F23]"
          >
            Join ServeLink
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
