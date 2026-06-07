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

const collegeOptions = [
  "Khoury College of Computer Sciences",
  "College of Engineering",
  "D'Amore-McKim School of Business",
  "College of Arts, Media and Design",
  "Bouvé College of Health Sciences",
  "College of Social Sciences and Humanities",
  "College of Science",
  "School of Law",
  "Other",
];

const startups = [
  {
    id: "leasestack",
    name: "LeaseStack",
    subtitle: "AM Collective",
    url: "https://leasestack.co/about",
    tags: ["Full-Stack", "AI", "Real Estate"],
    about: "AM Collective is an operational holding company that builds AI-driven ventures and helps existing companies scale through technical execution and strategic business development.",
    description:
      "A managed marketing platform for real estate operators that centralizes AppFolio, Google Ads, Meta Ads, and GA4 into a single AI-briefed dashboard — helping leasing managers at small to mid-size firms understand what's driving lease signings.",
    engineerSkills:
      "End-to-end product dev with Claude Code, Vercel, and Neon; full-stack deployment; API integration.",
    designerSkills:
      "Strong UI/UX, intuitive mobile interfaces, product architecture, collaboration with engineers.",
    bonus: "Background in real estate, operations, or lead generation.",
  },
  {
    id: "cursive",
    name: "Cursive",
    subtitle: "AM Collective",
    url: "https://meetcursive.com",
    tags: ["B2B SaaS", "AI", "Data Infrastructure"],
    about: "AM Collective is an operational holding company that builds AI-driven ventures and helps existing companies scale through technical execution and strategic business development.",
    description:
      "A B2B SaaS data infrastructure company that analyzes clients' websites and enriches visitors with intent scores, business emails, page view history, and behavioral data — solving the problem of B2B companies lacking visibility into who is visiting their site.",
    engineerSkills:
      "End-to-end product dev with Claude Code, Vercel, and Neon; full-stack deployment; API integration.",
    designerSkills:
      "Strong UI/UX, intuitive mobile interfaces, product architecture, collaboration with engineers.",
    bonus: "Background in real estate, operations, or lead generation.",
  },
  {
    id: "team-impact",
    name: "Team IMPACT",
    subtitle: "Athlete Community Platform",
    url: "https://www.teamimpact.org/",
    tags: ["Nonprofit", "Community", "React Native"],
    about: "Team Impact is a nonprofit that connects children facing serious or chronic illnesses with college sports teams, creating meaningful experiences for both children and student athletes.",
    description:
      "A community platform connecting Team Impact's 200,000+ current and former student athletes with each other and corporate partners for networking, mentorship, and recruiting — serving as a long-term community hub while supporting sponsor engagement.",
    engineerSkills:
      "React/React Native, Node.js, Python/Django, PostgreSQL, REST APIs, AWS/GCP/Azure. Auth, access control, or AI/data tooling a plus.",
    designerSkills:
      "Figma, mobile-first design, component systems. Dashboards, profile pages, or search interfaces a plus.",
    bonus: "Background as a student athlete or connection to community-driven organizations.",
  },
  {
    id: "skipit",
    name: "Skipit",
    subtitle: "Trigger Identifier",
    url: "https://www.skipit.tech/",
    tags: ["Mobile", "Audio", "Social Impact"],
    about: "Skipit is a trauma-informed platform that helps viewers with PTSD, trauma histories, and sensory sensitivities manage distressing content in film and TV.",
    description:
      "A mobile companion app that listens to media audio, identifies the content being played, and instantly displays trigger categories, severity levels, and brief non-spoiler summaries — enabling users to access trigger data on TVs, tablets, and shared setups without a browser extension.",
    engineerSkills:
      "React Native or Flutter, TypeScript, Firebase/Firestore, REST API integration, mobile development.",
    designerSkills:
      "Figma, mobile UI/UX, component-based design systems, WCAG accessibility standards.",
    bonus: "Experience with audio APIs, fingerprinting, or media technology.",
  },
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
        maxLength={limit * 7}
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
  const [selectedStartups, setSelectedStartups] = useState<string[]>([]);
  const [isLead, setIsLead] = useState(false);
  const [agreed, setAgreed] = useState(false);

  function toggleRole(role: string) {
    const leadRoles = ["Tech Lead", "Design Lead"];
    const newRoles = selectedRoles.includes(role)
      ? selectedRoles.filter((r) => r !== role)
      : [...selectedRoles, role];
    setSelectedRoles(newRoles);
    setIsLead(newRoles.some((r) => leadRoles.includes(r)));
  }

  function toggleStartup(id: string) {
    setSelectedStartups((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
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
    formData.append("startups", selectedStartups.join(", "));

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
      setSelectedStartups([]);
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
          style={{
            width: 500,
            height: 360,
            background: "radial-gradient(ellipse, rgba(0,85,165,0.2) 0%, transparent 70%)",
            top: -80,
            right: -80,
            borderRadius: "50%",
          }}
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
            Apply to join a cross-functional team building real software for a startup this semester.
            Engineers and designers welcome. All text responses have a 250-word limit.
          </p>
        </div>
      </section>

      {/* ── FORM ── */}
      <section className="px-6 lg:px-16 pb-24">
        <div className="max-w-3xl mx-auto">

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="border border-emerald-500/30 bg-emerald-500/8 p-12 text-center rounded-sm"
            >
              <div className="w-12 h-12 border border-emerald-500/40 flex items-center justify-center mx-auto mb-5">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="w-6 h-6 text-emerald-400"
                >
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
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      required
                      className={baseInput}
                    />
                  </Field>
                  <Field label="Last Name" required>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      required
                      className={baseInput}
                    />
                  </Field>
                </div>

                <Field label="Pronouns">
                  <input
                    type="text"
                    name="pronouns"
                    placeholder="e.g. she/her, he/him, they/them"
                    className={baseInput}
                  />
                </Field>

                <Field label="School Email" required>
                  <input
                    type="email"
                    name="email"
                    placeholder="yourname@northeastern.edu"
                    required
                    className={baseInput}
                  />
                </Field>

                <Field label="College" required>
                  <select name="college" required defaultValue="" className={baseInput}>
                    <option value="" disabled>Select your college</option>
                    {collegeOptions.map((c) => (
                      <option key={c} value={c} className="bg-acm-dark">{c}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Major(s) / Minor(s)" required>
                  <input
                    type="text"
                    name="major"
                    placeholder="e.g. Computer Science, minor in Design"
                    required
                    className={baseInput}
                  />
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
                  <input
                    type="url"
                    name="resume"
                    placeholder="https://drive.google.com/..."
                    required
                    className={baseInput}
                  />
                </Field>

                <Field label="Portfolio URL">
                  <input
                    type="url"
                    name="portfolio"
                    placeholder="https://yourportfolio.com"
                    className={baseInput}
                  />
                </Field>

                <Field label="LinkedIn URL">
                  <input
                    type="url"
                    name="linkedin"
                    placeholder="https://linkedin.com/in/yourname"
                    className={baseInput}
                  />
                </Field>

                <Field label="GitHub URL">
                  <input
                    type="url"
                    name="github"
                    placeholder="https://github.com/yourname"
                    className={baseInput}
                  />
                </Field>

                <Field label="Any Other Links">
                  <input
                    type="text"
                    name="otherLinks"
                    placeholder="Behance, Dribbble, personal site, etc."
                    className={baseInput}
                  />
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
                  <input
                    type="text"
                    name="hearAboutDetail"
                    placeholder="If referral, who? If other, please specify."
                    className={baseInput}
                  />
                </Field>

                {/* Role selection */}
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
                <p className="text-xs text-acm-muted -mt-2 leading-relaxed">
                  We're partnering with several startups, each with a specific project your team would own. Select the ones you're interested in — you'll rank your preferences below.
                </p>

                <div className="space-y-3">
                  {startups.map((s) => {
                    const selected = selectedStartups.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => toggleStartup(s.id)}
                        className={`w-full text-left border rounded-sm p-5 transition-all duration-200 ${
                          selected
                            ? "border-acm-blue-sky bg-acm-blue-sky/5"
                            : "border-acm-border bg-acm-black hover:border-acm-blue-sky/50"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-display font-bold text-sm text-acm-text">
                                {s.name}
                              </span>
                              <span className="font-mono text-[10px] text-acm-faint">
                                — {s.subtitle}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {s.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="font-mono text-[9px] tracking-widest uppercase border border-acm-border text-acm-faint px-2 py-0.5 rounded-sm"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div
                            className={`w-5 h-5 flex-shrink-0 mt-0.5 border rounded-sm flex items-center justify-center transition-all duration-200 ${
                              selected
                                ? "bg-acm-blue-mid border-acm-blue-mid"
                                : "border-acm-border"
                            }`}
                          >
                            {selected && (
                              <svg
                                viewBox="0 0 12 12"
                                fill="none"
                                stroke="white"
                                strokeWidth={2}
                                className="w-3 h-3"
                              >
                                <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                        </div>

                        <p className="text-[11px] text-acm-blue-sky/70 leading-relaxed mb-2 italic">
                          {s.about}
                        </p>
                        <div className="mb-3">
                          <p className="font-mono text-[9px] tracking-widest uppercase text-acm-faint mb-1">Project</p>
                          <p className="text-xs text-acm-muted leading-relaxed">{s.description}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="bg-acm-surface border border-acm-border rounded-sm px-3 py-2">
                            <p className="font-mono text-[9px] tracking-widest uppercase text-acm-blue-sky mb-1">
                              Engineers
                            </p>
                            <p className="text-[11px] text-acm-faint leading-relaxed">
                              {s.engineerSkills}
                            </p>
                          </div>
                          <div className="bg-acm-surface border border-acm-border rounded-sm px-3 py-2">
                            <p className="font-mono text-[9px] tracking-widest uppercase text-acm-blue-sky mb-1">
                              Designers
                            </p>
                            <p className="text-[11px] text-acm-faint leading-relaxed">
                              {s.designerSkills}
                            </p>
                          </div>
                        </div>

                        {s.bonus && (
                          <p className="text-[11px] text-acm-faint mt-2 italic">
                            ✦ Bonus: {s.bonus}
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>

                {selectedStartups.length === 0 && (
                  <p className="font-mono text-[9px] text-acm-faint">Select at least one startup.</p>
                )}

                <Field
                  label="Startup Preference Ranking"
                  required
                  hint="For each selected startup, briefly explain why you're interested and what you'd bring to the team. Be concise and specific."
                >
                  <WordLimitTextarea
                    name="startupInterest"
                    placeholder={`1. Startup Name — Interested because...\n2. Startup Name — Interested because...\n3. Startup Name — ...`}
                    required
                    rows={6}
                  />
                </Field>
              </div>

              {/* ── 05 GENERAL QUESTIONS ── */}
              <div className="border border-acm-border bg-acm-dark p-6 rounded-sm space-y-5">
                <SectionHeader num="05" title="General Questions" />
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

              {/* ── FINAL SECTION ── */}
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
                    By submitting this application, I confirm that I have read and understood the ACM
                    Software Branch role descriptions and responsibilities. I acknowledge the expected
                    time commitment associated with the role I am applying for and understand that
                    participation requires consistent engagement throughout the semester. I also
                    understand that ACM Software teams work directly with external startup clients on
                    real, high-priority projects. As such, professionalism, reliability, and clear
                    communication are expected at all times. I agree to uphold these expectations if
                    selected.
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
                        <svg
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="white"
                          strokeWidth={2}
                          className="w-3 h-3"
                        >
                          <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                    <span className="text-sm text-acm-muted leading-relaxed">
                      I have read and agree to the disclosure above.{" "}
                      <span className="text-acm-blue-sky">*</span>
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