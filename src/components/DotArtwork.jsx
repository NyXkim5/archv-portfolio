import React from "react";
import { useTheme } from "./ThemeProvider.jsx";

/**
 * DotArtwork (borderless)
 * - Pure SVG dot grid; no outer frame, no background block, no strokes.
 * - Dark mode: a dense dotted field with organic HOLES (punched out).
 * - Light mode: clustered "islands" of dots forming an organic cloud.
 *
 * Props:
 *   sizePx?: number  → rendered CSS width, defaults to 720, keeps 4:3 aspect
 */
export default function DotArtwork({ sizePx = 720 }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // monochrome/silver tones
  const dotColor = isDark ? "#D6D7DB" : "#6C6C74";

  // denser grid than before
  const step = 8; // distance between dot centers
  const r = 1.35; // dot radius

  // artboard
  const W = 640;
  const H = 480;

  // organic shapes
  const holes = [
    // large central negative space + satellites (dark mode)
    { cx: 285, cy: 230, r: 100 },
    { cx: 380, cy: 210, r: 60 },
    { cx: 340, cy: 300, r: 46 },
    { cx: 455, cy: 280, r: 70 },
    { cx: 490, cy: 200, r: 32 },
    { cx: 525, cy: 245, r: 38 },
    { cx: 245, cy: 310, r: 34 },
    { cx: 195, cy: 265, r: 38 },
    { cx: 165, cy: 210, r: 26 },
  ];

  const islands = [
    // clustered positive dots (light mode)
    { cx: 320, cy: 245, r: 120 },
    { cx: 420, cy: 255, r: 72 },
    { cx: 250, cy: 265, r: 62 },
    { cx: 205, cy: 220, r: 34 },
    { cx: 485, cy: 220, r: 36 },
    { cx: 365, cy: 320, r: 44 },
    { cx: 285, cy: 330, r: 30 },
    { cx: 520, cy: 270, r: 28 },
    { cx: 180, cy: 325, r: 22 },
  ];

  return (
    <div
      aria-hidden
      className="mx-auto my-6 md:my-10"
      style={{
        width: sizePx,
        maxWidth: "92vw",
        aspectRatio: `${W}/${H}`, // responsive height
      }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="100%"
        style={{ display: "block" }} // transparent background, no borders
      >
        <defs>
          {/* the repeating dot */}
          <pattern
            id="dotPattern"
            x="0"
            y="0"
            width={step}
            height={step}
            patternUnits="userSpaceOnUse"
          >
            <circle cx={step / 2} cy={step / 2} r={r} fill={dotColor} />
          </pattern>

          {/* mask that removes holes from a full dotted field (dark) */}
          <mask id="holesMask">
            {/* white = keep, black = cut out */}
            <rect x="0" y="0" width={W} height={H} fill="white" />
            {holes.map((h, i) => (
              <circle key={i} cx={h.cx} cy={h.cy} r={h.r} fill="black" />
            ))}
          </mask>
        </defs>

        {/* DARK: full field of dots with organic holes punched out */}
        {isDark ? (
          <rect
            x="0"
            y="0"
            width={W}
            height={H}
            fill="url(#dotPattern)"
            mask="url(#holesMask)"
          />
        ) : (
          // LIGHT: several dotted islands (no outer border)
          islands.map((c, i) => (
            <circle
              key={i}
              cx={c.cx}
              cy={c.cy}
              r={c.r}
              fill="url(#dotPattern)"
            />
          ))
        )}
      </svg>
    </div>
  );
}
