"use client";

import Link from "next/link";
import { Apple, Facebook, Instagram, MessageCircle, Music4, Send, Smartphone } from "lucide-react";
import { CavoLogo } from "@/components/brand/CavoLogo";
import { CAVO_BRAND } from "@/lib/brand";
import { CAVO_STORE_ADDRESS, HURGHADA_SHIPPING_NOTICE } from "@/lib/store-config";
import { useSiteLocale } from "@/lib/use-site-locale";

const quickLinks = [
  { href: "/store", en: "Store", ar: "المتجر" },
  { href: "/store/men", en: "Men", ar: "رجالي" },
  { href: "/store/women", en: "Women", ar: "حريمي" },
  { href: "/store/kids", en: "Kids", ar: "أطفال" },
  { href: "/store/offers", en: "Offers", ar: "العروض" },
  { href: "/store/reviews", en: "Reviews", ar: "الآراء" },
  { href: "/store/contact", en: "Links", ar: "الروابط" },
] as const;

const appButtons = [
  {
    href: "#download-cavo-app",
    labelEn: "Android",
    labelAr: "أندرويد",
    noteEn: "Coming Soon",
    noteAr: "قريبًا",
    icon: Smartphone,
    iconClass: "text-[#3DDC84]",
  },
  {
    href: "#download-cavo-app",
    labelEn: "iOS",
    labelAr: "آيفون",
    noteEn: "Coming Soon",
    noteAr: "قريبًا",
    icon: Apple,
    iconClass: "text-white",
  },
] as const;

const socialLinks = [
  { href: CAVO_BRAND.social.facebook, label: "Facebook", icon: Facebook, iconClass: "text-[#1877F2]" },
  { href: CAVO_BRAND.social.telegram, label: "Telegram", icon: Send, iconClass: "text-[#229ED9]" },
  { href: CAVO_BRAND.social.instagram, label: "Instagram", icon: Instagram, iconClass: "text-[#E4405F]" },
  { href: CAVO_BRAND.social.tiktok, label: "TikTok", icon: Music4, iconClass: "text-[#FE2C55]" },
  { href: CAVO_BRAND.whatsappBase, label: "WhatsApp", icon: MessageCircle, iconClass: "text-[#25D366]" },
] as const;

export default function Footer() {
  const { isArabic } = useSiteLocale();

  return (
    <footer className="mt-24 border-t border-white/5 bg-black/20">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.15fr_0.85fr_1fr]">
        <div>
          <CavoLogo href="/store" />
          <p className="mt-4 max-w-sm text-sm leading-7 text-zinc-400">
            {isArabic
              ? "واجهة كافو لعرض الصور والتفاصيل والآراء بروح فاخرة وتنظيم واضح وروابط مباشرة لكل قنوات التواصل والتطبيق."
              : "Cavo presents product visuals, details, and reviews through a polished premium catalog with direct social access and app-ready links."}
          </p>
          <div className="mt-6 overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/30">
            <img src="/images/brand/logo.jpg" alt="Cavo logo card" className="h-40 w-full object-cover object-center" />
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">{isArabic ? "روابط سريعة" : "Quick Links"}</h4>
          <div className="grid grid-cols-2 gap-3">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-zinc-500 transition-colors hover:text-amber-400">
                {isArabic ? link.ar : link.en}
              </Link>
            ))}
          </div>
          <div className="mt-6 rounded-[1.6rem] border border-white/10 bg-black/20 p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-white/60">{isArabic ? "الشحن" : "Shipping"}</p>
            <p className="mt-2 text-sm leading-6 text-white">{isArabic ? HURGHADA_SHIPPING_NOTICE.ar : HURGHADA_SHIPPING_NOTICE.en}</p>
            <p className="mt-3 text-xs font-black uppercase tracking-[0.18em] text-white/60">{isArabic ? "عنوان المحل" : "Store Address"}</p>
            <p className="mt-2 text-sm leading-6 text-zinc-400">{isArabic ? CAVO_STORE_ADDRESS.ar : CAVO_STORE_ADDRESS.en}</p>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">{isArabic ? "تواصل وتحميل التطبيق" : "Connect & App"}</h4>
          <div className="space-y-3 text-sm text-zinc-400">
            <p>{isArabic ? "كل قناة موجودة بلونها الرسمي، مع صفحة روابط موحدة وتحميل التطبيق قريبًا." : "Every contact route keeps its native brand color, with a unified links page and upcoming app download access."}</p>
            <div className="flex flex-wrap gap-3 pt-2 text-zinc-500">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer" aria-label={item.label} className="inline-flex rounded-full border border-white/10 bg-white/[0.04] p-3 shadow-[0_12px_30px_rgba(0,0,0,0.22)] transition hover:border-white/20 hover:bg-white/[0.08]">
                    <Icon className={`h-4 w-4 ${item.iconClass}`} />
                  </a>
                );
              })}
            </div>
            <div id="download-cavo-app" className="grid gap-3 pt-3 sm:grid-cols-2">
              {appButtons.map((item) => {
                const Icon = item.icon;
                return (
                  <a key={item.labelEn} href={item.href} className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] px-4 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.22)] backdrop-blur-xl transition hover:border-amber-400/20 hover:bg-white/[0.08]">
                    <div className="flex items-center gap-3">
                      <Icon className={`h-5 w-5 ${item.iconClass}`} />
                      <div>
                        <p className="text-sm font-semibold text-white">{isArabic ? item.labelAr : item.labelEn}</p>
                        <p className="text-xs text-zinc-400">{isArabic ? item.noteAr : item.noteEn}</p>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
            <Link href="/store/contact" className="inline-flex rounded-2xl border border-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-zinc-200 transition hover:border-amber-500/30 hover:text-amber-300">
              {isArabic ? "افتح صفحة الروابط" : "Open links page"}
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 border-t border-white/5 px-6 py-6 text-sm text-zinc-500 md:flex-row">
        <p>{isArabic ? `© ${new Date().getFullYear()} كافو ستور. صور، تفاصيل، وروابط رسمية.` : `© ${new Date().getFullYear()} Cavo Store. Official visuals, details, and links.`}</p>
        <div className="flex gap-4">
          <Link href="/store/privacy-policy" className="hover:text-amber-400">{isArabic ? "الخصوصية" : "Privacy Policy"}</Link>
          <Link href="/store/terms-of-service" className="hover:text-amber-400">{isArabic ? "الشروط" : "Terms of Service"}</Link>
        </div>
      </div>
    </footer>
  );
}
