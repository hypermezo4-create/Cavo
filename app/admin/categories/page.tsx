"use client";

import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { useCategoriesState, useStoreConfig } from "@/lib/use-store-data";

export default function CategoriesPage() {
  const { items: categories, isLoading, refresh } = useCategoriesState();
  const config = useStoreConfig();

  return (
    <AdminPageShell
      title="Categories"
      subtitle="Core storefront sections and fixed operational rules for the current Cavo launch."
      action={
        <button onClick={() => void refresh()} className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-white">
          Refresh
        </button>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((category) => (
          <div key={category.id} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
            <div className="text-xs uppercase tracking-[0.2em] text-white/45">Category</div>
            <div className="mt-3 text-2xl font-black">{category.nameEn}</div>
            <div className="mt-2 text-sm text-white/55">{category.nameAr}</div>
            <div className="mt-3 text-xs text-white/35">/{category.slug}</div>
          </div>
        ))}

        {!categories.length ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/60 md:col-span-2 xl:col-span-4">
            {isLoading ? "Loading categories..." : "No categories available."}
          </div>
        ) : null}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-bold text-white">Shipping policy</h2>
          <p className="mt-4 text-sm leading-7 text-white/70">{config.shipping.noteEn}</p>
          <p className="mt-2 text-sm leading-7 text-white/55">{config.shipping.noteAr}</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-bold text-white">Store address</h2>
          <p className="mt-4 text-sm leading-7 text-white/70">{config.address.lineEn}</p>
          <p className="mt-2 text-sm leading-7 text-white/55">{config.address.lineAr}</p>
        </div>
      </div>
    </AdminPageShell>
  );
}
