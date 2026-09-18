import { Compass, UserCircle, Heart, Star, SlidersHorizontal, Users, Search, MapPin, Clock, ArrowRight, ArrowUpRight } from 'lucide-react';

const FEATURES = [
  { icon: Compass, title: 'Discover Opportunities', body: 'Browse a curated database of verified service roles.', bg: 'bg-leaf-circle', fg: 'text-forest' },
  { icon: UserCircle, title: 'Create Your Account', body: 'Set your preferences, causes, and availability.', bg: 'bg-lilac-tint', fg: 'text-lilac-text' },
  { icon: Heart, title: 'Save & Track', body: 'Keep your favorites and monitor your applications.', bg: 'bg-pink-tint', fg: 'text-pink-text' },
  { icon: Star, title: 'Build Your Impact', body: 'Log volunteer hours and get recognized for service.', bg: 'bg-sun-tint', fg: 'text-sun-text' },
  { icon: SlidersHorizontal, title: 'Filter & Search', body: 'Narrow by cause, location, age, and more.', bg: 'bg-sky-tint', fg: 'text-sky-text' },
  { icon: Users, title: 'Support Your Community', body: 'Make a real difference, close to home and beyond.', bg: 'bg-teal-tint', fg: 'text-teal-text' },
];

const MOCK_CARDS = [
  {
    title: 'Community Garden Cleanup',
    tag: 'Environment',
    tagBg: 'bg-leaf-circle',
    tagFg: 'text-forest',
    photo: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80&auto=format&fit=crop',
    location: 'Phoenix, AZ · 2.5 mi',
    schedule: '3 hours · Flexible',
  },
  {
    title: 'Shelter Dog Socialization',
    tag: 'Animals',
    tagBg: 'bg-lilac-tint',
    tagFg: 'text-lilac-text',
    photo: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&q=80&auto=format&fit=crop',
    location: 'Tempe, AZ · 4.1 mi',
    schedule: '2 hours · Weekends',
  },
  {
    title: 'After-School Tutoring',
    tag: 'Education',
    tagBg: 'bg-sky-tint',
    tagFg: 'text-sky-text',
    photo: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80&auto=format&fit=crop',
    location: 'Mesa, AZ · 3.8 mi',
    schedule: '1-2 hours · Weekdays',
  },
  {
    title: 'Beach Cleanup',
    tag: 'Community',
    tagBg: 'bg-pink-tint',
    tagFg: 'text-pink-text',
    photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80&auto=format&fit=crop',
    location: 'Scottsdale, AZ · 6.2 mi',
    schedule: '2 hours · Sat, Sun',
  },
];

