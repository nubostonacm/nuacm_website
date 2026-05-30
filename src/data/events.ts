export type EventTag    = "Hackathon" | "Workshop" | "Speaker" | "Social" | "Showcase" | "Career";
export type EventStatus = "upcoming" | "past" | "ongoing";

export interface ACMEvent {
  slug:  string;
  title: string;
  shortTitle?: string;
  tag:    EventTag;
  status: EventStatus;

  dateLabel: string;   // e.g. "March 14–15, 2025"
  month:     string;   // 3-letter for date box, e.g. "MAR"
  day:       string;   // day number, e.g. "14"

  startDate: string;   // ISO — used for countdown timer & sorting
  endDate?:  string;

  description: string; // short blurb for list cards

  // Full detail page fields (all optional — only render if provided)
  fullDescription?:    string;
  location?:           string;
  registrationLink?:   string;  // external URL
  useInternalForm?:    boolean;
  internalFormPath?:   string;  // e.g. "/apply"
  registrationOpen?:   boolean;
  registrationDeadline?: string;

  agenda?:   { time: string; item: string }[];
  prizes?:   string[];
  sponsors?: string[];
  faqs?:     { q: string; a: string }[];
  tags?:     string[]; // pill labels like "Beginner Friendly"
}

// ─── ADD UPCOMING EVENTS AT THE TOP ───────────────────────────
// Uncomment and fill in to add a new event:
//
// {
//   slug:        "hackathon-spring-2026",
//   title:       "NUACM Hackathon — Spring 2026",
//   shortTitle:  "Spring Hackathon",
//   tag:         "Hackathon",
//   status:      "upcoming",
//   dateLabel:   "March 14–15, 2026",
//   month:       "MAR",
//   day:         "14",
//   startDate:   "2026-03-14T09:00:00",
//   endDate:     "2026-03-15T18:00:00",
//   description: "24 hours, real projects, all skill levels welcome.",
//   fullDescription: "Our flagship hackathon. Form a team, pick a track, and ship something in 24 hours. Mentors, workshops, and prizes throughout the weekend.",
//   location:    "Khoury College, Northeastern University",
//   registrationOpen:     true,
//   registrationDeadline: "March 7, 2026",
//   useInternalForm:  true,
//   internalFormPath: "/apply",
//   tags:    ["Beginner Friendly", "24 Hours", "Prizes"],
//   prizes:  ["1st Place — $500", "2nd Place — $250", "3rd Place — $100", "Best Design — $100"],
//   agenda:  [
//     { time: "9:00 AM Sat",  item: "Check-in & Breakfast" },
//     { time: "10:00 AM Sat", item: "Opening Ceremony & Track Reveal" },
//     { time: "11:00 AM Sat", item: "Hacking Begins" },
//     { time: "11:00 AM Sun", item: "Submissions Close" },
//     { time: "1:00 PM Sun",  item: "Demos & Judging" },
//     { time: "3:00 PM Sun",  item: "Awards Ceremony" },
//   ],
//   faqs: [
//     { q: "Do I need a team?", a: "No — we have a team formation channel on Discord before the event." },
//     { q: "Is it free?",       a: "Yes. Completely free to participate." },
//     { q: "What should I bring?", a: "Laptop, charger, and anything you want to hack with. Food is provided." },
//   ],
// },

export const events: ACMEvent[] = [
  // ── PAST ──────────────────────────────────────────────────
  {
    slug:      "hackathon-march-2025",
    title:     "NUACM Hackathon — March 14–15",
    tag:       "Hackathon",
    status:    "past",
    dateLabel: "March 14–15, 2025",
    month:     "MAR",
    day:       "14",
    startDate: "2025-03-14T09:00:00",
    endDate:   "2025-03-15T18:00:00",
    description:
      "Our 24-hour hackathon brought together students across disciplines to build innovative projects, learn new technologies, and compete for prizes. Beginner-friendly, high-energy, and focused on collaboration and rapid prototyping.",
    tags: ["Beginner Friendly", "24 Hours"],
  },
  {
    slug:      "agents-of-tomorrow",
    title:     "Agents of Tomorrow Hackathon",
    tag:       "Hackathon",
    status:    "past",
    dateLabel: "Spring 2025",
    month:     "SPR",
    day:       "25",
    startDate: "2025-02-01T10:00:00",
    description:
      "A fast-paced 3-hour hackathon where participants built working AI agents using Subconscious. Open to all experience levels, encouraging collaboration, rapid prototyping, and creative problem-solving.",
    tags: ["AI Agents", "3 Hours"],
  },
  {
    slug:      "algorithmic-poker",
    title:     "Algorithmic Poker Event",
    tag:       "Hackathon",
    status:    "past",
    dateLabel: "Spring 2025",
    month:     "SPR",
    day:       "25",
    startDate: "2025-02-15T14:00:00",
    description:
      "Participants built poker-playing bots and competed head-to-head for prizes. The event blended coding, strategy, and fun — organized with @sandboxnu, @neudisrupt, @c4cneu, @ainortheastern, and sponsored by @nu.kaleidoscope.",
    tags: ["Bots", "Strategy", "Multi-org"],
  },
  {
    slug:      "coop-panel",
    title:     "Co-op Panel",
    tag:       "Career",
    status:    "past",
    dateLabel: "Fall 2024",
    month:     "FALL",
    day:       "24",
    startDate: "2024-10-01T18:00:00",
    description:
      "Students who completed co-ops at Johnson & Johnson, PwC, DraftKings, Quickbase, Klaviyo, and Bain Capital shared firsthand insights into landing roles, interview prep, and career growth.",
    tags: ["Career", "Panel"],
  },
  {
    slug:      "fireside-chat-steve-schmidt",
    title:     "Fireside Chat with Steve Schmidt",
    tag:       "Speaker",
    status:    "past",
    dateLabel: "Fall 2024",
    month:     "FALL",
    day:       "24",
    startDate: "2024-11-01T18:00:00",
    description:
      "An exclusive fireside chat with Steve Schmidt, Director of Machine Learning at Nike and Adjunct Professor at Northeastern. The discussion explored AI in industry and academia, leadership, and the evolving role of machine learning.",
    tags: ["ML", "Industry"],
  },
  {
    slug:      "fall-hackathon-2024",
    title:     "Fall Hackathon",
    tag:       "Hackathon",
    status:    "past",
    dateLabel: "Fall 2024",
    month:     "FALL",
    day:       "24",
    startDate: "2024-10-15T09:00:00",
    description:
      "Our annual Fall Hackathon — a weekend-long event where students teamed up to build innovative projects, sharpen their coding skills, and compete for prizes. Featured meals, networking, and tracks for 1st, 2nd, and special category winners.",
    tags: ["Weekend", "Prizes"],
  },
];

export const upcomingEvents = events.filter((e) => e.status === "upcoming" || e.status === "ongoing");
export const pastEvents     = events.filter((e) => e.status === "past");
export const featuredEvent  = upcomingEvents[0] ?? null;
