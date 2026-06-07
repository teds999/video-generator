import { GameEntry } from "./games";
import { WC_PAID_COVERS } from "./wcPaidPlayersCoverImages";

const C = WC_PAID_COVERS;

// Top 10 Highest Paid Players at 2026 World Cup — annual salary in $M
// Sorted rank 10 → rank 1 (index 0 = lowest, index 9 = #1)
export const SORTED_WC_PAID: GameEntry[] = [
  { rank: 10, title: "Harry Kane",         sales: 20,  country: "England",   cover: C.HarryKane,          flag: "" },
  { rank:  9, title: "Antoine Griezmann",  sales: 25,  country: "France",    cover: C.AntoineGriezmann,   flag: "" },
  { rank:  8, title: "Jude Bellingham",    sales: 30,  country: "England",   cover: C.JudeBellingham,     flag: "" },
  { rank:  7, title: "Mohamed Salah",      sales: 40,  country: "Egypt",     cover: C.MohamedSalah,       flag: "" },
  { rank:  6, title: "Lionel Messi",       sales: 50,  country: "Argentina", cover: C.LionelMessi,        flag: "" },
  { rank:  5, title: "Erling Haaland",     sales: 60,  country: "Norway",    cover: C.ErlingHaaland,      flag: "" },
  { rank:  4, title: "Vinicius Jr",        sales: 65,  country: "Brazil",    cover: C.ViniciusJr,         flag: "" },
  { rank:  3, title: "Neymar Jr",          sales: 70,  country: "Brazil",    cover: C.NeymarJr,           flag: "" },
  { rank:  2, title: "Kylian Mbappé",     sales: 100, country: "France",    cover: C.KylianMbappe,       flag: "" },
  { rank:  1, title: "Cristiano Ronaldo",  sales: 200, country: "Portugal",  cover: C.CristianoRonaldo,   flag: "" },
];
