"use client";

import { Apple, Facebook, Instagram, MessageCircle, Music4, Send, Smartphone } from "lucide-react";
import { CAVO_BRAND } from "@/lib/brand";
import { CAVO_STORE_ADDRESS, HURGHADA_SHIPPING_NOTICE } from "@/lib/store-config";
import { useSiteLocale } from "@/lib/use-site-locale";

const socialCards = [
  {
    id: "whatsapp",
    labelEn: "WhatsApp",
    labelAr: "واتساب",
    href: CAVO_BRAND.whatsappBase,
    subEn: CAVO_BRAND.phoneLocal,
    subAr: CAVO_BRAND.phoneLocal,
    descEn: "Fast direct communication for product inquiries, availability, and follow-up.",
    descAr: "تواصل مباشر وسريع للاستفسار عن المنتجات والتوفر والمتابعة.",
    icon: MessageCircle,
    iconColor: "text-[#25D366]",
    glow: "from-[#25D366]/20 to-transparent",
  },
  {
    id: "facebook",
    labelEn: "Facebook",
    labelAr: "فيسبوك",
    href: CAVO_BRAND.social.facebook,
    subEn: "Official Cavo page",
    subAr: "الصفحة الرسمية لكافو",
    descEn: "See updates, brand moments, and community highlights in one place.",
    descAr: "تابع التحديثات وحضور البراند وأبرز المحتويات في مكان واحد.",
    icon: Facebook,
    iconColor: "text-[#1877F2]",
    glow: "from-[#1877F2]/20 to-transparent",
  },
  {
    id: "telegram",
    labelEn: "Telegram",
    labelAr: "تيليجرام",
    href: CAVO_BRAND.social.telegram,
    subEn: "@Cavo_store",
    subAr: "@Cavo_store",
    descEn: "Open the Telegram channel for direct reach and fast updates.",
    descAr: "افتح قناة تيليجرام للوصول المباشر والتحديثات السريعة.",
    icon: Send,
    iconColor: "text-[#229ED9]",
    glow: "from-[#229ED9]/20 to-transparent",
  },
  {
    id: "instagram",
    labelEn: "Instagram",
    labelAr: "إنستجرام",
    href: CAVO_BRAND.social.instagram,
    subEn: "@Cavo_mirror",
    subAr: "@Cavo_mirror",
    descEn: "Visual drops, product stories, and polished mirror showcase content.",
    descAr: "دروب بصري، ستوري للمنتجات، ومحتوى عرض أنيق لجودة الميرور.",
    icon: Instagram,
    iconColor: "text-[#E4405F]",
    glow: "from-[#E4405F]/20 to-transparent",
  },
  {
    id: "tiktok",
    labelEn: "TikTok",
    labelAr: "تيك توك",
    href: CAVO_BRAND.social.tiktok,
    subEn: "@cavo6159",
    subAr: "@cavo6159",
    descEn: "Short premium clips and trend-friendly visual content.",
    descAr: "مقاطع قصيرة فخمة ومحتوى بصري مناسب للترند والعرض.",
    icon: Music4,
    iconColor: "text-[#FE2C55]",
    glow: "from-[#FE2C55]/20 to-transparent",
  },
] as const;

const appCards = [
  {
    id: "android",
    labelEn: "Cavo Android",
    labelAr: "كافو أندرويد",
    noteEn: "App link will be added here once the Android build is ready.",
    noteAr: "سيتم إضافة رابط التطبيق هنا فور جاهزية نسخة الأندرويد.",
    statusEn: "Coming Soon",
    statusAr: "قريبًا",
    icon: Smartphone,
    iconColor: "text-[#3DDC84]",
    glow: "from-[#3DDC84]/20 to-transparent",
  },
  {
    id: "ios",
    labelEn: "Cavo iOS",
    labelAr: "كافو iOS",
    noteEn: "The App Store button will go live as soon as the iPhone version is prepared.",
    noteAr: "سيتم تفعيل زر App Store بمجرد تجهيز نسخة الآيفون.",
    statusEn: "Coming Soon",
    statusAr: "قريبًا",
    icon: Apple,
    iconColor: "text-white",
    glow: "from-white/10 to-transparent",
  },
] as const;

