import { GameEntry } from "./games";
import { AI_APPS_COVERS } from "./aiAppsCoverImages";
const C = AI_APPS_COVERS;

// Top 10 Most Downloaded AI Apps — downloads in M (2024)
export const SORTED_AI_APPS: GameEntry[] = [
  { rank: 10, title: "Poe",               sales: 15,  country: "United States", cover: C.Poe,              flag: "" },
  { rank:  9, title: "Pi AI",             sales: 20,  country: "United States", cover: C.PiAI,             flag: "" },
  { rank:  8, title: "Grok",              sales: 30,  country: "United States", cover: C.Grok,             flag: "" },
  { rank:  7, title: "Midjourney",        sales: 40,  country: "United States", cover: C.Midjourney,       flag: "" },
  { rank:  6, title: "Claude",            sales: 50,  country: "United States", cover: C.Claude,           flag: "" },
  { rank:  5, title: "Perplexity",        sales: 80,  country: "United States", cover: C.Perplexity,       flag: "" },
  { rank:  4, title: "Microsoft Copilot", sales: 200, country: "United States", cover: C.MicrosoftCopilot, flag: "" },
  { rank:  3, title: "Character.AI",      sales: 250, country: "United States", cover: C.CharacterAI,      flag: "" },
  { rank:  2, title: "Google Gemini",     sales: 300, country: "United States", cover: C.GoogleGemini,     flag: "" },
  { rank:  1, title: "ChatGPT",           sales: 500, country: "United States", cover: C.ChatGPT,          flag: "" },
];
