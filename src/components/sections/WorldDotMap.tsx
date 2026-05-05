"use client";

/**
 * Hero-panel "constellation" world map for the export brand.
 * Continent shapes are suggested by small dots (not real geography),
 * India is a glowing hub, and dashed arcs animate outward to global hub
 * points — communicating "from India to the world" without claiming
 * specific destinations served.
 *
 * Pure SVG + CSS, no external map data, ~5 KB.
 */

// Coords on a 1000×600 viewBox. Hand-placed to suggest continent silhouettes.
const continentDots: [number, number][] = [
  // North America
  [160, 130], [185, 140], [205, 130], [225, 145], [180, 165], [200, 165],
  [220, 180], [165, 185], [190, 200], [215, 215], [235, 200], [240, 175],
  [180, 220], [155, 165], [205, 250], [225, 240],
  // Central America
  [240, 270], [255, 285],
  // South America
  [275, 320], [290, 340], [285, 365], [298, 388], [310, 405], [305, 430],
  [295, 450], [285, 470], [275, 460],
  // Europe
  [490, 130], [505, 120], [520, 135], [500, 150], [515, 155], [535, 130],
  [475, 145], [488, 165], [510, 175],
  // Africa
  [510, 220], [525, 240], [540, 230], [528, 260], [548, 280], [535, 305],
  [550, 325], [565, 305], [575, 335], [560, 355], [545, 380], [530, 285],
  [520, 270], [555, 240],
  // Middle East
  [600, 220], [615, 235], [625, 220],
  // South Asia (India region — anchored by hub at 700,230)
  [685, 210], [712, 215], [685, 250], [710, 250], [705, 270],
  // Russia / Central Asia
  [620, 130], [660, 125], [700, 130], [740, 135], [780, 140], [820, 135],
  [600, 155], [650, 160], [700, 165], [750, 170],
  // East Asia
  [790, 180], [810, 195], [830, 180], [800, 215], [820, 220], [840, 200],
  // SE Asia
  [790, 295], [810, 310], [800, 330], [820, 320], [785, 280],
  // Indonesia
  [810, 360], [830, 370], [850, 365], [875, 360],
  // Australia
  [855, 405], [875, 415], [895, 410], [890, 430], [870, 435], [905, 425],
  // New Zealand
  [935, 445], [945, 460],
];

interface Hub {
  name: string;
  x: number;
  y: number;
  /** Stagger delay for the arc draw animation, in seconds. */
  delay: number;
}

const INDIA = { x: 700, y: 230 };

const hubs: Hub[] = [
  { name: "Dubai",     x: 620, y: 240, delay: 0 },
  { name: "London",    x: 510, y: 145, delay: 0.6 },
  { name: "Singapore", x: 800, y: 310, delay: 1.2 },
  { name: "New York",  x: 195, y: 165, delay: 1.8 },
  { name: "Sydney",    x: 885, y: 420, delay: 2.4 },
];

/** Build a quadratic Bezier path from India to a hub, bowed slightly outward. */
function arcPath(toX: number, toY: number): string {
  const fromX = INDIA.x;
  const fromY = INDIA.y;
  const midX = (fromX + toX) / 2;
  const midY = (fromY + toY) / 2;
  const dx = toX - fromX;
  const dy = toY - fromY;
  const len = Math.sqrt(dx * dx + dy * dy);
  // Perpendicular offset so arcs bow upward (negative Y in SVG = up).
  const offset = Math.min(60, len * 0.18);
  const perpX = -dy / len;
  const perpY = dx / len;
  // Bow above the straight line for readability.
  const ctrlX = midX + perpX * offset * (toY > fromY ? -1 : 1);
  const ctrlY = midY + perpY * offset * (toY > fromY ? -1 : 1);
  return `M ${fromX} ${fromY} Q ${ctrlX} ${ctrlY} ${toX} ${toY}`;
}

export function WorldDotMap() {
  return (
    <svg
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      {/* Continent constellation — dots suggesting landmasses */}
      <g className="text-white/40 fill-current">
        {continentDots.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="1.6" />
        ))}
      </g>

      {/* Animated arcs from India to each hub */}
      <g
        fill="none"
        strokeLinecap="round"
        className="text-gold/70"
        stroke="currentColor"
      >
        {hubs.map((hub) => (
          <path
            key={hub.name}
            d={arcPath(hub.x, hub.y)}
            strokeWidth="1"
            strokeDasharray="4 5"
            className="origin-center"
            style={{
              animation: `arc-draw 6s ${hub.delay}s ease-in-out infinite`,
              strokeDashoffset: 600,
            }}
          />
        ))}
      </g>

      {/* Hub destination dots */}
      <g className="text-gold fill-current">
        {hubs.map((hub) => (
          <g key={hub.name}>
            <circle
              cx={hub.x}
              cy={hub.y}
              r="2.5"
              style={{
                animation: `hub-pulse 3s ${hub.delay}s ease-in-out infinite`,
              }}
            />
          </g>
        ))}
      </g>

      {/* India — primary hub, glowing */}
      <g>
        <circle
          cx={INDIA.x}
          cy={INDIA.y}
          r="14"
          className="fill-gold"
          opacity="0.15"
          style={{ animation: "india-glow 2.8s ease-in-out infinite" }}
        />
        <circle
          cx={INDIA.x}
          cy={INDIA.y}
          r="8"
          className="fill-gold"
          opacity="0.35"
          style={{ animation: "india-glow 2.8s 0.4s ease-in-out infinite" }}
        />
        <circle cx={INDIA.x} cy={INDIA.y} r="4" className="fill-gold" />
      </g>
    </svg>
  );
}
