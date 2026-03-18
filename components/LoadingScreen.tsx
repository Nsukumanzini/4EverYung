"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isSplitting, setIsSplitting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const splitTimer = window.setTimeout(() => setIsSplitting(true), 2100);
    const finishTimer = window.setTimeout(() => setIsVisible(false), 3400);

    return () => {
      window.clearTimeout(splitTimer);
      window.clearTimeout(finishTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className="pointer-events-none fixed inset-0 z-100 overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-black"
            initial={{ x: 0 }}
            animate={{ x: isSplitting ? "-100%" : "0%" }}
            transition={{ duration: 1.1, ease: [0.8, 0, 0.2, 1] }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 bg-black"
            initial={{ x: 0 }}
            animate={{ x: isSplitting ? "100%" : "0%" }}
            transition={{ duration: 1.1, ease: [0.8, 0, 0.2, 1] }}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.svg
              width="700"
              height="220"
              viewBox="0 0 700 220"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="max-w-[88vw] drop-shadow-[0_0_24px_rgba(255,255,255,0.28)]"
              animate={{ opacity: isSplitting ? 0 : 1 }}
              transition={{ duration: 0.35 }}
            >
              <motion.path
                d="M64 156 L99 54 L102 157 M80 117 L119 117 M141 157 L141 77 C141 54 172 49 185 67 C196 82 191 105 173 113 C160 119 143 132 141 157 M215 157 L215 83 M215 111 C225 95 248 92 259 109 M215 125 C222 141 245 142 258 128 M285 83 L300 157 L314 106 L328 157 L344 83 M364 83 L364 157 M365 118 C370 103 382 96 394 99 C407 102 411 115 411 131 C411 146 401 157 388 157 C374 157 364 146 364 131 M434 83 L434 157 C434 170 445 173 454 168 M488 83 L488 136 C488 150 500 160 512 160 C525 160 536 149 536 136 L536 83 M536 136 C536 149 548 160 561 160 C573 160 584 149 584 136 L584 83 M610 83 L622 157 L635 107 L648 157 L660 83"
                stroke="white"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.85, ease: "easeInOut" }}
              />
            </motion.svg>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}