const stats = [
  { label: "Curated categories", value: "4" },
  { label: "Social channels", value: "5" },
  { label: "Premium visual mode", value: "Dark" },
  { label: "Order flow", value: "Inquiry" },
];

export default function StatsStrip() {
  return (
    <section className="px-4 py-8 md:px-6">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="glass rounded-[2rem] p-6 text-center premium-hover">
            <div className="text-3xl font-black text-white">{item.value}</div>
            <div className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
