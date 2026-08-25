"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay: i * 0.08 },
  }),
};

const clients = [
  {
    name: "Leasestack",
    tagline: "AI-powered marketing intelligence for real estate operators",
    description:
      "Leasestack is a managed marketing platform for real estate operators that centralizes AppFolio, Google Ads, Meta Ads, and GA4 into a single AI-briefed dashboard — helping leasing managers at small to mid-size firms understand what's actually driving lease signings.",
    industry: "Real Estate / PropTech",
    website: "",
    plannedWork:
      "ACM is building Leasestack's end-to-end product from the ground up — full-stack deployment on Vercel and Neon, API integrations with AppFolio, Google Ads, Meta Ads, and GA4, and an AI-briefed dashboard interface that surfaces actionable insights for leasing managers.",
    contact: "Leasestack CEO",
    logo: "/companies/leasestack.png",
    engineerSkills: ["End-to-end product dev with Claude Code, Vercel, and Neon", "Full-stack deployment", "API integration"],
    designerSkills: ["Strong UI/UX", "Intuitive mobile interfaces", "Product architecture", "Collaboration with engineers"],
    links: [],
  },
  {
    name: "Cursive",
    tagline: "B2B SaaS data infrastructure for website visitor intelligence",
    description:
      "Cursive is a B2B SaaS data infrastructure company that analyzes clients' websites and enriches visitors with intent scores, business emails, page view history, and behavioral data — solving the core problem of B2B companies lacking visibility into who is actually visiting their site.",
    industry: "B2B SaaS / Data Infrastructure",
    website: "",
    plannedWork:
      "ACM is building core product infrastructure for Cursive — full-stack deployment on Vercel and Neon, API integrations for visitor enrichment pipelines, and dashboard interfaces that surface intent data and behavioral signals to B2B sales and marketing teams.",
    contact: "Cursive CEO",
    logo: "/companies/cursive.png",
    engineerSkills: ["End-to-end product dev with Claude Code, Vercel, and Neon", "Full-stack deployment", "API integration"],
    designerSkills: ["Strong UI/UX", "Intuitive mobile interfaces", "Product architecture", "Collaboration with engineers"],
    links: [],
  },
  {
    name: "Team IMPACT",
    tagline: "Connecting 200,000+ student-athletes for networking and mentorship",
    description:
      "Team IMPACT is building a community platform connecting their 200,000+ current and former student-athletes with each other and corporate partners for networking, mentorship, and recruiting — serving as a long-term community hub while supporting sponsor engagement.",
    industry: "Nonprofit / Community Platform",
    website: "https://www.teamimpact.org",
    plannedWork:
      "ACM is developing Team IMPACT's community platform — building profile pages, search and discovery interfaces, networking flows, and sponsor engagement tooling. The platform needs to scale to 200,000+ users with robust auth, access control, and potential AI/data features.",
    contact: "Krissie Kelleher, CEO",
    logo: "/companies/team-impact.png",
    engineerSkills: ["React / React Native", "Node.js", "Python / Django", "PostgreSQL", "REST APIs", "AWS / GCP / Azure", "Auth, access control, or AI/data tooling a plus"],
    designerSkills: ["Figma", "Mobile-first design", "Component systems", "Dashboards, profile pages, or search interfaces a plus"],
    links: [
      { label: "Website",   url: "https://www.teamimpact.org" },
      { label: "Instagram", url: "https://www.instagram.com/goteamimpact" },
      { label: "LinkedIn",  url: "https://www.linkedin.com/company/team-impact-inc-" },
    ],
  },
  {
    name: "Skipit",
    tagline: "Real-time trigger warnings for any screen, no browser extension needed",
    description:
      "Skipit is a mobile companion app that listens to media audio, identifies the content being played, and instantly displays trigger categories, severity levels, and brief non-spoiler summaries — enabling users to access trigger data on TVs, tablets, and shared setups without a browser extension.",
    industry: "Consumer Mobile / Accessibility",
    website: "https://skipit.cc",
    plannedWork:
      "ACM is building Skipit's mobile app — audio identification and content matching, a real-time trigger display interface with severity levels and summaries, and a component-based design system that meets WCAG accessibility standards across devices.",
    contact: "Skipit CEO",
    logo: "/companies/skipit.png",
    engineerSkills: ["React Native or Flutter", "TypeScript", "Firebase / Firestore", "REST API integration", "Mobile development"],
    designerSkills: ["Figma", "Mobile UI/UX", "Component-based design systems", "WCAG accessibility standards"],
    links: [
      { label: "Website",  url: "https://www.skipit.tech/index.html" }
    ],
  },
];

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

