 "use client";

import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  Check,
  Clock3,
  Compass,
  Heart,
  MapPin,
  Search,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Compass,
    title: "Discover Opportunities",
    body: "Find verified roles that actually fit your interests and schedule.",
    tone: "lime",
  },
  {
    icon: Users,
    title: "Create Your Account",
    body: "Tell us what you care about, when you're free, and where you want to help.",
    tone: "violet",
  },
  {
    icon: Heart,
    title: "Save & Track",
    body: "Keep your favorites together and stay on top of applications.",
    tone: "pink",
  },
  {
    icon: Star,
    title: "Build Your Impact",
    body: "Log your service hours and turn every small action into a bigger story.",
    tone: "yellow",
  },
  {
    icon: Search,
    title: "Filter & Search",
    body: "Narrow by cause, location, age, commitment, and more.",
    tone: "blue",
  },
  {
    icon: Users,
    title: "Support Your Community",
    body: "Find something meaningful close to home or join virtually.",
    tone: "mint",
  },
];

const opportunities = [
  {
    title: "Community Garden Cleanup",
    category: "Environment",
    city: "Phoenix, AZ",
    distance: "2.5 mi",
    hours: "3 hours",
    image:
      "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=900&q=80",
    tone: "mint",
  },
  {
    title: "Shelter Dog Socialization",
    category: "Animals",
    city: "Tempe, AZ",
    distance: "4.1 mi",
    hours: "2 hours",
    image:
      "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=900&q=80",
    tone: "violet",
  },
  {
    title: "After-School Tutoring",
    category: "Education",
    city: "Mesa, AZ",
    distance: "3.8 mi",
    hours: "1–2 hours",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
    tone: "blue",
  },
  {
    title: "Beach Cleanup",
    category: "Community",
    city: "Scottsdale, AZ",
    distance: "6.2 mi",
    hours: "2 hours",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    tone: "pink",
  },
];

