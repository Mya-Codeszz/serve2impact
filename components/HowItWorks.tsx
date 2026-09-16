const steps = [
  { title: "Sign Up", body: "Create your account and set your preferences." },
  { title: "Explore", body: "Browse and filter opportunities near you." },
  { title: "Save & Apply", body: "Save your favorites and sign up." },
  { title: "Make an Impact", body: "Track your hours, get recognized, and build your future." },
];

export default function HowItWorks() {
  return (
    <section className="bg-sage-light/50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-3xl">How It Works</h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="flex gap-4">
              <span className="font-display text-2xl text-sage">{i + 1}</span>
              <div>
                <h3 className="font-medium">{s.title}</h3>
                <p className="mt-1 text-sm text-forest/70">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
