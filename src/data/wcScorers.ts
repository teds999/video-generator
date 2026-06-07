import { GameEntry } from "./games";
import { WC_SCORER_COVERS } from "./wcScorersCoverImages";

const C = WC_SCORER_COVERS;

// Top 10 World Cup All-Time Top Scorers — goals scored
// Sorted rank 10 → rank 1 (index 0 = lowest, index 9 = #1)
export const SORTED_WC_SCORERS: GameEntry[] = [
  { rank: 10, title: "Grzegorz Lato",     sales: 10, country: "Poland",      cover: C.GrzegorzLato,      flag: "" },
  { rank:  9, title: "Teofilo Cubillas",  sales: 10, country: "Peru",         cover: C.TeofiloCubillas,   flag: "" },
  { rank:  8, title: "Jürgen Klinsmann", sales: 11, country: "Germany",      cover: C.JurgenKlinsmann,   flag: "" },
  { rank:  7, title: "Sandor Kocsis",    sales: 11, country: "Hungary",      cover: C.SandorKocsis,      flag: "" },
  { rank:  6, title: "Kylian Mbappé",   sales: 12, country: "France",       cover: C.KylianMbappe,      flag: "" },
  { rank:  5, title: "Pelé",             sales: 12, country: "Brazil",       cover: C.Pele,              flag: "" },
  { rank:  4, title: "Just Fontaine",    sales: 13, country: "France",       cover: C.JustFontaine,      flag: "" },
  { rank:  3, title: "Gerd Müller",     sales: 14, country: "Germany",      cover: C.GerdMuller,        flag: "" },
  { rank:  2, title: "Ronaldo R9",       sales: 15, country: "Brazil",       cover: C.RonaldoR9,         flag: "" },
  { rank:  1, title: "Miroslav Klose",   sales: 16, country: "Germany",      cover: C.MiroslavKlose,     flag: "" },
];
