"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function TopNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const previousY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 28);
      setIsScrollingUp(currentY < previousY.current);
      previousY.current = currentY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showFrostedBackground = isScrollingUp && isScrolled;

  return (
    <header className="pointer-events-none fixed left-1/2 top-2 z-40 w-[min(96vw,1100px)] -translate-x-1/2 px-1.5 sm:top-4 sm:px-2">
      <motion.div
        className="pointer-events-auto rounded-xl border border-white/20 px-3 py-2 sm:rounded-2xl sm:px-6 sm:py-3"
        animate={{
          backgroundColor: showFrostedBackground
            ? "rgba(18,18,18,0.52)"
            : "rgba(18,18,18,0.02)",
          backdropFilter: showFrostedBackground ? "blur(16px)" : "blur(0px)",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <motion.h1
          className="select-none font-light tracking-[0.15em] text-white"
          animate={{ scale: isScrolled ? 0.74 : 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          style={{ transformOrigin: "left center", fontSize: "clamp(1.05rem,5vw,2.45rem)" }}
        >
          4Ever Yung
        </motion.h1>
      </motion.div>
    </header>
  );
}