import { truncate } from "fs";

export type AnnouncementType = "applications" | "event" | "none";

export interface SiteAnnouncement {
  type: AnnouncementType;
  active: boolean;
  headline: string;
  subline: string;
  cta: string;
  href: string;
  dateLabel?: string;
}

// CURRENT ANNOUNCEMENT
export const announcement: SiteAnnouncement = {
  type: "applications",
  active: false,

  headline: "Software Team Applications Are Open",
  subline:
    "Join a cross-functional team and build real products for real startups this semester.",
  cta: "Apply Now",
  href: "/apply",
  dateLabel: "Applications close July 18",
};
