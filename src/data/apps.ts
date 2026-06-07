import { GameEntry } from "./games";
import { APP_COVERS } from "./appCoverImages";

const C = APP_COVERS;

// Top 10 Highest Revenue Apps 2023 — annual revenue in $B
// Sorted rank 10 → rank 1 (index 0 = lowest, index 9 = #1)
export const SORTED_APPS: GameEntry[] = [
  { rank: 10, title: "Messenger",   sales: 0.3,  country: "United States", cover: C.Messenger,  flag: "" },
  { rank:  9, title: "Telegram",    sales: 0.5,  country: "United Arab Emirates", cover: C.Telegram,   flag: "" },
  { rank:  8, title: "WhatsApp",    sales: 0.9,  country: "United States", cover: C.WhatsApp,   flag: "" },
  { rank:  7, title: "Twitter / X", sales: 3.0,  country: "United States", cover: C.Twitter,    flag: "" },
  { rank:  6, title: "Zoom",        sales: 4.4,  country: "United States", cover: C.Zoom,       flag: "" },
  { rank:  5, title: "Snapchat",    sales: 4.6,  country: "United States", cover: C.Snapchat,   flag: "" },
  { rank:  4, title: "TikTok",      sales: 16.0, country: "China",         cover: C.TikTok,     flag: "" },
  { rank:  3, title: "YouTube",     sales: 31.5, country: "United States", cover: C.YouTube,    flag: "" },
  { rank:  2, title: "Instagram",   sales: 32.0, country: "United States", cover: C.Instagram,  flag: "" },
  { rank:  1, title: "Facebook",    sales: 117.0,country: "United States", cover: C.Facebook,   flag: "" },
];
