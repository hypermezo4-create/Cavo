"use client";

import Link from "next/link";
import { ArrowRight, Crown, Headphones, Sparkles } from "lucide-react";
import HeroSection from "@/components/landing/HeroSection";
import StatsStrip from "@/components/landing/StatsStrip";
import { useSiteLocale } from "@/lib/use-site-locale";

const categories = [
  {
    id: "men",
    href: "/store/men",
    image: "/images/cavo/men/air_force/grey_black/grey_black.png",
    titleEn: "Men",
    titleAr: "رجالي",
    descEn: "Premium and sport-inspired pairs with a strong street presence.",
    descAr: "موديلات قوية بروح رياضية وحضور أوضح في الإطلالة.",
  },
  {
    id: "women",
    href: "/store/women",
    image: "/images/cavo/men/air_force/air_force_gucci/gucci.png",
    titleEn: "Women",
    titleAr: "حريمي",
    descEn: "Elegant shapes, soft tones, and refined everyday styling.",
    descAr: "موديلات أنيقة بتفاصيل ناعمة ولمسة فاخرة يومية.",
  },
  {
    id: "kids",
    href: "/store/kids",
    image: "/images/cavo/men/air_force/Beige_green/Beige_green.png",
    titleEn: "Kids",
    titleAr: "أطفال",
    descEn: "Comfort-first pairs built for movement and easy wear.",
    descAr: "أزواج مريحة مناسبة للحركة والاستخدام اليومي السهل.",
  },
  {
    id: "offers",
    href: "/store/offers",
    image: "/images/cavo/men/air_force/cofe_black/cofe_black.png",
    titleEn: "Offers",
    titleAr: "العروض",
    descEn: "Selected drops and spotlight picks from the current collection.",
    descAr: "اختيارات مميزة وعروض محددة من تشكيلة كافو الحالية.",
  },
] as const;

const products = [
  {
    nameEn: "Jordan 4 Black Cat",
    nameAr: "جوردان 4 بلاك كات",
    noteEn: "A deep black signature pair with a bold premium shape.",
    noteAr: "موديل أسود قوي بإحساس فاخر وشكل واضح.",
    image: "/images/cavo/men/air_force/grey_black/grey_black.png",
    href: "/store/men",
  },
  {
    nameEn: "Adidas Samba White",
    nameAr: "أديداس سامبا أبيض",
    noteEn: "Clean lines and a lighter everyday luxury feel.",
    noteAr: "خطوط نظيفة وإحساس أخف للاستخدام اليومي.",
    image: "/images/cavo/men/air_force/air_force_gucci/gucci.png",
    href: "/store/women",
  },
  {
    nameEn: "Air Force Black",
    nameAr: "إير فورس أسود",
    noteEn: "A staple black pair made to look polished on every screen.",
    noteAr: "موديل أساسي بلون أسود يعطي إحساس مرتب وفخم.",
    image: "/images/cavo/men/air_force/the_northe_face/the_northe_face.png",
    href: "/store/men",
  },
  {
    nameEn: "Air Force Coffee Black",
    nameAr: "إير فورس كوفي بلاك",
    noteEn: "A richer black-and-coffee finish with a more polished premium mood.",
    noteAr: "تشطيب أسود وبني يعطي إحساس فاخر داخل التشكيلة المميزة.",
    image: "/images/cavo/men/air_force/cofe_black/cofe_black.png",
    href: "/store/offers",
  },
] as const;

const whyItems = [
  {
    titleEn: "Premium Mirror Quality",
    titleAr: "Mirror Quality فاخر",
    descEn: "Finishes that feel cleaner, richer, and more premium on every pair.",
    descAr: "تشطيب أنظف ولمسة أغنى وشكل أفخم في كل موديل.",
    icon: Crown,
  },
  {
    titleEn: "Handpicked Selection",
    titleAr: "اختيار بعناية",
    descEn: "Curated silhouettes and brands chosen to fit the Cavo identity.",
    descAr: "موديلات وبراندات مختارة بما يناسب هوية كافو الجديدة.",
    icon: Sparkles,
  },
  {
    titleEn: "Fast & Easy Support",
    titleAr: "دعم سريع وسهل",
    descEn: "Quick answers through WhatsApp and direct social contact links.",
    descAr: "رد سريع من خلال واتساب وروابط التواصل المباشرة.",
    icon: Headphones,
  },
] as const;

const brands = ["Nike", "Adidas", "New Balance", "Puma", "Louis Vuitton", "McQueen", "Jordan", "On Cloud"] as const;

