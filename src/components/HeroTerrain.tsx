"use client";

import { useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";

// Survol en relief des Cévennes : MNT Terrarium (AWS Terrain Tiles), teintes
// hypsométriques, estompage, courbes de niveau calculées dans le navigateur et
// hydrographie OpenFreeMap. Aucune clé d'API.
const DEM_URL = "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png";
const EXAGGERATION = 1.35;
const START = { center: [3.62, 44.11] as [number, number], zoom: 11.2, pitch: 68, bearing: -28 };

type Readout = { lat: number; lng: number; ele: number | null };

export function HeroTerrain() {
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [readout, setReadout] = useState<Readout>({ lat: START.center[1], lng: START.center[0], ele: null });

  useEffect(() => {
    if (!container.current) return;
    let disposed = false;
    let raf = 0;
    let map: import("maplibre-gl").Map | undefined;

    (async () => {
      const maplibre = await import("maplibre-gl");
      const { DemSource } = (await import("maplibre-contour")).default;
      if (disposed || !container.current) return;

      const probe = document.createElement("canvas").getContext("webgl2");
      if (!probe) {
        setFailed(true);
        return;
      }

      maplibre.setWorkerUrl("/vendor/maplibre-gl-worker.mjs");

      const dem = new DemSource({ url: DEM_URL, encoding: "terrarium", maxzoom: 13, worker: true });
      dem.setupMaplibre(maplibre);

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      map = new maplibre.Map({
        container: container.current,
        ...START,
        maxPitch: 80,
        attributionControl: false,
        scrollZoom: false,
        dragPan: true,
        touchPitch: false,
        style: {
          version: 8,
          glyphs: "https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf",
          sky: {
            "sky-color": "#0a1114",
            "horizon-color": "#1b3b3d",
            "fog-color": "#0a1114",
            "sky-horizon-blend": 0.6,
            "horizon-fog-blend": 0.4,
            "fog-ground-blend": 0.35,
            "atmosphere-blend": 0.6,
          },
          sources: {
            dem: {
              type: "raster-dem",
              tiles: [dem.sharedDemProtocolUrl],
              encoding: "terrarium",
              tileSize: 256,
              maxzoom: 13,
              attribution: "Relief © Mapzen, AWS Terrain Tiles",
            },
            contours: {
              type: "vector",
              tiles: [
                dem.contourProtocolUrl({
                  multiplier: 1,
                  thresholds: { 9: [200, 1000], 11: [100, 500], 12: [50, 250], 13: [20, 100] },
                  elevationKey: "ele",
                  levelKey: "level",
                  contourLayer: "contours",
                }),
              ],
              maxzoom: 15,
            },
            ofm: {
              type: "vector",
              url: "https://tiles.openfreemap.org/planet",
              attribution: "© OpenFreeMap, © OpenStreetMap",
            },
          },
          layers: [
            { id: "bg", type: "background", paint: { "background-color": "#0a1114" } },
            {
              id: "relief",
              type: "color-relief",
              source: "dem",
              paint: {
                "color-relief-opacity": 1,
                "color-relief-color": [
                  "interpolate",
                  ["linear"],
                  ["elevation"],
                  0, "#0d2226",
                  200, "#143235",
                  500, "#1d4a47",
                  800, "#2c6157",
                  1100, "#5b7a5c",
                  1400, "#9a9068",
                  1700, "#cdbf9a",
                ],
              },
            },
            {
              id: "hillshade",
              type: "hillshade",
              source: "dem",
              paint: {
                "hillshade-method": "multidirectional",
                "hillshade-exaggeration": 0.55,
                "hillshade-shadow-color": "#02080a",
                "hillshade-highlight-color": "#f3e7c9",
                "hillshade-accent-color": "#0a1a1c",
              },
            },
            {
              id: "water",
              type: "fill",
              source: "ofm",
              "source-layer": "water",
              paint: { "fill-color": "#7fb2bb", "fill-opacity": 0.85 },
            },
            {
              id: "rivers",
              type: "line",
              source: "ofm",
              "source-layer": "waterway",
              filter: ["in", ["get", "class"], ["literal", ["river", "stream"]]],
              paint: {
                "line-color": "#7fb2bb",
                "line-opacity": 0.75,
                "line-width": ["match", ["get", "class"], "river", 1.6, 0.6],
              },
            },
            {
              id: "contours",
              type: "line",
              source: "contours",
              "source-layer": "contours",
              paint: {
                "line-color": "#f3e7c9",
                "line-opacity": ["match", ["get", "level"], 1, 0.5, 0.2],
                "line-width": ["match", ["get", "level"], 1, 0.9, 0.5],
              },
            },
            {
              id: "contour-labels",
              type: "symbol",
              source: "contours",
              "source-layer": "contours",
              filter: [">", ["get", "level"], 0],
              layout: {
                "symbol-placement": "line",
                "text-field": ["concat", ["number-format", ["get", "ele"], {}], " m"],
                "text-font": ["Noto Sans Italic"],
                "text-size": 10,
              },
              paint: { "text-color": "#f3e7c9", "text-opacity": 0.6, "text-halo-color": "#0a1114", "text-halo-width": 1 },
            },
            {
              id: "peaks",
              type: "symbol",
              source: "ofm",
              "source-layer": "mountain_peak",
              filter: [">", ["coalesce", ["get", "ele"], 0], 1350],
              layout: {
                "text-field": ["concat", "▲ ", ["get", "name"]],
                "text-font": ["Noto Sans Italic"],
                "text-size": 13,
                "text-offset": [0, -0.6],
                "text-padding": 24,
              },
              paint: { "text-color": "#f3e7c9", "text-halo-color": "#0a1114", "text-halo-width": 1.2 },
            },
          ],
          terrain: { source: "dem", exaggeration: EXAGGERATION },
        },
      });

      map.addControl(new maplibre.AttributionControl({ compact: true }), "bottom-left");

      const updateReadout = () => {
        if (!map) return;
        const c = map.getCenter();
        const ele = map.queryTerrainElevation(c);
        setReadout({ lat: c.lat, lng: c.lng, ele: ele == null ? null : Math.round(ele / EXAGGERATION) });
      };

      map.once("idle", () => {
        if (disposed) return;
        setReady(true);
        updateReadout();
      });
      map.on("moveend", updateReadout);

      // Orbite lente ; elle s'arrête dès que le visiteur prend la main.
      let orbit = !reduceMotion;
      const stop = () => (orbit = false);
      map.on("mousedown", stop);
      map.on("touchstart", stop);
      let last = performance.now();
      let readoutClock = 0;
      const tick = (now: number) => {
        const dt = now - last;
        last = now;
        if (orbit && map && !document.hidden) {
          map.setBearing(map.getBearing() + dt * 0.0035);
          readoutClock += dt;
          if (readoutClock > 400) {
            readoutClock = 0;
            updateReadout();
          }
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    })().catch(() => setFailed(true));

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      map?.remove();
    };
  }, []);

  return (
    <div className="absolute inset-0">
      {/* Fond de repli : visible pendant le chargement, ou à la place de la carte sans WebGL. */}
      <div
        aria-hidden
        className={`absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,#1d4a47_0%,#0f2a2c_35%,#0a1114_75%)] transition-opacity duration-[1500ms] ${
          ready && !failed ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="graticule absolute inset-0 opacity-60" />
      </div>
      {!failed && (
        <div
          ref={container}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ${ready ? "opacity-100" : "opacity-0"}`}
          role="img"
          aria-label="Relief 3D des Cévennes autour du mont Aigoual, avec courbes de niveau et rivières"
        />
      )}
      <div className="pointer-events-none absolute bottom-6 right-4 z-10 text-right sm:right-16">
        <p className="coord text-[#e7eee9]/80">
          {readout.lat.toFixed(4)}° N · {readout.lng.toFixed(4)}° E
        </p>
        <p className="coord">{readout.ele != null ? `alt. ${readout.ele} m` : "Cévennes"}</p>
      </div>
    </div>
  );
}
