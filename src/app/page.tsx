"use client";
import Link from "next/link";
import { announcement } from "@/config/announcement";
import { featuredEvent } from "@/data/events";

const pages = [
  {
    href: "/about",
    num: "01",
    title: "About",
    desc: "Who we are, our mission, and the team running ACM at Northeastern.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    href: "/events",
    num: "02",
    title: "Events",
    desc: "Workshops, hackathons, speakers, and everything happening this semester.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    href: "/software",
    num: "03",
    title: "Software",
    desc: "Our dev teams and semester-long project structure with startup partners.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    href: "/clients",
    num: "04",
    title: "Clients",
    desc: "Startup partnerships, expectations, and how to get started working with us.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    href: "/contact",
    num: "05",
    title: "Contact",
    desc: "Reach out, collaborate, partner with us, or just say hello.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
];

const tagColors: Record<string, string> = {
  Hackathon: "text-acm-blue-sky bg-acm-blue-sky/10",
  Workshop:  "text-emerald-400 bg-emerald-400/10",
  Speaker:   "text-amber-400  bg-amber-400/10",
  Social:    "text-purple-400 bg-purple-400/10",
  Showcase:  "text-pink-400   bg-pink-400/10",
  Career:    "text-orange-400 bg-orange-400/10",
};

export default function HomePage() {
  const showAnnouncement  = announcement.active;
  const showFeaturedEvent = !showAnnouncement && featuredEvent !== null;

  return (
    <div className="relative bg-acm-black overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* Glow orbs */}
      <div className="absolute pointer-events-none" style={{ width: 700, height: 500, background: "radial-gradient(ellipse, rgba(0,85,165,0.2) 0%, transparent 70%)", top: -120, right: -180, borderRadius: "50%" }} />
      <div className="absolute pointer-events-none" style={{ width: 400, height: 300, background: "radial-gradient(ellipse, rgba(77,157,224,0.07) 0%, transparent 70%)", bottom: 100, left: -80, borderRadius: "50%" }} />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 lg:px-16 pt-24 pb-16">
        <div className="max-w-5xl">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-10 bg-acm-blue-sky" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-acm-blue-sky">
              Northeastern University — Boston Chapter
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display font-extrabold leading-[0.95] tracking-tight mb-6"
            style={{ fontSize: "clamp(3.5rem, 9vw, 7.5rem)" }}
          >
            <span className="block text-acm-text">Advancing</span>
            <span className="block text-stroke italic">Computing</span>
            <span className="block text-acm-text">Together.</span>
          </h1>

          {/* Subheading */}
          <p className="text-acm-muted text-lg leading-relaxed max-w-xl mb-10">
            ACM @ Northeastern connects engineers, researchers, and builders through
            real-world projects, startup partnerships, and a community of people who
            care about computing.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-10">
            <Link
              href="/about"
              className="font-mono text-xs tracking-widest uppercase bg-acm-blue-mid text-white px-6 py-3 rounded-sm hover:bg-acm-blue transition-all duration-200 hover:-translate-y-0.5"
            >
              Learn More
            </Link>
            <Link
              href="/clients"
              className="font-mono text-xs tracking-widest uppercase text-acm-muted px-6 py-3 rounded-sm hover:text-acm-text transition-colors flex items-center gap-2 group border border-acm-border hover:border-acm-border-b"
            >
              Work With Us
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* ── ANNOUNCEMENT BANNER ── */}
          {showAnnouncement && (
            <Link
              href={announcement.href}
              className="group flex items-center justify-between gap-6 border border-acm-blue-sky/40 bg-acm-blue-sky/8 hover:bg-acm-blue-sky/14 hover:border-acm-blue-sky/60 transition-all duration-200 px-6 py-4 rounded-sm max-w-2xl"
            >
              <div className="flex items-start gap-4">
                <span className="relative flex-shrink-0 mt-1">
                  <span className="absolute inline-flex h-2.5 w-2.5 rounded-full bg-acm-blue-sky opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-acm-blue-sky" />
                </span>
                <div>
                  <p className="font-display font-bold text-sm text-acm-text mb-0.5">
                    {announcement.headline}
                  </p>
                  <p className="text-xs text-acm-muted leading-relaxed">
                    {announcement.subline}
                    {announcement.dateLabel && (
                      <span className="ml-2 font-mono text-acm-faint">— {announcement.dateLabel}</span>
                    )}
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs tracking-widest uppercase text-acm-blue-sky flex-shrink-0 flex items-center gap-1 group-hover:gap-2 transition-all">
                {announcement.cta}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          )}

          {/* ── FEATURED EVENT ── */}
          {showFeaturedEvent && featuredEvent && (
            <Link
              href={`/events/${featuredEvent.slug}`}
              className="group flex items-center justify-between gap-6 border border-acm-border bg-acm-surface/60 hover:bg-acm-surface hover:border-acm-border-b transition-all duration-200 px-6 py-4 rounded-sm max-w-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-10 text-center border border-acm-border-b bg-acm-dark px-2 py-1.5">
                  <div className="font-mono text-[8px] tracking-widest uppercase text-acm-blue-sky">{featuredEvent.month}</div>
                  <div className="font-display font-extrabold text-lg leading-none">{featuredEvent.day}</div>
                </div>
                <div>
                  <span className={`font-mono text-[9px] tracking-widest uppercase px-1.5 py-0.5 inline-block mb-1 ${tagColors[featuredEvent.tag] ?? "text-acm-blue-sky bg-acm-blue-sky/10"}`}>
                    {featuredEvent.tag}
                  </span>
                  <p className="font-display font-bold text-sm text-acm-text">
                    {featuredEvent.shortTitle ?? featuredEvent.title}
                  </p>
                  <p className="text-xs text-acm-muted">{featuredEvent.dateLabel}</p>
                </div>
              </div>
              <span className="font-mono text-xs tracking-widest uppercase text-acm-blue-sky flex-shrink-0 flex items-center gap-1 group-hover:gap-2 transition-all">
                {featuredEvent.registrationOpen ? "Register" : "Learn More"}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          )}
        </div>
      </section>

      {/* ── PAGE NAVIGATION CARDS ── */}
      <section className="relative px-6 lg:px-16 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-acm-faint">What we do</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-acm-border rounded overflow-hidden border border-acm-border">
            {/* Navigation cards */}
            {pages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group flex flex-col bg-acm-black p-8 min-h-[200px] hover:bg-acm-surface transition-colors duration-200 relative overflow-hidden"
              >
                <span className="absolute bottom-0 left-0 h-px w-0 bg-acm-blue-sky group-hover:w-full transition-all duration-300" />
                <div className="flex items-start justify-between mb-6">
                  <span className="font-mono text-xs text-acm-faint">{page.num}</span>
                  <span className="text-acm-blue-sky opacity-60 group-hover:opacity-100 transition-opacity">
                    {page.icon}
                  </span>
                </div>
                <p className="font-display font-bold text-xl mb-2 text-acm-text group-hover:text-acm-blue-sky transition-colors">
                  {page.title}
                </p>
                <p className="text-sm text-acm-muted leading-relaxed flex-1">{page.desc}</p>
                <span className="mt-6 font-mono text-xs tracking-widest uppercase text-acm-blue-sky opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  Explore <span>→</span>
                </span>
              </Link>
            ))}

            {/* 6th card — Join ACM */}
            <div className="flex flex-col bg-acm-surface p-8 min-h-[200px] border-l border-acm-border relative overflow-hidden">
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-acm-faint mb-3">
                Free membership
              </span>
              <p className="font-display font-bold text-xl mb-3 text-acm-text">Join ACM</p>
              <p className="text-sm text-acm-muted leading-relaxed flex-1">
                Open to all Northeastern students. No experience required — just curiosity.
              </p>
              <Link
                href="/join"
                className="mt-6 font-mono text-xs tracking-widest uppercase bg-acm-blue-mid text-white px-5 py-2.5 rounded-sm hover:bg-acm-blue transition-all duration-200 self-start"
              >
                Express Interest →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
