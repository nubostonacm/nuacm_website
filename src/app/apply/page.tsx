"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const baseInput =
  "w-full bg-acm-surface border border-acm-border text-acm-text placeholder-acm-faint px-4 py-3 rounded-sm font-sans text-sm focus:outline-none focus:border-acm-blue-sky transition-colors duration-200";

const roleOptions = [
  "Software Engineer",
  "Software Designer",
  "Tech Lead",
  "Design Lead",
];

const yearOptions = [
  "First Year",
  "Second Year",
  "Third Year",
  "Fourth Year",
  "Fifth Year",
  "Graduate Student",
];

const hearOptions = [
  "Instagram",
  "LinkedIn",
  "Referral",
  "Word of mouth",
  "Past ACM events",
  "Other",
];

// Section header component
function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-acm-border">
      <span className="font-mono text-xs text-acm-blue-sky">{num}</span>
      <h2 className="font-display font-bold text-lg text-acm-text">{title}</h2>
    </div>
  );
}

// Field wrapper
function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="font-mono text-[10px] tracking-widest uppercase text-acm-faint block mb-1.5">
        {label} {required && <span className="text-acm-blue-sky">*</span>}
      </label>
      {hint && <p className="text-xs text-acm-faint mb-2 leading-relaxed">{hint}</p>}
      {children}
    </div>
  );
}

function WordLimitTextarea({
  name,
  placeholder,
  required,
  rows = 4,
  limit = 250,
}: {
  name: string;
  placeholder: string;
  required?: boolean;
  rows?: number;
  limit?: number;
}) {
  const [count, setCount] = useState(0);
  return (
    <div className="relative">
      <textarea
        name={name}
        placeholder={placeholder}
        required={required}
        rows={rows}
        maxLength={limit * 7} // rough char limit
        onChange={(e) => {
          const words = e.target.value.trim().split(/\s+/).filter(Boolean).length;
          setCount(words);
        }}
        className={baseInput + " resize-none"}
      />
      <span
        className={`absolute bottom-2 right-3 font-mono text-[9px] tracking-wide ${
          count > limit ? "text-red-400" : "text-acm-faint"
        }`}
      >
        {count} / {limit} words
      </span>
    </div>
  );
}

