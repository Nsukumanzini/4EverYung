"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";

type ArtItem = {
  id: number;
  title: string;
  category: "Digital Art" | "Branding" | "Paintings";
  image: string;
};

const initialArtworks: ArtItem[] = [
  {
    id: 1,
    title: "Chromatic Pulse",
    category: "Digital Art",
    image:
      "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Urban Monogram",
    category: "Branding",
    image:
      "https://images.unsplash.com/photo-1603661413963-a60e9ab0e6f9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Velvet Horizon",
    category: "Paintings",
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd75fc31b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title: "Spectrum Drift",
    category: "Digital Art",
    image:
      "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    title: "Maison Signature",
    category: "Branding",
    image:
      "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    title: "Amber Silence",
    category: "Paintings",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1200&q=80",
  },
];

const categories = ["All", "Digital Art", "Branding", "Paintings"] as const;
type CategoryFilter = (typeof categories)[number];

function shuffleArray<T>(input: T[]): T[] {
  const copy = [...input];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("All");
  const [artworks, setArtworks] = useState<ArtItem[]>(initialArtworks);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filteredArtworks = useMemo(() => {
    if (activeFilter === "All") {
      return artworks;
    }
    return artworks.filter((art) => art.category === activeFilter);
  }, [activeFilter, artworks]);

  const activeSpotlightId = hoveredId ?? selectedId;

  return (
    <main
      className="mx-auto min-h-screen w-full max-w-7xl px-4 pb-20 pt-32 sm:px-8 sm:pt-36"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          setSelectedId(null);
        }
      }}
    >
      <div className="sticky top-24 z-30 mb-10 flex flex-wrap items-center gap-3 rounded-2xl border border-white/15 bg-black/35 p-3 backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((category) => {
            const active = activeFilter === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveFilter(category)}
                className={`rounded-full border px-4 py-2 text-xs tracking-[0.14em] transition sm:text-sm ${
                  active
                    ? "border-white/45 bg-white/20 text-white"
                    : "border-white/20 bg-white/5 text-white/80 hover:bg-white/10"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setArtworks((current) => shuffleArray(current))}
          className="ml-auto rounded-full border border-violet-200/45 bg-violet-300/20 px-5 py-2 text-xs tracking-[0.18em] text-violet-100 transition hover:bg-violet-300/30 sm:text-sm"
        >
          Surprise Me
        </button>
      </div>

      <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-12 md:gap-y-16 lg:gap-x-16">
        <AnimatePresence mode="popLayout">
          {filteredArtworks.map((art, index) => {
            const dimmed = activeSpotlightId !== null && activeSpotlightId !== art.id;
            const alignClass = index % 2 === 0 ? "md:mt-0" : "md:mt-14";
            const sideClass = index % 2 === 0 ? "md:justify-self-start" : "md:justify-self-end";
            const plateSideClass = index % 2 === 0 ? "right-2 md:-right-6" : "left-2 md:-left-6";
            const isActive = activeSpotlightId === art.id;

            return (
              <motion.article
                key={art.id}
                layout
                className={`relative mx-auto w-full max-w-115 ${alignClass} ${sideClass}`}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                onHoverStart={() => setHoveredId(art.id)}
                onHoverEnd={() => setHoveredId((current) => (current === art.id ? null : current))}
                onTap={() => setSelectedId((current) => (current === art.id ? null : art.id))}
                onClick={() => setSelectedId((current) => (current === art.id ? null : art.id))}
                style={{ opacity: dimmed ? 0.24 : 1 }}
              >
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  animate={{ scale: isActive ? 1.03 : 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="relative border-16 border-[#3e2723] bg-[#2c1a15] shadow-2xl"
                >
                  <Image
                    src={art.image}
                    alt={art.title}
                    width={500}
                    height={380}
                    className="h-85 w-full object-cover sm:h-95"
                    loading="lazy"
                  />

                  <AnimatePresence>
                    {isActive ? (
                      <motion.div
                        initial={{ opacity: 0, x: index % 2 === 0 ? 10 : -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: index % 2 === 0 ? 10 : -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={`absolute top-8 ${plateSideClass} z-20 rounded-md border border-gray-300 bg-linear-to-rrom-gray-200 to-gray-400 px-3 py-2 text-xs text-black shadow-md sm:text-sm`}
                      >
                        {art.title}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>

                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/70">{art.category}</p>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>
    </main>
  );
}
