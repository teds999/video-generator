import { GameEntry } from "./games";
import { FOOTBALLER_COVERS } from "./footballerCoverImages";

const C = FOOTBALLER_COVERS;

// Top 10 Most Expensive Football Transfers Ever — fee in €M
// Sorted rank 10 → rank 1 (index 0 = lowest, index 9 = #1)
export const SORTED_YOUTUBERS: GameEntry[] = [
  { rank: 10, title: "Paul Pogba",          sales: 105, country: "France",    cover: C.Paul_Pogba,         flag: "" },
  { rank:  9, title: "Ousmane Dembélé",     sales: 105, country: "France",    cover: C.Ousmane_Demb_l_,    flag: "" },
  { rank:  8, title: "Romelu Lukaku",        sales: 115, country: "Belgium",   cover: C.Romelu_Lukaku,      flag: "" },
  { rank:  7, title: "Jack Grealish",        sales: 117, country: "England",   cover: C.Jack_Grealish,      flag: "" },
  { rank:  6, title: "Antoine Griezmann",   sales: 120, country: "France",    cover: "",                   flag: "" },
  { rank:  5, title: "Enzo Fernández",       sales: 121, country: "Argentina", cover: C.Enzo_Fern_ndez,     flag: "" },
  { rank:  4, title: "João Félix",           sales: 126, country: "Portugal",  cover: C.Jo_o_F_lix,         flag: "" },
  { rank:  3, title: "Philippe Coutinho",    sales: 160, country: "Brazil",    cover: C.Philippe_Coutinho,  flag: "" },
  { rank:  2, title: "Kylian Mbappé",        sales: 180, country: "France",    cover: C.Kylian_Mbapp_,      flag: "" },
  { rank:  1, title: "Neymar Jr",            sales: 222, country: "Brazil",    cover: C.Neymar_Jr,          flag: "" },
];
