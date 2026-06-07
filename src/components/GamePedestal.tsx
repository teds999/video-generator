import React, { useEffect, useMemo, useState } from "react";
import { RoundedBox } from "@react-three/drei";
import { continueRender, delayRender } from "remotion";
import * as THREE from "three";

type Props = {
  position: [number, number, number];
  rank: number;
  title: string;
  sales: number;
  country: string;
  coverUrl: string;
  flagUrl: string;
  pedestalHeight?: number;
  revealProgress?: number;
  displaySales?: number;
  coverBounceScale?: number;
  salesUnit?: string;
};

function useTextureWithFallback(url: string): THREE.Texture | null {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (!url) {
      setTexture(null);
      return;
    }

    let cancelled = false;
    const loader = new THREE.TextureLoader();

    loader.load(
      url,
      (tex) => {
        if (!cancelled) {
          setTexture(tex);
        }
      },
      undefined,
      () => {
        if (!cancelled) {
          setTexture(null);
        }
      },
    );

    return () => {
      cancelled = true;
    };
  }, [url]);

  return texture;
}

const drawCoverImage = (context: CanvasRenderingContext2D, image: HTMLImageElement) => {
  const { width, height } = context.canvas;
  const coverScale = Math.max(width / image.width, height / image.height);
  const coverW = image.width * coverScale;
  const coverH = image.height * coverScale;

  context.save();
  context.filter = "blur(18px) saturate(1.15) brightness(0.72)";
  context.drawImage(image, (width - coverW) / 2, (height - coverH) / 2, coverW, coverH);
  context.restore();

  context.fillStyle = "rgba(4, 8, 18, 0.28)";
  context.fillRect(0, 0, width, height);

  // Contain: show full image centered, blurred bg above fills empty space
  const fillScale = Math.min((width * 0.96) / image.width, (height * 0.96) / image.height);
  const imageW = image.width * fillScale;
  const imageH = image.height * fillScale;
  const x = (width - imageW) / 2;
  const y = (height - imageH) / 2;

  context.save();
  context.beginPath();
  context.rect(0, 0, width, height);
  context.clip();
  context.drawImage(image, x, y, imageW, imageH);
  context.restore();
};

function useCoverTexture(url: string): THREE.Texture | null {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const handle = delayRender(`Loading cover ${url}`);
    let cancelled = false;
    let finished = false;
    const finish = () => {
      if (!finished) {
        finished = true;
        continueRender(handle);
      }
    };

    const image = new Image();
    if (!url.startsWith("data:")) {
      image.crossOrigin = "anonymous";
    }
    image.onload = () => {
      if (!cancelled) {
        const canvas = document.createElement("canvas");
        canvas.width = 700;
        canvas.height = 950;
        const context = canvas.getContext("2d");

        if (context) {
          drawCoverImage(context, image);
          const tex = new THREE.CanvasTexture(canvas);
          tex.needsUpdate = true;
          tex.minFilter = THREE.LinearFilter;
          tex.magFilter = THREE.LinearFilter;
          setTexture(tex);
        } else {
          setTexture(null);
        }
      }

      finish();
    };
    image.onerror = () => {
      if (!cancelled) {
        setTexture(null);
      }

      finish();
    };
    image.src = url;

    return () => {
      cancelled = true;
      finish();
    };
  }, [url]);

  return texture;
}

const getTitleHue = (title: string) => {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }

  return Math.abs(hash) % 360;
};

const drawWrappedCoverText = (
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) => {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;
    if (context.measureText(testLine).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = testLine;
    }
  }

  if (line) {
    lines.push(line);
  }

  lines.slice(0, 4).forEach((lineText, index) => {
    context.fillText(lineText, x, y + index * lineHeight);
  });
};

const useGeneratedCoverTexture = (title: string): THREE.Texture | null => {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 700;
    canvas.height = 950;

    const context = canvas.getContext("2d");
    if (!context) {
      return null;
    }

    const hue = getTitleHue(title);
    const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, `hsl(${hue}, 76%, 62%)`);
    gradient.addColorStop(0.55, `hsl(${(hue + 42) % 360}, 72%, 34%)`);
    gradient.addColorStop(1, `hsl(${(hue + 210) % 360}, 78%, 22%)`);
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "rgba(255, 255, 255, 0.12)";
    context.beginPath();
    context.arc(155, 150, 135, 0, Math.PI * 2);
    context.fill();
    context.beginPath();
    context.arc(610, 775, 210, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = "rgba(10, 18, 35, 0.32)";
    context.fillRect(0, canvas.height - 260, canvas.width, 260);

    context.fillStyle = "#ffffff";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "800 74px Arial, sans-serif";
    drawWrappedCoverText(context, title, canvas.width / 2, canvas.height - 165, canvas.width * 0.78, 78);

    context.font = "700 30px Arial, sans-serif";
    context.fillStyle = "rgba(255, 255, 255, 0.82)";
    context.fillText("TOP GAMES", canvas.width / 2, 72);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, [title]);
};

