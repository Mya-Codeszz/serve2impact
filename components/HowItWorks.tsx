const steps = [
  { icon: '○', title: 'Sign Up', body: 'Create your account and set your preferences.' },
  { icon: '⌕', title: 'Explore', body: 'Browse and filter opportunities that fit you.' },
  { icon: '♡', title: 'Save & Apply', body: 'Save your favorites and sign up to serve.' },
  { icon: '☆', title: 'Make an Impact', body: 'Track your hours, get recognized, and build your future.' },
];

export default function HowItWorks() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="script-accent inline-block">~</p>
        <h2 className="mt-1 font-display text-4xl font-semibold text-forest">How It Works</h2>
        <p className="script-accent mt-2">Your time matters.</p>

        <ol className="relative mt-16 grid gap-10 sm:grid-cols-4">
          <div aria-hidden className="absolute left-0 right-0 top-8 hidden border-t-2 border-dashed border-leaf-circle sm:block" style={{ marginInline: '12.5%' }} />
          {steps.map((step, i) => (
            <li key={step.title} className="relative flex flex-col items-center">
              <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-leaf-circle text-xl text-forest">
                {step.icon}
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-forest text-[11px] font-semibold text-cream">
                  {i + 1}
                </span>
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-forest">{step.title}</h3>
              <p className="mt-1 text-sm text-forest/70">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