export default function HomeContent() {
  const { isArabic } = useSiteLocale();

  return (
    <section>
      <HeroSection />

      <section className="pb-10">
        <div className="mx-auto max-w-7xl rounded-[2.3rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-7">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-amber-300">{isArabic ? "تسوق حسب القسم" : "Shop by category"}</p>
              <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">{isArabic ? "اختَر ستايلك" : "Find Your Style"}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
                {isArabic ? "تقسيمة أوضح للموبايل والديسكتوب، وصور حقيقية من موديلات المشروع نفسه." : "Cleaner storefront sections built around the real shoe visuals already inside the project."}
              </p>
            </div>
            <Link href="/store/products" className="hidden rounded-[1.1rem] border border-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-zinc-100 transition hover:border-amber-300/25 hover:text-amber-200 md:inline-flex">
              {isArabic ? "شاهد الكل" : "View All"}
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {categories.map((item) => (
              <Link key={item.id} href={item.href} className="group overflow-hidden rounded-[1.7rem] border border-white/10 bg-black/35 transition hover:-translate-y-1 hover:border-amber-300/25 hover:shadow-[0_18px_60px_rgba(0,0,0,0.36)]">
                <div className="relative h-52 overflow-hidden bg-black/60">
                  <img src={item.image} alt={isArabic ? item.titleAr : item.titleEn} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>
                <div className="flex items-end justify-between gap-4 p-5">
                  <div>
                    <h3 className="text-2xl font-black text-white">{isArabic ? item.titleAr : item.titleEn}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{isArabic ? item.descAr : item.descEn}</p>
                  </div>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-amber-300/20 bg-amber-400/10 text-amber-300">
                    <ArrowRight className={`h-4 w-4 ${isArabic ? "rotate-180" : ""}`} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-black/35 px-5 py-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.24em] text-amber-300">{isArabic ? "أهم البراندات" : "Top Brands"}</p>
          <div className="cavo-marquee-track min-w-max gap-5">
            {[...brands, ...brands].map((brand, index) => (
              <div key={`${brand}-${index}`} className="inline-flex min-w-[210px] items-center justify-center rounded-[1.2rem] border border-white/10 bg-white/[0.02] px-6 py-4 text-lg font-black uppercase tracking-[0.12em] text-[#E3B45C]">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className="mx-auto max-w-7xl rounded-[2.3rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-7">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-amber-300">{isArabic ? "مختارات كافو" : "Cavo Picks"}</p>
              <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">{isArabic ? "قطع مميزة من المتجر" : "New Arrivals with a Cleaner Look"}</h2>
            </div>
            <Link href="/store/products" className="rounded-[1.1rem] border border-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-zinc-100 transition hover:border-amber-300/25 hover:text-amber-200">
              {isArabic ? "عرض التشكيلة" : "View Collection"}
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {products.map((item) => (
              <Link key={item.nameEn} href={item.href} className="group overflow-hidden rounded-[1.7rem] border border-white/10 bg-black/35 transition hover:-translate-y-1 hover:border-amber-300/25 hover:shadow-[0_18px_60px_rgba(0,0,0,0.36)]">
                <div className="relative h-60 overflow-hidden bg-black/55">
                  <img src={item.image} alt={isArabic ? item.nameAr : item.nameEn} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full bg-amber-400 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-black">
                    {isArabic ? "مختار" : "Selected"}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-black text-white">{isArabic ? item.nameAr : item.nameEn}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{isArabic ? item.noteAr : item.noteEn}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-6">
        <div className="mx-auto grid max-w-7xl gap-6 rounded-[2.3rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-7 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="overflow-hidden rounded-[1.9rem] border border-white/10 bg-black/40">
            <img src="/images/cavo/men/air_force/berlue/betrule.png" alt="Why Cavo" className="h-full min-h-[280px] w-full object-cover" />
          </div>
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-amber-300">{isArabic ? "وعد كافو" : "The Cavo Promise"}</p>
            <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">{isArabic ? "ليه Cavo؟" : "Why Cavo?"}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
              {isArabic ? "ما بنعرضش مجرد صور، إحنا بنبني تجربة متجر أفخم، أوضح، وأسهل على الموبايل مع نفس روح كافو." : "The redesign keeps the luxury tone of Cavo while making the storefront cleaner, calmer, and much stronger on mobile."}
            </p>
            <div className="mt-6 space-y-3">
              {whyItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.titleEn} className="flex items-start gap-4 rounded-[1.4rem] border border-white/10 bg-black/35 p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-400/10 text-amber-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-base font-black text-white">{isArabic ? item.titleAr : item.titleEn}</div>
                      <p className="mt-1 text-sm leading-6 text-zinc-400">{isArabic ? item.descAr : item.descEn}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <StatsStrip />
    </section>
  );
}
