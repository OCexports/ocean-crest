"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  BackSide,
  BufferAttribute,
  BufferGeometry,
  Line,
  LineBasicMaterial,
  LineSegments,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  SphereGeometry,
  Vector3,
} from "three";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import type { Feature, MultiPolygon, Polygon } from "geojson";
import countriesTopologyRaw from "world-atlas/countries-110m.json";

/**
 * Hero centerpiece: a wireframe globe with live trade routes.
 *
 *  - Wireframe lat/long sphere + real country outlines (Natural Earth 1:110 m)
 *  - Mumbai = primary glowing hub; 8 destination ports as smaller gold pins
 *  - Each route is a permanent gold great-circle arc with a single bright
 *    pulse traveling end-to-end. Per-lane opacity variation gives the
 *    network a "live with mixed traffic" feel rather than uniform grid
 *  - One featured 3D aircraft flies the longest route (Mumbai → New York),
 *    smoothly looped, oriented along its velocity tangent
 *  - Globe rotates very slowly + responds to mouse parallax
 *  - Translucent ocean lets the radial glow behind the globe show through,
 *    so it reads as floating in open space, not pasted on a panel
 *
 * Performance:
 *  - Named imports (instead of `import * as THREE`) so bundlers tree-shake
 *    unused Three.js features.
 *  - Geometry segment counts tuned down (visually imperceptible).
 *  - Antialiasing + DPR scale down on touch devices — large GPU savings,
 *    no visible quality loss at phone DPI.
 *  - useFrame throttled to ~30 fps; this scene's animations don't need 60.
 *
 * SSR-safe via dynamic import in HeroSection.
 */

const GOLD = "#D4A64A";
const GOLD_BRIGHT = "#F4C75D";
const OCEAN = "#0B1D2A";
const COUNTRY_LINE = "#9DBFD7";
const GRID_LINE = "#3A6B95";
const HEAD_COLOR = "#FFFFFF";

/** Damping rate for mouse parallax — framerate-independent. */
const PARALLAX_LAMBDA = 5;

/** Animation tick budget. ~30 fps is plenty for slow rotation + pulses. */
const FRAME_INTERVAL = 1 / 30;

// Module-level reusable geometries (avoid recreating each render).
// 32 segments instead of 48 — visually identical at this camera distance,
// 30% fewer triangles per sphere.
const OCEAN_GEOMETRY = new SphereGeometry(1, 32, 32);
const HALO_INNER_GEOMETRY = new SphereGeometry(1, 24, 24);

interface City {
  name: string;
  lat: number;
  lng: number;
}

const ORIGIN: City = { name: "Mumbai", lat: 19.0, lng: 72.8 };

const HUBS: City[] = [
  { name: "Dubai (Jebel Ali)", lat: 25.0, lng: 55.1 },
  { name: "Singapore", lat: 1.27, lng: 103.85 },
  { name: "Rotterdam", lat: 51.95, lng: 4.14 },
  { name: "Hamburg", lat: 53.55, lng: 9.99 },
  { name: "Mombasa", lat: -4.04, lng: 39.66 },
  { name: "New York", lat: 40.66, lng: -74.04 },
  { name: "Santos", lat: -23.96, lng: -46.33 },
  { name: "Sydney", lat: -33.94, lng: 151.18 },
];

/** The single hero route that gets a 3D aircraft following it. */
const FEATURED_HUB_NAME = "New York";

/** Geographic lat/lng (degrees) → 3D unit-sphere position. */
function latLngToVec3(lat: number, lng: number, radius = 1): Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

/** Slerp + rise: great-circle arc that lifts off the sphere surface. */
function greatCircleArc(
  start: Vector3,
  end: Vector3,
  segments = 60,
  liftHeight = 0.18,
): Vector3[] {
  const points: Vector3[] = [];
  const angle = start.angleTo(end);
  const sinAngle = Math.sin(angle);
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const a = Math.sin((1 - t) * angle) / sinAngle;
    const b = Math.sin(t * angle) / sinAngle;
    const p = new Vector3(
      start.x * a + end.x * b,
      start.y * a + end.y * b,
      start.z * a + end.z * b,
    );
    const lift = Math.sin(t * Math.PI) * liftHeight;
    p.normalize().multiplyScalar(1 + lift);
    points.push(p);
  }
  return points;
}

