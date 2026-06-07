import { GameEntry } from "./games";
import { AI_COMPANIES_COVERS } from "./aiCompaniesCoverImages";

const C = AI_COMPANIES_COVERS;

// Top 10 Most Valuable AI Companies — valuation stored in $M, displayed as B (2024)
// Sorted rank 10 → rank 1 (index 0 = lowest, index 9 = #1)
export const SORTED_AI_COMPANIES: GameEntry[] = [
  { rank: 10, title: "Stability AI",  sales: 1000,   country: "United Kingdom",  cover: C.StabilityAI,  flag: "" },
  { rank:  9, title: "Inflection AI", sales: 4000,   country: "United States",   cover: C.InflectionAI, flag: "" },
  { rank:  8, title: "Hugging Face",  sales: 4500,   country: "United States",   cover: C.HuggingFace,  flag: "" },
  { rank:  7, title: "Cohere",        sales: 5000,   country: "Canada",          cover: C.Cohere,       flag: "" },
  { rank:  6, title: "Mistral AI",    sales: 6000,   country: "France",          cover: C.MistralAI,    flag: "" },
  { rank:  5, title: "Perplexity AI", sales: 9000,   country: "United States",   cover: C.Perplexity,   flag: "" },
  { rank:  4, title: "Scale AI",      sales: 14000,  country: "United States",   cover: C.ScaleAI,      flag: "" },
  { rank:  3, title: "xAI",           sales: 50000,  country: "United States",   cover: C.xAI,          flag: "" },
  { rank:  2, title: "Anthropic",     sales: 61000,  country: "United States",   cover: C.Anthropic,    flag: "" },
  { rank:  1, title: "OpenAI",        sales: 157000, country: "United States",   cover: C.OpenAI,       flag: "" },
];
