import { GameEntry } from "./games";
import { AI_COUNTRIES_COVERS } from "./aiCountriesCoverImages";
const C = AI_COUNTRIES_COVERS;

// Top 10 Countries Investing Most in AI — investment in $B (2024)
export const SORTED_AI_COUNTRIES: GameEntry[] = [
  { rank: 10, title: "Australia",   sales: 2000,  country: "Australia",     cover: C.Australia,   flag: "" },
  { rank:  9, title: "Japan",       sales: 3000,  country: "Japan",         cover: C.Japan,       flag: "" },
  { rank:  8, title: "South Korea", sales: 3500,  country: "South Korea",   cover: C.SouthKorea,  flag: "" },
  { rank:  7, title: "Canada",      sales: 4000,  country: "Canada",        cover: C.Canada,      flag: "" },
  { rank:  6, title: "India",       sales: 4800,  country: "India",         cover: C.India,       flag: "" },
  { rank:  5, title: "France",      sales: 5700,  country: "France",        cover: C.France,      flag: "" },
  { rank:  4, title: "Germany",     sales: 6000,  country: "Germany",       cover: C.Germany,     flag: "" },
  { rank:  3, title: "UK",          sales: 9000,  country: "United Kingdom",cover: C.UK,          flag: "" },
  { rank:  2, title: "China",       sales: 38000, country: "China",         cover: C.China,       flag: "" },
  { rank:  1, title: "USA",         sales: 67000, country: "United States", cover: C.USA,         flag: "" },
];
