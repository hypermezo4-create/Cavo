"use client";

import Link from "next/link";
import { Boxes, ImagePlus, LayoutGrid, Languages, Store } from "lucide-react";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { useCategories, useOrders, useProducts, useStoreConfig } from "@/lib/use-store-data";
import { useSiteLocale } from "@/lib/use-site-locale";

export default function AdminPage() {
  const products = useProducts();
  const orders = useOrders();
  const categories = useCategories();
  const config = useStoreConfig();
  const { isArabic } = useSiteLocale();

  const labels = {
    title: isArabic ? "لوحة تحكم كافو" : "Cavo admin",
    subtitle: isArabic
      ? "واجهة منظمة لإدارة المنتجات والصور والظهور داخل الموقع، مع تجهيز مناسب للتوسعات القادمة."
      : "A polished workspace to manage products, images, and storefront visibility before the next growth phase.",
    products: isArabic ? "المنتجات" : "Products",
    orders: isArabic ? "الطلبات" : "Orders",
    categories: isArabic ? "الأقسام" : "Categories",
    store: isArabic ? "الموقع" : "Store",
    defaultLanguage: isArabic ? "اللغة الافتراضية" : "Default language",
    shipping: isArabic ? "الشحن" : "Shipping",
    mode: isArabic ? "وضع الموقع" : "Website mode",
    address: isArabic ? "العنوان" : "Address",
    catalogOnly: isArabic ? "عرض المنتجات والتفاصيل والآراء فقط." : "Catalog, product details, and reviews only.",
    quickActions: isArabic ? "إجراءات سريعة" : "Quick actions",
    addProduct: isArabic ? "إضافة منتج" : "Add product",
    manageProducts: isArabic ? "إدارة المنتجات" : "Manage products",
    viewStore: isArabic ? "عرض الموقع" : "View store",
    uploadTipTitle: isArabic ? "رفع الصور" : "Image uploads",
    uploadTipText: isArabic
      ? "الأدمن الآن مجهز لرفع صور مع معاينة مباشرة وتحديد الصورة الرئيسية بسهولة قبل الحفظ."
      : "The editor is now prepared for live image previews and easier primary-image control before saving.",
  };

  const cards = [
    { label: labels.products, value: products.length, href: "/admin/products", icon: Boxes },
    { label: labels.orders, value: orders.length, href: "/admin/orders", icon: LayoutGrid },
    { label: labels.categories, value: categories.length, href: "/admin/categories", icon: Languages },
    { label: labels.store, value: isArabic ? "فتح" : "Open", href: "/store", icon: Store },
  ];

  return (
    <AdminPageShell title={labels.title} subtitle={labels.subtitle}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.label} href={card.href} className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-xl transition hover:-translate-y-1 hover:bg-white/[0.07]">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm uppercase tracking-[0.2em] text-white/45">{card.label}</div>
                <Icon className="h-5 w-5 text-amber-200" />
              </div>
              <div className="mt-4 text-4xl font-black text-white">{card.value}</div>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-black text-white">{isArabic ? "معلومات الموقع الحالية" : "Current storefront rules"}</h2>
          <div className="mt-5 space-y-3 text-sm leading-7 text-white/65">
            <p><span className="font-semibold text-white">{labels.defaultLanguage}:</span> {config.defaultLocale.toUpperCase()}</p>
            <p><span className="font-semibold text-white">{labels.shipping}:</span> {isArabic ? config.shipping.noteAr : config.shipping.noteEn}</p>
            <p><span className="font-semibold text-white">{labels.mode}:</span> {labels.catalogOnly}</p>
            <p><span className="font-semibold text-white">{labels.address}:</span> {isArabic ? config.address.lineAr : config.address.lineEn}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-black text-white">{labels.quickActions}</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/admin/products/new" className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-black">{labels.addProduct}</Link>
              <Link href="/admin/products" className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-bold text-white">{labels.manageProducts}</Link>
              <Link href="/store" className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-bold text-white">{labels.viewStore}</Link>
            </div>
          </div>

          <div className="rounded-[30px] border border-emerald-400/15 bg-emerald-400/5 p-6 text-sm leading-7 text-white/75">
            <div className="mb-3 flex items-center gap-2 text-white"><ImagePlus className="h-5 w-5 text-emerald-300" /> <span className="font-black">{labels.uploadTipTitle}</span></div>
            <p>{labels.uploadTipText}</p>
          </div>
        </div>
      </div>
    </AdminPageShell>
  );
}
