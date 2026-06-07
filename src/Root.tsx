import React from "react";
import { Composition } from "remotion";
import { TopGamesComposition, TopGamesProps } from "./Composition";
import { TopYoutubersComposition, TopYoutubersProps } from "./YoutuberComposition";
import { TopMobileGamesComposition, TopMobileGamesProps } from "./MobileGamesComposition";
import { TopBuildingsComposition, TopBuildingsProps } from "./BuildingsComposition";
import { TopMoviesComposition, TopMoviesProps } from "./MoviesComposition";
import { SORTED_GAMES } from "./data/games";
import { SORTED_YOUTUBERS } from "./data/youtubers";
import { SORTED_MOBILE_GAMES } from "./data/mobileGames";
import { SORTED_BUILDINGS } from "./data/buildings";
import { SORTED_MOVIES } from "./data/movies";

const sharedCameraProps = {
  spacing: 5.05,
  pedestalHeight: 1,
  cameraHeight: 4.15,
  cameraDistance: 8.9,
};

const framesPerRank = 180;
const finaleFrames = 360;

const gamesDuration = Math.max(1, SORTED_GAMES.length - 1) * framesPerRank + finaleFrames;
const youtubersDuration = Math.max(1, SORTED_YOUTUBERS.length - 1) * framesPerRank + finaleFrames;
const mobileGamesDuration = Math.max(1, SORTED_MOBILE_GAMES.length - 1) * framesPerRank + finaleFrames;
const buildingsDuration = Math.max(1, SORTED_BUILDINGS.length - 1) * framesPerRank + finaleFrames;
const moviesDuration = Math.max(1, SORTED_MOVIES.length - 1) * framesPerRank + finaleFrames;

const gamesDefaultProps: TopGamesProps = sharedCameraProps;
const youtubersDefaultProps: TopYoutubersProps = sharedCameraProps;
const mobileGamesDefaultProps: TopMobileGamesProps = sharedCameraProps;
const buildingsDefaultProps: TopBuildingsProps = sharedCameraProps;
const moviesDefaultProps: TopMoviesProps = sharedCameraProps;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TopGames"
        component={TopGamesComposition}
        durationInFrames={gamesDuration}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={gamesDefaultProps}
      />
      <Composition
        id="TopYoutubers"
        component={TopYoutubersComposition}
        durationInFrames={youtubersDuration}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={youtubersDefaultProps}
      />
      <Composition
        id="TopMobileGames"
        component={TopMobileGamesComposition}
        durationInFrames={mobileGamesDuration}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={mobileGamesDefaultProps}
      />
      <Composition
        id="TopBuildings"
        component={TopBuildingsComposition}
        durationInFrames={buildingsDuration}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={buildingsDefaultProps}
      />
      <Composition
        id="TopMovies"
        component={TopMoviesComposition}
        durationInFrames={moviesDuration}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={moviesDefaultProps}
      />
    </>
  );
};
