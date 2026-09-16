const quotes = [
  { name: "Piya", grade: "10th Grade", quote: "ServeLink made it so easy to find volunteer opportunities that fit my schedule and interests." },
  { name: "Noah", grade: "11th Grade", quote: "I used to have no clue where to volunteer. This site made it simple, organized, and actually fun to use." },
  { name: "Sophia", grade: "9th Grade", quote: "I found a tutoring opportunity through ServeLink and it's been such a rewarding experience." },
  { name: "Daniel", grade: "12th Grade", quote: "As an NHS member, I wanted to get more involved in service. ServeLink helped me find opportunities that matched my goals and schedule." },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="font-display text-3xl">What Students Are Saying</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-4">
        {quotes.map((q) => (
          <figure key={q.name} className="rounded-2xl bg-cream border border-sage-light p-6">
            <blockquote className="text-sm text-forest/80">&ldquo;{q.quote}&rdquo;</blockquote>
            <figcaption className="mt-4 text-sm font-medium">
              {q.name}, {q.grade}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
