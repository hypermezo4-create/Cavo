"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CAVO_BRAND } from "@/lib/brand";
import { useMemo } from "react";

export default function HeroSection() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 120, damping: 18, mass: 0.6 });
  const smoothY = useSpring(y, { stiffness: 120, damping: 18, mass: 0.6 });
  const rotateY = useTransform(smoothX, [-100, 100], [-8, 8]);
  const rotateX = useTransform(smoothY, [-100, 100], [8, -8]);
  const glow = useMemo(() => ({ background: "radial-gradient(circle at center, rgba(245,158,11,0.32), rgba(245,158,11,0.08) 35%, transparent 65%)" }), []);

  return (
    <section className="px-4 pt-8 md:px-6 md:pt-10">
      <div className="mx-auto grid max-w-7xl gap-6 overflow-hidden rounded-[2.8rem] border border-white/10 bg-[linear-gradient(135deg,#09090c_0%,#11131c_55%,#0c0d10_100%)] p-6 shadow-[0_25px_120px_rgba(0,0,0,0.5)] md:grid-cols-[1.05fr_0.95fr] md:p-8">
        <div className="flex flex-col justify-center">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-xs font-black uppercase tracking-[0.28em] text-amber-400">
            {CAVO_BRAND.tagline}
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }} className="mt-4 max-w-3xl text-4xl font-black leading-tight text-white md:text-6xl">
            Smooth premium catalog design with a luxury 3D feel.
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="mt-6 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg">
            Cavo is built as a high-end showcase for men, women, kids, and selected featured drops. The site is for presentation only, while the application handles the full shopping flow later.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="mt-8 flex flex-wrap gap-4">
            <Link href="/store/products" className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:brightness-110">
              Browse collection <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/store/contact" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:border-amber-500/30 hover:text-amber-300">
              Contact links
            </Link>
          </motion.div>
        </div>

        <div
          className="relative flex items-center justify-center overflow-hidden rounded-[2.2rem] border border-white/10 bg-black/40 px-5 py-10"
          onMouseMove={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect();
            x.set(event.clientX - bounds.left - bounds.width / 2);
            y.set(event.clientY - bounds.top - bounds.height / 2);
          }}
          onMouseLeave={() => {
            x.set(0);
            y.set(0);
          }}
        >
          <div className="absolute inset-0 opacity-90" style={glow} />
          <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="absolute -right-8 bottom-0 h-56 w-56 rounded-full bg-amber-300/10 blur-3xl" />

          <motion.div style={{ rotateX, rotateY, transformPerspective: 1200 }} className="relative z-10 w-full max-w-[520px]">
            <div className="relative rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))] p-4 shadow-[0_35px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              <img src="/images/brand/hero.jpg" alt="Cavo hero" className="h-[420px] w-full rounded-[1.8rem] object-cover shadow-[0_25px_90px_rgba(0,0,0,0.35)] md:h-[500px]" />
              <div className="absolute inset-x-10 bottom-8 rounded-[1.6rem] border border-white/10 bg-black/40 p-5 backdrop-blur-xl">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-amber-300">Cavo Collection</p>
                <p className="mt-2 text-sm leading-7 text-zinc-300">Brand-led showcase, refined movement, and a polished premium presentation built to feel smooth on every screen.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