/* ─── Country outlines from Natural Earth ─────────────────────────────── */

const countriesTopology = countriesTopologyRaw as unknown as Topology;
const countriesGeoJson = feature(
  countriesTopology,
  countriesTopology.objects.countries as Topology["objects"][string],
) as unknown as { features: Feature<Polygon | MultiPolygon>[] };

const countryLinePositions = (() => {
  const positions: number[] = [];
  for (const f of countriesGeoJson.features) {
    const geom = f.geometry;
    const polygons: number[][][][] =
      geom.type === "Polygon"
        ? [geom.coordinates as number[][][]]
        : geom.type === "MultiPolygon"
        ? (geom.coordinates as number[][][][])
        : [];
    for (const polygon of polygons) {
      for (const ring of polygon) {
        for (let i = 0; i < ring.length - 1; i++) {
          const [lng1, lat1] = ring[i];
          const [lng2, lat2] = ring[i + 1];
          const v1 = latLngToVec3(lat1, lng1, 1.003);
          const v2 = latLngToVec3(lat2, lng2, 1.003);
          positions.push(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
        }
      }
    }
  }
  return new Float32Array(positions);
})();

function Continents() {
  const lineObj = useMemo(() => {
    const geometry = new BufferGeometry();
    geometry.setAttribute(
      "position",
      new BufferAttribute(countryLinePositions, 3),
    );
    const material = new LineBasicMaterial({
      color: COUNTRY_LINE,
      transparent: true,
      opacity: 0.7,
      toneMapped: false,
    });
    return new LineSegments(geometry, material);
  }, []);
  return <primitive object={lineObj} />;
}

function Ocean() {
  // Translucent — lets the radial glow behind the canvas bleed through, so
  // the globe appears to float in open space rather than sitting on a card.
  return (
    <mesh geometry={OCEAN_GEOMETRY}>
      <meshBasicMaterial color={OCEAN} transparent opacity={0.92} />
    </mesh>
  );
}

function Atmosphere() {
  // Soft halo for depth — single inner band; the outer glow is drawn as a
  // CSS radial gradient by the parent (cheaper than a second sphere).
  return (
    <mesh scale={1.045} geometry={HALO_INNER_GEOMETRY}>
      <meshBasicMaterial
        color={GOLD_BRIGHT}
        transparent
        opacity={0.07}
        side={BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ─── Lat / long wireframe sphere ─────────────────────────────────────── */

const wireframePositions = (() => {
  const positions: number[] = [];
  // Was LATS 9, LNGS 18, SEG 64 → now 7/14/48. Same visual cadence at
  // this camera distance, ~25% fewer line segments.
  const LATS = 7;
  const LNGS = 14;
  const SEG = 48;

  for (let i = 1; i < LATS; i++) {
    const lat = -Math.PI / 2 + (i * Math.PI) / LATS;
    const r = Math.cos(lat);
    const y = Math.sin(lat);
    for (let j = 0; j < SEG; j++) {
      const lng1 = (j / SEG) * 2 * Math.PI;
      const lng2 = ((j + 1) / SEG) * 2 * Math.PI;
      positions.push(r * Math.cos(lng1), y, r * Math.sin(lng1));
      positions.push(r * Math.cos(lng2), y, r * Math.sin(lng2));
    }
  }
  for (let i = 0; i < LNGS; i++) {
    const lng = (i / LNGS) * 2 * Math.PI;
    for (let j = 0; j < SEG; j++) {
      const lat1 = -Math.PI / 2 + (j / SEG) * Math.PI;
      const lat2 = -Math.PI / 2 + ((j + 1) / SEG) * Math.PI;
      positions.push(
        Math.cos(lat1) * Math.cos(lng),
        Math.sin(lat1),
        Math.cos(lat1) * Math.sin(lng),
      );
      positions.push(
        Math.cos(lat2) * Math.cos(lng),
        Math.sin(lat2),
        Math.cos(lat2) * Math.sin(lng),
      );
    }
  }
  return new Float32Array(positions);
})();

function Wireframe() {
  const lineObj = useMemo(() => {
    const geometry = new BufferGeometry();
    geometry.setAttribute(
      "position",
      new BufferAttribute(wireframePositions, 3),
    );
    const material = new LineBasicMaterial({
      color: GRID_LINE,
      transparent: true,
      opacity: 0.28,
      toneMapped: false,
    });
    return new LineSegments(geometry, material);
  }, []);
  return <primitive object={lineObj} />;
}

/* ─── Hub markers ─────────────────────────────────────────────────────── */

// Reduced 12-segment marker spheres — at the camera distance these are
// 6-10 px on screen; 8 segments is plenty.
const MARKER_DOT_GEOMETRY_PRIMARY = new SphereGeometry(0.032, 8, 8);
const MARKER_HALO_GEOMETRY_PRIMARY = new SphereGeometry(0.075, 8, 8);
const MARKER_DOT_GEOMETRY = new SphereGeometry(0.022, 8, 8);
const MARKER_HALO_GEOMETRY = new SphereGeometry(0.05, 8, 8);

function HubMarker({
  position,
  isPrimary = false,
  pulseOffset = 0,
}: {
  position: Vector3;
  isPrimary?: boolean;
  pulseOffset?: number;
}) {
  const dotRef = useRef<Mesh>(null);
  const haloRef = useRef<Mesh>(null);
  const tickRef = useRef(0);

  useFrame((state, delta) => {
    tickRef.current += delta;
    if (tickRef.current < FRAME_INTERVAL) return;
    tickRef.current = 0;
    const t = state.clock.elapsedTime + pulseOffset;
    if (dotRef.current) {
      const s = 1 + Math.sin(t * 1.5) * (isPrimary ? 0.3 : 0.15);
      dotRef.current.scale.setScalar(s);
    }
    if (haloRef.current) {
      const s = 1 + Math.sin(t * 1.5 + Math.PI * 0.4) * 0.7;
      haloRef.current.scale.setScalar(s);
      const mat = haloRef.current.material as MeshBasicMaterial;
      mat.opacity = 0.36 - 0.26 * Math.sin(t * 1.5 + Math.PI * 0.4);
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={dotRef}
        geometry={isPrimary ? MARKER_DOT_GEOMETRY_PRIMARY : MARKER_DOT_GEOMETRY}
      >
        <meshBasicMaterial color={GOLD_BRIGHT} toneMapped={false} />
      </mesh>
      <mesh
        ref={haloRef}
        geometry={isPrimary ? MARKER_HALO_GEOMETRY_PRIMARY : MARKER_HALO_GEOMETRY}
      >
        <meshBasicMaterial
          color={GOLD_BRIGHT}
          transparent
          opacity={0.3}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* ─── Shipping lane: solid arc + single travelling pulse ──────────────── */

const PULSE_RADIUS = 0.018;
const pulseGeometry = new SphereGeometry(PULSE_RADIUS, 8, 8);
const pulseHaloGeometry = new SphereGeometry(PULSE_RADIUS, 8, 8);

function ShippingLane({
  start,
  end,
  laneOffset = 0,
  baseOpacity = 0.55,
}: {
  start: Vector3;
  end: Vector3;
  laneOffset?: number;
  baseOpacity?: number;
}) {
  // Was 80 → now 48. Visually smooth at this camera distance.
  const points = useMemo(() => greatCircleArc(start, end, 48), [start, end]);

  // Speed scales with distance — short hops fly faster, long hauls slower.
  const laneDuration = useMemo(() => {
    const dist = start.angleTo(end);
    return 5 + dist * 4;
  }, [start, end]);

  const arcLine = useMemo(() => {
    const geometry = new BufferGeometry().setFromPoints(points);
    const material = new LineBasicMaterial({
      color: GOLD,
      transparent: true,
      opacity: baseOpacity,
      toneMapped: false,
    });
    return new Line(geometry, material);
  }, [points, baseOpacity]);

  const pulseRef = useRef<Mesh>(null);
  const pulseHaloRef = useRef<Mesh>(null);
  const mountTimeRef = useRef<number | null>(null);
  const tickRef = useRef(0);

  useFrame((state, delta) => {
    tickRef.current += delta;
    if (tickRef.current < FRAME_INTERVAL) return;
    tickRef.current = 0;
    if (mountTimeRef.current === null) {
      mountTimeRef.current = state.clock.elapsedTime;
    }
    const local = state.clock.elapsedTime - mountTimeRef.current;
    const revealStart = laneOffset / 5;
    const reveal = MathUtils.smoothstep(
      local,
      revealStart,
      revealStart + 0.6,
    );
    (arcLine.material as LineBasicMaterial).opacity = baseOpacity * reveal;

    const elapsed = state.clock.elapsedTime + laneOffset;
    const phase = (elapsed / laneDuration) % 1;

    const lastIdx = points.length - 1;
    const idx = phase * lastIdx;
    const i0 = Math.min(Math.floor(idx), lastIdx - 1);
    const frac = idx - i0;
    const p0 = points[i0];
    const p1 = points[i0 + 1];

    const x = p0.x + (p1.x - p0.x) * frac;
    const y = p0.y + (p1.y - p0.y) * frac;
    const z = p0.z + (p1.z - p0.z) * frac;

    const opacity = Math.sin(phase * Math.PI) * reveal;

    if (pulseRef.current) {
      pulseRef.current.position.set(x, y, z);
      (pulseRef.current.material as MeshBasicMaterial).opacity = opacity;
    }
    if (pulseHaloRef.current) {
      pulseHaloRef.current.position.set(x, y, z);
      const breathe = 1.7 + Math.sin(elapsed * 3) * 0.4;
      pulseHaloRef.current.scale.setScalar(breathe);
      (pulseHaloRef.current.material as MeshBasicMaterial).opacity =
        0.4 * opacity;
    }
  });

  return (
    <>
      <primitive object={arcLine} />
      <mesh ref={pulseHaloRef} geometry={pulseHaloGeometry}>
        <meshBasicMaterial
          color={GOLD_BRIGHT}
          transparent
          opacity={0}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={pulseRef} geometry={pulseGeometry}>
        <meshBasicMaterial
          color={HEAD_COLOR}
          transparent
          opacity={0}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}

/* ─── Featured aircraft: ONE 3D plane following the hero route ────────── */

const FEATURED_FLIGHT_DURATION = 14; // seconds for one full transit
/** Active fraction of the cycle; remainder is invisible rest before next flight. */
const FEATURED_ACTIVE_RATIO = 0.85;

const _featuredFwd = new Vector3(0, 0, -1);
const _featuredVel = new Vector3();

function FeaturedAircraft({
  start,
  end,
}: {
  start: Vector3;
  end: Vector3;
}) {
  // 60 segments instead of 100 — plane motion still reads smoothly.
  const points = useMemo(() => greatCircleArc(start, end, 60, 0.20), [start, end]);
  const planeRef = useRef<import("three").Group>(null);
  const haloRef = useRef<Mesh>(null);
  const tickRef = useRef(0);

  useFrame((state, delta) => {
    tickRef.current += delta;
    if (tickRef.current < FRAME_INTERVAL) return;
    tickRef.current = 0;
    const cyclePhase = (state.clock.elapsedTime / FEATURED_FLIGHT_DURATION) % 1;
    const isActive = cyclePhase < FEATURED_ACTIVE_RATIO;
    const t = isActive ? cyclePhase / FEATURED_ACTIVE_RATIO : 1;
    const opacity = isActive ? Math.sin(t * Math.PI) : 0;

    const lastIdx = points.length - 1;
    const idx = t * lastIdx;
    const i0 = Math.min(Math.floor(idx), lastIdx - 1);
    const frac = idx - i0;
    const p0 = points[i0];
    const p1 = points[i0 + 1];

    const plane = planeRef.current;
    if (plane) {
      plane.position.set(
        p0.x + (p1.x - p0.x) * frac,
        p0.y + (p1.y - p0.y) * frac,
        p0.z + (p1.z - p0.z) * frac,
      );
      _featuredVel
        .set(p1.x - p0.x, p1.y - p0.y, p1.z - p0.z)
        .normalize();
      plane.quaternion.setFromUnitVectors(_featuredFwd, _featuredVel);
      plane.traverse((child) => {
        const mesh = child as Mesh;
        if (mesh.isMesh) {
          (mesh.material as MeshBasicMaterial).opacity = opacity;
        }
      });
    }
    const halo = haloRef.current;
    if (halo && plane) {
      halo.position.copy(plane.position);
      const breathe = 1.5 + Math.sin(state.clock.elapsedTime * 2.5) * 0.3;
      halo.scale.setScalar(breathe);
      (halo.material as MeshBasicMaterial).opacity = 0.45 * opacity;
    }
  });

  return (
    <>
      <mesh ref={haloRef}>
        <sphereGeometry args={[0.024, 8, 8]} />
        <meshBasicMaterial
          color={GOLD_BRIGHT}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>
      <group ref={planeRef}>
        {/* Fuselage: long along -Z (forward) */}
        <mesh position={[0, 0, -0.03]}>
          <boxGeometry args={[0.012, 0.012, 0.06]} />
          <meshBasicMaterial
            color={HEAD_COLOR}
            transparent
            opacity={0}
          />
        </mesh>
        {/* Wings: wide along X */}
        <mesh position={[0, 0, -0.03]}>
          <boxGeometry args={[0.04, 0.003, 0.012]} />
          <meshBasicMaterial
            color={HEAD_COLOR}
            transparent
            opacity={0}
          />
        </mesh>
      </group>
    </>
  );
}

/* ─── Globe ───────────────────────────────────────────────────────────── */

const FACE_INDIA_Y = -((ORIGIN.lng * Math.PI) / 180 + Math.PI / 2);
/** Very slow auto-rotation, rad/sec. ~0.4° per second. */
const AUTO_ROTATE_RATE = 0.007;

function Globe() {
  const originVec = useMemo(() => latLngToVec3(ORIGIN.lat, ORIGIN.lng), []);
  const hubVecs = useMemo(
    () => HUBS.map((h) => ({ ...h, vec: latLngToVec3(h.lat, h.lng) })),
    [],
  );

  // Per-lane opacity variation (0.4 – 0.7) so the network doesn't look
  // mechanically identical — gives a "live network with mixed traffic" feel.
  const laneOpacities = useMemo(
    () => hubVecs.map((_, i) => 0.4 + ((i * 37) % 30) / 100),
    [hubVecs],
  );

  const featured = hubVecs.find((h) => h.name === FEATURED_HUB_NAME);

  return (
    <group rotation={[0, FACE_INDIA_Y, 0]}>
      <Ocean />
      <Wireframe />
      <Continents />
      <Atmosphere />
      <HubMarker position={originVec} isPrimary />
      {hubVecs.map((h, i) => (
        <HubMarker key={h.name} position={h.vec} pulseOffset={i * 0.55} />
      ))}
      {hubVecs.map((h, i) => (
        <ShippingLane
          key={`lane-${h.name}`}
          start={originVec}
          end={h.vec}
          laneOffset={i * 0.7}
          baseOpacity={laneOpacities[i]}
        />
      ))}
      {featured && (
        <FeaturedAircraft start={originVec} end={featured.vec} />
      )}
    </group>
  );
}

export default function Globe3DScene() {
  // Heavy-quality settings on desktop; lighter on touch / smaller screens.
  // Antialias on a 412 px-wide screen with 1.5–2 DPR is invisible but costs
  // ~30 % GPU. DPR cap at 1 (vs 1.25) further halves fragment shader work.
  const [isLgUp, setIsLgUp] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsLgUp(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsLgUp(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 0.05, 2.7], fov: 45 }}
      gl={{ antialias: isLgUp, alpha: true, powerPreference: "low-power" }}
      dpr={isLgUp ? [1, 1.25] : [1, 1]}
    >
      <Globe />
    </Canvas>
  );
}

// PARALLAX_LAMBDA + AUTO_ROTATE_RATE retained for future re-introduction of
// the mouse-driven rotation; keeping them as named constants documents the
// numbers used during the initial design pass.
void PARALLAX_LAMBDA;
void AUTO_ROTATE_RATE;
