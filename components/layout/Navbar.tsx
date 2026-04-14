"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Globe2, Home, Info, Link2, Menu, MessageCircle, Search, Shirt, ShoppingBag, Tags, Users, X } from "lucide-react";
import { CavoLogo } from "@/components/brand/CavoLogo";
import { createWhatsAppLink } from "@/lib/brand";
import { useSiteLocale } from "@/lib/use-site-locale";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/store", en: "Store", ar: "المتجر", icon: Home },
  { href: "/store/men", en: "Men", ar: "رجالي", icon: Shirt },
  { href: "/store/women", en: "Women", ar: "حريمي", icon: Users },
  { href: "/store/kids", en: "Kids", ar: "أطفال", icon: Users },
  { href: "/store/offers", en: "Offers", ar: "العروض", icon: Tags },
  { href: "/about", en: "About", ar: "عن كافو", icon: Info },
  { href: "/store/contact", en: "Links", ar: "الروابط", icon: Link2 },
] as const;

const tickerItems = [
  "New Drop: Cavo Mirror Collection",
  "Free Shipping Inside Hurghada",
  "Premium Mirror Quality",
  "Fast WhatsApp Support",
  "Handpicked Pairs for Men, Women & Kids",
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { locale, isArabic, toggleLocale } = useSiteLocale();

  const labels = useMemo(
    () => ({
      browse: isArabic ? "استكشف التشكيلة" : "Browse Collection",
      contact: isArabic ? "تواصل الآن" : "Contact Links",
      menu: isArabic ? "القائمة" : "Menu",
      language: isArabic ? "اللغة" : "Language",
      dark: isArabic ? "دارك مود" : "Dark Mode",
      signIn: isArabic ? "دخول الأدمن" : "Admin Sign In",
      english: isArabic ? "الإنجليزية" : "English",
      arabic: isArabic ? "العربية" : "Arabic",
    }),
    [isArabic],
  );

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 md:px-6">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-t-[1.9rem] border border-white/10 border-b-0 bg-black/85 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-amber-300 shadow-[0_20px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        <div className="cavo-marquee-track min-w-max gap-10">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span key={`${item}-${index}`} className="inline-flex items-center gap-3 whitespace-nowrap">
              <span>{item}</span>
              <span className="text-amber-500/60">•</span>
            </span>
          ))}
        </div>
      </div>

      <motion.nav
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-b-[1.9rem] border border-white/10 bg-[rgba(6,6,8,0.92)] px-4 py-4 shadow-[0_18px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
      >
        <CavoLogo href="/store" compact />

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href === "/store" && pathname === "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-2xl px-4 py-3 text-xs font-black transition-all",
                  isArabic ? "tracking-normal" : "uppercase tracking-[0.18em]",
                  isActive
                    ? "bg-amber-500/14 text-amber-300 shadow-[0_0_0_1px_rgba(251,191,36,0.16)]"
                    : "text-zinc-400 hover:bg-white/[0.04] hover:text-white",
                )}
              >
                {isArabic ? item.ar : item.en}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <button type="button" className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-zinc-300 transition hover:border-amber-300/30 hover:text-amber-200" aria-label="Search">
            <Search className="h-4 w-4" />
          </button>
          <button type="button" className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-zinc-300 transition hover:border-amber-300/30 hover:text-amber-200" aria-label="Bag">
            <ShoppingBag className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={toggleLocale}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-zinc-100 transition hover:border-amber-400/25 hover:text-amber-200"
          >
            <Globe2 className="h-4 w-4" />
            {locale === "en" ? "AR" : "EN"}
          </button>
        </div>

        <button
          type="button"
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-zinc-300 transition hover:border-amber-300/30 hover:text-amber-200 lg:hidden"
          onClick={() => setIsOpen(true)}
          aria-label={labels.menu}
        >
          <Menu className="h-5 w-5" />
        </button>
      </motion.nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/70 p-4 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="ml-auto flex h-[calc(100vh-2rem)] w-full max-w-[430px] flex-col overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#060606] shadow-[0_30px_120px_rgba(0,0,0,0.6)]"
            >
              <div className="flex items-center justify-between border-b border-white/6 px-5 py-5">
                <CavoLogo href="/store" compact />
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-white/10 bg-white/[0.04] p-3 text-zinc-300"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-6">
                <p className="mb-4 text-[11px] font-black uppercase tracking-[0.26em] text-amber-300/90">{labels.menu}</p>
                <div className="grid gap-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || (item.href === "/store" && pathname === "/");
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center justify-between rounded-[1.2rem] border px-4 py-4 transition",
                          isActive
                            ? "border-amber-400/20 bg-amber-400/10 text-amber-200"
                            : "border-white/8 bg-white/[0.02] text-zinc-200 hover:border-white/15 hover:bg-white/[0.04]",
                        )}
                      >
                        <span className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.14em]">
                          <Icon className="h-4 w-4" />
                          {isArabic ? item.ar : item.en}
                        </span>
                        <ChevronRight className={cn("h-4 w-4", isArabic ? "rotate-180" : "")} />
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-8">
                  <p className="mb-4 text-[11px] font-black uppercase tracking-[0.26em] text-amber-300/90">{labels.language}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => locale !== "en" && toggleLocale()}
                      className={cn(
                        "rounded-[1.1rem] border px-4 py-4 text-left text-sm font-bold transition",
                        locale === "en"
                          ? "border-amber-400/25 bg-amber-400/12 text-amber-200"
                          : "border-white/8 bg-white/[0.02] text-zinc-300",
                      )}
                    >
                      EN · {labels.english}
                    </button>
                    <button
                      type="button"
                      onClick={() => locale !== "ar" && toggleLocale()}
                      className={cn(
                        "rounded-[1.1rem] border px-4 py-4 text-left text-sm font-bold transition",
                        locale === "ar"
                          ? "border-amber-400/25 bg-amber-400/12 text-amber-200"
                          : "border-white/8 bg-white/[0.02] text-zinc-300",
                      )}
                    >
                      AR · {labels.arabic}
                    </button>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  <div className="rounded-[1.2rem] border border-white/8 bg-white/[0.02] px-4 py-4 text-sm font-bold text-zinc-300">{labels.dark}</div>
                  <a
                    href={createWhatsAppLink(isArabic ? "أهلاً كافو، أريد الطلب من المتجر." : "Hello Cavo, I want to order from the store.")}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-[1.2rem] bg-amber-400 px-4 py-4 text-sm font-black uppercase tracking-[0.14em] text-black"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {labels.contact}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
