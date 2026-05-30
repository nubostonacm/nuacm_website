// ─────────────────────────────────────────────────────────────
// SITE CONFIG — edit this file to control banners & CTAs
// ─────────────────────────────────────────────────────────────

import { truncate } from "fs";

export type AnnouncementType = "applications" | "event" | "none";

export interface SiteAnnouncement {
  type: AnnouncementType;

  // Set to true to show the banner on the home page hero
  active: boolean;

  // Short headline shown in the banner
  headline: string;

  // One-line supporting copy
  subline: string;

  // Button label
  cta: string;

  // Where the button links — can be an internal path or external URL
  href: string;

  // Optional: deadline or event date string shown in the banner
  // e.g. "Applications close Jan 31" or "March 14–15, 2026"
  dateLabel?: string;
}

// ─────────────────────────────────────────────────────────────
// CURRENT ANNOUNCEMENT
// Change `active` to true and fill in the fields when
// something is live. Set `active: false` to hide the banner.
// ─────────────────────────────────────────────────────────────
export const announcement: SiteAnnouncement = {
  type: "applications",
  active: false, // ← flip to true when apps open

  headline: "Software Team Applications Are Open",
  subline:
    "Join a cross-functional team and build real products for real startups this semester.",
  cta: "Apply Now",
  href: "/apply",
  dateLabel: "Applications close June 15", // update as needed
};

// ─────────────────────────────────────────────────────────────
// EXAMPLE — upcoming event (uncomment & swap in when needed)
// ─────────────────────────────────────────────────────────────
// export const announcement: SiteAnnouncement = {
//   type: "event",
//   active: true,
//   headline: "NUACM Hackathon — March 14–15",
//   subline: "24 hours. Real projects. All skill levels welcome.",
//   cta: "Register Now",
//   href: "/events/hackathon-spring-2026",
//   dateLabel: "March 14–15, 2026",
// };
