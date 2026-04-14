import type { StoreConfig } from "@/lib/store-types";

export const CAVO_STORE_CONFIG: StoreConfig = {
  storeName: "Cavo",
  defaultLocale: "en",
  supportedLocales: ["en", "ar"],
  priceVisibility: "hidden",
  shipping: {
    city: "Hurghada",
    cityEn: "Hurghada",
    cityAr: "الغردقة",
    noteEn: "Shipping is currently available within Hurghada only.",
    noteAr: "الشحن متاح حاليًا داخل الغردقة فقط.",
    allowEveryAreaWithinCity: true,
  },
  address: {
    labelEn: "Store address",
    labelAr: "عنوان المحل",
    lineEn: "Carrefour Road, Arabia, City Center Mall, Hurghada, First Floor, in front of DeFacto",
    lineAr: "كارفور، طريق عربيا، مول سيتي سنتر الغردقة، الدور الأول، أمام ديفاكتو",
  },
};

export const HURGHADA_SHIPPING_NOTICE = {
  en: CAVO_STORE_CONFIG.shipping.noteEn,
  ar: CAVO_STORE_CONFIG.shipping.noteAr,
};

export const CAVO_STORE_ADDRESS = {
  en: CAVO_STORE_CONFIG.address.lineEn,
  ar: CAVO_STORE_CONFIG.address.lineAr,
};
