"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Submission, AnalyticsEvent } from "@/lib/storage";

// ─── Types ──────────────────────────────────────────────────────────────────
interface Props {
  submissions: Submission[];
  recentEvents: AnalyticsEvent[];
  stats: {
    totalSubmissions: number;
    unread: number;
    totalPageViews: number;
    viewsThisWeek: number;
    viewsLastWeek: number;
    subsThisWeek: number;
    subsLastWeek: number;
    totalCtaClicks: number;
    totalFormSubmits: number;
    conversionRate: number;
    formCompletionRate: number;
  };
  dailyViews: { label: string; views: number; clicks: number }[];
  topPages: [string, number][];
  topCta: [string, number][];
  serviceBreakdown: [string, number][];
}

const SERVICE_LABELS: Record<string, string> = {
  demenagement_local: "Dém. local",
  demenagement_longue_distance: "Longue distance",
  demenagement_international: "International",
  garde_meubles: "Garde-meubles",
  demenagement_entreprise: "Entreprise",
  transport_specifique: "Transport spécifique",
};

const SERVICE_COLORS: Record<string, string> = {
  demenagement_local: "#3b82f6",
  demenagement_longue_distance: "#a855f7",
  demenagement_international: "#f59e0b",
  garde_meubles: "#10b981",
  demenagement_entreprise: "#f43f5e",
  transport_specifique: "#6366f1",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}

function pctChange(curr: number, prev: number) {
  if (prev === 0) return curr > 0 ? 100 : 0;
  return Math.round(((curr - prev) / prev) * 100);
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Bonjour";
  if (h < 18) return "Bon après-midi";
  return "Bonsoir";
}

