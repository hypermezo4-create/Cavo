import Link from "next/link";
import { CAVO_BRAND } from "@/lib/brand";

export function CavoLogo({ href = "/", compact = false }: { href?: string; compact?: boolean }) {
  return (
    <Link href={href} className="group flex items-center gap-3">
      <div className="relative overflow-hidden rounded-[1.35rem] border border-amber-300/25 bg-black/70 shadow-[0_18px_50px_rgba(0,0,0,0.42)] transition duration-300 group-hover:-translate-y-0.5 group-hover:border-amber-300/45">
        <img src="/images/brand/logo.jpg" alt="Cavo logo" className="h-11 w-11 object-cover md:h-12 md:w-12" />
      </div>
      <div className="leading-none">
        <div className="text-2xl font-black uppercase tracking-[0.22em] text-white">Cavo</div>
        {!compact ? <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.24em] text-amber-300/90">{CAVO_BRAND.tagline}</div> : null}
      </div>
    </Link>
  );
}
