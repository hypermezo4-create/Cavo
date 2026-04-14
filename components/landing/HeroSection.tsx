"use client";

import Link from "next/link";
import { ArrowRight, Crown, Headphones, Sparkles } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import { createWhatsAppLink } from "@/lib/brand";
import { useSiteLocale } from "@/lib/use-site-locale";

const heroImage = "/images/cavo/men/air_force/grey_black/grey_black.png";

export default function HeroSection() {
  const { isArabic } = useSiteLocale();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-120, 120], [8, -8]);
  const rotateY = useTransform(x, [-120, 120], [-8, 8]);
  const glow = useMotionTemplate`radial-gradient(520px circle at ${x}px ${y}px, rgba(245,158,11,0.18), transparent 58%)`;

  const copy = {
    eyebrow: isArabic ? "أحذية Mirror Quality" : "Shoes Prime Mirror",
    titleA: isArabic ? "أناقة فاخرة." : "Premium Footwear.",
    titleB: isArabic ? "هوية جريئة." : "Bold Identity.",
    description: isArabic
      ? "تشكيلة مختارة للرجالي والحريمي والأطفال، بتفاصيل راقية وإحساس فاخر يناسب عرض كافو الجديد."
      : "Mirror quality sneakers curated for men, women, and kids with a luxury-first presentation built around Cavo.",
    primary: isArabic ? "استكشف التشكيلة" : "Browse Collection",
    secondary: isArabic ? "روابط التواصل" : "Contact Links",
    highlights: [
      {
        title: isArabic ? "Mirror Quality" : "Mirror Quality",
        text: isArabic ? "تشطيب فاخر ولمسة أوضح" : "Premium finish and elevated detail",
        icon: Crown,
      },
      {
        title: isArabic ? "مختار بعناية" : "Handpicked",
        text: isArabic ? "براندات قوية وموديلات مميزة" : "Strong brands and selected drops",
        icon: Sparkles,
      },
      {
        title: isArabic ? "دعم سريع" : "Fast Support",
        text: isArabic ? "واتساب وروابط مباشرة" : "WhatsApp and direct links",
        icon: Headphones,
      },
    ],
  };

  return (
    <section className="pb-8 pt-6 md:pb-10 md:pt-8">
      <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-6 shadow-[0_30px_110px_rgba(0,0,0,0.42)] backdrop-blur-xl md:p-8">
          <div className="inline-flex rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-amber-300">
            {copy.eyebrow}
          </div>

          <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[0.95] text-white md:text-6xl xl:text-7xl">
            {copy.titleA}
            <span className="mt-2 block text-[#F5B229]">{copy.titleB}</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-300 md:text-lg">{copy.description}</p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/store/products" className="inline-flex items-center justify-center gap-3 rounded-[1.2rem] bg-amber-400 px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:bg-amber-300">
              {copy.primary}
              <ArrowRight className={`h-4 w-4 ${isArabic ? "rotate-180" : ""}`} />
            </Link>
            <Link href="/store/contact" className="inline-flex items-center justify-center rounded-[1.2rem] border border-amber-400/25 bg-transparent px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-amber-200 transition hover:border-amber-300/40 hover:bg-white/[0.03]">
              {copy.secondary}
            </Link>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {copy.highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[1.4rem] border border-white/8 bg-white/[0.02] p-4">
                  <Icon className="h-5 w-5 text-amber-300" />
                  <div className="mt-4 text-sm font-black text-white">{item.title}</div>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        <motion.div
          className="relative overflow-hidden rounded-[2.4rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-4 shadow-[0_35px_120px_rgba(0,0,0,0.48)] backdrop-blur-xl md:p-5"
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            x.set(event.clientX - rect.left);
            y.set(event.clientY - rect.top);
          }}
          onMouseLeave={() => {
            x.set(0);
            y.set(0);
          }}
        >
          <motion.div className="absolute inset-0 opacity-90" style={{ backgroundImage: glow }} />
          <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-amber-500/12 blur-3xl" />
          <div className="absolute -right-10 bottom-4 h-52 w-52 rounded-full bg-amber-300/10 blur-3xl" />

          <motion.div style={{ rotateX, rotateY, transformPerspective: 1200 }} className="relative z-10">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/35">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 md:px-5">
                <div>
                  <div className="text-[11px] font-black uppercase tracking-[0.22em] text-amber-300">{copy.eyebrow}</div>
                  <div className="mt-2 text-2xl font-black text-white">CAVO</div>
                </div>
                <a
                  href={createWhatsAppLink(isArabic ? "أهلاً كافو، أريد معرفة المقاسات المتاحة." : "Hello Cavo, I want to know the available sizes.")}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-zinc-200"
                >
                  WhatsApp
                </a>
              </div>

              <div className="relative min-h-[420px] bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.12),transparent_52%)] md:min-h-[560px]">
                <img src={heroImage} alt="Cavo premium sneaker" className="absolute inset-0 h-full w-full object-cover object-center opacity-95" />
                <div className="absolute inset-x-4 bottom-4 rounded-[1.6rem] border border-white/10 bg-black/55 p-5 backdrop-blur-xl md:inset-x-5 md:bottom-5 md:p-6">
                  <p className="text-[11px] font-black uppercase tracking-[0.24em] text-amber-300">{isArabic ? "القطعة الأساسية" : "Featured Pair"}</p>
                  <h3 className="mt-3 text-2xl font-black text-white md:text-3xl">{isArabic ? "Air Force Grey Black" : "Air Force Grey Black"}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-7 text-zinc-300">
                    {isArabic
                      ? "موديل من صور المشروع نفسها، بتفاصيل أنيقة وخلفية مناسبة لهوية كافو الفاخرة."
                      : "A cleaner hero pair taken from the project visuals, styled to anchor the storefront with a stronger luxury identity."}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
