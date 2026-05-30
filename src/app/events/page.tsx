"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { upcomingEvents, pastEvents } from "@/data/events";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay: i * 0.07 },
  }),
};

const tagColors: Record<string, string> = {
  Hackathon: "text-acm-blue-sky  bg-acm-blue-sky/10",
  Workshop:  "text-emerald-400   bg-emerald-400/10",
  Speaker:   "text-amber-400     bg-amber-400/10",
  Social:    "text-purple-400    bg-purple-400/10",
  Showcase:  "text-pink-400      bg-pink-400/10",
  Career:    "text-orange-400    bg-orange-400/10",
};

const programTypes = [
  {
    title: "Hackathons",
    desc: "Multi-day build competitions open to all skill levels, with prizes and mentors on-site.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
      </svg>
    ),
  },
  {
    title: "Workshops",
    desc: "Technical deep-dives on ML, systems, web dev, and more. Hands-on and beginner-friendly.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    title: "Speaker Series",
    desc: "Engineers and leaders from top companies sharing real-world career and technical experience.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
  },
  {
    title: "Career Events",
    desc: "Resume reviews, mock technical interviews, and direct access to company recruiters.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    ),
  },
  {
    title: "Socials",
    desc: "Community mixers, semester kickoffs, and casual hangouts to meet fellow ACM members.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    title: "Showcases",
    desc: "End-of-semester demos where software teams present their work to startups and the ACM community.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
  },
];

