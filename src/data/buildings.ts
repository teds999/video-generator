import { GameEntry } from "./games";
import { BUILDING_COVERS } from "./buildingCoverImages";

const C = BUILDING_COVERS;

// Top 10 Tallest Buildings — height in meters
// Sorted rank 10 → rank 1 (index 0 = lowest, index 9 = #1)
export const SORTED_BUILDINGS: GameEntry[] = [
  { rank: 10, title: "CITIC Tower",                    sales:  528, country: "China",         cover: C.CITIC_Tower,                    flag: "" },
  { rank:  9, title: "Tianjin CTF Finance Centre",     sales:  530, country: "China",         cover: C.Tianjin_CTF_Finance_Centre,     flag: "" },
  { rank:  8, title: "Guangzhou CTF Finance Centre",   sales:  530, country: "China",         cover: C.Guangzhou_CTF_Finance_Centre,   flag: "" },
  { rank:  7, title: "One World Trade Center",         sales:  541, country: "United States",  cover: C.One_World_Trade_Center,         flag: "" },
  { rank:  6, title: "Lotte World Tower",              sales:  555, country: "South Korea",   cover: C.Lotte_World_Tower,              flag: "" },
  { rank:  5, title: "Ping An Finance Centre",         sales:  599, country: "China",         cover: C.Ping_An_Finance_Centre,         flag: "" },
  { rank:  4, title: "Abraj Al-Bait",                  sales:  601, country: "Saudi Arabia",  cover: C.Abraj_Al_Bait,                  flag: "" },
  { rank:  3, title: "Shanghai Tower",                 sales:  632, country: "China",         cover: C.Shanghai_Tower,                 flag: "" },
  { rank:  2, title: "Merdeka 118",                    sales:  679, country: "Malaysia",      cover: C.Merdeka_118,                    flag: "" },
  { rank:  1, title: "Burj Khalifa",                   sales:  828, country: "UAE",           cover: C.Burj_Khalifa,                   flag: "" },
];
