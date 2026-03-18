"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Playfair_Display } from "next/font/google";
import { FormEvent, useMemo, useState } from "react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

type FormState = {
  name: string;
  email: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const completedFields = useMemo(
    () => [form.name, form.email, form.message].filter((value) => value.trim().length > 0).length,
    [form],
  );
  const progressPercent = (completedFields / 3) * 100;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSending(true);

    await new Promise((resolve) => window.setTimeout(resolve, 900));

    setIsSending(false);
    setIsSuccess(true);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-20 pt-28 sm:px-8 sm:pt-32">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-35 blur-sm"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=2000&q=80)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-black/55" />

      <section className="relative w-full max-w-2xl rounded-2xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-xl sm:rounded-3xl sm:p-9">
        <div className="absolute left-4 right-4 top-3 h-1 rounded-full bg-red-900/80 shadow-[0_0_18px_rgba(220,38,38,0.55)] sm:left-6 sm:right-6 sm:top-4" />

        <h1 className={`${playfair.className} mt-5 text-center text-2xl text-white sm:mt-6 sm:text-4xl`}>
          Sign the Museum Guestbook
        </h1>
        <p className="mt-2 text-center text-xs tracking-widest text-white/75 sm:text-sm">
          Request a Private Commission
        </p>

        <div className="mt-6">
          <div className="relative h-2 rounded-full bg-white/15">
            <motion.div
              className="h-full rounded-full bg-linear-to-r from-fuchsia-300 via-cyan-300 to-amber-300"
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
            <motion.div
              className="absolute top-1/2 -translate-y-1/2"
              animate={{ left: `calc(${progressPercent}% - 12px)` }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 19.5L9.3 18.2L18.4 9.1L14.9 5.6L5.8 14.7L4 19.5Z" fill="#fef3c7" stroke="#111827" strokeWidth="1.2" />
                <path d="M13.8 4.9L16.4 2.3L21.7 7.6L19.1 10.2L13.8 4.9Z" fill="#ef4444" stroke="#111827" strokeWidth="1.2" />
              </svg>
            </motion.div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="mt-7 space-y-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                className="focus-handwriting w-full rounded-xl border border-white/20 bg-black/30 px-4 py-3.5 text-base text-white placeholder:text-white/55 outline-none transition focus:border-cyan-200/60 focus:bg-black/40 sm:text-base"
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                className="focus-handwriting w-full rounded-xl border border-white/20 bg-black/30 px-4 py-3.5 text-base text-white placeholder:text-white/55 outline-none transition focus:border-cyan-200/60 focus:bg-black/40 sm:text-base"
                required
              />

              <textarea
                placeholder="Message"
                rows={5}
                value={form.message}
                onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                className="focus-handwriting w-full resize-none rounded-xl border border-white/20 bg-black/30 px-4 py-3.5 text-base text-white placeholder:text-white/55 outline-none transition focus:border-cyan-200/60 focus:bg-black/40 sm:text-base"
                required
              />

              <div className="pt-2 text-center">
                <button
                  type="submit"
                  disabled={isSending}
                  className="inline-flex h-20 w-20 items-center justify-center rounded-full border border-red-300/35 bg-linear-to-br from-red-700 via-red-800 to-red-950 text-sm font-semibold tracking-[0.08em] text-white shadow-[inset_0_6px_12px_rgba(255,255,255,0.12),inset_0_-10px_16px_rgba(0,0,0,0.35),0_12px_20px_rgba(0,0,0,0.35)] transition hover:scale-[1.02] disabled:opacity-70 sm:h-24 sm:w-24"
                >
                  {isSending ? "Sealing..." : "Send"}
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              className="relative mt-10 overflow-hidden rounded-2xl border border-white/20 bg-black/35 p-8 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {Array.from({ length: 18 }).map((_, index) => {
                const colors = ["#f97316", "#e879f9", "#22d3ee", "#facc15", "#34d399"];
                const offsetX = (index % 6) * 16 - 40;
                const offsetY = Math.floor(index / 6) * 10 - 10;

                return (
                  <motion.span
                    key={index}
                    className="absolute left-1/2 top-1/2 h-3 w-3 rounded-full"
                    style={{ backgroundColor: colors[index % colors.length] }}
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
                    animate={{ opacity: [1, 1, 0], x: offsetX, y: -70 - offsetY, scale: [0.5, 1, 0.2] }}
                    transition={{ duration: 0.9, ease: "easeOut", delay: 0.05 + index * 0.02 }}
                  />
                );
              })}

              <h2 className={`${playfair.className} text-3xl text-white`}>Thank You</h2>
              <p className="mt-3 text-white/85">
                Your request has been sealed in our VIP guestbook. We will reach out soon.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
