import { GameEntry } from "./games";
import { MOBILE_GAME_COVERS } from "./mobileGameCoverImages";

const C = MOBILE_GAME_COVERS;

// Top 10 Highest Grossing Mobile Games — revenue stored as $M (billions × 1000)
// Sorted rank 10 → rank 1 (index 0 = lowest, index 9 = #1)
export const SORTED_MOBILE_GAMES: GameEntry[] = [
  { rank: 10, title: "Clash Royale",     sales:  2800, country: "Finland",        cover: C.Clash_Royale,     flag: "" },
  { rank:  9, title: "Garena Free Fire", sales:  3000, country: "Singapore",      cover: C.Garena_Free_Fire, flag: "" },
  { rank:  8, title: "Coin Master",      sales:  4000, country: "Israel",         cover: C.Coin_Master,      flag: "" },
  { rank:  7, title: "Roblox",           sales:  4500, country: "United States",  cover: C.Roblox,           flag: "" },
  { rank:  6, title: "Candy Crush Saga", sales:  4800, country: "United Kingdom", cover: C.Candy_Crush_Saga, flag: "" },
  { rank:  5, title: "Pokémon GO",       sales:  5000, country: "United States",  cover: C.Pok_mon_GO,       flag: "" },
  { rank:  4, title: "Monster Strike",   sales:  6000, country: "Japan",          cover: C.Monster_Strike,   flag: "" },
  { rank:  3, title: "Clash of Clans",   sales:  6400, country: "Finland",        cover: C.Clash_of_Clans,   flag: "" },
  { rank:  2, title: "PUBG Mobile",      sales:  9000, country: "South Korea",    cover: C.PUBG_Mobile,      flag: "" },
  { rank:  1, title: "Honor of Kings",   sales: 13500, country: "China",          cover: C.Honor_of_Kings,   flag: "" },
];
