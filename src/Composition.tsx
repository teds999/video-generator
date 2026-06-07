import React from "react";
import { useVideoConfig, AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { RankingScene } from "./components/RankingScene";

export type TopGamesProps = {
  spacing: number;
  pedestalHeight: number;
  cameraHeight: number;
  cameraDistance: number;
};

export const TopGamesComposition: React.FC<TopGamesProps> = ({
  spacing,
  pedestalHeight,
  cameraHeight,
  cameraDistance,
}) => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  // Start fading at rank #5 (index 15 → frame 2700), fully space at rank #3 (index 17 → frame 3060)
  const spaceProgress = interpolate(frame, [2700, 3060], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: "#000000" }}>
      {/* Sunset sky — fades out as space arrives */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, #0e2a6e 0%, #1d55b8 18%, #3a8de0 42%, #7ec4f0 60%, #e87fa0 76%, #f9a855 90%, #fde08a 100%)",
          opacity: 1 - spaceProgress,
        }}
      />
      {/* Deep space sky — fades in */}
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
        />
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
