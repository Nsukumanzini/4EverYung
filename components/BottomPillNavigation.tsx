"use client";

import { motion } from "framer-motion";
import { House, Image, Mail } from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "/", Icon: House },
  { label: "Gallery", href: "/gallery", Icon: Image },
  { label: "Contact", href: "/contact", Icon: Mail },
];

export default function BottomPillNavigation() {
  return (
    <nav className="fixed bottom-3 left-1/2 z-40 -translate-x-1/2 px-2 sm:bottom-6 sm:px-4">
      <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/45 px-2 py-1.5 backdrop-blur-xl sm:gap-2 sm:px-3 sm:py-2">
        {navItems.map(({ label, href, Icon }) => (
          <motion.div
            key={label}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
          >
            <Link
              href={href}
              className="flex items-center justify-center rounded-full p-2.5 text-white/90 transition hover:bg-white/10 sm:p-3"
              aria-label={label}
            >
              <Icon size={16} strokeWidth={2} className="sm:h-4.5 sm:w-4.5" />
            </Link>
          </motion.div>
        ))}
      </div>
    </nav>
  );
}