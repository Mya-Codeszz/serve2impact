import Link from "next/link";
import { ArrowRight } from "lucide-react";

const polaroids = [
  { caption: "Better Together", rotate: "-rotate-3" },
  { caption: "", rotate: "rotate-1" },
  { caption: "Stronger communities.", rotate: "rotate-3" },
];

export default function Footer() {
  return (
    <footer className="bg-forest text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
        <div>
          <p className="script-accent text-3xl" style={{ color: "#8DC152" }}>
            Start your service journey today.
          </p>
          <Link
            href="/signup"
            className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 font-display font-semibold text-forest hover:brightness-95 focus-ring"
            style={{ backgroundColor: "#8DC152" }}
          >
            Join ServeLink
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-4 text-cream/70">Together, we can make a difference.</p>
        </div>

        <div className="flex justify-center gap-4 md:justify-end">
          {polaroids.map((p, i) => (
            <div key={i} className={`w-32 rounded-md bg-cream p-2 pb-6 shadow-lg ${p.rotate}`}>
              <div className="flex h-20 items-center justify-center rounded bg-cream/40">
                <div className="h-8 w-8 rounded-sm border-2 border-forest/20" />
              </div>
              {p.caption && (
                <p className="mt-2 text-center font-script text-sm text-forest">{p.caption}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-sm text-cream/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 ServeLink. For NHS, HHS, and volunteers who want to make a change.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-cream">Privacy</Link>
            <Link href="/terms" className="hover:text-cream">Terms</Link>
            <Link href="/contact" className="hover:text-cream">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
