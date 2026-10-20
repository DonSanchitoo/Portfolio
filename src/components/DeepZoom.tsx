"use client";

import { useEffect, useRef, useState } from "react";

// Visionneuse zoomable (OpenSeadragon). Avec une image simple aujourd'hui ;
// passera aux tuiles DZI quand les exports haute définition seront en ligne.
export function DeepZoom({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
  const el = useRef<HTMLDivElement>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const viewerRef = useRef<import("openseadragon").Viewer | null>(null);

  useEffect(() => {
    let disposed = false;
    (async () => {
      const OSD = (await import("openseadragon")).default;
      if (disposed || !el.current) return;
      viewerRef.current = OSD({
        element: el.current,
        tileSources: { type: "image", url: src },
        showNavigationControl: false,
        showNavigator: true,
        navigatorPosition: "BOTTOM_RIGHT",
        navigatorBackground: "#ece0c8",
        navigatorBorderColor: "#9a4d1d",
        navigatorDisplayRegionColor: "#9a4d1d",
        visibilityRatio: 1,
        constrainDuringPan: true,
        minZoomImageRatio: 1,
        maxZoomPixelRatio: 3,
        animationTime: 0.9,
        springStiffness: 8,
        gestureSettingsMouse: { scrollToZoom: true, clickToZoom: false, dblClickToZoom: true },
        crossOriginPolicy: false,
      });
      viewerRef.current.addHandler("full-screen", (e) => setFullscreen(Boolean((e as { fullScreen?: boolean }).fullScreen)));
    })();
    return () => {
      disposed = true;
      viewerRef.current?.destroy();
      viewerRef.current = null;
    };
  }, [src]);

  const zoom = (factor: number) => {
    const v = viewerRef.current;
    if (!v) return;
    v.viewport.zoomBy(factor);
    v.viewport.applyConstraints();
  };

  return (
    <div className="relative">
      <div
        ref={el}
        role="img"
        aria-label={alt}
        className="w-full bg-[#e3d4b6]"
        style={{ aspectRatio: `${width} / ${height}`, maxHeight: "82vh" }}
      />
      <div className="absolute left-3 top-3 z-10 flex flex-col overflow-hidden rounded-sm border border-line-strong bg-bg/90 text-fg shadow">
        <ToolButton label="Zoomer" onClick={() => zoom(1.6)}>+</ToolButton>
        <ToolButton label="Dézoomer" onClick={() => zoom(1 / 1.6)}>−</ToolButton>
        <ToolButton label="Vue d'ensemble" onClick={() => viewerRef.current?.viewport.goHome()}>⌂</ToolButton>
        <ToolButton
          label={fullscreen ? "Quitter le plein écran" : "Plein écran"}
          onClick={() => viewerRef.current?.setFullScreen(!fullscreen)}
        >
          ⤢
        </ToolButton>
      </div>
      <p className="coord mt-3">Molette ou pincement pour zoomer, glisser pour se déplacer.</p>
    </div>
  );
}

function ToolButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex h-9 w-9 items-center justify-center border-b border-line text-lg leading-none last:border-b-0 hover:bg-bg-2"
    >
      {children}
    </button>
  );
}
