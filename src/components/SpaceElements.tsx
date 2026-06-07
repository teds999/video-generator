import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";
import * as THREE from "three";

type Props = {
  opacity: number;
};

// Deterministic pseudo-random so star positions are identical on every rendered frame
function makeRand(seed: number) {
  let s = seed;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) | 0;
    return ((s >>> 0) / 0xffffffff);
  };
}

export const SpaceElements: React.FC<Props> = ({ opacity }) => {
  const frame = useCurrentFrame();

  // ── Stars ────────────────────────────────────────────────────────────────
  const stars = useMemo(() => {
    const rand = makeRand(7919);
    return Array.from({ length: 220 }, () => ({
      x: -30 + rand() * 170,   // covers full scene width
      y:  10 + rand() * 72,    // above ground
      z: -14 - rand() * 80,    // behind the blocks
      size: 0.055 + rand() * 0.19,
      brightness: 0.45 + rand() * 0.55,
      warm: rand() > 0.82,     // ~18% warm/yellow stars
    }));
  }, []);

  // ── Satellite 1 — large, slow horizontal orbit ────────────────────────────
  const a1 = (frame / 380) * Math.PI * 2;
  const s1 = {
    x: 48 + Math.cos(a1) * 24,
    y: 31 + Math.sin(a1 * 0.35) * 5,
    z: Math.sin(a1) * 15 - 22,
  };

  // ── Satellite 2 — smaller, faster, tilted orbit ───────────────────────────
  const a2 = (frame / 255) * Math.PI * 2 + 2.1;
  const s2 = {
    x: 52 + Math.cos(a2) * 30,
    y: 38 + Math.sin(a2 * 0.55) * 7,
    z: Math.sin(a2) * 18 - 30,
  };

  if (opacity <= 0.01) return null;

  return (
    <group>

      {/* ── Stars ─────────────────────────────────────────────────────────── */}
      {stars.map((st, i) => (
        <mesh key={i} position={[st.x, st.y, st.z]}>
          <sphereGeometry args={[st.size, 4, 3]} />
          <meshBasicMaterial
            color={st.warm ? "#ffe4a0" : "#dde8ff"}
            transparent
            opacity={opacity * st.brightness}
          />
        </mesh>
      ))}

      {/* ── Nebula blobs ──────────────────────────────────────────────────── */}
      {/* Large purple cloud top-right */}
      <mesh position={[80, 42, -58]}>
        <sphereGeometry args={[30, 10, 8]} />
        <meshBasicMaterial
          color="#3a0e72"
          transparent
          opacity={opacity * 0.20}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Blue cloud centre-left */}
      <mesh position={[18, 36, -64]}>
        <sphereGeometry args={[26, 10, 8]} />
        <meshBasicMaterial
          color="#0d1e62"
          transparent
          opacity={opacity * 0.17}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Faint wide dome overhead */}
      <mesh position={[50, 55, -72]}>
        <sphereGeometry args={[38, 10, 8]} />
        <meshBasicMaterial
          color="#14053e"
          transparent
          opacity={opacity * 0.13}
          side={THREE.BackSide}
        />
      </mesh>

      {/* ── Satellite 1 ───────────────────────────────────────────────────── */}
      {/* Body + two solar panels + small antenna mast + beacon tip */}
      <group position={[s1.x, s1.y, s1.z]} rotation={[0.3, a1, 0.2]}>
        {/* main body */}
        <mesh castShadow>
          <boxGeometry args={[0.55, 0.28, 0.28]} />
          <meshStandardMaterial color="#c8d0da" metalness={0.88} roughness={0.12} />
        </mesh>
        {/* solar panel left */}
        <mesh position={[-1.05, 0, 0]}>
          <boxGeometry args={[1.0, 0.52, 0.04]} />
          <meshStandardMaterial
            color="#1a3d9a"
            metalness={0.5}
            roughness={0.3}
            emissive="#0a1f5a"
            emissiveIntensity={opacity * 0.65}
          />
        </mesh>
        {/* solar panel right */}
        <mesh position={[1.05, 0, 0]}>
          <boxGeometry args={[1.0, 0.52, 0.04]} />
          <meshStandardMaterial
            color="#1a3d9a"
            metalness={0.5}
            roughness={0.3}
            emissive="#0a1f5a"
            emissiveIntensity={opacity * 0.65}
          />
        </mesh>
        {/* antenna mast */}
        <mesh position={[0, 0.42, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.68, 6]} />
          <meshStandardMaterial color="#90a0b0" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* beacon */}
        <mesh position={[0, 0.78, 0]}>
          <sphereGeometry args={[0.1, 6, 5]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={opacity * 0.92} />
        </mesh>
      </group>

      {/* ── Satellite 2 ───────────────────────────────────────────────────── */}
      {/* Boxier body, wider panels, parabolic dish */}
      <group position={[s2.x, s2.y, s2.z]} rotation={[0.5, -a2 * 0.7, 0.4]}>
        {/* main body */}
        <mesh castShadow>
          <boxGeometry args={[0.46, 0.46, 0.68]} />
          <meshStandardMaterial color="#b0b8c8" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* solar panel left */}
        <mesh position={[-1.25, 0, 0]}>
          <boxGeometry args={[1.15, 0.56, 0.04]} />
          <meshStandardMaterial
            color="#1e4faa"
            metalness={0.5}
            roughness={0.3}
            emissive="#0d2860"
            emissiveIntensity={opacity * 0.72}
          />
        </mesh>
        {/* solar panel right */}
        <mesh position={[1.25, 0, 0]}>
          <boxGeometry args={[1.15, 0.56, 0.04]} />
          <meshStandardMaterial
            color="#1e4faa"
            metalness={0.5}
            roughness={0.3}
            emissive="#0d2860"
            emissiveIntensity={opacity * 0.72}
          />
        </mesh>
        {/* parabolic dish */}
        <mesh position={[0, 0, 0.54]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.34, 0.06, 0.24, 10]} />
          <meshStandardMaterial color="#d0d8e2" metalness={0.72} roughness={0.2} />
        </mesh>
      </group>

    </group>
  );
};
