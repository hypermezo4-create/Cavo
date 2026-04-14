"use client";

import { Languages } from "lucide-react";
import { useSiteLocale } from "@/lib/use-site-locale";

export default function LanguageToggle() {
  const { locale, toggleLocale } = useSiteLocale();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-3 py-2 text-[11px] font-black tracking-[0.16em] text-zinc-100 shadow-[0_12px_30px_rgba(0,0,0,0.22)] backdrop-blur-xl transition hover:border-amber-400/30 hover:bg-white/[0.08] hover:text-amber-200"
      aria-label={locale === "en" ? "Switch to Arabic" : "التحويل إلى الإنجليزية"}
    >
      <Languages className="h-4 w-4" />
      <span>{locale === "en" ? "AR" : "EN"}</span>
    </button>
  );
}