const goodFit = [
  { good: true,  text: "A startup building a specific, scoped technical product or feature" },
  { good: true,  text: "A project that can realistically ship in one semester" },
  { good: true,  text: "A team invested in weekly check-ins and collaboration" },
  { good: true,  text: "Work that doesn't require deep internal codebase access" },
  { good: false, text: "Vague R&D exploration without clear deliverables" },
  { good: false, text: "Projects requiring daily integration with your engineers" },
  { good: false, text: "Startups that need immediate output without structured onboarding" },
];

export default function ClientsPage() {
  return (
    <div className="bg-acm-black min-h-screen">

      {/* ── HERO ── */}
      <section className="relative min-h-[58vh] flex flex-col justify-center px-6 lg:px-16 pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="absolute pointer-events-none" style={{ width: 600, height: 400, background: "radial-gradient(ellipse, rgba(0,85,165,0.2) 0%, transparent 70%)", top: -60, right: -100, borderRadius: "50%" }} />
        <div className="relative max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-acm-blue-sky" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-acm-blue-sky">04 / Clients</span>
          </div>
          <h1 className="font-display font-extrabold tracking-tight leading-tight mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            Partner With <span className="text-stroke italic">Us</span>
          </h1>
          <p className="text-acm-muted text-lg leading-relaxed max-w-2xl">
            ACM @ Northeastern partners with rising technology-focused startups to provide dedicated development teams that deliver real, functional software within a semester.
          </p>
        </div>
      </section>

      {/* ── CURRENT CLIENTS ── */}
      <section className="px-6 lg:px-16 py-20 border-t border-acm-border">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-12">
            <span className="font-mono text-xs tracking-widest uppercase text-acm-faint block mb-3">Current semester</span>
            <h2 className="font-display font-bold text-3xl tracking-tight">
              Our <span className="text-acm-blue-sky italic">Clients</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {clients.map((client, i) => (
              <motion.div
                key={client.name}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="border border-acm-border bg-acm-dark rounded-sm overflow-hidden hover:border-acm-border-b transition-colors duration-200"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-acm-border">

                  {/* Left — company info */}
                  <div className="bg-acm-dark p-8 lg:col-span-1">
                    {/* Logo box */}
                    <div className="w-16 h-16 border border-acm-border bg-acm-surface rounded-sm mb-5 overflow-hidden relative">
                      {/* Initials — shown until image loads */}
                      <div
                        id={`client-initials-${i}`}
                        className="absolute inset-0 flex items-center justify-center font-display font-bold text-lg text-acm-blue-sky select-none z-0"
                      >
                        {client.name.slice(0, 2).toUpperCase()}
                      </div>
                      {/* Logo — starts hidden, fades in on load */}
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="absolute inset-0 w-full h-full object-contain p-2 opacity-0 transition-opacity duration-200 z-10"
                        onLoad={(e) => {
                          (e.currentTarget as HTMLImageElement).style.opacity = "1";
                          const initials = document.getElementById(`client-initials-${i}`);
                          if (initials) initials.style.display = "none";
                        }}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                    <span className="font-mono text-[10px] tracking-widest uppercase text-acm-blue-sky bg-acm-blue-sky/10 px-2 py-1 rounded-sm inline-block mb-3">
                      {client.industry}
                    </span>
                    <h3 className="font-display font-bold text-xl mb-1">{client.name}</h3>
                    <p className="text-sm text-acm-faint mb-4 italic">{client.tagline}</p>
                    <p className="text-sm text-acm-muted leading-relaxed mb-5">{client.description}</p>

                    {client.links.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {client.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-[10px] tracking-widest uppercase border border-acm-border text-acm-faint px-3 py-1.5 rounded-sm hover:border-acm-blue-sky hover:text-acm-blue-sky transition-all duration-200 flex items-center gap-1.5"
                          >
                            {link.label}
                            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-2.5 h-2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 9.75L9.75 2.25M9.75 2.25H5.25M9.75 2.25v4.5" />
                            </svg>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right — project info */}
                  <div className="bg-acm-black p-8 lg:col-span-2 flex flex-col gap-6">

                    {/* What we're building */}
                    <div>
                      <span className="font-mono text-[10px] tracking-widest uppercase text-acm-faint block mb-3">What we're building</span>
                      <p className="text-acm-muted leading-relaxed text-sm">{client.plannedWork}</p>
                    </div>

                    {/* Skills needed */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Engineer */}
                      <div className="border border-acm-border bg-acm-surface/40 p-4 rounded-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-acm-blue-sky flex-shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                          </svg>
                          <span className="font-mono text-[10px] tracking-widest uppercase text-acm-blue-sky">Engineer Skills</span>
                        </div>
                        <ul className="space-y-1.5">
                          {client.engineerSkills.map((s) => (
                            <li key={s} className="flex items-start gap-2 text-xs text-acm-muted leading-relaxed">
                              <span className="w-1 h-1 rounded-full bg-acm-blue-sky flex-shrink-0 mt-1.5" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Designer */}
                      <div className="border border-acm-border bg-acm-surface/40 p-4 rounded-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-acm-blue-sky flex-shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                          </svg>
                          <span className="font-mono text-[10px] tracking-widest uppercase text-acm-blue-sky">Designer Skills</span>
                        </div>
                        <ul className="space-y-1.5">
                          {client.designerSkills.map((s) => (
                            <li key={s} className="flex items-start gap-2 text-xs text-acm-muted leading-relaxed">
                              <span className="w-1 h-1 rounded-full bg-acm-blue-sky flex-shrink-0 mt-1.5" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Point of contact */}
                    <div className="border-t border-acm-border pt-5 flex items-center gap-3 mt-auto">
                      <div className="w-8 h-8 border border-acm-border bg-acm-surface rounded-sm flex items-center justify-center flex-shrink-0">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-acm-blue-sky">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] tracking-widest uppercase text-acm-faint mb-0.5">Point of Contact</p>
                        <p className="text-sm text-acm-text font-display font-semibold">{client.contact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENT BENEFITS ── */}
      <section className="px-6 lg:px-16 py-20 border-t border-acm-border">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-12">
            <span className="font-mono text-xs tracking-widest uppercase text-acm-faint block mb-3">What you get</span>
            <h2 className="font-display font-bold text-3xl tracking-tight">
              Client <span className="text-acm-blue-sky italic">Benefits</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-acm-border border border-acm-border rounded overflow-hidden">
            {benefits.map((b, i) => (
              <motion.div key={b.title} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                className="bg-acm-black p-8 hover:bg-acm-surface transition-colors group"
              >
                <span className="text-acm-blue-sky opacity-60 group-hover:opacity-100 transition-opacity block mb-4">{b.icon}</span>
                <h3 className="font-display font-semibold text-base mb-2 group-hover:text-acm-blue-sky transition-colors">{b.title}</h3>
                <p className="text-sm text-acm-muted leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GOOD FIT ── */}
      <section className="px-6 lg:px-16 py-20 bg-acm-navy border-t border-acm-border">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <span className="font-mono text-xs tracking-widest uppercase text-acm-faint block mb-4">The right partnership</span>
            <h2 className="font-display font-bold text-3xl tracking-tight mb-6">
              What Makes a <span className="text-acm-blue-sky">Good Fit</span>
            </h2>
            <p className="text-acm-muted leading-relaxed mb-4">
              We prioritize partnerships that are well-defined, high-impact, and grounded in meaningful work. We collaborate with organizations genuinely invested in their problem space and seeking an external perspective.
            </p>
            <p className="text-acm-muted leading-relaxed">
              By combining autonomy with structured collaboration, we aim to create partnerships that are efficient and mutually valuable — resulting in high-quality deliverables and meaningful long-term impact.
            </p>
          </motion.div>
          <motion.div custom={1} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="space-y-2">
            {goodFit.map((item, i) => (
              <div key={i} className={`flex items-start gap-3 p-4 border ${item.good ? "border-acm-blue-sky/20 bg-acm-blue-sky/4" : "border-white/5 bg-white/[0.02]"}`}>
                <span className={`flex-shrink-0 mt-0.5 font-mono text-sm ${item.good ? "text-acm-blue-sky" : "text-acm-faint"}`}>{item.good ? "✓" : "✕"}</span>
                <span className={`text-sm leading-relaxed ${item.good ? "text-acm-text" : "text-acm-faint"}`}>{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 lg:px-16 py-20 border-t border-acm-border text-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="max-w-xl mx-auto">
          <span className="font-mono text-xs tracking-widest uppercase text-acm-faint block mb-4">Next steps</span>
          <h2 className="font-display font-bold text-3xl tracking-tight mb-5">Ready to Get Started?</h2>
          <p className="text-acm-muted leading-relaxed mb-10">
            Reach out with a brief overview of your organization and potential project ideas. We'll explore whether there's a strong mutual fit for collaboration.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="mailto:nubostonacm@gmail.com" className="font-mono text-xs tracking-widest uppercase bg-acm-blue-mid text-white px-8 py-3 rounded-sm hover:bg-acm-blue transition-all duration-200 hover:-translate-y-0.5">
              Email Us
            </a>
            <a href="https://www.linkedin.com/company/neu-acm" target="_blank" rel="noopener noreferrer" className="font-mono text-xs tracking-widest uppercase border border-acm-blue-mid text-acm-blue-sky px-8 py-3 rounded-sm hover:bg-acm-blue-mid hover:text-white transition-all duration-200">
              LinkedIn
            </a>
          </div>
          <p className="font-mono text-xs text-acm-faint mt-6">nubostonacm@gmail.com</p>
        </motion.div>
      </section>
    </div>
  );
}