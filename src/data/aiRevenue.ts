import { GameEntry } from "./games";
import { AI_REVENUE_COVERS } from "./aiRevenueCoverImages";
const C = AI_REVENUE_COVERS;

// Top 10 Biggest Tech Companies by AI Revenue — stored in $M, displayed as B (2024)
export const SORTED_AI_REVENUE: GameEntry[] = [
  { rank: 10, title: "Palantir",    sales: 2900,  country: "United States", cover: C.Palantir,   flag: "" },
  { rank:  9, title: "SAP",         sales: 3000,  country: "Germany",       cover: C.SAP,        flag: "" },
  { rank:  8, title: "Oracle",      sales: 3500,  country: "United States", cover: C.Oracle,     flag: "" },
  { rank:  7, title: "Salesforce",  sales: 4000,  country: "United States", cover: C.Salesforce, flag: "" },
  { rank:  6, title: "IBM",         sales: 5000,  country: "United States", cover: C.IBM,        flag: "" },
  { rank:  5, title: "Meta",        sales: 8000,  country: "United States", cover: C.Meta,       flag: "" },
  { rank:  4, title: "Amazon",      sales: 25000, country: "United States", cover: C.Amazon,     flag: "" },
  { rank:  3, title: "Google",      sales: 30000, country: "United States", cover: C.Google,     flag: "" },
  { rank:  2, title: "Microsoft",   sales: 36000, country: "United States", cover: C.Microsoft,  flag: "" },
  { rank:  1, title: "NVIDIA",      sales: 47000, country: "United States", cover: C.NVIDIA,     flag: "" },
];
