export const metadata = { title: "About | Cavo", description: "About the Cavo brand" };

export default function AboutPage() {
  return (
    <section className="px-4 py-10 md:px-6">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.95fr_1.05fr]">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/30 shadow-[0_24px_70px_rgba(0,0,0,0.24)]">
          <img src="/images/brand/hero.jpg" alt="Cavo" className="h-full w-full object-cover" />
        </div>
        <div className="rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-8 backdrop-blur-xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-400">About Cavo</p>
          <h1 className="mt-4 text-4xl font-black text-white">Premium mirror storefront built for a clean, smooth, brand-first showcase.</h1>
          <p className="mt-6 text-base leading-8 text-zinc-400">Cavo is designed as a premium catalog experience where visitors explore real model imagery, polished descriptions, and organized sections without the visual noise of checkout elements on the site itself.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.8rem] border border-white/10 bg-black/20 p-5"><h3 className="text-lg font-black text-white">What we focus on</h3><p className="mt-2 text-sm leading-7 text-zinc-400">Smooth presentation, polished structure, premium motion, and category clarity.</p></div>
            <div className="rounded-[1.8rem] border border-white/10 bg-black/20 p-5"><h3 className="text-lg font-black text-white">How the flow works</h3><p className="mt-2 text-sm leading-7 text-zinc-400">The site is showcase only. Communication and application access happen from the contact links page only.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}
