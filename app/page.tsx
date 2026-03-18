"use client";

import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import { useRef } from "react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const exhibitions = [
  {
    title: "Midnight Echo",
    description:
      "A layered abstract study in indigo, smoke, and light where movement feels suspended between memory and sound.",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1800&q=80",
    side: "left",
  },
  {
    title: "Neon Bloom",
    description:
      "Electric magentas and cyan tones spill through organic forms, evoking a modern city pulse translated into texture.",
    image:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1800&q=80",
    side: "right",
  },
  {
    title: "Golden Drift",
    description:
      "Warm amber gradients and atmospheric grain create a calm cinematic horizon, balancing elegance with raw expression.",
    image:
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1800&q=80",
    side: "left",
  },
] as const;

function TypewriterText({ text, active }: { text: string; active: boolean }) {
  return (
    <p className="text-sm leading-relaxed text-white/90 sm:text-base">
      {text.split("").map((character, index) => (
        <motion.span
          key={`${character}-${index}`}
          initial={{ opacity: 0, y: 6 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: index * 0.018 }}
          className="inline-block"
        >
          {character === " " ? "\u00A0" : character}
        </motion.span>
      ))}
    </p>
  );
}

function ExhibitionSection({
  title,
  description,
  image,
  side,
}: {
  title: string;
  description: string;
  image: string;
  side: "left" | "right";
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.45, once: false });

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex h-screen snap-start items-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        initial={{ scale: 1.22 }}
        animate={{ scale: inView ? 1 : 1.15 }}
        transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
      />

      <div className="absolute inset-0 bg-linear-to-brrom-fuchsia-500/25 via-cyan-500/20 to-emerald-500/25 mix-blend-screen" />
      <div className="absolute inset-0 bg-black/50" />

      <div
        className={`absolute top-1/2 -translate-y-1/2 ${
          side === "left" ? "left-0 -translate-x-5 sm:-translate-x-8" : "right-0 translate-x-5 sm:translate-x-8"
        }`}
      >
        <h2
          className={`${playfair.className} -rotate-90 whitespace-nowrap text-2xl tracking-[0.18em] text-white/80 sm:text-4xl md:text-6xl`}
        >
          {title}
        </h2>
      </div>

      <motion.div
        className="relative mx-auto w-[min(92vw,700px)] rounded-2xl border border-white/25 bg-white/10 p-4 shadow-2xl backdrop-blur-xl sm:w-[min(88vw,700px)] sm:p-8"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: inView ? 1 : 0.4, y: inView ? 0 : 24 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <h3 className={`${playfair.className} mb-3 text-2xl text-white sm:mb-4 sm:text-4xl`}>{title}</h3>
        <TypewriterText text={description} active={inView} />
      </motion.div>
    </section>
  );
}

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ container: scrollContainerRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 135,
    damping: 28,
    mass: 0.25,
  });

  return (
    <div className="-mb-28 -mt-24 -mx-4 overflow-hidden sm:-mx-6">
      <div className="pointer-events-none fixed left-0 right-0 top-0 z-50 h-1 bg-white/10">
        <motion.div
          className="h-full origin-left bg-linear-to-r from-fuchsia-400 via-violet-300 to-cyan-300"
          style={{ scaleX }}
        />
      </div>

      <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center">
        <p className={`${playfair.className} select-none text-center text-[20vw] leading-none tracking-wider text-white/3 sm:text-[17vw]`}>
          4Ever Yung
        </p>
      </div>

      <div
        ref={scrollContainerRef}
        className="relative z-10 h-screen overflow-y-scroll snap-y snap-mandatory"
      >
        <section className="relative flex h-screen snap-start items-center justify-center overflow-hidden bg-white">
          <motion.div
            className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-400/45 blur-3xl"
            animate={{ opacity: [0.45, 0.75, 0.4], scale: [1, 1.2, 0.95] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-[44%] top-[55%] h-72 w-72 rounded-full bg-cyan-400/40 blur-3xl"
            animate={{ opacity: [0.25, 0.6, 0.3], scale: [0.9, 1.1, 1] }}
            transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
          <motion.div
            className="absolute left-[56%] top-[42%] h-64 w-64 rounded-full bg-violet-500/45 blur-3xl"
            animate={{ opacity: [0.28, 0.7, 0.33], scale: [1.05, 0.9, 1.12] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          />

          <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center sm:gap-8 sm:px-6">
            <h1 className={`${playfair.className} text-4xl tracking-wide text-zinc-900 sm:text-6xl md:text-7xl`}>
              4Ever Yung
            </h1>

            <Link
              href="/gallery"
              className="rounded-full border border-zinc-900/20 bg-zinc-900 px-7 py-3 text-sm tracking-[0.2em] text-white shadow-[0_0_28px_rgba(24,24,27,0.45)] transition hover:scale-[1.02]"
            >
              Enter Gallery
            </Link>
          </div>
        </section>

        {exhibitions.map((exhibition) => (
          <ExhibitionSection
            key={exhibition.title}
            title={exhibition.title}
            description={exhibition.description}
            image={exhibition.image}
            side={exhibition.side}
          />
        ))}
      </div>
    </div>
  );
}
