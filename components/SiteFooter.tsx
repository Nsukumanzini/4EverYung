import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="relative z-20 border-t border-white/15 bg-black/45 px-6 py-10 backdrop-blur-xl sm:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 text-sm text-white/75 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-lg tracking-[0.18em] text-white">4Ever Yung</p>
          <p className="mt-1">Graphics & Art PTY LTD</p>
        </div>

        <div className="flex items-center gap-5 uppercase tracking-[0.14em]">
          <Link href="/" className="transition hover:text-white">
            Home
          </Link>
          <Link href="/gallery" className="transition hover:text-white">
            Gallery
          </Link>
          <Link href="/about" className="transition hover:text-white">
            About
          </Link>
          <Link href="/contact" className="transition hover:text-white">
            Contact
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-6 flex w-full max-w-6xl items-center justify-center border-t border-white/10 pt-4">
        <div className="flex items-center gap-2.5 text-[11px] tracking-[0.12em] text-white/70">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-white/25 bg-white/10 text-[10px] font-semibold text-white">
            4EY
          </span>
          <span>4Ever Yung Graphics &amp; Art PTY LTD</span>
        </div>
      </div>
    </footer>
  );
}