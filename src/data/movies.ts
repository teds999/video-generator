import { GameEntry } from "./games";
import { MOVIE_COVERS } from "./movieCoverImages";

const C = MOVIE_COVERS;

// Top 10 Most Expensive Movies Ever Made — budget in $M
// Sorted rank 10 → rank 1 (index 0 = lowest, index 9 = #1)
export const SORTED_MOVIES: GameEntry[] = [
  { rank: 10, title: "Star Wars: The Force Awakens",          sales: 245, country: "United States",  cover: C.Star_Wars_Force_Awakens,          flag: "" },
  { rank:  9, title: "Batman v Superman",                     sales: 250, country: "United States",  cover: C.Batman_v_Superman,                flag: "" },
  { rank:  8, title: "Harry Potter: Half-Blood Prince",       sales: 250, country: "United Kingdom", cover: C.Harry_Potter_Half_Blood_Prince,    flag: "" },
  { rank:  7, title: "Spider-Man 3",                          sales: 258, country: "United States",  cover: C.Spider_Man_3,                     flag: "" },
  { rank:  6, title: "Tangled",                               sales: 260, country: "United States",  cover: C.Tangled,                          flag: "" },
  { rank:  5, title: "Justice League",                        sales: 300, country: "United States",  cover: C.Justice_League,                   flag: "" },
  { rank:  4, title: "Superman Returns",                      sales: 350, country: "United States",  cover: C.Superman_Returns,                 flag: "" },
  { rank:  3, title: "Avengers: Endgame",                     sales: 356, country: "United States",  cover: C.Avengers_Endgame,                 flag: "" },
  { rank:  2, title: "Avengers: Age of Ultron",               sales: 365, country: "United States",  cover: C.Avengers_Age_of_Ultron,           flag: "" },
  { rank:  1, title: "Pirates of the Caribbean",              sales: 379, country: "United States",  cover: C.Pirates_of_the_Caribbean,         flag: "" },
];