const CoverPlane: React.FC<{ url: string; title: string; opacity?: number }> = ({ url, title, opacity = 1 }) => {
  const texture = useCoverTexture(url);
  const generatedTexture = useGeneratedCoverTexture(title);

  return (
    <mesh>
      <planeGeometry args={[1.4, 1.9]} />
      {texture ? (
        <meshStandardMaterial map={texture} transparent opacity={opacity} depthWrite={false} side={THREE.DoubleSide} roughness={0.2} metalness={0.1} />
      ) : generatedTexture ? (
        <meshStandardMaterial map={generatedTexture} transparent opacity={opacity} depthWrite={false} side={THREE.DoubleSide} roughness={0.25} metalness={0.12} />
      ) : (
        <meshStandardMaterial color="#d8e7ff" transparent opacity={opacity} depthWrite={false} roughness={0.3} />
      )}
    </mesh>
  );
};

const getFallbackFlag = (country: string) => {
  if (country === "Sweden") {
    return { base: "#006aa7", accent: "#fecc00", type: "sweden" };
  }

  if (country === "United Kingdom") {
    return { base: "#012169", accent: "#c8102e", type: "uk" };
  }

  if (country === "South Korea") {
    return { base: "#ffffff", accent: "#cd2e3a", type: "korea" };
  }

  if (country === "Japan") {
    return { base: "#f7f7f7", accent: "#d91f26", type: "circle" };
  }

  if (country === "Poland") {
    return { base: "#ffffff", accent: "#dc143c", type: "stripe" };
  }

  if (country === "Lithuania") {
    return { base: "#fdb913", accent: "#c1272d", type: "tricolor" };
  }

  if (country === "Norway") {
    return { base: "#ef2b2d", accent: "#003087", type: "norway" };
  }

  if (country === "Mexico") {
    return { base: "#006847", accent: "#ce1126", type: "mexico" };
  }

  if (country === "Canada") {
    return { base: "#ff0000", accent: "#ffffff", type: "canada" };
  }

  if (country === "India") {
    return { base: "#ff9933", accent: "#138808", type: "india" };
  }
  if (country === "UAE") {
    return { base: "#00732f", accent: "#ff0000", type: "uae" };
  }
  if (country === "Malaysia") {
    return { base: "#cc0001", accent: "#ffcc00", type: "malaysia" };
  }
  if (country === "Saudi Arabia") {
    return { base: "#006c35", accent: "#ffffff", type: "saudi" };
  }
  if (country === "Finland") {
    return { base: "#ffffff", accent: "#003580", type: "finland" };
  }
  if (country === "Singapore") {
    return { base: "#ef3340", accent: "#ffffff", type: "singapore" };
  }
  if (country === "Israel") {
    return { base: "#ffffff", accent: "#0038b8", type: "israel" };
  }
  if (country === "China") {
    return { base: "#de2910", accent: "#ffde00", type: "china" };
  }
  if (country === "South Korea") {
    return { base: "#ffffff", accent: "#cd2e3a", type: "korea" };
  }
  if (country === "France") {
    return { base: "#002395", accent: "#ed2939", type: "france" };
  }
  if (country === "Belgium") {
    return { base: "#000000", accent: "#f50000", type: "belgium" };
  }
  if (country === "Ivory Coast") {
    return { base: "#f77f00", accent: "#009a44", type: "ivory_coast" };
  }
  if (country === "England") {
    return { base: "#ffffff", accent: "#cf142b", type: "england" };
  }
  if (country === "Wales") {
    return { base: "#00ab39", accent: "#cf142b", type: "wales" };
  }
  if (country === "Brazil") {
    return { base: "#009c3b", accent: "#ffdf00", type: "brazil" };
  }
  if (country === "Argentina") {
    return { base: "#74acdf", accent: "#ffffff", type: "argentina" };
  }
  if (country === "Portugal") {
    return { base: "#006600", accent: "#ff0000", type: "portugal" };
  }
  if (country === "Brunei") {
    return { base: "#f7e017", accent: "#ffffff", type: "brunei" };
  }

  return { base: "#ffffff", accent: "#bf0a30", type: "us" };
};

