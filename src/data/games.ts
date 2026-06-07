import { COVER_IMAGES } from "./coverImages";

export type GameEntry = {
  rank: number;
  title: string;
  sales: number;
  country: string;
  cover: string;
  flag: string;
};

export const GAMES: GameEntry[] = [
  { rank: 20, title: "Hogwarts Legacy", sales: 40, country: "United States", cover: COVER_IMAGES.hogwartsLegacy, flag: "" },
  { rank: 19, title: "Call of Duty: Modern Warfare", sales: 41, country: "United States", cover: COVER_IMAGES.modernWarfare, flag: "" },
  { rank: 18, title: "Call of Duty: Black Ops III", sales: 43, country: "United States", cover: COVER_IMAGES.blackOpsIii, flag: "" },
  { rank: 17, title: "Wii Fit / Plus", sales: 43.8, country: "Japan", cover: COVER_IMAGES.wiiFitPlus, flag: "" },
  { rank: 16, title: "Pokemon Red / Blue / Yellow", sales: 47.44, country: "Japan", cover: COVER_IMAGES.pokemonRedBlueYellow, flag: "" },
  { rank: 15, title: "Animal Crossing: New Horizons", sales: 49.91, country: "Japan", cover: COVER_IMAGES.animalCrossing, flag: "" },
  { rank: 14, title: "Stardew Valley", sales: 50, country: "United States", cover: COVER_IMAGES.stardewValley, flag: "" },
  { rank: 13, title: "The Sims", sales: 50, country: "United States", cover: COVER_IMAGES.theSims, flag: "" },
  { rank: 12, title: "Overwatch", sales: 50, country: "United States", cover: COVER_IMAGES.overwatch, flag: "" },
  { rank: 11, title: "Human: Fall Flat", sales: 55, country: "Lithuania", cover: COVER_IMAGES.humanFallFlat, flag: "" },
  { rank: 10, title: "Super Mario Bros.", sales: 58, country: "Japan", cover: COVER_IMAGES.superMarioBros, flag: "" },
  { rank: 9, title: "The Elder Scrolls V: Skyrim", sales: 60, country: "United States", cover: COVER_IMAGES.skyrim, flag: "" },
  { rank: 8, title: "The Witcher 3: Wild Hunt", sales: 65, country: "Poland", cover: COVER_IMAGES.witcher3, flag: "" },
  { rank: 7, title: "Terraria", sales: 70, country: "United States", cover: COVER_IMAGES.terraria, flag: "" },
  { rank: 6, title: "PUBG: Battlegrounds", sales: 75, country: "South Korea", cover: COVER_IMAGES.pubg, flag: "" },
  { rank: 5, title: "Mario Kart 8 / Deluxe", sales: 79.54, country: "Japan", cover: COVER_IMAGES.marioKart8, flag: "" },
  { rank: 4, title: "Wii Sports", sales: 82.9, country: "Japan", cover: COVER_IMAGES.wiiSports, flag: "" },
  { rank: 3, title: "Red Dead Redemption 2", sales: 85, country: "United States", cover: COVER_IMAGES.redDeadRedemption2, flag: "" },
  { rank: 2, title: "Grand Theft Auto V", sales: 230, country: "United Kingdom", cover: COVER_IMAGES.gtaV, flag: "" },
  { rank: 1, title: "Minecraft", sales: 350, country: "Sweden", cover: COVER_IMAGES.minecraft, flag: "" },
];

// Sorted rank 20 -> rank 1, so the camera climbs toward the biggest seller.
export const SORTED_GAMES = [...GAMES].sort((a, b) => b.rank - a.rank);
