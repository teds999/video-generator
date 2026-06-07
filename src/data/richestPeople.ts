import { GameEntry } from "./games";
import { RICHEST_COVERS } from "./richestPeopleCoverImages";

const C = RICHEST_COVERS;

// Top 10 Richest People in the World — net worth stored in $M so counter counts M→B (2024)
// Sorted rank 10 → rank 1 (index 0 = lowest, index 9 = #1)
export const SORTED_RICHEST: GameEntry[] = [
  { rank: 10, title: "Bernard Arnault", sales: 90000,  country: "France",        cover: C.BernardArnault,  flag: "" },
  { rank:  9, title: "Steve Ballmer",   sales: 100000, country: "United States",  cover: C.SteveBallmer,    flag: "" },
  { rank:  8, title: "Sergey Brin",     sales: 110000, country: "United States",  cover: C.SergeyBrin,      flag: "" },
  { rank:  7, title: "Larry Page",      sales: 115000, country: "United States",  cover: C.LarryPage,       flag: "" },
  { rank:  6, title: "Warren Buffett",  sales: 125000, country: "United States",  cover: C.WarrenBuffett,   flag: "" },
  { rank:  5, title: "Bill Gates",      sales: 130000, country: "United States",  cover: C.BillGates,       flag: "" },
  { rank:  4, title: "Larry Ellison",   sales: 170000, country: "United States",  cover: C.LarryEllison,    flag: "" },
  { rank:  3, title: "Mark Zuckerberg", sales: 180000, country: "United States",  cover: C.MarkZuckerberg,  flag: "" },
  { rank:  2, title: "Jeff Bezos",      sales: 200000, country: "United States",  cover: C.JeffBezos,       flag: "" },
  { rank:  1, title: "Elon Musk",       sales: 300000, country: "United States",  cover: C.ElonMusk,        flag: "" },
];
