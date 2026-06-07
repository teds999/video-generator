import React, { useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import { useCurrentFrame } from "remotion";

type Props = {
  gameCount: number;
  spacing: number;
  cameraHeight: number;
  cameraDistance: number;
  pedestalHeights: number[];
};

const smootherstep = (value: number) => value * value * value * (value * (value * 6 - 15) + 10);
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const CameraRig: React.FC<Props> = ({
  gameCount,
  spacing,
  cameraHeight,
  cameraDistance,
  pedestalHeights,
}) => {
  const { camera } = useThree();
  const frame = useCurrentFrame();

  const maxStep = Math.max(1, gameCount - 1);
  const framesPerStep = 180;
  const rawStep = Math.min(maxStep, frame / framesPerStep);
  const currentStep = Math.min(maxStep - 1, Math.floor(rawStep));
  const localProgress = rawStep - currentStep;
  const holdProgress = 0.2;
  const jumpProgress = clamp((localProgress - holdProgress) / (1 - holdProgress), 0, 1);
  const easedLocal = smootherstep(jumpProgress);

  const currentHeight = pedestalHeights[currentStep] ?? cameraHeight;
  const nextHeight = pedestalHeights[currentStep + 1] ?? currentHeight;
  const activeHeight = currentHeight + (nextHeight - currentHeight) * easedLocal;

  const fromX = currentStep * spacing;
  const toX = (currentStep + 1) * spacing;
  const camX = fromX + (toX - fromX) * easedLocal;

  const targetFromX = currentStep * spacing;
  const targetToX = (currentStep + 1) * spacing;
  const lookX = targetFromX + (targetToX - targetFromX) * easedLocal;

  // Focus on the content area: title (~height-1.45) through cover (~height+0.88), centered at height-0.9
  const lookY = activeHeight - 0.9;
  // Camera sits 1.8 units below the look point (mild upward tilt); floor at cameraHeight for short blocks
  const camY = Math.max(cameraHeight, lookY - 1.8);
  const camZ = cameraDistance;
  const lookZ = 0;

  // ── Finale orbit ─────────────────────────────────────────────────────────
  // All transitions finish at frame maxStep * framesPerStep (19 * 180 = 3420).
  // Hold 60 frames still, then smoothly arc camera left over 300 frames.
  const finaleStart = maxStep * framesPerStep;
  const orbitHold = 60;
  const orbitDuration = 300;
  const orbitProgress = smootherstep(
    clamp((frame - finaleStart - orbitHold) / orbitDuration, 0, 1),
  );

  const rank1Height = pedestalHeights[maxStep] ?? activeHeight;
  const rank1X = maxStep * spacing;
  const finalLookY = rank1Height - 0.9;
  const finalBaseCamY = Math.max(cameraHeight, finalLookY - 1.8);

  // Arc camera right in world (+X) so block drifts left in frame (viewer sees "camera go left")
  const finalCamX = rank1X + orbitProgress * spacing * 3.5;
  const finalCamY = finalBaseCamY + orbitProgress * 2.2;
  const finalCamZ = cameraDistance - orbitProgress * 1.4;
  const finalLookX = rank1X;

  const isFinale = frame >= finaleStart;
  const activeCamX = isFinale ? finalCamX : camX;
  const activeCamY = isFinale ? finalCamY : camY;
  const activeCamZ = isFinale ? finalCamZ : camZ;
  const activeLookX = isFinale ? finalLookX : lookX;
  const activeLookY = isFinale ? finalLookY : lookY;

  useLayoutEffect(() => {
    camera.position.set(activeCamX, activeCamY, activeCamZ);
    camera.lookAt(activeLookX, activeLookY, lookZ);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
  }, [camera, activeCamX, activeCamY, activeCamZ, activeLookX, activeLookY, lookZ]);

  return null;
};
