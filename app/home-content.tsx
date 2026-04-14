import Link from "next/link";
import HeroSection from "@/components/landing/HeroSection";
import StatsStrip from "@/components/landing/StatsStrip";
import StoreGrid from "@/components/store/StoreGrid";
import { BRAND_LOGOS, TESTIMONIALS } from "@/lib/site-data";
import { Star } from "lucide-react";

const categories = [
  { title: "Men", href: "/store/men", desc: "Premium mirror pairs curated for daily style and smooth streetwear energy." },
  { title: "Women", href: "/store/women", desc: "Elegant silhouettes with polished comfort and luxury finishing." },
  { title: "Kids", href: "/store/kids", desc: "Lightweight, durable pairs built for movement and all-day comfort." },
  { title: "Offers", href: "/store/offers", desc: "Selected showcase drops featured by Cavo for the main catalog." },
];

export default function HomeContent() {
  return (
    <section>
      <HeroSection />
      <StatsStrip />

      <section className="px-4 pb-8 pt-4 md:px-6">
        <div className="mx-auto max-w-7xl rounded-[2.4rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-400">Brand wall</p>
              <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">Brand visuals featured on the main experience</h2>
            </div>
            <Link href="/store/contact" className="rounded-2xl border border-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-zinc-200 transition hover:border-amber-500/30 hover:text-amber-300">Open contact links</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BRAND_LOGOS.map((brand) => (
              <div key={brand.id} className="group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/30 p-5 transition duration-500 hover:-translate-y-1 hover:border-amber-400/40">
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(circle at center, rgba(245,158,11,0.16), transparent 60%)" }} />
                <img src={brand.image} alt={brand.alt} className="relative z-10 h-24 w-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-10 pt-4">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-400">Explore Cavo</p>
              <h2 className="mt-3 text-4xl font-black text-white">Collections made for every category</h2>
            </div>
            <Link href="/store/products" className="rounded-2xl border border-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-zinc-200 transition hover:border-amber-500/30 hover:text-amber-300">View all models</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {categories.map((category) => (
              <Link key={category.href} href={category.href} className="glass rounded-[2rem] border border-white/5 p-8 transition hover:-translate-y-1 hover:border-amber-500/30 hover:bg-white/[0.05]">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">Collection</p>
                <h3 className="mt-4 text-2xl font-bold text-white">{category.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{category.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <StoreGrid limit={12} title="Featured selection" description="The strongest Cavo showcase drops, styled for a smooth premium catalog experience with no public prices on the site." />

      <section className="px-4 pb-16 pt-2 md:px-6">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-zinc-950 to-zinc-900 p-8">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-400">Customer voices</p>
              <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">Reviews that build trust around the brand</h2>
            </div>
            <Link href="/store/reviews" className="rounded-2xl border border-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-zinc-200 transition hover:border-amber-500/30 hover:text-amber-300">Open reviews</Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((item) => (
              <div key={item.id} className="rounded-[1.8rem] border border-white/10 bg-black/25 p-6">
                <div className="flex items-center gap-1 text-amber-300">
                  {Array.from({ length: item.rating }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-4 text-sm leading-7 text-zinc-300">“{item.text}”</p>
                <div className="mt-5">
                  <p className="font-bold text-white">{item.name}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
