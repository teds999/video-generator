import { GameEntry } from "./games";
import { US_STATES_COVERS } from "./usStatesCoverImages";

const C = US_STATES_COVERS;

// Top 10 Richest US States by GDP — stored in $B, displayed as B→T
// Sorted rank 10 → rank 1 (index 0 = lowest, index 9 = #1)
export const SORTED_US_STATES: GameEntry[] = [
  { rank: 10, title: "Georgia",      sales: 670,  country: "United States", cover: C.Georgia,      flag: "" },
  { rank:  9, title: "New Jersey",   sales: 700,  country: "United States", cover: C.NewJersey,    flag: "" },
  { rank:  8, title: "Ohio",         sales: 780,  country: "United States", cover: C.Ohio,         flag: "" },
  { rank:  7, title: "Washington",   sales: 800,  country: "United States", cover: C.Washington,   flag: "" },
  { rank:  6, title: "Pennsylvania", sales: 1000, country: "United States", cover: C.Pennsylvania, flag: "" },
  { rank:  5, title: "Illinois",     sales: 1100, country: "United States", cover: C.Illinois,     flag: "" },
  { rank:  4, title: "Florida",      sales: 1700, country: "United States", cover: C.Florida,      flag: "" },
  { rank:  3, title: "New York",     sales: 2200, country: "United States", cover: C.NewYork,      flag: "" },
  { rank:  2, title: "Texas",        sales: 2600, country: "United States", cover: C.Texas,        flag: "" },
  { rank:  1, title: "California",   sales: 3900, country: "United States", cover: C.California,   flag: "" },
];
