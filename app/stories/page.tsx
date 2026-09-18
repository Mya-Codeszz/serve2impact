"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Heart, Quote, Sparkles, Send, Camera, Clock3, Users, Building2 } from "lucide-react";
import Footer from "@/components/Footer";

const impactStats = [
  { value: "1,000+", label: "hours served", icon: Clock3, tone: "bg-[#E7F4D4]" },
  { value: "500+", label: "students involved", icon: Users, tone: "bg-[#EDE5FF]" },
  { value: "75+", label: "organizations", icon: Building2, tone: "bg-[#FFE1EA]" },
];

const spotlights = [
  { name: "Student Spotlight", school: "High school volunteer", image: "/volunteer3.jpg", color: "bg-[#E8F5D5]", story: "One afternoon of volunteering turned into a habit. Finding an opportunity that actually fit their schedule made it easier to keep showing up." },
  { name: "Community Spotlight", school: "Local organization", image: "/volunteer2.webp", color: "bg-[#EEE7FF]", story: "A small team of students helped turn a busy service day into something the whole community could feel. The best part? They came back." },
  { name: "Making It Count", school: "Student volunteer", image: "/volunteer-holding-orange-tabby-kitten.jpg", color: "bg-[#FFE4D5]", story: "Service stopped feeling like another box to check and started feeling like something personal: meeting people, learning something new, and helping out." },
];

const quotes = [
  ["It finally made volunteering feel easy to find.", "Student volunteer"],
  ["I found something that actually matched what I care about.", "Student volunteer"],
  ["Showing up with friends made the experience even better.", "Student volunteer"],
  ["I didn't realize one afternoon could make this much of a difference.", "Student volunteer"],
  ["ServeLink helped me turn service hours into real experiences.", "Student volunteer"],
  ["The opportunity was right there. I just needed a place to find it.", "Student volunteer"],
];

