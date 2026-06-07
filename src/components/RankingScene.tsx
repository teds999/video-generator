import React, { useMemo } from "react";
import { useCurrentFrame, interpolate } from "remotion";
import * as THREE from "three";
import { Billboard } from "@react-three/drei";
import { GamePedestal } from "./GamePedestal";
import { FallbackPark } from "./FallbackPark";
import { CameraRig } from "./CameraRig";
import { SpaceElements } from "./SpaceElements";
import { SORTED_GAMES, GameEntry } from "../data/games";

type Props = {
  spacing: number;
  pedestalHeight: number;
  cameraHeight: number;
  cameraDistance: number;
  games?: GameEntry[];
  metricSuffix?: string;
  salesUnit?: string;
};

const smootherstep = (v: number) => v * v * v * (v * (v * 6 - 15) + 10);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

function makeRand(seed: number) {
  let s = seed | 0;
  return () => {
    s = Math.imul(s ^ (s >>> 16), 0x45d9f3b);
    s = Math.imul(s ^ (s >>> 16), 0x45d9f3b);
    s ^= s >>> 16;
    return (s >>> 0) / 0xffffffff;
  };
}

// ── Confetti burst ────────────────────────────────────────────────────────────
const CONFETTI_COLORS = ["#ff4466", "#ffcc00", "#44dd88", "#4499ff", "#ff88cc", "#cc44ff", "#ffaa22"];
const CONFETTI_COUNT = 40;

const ConfettiBurst: React.FC<{ x: number; y: number; frame: number; spawnFrame: number }> = ({
  x, y, frame, spawnFrame,
}) => {
  const particles = useMemo(() => {
    const rand = makeRand(spawnFrame * 31 + 7);
    return Array.from({ length: CONFETTI_COUNT }, () => ({
      vx: (rand() - 0.5) * 5.5,
      vy: 2.2 + rand() * 3.8,
      vz: (rand() - 0.5) * 1.8,
      color: CONFETTI_COLORS[Math.floor(rand() * CONFETTI_COLORS.length)],
      w: 0.07 + rand() * 0.10,
      h: 0.03 + rand() * 0.04,
      spin: (rand() - 0.5) * 12,
    }));
  }, [spawnFrame]);

  const elapsed = frame - spawnFrame;
  if (elapsed < 0 || elapsed > 160) return null;

  const t = elapsed / 60;
  const gravity = -5.0;
  const fade = Math.max(0, 1 - elapsed / 130);

  return (
    <>
      {particles.map((p, i) => {
        const px = x + p.vx * t;
        const py = y + p.vy * t + 0.5 * gravity * t * t;
        const pz = p.vz * t;
        if (py < -2) return null;
        return (
          <mesh
            key={i}
            position={[px, py, pz]}
            rotation={[p.spin * t, p.spin * t * 0.6, p.spin * t * 0.4]}
          >
            <planeGeometry args={[p.w, p.h]} />
            <meshBasicMaterial
              color={p.color}
              transparent
              opacity={fade}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        );
      })}
    </>
  );
};

// ── Reveal flash burst ────────────────────────────────────────────────────────
const RevealFlash: React.FC<{ x: number; y: number; frame: number; spawnFrame: number; rank: number }> = ({
  x, y, frame, spawnFrame, rank,
}) => {
  const elapsed = frame - spawnFrame;
  if (elapsed < 0 || elapsed > 22) return null;
  const t = elapsed / 22;
  const intensity = Math.pow(Math.max(0, 1 - t), 1.8) * 6.0;
  if (intensity < 0.05) return null;
  const color = rank === 1 ? "#ffe080" : rank === 2 ? "#d0e8ff" : rank === 3 ? "#ffb060" : "#fffae0";
  return <pointLight position={[x, y + 1, 3]} intensity={intensity} color={color} distance={12} decay={2} />;
};

