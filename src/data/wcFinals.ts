import { GameEntry } from "./games";
import { WC_FINALS_COVERS } from "./wcFinalsCoverImages";

const C = WC_FINALS_COVERS;

// Top 10 Most Watched World Cup Finals — TV viewers in millions
// Sorted rank 10 → rank 1 (index 0 = lowest, index 9 = #1)
export const SORTED_WC_FINALS: GameEntry[] = [
  { rank: 10, title: "ARG vs GER\n1986", sales: 580,  country: "Mexico",       cover: C.Final1986, flag: "" },
  { rank:  9, title: "GER vs ARG\n1990", sales: 600,  country: "Italy",        cover: C.Final1990, flag: "" },
  { rank:  8, title: "BRA vs ITA\n1994", sales: 620,  country: "United States",cover: C.Final1994, flag: "" },
  { rank:  7, title: "ITA vs FRA\n2006", sales: 715,  country: "Germany",      cover: C.Final2006, flag: "" },
  { rank:  6, title: "FRA vs BRA\n1998", sales: 800,  country: "France",       cover: C.Final1998, flag: "" },
  { rank:  5, title: "BRA vs GER\n2002", sales: 836,  country: "South Korea",  cover: C.Final2002, flag: "" },
  { rank:  4, title: "ESP vs NED\n2010", sales: 909,  country: "South Africa", cover: C.Final2010, flag: "" },
  { rank:  3, title: "GER vs ARG\n2014", sales: 1013, country: "Brazil",       cover: C.Final2014, flag: "" },
  { rank:  2, title: "FRA vs CRO\n2018", sales: 1120, country: "Russia",       cover: C.Final2018, flag: "" },
  { rank:  1, title: "ARG vs FRA\n2022", sales: 1500, country: "Qatar",        cover: C.Final2022, flag: "" },
];
