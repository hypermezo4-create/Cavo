"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Package2, PlusSquare, ShoppingBag, Shapes, Store } from "lucide-react";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import LanguageToggle from "@/components/layout/LanguageToggle";
import { useSiteLocale } from "@/lib/use-site-locale";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { isArabic } = useSiteLocale();

  const links = [
    { href: "/admin", label: isArabic ? "الرئيسية" : "Home", icon: LayoutGrid },
    { href: "/admin/products", label: isArabic ? "المنتجات" : "Products", icon: Package2 },
    { href: "/admin/products/new", label: isArabic ? "إضافة منتج" : "Add product", icon: PlusSquare },
    { href: "/admin/orders", label: isArabic ? "الطلبات" : "Orders", icon: ShoppingBag },
    { href: "/admin/categories", label: isArabic ? "الأقسام" : "Categories", icon: Shapes },
    { href: "/store", label: isArabic ? "عرض الموقع" : "View store", icon: Store },
  ];

  return (
    <aside className="min-h-screen w-full border-b border-white/10 bg-[#08080d] p-4 text-white md:w-80 md:border-b-0 md:border-r">
      <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/45">Cavo</p>
            <h2 className="mt-2 text-2xl font-black">{isArabic ? "لوحة التحكم" : "Admin panel"}</h2>
            <p className="mt-2 text-sm leading-6 text-white/60">
              {isArabic
                ? "إدارة المنتجات والصور والعرض داخل الموقع من مكان واحد، مع تجربة أسرع وأسهل للموبايل والديسكتوب."
                : "Manage products, images, storefront visibility, and upcoming catalog updates from one smooth workspace."}
            </p>
          </div>
          <LanguageToggle />
        </div>
      </div>

      <nav className="mt-6 grid gap-2">
        {links.map((link) => {
          const active = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href) && link.href.startsWith("/admin"));
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                active
                  ? "bg-white text-black"
                  : "border border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 rounded-[28px] border border-emerald-400/20 bg-emerald-400/5 p-4 text-sm leading-6 text-white/70">
        <div className="font-bold text-white">{isArabic ? "ملحوظة" : "Quick note"}</div>
        <p className="mt-2">
          {isArabic
            ? "يمكنك رفع الصور مع معاينة فورية، وتحديد الصورة الرئيسية بسهولة، وحفظ المنتج ليظهر مباشرة في الموقع."
            : "Upload images with live preview, choose the primary card image easily, and save products to update the site right away."}
        </p>
      </div>

      <div className="mt-6">
        <AdminLogoutButton />
      </div>
    </aside>
  );
}
