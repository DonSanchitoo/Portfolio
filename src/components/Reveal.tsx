"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Apparition douce à l'entrée dans l'écran. Contenu visible d'office sans JS. */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top < window.innerHeight) {
      setState("shown");
      return;
    }
    setState("hidden");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Visible : aucun translate, sinon ce bloc deviendrait le conteneur des enfants en position absolue.
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-[opacity,transform] duration-700 ease-out ${
        state === "hidden" ? "translate-y-6 opacity-0" : "opacity-100"
      } ${className}`}
    >
      {children}
    </div>
  );
}
