"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay: i * 0.08 },
  }),
};

const phases = [
  {
    num: "01",
    title: "Scoping & Planning",
    desc: "Teams align with startup partners on goals and define a semester-long milestone roadmap.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Design & Architecture",
    desc: "Engineers and designers define the tech stack, UI direction, and data model.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Implementation",
    desc: "Structured sprints with weekly check-ins and milestone reviews throughout the semester.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Delivery & Showcase",
    desc: "Final deliverables presented at ACM showcases, then fully handed off to the startup.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
];

// ── ROLES ────────────────────────────────────────────────────
const teamRoles = [
  {
    title: "Tech Lead",
    commitment: "8–10 hrs / week",
    desc: "Steer the technical direction of your team and work closely with both engineers and designers to execute the project.",
    responsibilities: [
      "Lead weekly team meetings to discuss development progress and feedback.",
      "Create, assign, and review code to ensure quality and consistency.",
      "Integrate the client's tech stack, guide resource usage, and ensure smooth team collaboration.",
      "Meet one-on-one with the client to gather feedback and ensure expectations are met.",
      "Present project progress at mid-semester and final showcases.",
      "Collaborate with the Design Lead to ensure seamless integration between tech and design.",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
      </svg>
    ),
  },
  {
    title: "Design Lead",
    commitment: "8–10 hrs / week",
    desc: "Take charge of the user experience and visual design, guiding your team in creating compelling, user-centered interfaces.",
    responsibilities: [
      "Lead weekly team meetings to discuss design progress and feedback.",
      "Create, assign, and develop high-fidelity wireframes and UI designs.",
      "Meet one-on-one with the client to refine design concepts.",
      "Integrate the client's design tools, guide design resource usage, and ensure smooth team collaboration.",
      "Present project progress at mid-semester and final showcases.",
      "Collaborate with the Tech Lead to ensure seamless integration between tech and design.",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    title: "Software Engineer",
    commitment: "8–10 hrs / week",
    desc: "Build and refine the technical aspects of the project, collaborating with your team to deliver a functional solution.",
    responsibilities: [
      "Participate in weekly team meetings to discuss progress, challenges, and solutions.",
      "Work on development tasks, adding features and fixing bugs as needed.",
      "Collaborate closely with the Design Lead and Designers to ensure design consistency and feasibility.",
      "Write clear, efficient code, and assist with testing to ensure the product is stable and performs well.",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    title: "Software Designer",
    commitment: "8–10 hrs / week",
    desc: "Turn the client's vision into an intuitive, visually appealing design that enhances the user experience.",
    responsibilities: [
      "Join weekly meetings to provide updates and collaborate on design progress.",
      "Assist in creating wireframes, mockups, and prototypes based on the project's goals.",
      "Collaborate closely with the Tech Lead and Engineers to ensure design consistency and feasibility.",
      "Review and iterate on designs, incorporating feedback from the team and client to refine the final product.",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
];

const benefits = [
  { label: "Semester-long timeline",            desc: "Projects are scoped to be deliverable in one semester." },
  { label: "Decoupled from startup engineering", desc: "Teams operate independently — no daily standups with internal teams." },
  { label: "Cross-functional ownership",         desc: "Engineers and designers co-own the full product lifecycle." },
  { label: "Milestone-driven",                   desc: "Structured check-ins keep momentum and accountability high." },
  { label: "Real deliverables",                  desc: "Functional software, not mock-ups or presentations." },
  { label: "Potential for continuation",         desc: "Strong projects may continue in subsequent semesters." },
];

export default function SoftwarePage() {
  const [activeRole, setActiveRole] = useState<number | null>(null);

  return (
    <div className="bg-acm-black min-h-screen">

      {/* ── HERO ── */}
      <section className="relative min-h-[60vh] flex flex-col justify-center px-6 lg:px-16 pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="absolute pointer-events-none" style={{ width: 700, height: 500, background: "radial-gradient(ellipse, rgba(0,85,165,0.2) 0%, transparent 70%)", top: -100, left: -100, borderRadius: "50%" }} />
        <div className="relative max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-acm-blue-sky" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-acm-blue-sky">03 / Software</span>
          </div>
          <h1 className="font-display font-extrabold tracking-tight leading-tight mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            Software <span className="text-stroke italic">Division</span>
          </h1>
          <p className="text-acm-muted text-lg leading-relaxed max-w-2xl mb-8">
            We partner with rising technology-focused startups to design and deliver impactful software solutions over the course of a semester. Independent teams. Real products. Structured execution.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/clients" className="font-mono text-xs tracking-widest uppercase border border-acm-blue-mid text-acm-blue-sky px-6 py-3 rounded-sm hover:bg-acm-blue-mid hover:text-white transition-all duration-200">
              Client Info →
            </Link>
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="px-6 lg:px-16 py-20 border-t border-acm-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-acm-border border border-acm-border rounded overflow-hidden">
            {[
              {
                title: "Our Mission",
                desc: "Deliver thoughtfully designed solutions while offering startups a reliable and well-organized development experience.",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                ),
              },
              {
                title: "How We Work",
                desc: "Teams operate as independent, cross-functional units — engineers and designers who own the full product development lifecycle.",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                ),
              },
              {
                title: "What We Build",
                desc: "Functional software built within a defined semester timeline, with the potential for continued development after delivery.",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <motion.div key={item.title} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                className="bg-acm-dark p-8 hover:bg-acm-surface transition-colors group"
              >
                <span className="text-acm-blue-sky opacity-70 group-hover:opacity-100 transition-opacity block mb-4">{item.icon}</span>
                <h3 className="font-display font-bold text-lg mb-2 group-hover:text-acm-blue-sky transition-colors">{item.title}</h3>
                <p className="text-sm text-acm-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIFECYCLE ── */}
      <section className="px-6 lg:px-16 py-20 bg-acm-navy border-t border-acm-border">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-14">
            <span className="font-mono text-xs tracking-widest uppercase text-acm-faint block mb-3">How it works</span>
            <h2 className="font-display font-bold text-3xl tracking-tight">Project <span className="text-acm-blue-sky italic">Lifecycle</span></h2>
          </motion.div>
          <div className="relative">
            <div className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-acm-border" />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {phases.map((phase, i) => (
                <motion.div key={phase.num} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
                  <div className="w-10 h-10 border border-acm-blue-mid bg-acm-surface flex items-center justify-center text-acm-blue-sky mb-4">
                    {phase.icon}
                  </div>
                  <span className="font-mono text-xs text-acm-blue-sky block mb-1">{phase.num}</span>
                  <h3 className="font-display font-bold text-base mb-2">{phase.title}</h3>
                  <p className="text-sm text-acm-muted leading-relaxed">{phase.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ROLES & RESPONSIBILITIES ── */}
      <section className="px-6 lg:px-16 py-20 border-t border-acm-border">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-4">
            <span className="font-mono text-xs tracking-widest uppercase text-acm-faint block mb-3">Team composition</span>
            <h2 className="font-display font-bold text-3xl tracking-tight mb-2">
              Roles &amp; <span className="text-acm-blue-sky italic">Responsibilities</span>
            </h2>
            <p className="text-acm-muted text-sm mb-10">Select a role to see what it involves.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-acm-border border border-acm-border rounded overflow-hidden">
            {/* Left column — role selector tabs */}
            <div className="bg-acm-black">
              {teamRoles.map((role, i) => (
                <motion.button
                  key={role.title}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  onClick={() => setActiveRole(activeRole === i ? null : i)}
                  className={`w-full text-left flex items-start gap-4 px-6 py-5 border-b border-acm-border transition-all duration-200 group relative
                    ${activeRole === i
                      ? "bg-acm-surface"
                      : "hover:bg-acm-surface/60"
                    }`}
                >
                  {/* Active indicator bar */}
                  <span className={`absolute left-0 top-0 bottom-0 w-0.5 bg-acm-blue-sky transition-opacity duration-200 ${activeRole === i ? "opacity-100" : "opacity-0"}`} />

                  {/* Icon */}
                  <span className={`flex-shrink-0 mt-0.5 transition-colors duration-200 ${activeRole === i ? "text-acm-blue-sky" : "text-acm-blue-sky/50 group-hover:text-acm-blue-sky/80"}`}>
                    {role.icon}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <h3 className={`font-display font-bold text-base transition-colors duration-200 ${activeRole === i ? "text-acm-blue-sky" : "text-acm-text group-hover:text-acm-blue-sky/80"}`}>
                        {role.title}
                      </h3>
                      <span className="font-mono text-[9px] tracking-widest uppercase text-acm-faint whitespace-nowrap flex-shrink-0">
                        {role.commitment}
                      </span>
                    </div>
                    <p className="text-sm text-acm-muted leading-relaxed">{role.desc}</p>
                  </div>

                  {/* Chevron */}
                  <span className={`flex-shrink-0 mt-1 text-acm-faint transition-transform duration-200 ${activeRole === i ? "rotate-90 text-acm-blue-sky" : ""}`}>
                    <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                      <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 011.06 0L8 8.94l2.72-2.72a.75.75 0 111.06 1.06l-3.25 3.25a.75.75 0 01-1.06 0L4.22 7.28a.75.75 0 010-1.06z" />
                    </svg>
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Right column — responsibilities panel */}
            <div className="bg-acm-dark border-l border-acm-border min-h-[300px] flex flex-col">
              <AnimatePresence mode="wait">
                {activeRole !== null ? (
                  <motion.div
                    key={activeRole}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="p-8 flex flex-col h-full"
                  >
                    {/* Role header */}
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-acm-blue-sky">{teamRoles[activeRole].icon}</span>
                      <h3 className="font-display font-bold text-xl text-acm-blue-sky">
                        {teamRoles[activeRole].title}
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] tracking-widest uppercase text-acm-faint mb-6">
                      {teamRoles[activeRole].commitment}
                    </span>

                    {/* Responsibilities */}
                    <span className="font-mono text-[10px] tracking-widest uppercase text-acm-faint block mb-4">
                      Responsibilities
                    </span>
                    <ul className="space-y-3 flex-1">
                      {teamRoles[activeRole].responsibilities.map((resp, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: j * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-acm-blue-sky flex-shrink-0 mt-1.5" />
                          <span className="text-sm text-acm-muted leading-relaxed">{resp}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col items-center justify-center p-8 text-center"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-10 h-10 text-acm-blue-sky/20 mb-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <p className="font-mono text-xs tracking-widest uppercase text-acm-faint">
                      Select a role to view responsibilities
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT MAKES IT WORK ── */}
      <section className="px-6 lg:px-16 py-20 bg-acm-navy border-t border-acm-border">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-12">
            <span className="font-mono text-xs tracking-widest uppercase text-acm-faint block mb-3">The model</span>
            <h2 className="font-display font-bold text-3xl tracking-tight">What Makes This <span className="text-acm-blue-sky italic">Work</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-acm-border border border-acm-border rounded overflow-hidden">
            {benefits.map((b, i) => (
              <motion.div key={b.label} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                className="bg-acm-black p-6 hover:bg-acm-surface transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-acm-blue-sky flex-shrink-0 mt-2" />
                  <div>
                    <h3 className="font-display font-semibold text-sm mb-1 group-hover:text-acm-blue-sky transition-colors">{b.label}</h3>
                    <p className="text-xs text-acm-muted leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 lg:px-16 py-20 border-t border-acm-border text-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="max-w-xl mx-auto">
          <h2 className="font-display font-bold text-3xl tracking-tight mb-4">Interested in working with our teams?</h2>
          <p className="text-acm-muted mb-8 leading-relaxed">Read about what we look for in a client partnership and how to get started.</p>
          <Link href="/clients" className="font-mono text-xs tracking-widest uppercase bg-acm-blue-mid text-white px-8 py-3 rounded-sm hover:bg-acm-blue transition-all duration-200 hover:-translate-y-0.5 inline-block">
            Client Information →
          </Link>
        </motion.div>
      </section>
    </div>
  );
}