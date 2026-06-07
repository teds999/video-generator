import { GameEntry } from "./games";
import { NFL_TEAMS_COVERS } from "./nflTeamsCoverImages";

const C = NFL_TEAMS_COVERS;

// Top 10 Richest US Politicians — net worth in $M
// Sorted rank 10 → rank 1 (index 0 = lowest, index 9 = #1)
export const SORTED_NFL_TEAMS: GameEntry[] = [
  { rank: 10, title: "Mitch McConnell",  sales: 35,   country: "United States", cover: C.MitchMcConnell,  flag: "" },
  { rank:  9, title: "Barack Obama",     sales: 70,   country: "United States", cover: C.BarackObama,     flag: "" },
  { rank:  8, title: "Hillary Clinton",  sales: 120,  country: "United States", cover: C.HillaryClinton,  flag: "" },
  { rank:  7, title: "John Kerry",       sales: 200,  country: "United States", cover: C.JohnKerry,       flag: "" },
  { rank:  6, title: "Nancy Pelosi",     sales: 240,  country: "United States", cover: C.NancyPelosi,     flag: "" },
  { rank:  5, title: "Mark Warner",      sales: 250,  country: "United States", cover: C.MarkWarner,      flag: "" },
  { rank:  4, title: "Rick Scott",       sales: 285,  country: "United States", cover: C.RickScott,       flag: "" },
  { rank:  3, title: "Mitt Romney",      sales: 300,  country: "United States", cover: C.MittRomney,      flag: "" },
  { rank:  2, title: "Jared Kushner",    sales: 800,  country: "United States", cover: C.JaredKushner,    flag: "" },
  { rank:  1, title: "Donald Trump",     sales: 5700, country: "United States", cover: C.DonaldTrump,     flag: "" },
];