export default function ContactPage() {
  const { isArabic } = useSiteLocale();

  return (
    <section className="px-4 py-10 md:px-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-400">{isArabic ? "روابط كافو" : "Cavo Links"}</p>
            <h1 className="mt-4 text-4xl font-black text-white md:text-5xl">
              {isArabic ? "كل طرق التواصل وتحميل التطبيق في صفحة واحدة." : "Every official contact route and app access in one premium page."}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-300">
              {isArabic
                ? "كل أيقونة هنا بلونها الأصلي، مع تصميم زجاجي واضح وسريع لفتح واتساب والسوشيال وروابط التطبيق المستقبلية بسهولة."
                : "Each icon keeps its native color with a glossy glass layout that makes WhatsApp, social links, and future app downloads feel clean and premium."}
            </p>

            <div className="mt-7 rounded-[1.9rem] border border-white/10 bg-black/20 p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-white/60">{isArabic ? "الشحن" : "Shipping"}</p>
              <p className="mt-2 text-sm leading-7 text-white">{isArabic ? HURGHADA_SHIPPING_NOTICE.ar : HURGHADA_SHIPPING_NOTICE.en}</p>
              <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-white/60">{isArabic ? "عنوان المحل" : "Store address"}</p>
              <p className="mt-2 text-sm leading-7 text-zinc-300">{isArabic ? CAVO_STORE_ADDRESS.ar : CAVO_STORE_ADDRESS.en}</p>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-400">{isArabic ? "تحميل تطبيق كافو" : "Download Cavo App"}</p>
            <h2 className="mt-4 text-3xl font-black text-white">{isArabic ? "زرار أندرويد و iOS جاهزين من الآن." : "Android and iOS entry points are ready from now."}</h2>
            <p className="mt-4 text-base leading-8 text-zinc-300">
              {isArabic
                ? "الروابط النهائية ستُضاف هنا مباشرة عندما تصبح نسخة التطبيق جاهزة، مع بقاء الاسم الرسمي للتطبيق Cavo على المنصتين."
                : "Final store links will be added here the moment the app is ready, while keeping the official application name Cavo for both platforms."}
            </p>
            <div className="mt-6 grid gap-4">
              {appCards.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className={`relative overflow-hidden rounded-[1.9rem] border border-white/10 bg-black/20 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.28)]`}>
                    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.glow}`} />
                    <div className="relative flex items-start gap-4">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 shadow-[0_12px_24px_rgba(0,0,0,0.18)]">
                        <Icon className={`h-6 w-6 ${item.iconColor}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <h3 className="text-lg font-bold text-white">{isArabic ? item.labelAr : item.labelEn}</h3>
                            <p className="mt-1 text-sm text-zinc-300">{isArabic ? item.noteAr : item.noteEn}</p>
                          </div>
                          <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-amber-300">{isArabic ? item.statusAr : item.statusEn}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {socialCards.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition hover:-translate-y-1 hover:border-white/20"
              >
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.glow}`} />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <div className="rounded-[1.3rem] border border-white/10 bg-white/[0.06] p-3 shadow-[0_12px_24px_rgba(0,0,0,0.2)]">
                      <Icon className={`h-6 w-6 ${item.iconColor}`} />
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-zinc-200 transition group-hover:text-white">{isArabic ? "افتح" : "Open"}</span>
                  </div>
                  <div className="mt-5">
                    <h3 className="text-2xl font-black text-white">{isArabic ? item.labelAr : item.labelEn}</h3>
                    <p className="mt-2 text-sm font-medium text-zinc-300">{isArabic ? item.subAr : item.subEn}</p>
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-7 text-zinc-400">{isArabic ? item.descAr : item.descEn}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
