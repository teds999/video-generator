import React, { useMemo } from "react";

const TREE_PALETTES = [
  { trunk: "#8b5224", canopy: "#5cad2e", canopy2: "#3e8c1e" },
  { trunk: "#7a4820", canopy: "#78c43a", canopy2: "#5ca028" },
  { trunk: "#9a5e2c", canopy: "#94c845", canopy2: "#72a030" },
  { trunk: "#6e4520", canopy: "#44a035", canopy2: "#2e7a25" },
];

const Tree: React.FC<{ x: number; z: number; scale?: number; variant?: number }> = ({
  x, z, scale = 1, variant = 0,
}) => {
  const pal = TREE_PALETTES[variant % TREE_PALETTES.length];
  return (
    <group position={[x, 0, z]} scale={[scale, scale, scale]}>
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.24, 1.25, 6]} />
        <meshStandardMaterial color={pal.trunk} roughness={0.82} />
      </mesh>
      <mesh position={[0, 2.25, 0]} castShadow>
        <sphereGeometry args={[1.25, 7, 6]} />
        <meshStandardMaterial color={pal.canopy} roughness={0.78} flatShading />
      </mesh>
      <mesh position={[0.35, 2.7, -0.08]} castShadow>
        <sphereGeometry args={[0.95, 7, 6]} />
        <meshStandardMaterial color={pal.canopy2} roughness={0.78} flatShading />
      </mesh>
      <mesh position={[-0.28, 2.4, 0.12]} castShadow>
        <sphereGeometry args={[0.82, 6, 5]} />
        <meshStandardMaterial color={pal.canopy} roughness={0.82} flatShading />
      </mesh>
    </group>
  );
};

const Fence: React.FC<{ x: number; z: number; length: number; rotY?: number }> = ({
  x, z, length, rotY = 0,
}) => {
  const posts = Math.floor(length / 1.5);
  return (
    <group position={[x, 0, z]} rotation={[0, rotY, 0]}>
      {Array.from({ length: posts }).map((_, i) => (
        <mesh key={i} position={[i * 1.5, 0.6, 0]} castShadow>
          <boxGeometry args={[0.12, 1.2, 0.12]} />
          <meshStandardMaterial color="#c8a96e" roughness={0.9} />
        </mesh>
      ))}
      <mesh position={[(posts - 1) * 0.75, 0.9, 0]}>
        <boxGeometry args={[(posts - 1) * 1.5, 0.1, 0.08]} />
        <meshStandardMaterial color="#c8a96e" roughness={0.9} />
      </mesh>
      <mesh position={[(posts - 1) * 0.75, 0.5, 0]}>
        <boxGeometry args={[(posts - 1) * 1.5, 0.1, 0.08]} />
        <meshStandardMaterial color="#c8a96e" roughness={0.9} />
      </mesh>
    </group>
  );
};

const StadiumFence: React.FC<{ x: number; z: number; length: number }> = ({ x, z, length }) => {
  const posts = Math.floor(length / 2);
  return (
    <group position={[x, 0, z]}>
      {Array.from({ length: posts }).map((_, i) => (
        <React.Fragment key={i}>
          <mesh position={[i * 2, 1.45, 0]}>
            <boxGeometry args={[0.06, 2.9, 0.06]} />
            <meshStandardMaterial color="#5d6872" roughness={0.55} metalness={0.25} />
          </mesh>
          <mesh position={[i * 2 + 0.95, 1.45, 0]}>
            <boxGeometry args={[0.03, 2.75, 0.03]} />
            <meshStandardMaterial color="#aab4bd" roughness={0.65} metalness={0.2} />
          </mesh>
        </React.Fragment>
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[length / 2, 0.45 + i * 0.55, 0]}>
          <boxGeometry args={[length, 0.035, 0.035]} />
          <meshStandardMaterial color="#aab4bd" roughness={0.65} metalness={0.2} />
        </mesh>
      ))}
    </group>
  );
};

