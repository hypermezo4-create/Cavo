"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CavoLogo } from "@/components/brand/CavoLogo";
import LanguageToggle from "@/components/layout/LanguageToggle";
import { useSiteLocale } from "@/lib/use-site-locale";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/store", en: "Store", ar: "المتجر" },
  { href: "/store/men", en: "Men", ar: "رجالي" },
  { href: "/store/women", en: "Women", ar: "حريمي" },
  { href: "/store/kids", en: "Kids", ar: "أطفال" },
  { href: "/store/offers", en: "Offers", ar: "العروض" },
  { href: "/store/reviews", en: "Reviews", ar: "الآراء" },
  { href: "/about", en: "About", ar: "عن كافو" },
  { href: "/store/contact", en: "Links", ar: "الروابط" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { isArabic } = useSiteLocale();

  const labelFor = useMemo(
    () => (item: (typeof navItems)[number]) => (isArabic ? item.ar : item.en),
    [isArabic],
  );

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 md:px-6">
      <motion.nav
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-[2rem] border border-white/10 bg-[rgba(8,8,10,0.72)] px-4 py-4 shadow-[0_14px_60px_rgba(0,0,0,0.32)] backdrop-blur-2xl"
      >
        <CavoLogo href="/store" compact />

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href === "/store" && pathname === "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-xl px-3 py-2 text-xs font-bold transition-colors",
                  isArabic ? "tracking-normal" : "uppercase tracking-[0.18em]",
                  isActive ? "bg-amber-500/10 text-amber-300" : "text-zinc-400 hover:text-amber-200",
                )}
              >
                {labelFor(item)}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:block">
          <LanguageToggle />
        </div>

        <button
          type="button"
          className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-zinc-300 md:hidden"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-auto mt-3 max-w-7xl rounded-[2rem] border border-white/10 bg-zinc-950/95 p-4 md:hidden"
          >
            <div className="mb-3 flex justify-end">
              <LanguageToggle />
            </div>
            <div className="grid gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-3 text-sm font-bold text-zinc-200 hover:bg-white/5",
                    isArabic ? "tracking-normal" : "uppercase tracking-[0.14em]",
                  )}
                >
                  {labelFor(item)}
                </Link>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
