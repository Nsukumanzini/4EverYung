"use client";

import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const PLACEHOLDER_AUDIO = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.loop = true;
    audio.volume = 0.34;

    const syncPlayingState = () => setIsPlaying(!audio.paused);

    audio.addEventListener("play", syncPlayingState);
    audio.addEventListener("pause", syncPlayingState);

    const attemptAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    };

    attemptAutoplay();

    return () => {
      audio.removeEventListener("play", syncPlayingState);
      audio.removeEventListener("pause", syncPlayingState);
    };
  }, []);

  const handleToggle = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    audio.pause();
    setIsPlaying(false);
  };

  return (
    <div className="fixed bottom-20 right-3 z-40 sm:bottom-6 sm:right-6">
      <audio ref={audioRef} src={PLACEHOLDER_AUDIO} preload="auto" />

      <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/55 px-2 py-1.5 backdrop-blur-xl sm:gap-3 sm:px-3 sm:py-2">
        <button
          type="button"
          onClick={handleToggle}
          className="group relative h-11 w-11 overflow-hidden rounded-full border border-white/20 sm:h-14 sm:w-14"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,#3f3f46_0%,#18181b_45%,#000_75%,#09090b_100%)]"
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 2.4, ease: "linear", repeat: isPlaying ? Infinity : 0 }}
          >
            <div className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-black" />
            <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80" />
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center text-white/85">
            {isPlaying ? <Pause size={11} className="sm:h-3.25 sm:w-3.25" /> : <Play size={11} className="ml-0.5 sm:h-3.25 sm:w-3.25" />}
          </div>
        </button>

        <div className="hidden h-7 items-end gap-1.5 pr-1 sm:flex">
          {[0, 1, 2, 3].map((bar) => (
            <motion.span
              key={bar}
              className="w-1 rounded-full bg-emerald-300"
              animate={
                isPlaying
                  ? { scaleY: [0.35, 1, 0.45, 0.9, 0.3] }
                  : { scaleY: 0.25, opacity: 0.5 }
              }
              transition={{
                duration: 0.82,
                ease: "easeInOut",
                repeat: isPlaying ? Infinity : 0,
                delay: bar * 0.08,
              }}
              style={{ height: 18, transformOrigin: "bottom" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}