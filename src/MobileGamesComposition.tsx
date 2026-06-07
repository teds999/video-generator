import React from "react";
import { useVideoConfig, AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { RankingScene } from "./components/RankingScene";
import { SORTED_MOBILE_GAMES } from "./data/mobileGames";

export type TopMobileGamesProps = {
  spacing: number;
  pedestalHeight: number;
  cameraHeight: number;
  cameraDistance: number;
};

export const TopMobileGamesComposition: React.FC<TopMobileGamesProps> = ({
  spacing,
  pedestalHeight,
  cameraHeight,
  cameraDistance,
}) => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  const spaceProgress = interpolate(frame, [2700, 3060], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: "#000000" }}>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, #0e2a6e 0%, #1d55b8 18%, #3a8de0 42%, #7ec4f0 60%, #e87fa0 76%, #f9a855 90%, #fde08a 100%)",
          opacity: 1 - spaceProgress,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, #000000 0%, #020010 22%, #070325 50%, #0c0530 75%, #130838 100%)",
          opacity: spaceProgress,
        }}
      />
      <ThreeCanvas
        width={width}
        height={height}
        style={{ position: "absolute", inset: 0 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        camera={{ fov: 49, near: 0.1, far: 500, position: [0, cameraHeight, cameraDistance] }}
      >
        <RankingScene
          spacing={spacing}
          pedestalHeight={pedestalHeight}
          cameraHeight={cameraHeight}
          cameraDistance={cameraDistance}
          games={SORTED_MOBILE_GAMES}
          salesUnit="$B"
        />
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
