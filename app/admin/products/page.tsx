"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, RefreshCw, Plus, PencilLine, Trash2 } from "lucide-react";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { deleteProduct } from "@/lib/api";
import { useStoreMeta, useProductsState } from "@/lib/use-store-data";
import { useSiteLocale } from "@/lib/use-site-locale";

function StatusBadge({ label }: { label: string }) {
  return <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/70">{label}</span>;
}

export default function AdminProductsPage() {
  const { items: products, setItems, isLoading, refresh } = useProductsState();
  const { categories } = useStoreMeta();
  const { isArabic } = useSiteLocale();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const labels = {
    title: isArabic ? "إدارة المنتجات" : "Products",
    subtitle: isArabic
      ? "لوحة مرنة لإضافة وتعديل المنتجات، مراجعة الصور، وضبط الظهور داخل الموقع بسهولة."
      : "A cleaner product workspace for editing bilingual content, checking images, and controlling storefront visibility.",
    refresh: isArabic ? "تحديث" : "Refresh",
    addProduct: isArabic ? "إضافة منتج" : "Add product",
    search: isArabic ? "ابحث بالاسم أو البراند أو SKU" : "Search by name, brand, or SKU",
    allCategories: isArabic ? "كل الأقسام" : "All categories",
    product: isArabic ? "المنتج" : "Product",
    category: isArabic ? "القسم" : "Category",
    brand: isArabic ? "البراند" : "Brand",
    stock: isArabic ? "المخزون" : "Stock",
    flags: isArabic ? "الظهور" : "Display",
    created: isArabic ? "تاريخ الإضافة" : "Created",
    actions: isArabic ? "الإجراءات" : "Actions",
    edit: isArabic ? "تعديل" : "Edit",
    delete: isArabic ? "حذف" : "Delete",
    deleting: isArabic ? "جارٍ الحذف..." : "Deleting...",
    loading: isArabic ? "جارٍ تحميل المنتجات..." : "Loading catalog...",
    empty: isArabic ? "لا توجد منتجات مطابقة الآن." : "No matching products right now.",
    total: isArabic ? "إجمالي المنتجات" : "Catalog products",
    active: isArabic ? "النشط" : "Active",
    featured: isArabic ? "مميز" : "Featured",
    onSale: isArabic ? "عروض" : "On sale",
    activeBadge: isArabic ? "ظاهر" : "active",
    inactiveBadge: isArabic ? "مخفي" : "inactive",
    featuredBadge: isArabic ? "مميز" : "featured",
    newBadge: isArabic ? "جديد" : "new",
    saleBadge: isArabic ? "عرض" : "sale",
  };

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = categoryFilter === "all" || product.categoryId === categoryFilter;
      if (!matchesCategory) return false;
      if (!normalizedQuery) return true;
      return [
        product.nameEn,
        product.nameAr,
        product.brand?.nameEn,
        product.brand?.nameAr,
        product.sku,
        product.slug,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalizedQuery));
    });
  }, [categoryFilter, products, query]);

  const summary = useMemo(
    () => ({
      total: filteredProducts.length,
      active: filteredProducts.filter((product) => product.isActive !== false).length,
      featured: filteredProducts.filter((product) => product.isFeatured).length,
      onSale: filteredProducts.filter((product) => product.isOnSale).length,
    }),
    [filteredProducts],
  );

  const handleDelete = async (id: string) => {
    const previous = products;
    try {
      setDeletingId(id);
      setItems((current) => current.filter((product) => product.id !== id));
      await deleteProduct(id);
    } catch {
      setItems(previous);
      alert(isArabic ? "فشل حذف المنتج" : "Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AdminPageShell
      title={labels.title}
      subtitle={labels.subtitle}
      action={
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => void refresh()}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-white"
          >
            <RefreshCw className="h-4 w-4" />
            {labels.refresh}
          </button>
          <Link href="/admin/products/new" className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-black">
            <Plus className="h-4 w-4" />
            {labels.addProduct}
          </Link>
        </div>
      }
    >
      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            [labels.total, String(summary.total)],
            [labels.active, String(summary.active)],
            [labels.featured, String(summary.featured)],
            [labels.onSale, String(summary.onSale)],
          ].map(([label, value]) => (
            <div key={label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-white/45">{label}</div>
              <div className="mt-3 text-3xl font-black text-white">{value}</div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="grid gap-3 md:grid-cols-[1fr_220px]">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={labels.search}
                className="w-full rounded-2xl border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/25"
              />
            </label>

            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
            >
              <option value="all">{labels.allCategories}</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {isArabic ? category.nameAr : category.nameEn}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/5 p-4">
        <table className="min-w-full text-left text-sm text-white/80">
          <thead className="text-xs uppercase tracking-wide text-white/45">
            <tr>
              <th className="px-4 py-3">{labels.product}</th>
              <th className="px-4 py-3">{labels.category}</th>
              <th className="px-4 py-3">{labels.brand}</th>
              <th className="px-4 py-3">{labels.stock}</th>
              <th className="px-4 py-3">{labels.flags}</th>
              <th className="px-4 py-3">{labels.created}</th>
              <th className="px-4 py-3">{labels.actions}</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-t border-white/10 align-top">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <img src={product.featuredImage || product.image || "/images/brand/logo.jpg"} alt={product.nameEn} className="h-16 w-16 rounded-2xl object-cover" />
                    <div>
                      <p className="font-semibold text-white">{isArabic ? product.nameAr : product.nameEn}</p>
                      <p className="text-xs text-white/55">{isArabic ? product.nameEn : product.nameAr}</p>
                      <p className="mt-1 text-[11px] text-white/35">{product.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">{isArabic ? product.category?.nameAr : product.category?.nameEn || "—"}</td>
                <td className="px-4 py-4">{isArabic ? product.brand?.nameAr : product.brand?.nameEn || "—"}</td>
                <td className="px-4 py-4">{product.stock ?? 0}</td>
                <td className="px-4 py-4">
                  <div className="flex max-w-[220px] flex-wrap gap-2">
                    <StatusBadge label={product.isActive === false ? labels.inactiveBadge : labels.activeBadge} />
                    {product.isFeatured ? <StatusBadge label={labels.featuredBadge} /> : null}
                    {product.isNewArrival ? <StatusBadge label={labels.newBadge} /> : null}
                    {product.isOnSale ? <StatusBadge label={labels.saleBadge} /> : null}
                  </div>
                </td>
                <td className="px-4 py-4">{new Date(product.createdAt).toLocaleDateString(isArabic ? "ar-EG" : "en-US")}</td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/admin/products/${product.id}`} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-white">
                      <PencilLine className="h-3.5 w-3.5" />
                      {labels.edit}
                    </Link>
                    <button
                      onClick={() => void handleDelete(product.id)}
                      disabled={deletingId === product.id}
                      className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-100 disabled:opacity-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      {deletingId === product.id ? labels.deleting : labels.delete}
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {!filteredProducts.length ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-white/50">
                  {isLoading ? labels.loading : labels.empty}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </AdminPageShell>
  );
}
