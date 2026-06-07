import { GameEntry } from "./games";
import { AI_BILLIONAIRES_COVERS } from "./aiBillionairesCoverImages";
const C = AI_BILLIONAIRES_COVERS;

// Top 10 Richest AI Billionaires — net worth stored in $M, displayed as B (2024)
export const SORTED_AI_BILLIONAIRES: GameEntry[] = [
  { rank: 10, title: "Sam Altman",        sales: 20000,  country: "United States", cover: C.SamAltman,        flag: "" },
  { rank:  9, title: "Eric Schmidt",      sales: 28000,  country: "United States", cover: C.EricSchmidt,      flag: "" },
  { rank:  8, title: "Sergey Brin",       sales: 110000, country: "United States", cover: C.SergeyBrin,       flag: "" },
  { rank:  7, title: "Larry Page",        sales: 115000, country: "United States", cover: C.LarryPage,        flag: "" },
  { rank:  6, title: "Jensen Huang",      sales: 120000, country: "United States", cover: C.JensenHuang,      flag: "" },
  { rank:  5, title: "Bill Gates",        sales: 130000, country: "United States", cover: C.BillGates,        flag: "" },
  { rank:  4, title: "Larry Ellison",     sales: 170000, country: "United States", cover: C.LarryEllison,     flag: "" },
  { rank:  3, title: "Mark Zuckerberg",   sales: 180000, country: "United States", cover: C.MarkZuckerberg,   flag: "" },
  { rank:  2, title: "Jeff Bezos",        sales: 200000, country: "United States", cover: C.JeffBezos,        flag: "" },
  { rank:  1, title: "Elon Musk",         sales: 300000, country: "United States", cover: C.ElonMusk,         flag: "" },
];
