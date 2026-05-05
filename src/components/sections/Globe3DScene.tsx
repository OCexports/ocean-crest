"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
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
 * SSR-safe via dynamic import in HeroSection.
 */

const GOLD = "#D4A64A";
const GOLD_BRIGHT = "#F4C75D";
const OCEAN = "#0B1D2A";
const COUNTRY_LINE = "#9DBFD7";
const GRID_LINE = "#3A6B95";
const HEAD_COLOR = "#FFFFFF";

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
function latLngToVec3(lat: number, lng: number, radius = 1): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

/** Slerp + rise: great-circle arc that lifts off the sphere surface. */
function greatCircleArc(
  start: THREE.Vector3,
  end: THREE.Vector3,
  segments = 80,
  liftHeight = 0.32,
): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const angle = start.angleTo(end);
  const sinAngle = Math.sin(angle);
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const a = Math.sin((1 - t) * angle) / sinAngle;
    const b = Math.sin(t * angle) / sinAngle;
    const p = new THREE.Vector3(
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

/* ─── Lat / long wireframe sphere ─────────────────────────────────────── */

const wireframePositions = (() => {
  const positions: number[] = [];
  const LATS = 9; // parallels (excluding poles)
  const LNGS = 18; // meridians
  const SEG = 64;

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
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(wireframePositions, 3),
    );
    const material = new THREE.LineBasicMaterial({
      color: GRID_LINE,
      transparent: true,
      opacity: 0.28,
      toneMapped: false,
    });
    return new THREE.LineSegments(geometry, material);
  }, []);
  return <primitive object={lineObj} />;
}

function Continents() {
  const lineObj = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(countryLinePositions, 3),
    );
    const material = new THREE.LineBasicMaterial({
      color: COUNTRY_LINE,
      transparent: true,
      opacity: 0.7,
      toneMapped: false,
    });
    return new THREE.LineSegments(geometry, material);
  }, []);
  return <primitive object={lineObj} />;
}

function Ocean() {
  // Translucent — lets the radial glow behind the canvas bleed through, so
  // the globe appears to float in open space rather than sitting on a card.
  return (
    <mesh>
      <sphereGeometry args={[1, 64, 64]} />
      <meshBasicMaterial color={OCEAN} transparent opacity={0.78} />
    </mesh>
  );
}

