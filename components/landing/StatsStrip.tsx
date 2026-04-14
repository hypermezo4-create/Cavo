"use client";

import { Crown, Package, Star, Truck } from "lucide-react";
import { useSiteLocale } from "@/lib/use-site-locale";

export default function StatsStrip() {
  const { isArabic } = useSiteLocale();

  const items = [
    { value: "25.6K", label: isArabic ? "طلبات تم تسليمها" : "Orders delivered", icon: Package },
    { value: "18.4K", label: isArabic ? "عميل سعيد" : "Happy customers", icon: Crown },
    { value: "4.9 / 5", label: isArabic ? "تقييم العملاء" : "Customer rating", icon: Star },
    { value: "2 - 5 Days", label: isArabic ? "توصيل سريع" : "Fast delivery", icon: Truck },
  ];

  return (
    <section className="pb-10 pt-2">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] px-4 py-4 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="cavo-marquee-track min-w-max gap-4">
          {[...items, ...items].map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={`${item.label}-${index}`} className="inline-flex items-center gap-4 rounded-[1.4rem] border border-white/10 bg-black/35 px-5 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.28)]">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-400/10 text-amber-300">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-lg font-black text-white">{item.value}</div>
                  <div className="text-[11px] font-black uppercase tracking-[0.18em] text-zinc-400">{item.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