function OpportunityMockCard({ card }: { card: (typeof MOCK_CARDS)[number] }) {
  return (
    <div className="rounded-xl border border-leaf-circle bg-white p-2">
      <div className="relative h-20 w-full overflow-hidden rounded-lg">
        <img src={card.photo} alt="" className="h-full w-full object-cover" />
        <span
          className={`absolute left-1.5 top-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold ${card.tagBg} ${card.tagFg}`}
        >
          {card.tag}
        </span>
        <span className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/90">
          <Heart className="h-3 w-3 text-forest/50" />
        </span>
      </div>
      <p className="mt-2 text-xs font-semibold leading-snug text-forest">{card.title}</p>
      <p className="mt-1 flex items-center gap-1 text-[10px] text-forest/50">
        <MapPin className="h-2.5 w-2.5" /> {card.location}
      </p>
      <div className="mt-0.5 flex items-center justify-between">
        <p className="flex items-center gap-1 text-[10px] text-forest/50">
          <Clock className="h-2.5 w-2.5" /> {card.schedule}
        </p>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-leaf-circle">
          <ArrowRight className="h-2.5 w-2.5 text-forest" />
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      {/* decorative background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-16 h-80 w-80 rounded-full bg-sun-tint/50 blur-3xl" />
        <div className="absolute left-[28%] top-24 h-[26rem] w-[26rem] rounded-full bg-leaf-light blur-3xl" />
        <div className="absolute right-[22%] top-4 h-80 w-80 rounded-full bg-lilac-tint/40 blur-3xl" />
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80&auto=format&fit=crop"
          alt=""
          className="absolute right-0 top-0 hidden h-full w-72 object-cover opacity-90 lg:block"
          style={{ maskImage: 'linear-gradient(to left, black 55%, transparent)', WebkitMaskImage: 'linear-gradient(to left, black 55%, transparent)' }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-16 lg:grid-cols-2 lg:items-start lg:py-20">
        <div>
          <div className="relative inline-block">
            <span className="font-script text-2xl text-forest">Everything in one place</span>
            <svg
              className="pointer-events-none absolute -inset-x-3 -inset-y-2"
              viewBox="0 0 220 60"
              fill="none"
              aria-hidden="true"
            >
              <ellipse cx="110" cy="30" rx="106" ry="24" stroke="#E8C15A" strokeWidth="2.5" />
            </svg>
          </div>

          <h1 className="mt-5 font-heading text-5xl font-extrabold leading-[1.08] tracking-tight text-forest lg:text-6xl">
            Built for students,
            <br />
            by students.
          </h1>

          <p className="mt-5 max-w-md text-forest/60">
            Find volunteer opportunities, build your impact, and be part of something bigger.
          </p>

          <dl className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {FEATURES.map(({ icon: Icon, title, body, bg, fg }) => (
              <div key={title} className="flex gap-3">
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${bg}`}>
                  <Icon className={`h-5 w-5 ${fg}`} strokeWidth={1.75} />
                </span>
                <div>
                  <dt className="font-heading text-[15px] font-bold text-forest">{title}</dt>
                  <dd className="mt-0.5 text-sm text-forest/60">{body}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative hidden lg:block">
          <div className="rounded-2xl border border-leaf-circle bg-white p-5 shadow-xl">
            <div className="flex items-center gap-2 rounded-full border border-leaf-circle bg-cream px-4 py-2.5">
              <Search className="h-4 w-4 text-forest/40" />
              <span className="flex-1 text-sm text-forest/40">Search by cause, location, or keyword…</span>
              <SlidersHorizontal className="h-4 w-4 text-forest/40" />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-forest">
                <Star className="h-3.5 w-3.5 fill-leaf text-leaf" /> Recommended for You
              </p>
              <span className="flex items-center gap-0.5 text-xs font-medium text-forest/50">
                See All <ArrowRight className="h-3 w-3" />
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {MOCK_CARDS.map((c) => (
                <OpportunityMockCard key={c.title} card={c} />
              ))}
            </div>
          </div>

          <div className="absolute -bottom-10 -right-8 w-48 rounded-2xl border border-leaf-circle bg-white p-4 shadow-xl">
            <p className="text-xs text-forest/50">Good morning,</p>
            <p className="font-heading text-base font-bold text-forest">Mya! ☀️</p>
            <p className="mt-1.5 text-[11px] leading-snug text-forest/60">
              You&apos;ve got 2 upcoming opportunities this week!
            </p>
            <div className="mt-3 flex gap-2">
              <div className="flex-1 rounded-lg bg-teal-tint py-2 text-center">
                <p className="font-heading text-base font-bold text-teal-text">12</p>
                <p className="text-[9px] text-teal-text/80">hours</p>
              </div>
              <div className="flex-1 rounded-lg bg-lilac-tint py-2 text-center">
                <p className="font-heading text-base font-bold text-lilac-text">3</p>
                <p className="text-[9px] text-lilac-text/80">saved</p>
              </div>
            </div>
            <button className="mt-3 flex w-full items-center justify-center gap-1 rounded-full bg-forest py-2 text-[11px] font-semibold text-cream">
              View My Schedule <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* handwritten decorative annotations */}
      <p className="pointer-events-none absolute right-[27%] top-20 hidden -rotate-6 font-script text-xl leading-tight text-forest lg:block">
        small steps
        <br />
        big change ✓
      </p>
      <p className="pointer-events-none absolute bottom-10 left-10 hidden -rotate-2 font-script text-xl leading-tight text-forest lg:block">
        Real people.
        <br />
        Real impact. ✓
      </p>
      <p className="pointer-events-none absolute bottom-28 left-[44%] hidden items-end gap-1 font-script text-lg leading-tight text-forest lg:flex">
        find what
        <br />
        moves you
        <ArrowUpRight className="mb-1 h-4 w-4" />
      </p>
    </section>
  );
}