// ── Gap indicator ─────────────────────────────────────────────────────────────
const GapLabel: React.FC<{ x: number; y: number; gapM: number; opacity: number }> = ({
  x, y, gapM, opacity,
}) => {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 440;
    canvas.height = 148;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Rounded pill background
    const r = 34;
    ctx.fillStyle = "rgba(255, 214, 0, 0.93)";
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.lineTo(440 - r, 0);
    ctx.quadraticCurveTo(440, 0, 440, r);
    ctx.lineTo(440, 148 - r);
    ctx.quadraticCurveTo(440, 148, 440 - r, 148);
    ctx.lineTo(r, 148);
    ctx.quadraticCurveTo(0, 148, 0, 148 - r);
    ctx.lineTo(0, r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#1a1200";
    ctx.font = "bold 82px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`+${gapM}M ↑`, 220, 74);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, [gapM]);

  if (opacity < 0.01 || !texture) return null;

  return (
    <Billboard position={[x, y, 0.8]} follow>
      <mesh>
        <planeGeometry args={[1.0, 0.34]} />
        <meshBasicMaterial map={texture} transparent opacity={opacity} depthWrite={false} />
      </mesh>
    </Billboard>
  );
};

// ── Gold star for rank #1 ─────────────────────────────────────────────────────
const StarEffect: React.FC<{ x: number; y: number; frame: number; opacity: number }> = ({
  x, y, frame, opacity,
}) => {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const cx = 128, cy = 128, outerR = 108, innerR = 44, pts = 5;
    // glow halo
    const grad = ctx.createRadialGradient(cx, cy, innerR * 0.5, cx, cy, outerR * 1.4);
    grad.addColorStop(0, "rgba(255,230,60,0.85)");
    grad.addColorStop(0.55, "rgba(255,180,20,0.45)");
    grad.addColorStop(1, "rgba(255,140,0,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR * 1.4, 0, Math.PI * 2);
    ctx.fill();
    // star body
    ctx.fillStyle = "#ffd700";
    ctx.strokeStyle = "#ff9900";
    ctx.lineWidth = 5;
    ctx.beginPath();
    for (let i = 0; i < pts * 2; i++) {
      const r = i % 2 === 0 ? outerR : innerR;
      const angle = (i * Math.PI) / pts - Math.PI / 2;
      if (i === 0) ctx.moveTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
      else ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // inner highlight
    ctx.fillStyle = "rgba(255,255,200,0.45)";
    ctx.beginPath();
    for (let i = 0; i < pts * 2; i++) {
      const r = i % 2 === 0 ? outerR * 0.55 : innerR * 0.55;
      const angle = (i * Math.PI) / pts - Math.PI / 2;
      if (i === 0) ctx.moveTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
      else ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
    }
    ctx.closePath();
    ctx.fill();
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, []);

  if (opacity < 0.01 || !texture) return null;

  const pulse = 0.92 + 0.10 * Math.sin(frame * 0.09);
  const spin = frame * 0.016;

  return (
    <group position={[x, y, 0.5]}>
      <mesh scale={[pulse, pulse, 1]} rotation={[0, 0, spin]}>
        <planeGeometry args={[1.3, 1.3]} />
        <meshBasicMaterial map={texture} transparent opacity={opacity} depthWrite={false} />
      </mesh>
      <pointLight intensity={2.4 * opacity * pulse} color="#ffd060" distance={6} decay={2} />
    </group>
  );
};

// ── Sparkle particles around the star ────────────────────────────────────────
const StarSparkles: React.FC<{ x: number; y: number; frame: number; opacity: number }> = ({
  x, y, frame, opacity,
}) => {
  const sparkles = useMemo(() => {
    const rand = makeRand(42);
    return Array.from({ length: 10 }, () => ({
      angle: rand() * Math.PI * 2,
      radius: 0.7 + rand() * 0.6,
      speed: 0.5 + rand() * 0.7,
      phase: rand() * Math.PI * 2,
      size: 0.05 + rand() * 0.05,
      color: ["#ffffff", "#ffe080", "#ffcc00"][Math.floor(rand() * 3)],
    }));
  }, []);

  if (opacity < 0.01) return null;

  return (
    <>
      {sparkles.map((s, i) => {
        const a = s.angle + frame * s.speed * 0.022;
        const px = x + Math.cos(a) * s.radius;
        const py = y + Math.sin(frame * 0.07 + s.phase) * 0.22;
        const pz = Math.sin(a) * s.radius * 0.25;
        const twinkle = 0.5 + 0.5 * Math.sin(frame * 0.18 + s.phase);
        return (
          <mesh key={i} position={[px, py, pz]}>
            <sphereGeometry args={[s.size * twinkle, 6, 6]} />
            <meshBasicMaterial color={s.color} transparent opacity={opacity * twinkle} depthWrite={false} />
          </mesh>
        );
      })}
    </>
  );
};

// ── Main scene ────────────────────────────────────────────────────────────────
export const RankingScene: React.FC<Props> = ({
  spacing,
  pedestalHeight,
  cameraHeight,
  cameraDistance,
  games: gamesProp,
  salesUnit = "€M",
}) => {
  const frame = useCurrentFrame();

  const spaceProgress = interpolate(frame, [2700, 3060], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const games = gamesProp ?? SORTED_GAMES;

  const framesPerStep = 180;
  const maxStep = Math.max(1, games.length - 1);
  // uncappedStep allows per-game reveal/bounce to complete for the last entry
  const uncappedStep = frame / framesPerStep;
  const rawStep = Math.min(maxStep, uncappedStep);

  // ── Reveal (opacity fade-in, 10 frames) ──
  const revealDuration = 10 / framesPerStep;
  const revealProgresses = games.map((_, i) => smootherstep(clamp01((uncappedStep - i) / revealDuration)));

  // ── Cover bounce scale (25 frames: scale 0 → 1.22 → 1.0) ──
  const bounceDuration = 25 / framesPerStep;
  const bounceScales = games.map((_, i) => {
    const t = clamp01((uncappedStep - i) / bounceDuration);
    if (t < 0.6) return 1.22 * smootherstep(t / 0.6);
    return 1.22 - 0.22 * smootherstep((t - 0.6) / 0.4);
  });

  // ── Subscriber counter: 30 frames, finishes just as logo snaps in ──
  const counterDuration = 30;
  const displaySalesValues = games.map((game, i) => {
    const arrivedFrame = i * framesPerStep - counterDuration;
    const t = clamp01((frame - arrivedFrame) / counterDuration);
    return Math.round(game.sales * smootherstep(t));
  });

  // ── Spotlight follows current pedestal ──
  const focusIdx = Math.min(maxStep, Math.round(rawStep));

  const smallestSales = Math.min(...games.map((g) => g.sales));
  const largestSales = Math.max(...games.map((g) => g.sales));
  const salesRange = Math.max(1, largestSales - smallestSales);
  const maxRankStep = Math.max(1, games.length - 1);
  const pedestalHeights = games.map((game, index) => {
    const salesProgress = (game.sales - smallestSales) / salesRange;
    const rankProgress = index / maxRankStep;
    const amplifiedSales = Math.pow(salesProgress, 0.38);
    return (2.8 + amplifiedSales * 8.8 + rankProgress * 4.2) * pedestalHeight;
  });

  const spotX = focusIdx * spacing;
  const spotH = pedestalHeights[focusIdx] ?? 5;

  // Top-3 indices (last 3 in the array)
  const top3Start = Math.max(0, games.length - 3);

  // Rank #1 is last pedestal
  const rank1Idx = games.length - 1;
  const rank1X = rank1Idx * spacing;
  // top of cover frame = pedestalHeight + 0.88 (cover center) + 1.025 (half cover height)
  const rank1Y = pedestalHeights[rank1Idx] + 1.95;

  return (
    <>
      {/* Camera */}
      <CameraRig
        gameCount={games.length}
        spacing={spacing}
        cameraHeight={cameraHeight}
        cameraDistance={cameraDistance}
        pedestalHeights={pedestalHeights}
      />

      {/* Base lighting */}
      <ambientLight intensity={0.58} color="#fff4e8" />
      <directionalLight
        position={[18, 28, 16]}
        intensity={2.4}
        color="#fffbe8"
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-near={0.5}
        shadow-camera-far={220}
        shadow-camera-left={-70}
        shadow-camera-right={70}
        shadow-camera-top={40}
        shadow-camera-bottom={-12}
      />
      <directionalLight position={[-12, 18, -14]} intensity={0.65} color="#ff9d5c" />
      <pointLight position={[14, 11, 8]} intensity={1.0} color="#fff3b0" />
      <hemisphereLight args={["#c5e8ff", "#2f5a3a", 0.6]} />

      {/* Spotlight on active pedestal */}
      <pointLight position={[spotX, spotH + 5, 5]} intensity={2.8} color="#fffae8" distance={16} decay={2} />

      {/* Space */}
      <SpaceElements opacity={spaceProgress} />
      <pointLight position={[50, 60, -40]} intensity={spaceProgress * 1.8} color="#a0b8ff" />

      {/* Park */}
      <FallbackPark gameCount={Math.max(20, games.length)} spacing={spacing} />


      {/* Confetti burst for top 3 */}
      {games.slice(top3Start).map((_, relIdx) => {
        const i = top3Start + relIdx;
        const spawnFrame = i * framesPerStep;
        const coverY = pedestalHeights[i] + 0.88;
        return (
          <ConfettiBurst
            key={i}
            x={i * spacing}
            y={coverY}
            frame={frame}
            spawnFrame={spawnFrame}
          />
        );
      })}

      {/* Gold star + sparkles for rank #1 */}
      <StarEffect
        x={rank1X}
        y={rank1Y}
        frame={frame}
        opacity={revealProgresses[rank1Idx]}
      />
      <StarSparkles
        x={rank1X}
        y={rank1Y}
        frame={frame}
        opacity={revealProgresses[rank1Idx]}
      />

      {/* Pedestals */}
      {games.map((game, i) => (
        <GamePedestal
          key={game.rank}
          position={[i * spacing, 0, 0]}
          rank={game.rank}
          title={game.title}
          sales={game.sales}
          displaySales={displaySalesValues[i]}
          country={game.country}
          coverUrl={game.cover}
          flagUrl={game.flag}
          pedestalHeight={pedestalHeights[i]}
          revealProgress={revealProgresses[i]}
          coverBounceScale={bounceScales[i]}
          salesUnit={salesUnit}
        />
      ))}

      {/* Reveal flash for every pedestal */}
      {games.map((game, i) => (
        <RevealFlash
          key={`flash-${i}`}
          x={i * spacing}
          y={pedestalHeights[i] + 0.88}
          frame={frame}
          spawnFrame={i * framesPerStep}
          rank={game.rank}
        />
      ))}
    </>
  );
};
