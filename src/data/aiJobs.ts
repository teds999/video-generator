import { GameEntry } from "./games";
import { AI_JOBS_COVERS } from "./aiJobsCoverImages";
const C = AI_JOBS_COVERS;

// Top 10 Highest Paid AI Jobs — average annual salary in $K (2024)
export const SORTED_AI_JOBS: GameEntry[] = [
  { rank: 10, title: "Data Scientist",         sales: 175, country: "United States", cover: C.DataScientist,       flag: "" },
  { rank:  9, title: "AI Ethics Officer",      sales: 180, country: "United States", cover: C.EthicsOfficer,       flag: "" },
  { rank:  8, title: "Robotics Engineer",      sales: 195, country: "United States", cover: C.RoboticsEngineer,    flag: "" },
  { rank:  7, title: "Computer Vision Eng.",   sales: 210, country: "United States", cover: C.CVEngineer,          flag: "" },
  { rank:  6, title: "NLP Engineer",           sales: 220, country: "United States", cover: C.NLPEngineer,         flag: "" },
  { rank:  5, title: "AI Software Engineer",   sales: 235, country: "United States", cover: C.AISoftwareEngineer,  flag: "" },
  { rank:  4, title: "AI Infra Engineer",      sales: 245, country: "United States", cover: C.AIInfraEngineer,     flag: "" },
  { rank:  3, title: "AI Product Manager",     sales: 255, country: "United States", cover: C.AIProductManager,    flag: "" },
  { rank:  2, title: "ML Engineer",            sales: 280, country: "United States", cover: C.MLEngineer,          flag: "" },
  { rank:  1, title: "AI Research Scientist",  sales: 350, country: "United States", cover: C.ResearchScientist,   flag: "" },
];
