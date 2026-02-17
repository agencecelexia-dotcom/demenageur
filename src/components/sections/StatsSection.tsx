const items = [
  { value: "25 ans", label: "d'expérience" },
  { value: "20+", label: "chauffeurs & collaborateurs" },
  { value: "98%", label: "clients satisfaits" },
  { value: "15+", label: "pays desservis" },
  { value: "Euro 6", label: "flotte certifiée" },
  { value: "2h", label: "délai de réponse devis" },
];

// Duplicate for seamless loop
const ticker = [...items, ...items];

export default function StatsSection() {
  return (
    <div className="h-16 bg-accent-500 overflow-hidden flex items-center" aria-hidden>
      <div className="animate-marquee flex items-center gap-0">
        {ticker.map((item, i) => (
          <div key={i} className="flex items-center gap-0 shrink-0">
            <div className="flex items-center gap-2 px-8">
              <span className="font-heading font-bold text-white text-sm">
                {item.value}
              </span>
              <span className="text-white/70 text-xs uppercase tracking-widest">
                {item.label}
              </span>
            </div>
            <span className="text-white/40 text-lg font-thin select-none">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