const FlagFallback: React.FC<{ country: string }> = ({ country }) => {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 900;
    canvas.height = 600;

    const context = canvas.getContext("2d");
    if (!context) {
      return null;
    }

    const flag = getFallbackFlag(country);
    context.fillStyle = flag.base;
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (flag.type === "circle") {
      context.fillStyle = flag.accent;
      context.beginPath();
      context.arc(canvas.width / 2, canvas.height / 2, 145, 0, Math.PI * 2);
      context.fill();
    } else if (flag.type === "stripe") {
      context.fillStyle = flag.accent;
      context.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);
    } else if (flag.type === "tricolor") {
      context.fillStyle = "#006a44";
      context.fillRect(0, canvas.height / 3, canvas.width, canvas.height / 3);
      context.fillStyle = flag.accent;
      context.fillRect(0, (canvas.height / 3) * 2, canvas.width, canvas.height / 3);
    } else if (flag.type === "sweden") {
      context.fillStyle = flag.accent;
      context.fillRect(canvas.width * 0.31, 0, canvas.width * 0.12, canvas.height);
      context.fillRect(0, canvas.height * 0.42, canvas.width, canvas.height * 0.16);
    } else if (flag.type === "uk") {
      context.strokeStyle = "#ffffff";
      context.lineWidth = 116;
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(canvas.width, canvas.height);
      context.moveTo(canvas.width, 0);
      context.lineTo(0, canvas.height);
      context.stroke();

      context.strokeStyle = flag.accent;
      context.lineWidth = 58;
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(canvas.width, canvas.height);
      context.moveTo(canvas.width, 0);
      context.lineTo(0, canvas.height);
      context.stroke();

      context.fillStyle = "#ffffff";
      context.fillRect(canvas.width * 0.42, 0, canvas.width * 0.16, canvas.height);
      context.fillRect(0, canvas.height * 0.38, canvas.width, canvas.height * 0.24);
      context.fillStyle = flag.accent;
      context.fillRect(canvas.width * 0.455, 0, canvas.width * 0.09, canvas.height);
      context.fillRect(0, canvas.height * 0.435, canvas.width, canvas.height * 0.13);
    } else if (flag.type === "korea") {
      context.fillStyle = "#003478";
      context.beginPath();
      context.arc(canvas.width / 2, canvas.height / 2, 120, 0, Math.PI);
      context.fill();
      context.fillStyle = flag.accent;
      context.beginPath();
      context.arc(canvas.width / 2, canvas.height / 2, 120, Math.PI, Math.PI * 2);
      context.fill();
      context.fillStyle = flag.accent;
      context.beginPath();
      context.arc(canvas.width / 2 - 60, canvas.height / 2, 60, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = "#003478";
      context.beginPath();
      context.arc(canvas.width / 2 + 60, canvas.height / 2, 60, 0, Math.PI * 2);
      context.fill();

      context.fillStyle = "#111111";
      const drawBar = (x: number, y: number, rotation: number) => {
        context.save();
        context.translate(x, y);
        context.rotate(rotation);
        context.fillRect(-78, -10, 156, 20);
        context.fillRect(-78, -46, 156, 20);
        context.fillRect(-78, 26, 156, 20);
        context.restore();
      };

      drawBar(210, 155, -0.55);
      drawBar(690, 445, -0.55);
      drawBar(690, 155, 0.55);
      drawBar(210, 445, 0.55);
    } else if (flag.type === "norway") {
      // Norway: red base, white+blue Nordic cross
      context.fillStyle = "#ffffff";
      context.fillRect(canvas.width * 0.28, 0, canvas.width * 0.16, canvas.height);
      context.fillRect(0, canvas.height * 0.38, canvas.width, canvas.height * 0.24);
      context.fillStyle = flag.accent;
      context.fillRect(canvas.width * 0.315, 0, canvas.width * 0.09, canvas.height);
      context.fillRect(0, canvas.height * 0.42, canvas.width, canvas.height * 0.16);
    } else if (flag.type === "mexico") {
      // Mexico: green | white | red vertical tricolor
      context.fillStyle = "#ffffff";
      context.fillRect(canvas.width / 3, 0, canvas.width / 3, canvas.height);
      context.fillStyle = flag.accent;
      context.fillRect((canvas.width / 3) * 2, 0, canvas.width / 3, canvas.height);
      // Simple eagle emblem (dark circle in center)
      context.fillStyle = "#5c3d11";
      context.beginPath();
      context.arc(canvas.width / 2, canvas.height / 2, 80, 0, Math.PI * 2);
      context.fill();
    } else if (flag.type === "canada") {
      // Canada: red | white | red, maple leaf
      context.fillStyle = flag.accent; // white center
      context.fillRect(canvas.width * 0.25, 0, canvas.width * 0.5, canvas.height);
      context.fillStyle = flag.base; // red sides
      context.fillRect(0, 0, canvas.width * 0.25, canvas.height);
      context.fillRect(canvas.width * 0.75, 0, canvas.width * 0.25, canvas.height);
      // Simple maple leaf: red 11-point star approximation using lines
      context.fillStyle = flag.base;
      const cx = canvas.width / 2, cy = canvas.height / 2;
      context.beginPath();
      for (let p = 0; p < 11; p++) {
        const outerR = 130, innerR = 55;
        const angle = (p * Math.PI * 2) / 11 - Math.PI / 2;
        const midAngle = angle + Math.PI / 11;
        if (p === 0) context.moveTo(cx + outerR * Math.cos(angle), cy + outerR * Math.sin(angle));
        else context.lineTo(cx + outerR * Math.cos(angle), cy + outerR * Math.sin(angle));
        context.lineTo(cx + innerR * Math.cos(midAngle), cy + innerR * Math.sin(midAngle));
      }
      context.closePath();
      context.fill();
    } else if (flag.type === "india") {
      // India: saffron | white | green horizontal stripes + Ashoka Chakra
      context.fillStyle = "#ffffff";
      context.fillRect(0, canvas.height / 3, canvas.width, canvas.height / 3);
      context.fillStyle = flag.accent; // green bottom
      context.fillRect(0, (canvas.height / 3) * 2, canvas.width, canvas.height / 3);
      // Ashoka Chakra (navy blue circle with spokes)
      context.fillStyle = "#000080";
      context.beginPath();
      context.arc(canvas.width / 2, canvas.height / 2, 80, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = "#ffffff";
      context.beginPath();
      context.arc(canvas.width / 2, canvas.height / 2, 60, 0, Math.PI * 2);
      context.fill();
      context.strokeStyle = "#000080";
      context.lineWidth = 8;
      for (let s = 0; s < 24; s++) {
        const a = (s * Math.PI * 2) / 24;
        context.beginPath();
        context.moveTo(canvas.width / 2, canvas.height / 2);
        context.lineTo(canvas.width / 2 + 58 * Math.cos(a), canvas.height / 2 + 58 * Math.sin(a));
        context.stroke();
      }
      context.fillStyle = "#000080";
      context.beginPath();
      context.arc(canvas.width / 2, canvas.height / 2, 16, 0, Math.PI * 2);
      context.fill();
    } else if (flag.type === "uae") {
      // Red left stripe | Green top | White middle | Black bottom
      context.fillStyle = "#ff0000";
      context.fillRect(0, 0, canvas.width * 0.25, canvas.height);
      context.fillStyle = "#ffffff";
      context.fillRect(canvas.width * 0.25, canvas.height / 3, canvas.width * 0.75, canvas.height / 3);
      context.fillStyle = "#000000";
      context.fillRect(canvas.width * 0.25, (canvas.height / 3) * 2, canvas.width * 0.75, canvas.height / 3);
    } else if (flag.type === "malaysia") {
      // 14 red & white stripes + blue canton + yellow crescent & star
      for (let i = 0; i < 14; i++) {
        context.fillStyle = i % 2 === 0 ? "#cc0001" : "#ffffff";
        context.fillRect(0, (canvas.height / 14) * i, canvas.width, canvas.height / 14);
      }
      context.fillStyle = "#010066";
      context.fillRect(0, 0, canvas.width * 0.5, canvas.height * 0.5);
      context.fillStyle = "#ffcc00";
      context.beginPath();
      context.arc(canvas.width * 0.2, canvas.height * 0.25, 85, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = "#010066";
      context.beginPath();
      context.arc(canvas.width * 0.25, canvas.height * 0.22, 68, 0, Math.PI * 2);
      context.fill();
    } else if (flag.type === "saudi") {
      // Green + white Arabic text (simplified) + sword
      context.fillStyle = flag.accent;
      context.fillRect(canvas.width * 0.1, canvas.height * 0.35, canvas.width * 0.8, canvas.height * 0.12);
      context.fillRect(canvas.width * 0.25, canvas.height * 0.47, canvas.width * 0.5, canvas.height * 0.18);
      context.fillRect(canvas.width * 0.2, canvas.height * 0.62, canvas.width * 0.6, canvas.height * 0.08);
    } else if (flag.type === "finland") {
      // White + blue Nordic cross
      context.fillStyle = flag.accent;
      context.fillRect(canvas.width * 0.28, 0, canvas.width * 0.16, canvas.height);
      context.fillRect(0, canvas.height * 0.38, canvas.width, canvas.height * 0.24);
    } else if (flag.type === "singapore") {
      // Red top | White bottom + crescent + stars
      context.fillStyle = flag.accent;
      context.fillRect(0, 0, canvas.width, canvas.height / 2);
      // Crescent moon
      context.fillStyle = flag.base;
      context.beginPath();
      context.arc(canvas.width * 0.22, canvas.height * 0.28, 80, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = flag.accent;
      context.beginPath();
      context.arc(canvas.width * 0.28, canvas.height * 0.25, 64, 0, Math.PI * 2);
      context.fill();
      // 5 small stars
      context.fillStyle = flag.base;
      const starPoints = [[0.44,0.12],[0.52,0.22],[0.48,0.35],[0.36,0.35],[0.32,0.22]];
      for (const [sx, sy] of starPoints) {
        context.beginPath();
        for (let p = 0; p < 5; p++) {
          const a = (p * 4 * Math.PI) / 5 - Math.PI / 2;
          const x = canvas.width * sx + 22 * Math.cos(a);
          const y = canvas.height * sy + 22 * Math.sin(a);
          p === 0 ? context.moveTo(x, y) : context.lineTo(x, y);
        }
        context.closePath();
        context.fill();
      }
    } else if (flag.type === "israel") {
      // White + two blue stripes + Star of David
      context.fillStyle = flag.accent;
      context.fillRect(0, canvas.height * 0.18, canvas.width, canvas.height * 0.13);
      context.fillRect(0, canvas.height * 0.69, canvas.width, canvas.height * 0.13);
      // Star of David
      const scx = canvas.width / 2, scy = canvas.height / 2, sr = 90;
      context.strokeStyle = flag.accent;
      context.lineWidth = 18;
      context.beginPath();
      for (let p = 0; p < 3; p++) {
        const a = (p * Math.PI * 2) / 3 - Math.PI / 2;
        const a2 = a + Math.PI / 3 * 2;
        context.moveTo(scx + sr * Math.cos(a), scy + sr * Math.sin(a));
        context.lineTo(scx + sr * Math.cos(a + Math.PI * 2 / 3), scy + sr * Math.sin(a + Math.PI * 2 / 3));
      }
      context.stroke();
      context.beginPath();
      for (let p = 0; p < 3; p++) {
        const a = (p * Math.PI * 2) / 3 - Math.PI / 2 + Math.PI;
        context.moveTo(scx + sr * Math.cos(a), scy + sr * Math.sin(a));
        context.lineTo(scx + sr * Math.cos(a + Math.PI * 2 / 3), scy + sr * Math.sin(a + Math.PI * 2 / 3));
      }
      context.stroke();
    } else if (flag.type === "china") {
      // Red + large yellow star + 4 small stars
      context.fillStyle = flag.accent;
      context.beginPath();
      for (let p = 0; p < 5; p++) {
        const a = (p * 4 * Math.PI) / 5 - Math.PI / 2;
        const x = canvas.width * 0.25 + 110 * Math.cos(a);
        const y = canvas.height * 0.35 + 110 * Math.sin(a);
        p === 0 ? context.moveTo(x, y) : context.lineTo(x, y);
      }
      context.closePath();
      context.fill();
      const smallStars = [[0.45,0.14],[0.52,0.23],[0.52,0.38],[0.45,0.47]];
      for (const [sx, sy] of smallStars) {
        context.beginPath();
        for (let p = 0; p < 5; p++) {
          const a = (p * 4 * Math.PI) / 5 - Math.PI / 2;
          const x = canvas.width * sx + 38 * Math.cos(a);
          const y = canvas.height * sy + 38 * Math.sin(a);
          p === 0 ? context.moveTo(x, y) : context.lineTo(x, y);
        }
        context.closePath();
        context.fill();
      }
    } else if (flag.type === "france") {
      // Blue | White | Red vertical tricolor
      context.fillStyle = "#ffffff";
      context.fillRect(canvas.width / 3, 0, canvas.width / 3, canvas.height);
      context.fillStyle = flag.accent;
      context.fillRect((canvas.width / 3) * 2, 0, canvas.width / 3, canvas.height);
    } else if (flag.type === "belgium") {
      // Black | Yellow | Red vertical tricolor
      context.fillStyle = "#f4d200";
      context.fillRect(canvas.width / 3, 0, canvas.width / 3, canvas.height);
      context.fillStyle = flag.accent;
      context.fillRect((canvas.width / 3) * 2, 0, canvas.width / 3, canvas.height);
    } else if (flag.type === "ivory_coast") {
      // Orange | White | Green vertical tricolor
      context.fillStyle = "#ffffff";
      context.fillRect(canvas.width / 3, 0, canvas.width / 3, canvas.height);
      context.fillStyle = flag.accent;
      context.fillRect((canvas.width / 3) * 2, 0, canvas.width / 3, canvas.height);
    } else if (flag.type === "england") {
      // St George's Cross: white bg + red cross
      context.fillStyle = flag.accent;
      context.fillRect(canvas.width * 0.44, 0, canvas.width * 0.12, canvas.height);
      context.fillRect(0, canvas.height * 0.42, canvas.width, canvas.height * 0.16);
    } else if (flag.type === "wales") {
      // White top | Green bottom
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height / 2);
    } else if (flag.type === "brazil") {
      // Green bg + yellow diamond + blue circle + white stripe
      const bcx = canvas.width / 2, bcy = canvas.height / 2;
      context.fillStyle = flag.accent;
      context.beginPath();
      context.moveTo(bcx, bcy - 230);
      context.lineTo(bcx + 410, bcy);
      context.lineTo(bcx, bcy + 230);
      context.lineTo(bcx - 410, bcy);
      context.closePath();
      context.fill();
      context.fillStyle = "#002776";
      context.beginPath();
      context.arc(bcx, bcy, 142, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = "#ffffff";
      context.fillRect(bcx - 142, bcy - 12, 284, 24);
    } else if (flag.type === "argentina") {
      // Light blue | white | light blue horizontal stripes + sun
      context.fillStyle = flag.accent;
      context.fillRect(0, canvas.height / 3, canvas.width, canvas.height / 3);
      const acx = canvas.width / 2, acy = canvas.height / 2;
      context.fillStyle = "#f6b40e";
      context.beginPath();
      context.arc(acx, acy, 72, 0, Math.PI * 2);
      context.fill();
      context.strokeStyle = "#f6b40e";
      context.lineWidth = 15;
      for (let i = 0; i < 16; i++) {
        const a = (i * Math.PI * 2) / 16;
        context.beginPath();
        context.moveTo(acx + 80 * Math.cos(a), acy + 80 * Math.sin(a));
        context.lineTo(acx + 145 * Math.cos(a), acy + 145 * Math.sin(a));
        context.stroke();
      }
    } else if (flag.type === "portugal") {
      // Green (40%) | Red (60%) vertical
      context.fillStyle = flag.accent;
      context.fillRect(canvas.width * 0.38, 0, canvas.width * 0.62, canvas.height);
      // Simple shield emblem
      context.fillStyle = "#ffcc00";
      context.beginPath();
      context.arc(canvas.width * 0.38, canvas.height / 2, 55, 0, Math.PI * 2);
      context.fill();
    } else if (flag.type === "brunei") {
      // Yellow bg + white upper diagonal band + black lower diagonal band
      context.fillStyle = flag.accent;
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(canvas.width, 0);
      context.lineTo(canvas.width, canvas.height * 0.32);
      context.lineTo(0, canvas.height * 0.48);
      context.closePath();
      context.fill();
      context.fillStyle = "#000000";
      context.beginPath();
      context.moveTo(0, canvas.height * 0.52);
      context.lineTo(canvas.width, canvas.height * 0.36);
      context.lineTo(canvas.width, canvas.height * 0.58);
      context.lineTo(0, canvas.height * 0.74);
      context.closePath();
      context.fill();
    } else {
      for (let i = 0; i < 13; i++) {
        context.fillStyle = i % 2 === 0 ? flag.accent : "#ffffff";
        context.fillRect(0, (canvas.height / 13) * i, canvas.width, canvas.height / 13);
      }
      context.fillStyle = "#002868";
      context.fillRect(0, 0, canvas.width * 0.42, canvas.height * 0.54);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, [country]);

  if (!texture) {
    return null;
  }

  return (
    <mesh>
      <planeGeometry args={[1.46, 0.95]} />
      <meshStandardMaterial map={texture} side={THREE.DoubleSide} roughness={0.35} />
    </mesh>
  );
};

const FlagPlane: React.FC<{ url: string; country: string }> = ({ url, country }) => {
  const texture = useTextureWithFallback(url);

  if (!url || !texture) {
    return <FlagFallback country={country} />;
  }

  return (
    <mesh>
      <planeGeometry args={[1.46, 0.95]} />
      <meshStandardMaterial map={texture} side={THREE.DoubleSide} roughness={0.3} transparent />
    </mesh>
  );
};

const wrapCanvasText = (
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines = 3,
) => {
  const manualLines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (manualLines.length > 1) {
    return manualLines.slice(0, maxLines);
  }

  const words = text.split(" ");
  const layouts: string[][] = [];

  const buildLayouts = (start: number, current: string[]) => {
    if (start >= words.length) {
      layouts.push(current);
      return;
    }

    if (current.length >= maxLines) {
      return;
    }

    for (let end = start + 1; end <= words.length; end++) {
      const line = words.slice(start, end).join(" ");
      if (context.measureText(line).width > maxWidth && end > start + 1) {
        break;
      }
      buildLayouts(end, [...current, line]);
    }
  };

  buildLayouts(0, []);

  const fittingLayouts = layouts.filter((lines) =>
    lines.every((line) => context.measureText(line).width <= maxWidth),
  );

  if (fittingLayouts.length > 0) {
    return fittingLayouts.sort((a, b) => {
      const widthA = Math.max(...a.map((line) => context.measureText(line).width));
      const widthB = Math.max(...b.map((line) => context.measureText(line).width));
      const balanceA =
        Math.max(...a.map((line) => context.measureText(line).width)) -
        Math.min(...a.map((line) => context.measureText(line).width));
      const balanceB =
        Math.max(...b.map((line) => context.measureText(line).width)) -
        Math.min(...b.map((line) => context.measureText(line).width));

      const shortLinePenaltyA = a.some((line) => line === "The" || line === "A") ? 1000 : 0;
      const shortLinePenaltyB = b.some((line) => line === "The" || line === "A") ? 1000 : 0;
      const scoreA = widthA + balanceA * 0.2 + a.length * 190 + shortLinePenaltyA;
      const scoreB = widthB + balanceB * 0.2 + b.length * 190 + shortLinePenaltyB;

      return scoreA - scoreB;
    })[0];
  }

  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;
    if (context.measureText(testLine).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = testLine;
    }
  }

  if (line) {
    lines.push(line);
  }

  const visibleLines = lines.slice(0, maxLines);
  if (lines.length > maxLines) {
    const lastLine = visibleLines[visibleLines.length - 1] ?? "";
    let clippedLine = `${lastLine}...`;
    while (context.measureText(clippedLine).width > maxWidth && clippedLine.length > 4) {
      clippedLine = `${clippedLine.slice(0, -4)}...`;
    }
    visibleLines[visibleLines.length - 1] = clippedLine;
  }

  return visibleLines;
};

const getFittedFontSize = (
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number,
  preferredSize: number,
) => {
  for (let size = preferredSize; size >= 50; size -= 3) {
    context.font = `700 ${size}px Arial, sans-serif`;
    const lines = wrapCanvasText(context, text, maxWidth, maxLines);
    if (
      lines.length <= maxLines &&
      lines.every((line) => context.measureText(line).width <= maxWidth)
    ) {
      return { size, lines };
    }
  }

  context.font = "700 50px Arial, sans-serif";
  return { size: 50, lines: wrapCanvasText(context, text, maxWidth, maxLines) };
};

const TextPlane: React.FC<{
  text: string;
  width: number;
  height: number;
  color: string;
  fontSize: number;
  weight?: number;
  maxLines?: number;
  renderOnTop?: boolean;
  opacity?: number;
}> = ({ text, width, height, color, fontSize, weight = 700, maxLines = 2, renderOnTop = false, opacity = 1 }) => {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;

    const context = canvas.getContext("2d");
    if (!context) {
      return null;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    const maxTextWidth = canvas.width * 0.92;
    const fitted =
      weight >= 700
        ? getFittedFontSize(context, text, maxTextWidth, maxLines, fontSize)
        : { size: fontSize, lines: wrapCanvasText(context, text, maxTextWidth) };

    context.font = `${weight} ${fitted.size}px Arial, sans-serif`;

    const lines = fitted.lines;
    const lineHeight = fitted.size * (lines.length >= 3 ? 0.9 : 1.02);
    const startY = canvas.height / 2 - ((lines.length - 1) * lineHeight) / 2;

    lines.forEach((lineText, index) => {
      context.fillText(lineText, canvas.width / 2, startY + index * lineHeight);
    });

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, [color, fontSize, maxLines, text, weight]);

  if (!texture) {
    return null;
  }

  return (
    <mesh renderOrder={renderOnTop ? 20 : 0}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        toneMapped={false}
        depthTest={!renderOnTop}
        depthWrite={false}
      />
    </mesh>
  );
};

const formatTitle = (title: string) => {
  const words = title.split(" ");

  if (words.length <= 2 && title.length <= 16) {
    return title;
  }

  if (title === "The Elder Scrolls V: Skyrim") {
    return "The Elder\nScrolls V:\nSkyrim";
  }

  if (title === "The Witcher 3: Wild Hunt") {
    return "The Witcher 3:\nWild Hunt";
  }

  if (title.includes(":")) {
    const [beforeColon, afterColon] = title.split(":");
    if (afterColon && beforeColon.length > 12) {
      return `${beforeColon.trim()}:\n${afterColon.trim()}`;
    }
  }

  if (words.length === 3) {
    return `${words.slice(0, 2).join(" ")}\n${words[2]}`;
  }

  if (words.length >= 4) {
    const splitPoint = Math.ceil(words.length / 2);
    return `${words.slice(0, splitPoint).join(" ")}\n${words.slice(splitPoint).join(" ")}`;
  }

  return title;
};

const getPedestalTheme = (rank: number) => {
  if (rank === 1) return { body: "#e8c020", emissive: "#c87800", emissiveIntensity: 0.5, roughness: 0.08, metalness: 0.90, banner: "#8a6000" };
  if (rank === 2) return { body: "#c8d4e8", emissive: "#6080b0", emissiveIntensity: 0.4, roughness: 0.10, metalness: 0.88, banner: "#4a5878" };
  if (rank === 3) return { body: "#d4803a", emissive: "#a04000", emissiveIntensity: 0.45, roughness: 0.12, metalness: 0.85, banner: "#7a3c10" };
  return { body: "#4d8df4", emissive: "#000000", emissiveIntensity: 0.0, roughness: 0.13, metalness: 0.35, banner: "#8262df" };
};

export const GamePedestal: React.FC<Props> = ({
  position,
  rank,
  title,
  sales,
  country,
  coverUrl,
  flagUrl,
  pedestalHeight = 4,
  revealProgress = 1,
  displaySales,
  coverBounceScale = 1,
  salesUnit = "€M",
}) => {
  const rawVal = displaySales ?? sales;
  const salesStr = salesUnit === "$B"
    ? `$${(rawVal / 1000).toFixed(rawVal >= 1000 && rawVal % 1000 === 0 ? 0 : 1)}B`
    : salesUnit === "goals"
    ? `${rawVal} goals`
    : salesUnit === "Mviews"
    ? `${rawVal}M`
    : salesUnit === "m"
    ? `${rawVal}m`
    : salesUnit === "$M"
    ? `$${rawVal}M`
    : `€${rawVal}M`;
  const rankStr = `#${rank}`;
  const displayTitle = formatTitle(title);

  const pedestalW = 2.1;
  const pedestalD = 1.32;
  const titleY = Math.max(2.1, pedestalHeight - 1.45);
  const salesY = Math.max(1.05, pedestalHeight - 2.65);
  const rankY = Math.max(0.46, pedestalHeight - 3.38);
  const flagY = Math.max(1.2, pedestalHeight - 2.15);
  const theme = getPedestalTheme(rank);

  return (
    <group position={position}>
      <RoundedBox
        args={[pedestalW, pedestalHeight, pedestalD]}
        radius={0.16}
        smoothness={5}
        position={[0, pedestalHeight / 2, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={theme.body} emissive={theme.emissive} emissiveIntensity={theme.emissiveIntensity} roughness={theme.roughness} metalness={theme.metalness} envMapIntensity={1.6} />
      </RoundedBox>

      <mesh position={[-pedestalW / 2 + 0.12, pedestalHeight / 2, pedestalD / 2 + 0.025]}>
        <planeGeometry args={[0.16, pedestalHeight - 0.25]} />
        <meshBasicMaterial color="#a8c9ff" transparent opacity={0.08} />
      </mesh>
      <mesh position={[pedestalW / 2 - 0.18, pedestalHeight / 2, pedestalD / 2 + 0.03]}>
        <planeGeometry args={[0.18, pedestalHeight - 0.35]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>

      <RoundedBox
        args={[pedestalW - 0.24, 0.96, 0.16]}
        radius={0.055}
        smoothness={4}
        position={[0, titleY, pedestalD / 2 + 0.075]}
        castShadow
      >
        <meshStandardMaterial color={theme.banner} transparent opacity={revealProgress} depthWrite={false} roughness={0.45} metalness={0.15} />
      </RoundedBox>
      <group position={[0, titleY, pedestalD / 2 + 0.3]}>
        <TextPlane
          text={displayTitle}
          width={1.9}
          height={0.86}
          color="#f4efff"
          fontSize={96}
          weight={800}
          maxLines={3}
          renderOnTop
          opacity={revealProgress}
        />
      </group>

      <group position={[0, salesY, pedestalD / 2 + 0.11]}>
        <TextPlane text={salesStr} width={1.82} height={0.62} color="#f0e020" fontSize={200} weight={800} maxLines={1} />
      </group>

      <group position={[0, rankY, pedestalD / 2 + 0.11]}>
        <TextPlane text={rankStr} width={1.3} height={0.40} color="#e8eaf6" fontSize={150} weight={800} maxLines={1} />
      </group>

      <group position={[0, pedestalHeight + 0.88, 0]} scale={[coverBounceScale, coverBounceScale, coverBounceScale]}>
        <mesh>
          <boxGeometry args={[1.46, 2.05, 0.1]} />
          <meshStandardMaterial color="#d7d8df" transparent opacity={revealProgress} depthWrite={false} roughness={0.25} metalness={0.5} />
        </mesh>
        <group position={[0, 0, 0.06]}>
          <CoverPlane url={coverUrl} title={title} opacity={revealProgress} />
        </group>
      </group>

      {/* Flag group anchored at Y=0 so pole extends from ground up to flagY */}
      <group position={[pedestalW / 2 + 0.15, 0, pedestalD / 2 + 0.14]}>
        {/* Thin cylindrical pole from ground to top */}
        <mesh position={[0, (flagY + 0.5) / 2, 0]}>
          <cylinderGeometry args={[0.04, 0.05, flagY + 0.5, 10]} />
          <meshStandardMaterial color="#b8bcc4" roughness={0.22} metalness={0.70} />
        </mesh>
        {/* Ball finial on top of pole */}
        <mesh position={[0, flagY + 0.5, 0]}>
          <sphereGeometry args={[0.075, 10, 10]} />
          <meshStandardMaterial color="#d4d6dc" roughness={0.18} metalness={0.75} />
        </mesh>
        {/* Flag plane — left edge aligned to pole */}
        <group position={[0.75, flagY, 0.05]}>
          <FlagPlane url={flagUrl} country={country} />
        </group>
      </group>
    </group>
  );
};
