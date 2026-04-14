"use client";

import type { Product } from "@/lib/api";
import { useProducts } from "@/lib/use-store-data";
import ProductCard from "@/components/store/ProductCard";

type StoreGridProps = {
  category?: string;
  limit?: number;
  title?: string;
  description?: string;
};

export default function StoreGrid({ category, limit, title, description }: StoreGridProps) {
  const products = useProducts();

  let filtered = products;

  if (category) {
    filtered = filtered.filter((product) => product.category?.slug?.toLowerCase() === category.toLowerCase() || product.category?.name?.toLowerCase() === category.toLowerCase());
  }

  if (limit) {
    filtered = filtered.slice(0, limit);
  }

  return (
    <section className="px-4 py-10 md:px-6">
      <div className="mx-auto max-w-7xl">
        {title ? (
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-400">Cavo collection</p>
            <h1 className="mt-3 text-4xl font-black text-white">{title}</h1>
            {description ? <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">{description}</p> : null}
          </div>
        ) : null}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product: Product) => <ProductCard key={product.id} product={product} />)}
        </div>

        {!filtered.length ? (
          <div className="glass rounded-[2rem] p-8 text-center text-zinc-400">No products found in this collection yet.</div>
        ) : null}
      </div>
    </section>
  );
}
