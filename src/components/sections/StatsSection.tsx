"use client";
import CountUp from "@/components/animations/CountUp";
import FadeUp from "@/components/animations/FadeUp";

const stats = [
  { value: 25, suffix: " ans", label: "D'expérience" },
  { value: 20, suffix: "+", label: "Chauffeurs & collaborateurs" },
  { value: 98, suffix: "%", label: "Clients satisfaits" },
  { value: 15, suffix: "+", label: "Pays desservis" },
];

export default function StatsSection() {
  return (
    <section className="py-24 bg-primary-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
          {stats.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.1}>
              <div className="bg-primary-950 px-8 py-12 text-center">
                <div className="font-heading text-6xl md:text-7xl font-bold text-white tracking-tight">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-3 text-sm font-medium text-neutral-400 tracking-wide">{stat.label}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
