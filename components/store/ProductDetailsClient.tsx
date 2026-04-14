"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/api";

export default function ProductDetailsClient({ product }: { product: Product }) {
  const gallery = useMemo(() => Array.from(new Set([product.featuredImage, ...(product.images || [])].filter(Boolean) as string[])), [product]);
  const [active, setActive] = useState(gallery[0] || "/images/brand/logo.jpg");
  const reviewCount = product.reviews?.length || product._count?.reviews || 0;

  return (
    <section className="px-4 py-10 md:px-6">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_0.9fr]">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/30 shadow-[0_25px_70px_rgba(0,0,0,0.25)]">
            <img src={active} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
            {gallery.map((image) => (
              <button key={image} onClick={() => setActive(image)} className={`overflow-hidden rounded-2xl border ${active === image ? "border-amber-400" : "border-white/10"}`}>
                <img src={image} alt={product.name} className="h-24 w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-7 shadow-[0_22px_70px_rgba(0,0,0,0.26)] backdrop-blur-xl md:p-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-[0.22em] text-amber-400">
            <span>{product.brand?.name}</span>
            <span className="text-zinc-500">•</span>
            <span>{product.category?.name}</span>
            {reviewCount ? (
              <>
                <span className="text-zinc-500">•</span>
                <span>{reviewCount} reviews</span>
              </>
            ) : null}
          </div>
          <h1 className="mt-3 text-4xl font-black text-white">{product.name}</h1>
          <p className="mt-4 text-base leading-8 text-zinc-400">{product.descriptionEn}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">Available colors</div>
              <div className="mt-2 text-sm text-white">{product.colors.join(" • ") || "Shown in gallery"}</div>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">Available sizes</div>
              <div className="mt-2 text-sm text-white">{product.sizes.join(" • ") || "Shown in details"}</div>
            </div>
          </div>

          <div className="mt-8 rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-300">Website mode</p>
            <p className="mt-2 text-sm leading-7 text-zinc-400">This website is for photos, product details, and reviews only. Pricing and buying will be available later inside the Cavo app. الشراء والأسعار سيكونان داخل تطبيق كافو فقط.</p>
          </div>

          <div className="mt-6 rounded-[1.8rem] border border-white/10 bg-black/20 p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/60">Hurghada notice</p>
            <p className="mt-2 text-sm leading-7 text-zinc-400">Shipping is currently available within Hurghada only. الشحن متاح حاليًا داخل الغردقة فقط.</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/store/reviews" className="rounded-2xl bg-amber-500 px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-black">Read reviews</Link>
            <Link href="/store/contact" className="rounded-2xl border border-white/10 px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-white">Store links</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
