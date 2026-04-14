export const CAVO_BRAND = {
  name: "Cavo",
  phoneLocal: "01221204322",
  phoneIntl: "201221204322",
  whatsappBase: "https://wa.me/201221204322",
  tagline: "Shoes Prime Mirror",
  heroAlert: "Cavo Premium Mirror Footwear",
  storeAddressEn: "Carrefour Road, Arabia, City Center Mall, Hurghada, First Floor, in front of DeFacto",
  storeAddressAr: "كارفور، طريق عربيا، مول سيتي سنتر الغردقة، الدور الأول، أمام ديفاكتو",
  shippingCity: "Hurghada",
  social: {
    instagram: "https://instagram.com/Cavo_mirror",
    telegram: "https://t.me/Cavo_store",
    facebook: "https://www.facebook.com/share/18ahZ8oWVH/",
    tiktok: "https://www.tiktok.com/@cavo6159"
  }
};

export function createWhatsAppLink(message?: string) {
  const text = encodeURIComponent(message || "Hello Cavo, I want to order from your store.");
  return `${CAVO_BRAND.whatsappBase}?text=${text}`;
}