function Atmosphere() {
  // Two-layer halo for soft depth: a tight inner band + a wider outer glow.
  return (
    <>
      <mesh scale={1.045}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={GOLD_BRIGHT}
          transparent
          opacity={0.07}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
      <mesh scale={1.18}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={GOLD_BRIGHT}
          transparent
          opacity={0.025}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

/* ─── Hub markers ─────────────────────────────────────────────────────── */

function HubMarker({
  position,
  isPrimary = false,
  pulseOffset = 0,
}: {
  position: THREE.Vector3;
  isPrimary?: boolean;
  pulseOffset?: number;
}) {
  const dotRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime + pulseOffset;
    if (dotRef.current) {
      const s = 1 + Math.sin(t * 1.5) * (isPrimary ? 0.3 : 0.15);
      dotRef.current.scale.setScalar(s);
    }
    if (haloRef.current) {
      const s = 1 + Math.sin(t * 1.5 + Math.PI * 0.4) * 0.7;
      haloRef.current.scale.setScalar(s);
      const mat = haloRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.36 - 0.26 * Math.sin(t * 1.5 + Math.PI * 0.4);
    }
  });

  const baseSize = isPrimary ? 0.045 : 0.022;
  const haloSize = isPrimary ? 0.1 : 0.05;

  return (
    <group position={position}>
      <mesh ref={dotRef}>
        <sphereGeometry args={[baseSize, 16, 16]} />
        <meshBasicMaterial color={GOLD_BRIGHT} toneMapped={false} />
      </mesh>
      <mesh ref={haloRef}>
        <sphereGeometry args={[haloSize, 16, 16]} />
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
const pulseGeometry = new THREE.SphereGeometry(PULSE_RADIUS, 12, 12);
const pulseHaloGeometry = new THREE.SphereGeometry(PULSE_RADIUS, 12, 12);

function ShippingLane({
  start,
  end,
  laneOffset = 0,
  baseOpacity = 0.55,
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  laneOffset?: number;
  baseOpacity?: number;
}) {
  const points = useMemo(() => greatCircleArc(start, end, 80), [start, end]);

  // Speed scales with distance — short hops fly faster, long hauls slower.
  const laneDuration = useMemo(() => {
    const dist = start.angleTo(end);
    return 5 + dist * 4;
  }, [start, end]);

  const arcLine = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: GOLD,
      transparent: true,
      opacity: baseOpacity,
      toneMapped: false,
    });
    return new THREE.Line(geometry, material);
  }, [points, baseOpacity]);

  const pulseRef = useRef<THREE.Mesh>(null);
  const pulseHaloRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
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

    const opacity = Math.sin(phase * Math.PI);

    if (pulseRef.current) {
      pulseRef.current.position.set(x, y, z);
      (pulseRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    }
    if (pulseHaloRef.current) {
      pulseHaloRef.current.position.set(x, y, z);
      const breathe = 1.7 + Math.sin(elapsed * 3) * 0.4;
      pulseHaloRef.current.scale.setScalar(breathe);
      (pulseHaloRef.current.material as THREE.MeshBasicMaterial).opacity =
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

const aircraftGeometry = (() => {
  // A slim cone — small fuselage shape, anchored back-of-aircraft so it
  // appears to depart the port (not float past it).
  const len = 0.06;
  const g = new THREE.ConeGeometry(0.012, len, 10);
  g.rotateX(-Math.PI / 2); // tip → -Z (forward, matches lookAt convention)
  g.translate(0, 0, -len / 2);
  return g;
})();
const _featuredFwd = new THREE.Vector3(0, 0, -1);
const _featuredVel = new THREE.Vector3();

function FeaturedAircraft({
  start,
  end,
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
}) {
  const points = useMemo(() => greatCircleArc(start, end, 100, 0.36), [start, end]);
  const planeRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
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
      (plane.material as THREE.MeshBasicMaterial).opacity = opacity;
    }
    const halo = haloRef.current;
    if (halo && plane) {
      halo.position.copy(plane.position);
      const breathe = 1.5 + Math.sin(state.clock.elapsedTime * 2.5) * 0.3;
      halo.scale.setScalar(breathe);
      (halo.material as THREE.MeshBasicMaterial).opacity = 0.45 * opacity;
    }
  });

  return (
    <>
      <mesh ref={haloRef}>
        <sphereGeometry args={[0.024, 12, 12]} />
        <meshBasicMaterial
          color={GOLD_BRIGHT}
          transparent
          opacity={0}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={planeRef} geometry={aircraftGeometry}>
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

/* ─── Globe ───────────────────────────────────────────────────────────── */

const FACE_INDIA_Y = -((ORIGIN.lng * Math.PI) / 180 + Math.PI / 2);
/** Very slow auto-rotation, rad/sec. ~0.4° per second. */
const AUTO_ROTATE_RATE = 0.007;

function Globe() {
  const groupRef = useRef<THREE.Group>(null);

  // Slow rotation + soft mouse parallax. Both lerped so the globe feels
  // alive without ever appearing jittery.
  const baseY = useRef(FACE_INDIA_Y);
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    baseY.current += delta * AUTO_ROTATE_RATE;
    const targetX = state.pointer.y * 0.12;
    const targetY = baseY.current + state.pointer.x * 0.14;
    groupRef.current.rotation.x +=
      (targetX - groupRef.current.rotation.x) * 0.04;
    groupRef.current.rotation.y +=
      (targetY - groupRef.current.rotation.y) * 0.04;
  });

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
    <group ref={groupRef} rotation={[0, FACE_INDIA_Y, 0]}>
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
  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 0.25, 2.6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <Globe />
    </Canvas>
  );
}
