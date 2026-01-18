"use client";

import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from "lucide-react";
import gsap from "gsap";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const bgCursorRef = useRef<HTMLDivElement>(null); // New ref for the background element
  const [type, setType] = useState<string | null>(null);
  const [hasMoved, setHasMoved] = useState(false); // Track if user has moved mouse to prevent "fly-in"

  useEffect(() => {
    // Mouse movement tracker
    const moveCursor = (e: MouseEvent) => {
      if (!hasMoved) {
        setHasMoved(true);
        // Instantly set position on first move to prevent fly-in
        gsap.set([cursorRef.current, bgCursorRef.current], {
          x: e.clientX,
          y: e.clientY,
        });
      }

      // Main Dot - fast/instant
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      // Background Bubble - slightly heavier/magnetic feel
      gsap.to(bgCursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    // Hover detector for data-cursor elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Look up the tree for data-cursor attribute
      const trigger = target.closest("[data-cursor]");

      if (trigger) {
        const cursorType = trigger.getAttribute("data-cursor");
        setType(cursorType);
      } else {
        setType(null);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [hasMoved]);

  return (
    <>
      {/* Background Directional Indicator (Appears BEHIND cursor) */}
      <div
        ref={bgCursorRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 will-change-transform mix-blend-difference"
      >
        <div
          className={clsx(
            "flex items-center justify-center rounded-full bg-osmo-acid text-osmo-carbon transition-all duration-300 ease-[var(--cubic-bounce)]",
            type ? "scale-100 opacity-100" : "scale-0 opacity-0",
            "w-16 h-16"
          )}
        >
          {/* Visuals for Up/Down/Prev/Next */}
          {(type === "prev" || type === "up") && <ArrowUp className="w-6 h-6" />}
          {(type === "next" || type === "down") && <ArrowDown className="w-6 h-6" />}

          {/* Text fallback */}
          {type && !["prev", "next", "up", "down"].includes(type) && (
            <span className="text-xs font-bold uppercase">{type}</span>
          )}
        </div>
      </div>

      {/* Main Cursor (Always visible, sits on top) */}
      <div
        ref={cursorRef}
        className={clsx(
          "fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 will-change-transform mix-blend-difference"
        )}
      >
        <div className={clsx(
          "w-3 h-3 bg-white rounded-full shadow-sm transition-transform duration-300",
          type ? "scale-75" : "scale-100" // Subtle shrink when hovering interactive elements
        )} />
      </div>
    </>
  );
}
