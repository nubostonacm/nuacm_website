"use client";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { events } from "@/data/events";

const tagColors: Record<string, string> = {
  Hackathon: "text-acm-blue-b bg-acm-blue/10",
  Workshop:  "text-emerald-400 bg-emerald-400/10",
  Speaker:   "text-amber-400  bg-amber-400/10",
  Social:    "text-purple-400 bg-purple-400/10",
  Showcase:  "text-pink-400   bg-pink-400/10",
  Career:    "text-orange-400 bg-orange-400/10",
};

function useCountdown(targetDate: string) {
  const calc = () => {
    const diff = +new Date(targetDate) - +new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, over: true };
    return {
      days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      over: false,
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return t;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const, delay: i * 0.08 } }),
};

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = events.find((e) => e.slug === params.slug);
  if (!event) notFound();

  const countdown = useCountdown(event.startDate);
  const isPast = event.status === "past";

  return (
    <div className="bg-acm-black min-h-screen">

      {/* ── HERO ── */}
      <section className="relative min-h-[65vh] flex flex-col justify-end px-6 lg:px-16 pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="absolute pointer-events-none" style={{ width: 700, height: 500, background: "radial-gradient(ellipse, rgba(26,111,207,0.18) 0%, transparent 70%)", top: -100, right: -150, borderRadius: "50%" }} />

        <div className="relative max-w-5xl">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-2 mb-8">
            <Link href="/events" className="font-mono text-xs tracking-widest uppercase text-acm-faint hover:text-acm-blue-b transition-colors">Events</Link>
            <span className="text-acm-faint">/</span>
            <span className="font-mono text-xs tracking-widest uppercase text-acm-muted">{event.tag}</span>
          </motion.div>

          {/* Tag + date */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex items-center gap-3 mb-5">
            <span className={`font-mono text-xs tracking-widest uppercase px-3 py-1 rounded-sm ${tagColors[event.tag] ?? "text-acm-blue-b bg-acm-blue/10"}`}>{event.tag}</span>
            <span className="font-mono text-xs text-acm-faint">{event.dateLabel}</span>
            {event.location && <span className="font-mono text-xs text-acm-faint">· {event.location}</span>}
          </motion.div>

          {/* Title */}
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.2 }}
            className="font-display font-extrabold tracking-tight leading-tight mb-6"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}
          >
            {event.title}
          </motion.h1>

          {/* Description */}
          {event.fullDescription && (
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
              className="text-acm-muted text-lg leading-relaxed max-w-2xl mb-8"
            >
              {event.fullDescription}
            </motion.p>
          )}

          {/* Pill tags */}
          {event.tags && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.45 }} className="flex gap-2 flex-wrap mb-8">
              {event.tags.map((t) => (
                <span key={t} className="font-mono text-xs tracking-wide uppercase border border-acm-border text-acm-faint px-3 py-1 rounded-sm">{t}</span>
              ))}
            </motion.div>
          )}

          {/* Registration CTA */}
          {!isPast && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="flex flex-wrap gap-4 items-center">
              {event.registrationOpen ? (
                event.registrationLink ? (
                  <a href={event.registrationLink} target="_blank" rel="noopener noreferrer"
                    className="font-mono text-xs tracking-widest uppercase bg-acm-blue text-white px-8 py-3 rounded-sm hover:bg-acm-blue-b transition-all duration-200 hover:-translate-y-0.5">
                    Register Now →
                  </a>
                ) : event.useInternalForm && event.internalFormPath ? (
                  <Link href={event.internalFormPath}
                    className="font-mono text-xs tracking-widest uppercase bg-acm-blue text-white px-8 py-3 rounded-sm hover:bg-acm-blue-b transition-all duration-200 hover:-translate-y-0.5">
                    Register Now →
                  </Link>
                ) : null
              ) : (
                <div className="font-mono text-xs tracking-widest uppercase bg-red-500/20 border border-red-400/40 text-red-300 px-6 py-3 rounded-sm">
                  Registration Closed
                </div>
              )}
              {event.registrationDeadline && event.registrationOpen && (
                <span className="font-mono text-xs text-acm-faint">Deadline: {event.registrationDeadline}</span>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── COUNTDOWN (upcoming only) ── */}
      {!isPast && !countdown.over && (
        <section className="px-6 lg:px-16 py-12 border-t border-acm-border bg-acm-navy">
          <div className="max-w-5xl mx-auto">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <span className="font-mono text-xs tracking-widest uppercase text-acm-faint block mb-6">Starts in</span>
              <div className="flex gap-4 flex-wrap">
                {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
                  <div key={unit} className="text-center border border-acm-border bg-acm-surface px-6 py-4 min-w-[80px]">
                    <div className="font-display font-extrabold text-4xl leading-none text-acm-text mb-1">
                      {String(countdown[unit]).padStart(2, "0")}
                    </div>
                    <div className="font-mono text-[9px] tracking-widest uppercase text-acm-faint">{unit}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── PRIZES ── */}
      {event.prizes && event.prizes.length > 0 && (
        <section className="px-6 lg:px-16 py-16 border-t border-acm-border">
          <div className="max-w-5xl mx-auto">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-8">
              <span className="font-mono text-xs tracking-widest uppercase text-acm-faint block mb-3">Prizes</span>
              <h2 className="font-display font-bold text-2xl tracking-tight">What You Can <span className="text-acm-blue-b italic">Win</span></h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-acm-border border border-acm-border rounded overflow-hidden">
              {event.prizes.map((prize, i) => (
                <motion.div key={i} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                  className="bg-acm-black p-6 hover:bg-acm-surface transition-colors flex items-start gap-4"
                >
                  <span className="font-mono text-xs text-acm-blue-b flex-shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm text-acm-muted leading-relaxed">{prize}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── AGENDA ── */}
      {event.agenda && event.agenda.length > 0 && (
        <section className="px-6 lg:px-16 py-16 bg-acm-navy border-t border-acm-border">
          <div className="max-w-5xl mx-auto">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-8">
              <span className="font-mono text-xs tracking-widest uppercase text-acm-faint block mb-3">Schedule</span>
              <h2 className="font-display font-bold text-2xl tracking-tight">Agenda</h2>
            </motion.div>
            <div className="space-y-px border border-acm-border rounded overflow-hidden">
              {event.agenda.map((item, i) => (
                <motion.div key={i} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                  className="flex items-center gap-6 bg-acm-black hover:bg-acm-surface transition-colors px-6 py-4"
                >
                  <span className="font-mono text-xs text-acm-blue-b flex-shrink-0 w-28">{item.time}</span>
                  <span className="w-px h-4 bg-acm-border flex-shrink-0" />
                  <span className="text-sm text-acm-muted">{item.item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SPONSORS ── */}
      {event.sponsors && event.sponsors.length > 0 && (
        <section className="px-6 lg:px-16 py-16 border-t border-acm-border">
          <div className="max-w-5xl mx-auto">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-8">
              <span className="font-mono text-xs tracking-widest uppercase text-acm-faint block mb-3">Sponsors</span>
              <h2 className="font-display font-bold text-2xl tracking-tight">Made Possible By</h2>
            </motion.div>
            <div className="flex flex-wrap gap-3">
              {event.sponsors.map((s, i) => (
                <span key={i} className="font-mono text-xs tracking-widest uppercase border border-acm-border text-acm-muted px-4 py-2 rounded-sm hover:border-acm-border-b transition-colors">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQs ── */}
      {event.faqs && event.faqs.length > 0 && (
        <section className="px-6 lg:px-16 py-16 bg-acm-navy border-t border-acm-border">
          <div className="max-w-3xl mx-auto">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-8">
              <span className="font-mono text-xs tracking-widest uppercase text-acm-faint block mb-3">FAQs</span>
              <h2 className="font-display font-bold text-2xl tracking-tight">Common Questions</h2>
            </motion.div>
            <div className="space-y-px border border-acm-border rounded overflow-hidden">
              {event.faqs.map((faq, i) => (
                <motion.div key={i} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                  className="bg-acm-black hover:bg-acm-surface transition-colors px-6 py-5"
                >
                  <p className="font-display font-bold text-sm mb-2">{faq.q}</p>
                  <p className="text-sm text-acm-muted leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BOTTOM CTA ── */}
      <section className="px-6 lg:px-16 py-16 border-t border-acm-border text-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="max-w-xl mx-auto">
          {!isPast && event.registrationOpen ? (
            <>
              <h2 className="font-display font-bold text-2xl tracking-tight mb-4">Ready to join?</h2>
              <p className="text-acm-muted text-sm leading-relaxed mb-6">Spots are limited. Register before the deadline.</p>
              {event.registrationLink ? (
                <a href={event.registrationLink} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-xs tracking-widest uppercase bg-acm-blue text-white px-8 py-3 rounded-sm hover:bg-acm-blue-b transition-all duration-200 hover:-translate-y-0.5 inline-block">
                  Register Now →
                </a>
              ) : event.useInternalForm && event.internalFormPath ? (
                <Link href={event.internalFormPath}
                  className="font-mono text-xs tracking-widest uppercase bg-acm-blue text-white px-8 py-3 rounded-sm hover:bg-acm-blue-b transition-all duration-200 hover:-translate-y-0.5 inline-block">
                  Register Now →
                </Link>
              ) : null}
            </>
          ) : (
            <>
              <h2 className="font-display font-bold text-2xl tracking-tight mb-4">See what's coming next</h2>
              <p className="text-acm-muted text-sm leading-relaxed mb-6">Follow us to stay updated on new events and announcements.</p>
              <Link href="/events" className="font-mono text-xs tracking-widest uppercase bg-acm-blue text-white px-8 py-3 rounded-sm hover:bg-acm-blue-b transition-all duration-200 hover:-translate-y-0.5 inline-block">
                All Events →
              </Link>
            </>
          )}
        </motion.div>
      </section>
    </div>
  );
}