const Bleachers: React.FC<{ x: number; z: number; length: number }> = ({ x, z, length }) => (
  <group position={[x, 0, z]}>
    {Array.from({ length: 4 }).map((_, row) => (
      <mesh key={row} position={[0, 0.18 + row * 0.22, row * 0.55]}>
        <boxGeometry args={[length, 0.18, 0.42]} />
        <meshStandardMaterial color={row % 2 === 0 ? "#d8dde5" : "#b9c2cd"} roughness={0.5} metalness={0.1} />
      </mesh>
    ))}
  </group>
);

const GoalFrame: React.FC<{ x: number; z: number }> = ({ x, z }) => (
  <group position={[x, 0, z]}>
    <mesh position={[0, 1.05, 0]}>
      <boxGeometry args={[2.3, 0.08, 0.08]} />
      <meshStandardMaterial color="#eef2f7" roughness={0.35} />
    </mesh>
    <mesh position={[-1.15, 0.52, 0]}>
      <boxGeometry args={[0.08, 1.1, 0.08]} />
      <meshStandardMaterial color="#eef2f7" roughness={0.35} />
    </mesh>
    <mesh position={[1.15, 0.52, 0]}>
      <boxGeometry args={[0.08, 1.1, 0.08]} />
      <meshStandardMaterial color="#eef2f7" roughness={0.35} />
    </mesh>
  </group>
);

const Shrub: React.FC<{ x: number; z: number; scale?: number }> = ({ x, z, scale = 1 }) => (
  <group position={[x, 0.18, z]} scale={[scale, scale, scale]}>
    <mesh position={[-0.28, 0, 0]}>
      <sphereGeometry args={[0.42, 6, 5]} />
      <meshStandardMaterial color="#6f9840" roughness={0.9} flatShading />
    </mesh>
    <mesh position={[0.18, 0.08, 0.05]}>
      <sphereGeometry args={[0.5, 6, 5]} />
      <meshStandardMaterial color="#86ad46" roughness={0.9} flatShading />
    </mesh>
    <mesh position={[0.62, -0.02, 0]}>
      <sphereGeometry args={[0.35, 6, 5]} />
      <meshStandardMaterial color="#5f8738" roughness={0.9} flatShading />
    </mesh>
  </group>
);

const LightPole: React.FC<{ x: number; z: number; scale?: number }> = ({ x, z, scale = 1 }) => (
  <group position={[x, 0, z]} scale={[scale, scale, scale]}>
    <mesh position={[0, 1.75, 0]}>
      <cylinderGeometry args={[0.045, 0.06, 3.5, 8]} />
      <meshStandardMaterial color="#4c5962" roughness={0.45} metalness={0.35} />
    </mesh>
    <mesh position={[0.22, 3.45, 0]}>
      <boxGeometry args={[0.62, 0.18, 0.16]} />
      <meshStandardMaterial color="#e8eef3" roughness={0.22} emissive="#fff4bd" emissiveIntensity={0.18} />
    </mesh>
  </group>
);

const Bench: React.FC<{ x: number; z: number; rotY?: number }> = ({ x, z, rotY = 0 }) => (
  <group position={[x, 0, z]} rotation={[0, rotY, 0]}>
    <mesh position={[0, 0.45, 0]}>
      <boxGeometry args={[1.6, 0.16, 0.35]} />
      <meshStandardMaterial color="#a87945" roughness={0.78} />
    </mesh>
    <mesh position={[0, 0.82, -0.18]}>
      <boxGeometry args={[1.6, 0.14, 0.22]} />
      <meshStandardMaterial color="#a87945" roughness={0.78} />
    </mesh>
    {[-0.55, 0.55].map((xPos) => (
      <mesh key={xPos} position={[xPos, 0.22, 0]}>
        <boxGeometry args={[0.1, 0.45, 0.1]} />
        <meshStandardMaterial color="#5c4b3a" roughness={0.75} />
      </mesh>
    ))}
  </group>
);

const HorizonHill: React.FC<{ x: number; z: number; scale: number; color: string }> = ({
  x,
  z,
  scale,
  color,
}) => (
  <mesh position={[x, 1.0 * scale, z]} scale={[scale * 2.6, scale * 0.75, scale]}>
    <sphereGeometry args={[2, 7, 5]} />
    <meshStandardMaterial color={color} roughness={1} flatShading />
  </mesh>
);