export default function ApplyPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [isLead, setIsLead] = useState(false);
  const [agreed, setAgreed] = useState(false);

  function toggleRole(role: string) {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
    const leadRoles = ["Tech Lead", "Design Lead"];
    const newRoles = selectedRoles.includes(role)
      ? selectedRoles.filter((r) => r !== role)
      : [...selectedRoles, role];
    setIsLead(newRoles.some((r) => leadRoles.includes(r)));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agreed) {
      setError("Please read and agree to the disclosure before submitting.");
      return;
    }
    setStatus("loading");
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", process.env.NEXT_PUBLIC_APPLY_WEB3FORMS_KEY ?? "");
    formData.append("subject", "ACM @ Northeastern — Software Team Application");
    formData.append("roles", selectedRoles.join(", "));

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Submission failed. Please try again.");
        setStatus("idle");
        return;
      }
      setStatus("success");
      (e.target as HTMLFormElement).reset();
      setSelectedRoles([]);
      setIsLead(false);
      setAgreed(false);
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
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-acm-blue-sky" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-acm-blue-sky">
              Software Division
            </span>
          </div>
          <h1
            className="font-display font-extrabold tracking-tight leading-tight mb-5"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            Software Team <span className="text-stroke italic">Application</span>
          </h1>
          <p className="text-acm-muted text-base leading-relaxed max-w-xl">
            Apply to join a cross-functional team building real software for a startup this semester. Engineers and designers welcome. All text responses have a 250-word limit.
          </p>
        </div>
      </section>

      {/* ── FORM ── */}
      <section className="px-6 lg:px-16 pb-24">
        <div className="max-w-2xl">

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="border border-emerald-500/30 bg-emerald-500/8 p-12 text-center rounded-sm"
            >
              <div className="w-12 h-12 border border-emerald-500/40 flex items-center justify-center mx-auto mb-5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6 text-emerald-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h2 className="font-display font-bold text-2xl mb-3">Application Received</h2>
              <p className="text-acm-muted text-sm leading-relaxed mb-6">
                We'll be in touch via email once applications are reviewed.
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-10"
            >

              {/* ── 01 PERSONAL INFORMATION ── */}
              <div className="border border-acm-border bg-acm-dark p-6 rounded-sm space-y-5">
                <SectionHeader num="01" title="Personal Information" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="First Name" required>
                    <input type="text" name="firstName" placeholder="First Name" required className={baseInput} />
                  </Field>
                  <Field label="Last Name" required>
                    <input type="text" name="lastName" placeholder="Last Name" required className={baseInput} />
                  </Field>
                </div>

                <Field label="Pronouns">
                  <input type="text" name="pronouns" placeholder="e.g. she/her, he/him, they/them" className={baseInput} />
                </Field>

                <Field label="School Email" required>
                  <input type="email" name="email" placeholder="yourname@northeastern.edu" required className={baseInput} />
                </Field>

                <Field label="College" required hint='e.g. Khoury College of Computer Sciences'>
                  <input type="text" name="college" placeholder="Khoury" required className={baseInput} />
                </Field>

                <Field label="Major(s) / Minor(s)" required>
                  <input type="text" name="major" placeholder="e.g. Computer Science, minor in Design" required className={baseInput} />
                </Field>

                <Field label="Year of Study" required>
                  <select name="year" required defaultValue="" className={baseInput}>
                    <option value="" disabled>Select your year</option>
                    {yearOptions.map((y) => (
                      <option key={y} value={y} className="bg-acm-dark">{y}</option>
                    ))}
                  </select>
                </Field>
              </div>

              {/* ── 02 CREDENTIALS ── */}
              <div className="border border-acm-border bg-acm-dark p-6 rounded-sm space-y-5">
                <SectionHeader num="02" title="Credentials" />

                <Field
                  label="Resume URL"
                  required
                  hint="Tailor it to the role — this is not your co-op or internship resume."
                >
                  <input type="url" name="resume" placeholder="https://drive.google.com/..." required className={baseInput} />
                </Field>

                <Field label="Portfolio URL">
                  <input type="url" name="portfolio" placeholder="https://yourportfolio.com" className={baseInput} />
                </Field>

                <Field label="LinkedIn URL">
                  <input type="url" name="linkedin" placeholder="https://linkedin.com/in/yourname" className={baseInput} />
                </Field>

                <Field label="GitHub URL">
                  <input type="url" name="github" placeholder="https://github.com/yourname" className={baseInput} />
                </Field>

                <Field label="Any Other Links">
                  <input type="text" name="otherLinks" placeholder="Behance, Dribbble, personal site, etc." className={baseInput} />
                </Field>
              </div>

              {/* ── 03 LOGISTICS ── */}
              <div className="border border-acm-border bg-acm-dark p-6 rounded-sm space-y-5">
                <SectionHeader num="03" title="Logistics" />

                <Field label="Have you been part of ACM before?" hint="If yes, describe your involvement.">
                  <WordLimitTextarea
                    name="priorAcm"
                    placeholder="e.g. Attended events, was a member last semester..."
                  />
                </Field>

                <Field label="Relevant Courses" required hint="What courses have you taken or are about to take? Are you on co-op?">
                  <WordLimitTextarea
                    name="courses"
                    placeholder="e.g. CS3500 OOD, CS4550 Web Dev, on co-op Spring 2026..."
                    required
                  />
                </Field>

                <Field
                  label="Other Commitments"
                  required
                  hint="List current clubs, part-time jobs, extracurriculars, and estimated hours per week for each."
                >
                  <WordLimitTextarea
                    name="commitments"
                    placeholder="e.g. Club soccer (5 hrs/week), part-time barista (10 hrs/week)..."
                    required
                  />
                </Field>

                <Field label="How did you hear about us?" required>
                  <select name="hearAbout" required defaultValue="" className={baseInput}>
                    <option value="" disabled>Select one</option>
                    {hearOptions.map((o) => (
                      <option key={o} value={o} className="bg-acm-dark">{o}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Referral / Additional Detail">
                  <input type="text" name="hearAboutDetail" placeholder="If referral, who? If other, please specify." className={baseInput} />
                </Field>

                {/* Role selection — multi-select pill buttons */}
                <Field label="Role(s) Applying For" required>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {roleOptions.map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => toggleRole(role)}
                        className={`font-mono text-xs tracking-widest uppercase px-4 py-2 rounded-sm border transition-all duration-200 ${
                          selectedRoles.includes(role)
                            ? "bg-acm-blue-mid border-acm-blue-mid text-white"
                            : "bg-transparent border-acm-border text-acm-faint hover:border-acm-blue-sky hover:text-acm-blue-sky"
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                  {selectedRoles.length === 0 && (
                    <p className="font-mono text-[9px] text-acm-faint mt-2">Select at least one role.</p>
                  )}
                  {selectedRoles.length > 0 && (
                    <p className="font-mono text-[9px] text-acm-blue-sky mt-2">
                      Selected: {selectedRoles.join(", ")}
                    </p>
                  )}
                </Field>
              </div>

              {/* ── 04 STARTUP INTEREST ── */}
              <div className="border border-acm-border bg-acm-dark p-6 rounded-sm space-y-5">
                <SectionHeader num="04" title="Startup Interest" />

                <Field
                  label="Startup Preferences"
                  required
                  hint="Rank your top 3 startup choices. For each, include: the startup name, a brief description of their problem space, their tech stack, and why you're interested. Think NUWorks-style — concise and specific."
                >
                  <WordLimitTextarea
                    name="startupInterest"
                    placeholder={`1. Startup Name — Tech stack: React, Node.js. Interested because...\n2. Startup Name — Tech stack: Python, FastAPI. Interested because...\n3. Startup Name — ...`}
                    required
                    rows={6}
                  />
                </Field>
              </div>

              {/* ── 05 GENERAL QUESTIONS ── */}
              <div className="border border-acm-border bg-acm-dark p-6 rounded-sm space-y-5">
                <SectionHeader num="05" title="General Questions" />

                <Field
                  label="Why do you want to join ACM?"
                  required
                  hint="What do you hope to learn or gain from your experience? (250 words max)"
                >
                  <WordLimitTextarea
                    name="whyAcm"
                    placeholder="Share what draws you to ACM and what you hope to take away..."
                    required
                  />
                </Field>

                <Field
                  label="Startup & Tech Excitement"
                  required
                  hint="What excites you about working on projects with startups and building tech solutions? (250 words max)"
                >
                  <WordLimitTextarea
                    name="excitement"
                    placeholder="Tell us what gets you excited about this kind of work..."
                    required
                  />
                </Field>
              </div>

              {/* ── 06 LEAD QUESTIONS (conditional) ── */}
              <AnimatePresence>
                {isLead && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="border border-acm-blue-sky/30 bg-acm-blue-sky/5 p-6 rounded-sm space-y-5"
                  >
                    <SectionHeader num="06" title="Lead Questions" />
                    <p className="text-xs text-acm-muted -mt-2 mb-4">
                      These questions apply because you selected a lead role.
                    </p>

                    <Field
                      label="Why are you interested in being a lead?"
                      required
                      hint="250 words max"
                    >
                      <WordLimitTextarea
                        name="whyLead"
                        placeholder="What draws you to a leadership role specifically..."
                        required
                      />
                    </Field>

                    <Field
                      label="Community & Startup Connection"
                      required
                      hint="What are your ideas for connecting with the startup and fostering community within the team? (250 words max)"
                    >
                      <WordLimitTextarea
                        name="leadCommunity"
                        placeholder="How would you approach building rapport with the startup and your team..."
                        required
                      />
                    </Field>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── 07 FINAL SECTION ── */}
              <div className="border border-acm-border bg-acm-dark p-6 rounded-sm space-y-5">
                <SectionHeader num={isLead ? "07" : "06"} title="Final Section" />

                <Field label="Questions for Us">
                  <WordLimitTextarea
                    name="questionsForUs"
                    placeholder="Anything you'd like to ask us about ACM or the role you're applying for?"
                    rows={3}
                  />
                </Field>

                {/* Disclosure & Agreement */}
                <div className="border border-acm-border bg-acm-black p-5 rounded-sm">
                  <p className="font-mono text-[10px] tracking-widest uppercase text-acm-faint mb-3">
                    Disclosure &amp; Agreement
                  </p>
                  <p className="text-xs text-acm-muted leading-relaxed mb-4">
                    By submitting this application, I confirm that I have read and understood the ACM Software Branch role descriptions and responsibilities. I acknowledge the expected time commitment associated with the role I am applying for and understand that participation requires consistent engagement throughout the semester. I also understand that ACM Software teams work directly with external startup clients on real, high-priority projects. As such, professionalism, reliability, and clear communication are expected at all times. I agree to uphold these expectations if selected.
                  </p>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <button
                      type="button"
                      onClick={() => setAgreed(!agreed)}
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 border rounded-sm flex items-center justify-center transition-all duration-200 ${
                        agreed
                          ? "bg-acm-blue-mid border-acm-blue-mid"
                          : "border-acm-border bg-transparent group-hover:border-acm-blue-sky"
                      }`}
                    >
                      {agreed && (
                        <svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth={2} className="w-3 h-3">
                          <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                    <span className="text-sm text-acm-muted leading-relaxed">
                      I have read and agree to the disclosure above. <span className="text-acm-blue-sky">*</span>
                    </span>
                  </label>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="border border-red-400/40 bg-red-500/10 text-red-300 text-sm px-4 py-3 rounded-sm">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading" || selectedRoles.length === 0 || !agreed}
                className="w-full font-mono text-xs tracking-widest uppercase bg-acm-blue-mid text-white py-4 rounded-sm hover:bg-acm-blue transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Submitting…" : "Submit Application →"}
              </button>

              <p className="font-mono text-[10px] text-acm-faint text-center tracking-wide">
                Your information will only be used for team placement purposes.
              </p>
            </motion.form>
          )}
        </div>
      </section>
    </div>
  );
}