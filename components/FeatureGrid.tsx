import { Search, UserPlus, BookmarkCheck, Sparkles } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Discover Opportunities",
    body: "Find local and virtual volunteer opportunities that fit your interests.",
  },
  {
    icon: UserPlus,
    title: "Create Your Account",
    body: "Sign up in minutes and personalize your preferences.",
  },
  {
    icon: BookmarkCheck,
    title: "Save & Track",
    body: "Save opportunities, track your applications, and log your hours.",
  },
  {
    icon: Sparkles,
    title: "Build Your Impact",
    body: "Earn service hours, strengthen your resume, and make a difference.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-10 md:grid-cols-4">
        {features.map(({ icon: Icon, title, body }) => (
          <div key={title}>
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-sage-light">
              <Icon className="h-5 w-5 text-forest" strokeWidth={1.5} />
            </div>
            <h3 className="font-display text-lg">{title}</h3>
            <p className="mt-2 text-sm text-forest/70">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
