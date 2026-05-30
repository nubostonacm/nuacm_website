"use client";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const, delay: i * 0.1 },
  }),
};

const contacts = [
  {
    label: "Email",
    value: "nubostonacm@gmail.com",
    href: "mailto:nubostonacm@gmail.com",
    desc: "Best for client inquiries, partnership discussions, or general questions.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "neu-acm",
    href: "https://www.linkedin.com/company/neu-acm",
    desc: "Follow us for updates, event announcements, and professional networking.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    value: "@northeasternacm",
    href: "https://www.instagram.com/northeasternacm/",
    desc: "Behind-the-scenes, event photos, and community highlights.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "Discord",
    value: "Join our server",
    href: "https://discord.gg/BU6yggFGFE",
    desc: "Our active community hub for announcements, resources, and discussion.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <div className="bg-acm-black min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex flex-col justify-center px-6 lg:px-16 pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div
          className="absolute pointer-events-none"
          style={{
            width: 500, height: 400,
            background: "radial-gradient(ellipse, rgba(26,111,207,0.15) 0%, transparent 70%)",
            top: -80, right: -80, borderRadius: "50%",
          }}
        />
        <div className="relative max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="h-px w-8 bg-acm-blue-b" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-acm-blue-b">05 / Contact</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="font-display font-extrabold tracking-tight leading-tight mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Get in <span className="text-stroke italic">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-acm-muted text-lg leading-relaxed max-w-2xl"
          >
            Whether you're a startup looking to partner, a student wanting to get involved,
            or just curious about what we do — we'd love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="px-6 lg:px-16 py-20 border-t border-acm-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-acm-border border border-acm-border rounded overflow-hidden">
            {contacts.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("mailto") ? undefined : "_blank"}
                rel={c.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-acm-black p-10 hover:bg-acm-surface transition-colors group relative overflow-hidden flex flex-col"
              >
                <span className="absolute bottom-0 left-0 h-px w-0 bg-acm-blue-b group-hover:w-full transition-all duration-300" />

                <span className="text-acm-blue-b mb-5 opacity-60 group-hover:opacity-100 transition-opacity">
                  {c.icon}
                </span>

                <span className="font-mono text-xs tracking-widest uppercase text-acm-faint mb-1">
                  {c.label}
                </span>
                <h3 className="font-display font-bold text-xl mb-2 group-hover:text-acm-blue-b transition-colors">
                  {c.value}
                </h3>
                <p className="text-sm text-acm-muted leading-relaxed">{c.desc}</p>

                <span className="mt-auto pt-6 font-mono text-xs tracking-widest uppercase text-acm-blue-b opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  Open <span>→</span>
                </span>
              </motion.a>
            ))}
          </div>
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
