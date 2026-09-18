import Link from 'next/link';
import { MapPin, Repeat, Users, PawPrint, BookOpen, Leaf, UtensilsCrossed, HeartHandshake, Sparkles } from 'lucide-react';
import type { Opportunity } from '@/types/database.types';

function formatLocation(o: Opportunity) {
  if (o.location_type === 'virtual') return 'Virtual';
  if (o.city && o.state) return `${o.city}, ${o.state}`;
  return o.location_type === 'hybrid' ? 'Hybrid' : 'Location TBD';
}

const CATEGORY_ICONS: Record<string, typeof PawPrint> = {
  animals: PawPrint,
  education: BookOpen,
  'education-tutoring': BookOpen,
  environment: Leaf,
  'food-security': UtensilsCrossed,
  food_insecurity: UtensilsCrossed,
  seniors: HeartHandshake,
};

function iconFor(opportunity: Opportunity) {
  const slug = opportunity.categories?.[0]?.slug;
  return (slug && CATEGORY_ICONS[slug]) || Sparkles;
}

export default function OpportunityCard({
  opportunity,
  tilt = false,
}: {
  opportunity: Opportunity;
  tilt?: boolean;
}) {
  const Icon = iconFor(opportunity);

  return (
    <Link
      href={`/opportunities/${opportunity.id}`}
      className={`group relative block rounded-2xl border border-leaf-circle bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md focus-ring ${
        tilt ? 'hover:rotate-0 rotate-[-0.5deg]' : ''
      }`}
    >
      {opportunity.status === 'verified' && (
        <span className="absolute -top-2 right-4 rounded-full bg-leaf px-2.5 py-0.5 text-[11px] font-semibold text-forest font-display shadow-sm">
          Verified
        </span>
      )}

      <div className="flex h-16 items-center justify-center rounded-xl bg-gradient-to-br from-leaf-circle to-leaf-light">
        <Icon className="h-6 w-6 text-forest" strokeWidth={1.75} />
      </div>

      <h3 className="mt-3 font-display font-semibold text-forest">{opportunity.title}</h3>
      <p className="mt-0.5 text-sm text-forest/60">{opportunity.organization?.name}</p>
      <p className="mt-2 line-clamp-2 text-sm text-forest/70">{opportunity.description}</p>

      <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
        <span className="inline-flex items-center gap-1 rounded-full bg-leaf-circle px-2.5 py-1 text-forest/80">
          <MapPin className="h-3 w-3" /> {formatLocation(opportunity)}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-leaf-circle px-2.5 py-1 text-forest/80">
          <Repeat className="h-3 w-3" />
          {opportunity.commitment_type === 'one_time' ? 'One-time' : 'Recurring'}
        </span>
        {opportunity.min_age && (
          <span className="inline-flex items-center gap-1 rounded-full bg-leaf-circle px-2.5 py-1 text-forest/80">
            <Users className="h-3 w-3" /> Ages {opportunity.min_age}+
          </span>
        )}
        {opportunity.categories?.map((c) => (
          <span key={c.id} className="rounded-full bg-blush px-2.5 py-1 font-medium text-forest">
            {c.name}
          </span>
        ))}
      </div>
    </Link>
  );
}
