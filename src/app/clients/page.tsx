"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: "easeOut", delay: i * 0.1 },
  }),
};

const benefits = [
  {
    title: "Dedicated Team",
    desc: "A cross-functional team focused solely on your project — not split across multiple clients.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    title: "Structured Milestones",
    desc: "Development cycles with defined deliverables so you always know where your project stands.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: "Direct Collaboration",
    desc: "Weekly touchpoints with technical and design leads — not just a monthly status report.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
  {
    title: "Fresh Perspectives",
    desc: "Student engineers bring curiosity and modern approaches to technical problems.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
  {
    title: "No Internal Overhead",
    desc: "Projects decoupled from your engineering workflows — no PRs to review, no standups to attend.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    title: "ACM Community Access",
    desc: "Opportunities to engage at hackathons, showcases, and networking events as a featured partner.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
      </svg>
    ),
  },
];

const expectations = [
  { num: "01", title: "Established & Stable",       desc: "Startups must be established for at least one year and demonstrate confidence in continued operation throughout the semester." },
  { num: "02", title: "High-Priority Project",      desc: "Work that genuinely impacts your mission — not vague or low-priority side initiatives." },
  { num: "03", title: "Clearly Scoped",             desc: "Defined enough to execute in a semester-long timeline, with potential for extension." },
  { num: "04", title: "Standalone Initiative",      desc: "Decoupled from internal engineering workflows and structured as standalone deliverables." },
  { num: "05", title: "Weekly Communication",       desc: "Consistent, structured communication including weekly progress updates with ACM teams." },
  { num: "06", title: "Project Brief",              desc: "A clear one-pager outlining objectives, context, and desired outcomes prior to scoping." },
  { num: "07", title: "Community Participation",    desc: "Openness to joining ACM events — hackathons, showcases, and networking opportunities." },
  { num: "08", title: "Full Execution Ownership",   desc: "ACM teams own all technical decision-making within agreed requirements. You set goals, we build." },
];

const goodFit = [
  { good: true,  text: "A startup building a specific, scoped technical product or feature" },
  { good: true,  text: "A project that can realistically ship in one semester" },
  { good: true,  text: "A team invested in weekly check-ins and collaboration" },
  { good: true,  text: "Work that doesn't require deep internal codebase access" },
  { good: false, text: "Vague R&D exploration without clear deliverables" },
  { good: false, text: "Projects requiring daily integration with your internal engineers" },
  { good: false, text: "Startups that need immediate output without structured onboarding" },
];

export default function ClientsPage() {
  return (
    <div className="bg-acm-black min-h-screen">

      {/* ── HERO ── */}
      <section className="relative min-h-[60vh] flex flex-col justify-center px-6 lg:px-16 pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="absolute pointer-events-none" style={{ width: 600, height: 400, background: "radial-gradient(ellipse, rgba(26,111,207,0.15) 0%, transparent 70%)", top: -60, right: -100, borderRadius: "50%" }} />
        <div className="relative max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-acm-blue-b" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-acm-blue-b">04 / Clients</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.15 }} className="font-display font-extrabold tracking-tight leading-tight mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            Partner With <span className="text-stroke italic">Us</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-acm-muted text-lg leading-relaxed max-w-2xl">
            ACM @ Northeastern partners with rising technology-focused startups to provide dedicated development teams that deliver real, functional software within a semester. No overhead. No filler. Focused execution.
          </motion.p>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="px-6 lg:px-16 py-20 border-t border-acm-border">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-12">
            <span className="font-mono text-xs tracking-widest uppercase text-acm-faint block mb-3">What you get</span>
            <h2 className="font-display font-bold text-3xl tracking-tight">Client <span className="text-acm-blue-b italic">Benefits</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-acm-border border border-acm-border rounded overflow-hidden">
            {benefits.map((b, i) => (
              <motion.div key={b.title} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                className="bg-acm-black p-8 hover:bg-acm-surface transition-colors group"
              >
                <span className="text-acm-blue-sky opacity-60 group-hover:opacity-100 transition-opacity block mb-4">{b.icon}</span>
                <h3 className="font-display font-semibold text-base mb-2 group-hover:text-acm-blue-b transition-colors">{b.title}</h3>
                <p className="text-sm text-acm-muted leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPECTATIONS ── */}
      <section className="px-6 lg:px-16 py-20 bg-acm-navy border-t border-acm-border">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-12">
            <span className="font-mono text-xs tracking-widest uppercase text-acm-faint block mb-3">What we expect</span>
            <h2 className="font-display font-bold text-3xl tracking-tight mb-3">Client <span className="text-acm-blue-b italic">Expectations</span></h2>
            <p className="text-acm-muted max-w-xl leading-relaxed">
              These aren't barriers — they're the conditions that make partnerships work well for everyone.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-acm-border border border-acm-border rounded overflow-hidden">
            {expectations.map((e, i) => (
              <motion.div key={e.num} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                className="bg-acm-dark p-6 hover:bg-acm-surface transition-colors"
              >
                <span className="font-mono text-xs text-acm-blue-b block mb-3">{e.num}</span>
                <h3 className="font-display font-semibold text-sm mb-2">{e.title}</h3>
                <p className="text-xs text-acm-muted leading-relaxed">{e.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GOOD FIT ── */}
      <section className="px-6 lg:px-16 py-20 border-t border-acm-border">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <span className="font-mono text-xs tracking-widest uppercase text-acm-faint block mb-4">The right partnership</span>
            <h2 className="font-display font-bold text-3xl tracking-tight mb-6">What Makes a <span className="text-acm-blue-b">Good Fit</span></h2>
            <p className="text-acm-muted leading-relaxed mb-4">
              We prioritize partnerships that are well-defined, high-impact, and grounded in meaningful work. We collaborate with organizations genuinely invested in their problem space.
            </p>
            <p className="text-acm-muted leading-relaxed">
              By combining autonomy with structured collaboration, we aim to create partnerships that are efficient and mutually valuable — resulting in high-quality deliverables and meaningful long-term impact.
            </p>
          </motion.div>
          <motion.div custom={1} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="space-y-2">
            {goodFit.map((item, i) => (
              <div key={i} className={`flex items-start gap-3 p-4 border ${item.good ? "border-acm-blue/20 bg-acm-blue/5" : "border-white/5 bg-white/[0.02]"}`}>
                <span className={`flex-shrink-0 mt-0.5 font-mono text-sm ${item.good ? "text-acm-blue-b" : "text-acm-faint"}`}>{item.good ? "✓" : "✕"}</span>
                <span className={`text-sm leading-relaxed ${item.good ? "text-acm-text" : "text-acm-faint"}`}>{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 lg:px-16 py-20 bg-acm-navy border-t border-acm-border text-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="max-w-xl mx-auto">
          <span className="font-mono text-xs tracking-widest uppercase text-acm-faint block mb-4">Next steps</span>
          <h2 className="font-display font-bold text-3xl tracking-tight mb-5">Ready to Get Started?</h2>
          <p className="text-acm-muted leading-relaxed mb-10">
            Reach out with a brief overview of your organization and potential project ideas. We'll explore whether there's a strong mutual fit for collaboration.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="mailto:nubostonacm@gmail.com" className="font-mono text-xs tracking-widest uppercase bg-acm-blue text-white px-8 py-3 rounded-sm hover:bg-acm-blue-b transition-all duration-200 hover:-translate-y-0.5">
              Email Us
            </a>
            <a href="https://www.linkedin.com/company/neu-acm" target="_blank" rel="noopener noreferrer" className="font-mono text-xs tracking-widest uppercase border border-acm-blue text-acm-blue-b px-8 py-3 rounded-sm hover:bg-acm-blue hover:text-white transition-all duration-200">
              LinkedIn
            </a>
          </div>
          <p className="font-mono text-xs text-acm-faint mt-6">nubostonacm@gmail.com</p>
        </motion.div>
      </section>
    </div>
  );
}