export default function EventsPage() {
  return (
    <div className="bg-acm-black min-h-screen">

      {/* ── HERO ── */}
      <section className="relative min-h-[55vh] flex flex-col justify-center px-6 lg:px-16 pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="absolute pointer-events-none" style={{ width: 560, height: 380, background: "radial-gradient(ellipse, rgba(0,85,165,0.2) 0%, transparent 70%)", top: -80, left: -80, borderRadius: "50%" }} />
        <div className="relative max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-acm-blue-sky" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-acm-blue-sky">02 / Events</span>
          </div>
          <h1 className="font-display font-extrabold tracking-tight leading-tight mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            Events &amp; <span className="text-stroke italic">Programs</span>
          </h1>
          <p className="text-acm-muted text-lg leading-relaxed max-w-2xl">
            Workshops, hackathons, speakers, and community socials. Check back as new events are announced.
          </p>
        </div>
      </section>

      {/* ── UPCOMING ── */}
      <section className="px-6 lg:px-16 py-20 border-t border-acm-border">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-8">
            <span className="font-mono text-xs tracking-widest uppercase text-acm-faint block mb-2">This semester</span>
            <h2 className="font-display font-bold text-3xl tracking-tight">
              Upcoming <span className="text-acm-blue-sky italic">Events</span>
            </h2>
          </motion.div>

          {upcomingEvents.length === 0 ? (
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
              className="border border-acm-border bg-white/[0.02] p-12 text-center rounded-sm"
            >
              <div className="w-14 h-14 border border-acm-border flex items-center justify-center mx-auto mb-5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7 text-acm-blue-sky opacity-50">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-xl mb-3">No events scheduled yet</h3>
              <p className="text-acm-muted text-sm leading-relaxed max-w-md mx-auto mb-6">
                Follow us on Instagram and Discord to get notified the moment something is announced.
              </p>
              <Link href="/contact" className="font-mono text-xs tracking-widest uppercase bg-acm-blue-mid text-white px-6 py-2.5 rounded-sm hover:bg-acm-blue transition-all duration-200">
                Follow Us
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-2">
              {upcomingEvents.map((ev, i) => (
                <motion.div key={ev.slug} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
                  <Link href={`/events/${ev.slug}`} className="flex items-start gap-5 border border-acm-border bg-acm-black hover:bg-acm-surface hover:border-acm-border-b transition-all duration-200 p-5 group rounded-sm">
                    <div className="flex-shrink-0 w-12 text-center border border-acm-border-b bg-acm-surface p-2">
                      <div className="font-mono text-[9px] tracking-widest uppercase text-acm-blue-sky">{ev.month}</div>
                      <div className="font-display font-extrabold text-xl leading-none text-acm-text">{ev.day}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 inline-block mb-2 ${tagColors[ev.tag] ?? "text-acm-blue-sky bg-acm-blue-sky/10"}`}>{ev.tag}</span>
                      <h3 className="font-display font-bold text-base mb-1 group-hover:text-acm-blue-sky transition-colors">{ev.title}</h3>
                      <p className="text-sm text-acm-muted leading-relaxed">{ev.description}</p>
                      {ev.tags && (
                        <div className="flex gap-1.5 flex-wrap mt-2">
                          {ev.tags.map((t) => (
                            <span key={t} className="font-mono text-[9px] tracking-wide uppercase border border-acm-border text-acm-faint px-2 py-0.5 rounded-sm">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="font-mono text-xs tracking-widest uppercase text-acm-blue-sky flex-shrink-0 self-center flex items-center gap-1 group-hover:gap-2 transition-all whitespace-nowrap">
                      {ev.registrationOpen ? "Register" : "Learn More"} →
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── PAST EVENTS ── */}
      {pastEvents.length > 0 && (
        <section className="px-6 lg:px-16 py-20 bg-acm-navy border-t border-acm-border">
          <div className="max-w-5xl mx-auto">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-8">
              <span className="font-mono text-xs tracking-widest uppercase text-acm-faint block mb-2">Archive</span>
              <h2 className="font-display font-bold text-3xl tracking-tight">
                Past <span className="text-acm-blue-sky italic">Events</span>
              </h2>
            </motion.div>
            <div className="space-y-2">
              {pastEvents.map((ev, i) => (
                <motion.div key={ev.slug} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                  className="flex items-start gap-5 border border-acm-border bg-acm-black/40 hover:bg-acm-surface transition-all duration-200 p-5 group rounded-sm"
                >
                  <div className="flex-shrink-0 w-12 text-center border border-acm-border bg-acm-dark p-2">
                    <div className="font-mono text-[9px] tracking-widest uppercase text-acm-faint">{ev.month}</div>
                    <div className="font-display font-extrabold text-xl leading-none text-acm-muted">{ev.day}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 inline-block mb-2 opacity-60 ${tagColors[ev.tag] ?? "text-acm-blue-sky bg-acm-blue-sky/10"}`}>{ev.tag}</span>
                    <h3 className="font-display font-bold text-base mb-1 text-acm-muted group-hover:text-acm-text transition-colors">{ev.title}</h3>
                    <p className="text-sm text-acm-faint leading-relaxed">{ev.description}</p>
                    {ev.tags && (
                      <div className="flex gap-1.5 flex-wrap mt-2">
                        {ev.tags.map((t) => (
                          <span key={t} className="font-mono text-[9px] tracking-wide uppercase border border-acm-border/50 text-acm-faint px-2 py-0.5 rounded-sm opacity-60">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PROGRAM TYPES ── */}
      <section className="px-6 lg:px-16 py-20 border-t border-acm-border">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-10">
            <span className="font-mono text-xs tracking-widest uppercase text-acm-faint block mb-3">What to expect</span>
            <h2 className="font-display font-bold text-3xl tracking-tight">
              Types of <span className="text-acm-blue-sky italic">Programs</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-acm-border border border-acm-border rounded overflow-hidden">
            {programTypes.map((p, i) => (
              <motion.div key={p.title} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                className="bg-acm-black p-8 hover:bg-acm-surface transition-colors group"
              >
                <span className="text-acm-blue-sky opacity-60 group-hover:opacity-100 transition-opacity block mb-4">{p.icon}</span>
                <h3 className="font-display font-bold text-base mb-2 group-hover:text-acm-blue-sky transition-colors">{p.title}</h3>
                <p className="text-sm text-acm-muted leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 lg:px-16 py-20 bg-acm-navy border-t border-acm-border text-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="max-w-xl mx-auto">
          <h2 className="font-display font-bold text-3xl tracking-tight mb-4">Stay in the loop</h2>
          <p className="text-acm-muted leading-relaxed mb-8">
            Follow us on Instagram or join Discord to get notified the moment new events are announced.
          </p>
          <Link href="/contact" className="font-mono text-xs tracking-widest uppercase bg-acm-blue-mid text-white px-8 py-3 rounded-sm hover:bg-acm-blue transition-all duration-200 hover:-translate-y-0.5">
            Find Us Online
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
