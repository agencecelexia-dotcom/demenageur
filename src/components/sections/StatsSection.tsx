"use client";
import CountUp from "@/components/animations/CountUp";
import FadeUp from "@/components/animations/FadeUp";

const stats = [
  { value: 25, suffix: " ans", label: "D'expérience", color: "from-blue-500 to-indigo-600", bg: "bg-blue-50", text: "text-blue-700" },
  { value: 20, suffix: "+", label: "Chauffeurs & collaborateurs", color: "from-amber-400 to-orange-500", bg: "bg-amber-50", text: "text-amber-700" },
  { value: 98, suffix: "%", label: "Clients satisfaits", color: "from-emerald-400 to-teal-500", bg: "bg-emerald-50", text: "text-emerald-700" },
  { value: 15, suffix: "+", label: "Pays desservis", color: "from-violet-400 to-purple-600", bg: "bg-violet-50", text: "text-violet-700" },
];

export default function StatsSection() {
  return (
    <section className="py-24 bg-primary-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.1}>
              <div className="relative bg-primary-900/60 backdrop-blur-sm rounded-2xl px-6 py-10 text-center overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                {/* Gradient accent bar */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 h-1 w-16 rounded-b-full bg-gradient-to-r ${stat.color}`} />
                <div className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight">
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