const toneClasses: Record<string, string> = {
  lime: "bg-[#E5F7A7] text-[#123B2C]",
  violet: "bg-[#E7D9FF] text-[#49318A]",
  pink: "bg-[#FFD9E5] text-[#9B315C]",
  yellow: "bg-[#FFE99C] text-[#705200]",
  blue: "bg-[#CFE6FF] text-[#24548A]",
  mint: "bg-[#C9F3E3] text-[#17624A]",
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F8F7EF]">
      <div className="absolute -left-24 top-24 h-80 w-80 rounded-[45%] bg-[#CFF59E] opacity-80 blur-[1px]" />
      <div className="absolute right-[30%] top-8 h-48 w-72 rounded-full bg-[#FFF09A] opacity-75 blur-2xl" />
      <div className="absolute right-[-100px] top-0 h-[470px] w-[470px] rounded-full bg-[#B9E3FF] opacity-80" />
      <div className="absolute right-[16%] top-44 h-72 w-72 rounded-[42%] bg-[#DCC7FF] opacity-70 rotate-12" />

      <div className="relative mx-auto grid max-w-[1440px] gap-10 px-6 pb-20 pt-12 sm:px-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-4 lg:px-12 lg:pb-24 lg:pt-14">
        <div className="relative z-10 max-w-2xl self-center">
          <div className="mb-5 inline-flex rotate-[-2deg] items-center gap-2 rounded-full border-2 border-[#D9E95C] bg-[#FBFBEF] px-5 py-2 font-script text-2xl text-[#174534] shadow-[0_5px_0_rgba(217,233,92,0.45)]">
            Everything in one place
          </div>

          <h1 className="max-w-3xl font-display text-[52px] font-semibold leading-[0.94] tracking-[-0.045em] text-[#103D2D] sm:text-6xl lg:text-[72px]">
            Built for students,
            <br />
            by students.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-7 text-[#41695B] sm:text-xl">
            Find volunteer opportunities, build your impact, and be part of
            something bigger.
          </p>

          <div className="mt-10 grid max-w-2xl gap-x-10 gap-y-8 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, body, tone }) => (
              <div key={title} className="flex gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${toneClasses[tone]} shadow-sm`}
                >
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="font-display text-[17px] font-semibold leading-5 text-[#123B2C]">
                    {title}
                  </h2>
                  <p className="mt-1.5 text-sm leading-5 text-[#55776B]">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 rounded-full bg-[#123B2C] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(18,59,44,0.18)] transition hover:-translate-y-0.5 hover:bg-[#0E2F23]"
            >
              Find an opportunity
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/search"
              className="rounded-full px-4 py-3 text-sm font-semibold text-[#174534] hover:bg-white/70"
            >
              Browse without signing up
            </Link>
          </div>
        </div>

        <div className="relative min-h-[650px] lg:min-h-[700px]">
          <div className="absolute right-0 top-4 z-20 w-full max-w-[680px] rotate-[-2.2deg] rounded-[28px] border border-white/80 bg-white/90 p-3 shadow-[0_30px_80px_rgba(35,67,54,0.18)] backdrop-blur sm:p-5">
            <div className="flex items-center gap-2 rounded-t-[18px] px-2 pb-3 text-xs font-medium text-[#6A8178]">
              <span className="h-2 w-2 rounded-full bg-[#AFC7BC]" />
              servelink.app/opportunities
              <div className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#F4F6F1]">
                <Search className="h-4 w-4 text-[#496A5E]" />
              </div>
            </div>

            <div className="rounded-[20px] bg-[#FAFAF7] p-3 sm:p-4">
              <div className="flex items-center gap-3 rounded-full border border-[#E6EDE4] bg-white px-4 py-3 text-sm text-[#83968E] shadow-sm">
                <Search className="h-4 w-4" />
                Search by cause, location, or keyword...
                <span className="ml-auto hidden rounded-full bg-[#F0F4ED] px-2 py-1 text-[10px] sm:block">
                  ⌘ K
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-[#123B2C]">
                  <Sparkles className="h-4 w-4 text-[#E7B900]" />
                  Recommended for You
                </div>
                <Link
                  href="/search"
                  className="text-xs font-semibold text-[#55776B] hover:text-[#123B2C]"
                >
                  See All →
                </Link>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                {opportunities.map((opportunity) => (
                  <div
                    key={opportunity.title}
                    className="overflow-hidden rounded-[18px] border border-[#E6EDE4] bg-white shadow-[0_6px_18px_rgba(30,60,45,0.06)]"
                  >
                    <div className="relative h-28 overflow-hidden sm:h-32">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition duration-500 hover:scale-105"
                        style={{ backgroundImage: `url(${opportunity.image})` }}
                      />
                      <span
                        className={`absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${toneClasses[opportunity.tone]}`}
                      >
                        {opportunity.category}
                      </span>
                      <button
                        type="button"
                        aria-label={`Save ${opportunity.title}`}
                        className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#4C655C] shadow-sm"
                      >
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="p-3.5">
                      <p className="font-display text-sm font-semibold leading-5 text-[#123B2C]">
                        {opportunity.title}
                      </p>
                      <div className="mt-2 flex items-center gap-1 text-[10px] text-[#71877E]">
                        <MapPin className="h-3 w-3" />
                        {opportunity.city} · {opportunity.distance}
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-[10px] text-[#71877E]">
                        <Clock3 className="h-3 w-3" />
                        {opportunity.hours} · Flexible
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute -bottom-3 left-0 z-30 w-[245px] -rotate-[3deg] rounded-[28px] border border-white/80 bg-[#F8FFF4]/95 p-5 shadow-[0_25px_50px_rgba(30,70,45,0.17)] backdrop-blur sm:left-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E7F7AF] text-[#76A72F]">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-[#55776B]">Good morning,</p>
                <p className="font-display text-lg font-semibold text-[#123B2C]">
                  Mya! ☀️
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-5 text-[#55776B]">
              You've got <span className="font-bold text-[#123B2C]">2 upcoming</span>{" "}
              opportunities this week!
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-2xl bg-[#D3F5E5] px-3 py-3 text-center">
                <p className="font-display text-xl font-semibold text-[#123B2C]">
                  12
                </p>
                <p className="text-[10px] text-[#54756A]">hours</p>
              </div>
              <div className="rounded-2xl bg-[#E8D9FF] px-3 py-3 text-center">
                <p className="font-display text-xl font-semibold text-[#123B2C]">
                  3
                </p>
                <p className="text-[10px] text-[#54756A]">saved</p>
              </div>
            </div>
            <Link
              href="/dashboard"
              className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#123B2C] px-4 py-3 text-xs font-semibold text-white"
            >
              View My Schedule <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="absolute right-[-8px] top-[250px] z-30 hidden w-36 rotate-[7deg] font-script text-2xl leading-6 text-[#174534] lg:block">
            <span className="block">small</span>
            <span className="block pl-6">steps</span>
            <span className="block pl-3">big change</span>
            <span className="mt-1 block text-right text-3xl">♡</span>
          </div>

          <div className="absolute bottom-10 right-[-4px] z-30 hidden -rotate-[5deg] font-script text-xl leading-6 text-[#174534] xl:block">
            find what
            <br />
            moves you
            <br />
            <span className="text-2xl">♡</span>
          </div>
        </div>
      </div>
    </section>
  );
}
