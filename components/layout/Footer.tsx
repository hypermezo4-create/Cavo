"use client";

import Link from "next/link";
import { Facebook, Instagram, MapPin, MessageCircle, Music4, Phone, Send } from "lucide-react";
import { CavoLogo } from "@/components/brand/CavoLogo";
import { CAVO_BRAND } from "@/lib/brand";
import { CAVO_STORE_ADDRESS } from "@/lib/store-config";
import { useSiteLocale } from "@/lib/use-site-locale";

const quickLinks = [
  { href: "/store", en: "Store", ar: "المتجر" },
  { href: "/store/men", en: "Men", ar: "رجالي" },
  { href: "/store/women", en: "Women", ar: "حريمي" },
  { href: "/store/kids", en: "Kids", ar: "أطفال" },
  { href: "/store/offers", en: "Offers", ar: "العروض" },
  { href: "/about", en: "About", ar: "عن كافو" },
  { href: "/store/contact", en: "Links", ar: "الروابط" },
] as const;

const socials = [
  { href: CAVO_BRAND.social.instagram, label: "Instagram", icon: Instagram, className: "text-[#E4405F]" },
  { href: CAVO_BRAND.social.facebook, label: "Facebook", icon: Facebook, className: "text-[#1877F2]" },
  { href: CAVO_BRAND.social.telegram, label: "Telegram", icon: Send, className: "text-[#229ED9]" },
  { href: CAVO_BRAND.social.tiktok, label: "TikTok", icon: Music4, className: "text-[#FE2C55]" },
  { href: CAVO_BRAND.whatsappBase, label: "WhatsApp", icon: MessageCircle, className: "text-[#25D366]" },
] as const;

export default function Footer() {
  const { isArabic } = useSiteLocale();

  return (
    <footer className="mt-20 border-t border-white/6 bg-black/20">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.1fr_0.8fr_1fr]">
        <div>
          <CavoLogo href="/store" />
          <p className="mt-4 max-w-sm text-sm leading-7 text-zinc-400">
            {isArabic
              ? "متجر كافو الجديد بشكل أفخم، أوضح، ومناسب للموبايل مع نفس الهوية السوداء والدهبية اللي اتفقنا عليها."
              : "Cavo’s new storefront keeps the bold black-and-gold identity while making every section cleaner and stronger on mobile."}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {socials.map((item) => {
              const Icon = item.icon;
              return (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer" aria-label={item.label} className="inline-flex rounded-full border border-white/10 bg-white/[0.04] p-3 shadow-[0_12px_30px_rgba(0,0,0,0.22)] transition hover:border-white/20 hover:bg-white/[0.08]">
                  <Icon className={`h-4 w-4 ${item.className}`} />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-white">{isArabic ? "روابط سريعة" : "Quick Links"}</h4>
          <div className="grid grid-cols-2 gap-3">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-zinc-400 transition hover:text-amber-300">
                {isArabic ? link.ar : link.en}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-white">{isArabic ? "التواصل" : "Contact"}</h4>
          <div className="space-y-4 rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-start gap-3 text-sm text-zinc-300">
              <Phone className="mt-0.5 h-4 w-4 text-amber-300" />
              <span>{CAVO_BRAND.phoneLocal}</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-zinc-300">
              <MapPin className="mt-0.5 h-4 w-4 text-amber-300" />
              <span>{isArabic ? CAVO_STORE_ADDRESS.ar : CAVO_STORE_ADDRESS.en}</span>
            </div>
            <Link href="/store/contact" className="inline-flex rounded-[1rem] border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-amber-200 transition hover:border-amber-300/30 hover:bg-amber-400/12">
              {isArabic ? "افتح صفحة الروابط" : "Open Contact Links"}
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 border-t border-white/6 px-6 py-5 text-sm text-zinc-500 md:flex-row">
        <p>{isArabic ? `© ${new Date().getFullYear()} كافو. جميع الحقوق محفوظة.` : `© ${new Date().getFullYear()} Cavo. All rights reserved.`}</p>
        <div className="flex gap-4">
          <Link href="/store/privacy-policy" className="hover:text-amber-300">{isArabic ? "الخصوصية" : "Privacy Policy"}</Link>
          <Link href="/store/terms-of-service" className="hover:text-amber-300">{isArabic ? "الشروط" : "Terms of Service"}</Link>
        </div>
      </div>
    </footer>
  );
}
