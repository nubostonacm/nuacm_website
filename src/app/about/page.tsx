"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay: i * 0.06 },
  }),
};

const pillars = [
  {
    num: "01",
    title: "Learn",
    desc: "Workshops and speaker sessions from industry leaders across software, research, and design.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Build",
    desc: "Hackathons, project nights, and semester-long software teams delivering real products.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Connect",
    desc: "Networking events, career panels, and industry recruiters who want to meet NU's builders.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Lead",
    desc: "Officer roles, project leadership, and governance built for students who want to run things.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
];

const eboard = [
  { initials: "EB",  name: "Ekam Bhatia",       title: "Chair",                          img: "/eboard/ekam.jpg"    },
  { initials: "SS",  name: "Smyan Sengupta",     title: "Vice Chair",                     img: "/eboard/smyan.jpg"   },
  { initials: "HB",  name: "Hannah Bang",        title: "Director of Startup Operations", img: "/eboard/hannah.jpg"  },
  { initials: "HJ",  name: "Heidi Jiang",        title: "Director of Research Operations",img: "/eboard/heidi.jpg"   },
  { initials: "MU",  name: "Max Uhlberg",        title: "Treasurer",                      img: "/eboard/max.jpg"     },
  { initials: "MA",  name: "Mehr Anand",         title: "Director of Growth",             img: "/eboard/mehr.jpg"    },
  { initials: "MS",  name: "Matthew Shi",        title: "Director of Growth",             img: "/eboard/matthew.jpg" },
  { initials: "AY",  name: "Alison Ye",          title: "Head of Social Media",           img: "/eboard/alison.jpg"  },
  { initials: "SS2", name: "Sandra Srinivasan",  title: "Head of Operational Software",   img: "/eboard/sandra.jpg"  },
];

export default function AboutPage() {
  return (
    <div className="bg-acm-black min-h-screen">

      {/* ── HERO ── */}
      <section className="relative min-h-[58vh] flex flex-col justify-center px-6 lg:px-16 pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div
          className="absolute pointer-events-none"
          style={{ width: 600, height: 400, background: "radial-gradient(ellipse, rgba(0,85,165,0.2) 0%, transparent 70%)", top: -80, right: -100, borderRadius: "50%" }}
        />
        <div className="relative max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-acm-blue-sky" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-acm-blue-sky">01 / About</span>
          </div>
          <h1
            className="font-display font-extrabold tracking-tight leading-tight mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Who We <span className="text-stroke italic">Are</span>
          </h1>
          <p className="text-acm-muted text-lg leading-relaxed max-w-2xl">
            A student-run chapter at Northeastern cultivating a community of computing enthusiasts — from first-years exploring CS to seniors launching careers.
          </p>
        </div>
      </section>

      {/* ── ACM GLOBAL ── */}
      <section className="px-6 lg:px-16 py-20 border-t border-acm-border">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <span className="font-mono text-xs tracking-widest uppercase text-acm-faint block mb-4">The organization</span>
            <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight mb-6">
              About <span className="text-acm-blue-sky">ACM</span> Global
            </h2>
            <p className="text-acm-muted leading-relaxed text-base mb-4">
              The Association for Computing Machinery is a global professional organization dedicated to advancing computing as both a science and a profession. Founded in 1947, it's the world's largest educational and scientific computing society.
            </p>
            <p className="text-acm-muted leading-relaxed text-base">
              ACM supports researchers, educators, and students through publications, conferences, and educational resources, while fostering collaboration and professional growth through networking and industry standards.
            </p>
          </motion.div>

          <motion.div
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="grid grid-cols-2 gap-px bg-acm-border border border-acm-border rounded overflow-hidden"
          >
            {[
              { val: "1947",                 label: "Founded" },
              { val: "110k+",                label: "Members worldwide" },
              { val: "190+",                 label: "Countries represented" },
              { val: "Science & Profession", label: "Advancing computing as a" },
            ].map((s) => (
              <div key={s.label} className="bg-acm-dark p-6">
                <p className="font-display font-bold text-2xl text-acm-text leading-tight mb-1">{s.val}</p>
                <p className="font-mono text-xs uppercase tracking-widest text-acm-faint">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CHAPTER ── */}
      <section className="px-6 lg:px-16 py-20 bg-acm-navy border-t border-acm-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-12 max-w-2xl"
          >
            <span className="font-mono text-xs tracking-widest uppercase text-acm-faint block mb-4">Our chapter</span>
            <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight mb-5">
              ACM <span className="text-acm-blue-sky">@</span> Northeastern
            </h2>
            <p className="text-acm-muted leading-relaxed">
              We organize workshops, hackathons, and networking events to support technical skill development and meaningful industry connections. Our software branch partners with startups — building real products over a full semester with cross-functional student teams.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-acm-border border border-acm-border rounded overflow-hidden">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-acm-black p-8 hover:bg-acm-surface transition-colors group"
              >
                <span className="font-mono text-xs text-acm-blue-sky block mb-4">{p.num}</span>
                <span className="text-acm-blue-sky opacity-60 group-hover:opacity-100 transition-opacity block mb-4">
                  {p.icon}
                </span>
                <h3 className="font-display font-bold text-base mb-2 group-hover:text-acm-blue-sky transition-colors">{p.title}</h3>
                <p className="text-sm text-acm-muted leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── E-BOARD PHOTO GRID ── */}
      <section className="px-6 lg:px-16 py-20 bg-acm-dark border-t border-acm-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-10"
          >
            <span className="font-mono text-xs tracking-widest uppercase text-acm-faint block mb-3">Executive board</span>
            <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight mb-3">
              Meet the <span className="text-acm-blue-sky italic">Team</span>
            </h2>
            <p className="text-acm-muted text-base leading-relaxed max-w-lg">
              The students running ACM @ Northeastern, elected each spring.
            </p>
          </motion.div>

          <div
            className="grid grid-cols-3 gap-px bg-acm-border border border-acm-border rounded overflow-hidden"
          >
            {eboard.map((member, i) => (
              <motion.div
                key={member.initials + i}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-acm-dark hover:bg-acm-surface transition-colors group overflow-hidden flex flex-col"
              >
                {/* Square photo area */}
                <div
                  className="relative w-full overflow-hidden bg-acm-surface"
                  style={{ aspectRatio: "1/1" }}
                >
                  {/* Initials placeholder — sits behind photo, hidden once image loads */}
                  <div
                    id={`placeholder-${i}`}
                    className="absolute inset-0 flex items-center justify-center font-display font-extrabold text-4xl text-acm-blue-sky opacity-30 select-none pointer-events-none z-0"
                  >
                    {member.initials.replace("2", "")}
                  </div>

                  {/* Photo using Next.js Image for proper optimization */}
                  <div
                    id={`photo-${i}`}
                    className="absolute inset-0 z-10 opacity-0 transition-opacity duration-300"
                  >
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      sizes="200px"
                      className="object-cover transition-all duration-300"
                      style={{ filter: "grayscale(15%)" }}
                      onLoad={() => {
                        // Show photo, hide initials
                        const photo = document.getElementById(`photo-${i}`);
                        const placeholder = document.getElementById(`placeholder-${i}`);
                        if (photo) photo.style.opacity = "1";
                        if (placeholder) placeholder.style.display = "none";
                      }}
                      onError={() => {
                        // Hide photo wrapper, keep initials
                        const photo = document.getElementById(`photo-${i}`);
                        if (photo) photo.style.display = "none";
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0%)";
                        (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLImageElement).style.filter = "grayscale(15%)";
                        (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                      }}
                    />
                  </div>
                </div>

                {/* Name + title */}
                <div className="px-4 py-4 border-t border-acm-border">
                  <p className="font-display font-bold text-sm text-acm-text leading-snug mb-1">
                    {member.name}
                  </p>
                  <p className="font-mono text-[10px] tracking-wide uppercase text-acm-faint leading-tight">
                    {member.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 lg:px-16 py-20 border-t border-acm-border text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-xl mx-auto"
        >
          <h2 className="font-display font-bold text-3xl tracking-tight mb-4">Want to work with us?</h2>
          <p className="text-acm-muted mb-8 leading-relaxed">
            Check out the software division or reach out directly to get involved.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/software"
              className="font-mono text-xs tracking-widest uppercase bg-acm-blue-mid text-white px-8 py-3 rounded-sm hover:bg-acm-blue transition-all duration-200 hover:-translate-y-0.5"
            >
              Software Division →
            </Link>
            <Link
              href="/contact"
              className="font-mono text-xs tracking-widest uppercase border border-acm-blue-mid text-acm-blue-sky px-8 py-3 rounded-sm hover:bg-acm-blue-mid hover:text-white transition-all duration-200"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}