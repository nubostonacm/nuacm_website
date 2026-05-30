"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const baseInput =
  "w-full bg-acm-surface border border-acm-border text-acm-text placeholder-acm-faint px-4 py-3 rounded-sm font-sans text-sm focus:outline-none focus:border-acm-blue transition-colors duration-200";

const yearOptions = [
  "First Year",
  "Second Year",
  "Third Year",
  "Fourth Year",
  "Fifth Year",
  "Graduate Student",
];

export default function JoinPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "");
    formData.append("subject", "ACM @ Northeastern — Interest Form");

    try {
      const res  = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Submission failed. Please try again.");
        setStatus("idle");
        return;
      }
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("idle");
    }
  }

  return (
    <div className="bg-acm-black min-h-screen">

      {/* ── HERO ── */}
      <section className="relative flex flex-col justify-center px-6 lg:px-16 pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div
          className="absolute pointer-events-none"
          style={{ width: 500, height: 360, background: "radial-gradient(ellipse, rgba(0,85,165,0.2) 0%, transparent 70%)", top: -80, right: -80, borderRadius: "50%" }}
        />
        <div className="relative max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="h-px w-8 bg-acm-blue-sky" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-acm-blue-sky">Membership</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.15 }}
            className="font-display font-extrabold tracking-tight leading-tight mb-5"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            Join <span className="text-stroke italic">ACM</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-acm-muted text-base leading-relaxed max-w-xl"
          >
            Interested in becoming part of ACM @ Northeastern? Fill out the form below and we'll be in touch with next steps.
          </motion.p>
        </div>
      </section>

      {/* ── FORM ── */}
      <section className="px-6 lg:px-16 pb-24">
        <div className="max-w-2xl">

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="border border-emerald-500/30 bg-emerald-500/8 p-12 text-center rounded-sm"
            >
              <div className="w-12 h-12 border border-emerald-500/40 flex items-center justify-center mx-auto mb-5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6 text-emerald-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h2 className="font-display font-bold text-2xl mb-3">We got your info!</h2>
              <p className="text-acm-muted text-sm leading-relaxed mb-6">
                Thanks for your interest in ACM @ Northeastern. We'll follow up via email soon.
              </p>
              <Link
                href="/"
                className="font-mono text-xs tracking-widest uppercase bg-acm-blue-mid text-white px-6 py-3 rounded-sm hover:bg-acm-blue transition-all duration-200 inline-block"
              >
                Back to Home
              </Link>
            </motion.div>

          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* First + Last name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[10px] tracking-widest uppercase text-acm-faint block mb-1.5">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    required
                    className={baseInput}
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] tracking-widest uppercase text-acm-faint block mb-1.5">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    required
                    className={baseInput}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="font-mono text-[10px] tracking-widest uppercase text-acm-faint block mb-1.5">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                  className={baseInput}
                />
              </div>

              {/* Major */}
              <div>
                <label className="font-mono text-[10px] tracking-widest uppercase text-acm-faint block mb-1.5">
                  Major *
                </label>
                <input
                  type="text"
                  name="major"
                  placeholder="e.g. Computer Science"
                  required
                  className={baseInput}
                />
              </div>

              {/* Year */}
              <div>
                <label className="font-mono text-[10px] tracking-widest uppercase text-acm-faint block mb-1.5">
                  Year *
                </label>
                <select name="year" required defaultValue="" className={baseInput}>
                  <option value="" disabled>Select your year</option>
                  {yearOptions.map((y) => (
                    <option key={y} value={y} className="bg-acm-dark">{y}</option>
                  ))}
                </select>
              </div>

              {error && (
                <div className="border border-red-400/40 bg-red-500/10 text-red-300 text-sm px-4 py-3 rounded-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full font-mono text-xs tracking-widest uppercase bg-acm-blue-mid text-white py-4 rounded-sm hover:bg-acm-blue transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Submitting…" : "Submit →"}
              </button>
            </motion.form>
          )}
        </div>
      </section>
    </div>
  );
}
