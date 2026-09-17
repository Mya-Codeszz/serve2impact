import Link from 'next/link';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';
import OpportunityCard from '@/components/OpportunityCard';
import { mockOpportunities } from '@/lib/mockData';

export default function HomePage() {
  const featured = mockOpportunities.slice(0, 3);

  return (
    <div>
      <Hero />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="script-accent">Get started</p>
            <h2 className="mt-1 font-display text-3xl font-semibold text-forest">Recently added</h2>
          </div>
          <Link href="/search" className="text-sm font-medium text-forest hover:underline">View all →</Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((o) => (
            <OpportunityCard key={o.id} opportunity={o} />
          ))}
        </div>
      </section>

      <div id="how-it-works"><HowItWorks /></div>
      <Footer />
    </div>
  );
}