// ─── Smooth Area Chart (SVG with cubic bezier curves) ───────────────────────
function AreaChart({ data, height = 200 }: { data: { label: string; views: number; clicks: number }[]; height?: number }) {
  const W = 600;
  const H = height;
  const PAD = { top: 24, right: 16, bottom: 40, left: 44 };
  const w = W - PAD.left - PAD.right;
  const h = H - PAD.top - PAD.bottom;

  const maxViews = Math.max(...data.map((d) => d.views), 1);
  const maxVal = Math.ceil(maxViews / 5) * 5 || 5;
  const xStep = w / (data.length - 1);

  function x(i: number) { return PAD.left + i * xStep; }
  function y(v: number) { return PAD.top + h - (v / maxVal) * h; }

  // Smooth cubic bezier path
  function smoothPath(pts: { x: number; y: number }[]) {
    if (pts.length < 2) return "";
    let d = `M${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(i - 1, 0)];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[Math.min(i + 2, pts.length - 1)];
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }
    return d;
  }

  const viewsPts = data.map((d, i) => ({ x: x(i), y: y(d.views) }));
  const clicksPts = data.map((d, i) => ({ x: x(i), y: y(d.clicks) }));

  const viewsLine = smoothPath(viewsPts);
  const viewsArea = `${viewsLine} L${x(data.length - 1)},${y(0)} L${x(0)},${y(0)} Z`;

  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((p) => Math.round(maxVal * p));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.25} />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="3" result="g" /><feMerge><feMergeNode in="g" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>

      {/* Grid */}
      {gridLines.map((v) => (
        <g key={v}>
          <line x1={PAD.left} y1={y(v)} x2={W - PAD.right} y2={y(v)} stroke="#e5e7eb" strokeWidth={0.8} strokeDasharray="4,4" />
          <text x={PAD.left - 8} y={y(v) + 4} fill="#9ca3af" fontSize={9} textAnchor="end" fontWeight={500}>{v}</text>
        </g>
      ))}

      {/* Area fill */}
      <path d={viewsArea} fill="url(#areaGrad)" />

      {/* Smooth lines */}
      <path d={viewsLine} fill="none" stroke="url(#lineGrad)" strokeWidth={2.5} strokeLinecap="round" />
      <path d={smoothPath(clicksPts)} fill="none" stroke="#f59e0b" strokeWidth={2} strokeLinecap="round" strokeDasharray="6,5" opacity={0.7} />

      {/* Dots with glow */}
      {data.map((d, i) => (
        <g key={i}>
          <circle cx={x(i)} cy={y(d.views)} r={4} fill="#3b82f6" stroke="white" strokeWidth={2.5} filter="url(#glow)" />
          {d.clicks > 0 && <circle cx={x(i)} cy={y(d.clicks)} r={3} fill="#f59e0b" stroke="white" strokeWidth={2} />}
        </g>
      ))}

      {/* X labels */}
      {data.map((d, i) => (
        i % 2 === 0 && <text key={i} x={x(i)} y={H - 10} fill="#9ca3af" fontSize={8} textAnchor="middle" fontWeight={500}>{d.label}</text>
      ))}
    </svg>
  );
}

// ─── Donut Chart ────────────────────────────────────────────────────────────
function DonutChart({ data }: { data: [string, number][] }) {
  const total = data.reduce((a, b) => a + b[1], 0);
  if (total === 0) return null;

  const size = 160;
  const cx = size / 2;
  const cy = size / 2;
  const r = 58;
  const strokeW = 22;
  const circ = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f3f4f6" strokeWidth={strokeW} />
        {data.map(([key, count]) => {
          const pct = count / total;
          const dash = pct * circ;
          const gap = circ - dash;
          const seg = (
            <circle key={key} cx={cx} cy={cy} r={r} fill="none" stroke={SERVICE_COLORS[key] ?? "#94a3b8"} strokeWidth={strokeW} strokeDasharray={`${dash} ${gap}`} strokeDashoffset={-offset} strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`} />
          );
          offset += dash;
          return seg;
        })}
        <text x={cx} y={cy - 6} textAnchor="middle" fill="#111827" fontSize={26} fontWeight="800">{total}</text>
        <text x={cx} y={cy + 12} textAnchor="middle" fill="#9ca3af" fontSize={10} fontWeight={500}>demandes</text>
      </svg>
      <div className="space-y-2.5">
        {data.map(([key, count]) => {
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
          return (
            <div key={key} className="flex items-center gap-2.5">
              <span className="h-3 w-3 rounded-md shrink-0" style={{ background: SERVICE_COLORS[key] ?? "#94a3b8" }} />
              <span className="text-xs text-neutral-600 flex-1">{SERVICE_LABELS[key] ?? key}</span>
              <span className="text-xs font-bold text-neutral-900 tabular-nums">{count}</span>
              <span className="text-[10px] text-neutral-400 tabular-nums w-8 text-right">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Bar Chart (mini, for top pages / CTA) ──────────────────────────────────
function BarRow({ rank, label, value, max, color }: { rank: number; label: string; value: number; max: number; color: "blue" | "amber" }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  const bg = color === "blue" ? "from-blue-400 to-blue-500" : "from-amber-300 to-amber-500";
  const badge = color === "blue" ? "bg-blue-100 text-blue-600" : "bg-amber-100 text-amber-600";
  return (
    <div className="group">
      <div className="flex items-center gap-3 mb-1.5">
        <span className={`h-6 w-6 rounded-lg ${badge} flex items-center justify-center text-[10px] font-extrabold shrink-0`}>{rank}</span>
        <span className="text-xs text-neutral-600 truncate flex-1 font-mono">{label}</span>
        <span className="text-xs font-extrabold text-neutral-900 tabular-nums">{value}</span>
      </div>
      <div className="h-2 bg-neutral-100 rounded-full ml-9 overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${bg} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

// ─── Trend badge ────────────────────────────────────────────────────────────
function TrendBadge({ pct }: { pct: number }) {
  if (pct === 0) return <span className="text-[10px] text-neutral-400 ml-2">--</span>;
  const up = pct > 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-[11px] font-bold ml-2 px-2 py-0.5 rounded-full ${up ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
      <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
        <path d={up ? "M6 2v8M6 2l3 3M6 2L3 5" : "M6 10V2M6 10l3-3M6 10L3 7"} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {Math.abs(pct)}%
    </span>
  );
}

// ─── Stat Card ──────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, trend, color = "blue", icon }: { label: string; value: string | number; sub?: string; trend?: number; color?: "blue" | "amber" | "emerald" | "violet"; icon?: string }) {
  const colorMap = {
    blue: { bg: "bg-blue-500", shadow: "shadow-blue-500/20", iconBg: "bg-blue-100 text-blue-600" },
    amber: { bg: "bg-amber-500", shadow: "shadow-amber-500/20", iconBg: "bg-amber-100 text-amber-600" },
    emerald: { bg: "bg-emerald-500", shadow: "shadow-emerald-500/20", iconBg: "bg-emerald-100 text-emerald-600" },
    violet: { bg: "bg-violet-500", shadow: "shadow-violet-500/20", iconBg: "bg-violet-100 text-violet-600" },
  };
  const c = colorMap[color];

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">{label}</p>
        {icon && (
          <div className={`h-8 w-8 rounded-xl ${c.iconBg} flex items-center justify-center`}>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
            </svg>
          </div>
        )}
      </div>
      <div className="flex items-end gap-1">
        <p className="text-3xl font-extrabold text-neutral-900 tracking-tight">{value}</p>
        {trend !== undefined && <TrendBadge pct={trend} />}
      </div>
      {sub && <p className="mt-1.5 text-[11px] text-neutral-400 font-medium">{sub}</p>}
    </div>
  );
}

// ─── Sidebar ────────────────────────────────────────────────────────────────
function Sidebar({ active, setActive, unread, mobileOpen, setMobileOpen }: { active: string; setActive: (v: string) => void; unread: number; mobileOpen: boolean; setMobileOpen: (v: boolean) => void }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const links = [
    { id: "overview", label: "Vue d'ensemble", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { id: "submissions", label: "Demandes", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", badge: unread },
    { id: "analytics", label: "Analytique", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  ];

  const handleNav = (id: string) => {
    setActive(id);
    setMobileOpen(false);
  };

  const sidebarContent = (
    <>
      <div className="h-[72px] flex items-center px-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <span className="h-10 w-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </span>
          <div>
            <p className="text-sm font-bold text-white leading-none">Boulocher</p>
            <p className="text-[10px] text-blue-400/60 mt-0.5 font-medium">Administration</p>
          </div>
        </div>
        {/* Close button mobile */}
        <button onClick={() => setMobileOpen(false)} className="ml-auto lg:hidden text-white/40 hover:text-white p-1">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        <p className="px-3 mb-3 text-[10px] font-bold text-white/20 uppercase tracking-widest">Menu</p>
        {links.map((l) => (
          <button
            key={l.id}
            onClick={() => handleNav(l.id)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all text-left ${
              active === l.id ? "bg-gradient-to-r from-blue-500/20 to-blue-500/5 text-blue-400 shadow-lg shadow-blue-500/5" : "text-white/40 hover:text-white/70 hover:bg-white/5"
            }`}
          >
            <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={l.icon} /></svg>
            {l.label}
            {l.badge !== undefined && l.badge > 0 && (
              <span className="ml-auto text-[10px] font-bold bg-blue-500 text-white rounded-full h-5 min-w-5 flex items-center justify-center px-1.5 shadow-lg shadow-blue-500/30">{l.badge}</span>
            )}
          </button>
        ))}
      </nav>
      <div className="px-3 pb-4 space-y-1 border-t border-white/5 pt-4">
        <a href="/" target="_blank" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-white/30 hover:text-white/60 hover:bg-white/5 transition-all">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          Voir le site
        </a>
        <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-white/30 hover:text-red-400 hover:bg-red-500/5 transition-all">
          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          Déconnexion
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-[260px] bg-[#0c1222] flex-col z-30">
        {sidebarContent}
      </aside>
      {/* Mobile overlay */}
      {mobileOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />}
      {/* Mobile sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-[280px] bg-[#0c1222] flex flex-col z-50 lg:hidden transform transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {sidebarContent}
      </aside>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════
export default function AdminDashboardClient({ submissions, recentEvents, stats, dailyViews, topPages, topCta, serviceBreakdown }: Props) {
  const [active, setActive] = useState("overview");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [localSubs, setLocalSubs] = useState(submissions);
  const [mobileOpen, setMobileOpen] = useState(false);

  async function markRead(id: string) {
    await fetch("/api/admin/submissions", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setLocalSubs((prev) => prev.map((s) => (s.id === id ? { ...s, read: true } : s)));
  }

  async function deleteSub(id: string) {
    if (!confirm("Supprimer cette demande ?")) return;
    await fetch("/api/admin/submissions", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setLocalSubs((prev) => prev.filter((s) => s.id !== id));
  }

  const viewsTrend = pctChange(stats.viewsThisWeek, stats.viewsLastWeek);
  const subsTrend = pctChange(stats.subsThisWeek, stats.subsLastWeek);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      <Sidebar active={active} setActive={setActive} unread={stats.unread} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <main className="lg:ml-[260px] flex-1 min-h-screen">
        {/* Top bar */}
        <header className="h-[72px] bg-white/70 backdrop-blur-xl border-b border-neutral-200/50 flex items-center px-4 sm:px-6 lg:px-8 sticky top-0 z-20">
          {/* Mobile burger */}
          <button onClick={() => setMobileOpen(true)} className="lg:hidden mr-3 p-2 -ml-2 rounded-xl hover:bg-neutral-100 transition-colors">
            <svg className="h-5 w-5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-bold text-neutral-900 truncate">
              {active === "overview" && <>{getGreeting()}, Christophe</>}
              {active === "submissions" && "Demandes de contact"}
              {active === "analytics" && "Analytique"}
            </h1>
            {active === "overview" && (
              <p className="text-[11px] text-neutral-400 mt-0.5 hidden sm:block">Voici le résumé de votre activité.</p>
            )}
          </div>
          <div className="ml-auto flex items-center gap-3">
            {stats.unread > 0 && (
              <button onClick={() => setActive("submissions")} className="hidden sm:flex items-center gap-2 text-[11px] font-bold bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                {stats.unread} nouvelle{stats.unread > 1 ? "s" : ""}
              </button>
            )}
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-blue-500/20">
              CB
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">

          {/* ═══ OVERVIEW ═════════════════════════════════════════════════ */}
          {active === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <StatCard label="Demandes" value={stats.totalSubmissions} sub={`${stats.unread} non lues`} trend={subsTrend} color="blue" icon="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                <StatCard label="Pages vues" value={stats.totalPageViews} sub={`${stats.viewsThisWeek} cette semaine`} trend={viewsTrend} color="violet" icon="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <StatCard label="Clics CTA" value={stats.totalCtaClicks} sub="Boutons d'action" color="amber" icon="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                <StatCard label="Conversion" value={`${stats.conversionRate.toFixed(1)}%`} sub={`${stats.totalFormSubmits} soumis`} color="emerald" icon="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </div>

              {/* Charts row */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
                <div className="xl:col-span-2 bg-white rounded-2xl border border-neutral-100 p-4 sm:p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                    <h2 className="text-sm font-bold text-neutral-900">Trafic — 14 derniers jours</h2>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5 text-[11px] text-neutral-400"><span className="h-1 w-3 bg-blue-500 rounded-full" />Vues</span>
                      <span className="flex items-center gap-1.5 text-[11px] text-neutral-400"><span className="h-1 w-3 bg-amber-400 rounded-full" />CTA</span>
                    </div>
                  </div>
                  <div className="-mx-2">
                    <AreaChart data={dailyViews} height={220} />
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-neutral-100 p-4 sm:p-6 shadow-sm">
                  <h2 className="text-sm font-bold text-neutral-900 mb-5">Répartition services</h2>
                  <DonutChart data={serviceBreakdown} />
                </div>
              </div>

              {/* Top pages + CTA */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white rounded-2xl border border-neutral-100 p-4 sm:p-6 shadow-sm">
                  <h2 className="text-sm font-bold text-neutral-900 mb-5">Pages les plus visitées</h2>
                  {topPages.length === 0 ? <p className="text-sm text-neutral-400">Aucune donnée.</p> : (
                    <div className="space-y-4">
                      {topPages.map(([page, count], i) => <BarRow key={page} rank={i + 1} label={page} value={count} max={topPages[0][1]} color="blue" />)}
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-2xl border border-neutral-100 p-4 sm:p-6 shadow-sm">
                  <h2 className="text-sm font-bold text-neutral-900 mb-5">Boutons les plus cliqués</h2>
                  {topCta.length === 0 ? <p className="text-sm text-neutral-400">Aucun clic.</p> : (
                    <div className="space-y-4">
                      {topCta.map(([label, count], i) => <BarRow key={label} rank={i + 1} label={label} value={count} max={topCta[0][1]} color="amber" />)}
                    </div>
                  )}
                </div>
              </div>

              {/* Recent submissions */}
              <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-neutral-100">
                  <h2 className="text-sm font-bold text-neutral-900">Dernières demandes</h2>
                  <button onClick={() => setActive("submissions")} className="text-xs font-bold text-blue-500 hover:text-blue-600 bg-blue-50 px-3 py-1 rounded-full transition-colors">
                    Tout voir
                  </button>
                </div>
                <SubmissionsTable subs={localSubs.slice(0, 5)} expanded={expanded} setExpanded={setExpanded} markRead={markRead} deleteSub={deleteSub} />
              </div>
            </div>
          )}

          {/* ═══ SUBMISSIONS ══════════════════════════════════════════════ */}
          {active === "submissions" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <StatCard label="Total" value={localSubs.length} color="blue" icon="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                <StatCard label="Non lues" value={localSubs.filter(s => !s.read).length} color="amber" icon="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                <StatCard label="Cette semaine" value={stats.subsThisWeek} trend={subsTrend} color="emerald" icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </div>
              <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
                <div className="px-4 sm:px-6 py-4 border-b border-neutral-100 flex items-center gap-4">
                  <h2 className="text-sm font-bold text-neutral-900">Toutes les demandes</h2>
                  <span className="text-[10px] font-bold bg-neutral-100 text-neutral-500 px-2.5 py-1 rounded-full">{localSubs.length}</span>
                </div>
                <SubmissionsTable subs={localSubs} expanded={expanded} setExpanded={setExpanded} markRead={markRead} deleteSub={deleteSub} />
              </div>
            </div>
          )}

          {/* ═══ ANALYTICS ════════════════════════════════════════════════ */}
          {active === "analytics" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <StatCard label="Vues totales" value={stats.totalPageViews} sub={`${stats.viewsThisWeek} cette semaine`} trend={viewsTrend} color="blue" icon="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <StatCard label="Clics CTA" value={stats.totalCtaClicks} color="amber" icon="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                <StatCard label="Conversion" value={`${stats.conversionRate.toFixed(1)}%`} sub="Vues → soumission" color="emerald" icon="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                <StatCard label="Complétion" value={`${stats.formCompletionRate.toFixed(0)}%`} sub="Début → envoi" color="violet" icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </div>

              <div className="bg-white rounded-2xl border border-neutral-100 p-4 sm:p-6 shadow-sm">
                <h2 className="text-sm font-bold text-neutral-900 mb-5">Évolution du trafic — 14 jours</h2>
                <div className="-mx-2">
                  <AreaChart data={dailyViews} height={280} />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white rounded-2xl border border-neutral-100 p-4 sm:p-6 shadow-sm">
                  <h2 className="text-sm font-bold text-neutral-900 mb-5">Top pages</h2>
                  {topPages.length === 0 ? <p className="text-sm text-neutral-400">Aucune donnée.</p> : (
                    <div className="space-y-4">
                      {topPages.map(([page, count], i) => <BarRow key={page} rank={i + 1} label={page} value={count} max={topPages[0][1]} color="blue" />)}
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-2xl border border-neutral-100 p-4 sm:p-6 shadow-sm">
                  <h2 className="text-sm font-bold text-neutral-900 mb-5">Événements récents</h2>
                  <div className="space-y-1 max-h-[420px] overflow-y-auto pr-1">
                    {recentEvents.length === 0 ? <p className="text-sm text-neutral-400">Aucun événement.</p> : recentEvents.map((ev) => (
                      <div key={ev.id} className="flex items-center gap-3 text-xs py-2.5 px-3 rounded-xl hover:bg-neutral-50 transition-colors">
                        <span className={`shrink-0 h-7 px-2.5 rounded-lg flex items-center font-bold text-[10px] ${
                          ev.type === "page_view" ? "bg-blue-100 text-blue-600" :
                          ev.type === "cta_click" ? "bg-amber-100 text-amber-600" :
                          ev.type === "form_start" ? "bg-violet-100 text-violet-600" :
                          "bg-emerald-100 text-emerald-600"
                        }`}>
                          {ev.type === "page_view" ? "VUE" : ev.type === "cta_click" ? "CTA" : ev.type === "form_start" ? "FORM" : "ENVOI"}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-neutral-600 truncate font-mono text-[11px]">{ev.page}</p>
                        </div>
                        {ev.label && <span className="hidden sm:inline text-neutral-400 text-[10px] bg-neutral-100 px-2 py-0.5 rounded-full">{ev.label}</span>}
                        <span className="text-neutral-300 shrink-0 text-[10px] tabular-nums hidden sm:inline">{formatDate(ev.createdAt)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// ─── Submissions Table ────────────────────────────────────────────────────────
function SubmissionsTable({ subs, expanded, setExpanded, markRead, deleteSub }: {
  subs: Submission[];
  expanded: string | null;
  setExpanded: (id: string | null) => void;
  markRead: (id: string) => void;
  deleteSub: (id: string) => void;
}) {
  if (subs.length === 0) {
    return (
      <div className="px-6 py-16 text-center">
        <div className="h-14 w-14 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4">
          <svg className="h-7 w-7 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
        </div>
        <p className="text-sm font-medium text-neutral-400">Aucune demande pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-neutral-100">
      {subs.map((s) => (
        <div key={s.id} className={`${!s.read ? "bg-blue-50/40" : ""}`}>
          <div
            className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 cursor-pointer hover:bg-neutral-50/70 transition-colors"
            onClick={() => { setExpanded(expanded === s.id ? null : s.id); if (!s.read) markRead(s.id); }}
          >
            <div className={`h-10 w-10 rounded-2xl flex items-center justify-center text-xs font-bold shrink-0 ${!s.read ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-neutral-100 text-neutral-500"}`}>
              {s.firstName[0]}{s.lastName[0]}
            </div>

            {/* Mobile: stack name + service */}
            <div className="flex-1 min-w-0 sm:hidden">
              <p className="text-sm font-semibold text-neutral-900 truncate">{s.firstName} {s.lastName}</p>
              <p className="text-[11px] text-neutral-400 truncate">{SERVICE_LABELS[s.serviceType] ?? s.serviceType}</p>
            </div>

            {/* Desktop: grid layout */}
            <div className="hidden sm:grid flex-1 min-w-0 grid-cols-4 gap-4 items-center">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-neutral-900 truncate">{s.firstName} {s.lastName}</p>
                <p className="text-[11px] text-neutral-400 truncate">{s.email}</p>
              </div>
              <span className="text-[11px] font-semibold bg-neutral-100 text-neutral-600 px-2.5 py-1 rounded-lg truncate text-center">{SERVICE_LABELS[s.serviceType] ?? s.serviceType}</span>
              <p className="text-xs text-neutral-500 truncate">{s.moveVolume}</p>
              <p className="text-xs text-neutral-400 text-right tabular-nums">{new Date(s.createdAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}</p>
            </div>

            <p className="text-[11px] text-neutral-400 tabular-nums sm:hidden">{new Date(s.createdAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}</p>

            <button
              onClick={(e) => { e.stopPropagation(); deleteSub(s.id); }}
              className="h-8 w-8 flex items-center justify-center rounded-xl text-neutral-300 hover:text-red-400 hover:bg-red-50 transition-all shrink-0"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>

          {expanded === s.id && (
            <div className="px-4 sm:px-6 pb-5 bg-gradient-to-b from-neutral-50/80 to-white border-t border-neutral-100">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-5 mb-5">
                {[
                  { l: "Téléphone", v: s.phone },
                  { l: "Service", v: SERVICE_LABELS[s.serviceType] ?? s.serviceType },
                  { l: "Volume", v: s.moveVolume },
                  { l: "Date", v: new Date(s.createdAt).toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "long", year: "numeric" }) },
                ].map((f) => (
                  <div key={f.l} className="bg-white rounded-xl border border-neutral-100 p-3">
                    <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">{f.l}</p>
                    <p className="text-xs font-bold text-neutral-800">{f.v}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-xl border border-neutral-100 p-4 mb-4">
                <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">Description du projet</p>
                <p className="text-sm text-neutral-700 leading-relaxed">{s.projectDescription}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={`mailto:${s.email}`} className="inline-flex items-center justify-center gap-2 text-xs font-bold bg-blue-500 text-white px-5 py-2.5 rounded-xl hover:bg-blue-600 shadow-lg shadow-blue-500/20 transition-all">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  Répondre par email
                </a>
                <a href={`tel:${s.phone}`} className="inline-flex items-center justify-center gap-2 text-xs font-bold bg-neutral-100 text-neutral-700 px-5 py-2.5 rounded-xl hover:bg-neutral-200 transition-all">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  Appeler
                </a>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
