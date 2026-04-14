"use client";

import { useEffect, useMemo, useState } from "react";
import { defaultLocale, type Locale } from "@/lib/i18n";

const STORAGE_KEY = "cavo-locale";
const EVENT_NAME = "cavo-locale-change";

function applyLocale(locale: Locale) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = locale;
  document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
}

export function getStoredLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "ar" ? "ar" : "en";
}

export function setStoredLocale(locale: Locale) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, locale);
  applyLocale(locale);
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: locale }));
}

export function useSiteLocale() {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const initial = getStoredLocale();
    setLocale(initial);
    applyLocale(initial);

    const handleChange = (event: Event) => {
      const nextLocale = (event as CustomEvent<Locale>).detail || getStoredLocale();
      setLocale(nextLocale);
      applyLocale(nextLocale);
    };

    window.addEventListener(EVENT_NAME, handleChange as EventListener);
    return () => window.removeEventListener(EVENT_NAME, handleChange as EventListener);
  }, []);

  const isArabic = locale === "ar";

  return useMemo(
    () => ({
      locale,
      isArabic,
      setLocale: setStoredLocale,
      toggleLocale: () => setStoredLocale(isArabic ? "en" : "ar"),
    }),
    [locale, isArabic],
  );
}
