"use client";

import { useEffect, useRef } from "react";

// Marge graduée fixe : la latitude « descend » quand on fait défiler la page,
// comme si on parcourait une carte du nord au sud (des Cévennes à la mer).
const LAT_TOP = 44.4;
const LAT_BOTTOM = 43.4;
const TICKS = 40;

export function CoordinateRail() {
  const labelRef = useRef<HTMLSpanElement>(null);
  const ticksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const t = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      const lat = LAT_TOP - t * (LAT_TOP - LAT_BOTTOM);
      if (labelRef.current) labelRef.current.textContent = `${lat.toFixed(3)}° N`;
      if (ticksRef.current) ticksRef.current.style.transform = `translateY(${-t * 240}px)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-y-0 right-0 z-40 hidden w-10 overflow-hidden xl:block">
      <div className="absolute inset-y-0 left-0 w-px bg-[rgba(206,226,220,0.12)]" />
      <div ref={ticksRef} className="absolute inset-x-0 -top-10 will-change-transform">
        {Array.from({ length: TICKS }, (_, i) => (
          <div key={i} className="flex h-[48px] items-start">
            <span className={`block h-px bg-[rgba(206,226,220,0.35)] ${i % 4 === 0 ? "w-4" : "w-2"}`} />
          </div>
        ))}
      </div>
      <div className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center">
        <span className="block h-px w-5 bg-[#d0803f]" />
        <span
          ref={labelRef}
          className="coord ml-1 origin-left whitespace-nowrap text-[#d0803f] [writing-mode:vertical-rl]"
        />
      </div>
    </div>
  );
}
