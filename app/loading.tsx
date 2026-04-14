export default function Loading() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-6 text-center">
      <div className="flex flex-col items-center gap-5 rounded-[1.8rem] border border-white/10 bg-black/35 px-8 py-8 shadow-[0_20px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl">
        <img src="/images/brand/cavo-logo-circle-192.png" alt="Cavo" className="h-16 w-16 rounded-full" />
        <div className="text-sm font-black uppercase tracking-[0.2em] text-zinc-200">Loading Cavo...</div>
      </div>
    </div>
  );
}
