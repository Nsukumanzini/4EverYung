"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const biographyBlocks = [
  "4Ever Yung Graphics & Art PTY LTD was founded as a living studio where visual identity and fine art share the same canvas.",
  "From digital compositions to hand-finished pieces, our practice bridges contemporary design systems with timeless museum sensibilities.",
  "Each collection is curated to preserve narrative, emotion, and craftsmanship, turning brand language into collectible visual culture.",
];

const milestones = [
  { year: "2018", event: "Studio concept drafted and first private commissions completed." },
  { year: "2020", event: "Expanded into full branding systems and digital exhibition formats." },
  { year: "2023", event: "Launched curated mixed-media collections for commercial interiors." },
  { year: "2026", event: "4Ever Yung Gallery opens as a signature destination experience." },
];

export default function AboutPage() {
  return (
    <main className="relative mx-auto min-h-screen w-full max-w-6xl overflow-hidden px-4 pb-24 pt-28 md:px-8 md:pt-32">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-20 grayscale blur-sm"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1513366208864-87536b8bd7b4?auto=format&fit=crop&w=2000&q=80)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-black/40" />

      <section className="grid items-center gap-8 px-4 md:px-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
        <div className="space-y-4 sm:space-y-5">
          <h1 className={`${playfair.className} text-3xl text-white sm:text-5xl lg:text-6xl`}>
            Museum Curator Biography
          </h1>

          {biographyBlocks.map((paragraph, index) => (
            <motion.p
              key={paragraph}
              className={`${playfair.className} max-w-2xl text-base leading-relaxed text-black/90 sm:text-lg`}
              initial={{ opacity: 0, color: "rgba(0,0,0,0)" }}
              whileInView={{ opacity: 1, color: "rgba(0,0,0,0.92)" }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: index * 0.08 }}
            >
              <span className="inline-block rounded-md bg-white/75 px-3 py-2 backdrop-blur-sm">
                {paragraph}
              </span>
            </motion.p>
          ))}
        </div>

        <motion.div
          className="mx-auto w-full max-w-97.5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="relative border-16 border-[#3e2723] bg-[#2c1a15] shadow-2xl">
            <Image
              src="/images/founder.jpg"
              alt="Founder portrait"
              width={400}
              height={460}
              className="h-115 w-full object-cover"
            />
          </div>
          <p className="mt-3 text-sm uppercase tracking-[0.18em] text-white/70">Founder · Curator</p>
        </motion.div>
      </section>

      <section className="relative mt-16 px-4 pl-6 md:mt-20 md:px-8 md:pl-10">
        <div className="absolute bottom-0 left-0 top-0 w-2 rounded-full bg-linear-to-b from-fuchsia-400 via-cyan-300 to-amber-300 blur-[1px]" />
        <div className="absolute bottom-0 left-0 top-0 w-4 rounded-full bg-linear-to-b from-fuchsia-500/30 via-cyan-400/30 to-amber-400/30 blur-md" />

        <h2 className={`${playfair.className} mb-6 text-2xl text-white sm:mb-8 sm:text-4xl`}>Painted Timeline</h2>

        <div className="space-y-8">
          {milestones.map((item, index) => (
            <motion.article
              key={item.year}
              className="relative ml-4 rounded-xl border border-white/15 bg-black/40 p-5 backdrop-blur-md"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.08 }}
            >
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">{item.year}</p>
              <p className={`${playfair.className} mt-2 text-lg text-white`}>{item.event}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 ml-4 w-55">
          <motion.svg
            viewBox="0 0 420 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <motion.path
              d="M12 82 C66 40, 108 112, 160 70 C196 41, 226 93, 268 65 C302 44, 338 83, 406 52"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 1.35, ease: "easeInOut" }}
            />
          </motion.svg>
        </div>
      </section>
    </main>
  );
}
