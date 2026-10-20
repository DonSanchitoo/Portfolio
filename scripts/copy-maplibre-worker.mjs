// MapLibre 6 ships its WebGL worker as a standalone ES module; serve it from /public
// so the bundler never has to resolve it.
import { copyFileSync, mkdirSync } from "node:fs";

mkdirSync("public/vendor", { recursive: true });
copyFileSync(
  "node_modules/maplibre-gl/dist/maplibre-gl-worker.mjs",
  "public/vendor/maplibre-gl-worker.mjs",
);