export default function StoriesPage() {
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <div className="overflow-hidden bg-[#FBFAF6]">
      <section className="relative px-6 pb-20 pt-16 sm:px-10 lg:px-12 lg:pb-28 lg:pt-24">
        <div className="absolute -right-20 top-16 h-72 w-72 rounded-full bg-[#E8DFFF] blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-[#E3F2C8] blur-3xl" />
        <div className="relative mx-auto max-w-[1240px]">
          <div className="max-w-4xl">
            <p className="mb-5 flex items-center gap-2 font-script text-2xl text-[#7CAE3E]"><Sparkles className="h-5 w-5" /> Stories from the community</p>
            <h1 className="font-display text-5xl font-semibold leading-[.98] tracking-[-0.045em] text-[#123B2C] sm:text-7xl lg:text-[88px]">See what happens when students <span className="relative inline-block">show up.<span className="absolute -bottom-2 left-1/2 h-3 w-[90%] -translate-x-1/2 rounded-full bg-[#D8EEA9]/70" /></span></h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#557063]">Real service isn't just a number of hours. It's the people you meet, the places you help, and the moments you remember.</p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {impactStats.map((stat) => { const Icon = stat.icon; return <div key={stat.label} className={`rounded-[28px] ${stat.tone} p-6 shadow-sm`}><Icon className="h-5 w-5 text-[#315B4C]" /><div className="mt-7 font-display text-4xl font-semibold text-[#123B2C]">{stat.value}</div><div className="mt-1 text-sm font-semibold text-[#587064]">{stat.label}</div></div>; })}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="font-script text-2xl text-[#8BAF4D]">A few good stories</p><h2 className="mt-1 font-display text-4xl font-semibold tracking-[-0.035em] text-[#123B2C] sm:text-5xl">Featured spotlights</h2></div><span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#587064] shadow-sm">More stories coming soon</span></div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {spotlights.map((story, i) => <article key={story.name} className="group overflow-hidden rounded-[32px] bg-white shadow-[0_18px_55px_rgba(35,76,60,.08)]"><div className="relative h-64 overflow-hidden"><img src={story.image} alt="Volunteers serving in their community" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><span className={`absolute left-5 top-5 rounded-full ${story.color} px-3 py-1.5 text-xs font-bold text-[#315B4C]`}>{i === 0 ? "Student" : i === 1 ? "Organization" : "Community"}</span></div><div className="p-7"><p className="text-sm font-semibold text-[#8BAF4D]">{story.school}</p><h3 className="mt-2 font-display text-2xl font-semibold text-[#123B2C]">{story.name}</h3><p className="mt-4 leading-7 text-[#60766C]">{story.story}</p><Link href="#share" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#315B4C]">Share your story <ArrowRight className="h-4 w-4" /></Link></div></article>)}
          </div>
        </div>
      </section>

      <section className="bg-[#F0F5E8] px-6 py-20 sm:px-10 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1240px]"><div className="flex items-end justify-between gap-6"><div><p className="font-script text-2xl text-[#7CAE3E]">In their words</p><h2 className="mt-1 font-display text-4xl font-semibold tracking-[-0.035em] text-[#123B2C] sm:text-5xl">A wall of good things.</h2></div><Quote className="hidden h-14 w-14 text-[#C6D9A2] sm:block" /></div><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{quotes.map(([quote, by], i) => <div key={i} className="min-h-44 rounded-[26px] bg-white p-7 shadow-sm"><Quote className="h-6 w-6 text-[#A9C86E]" /><p className="mt-5 font-display text-xl leading-7 text-[#244D3C]">“{quote}”</p><p className="mt-5 text-xs font-bold uppercase tracking-[.14em] text-[#8B9B92]">{by}</p></div>)}</div></div>
      </section>

      <section id="share" className="px-6 py-20 sm:px-10 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1100px] overflow-hidden rounded-[36px] bg-[#123B2C] shadow-[0_25px_70px_rgba(18,59,44,.18)] lg:grid-cols-[.85fr_1.15fr]">
          <div className="relative overflow-hidden p-8 text-[#FBFAF6] sm:p-12"><div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#8DC152]/20" /><div className="relative"><Heart className="h-8 w-8 fill-[#D8EEA9] text-[#D8EEA9]" /><p className="mt-8 font-script text-3xl text-[#CBEA93]">Your turn.</p><h2 className="mt-2 font-display text-4xl font-semibold leading-tight sm:text-5xl">Share what service means to you.</h2><p className="mt-5 leading-7 text-[#D5E0DA]">Tell us about an opportunity, a moment, or a person that made your service experience memorable.</p></div></div>
          <div className="bg-white p-8 sm:p-12">
            {submitted ? <div className="flex min-h-[500px] flex-col items-center justify-center text-center"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E7F4D4]"><Send className="h-7 w-7 text-[#315B4C]" /></div><h3 className="mt-6 font-display text-3xl font-semibold text-[#123B2C]">Story received!</h3><p className="mt-3 max-w-sm leading-7 text-[#60766C]">Thanks for sharing. This form is static for now, but it's ready to connect to the database later.</p></div> : <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}><div className="grid gap-5 sm:grid-cols-2"><Field label="Name" name="name" /><Field label="School" name="school" /><Field label="Email" name="email" type="email" /><Field label="Organization volunteered with" name="organization" /></div><div><label className="mb-2 block text-sm font-bold text-[#315B4C]">What did you do?</label><input required name="activity" className="w-full rounded-2xl border border-[#DCE5DD] bg-[#FBFCF9] px-4 py-3 outline-none transition focus:border-[#8DC152]" placeholder="Tell us about the opportunity" /></div><div><label className="mb-2 block text-sm font-bold text-[#315B4C]">Your story</label><textarea required name="story" rows={5} className="w-full resize-none rounded-2xl border border-[#DCE5DD] bg-[#FBFCF9] px-4 py-3 outline-none transition focus:border-[#8DC152]" placeholder="What happened? How did it make you feel?" /></div><div><label className="mb-2 block text-sm font-bold text-[#315B4C]">Photo <span className="font-normal text-[#8B9B92]">(optional)</span></label><label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-[#C9D8CC] bg-[#F8FAF6] px-4 py-4 text-sm font-semibold text-[#60766C]"><Camera className="h-5 w-5" /> Add a photo<input type="file" accept="image/*" className="hidden" /></label></div><button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#123B2C] px-6 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#0E2F23]">Submit your story <ArrowRight className="h-4 w-4" /></button></form>}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) { return <div><label className="mb-2 block text-sm font-bold text-[#315B4C]">{label}</label><input required type={type} name={name} className="w-full rounded-2xl border border-[#DCE5DD] bg-[#FBFCF9] px-4 py-3 outline-none transition focus:border-[#8DC152]" /></div>; }
