import { GameEntry } from "./games";
import { AI_TOOLS_COVERS } from "./aiToolsCoverImages";
const C = AI_TOOLS_COVERS;

// Top 10 Most Used AI Tools — monthly active users in M (2024)
export const SORTED_AI_TOOLS: GameEntry[] = [
  { rank: 10, title: "Claude",             sales: 15,  country: "United States", cover: C.Claude,           flag: "" },
  { rank:  9, title: "GitHub Copilot",    sales: 18,  country: "United States", cover: C.GitHubCopilot,    flag: "" },
  { rank:  8, title: "Grammarly",         sales: 30,  country: "United States", cover: C.Grammarly,        flag: "" },
  { rank:  7, title: "Midjourney",        sales: 40,  country: "United States", cover: C.Midjourney,       flag: "" },
  { rank:  6, title: "Perplexity",        sales: 50,  country: "United States", cover: C.Perplexity,       flag: "" },
  { rank:  5, title: "Microsoft Copilot", sales: 100, country: "United States", cover: C.MicrosoftCopilot, flag: "" },
  { rank:  4, title: "Canva AI",          sales: 150, country: "Australia",     cover: C.CanvaAI,          flag: "" },
  { rank:  3, title: "ChatGPT",           sales: 180, country: "United States", cover: C.ChatGPT,          flag: "" },
  { rank:  2, title: "Google Gemini",     sales: 200, country: "United States", cover: C.GoogleGemini,     flag: "" },
  { rank:  1, title: "Meta AI",           sales: 400, country: "United States", cover: C.MetaAI,           flag: "" },
];
