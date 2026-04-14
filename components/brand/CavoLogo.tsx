import Link from "next/link";
import { CAVO_BRAND } from "@/lib/brand";

export function CavoLogo({ href = "/", compact = false }: { href?: string; compact?: boolean }) {
  return (
    <Link href={href} className="group flex items-center gap-3">
      <div className="relative overflow-hidden rounded-full border border-amber-300/30 bg-black/70 p-0.5 shadow-[0_18px_60px_rgba(0,0,0,0.45)] transition duration-300 group-hover:-translate-y-0.5 group-hover:border-amber-300/55 group-hover:shadow-[0_22px_70px_rgba(0,0,0,0.5)]">
        <img src="/images/brand/cavo-logo-circle-192.png" alt="Cavo logo" className="h-11 w-11 rounded-full object-cover md:h-12 md:w-12" />
      </div>
      <div className="leading-none">
        <div className="text-xl font-black uppercase tracking-[0.24em] text-[#F6D38A] md:text-2xl">CAVO</div>
        {!compact ? <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">{CAVO_BRAND.tagline}</div> : null}
      </div>
    </Link>
  );
}