const RoadSegment: React.FC<{
  x: number;
  z: number;
  width: number;
  length: number;
  rotY?: number;
}> = ({ x, z, width, length, rotY = 0 }) => (
  <group position={[x, 0.055, z]} rotation={[0, rotY, 0]}>
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[length, width]} />
      <meshStandardMaterial color="#6f8190" roughness={0.82} />
    </mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, -width / 2 + 0.18]}>
      <planeGeometry args={[length, 0.08]} />
      <meshStandardMaterial color="#dfe8f1" roughness={0.75} />
    </mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, width / 2 - 0.18]}>
      <planeGeometry args={[length, 0.08]} />
      <meshStandardMaterial color="#dfe8f1" roughness={0.75} />
    </mesh>
    {Array.from({ length: Math.floor(length / 2.4) }).map((_, i) => (
      <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[-length / 2 + 1.2 + i * 2.4, 0.018, 0]}>
        <planeGeometry args={[1.05, 0.08]} />
        <meshStandardMaterial color="#f8fbff" roughness={0.7} />
      </mesh>
    ))}
  </group>
);

const CurvedRoad: React.FC<{ x: number; z: number; scale?: number }> = ({ x, z, scale = 1 }) => (
  <group position={[x, 0.06, z]} scale={[scale, scale, scale]} rotation={[0, -0.22, 0]}>
    {Array.from({ length: 9 }).map((_, i) => {
      const t = i / 8;
      const curveX = -7 + t * 14;
      const curveZ = Math.sin((t - 0.5) * Math.PI) * 2.8;
      const rotY = Math.cos((t - 0.5) * Math.PI) * 0.28;
      return <RoadSegment key={i} x={curveX} z={curveZ} width={2.15} length={2.6} rotY={rotY} />;
    })}
  </group>
);

const GuardRail: React.FC<{ x: number; z: number; length: number; rotY?: number }> = ({
  x,
  z,
  length,
  rotY = 0,
}) => (
  <group position={[x, 0, z]} rotation={[0, rotY, 0]}>
    {Array.from({ length: Math.floor(length / 1.8) }).map((_, i) => (
      <mesh key={i} position={[-length / 2 + i * 1.8, 0.38, 0]}>
        <boxGeometry args={[0.08, 0.75, 0.08]} />
        <meshStandardMaterial color="#d7dde4" roughness={0.55} metalness={0.25} />
      </mesh>
    ))}
    <mesh position={[0, 0.62, 0]}>
      <boxGeometry args={[length, 0.08, 0.08]} />
      <meshStandardMaterial color="#d7dde4" roughness={0.55} metalness={0.25} />
    </mesh>
  </group>
);

const Car: React.FC<{ x: number; z: number; color: string; rotY?: number; scale?: number }> = ({
  x,
  z,
  color,
  rotY = 0,
  scale = 1,
}) => (
  <group position={[x, 0.16, z]} rotation={[0, rotY, 0]} scale={[scale, scale, scale]}>
    <mesh position={[0, 0.18, 0]} castShadow>
      <boxGeometry args={[0.9, 0.32, 0.42]} />
      <meshStandardMaterial color={color} roughness={0.42} metalness={0.12} />
    </mesh>
    <mesh position={[0.05, 0.43, 0]} castShadow>
      <boxGeometry args={[0.48, 0.24, 0.34]} />
      <meshStandardMaterial color="#cde8ff" roughness={0.22} metalness={0.08} />
    </mesh>
    {[-0.32, 0.32].map((xPos) =>
      [-0.24, 0.24].map((zPos) => (
        <mesh key={`${xPos}-${zPos}`} position={[xPos, 0.02, zPos]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.11, 0.11, 0.08, 10]} />
          <meshStandardMaterial color="#20252a" roughness={0.65} />
        </mesh>
      )),
    )}
  </group>
);

