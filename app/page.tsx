import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Navbar isLoggedIn={false} />
      <Hero />
      <FeatureGrid />
      <HowItWorks />
      <Testimonials />

      <section className="bg-forest py-16 text-center">
        <h2 className="font-display text-3xl text-cream">
          Start your service journey today.
        </h2>
        <Link
          href="/signup"
          className="mt-6 inline-block rounded-full bg-sun px-8 py-3 font-medium text-forest hover:brightness-95 focus-ring"
        >
          Join ServeLink
        </Link>
      </section>
    </main>
  );
}
