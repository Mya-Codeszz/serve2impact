import Link from 'next/link';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';
import OpportunityCard from '@/components/OpportunityCard';
import { mockOpportunities } from '@/lib/mockData';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HomePage() {
  const featured = mockOpportunities.slice(0, 3);

  return (
    <div className="overflow-hidden">
      <Hero />

      <section className="relative bg-[#FBFAF6] px-6 py-24 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 flex items-center gap-2 font-script text-2xl text-[#7CAE3E]">
                <Sparkles className="h-5 w-5" /> Find your thing
              </p>
              <h2 className="font-display text-4xl font-semibold tracking-[-0.03em] text-[#123B2C] sm:text-5xl">
                Opportunities worth showing up for.
              </h2>
            </div>
            <Link
              href="/search"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#315B4C]"
            >
              Explore all opportunities
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((o) => (
              <OpportunityCard key={o.id} opportunity={o} />
            ))}
          </div>
        </div>
      </section>

      <div id="how-it-works">
        <HowItWorks />
      </div>
      <Footer />
    </div>
  );
}
