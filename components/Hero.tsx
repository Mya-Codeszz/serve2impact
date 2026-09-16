import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/80 via-forest/40 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
        <span className="inline-flex items-center gap-2 rounded-full bg-cream/90 px-4 py-1.5 text-sm font-medium text-forest">
          Find. Serve. Make an Impact.
        </span>

        <h1 className="mt-6 max-w-2xl font-display text-4xl leading-tight text-cream md:text-6xl">
          For NHS, HHS, and volunteers who want to make a change.
        </h1>

        <p className="mt-6 max-w-lg text-lg text-cream/90">
          Discover meaningful volunteer opportunities that fit your schedule,
          your interests, and your goals — all in one place.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-2 rounded-full bg-sun px-6 py-3 font-medium text-forest hover:brightness-95 focus-ring"
          >
            Browse Opportunities
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-full border border-cream/60 px-6 py-3 font-medium text-cream hover:bg-cream/10 focus-ring"
          >
            Create your account
          </Link>
        </div>
      </div>
    </section>
  );
}
