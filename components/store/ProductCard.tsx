import Link from "next/link";
import type { Product } from "@/lib/api";

export default function ProductCard({ product }: { product: Product }) {
  const sizeLabel = product.sizes?.length ? `Sizes ${product.sizes[0]}–${product.sizes[product.sizes.length - 1]}` : "Details available";

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] shadow-[0_22px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-amber-400/30 hover:shadow-[0_28px_70px_rgba(245,158,11,0.08)]">
      <div className="relative aspect-[4/4.5] overflow-hidden">
        <img src={product.featuredImage || product.image || "/images/brand/logo.jpg"} alt={product.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-amber-300 backdrop-blur">
          {product.brand?.name}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
          <span>{product.category?.name}</span>
          {product._count?.reviews ? <span className="text-amber-400">• {product._count.reviews} reviews</span> : null}
        </div>
        <h3 className="mt-3 text-xl font-black text-white">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-7 text-zinc-400">{product.description || "Premium Cavo selection."}</p>

        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">{sizeLabel}</div>
          <Link href={`/store/products/${product.id}`} className="rounded-2xl border border-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:border-amber-500/30 hover:text-amber-300">
            <span>View details</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
