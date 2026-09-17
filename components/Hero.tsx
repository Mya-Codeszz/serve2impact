import { Search, UserCircle, Heart, Star, Clock, Leaf } from "lucide-react";

const features = [
  { icon: Search, title: "Discover Opportunities", body: "Browse a curated database of verified service roles." },
  { icon: UserCircle, title: "Create Your Account", body: "Set your preferences, causes, and availability." },
  { icon: Heart, title: "Save & Track", body: "Keep your favorites and monitor your applications." },
  { icon: Star, title: "Build Your Impact", body: "Log volunteer hours and get recognized for service." },
  { icon: Clock, title: "Filter & Search", body: "Narrow by cause, location, age, and date." },
  { icon: Leaf, title: "Support Your Community", body: "Find local roles that match your passions." },
];

export default function Hero() {
  return (
    <section className="bg-leaf-light/60">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-20 md:grid-cols-2 md:items-start">
        <div>
          <p className="script-accent">Everything in one place</p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight text-forest md:text-5xl">
            Built for students, by students.
          </h1>

          <dl className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-leaf-circle">
                  <Icon className="h-5 w-5 text-forest" strokeWidth={1.75} />
                </span>
                <div>
                  <dt className="font-display font-semibold text-forest">{title}</dt>
                  <dd className="mt-1 text-sm text-forest/70">{body}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        {/* Browser + phone mockup */}
        <div className="relative hidden md:block">
          <div className="rounded-2xl border border-leaf-light bg-white shadow-xl">
            <div className="flex items-center gap-2 rounded-t-2xl bg-leaf-light/70 px-4 py-2.5 text-xs text-forest/60">
              <span className="h-2 w-2 rounded-full bg-forest/30" />
              servelink.app/opportunities
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 rounded-full border border-leaf-light bg-cream px-4 py-2.5 text-sm text-forest/50">
                <Search className="h-4 w-4" />
                Search by cause, location, or keyword...
              </div>
              <p className="mt-5 text-sm font-semibold text-forest">Recommended for You</p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="rounded-xl border border-leaf-light p-3">
                    <div className="h-16 w-full rounded-lg bg-gradient-to-br from-leaf-circle to-leaf-light" />
                    <div className="mt-3 h-2 w-4/5 rounded bg-leaf-light" />
                    <div className="mt-2 h-2 w-3/5 rounded bg-leaf-light" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute -bottom-8 -right-6 w-40 rounded-3xl border-4 border-forest bg-forest p-3 shadow-xl">
            <p className="text-xs text-cream/70">Good morning,</p>
            <p className="font-display text-sm font-semibold text-cream">Mya! ☀️</p>
            <div className="mt-3 flex gap-2">
              <div className="flex-1 rounded-lg bg-leaf-circle/90 py-2 text-center">
                <p className="font-display text-base font-semibold text-forest">12</p>
                <p className="text-[10px] text-forest/70">hours</p>
              </div>
              <div className="flex-1 rounded-lg bg-blush py-2 text-center">
                <p className="font-display text-base font-semibold text-forest">3</p>
                <p className="text-[10px] text-forest/70">saved</p>
              </div>
            </div>
            <div className="mt-3 space-y-1.5">
              <div className="h-1.5 w-full rounded bg-cream/20" />
              <div className="h-1.5 w-4/5 rounded bg-cream/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
