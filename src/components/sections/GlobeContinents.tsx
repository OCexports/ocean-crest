"use client";

import { useMemo } from "react";
import {
  BufferAttribute,
  BufferGeometry,
  LineBasicMaterial,
  LineSegments,
  Vector3,
} from "three";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import type { Feature, MultiPolygon, Polygon } from "geojson";
import countriesTopologyRaw from "world-atlas/countries-110m.json";

/**
 * Country outline lines for the globe.
 *
 * Lives in its own module so the world-atlas JSON (~108 KB) and the
 * topojson-client runtime ship in their own chunk, not the main globe
 * chunk. Loaded via React.lazy by Globe3DScene on every viewport.
 */

const COUNTRY_LINE = "#9DBFD7";

function latLngToVec3(lat: number, lng: number, radius = 1.003): Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

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
          const v1 = latLngToVec3(lat1, lng1);
          const v2 = latLngToVec3(lat2, lng2);
          positions.push(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
        }
      }
    }
  }
  return new Float32Array(positions);
})();

export default function GlobeContinents() {
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