const CloudCluster: React.FC<{
  x: number;
  y: number;
  z: number;
  scale?: number;
  tint?: string;
}> = ({ x, y, z, scale = 1, tint = "#fff3f8" }) => (
  <group position={[x, y, z]} scale={[scale, scale, scale]}>
    <mesh position={[-1.2, 0, 0]}>
      <sphereGeometry args={[1.15, 8, 6]} />
      <meshBasicMaterial color={tint} transparent opacity={0.86} />
    </mesh>
    <mesh position={[0, 0.25, 0.03]}>
      <sphereGeometry args={[1.55, 8, 6]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
    </mesh>
    <mesh position={[1.35, 0.05, 0]}>
      <sphereGeometry args={[1.25, 8, 6]} />
      <meshBasicMaterial color="#f8d9ef" transparent opacity={0.82} />
    </mesh>
    <mesh position={[0.5, -0.35, 0.02]}>
      <boxGeometry args={[3.8, 0.55, 0.12]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.72} />
    </mesh>
  </group>
);

// ── Mountain peak with optional snow cap ────────────────────────────────────
const MountainPeak: React.FC<{
  x: number; z: number; height: number; radius: number; color: string; snow?: boolean;
}> = ({ x, z, height, radius, color, snow = true }) => (
  <group position={[x, 0, z]}>
    <mesh position={[0, height / 2, 0]}>
      <coneGeometry args={[radius, height, 7]} />
      <meshStandardMaterial color={color} roughness={0.94} flatShading />
    </mesh>
    {snow && (
      <mesh position={[0, height * 0.78, 0]}>
        <coneGeometry args={[radius * 0.32, height * 0.26, 7]} />
        <meshStandardMaterial color="#e8eef8" roughness={0.82} />
      </mesh>
    )}
  </group>
);

// ── Simple European house ────────────────────────────────────────────────────
const EuroHouse: React.FC<{
  x: number; z: number; w: number; d: number; h: number;
  wallColor: string; roofColor: string; scale?: number;
}> = ({ x, z, w, d, h, wallColor, roofColor, scale = 1 }) => (
  <group position={[x, 0, z]} scale={[scale, scale, scale]}>
    <mesh position={[0, h / 2, 0]}>
      <boxGeometry args={[w, h, d]} />
      <meshStandardMaterial color={wallColor} roughness={0.88} />
    </mesh>
    {/* Pyramid roof */}
    <mesh position={[0, h + 0.44, 0]} rotation={[0, Math.PI / 4, 0]}>
      <coneGeometry args={[Math.sqrt(w * w + d * d) / 2 * 0.88, 0.9, 4]} />
      <meshStandardMaterial color={roofColor} roughness={0.82} />
    </mesh>
    {/* Window */}
    <mesh position={[0, h * 0.55, d / 2 + 0.02]}>
      <boxGeometry args={[w * 0.34, h * 0.26, 0.04]} />
      <meshStandardMaterial color="#2a3848" roughness={0.6} />
    </mesh>
  </group>
);

// ── Italian campanile (bell tower) ──────────────────────────────────────────
const Campanile: React.FC<{ x: number; z: number; scale?: number }> = ({ x, z, scale = 1 }) => (
  <group position={[x, 0, z]} scale={[scale, scale, scale]}>
    {/* Shaft */}
    <mesh position={[0, 4.5, 0]}>
      <boxGeometry args={[1.1, 9.0, 1.1]} />
      <meshStandardMaterial color="#d0c0a0" roughness={0.88} />
    </mesh>
    {/* Belfry */}
    <mesh position={[0, 9.8, 0]}>
      <boxGeometry args={[1.35, 1.25, 1.35]} />
      <meshStandardMaterial color="#bfb090" roughness={0.85} />
    </mesh>
    {/* Arch opening */}
    <mesh position={[0, 9.8, 0.7]}>
      <boxGeometry args={[0.62, 0.88, 0.08]} />
      <meshStandardMaterial color="#3a2e20" roughness={0.7} />
    </mesh>
    {/* Spire */}
    <mesh position={[0, 10.95, 0]}>
      <coneGeometry args={[0.44, 1.9, 8]} />
      <meshStandardMaterial color="#a07848" roughness={0.78} />
    </mesh>
  </group>
);

// ── Domed cathedral ──────────────────────────────────────────────────────────
const DomeCathedral: React.FC<{ x: number; z: number; scale?: number }> = ({ x, z, scale = 1 }) => (
  <group position={[x, 0, z]} scale={[scale, scale, scale]}>
    {/* Nave */}
    <mesh position={[0, 2.2, 0]}>
      <boxGeometry args={[3.5, 4.4, 2.2]} />
      <meshStandardMaterial color="#d8c8a8" roughness={0.88} />
    </mesh>
    {/* Drum */}
    <mesh position={[0, 5.5, 0]}>
      <cylinderGeometry args={[1.0, 1.1, 1.0, 10]} />
      <meshStandardMaterial color="#ccc0a0" roughness={0.85} />
    </mesh>
    {/* Dome */}
    <mesh position={[0, 6.6, 0]}>
      <sphereGeometry args={[1.28, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshStandardMaterial color="#7a9462" roughness={0.72} metalness={0.06} />
    </mesh>
    {/* Left tower */}
    <mesh position={[-1.65, 3.4, 0]}>
      <boxGeometry args={[0.88, 6.8, 0.88]} />
      <meshStandardMaterial color="#c8b898" roughness={0.88} />
    </mesh>
    <mesh position={[-1.65, 7.2, 0]}>
      <coneGeometry args={[0.46, 1.25, 8]} />
      <meshStandardMaterial color="#b86838" roughness={0.8} />
    </mesh>
    {/* Right tower */}
    <mesh position={[1.65, 3.4, 0]}>
      <boxGeometry args={[0.88, 6.8, 0.88]} />
      <meshStandardMaterial color="#c8b898" roughness={0.88} />
    </mesh>
    <mesh position={[1.65, 7.2, 0]}>
      <coneGeometry args={[0.46, 1.25, 8]} />
      <meshStandardMaterial color="#b86838" roughness={0.8} />
    </mesh>
  </group>
);

export const FallbackPark: React.FC<{ gameCount: number; spacing: number }> = ({
  gameCount,
  spacing,
}) => {
  const totalLength = (gameCount + 2) * spacing;

  const treePositions = useMemo(() => {
    const positions: Array<{ x: number; z: number; scale: number; variant: number }> = [];
    for (let i = -1; i <= gameCount + 1; i++) {
      const baseX = i * spacing;
      const v = (n: number) => Math.abs(n) % 4;
      positions.push({ x: baseX - 1.5, z: -7.5 + Math.sin(i * 2.3) * 0.6, scale: 0.75 + Math.abs(Math.sin(i * 1.7)) * 0.28, variant: v(i * 3) });
      positions.push({ x: baseX + 2.0, z: -11 + Math.cos(i * 1.9) * 0.8, scale: 0.7 + Math.abs(Math.cos(i * 2.1)) * 0.35, variant: v(i * 7 + 1) });
      positions.push({ x: baseX + 0.8, z: -18.5 + Math.sin(i * 1.5) * 1.2, scale: 0.48 + Math.abs(Math.sin(i * 2.4)) * 0.18, variant: v(i * 5 + 2) });
      positions.push({ x: baseX - 2.8, z: 8.8 + Math.cos(i * 1.2) * 0.8, scale: 0.52 + Math.abs(Math.cos(i * 2.6)) * 0.18, variant: v(i * 11) });
      if (i % 2 === 0) {
        positions.push({ x: baseX - 3.5, z: -14 + Math.sin(i * 1.3) * 1.1, scale: 0.9 + Math.abs(Math.sin(i * 0.9)) * 0.25, variant: v(i + 1) });
        positions.push({ x: baseX + 3.5, z: -17 + Math.cos(i * 1.1) * 1.1, scale: 0.85 + Math.abs(Math.cos(i * 1.3)) * 0.3, variant: v(i * 2 + 3) });
      }
    }
    return positions;
  }, [gameCount, spacing]);

  return (
    <group>
      {[
        { x: -spacing * 1.7, y: 9.4,  z: -32, scale: 0.78, tint: "#ffd3e8" },
        { x: -spacing * 0.1, y: 12.9, z: -39, scale: 1.0,  tint: "#ffe7f3" },
        { x:  spacing * 1.7, y: 12.0, z: -36, scale: 1.15, tint: "#ffe0ef" },
        { x:  spacing * 4.1, y: 9.6,  z: -31, scale: 0.8,  tint: "#f7c3dd" },
        { x:  spacing * 6.3, y: 11.4, z: -38, scale: 1.05, tint: "#ffe5f1" },
        { x:  spacing * 8.0, y: 8.9,  z: -34, scale: 0.72, tint: "#ffd9e8" },
      ].map((cloud, i) => (
        <CloudCluster key={i} {...cloud} />
      ))}

      {/* ── Far mountain range — loops across full scene width ── */}
      {Array.from({ length: 26 }).map((_, i) => (
        <MountainPeak
          key={`mfar-${i}`}
          x={spacing * (-2.0 + i * 1.05)}
          z={-50}
          height={14 + Math.abs(Math.sin(i * 2.3)) * 7}
          radius={5.0 + Math.abs(Math.cos(i * 1.7)) * 3.0}
          color={["#8090a8", "#7888a0", "#8292aa", "#7080a0"][i % 4]}
        />
      ))}

      {/* ── Near mountain range — loops across full scene width ── */}
      {Array.from({ length: 26 }).map((_, i) => (
        <MountainPeak
          key={`mnear-${i}`}
          x={spacing * (-1.5 + i * 1.05)}
          z={-36}
          height={10 + Math.abs(Math.sin(i * 1.9)) * 5}
          radius={3.8 + Math.abs(Math.cos(i * 2.1)) * 2.0}
          color={["#5a7255", "#4e6848", "#567050", "#4c6645"][i % 4]}
          snow={(10 + Math.abs(Math.sin(i * 1.9)) * 5) >= 12}
        />
      ))}

      {/* ── European city — repeating pattern across full scene width ── */}
      {Array.from({ length: 28 }).map((_, i) => {
        const x = spacing * (-0.4 + i * 1.02);
        const z = -23 - (i % 2);
        const sc = 0.80 + (i % 3) * 0.04;
        if (i % 7 === 3) {
          return <DomeCathedral key={`bld-${i}`} x={x} z={z} scale={sc} />;
        }
        if (i % 4 === 0) {
          return <Campanile key={`bld-${i}`} x={x} z={z} scale={sc + 0.04} />;
        }
        const WALLS = ["#d4c4a0", "#cfc0a0", "#d8c8a8", "#c8b890"];
        const ROOFS = ["#b05c30", "#a04828", "#c07040", "#983820"];
        return (
          <EuroHouse
            key={`bld-${i}`}
            x={x} z={z}
            w={1.7 + (i % 3) * 0.22}
            d={1.3 + (i % 2) * 0.2}
            h={3.2 + (i % 4) * 0.38}
            wallColor={WALLS[i % 4]}
            roofColor={ROOFS[i % 4]}
          />
        );
      })}

      {Array.from({ length: 26 }).map((_, i) => (
        <HorizonHill
          key={i}
          x={-spacing * 2.5 + i * spacing * 1.0}
          z={-28 - (i % 3) * 3.0}
          scale={1.5 + (i % 4) * 0.28}
          color={["#5a9c44", "#6db558", "#4e8c38", "#7ac160"][i % 4]}
        />
      ))}

      <RoadSegment x={totalLength / 2 - spacing} z={-23.2} width={3.0} length={totalLength + 28} />
      <GuardRail x={totalLength / 2 - spacing} z={-21.55} length={totalLength + 22} />
      <GuardRail x={totalLength / 2 - spacing} z={-24.85} length={totalLength + 22} />
      <CurvedRoad x={spacing * 1.0} z={8.8} scale={0.92} />
      <CurvedRoad x={spacing * 5.5} z={8.3} scale={0.8} />

      <Car x={spacing * 0.6} z={-23.5} color="#e34f5f" scale={0.74} />
      <Car x={spacing * 3.0} z={-22.45} color="#f2c94c" scale={0.68} rotY={0.05} />
      <Car x={spacing * 5.9} z={-23.4} color="#5aa2ff" scale={0.7} rotY={-0.04} />
      <Car x={spacing * 2.0} z={9.2} color="#ffffff" scale={0.58} rotY={0.28} />
      <Car x={spacing * 6.1} z={8.0} color="#ff8a3d" scale={0.56} rotY={-0.18} />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[totalLength / 2 - spacing, -0.01, 0]} receiveShadow>
        <planeGeometry args={[totalLength + 24, 34, 8, 8]} />
        <meshStandardMaterial color="#327248" roughness={0.92} />
      </mesh>

      {/* Pale paths like the reference park. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[totalLength / 2 - spacing, 0.015, -2.15]} receiveShadow>
        <planeGeometry args={[totalLength + 22, 1.0, 6, 1]} />
        <meshStandardMaterial color="#dce7f2" roughness={0.88} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0.35]} position={[totalLength / 2 - spacing * 0.15, 0.025, 2.6]} receiveShadow>
        <planeGeometry args={[totalLength + 8, 0.9, 6, 1]} />
        <meshStandardMaterial color="#dce7f2" roughness={0.88} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, -0.5]} position={[totalLength / 2 - spacing * 0.8, 0.03, -7.0]} receiveShadow>
        <planeGeometry args={[totalLength * 0.62, 0.8, 6, 1]} />
        <meshStandardMaterial color="#dce7f2" roughness={0.88} />
      </mesh>

      {/* Far background ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[totalLength / 2 - spacing, -0.02, 0]}>
        <planeGeometry args={[totalLength + 80, 120]} />
        <meshStandardMaterial color="#2d6844" roughness={1} />
      </mesh>

      {/* Low sports courts and distant fence details. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[totalLength / 2 - spacing, 0.02, -9.6]} receiveShadow>
        <planeGeometry args={[totalLength + 10, 8.2]} />
        <meshStandardMaterial color="#386f54" roughness={0.9} />
      </mesh>
      {[-12.4, -9.6, -6.8].map((z) => (
        <mesh key={z} rotation={[-Math.PI / 2, 0, 0]} position={[totalLength / 2 - spacing, 0.04, z]}>
          <planeGeometry args={[totalLength + 6, 0.16]} />
          <meshStandardMaterial color="#eef2f7" roughness={0.8} />
        </mesh>
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[-spacing + i * spacing * 1.15, 0.05, -9.6]}>
          <planeGeometry args={[0.15, 8.2]} />
          <meshStandardMaterial color="#eef2f7" roughness={0.8} />
        </mesh>
      ))}

      <StadiumFence x={-spacing * 1.4} z={-14.4} length={totalLength + spacing * 2.7} />
      <Bleachers x={totalLength / 2 - spacing} z={-16.6} length={totalLength * 0.45} />
      <GoalFrame x={spacing * 1.2} z={-6.3} />

      {Array.from({ length: 10 }).map((_, i) => (
        <Shrub
          key={i}
          x={-spacing * 1.6 + i * spacing * 0.85}
          z={i % 2 === 0 ? -4.8 : 6.9}
          scale={0.75 + (i % 3) * 0.15}
        />
      ))}

      {Array.from({ length: 6 }).map((_, i) => (
        <LightPole key={i} x={-spacing * 0.6 + i * spacing * 1.25} z={-13.2} scale={0.72} />
      ))}

      <Bench x={spacing * 0.2} z={5.0} rotY={0.18} />
      <Bench x={spacing * 2.9} z={5.4} rotY={-0.12} />
      <Bench x={spacing * 5.2} z={-4.8} rotY={0.24} />

      {/* Trees */}
      {treePositions.map((t, i) => (
        <Tree key={i} x={t.x} z={t.z} scale={t.scale} variant={t.variant} />
      ))}

      {/* Fences along the sides */}
      <Fence x={-spacing} z={-5.2} length={totalLength + spacing * 2} />
      <Fence x={-spacing} z={5.8} length={totalLength + spacing * 2} />
    </group>
  );
};
