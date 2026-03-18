"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type TrailPoint = {
  id: number;
  x: number;
  y: number;
  hue: number;
};

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const nextTrailId = useRef(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const updateEnabled = () => setEnabled(mediaQuery.matches);

    updateEnabled();
    mediaQuery.addEventListener("change", updateEnabled);

    return () => mediaQuery.removeEventListener("change", updateEnabled);
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      const nextPoint: TrailPoint = {
        id: nextTrailId.current++,
        x: event.clientX,
        y: event.clientY,
        hue: (event.clientX + event.clientY) % 360,
      };

      setPosition({ x: event.clientX, y: event.clientY });
      setTrail((previous) => [nextPoint, ...previous].slice(0, 16));

      window.setTimeout(() => {
        setTrail((previous) => previous.filter((point) => point.id !== nextPoint.id));
      }, 420);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-90">
      <AnimatePresence>
        {trail.map((point, index) => (
          <motion.span
            key={point.id}
            className="absolute rounded-full"
            style={{
              left: point.x - 4,
              top: point.y - 4,
              width: 8,
              height: 8,
              backgroundColor: `hsl(${point.hue} 90% 60%)`,
            }}
            initial={{ opacity: 0.45, scale: 1 }}
            animate={{ opacity: 0.2, scale: 0.35 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.42, ease: "easeOut", delay: index * 0.01 }}
          />
        ))}
      </AnimatePresence>

      <motion.div
        className="absolute h-3.5 w-3.5 rounded-full border border-white/70 bg-black/80 shadow-[0_0_14px_rgba(255,255,255,0.6)]"
        animate={{ x: position.x - 7, y: position.y - 7 }}
        transition={{ type: "spring", stiffness: 450, damping: 30, mass: 0.35 }}
      />
    </div>
  );
}