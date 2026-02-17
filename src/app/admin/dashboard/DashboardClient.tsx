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
  demenagement_longue_distance: "#8b5cf6",
  demenagement_international: "#f59e0b",
  garde_meubles: "#10b981",
  demenagement_entreprise: "#ef4444",
  transport_specifique: "#6366f1",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function pctChange(curr: number, prev: number) {
  if (prev === 0) return curr > 0 ? 100 : 0;
  return Math.round(((curr - prev) / prev) * 100);
}

// ─── Greeting ───────────────────────────────────────────────────────────────
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Bonjour";
  if (h < 18) return "Bon après-midi";
  return "Bonsoir";
}

// ─── Area Chart (SVG) ───────────────────────────────────────────────────────
function AreaChart({ data, height = 200 }: { data: { label: string; views: number; clicks: number }[]; height?: number }) {
  const W = 700;
  const H = height;
  const PAD = { top: 20, right: 20, bottom: 36, left: 40 };
  const w = W - PAD.left - PAD.right;
  const h = H - PAD.top - PAD.bottom;

  const maxViews = Math.max(...data.map((d) => d.views), 1);
  const maxVal = Math.ceil(maxViews / 5) * 5;

  const xStep = w / (data.length - 1);

  function yPos(v: number) { return PAD.top + h - (v / maxVal) * h; }

  const viewsPoints = data.map((d, i) => `${PAD.left + i * xStep},${yPos(d.views)}`).join(" ");
  const clicksPoints = data.map((d, i) => `${PAD.left + i * xStep},${yPos(d.clicks)}`).join(" ");

  const viewsArea = `M${PAD.left},${yPos(0)} ${data.map((d, i) => `L${PAD.left + i * xStep},${yPos(d.views)}`).join(" ")} L${PAD.left + (data.length - 1) * xStep},${yPos(0)} Z`;

  const gridLines = [0, maxVal * 0.25, maxVal * 0.5, maxVal * 0.75, maxVal];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      {gridLines.map((v) => (
        <g key={v}>
          <line x1={PAD.left} y1={yPos(v)} x2={W - PAD.right} y2={yPos(v)} stroke="#f0f0f0" strokeWidth={1} />
          <text x={PAD.left - 8} y={yPos(v) + 4} fill="#a0a0a0" fontSize={10} textAnchor="end">{Math.round(v)}</text>
        </g>
      ))}
      <path d={viewsArea} fill="url(#viewsGradient)" />
      <defs>
        <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.2} />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.02} />
        </linearGradient>
      </defs>
      <polyline points={viewsPoints} fill="none" stroke="#3b82f6" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={clicksPoints} fill="none" stroke="#f59e0b" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5,4" />
      {data.map((d, i) => (
        <g key={i}>
          <circle cx={PAD.left + i * xStep} cy={yPos(d.views)} r={3.5} fill="#3b82f6" stroke="white" strokeWidth={2} />
          {d.clicks > 0 && <circle cx={PAD.left + i * xStep} cy={yPos(d.clicks)} r={2.5} fill="#f59e0b" stroke="white" strokeWidth={1.5} />}
        </g>
      ))}
      {data.map((d, i) => (
        i % 2 === 0 && (
          <text key={i} x={PAD.left + i * xStep} y={H - 8} fill="#a0a0a0" fontSize={9} textAnchor="middle">{d.label}</text>
        )
      ))}
    </svg>
  );
}

// ─── Donut Chart (SVG) ──────────────────────────────────────────────────────
function DonutChart({ data }: { data: [string, number][] }) {
  const total = data.reduce((a, b) => a + b[1], 0);
  if (total === 0) return null;

  const size = 140;
  const cx = size / 2;
  const cy = size / 2;
  const r = 52;
  const strokeW = 18;
  const circ = 2 * Math.PI * r;

  let offset = 0;

  return (
    <div className="flex items-center gap-6">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f5f5f5" strokeWidth={strokeW} />
        {data.map(([key, count]) => {
          const pct = count / total;
          const dash = pct * circ;
          const gap = circ - dash;
          const seg = (
            <circle
              key={key}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={SERVICE_COLORS[key] ?? "#94a3b8"}
              strokeWidth={strokeW}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
              transform={`rotate(-90 ${cx} ${cy})`}
            />
          );
          offset += dash;
          return seg;
        })}
        <text x={cx} y={cy - 4} textAnchor="middle" fill="#111" fontSize={22} fontWeight="700">{total}</text>
        <text x={cx} y={cy + 12} textAnchor="middle" fill="#a0a0a0" fontSize={9}>demandes</text>
      </svg>
      <div className="space-y-2">
        {data.map(([key, count]) => (
          <div key={key} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: SERVICE_COLORS[key] ?? "#94a3b8" }} />
            <span className="text-xs text-neutral-600">{SERVICE_LABELS[key] ?? key}</span>
            <span className="text-xs font-bold text-neutral-900 ml-auto">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Trend badge ────────────────────────────────────────────────────────────
function TrendBadge({ pct }: { pct: number }) {
  if (pct === 0) return <span className="text-xs text-neutral-400 ml-2">--</span>;
  const up = pct > 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ml-2 px-1.5 py-0.5 rounded ${up ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
      <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
        <path d={up ? "M6 2v8M6 2l3 3M6 2L3 5" : "M6 10V2M6 10l3-3M6 10L3 7"} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {Math.abs(pct)}%
    </span>
  );
}

// ─── Stat Card ──────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, trend, color = "blue" }: { label: string; value: string | number; sub?: string; trend?: number; color?: "blue" | "amber" | "emerald" | "violet" }) {
  const colorMap = {
    blue: { bg: "bg-blue-50", ring: "ring-blue-100" },
    amber: { bg: "bg-amber-50", ring: "ring-amber-100" },
    emerald: { bg: "bg-emerald-50", ring: "ring-emerald-100" },
    violet: { bg: "bg-violet-50", ring: "ring-violet-100" },
  };
  const c = colorMap[color];

  return (
    <div className="bg-white rounded-xl border border-neutral-200/70 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-3">
        <span className={`h-2 w-2 rounded-full ${c.bg} ring-4 ${c.ring}`} />
        <p className="text-xs font-medium text-neutral-500">{label}</p>
      </div>
      <div className="flex items-end gap-1">
        <p className="text-2xl font-bold text-neutral-900 tracking-tight">{value}</p>
        {trend !== undefined && <TrendBadge pct={trend} />}
      </div>
      {sub && <p className="mt-1 text-[11px] text-neutral-400">{sub}</p>}
    </div>
  );
}

// ─── Sidebar ────────────────────────────────────────────────────────────────
function Sidebar({ active, setActive, unread }: { active: string; setActive: (v: string) => void; unread: number }) {
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

  return (
    <aside className="fixed inset-y-0 left-0 w-[240px] bg-[#0c1222] flex flex-col z-30">
      <div className="h-[72px] flex items-center px-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <span className="h-9 w-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </span>
          <div>
            <p className="text-sm font-bold text-white leading-none">Boulocher</p>
            <p className="text-[10px] text-blue-400/60 mt-0.5 font-medium">Administration</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-5 space-y-1">
        <p className="px-3 mb-3 text-[10px] font-bold text-white/20 uppercase tracking-widest">Menu</p>
        {links.map((l) => (
          <button
            key={l.id}
            onClick={() => setActive(l.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
              active === l.id
                ? "bg-blue-500/10 text-blue-400"
                : "text-white/40 hover:text-white/70 hover:bg-white/5"
            }`}
          >
            <svg className="h-[18px] w-[18px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={l.icon} />
            </svg>
            {l.label}
            {l.badge !== undefined && l.badge > 0 && (
              <span className="ml-auto text-[10px] font-bold bg-blue-500 text-white rounded-full h-5 min-w-5 flex items-center justify-center px-1.5">
                {l.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
      <div className="px-3 pb-4 space-y-1 border-t border-white/5 pt-4">
        <a href="/" target="_blank" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-white/30 hover:text-white/60 hover:bg-white/5 transition-all">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          Voir le site
        </a>
        <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-white/30 hover:text-red-400 hover:bg-red-500/5 transition-all">
          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          Déconnexion
        </button>
      </div>
    </aside>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════
export default function AdminDashboardClient({ submissions, recentEvents, stats, dailyViews, topPages, topCta, serviceBreakdown }: Props) {
  const [active, setActive] = useState("overview");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [localSubs, setLocalSubs] = useState(submissions);

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
    <div className="flex min-h-screen bg-[#f7f8fc]">
      <Sidebar active={active} setActive={setActive} unread={stats.unread} />

      <main className="ml-[240px] flex-1 min-h-screen">
        {/* Top bar */}
        <header className="h-[72px] bg-white/80 backdrop-blur-md border-b border-neutral-200/60 flex items-center px-8 sticky top-0 z-20">
          <div>
            <h1 className="text-lg font-bold text-neutral-900">
              {active === "overview" && <>{getGreeting()}, Christophe</>}
              {active === "submissions" && "Demandes de contact"}
              {active === "analytics" && "Analytique"}
            </h1>
            {active === "overview" && (
              <p className="text-xs text-neutral-400 mt-0.5">Voici le résumé de votre activité.</p>
            )}
          </div>
          <div className="ml-auto flex items-center gap-4">
            {stats.unread > 0 && (
              <button onClick={() => setActive("submissions")} className="flex items-center gap-2 text-xs font-semibold bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                {stats.unread} nouvelle{stats.unread > 1 ? "s" : ""} demande{stats.unread > 1 ? "s" : ""}
              </button>
            )}
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
              CB
            </div>
          </div>
        </header>

        <div className="p-8 max-w-[1280px]">

          {/* ═══ OVERVIEW ═════════════════════════════════════════════════ */}
          {active === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Demandes reçues" value={stats.totalSubmissions} sub={`${stats.unread} non lues`} trend={subsTrend} color="blue" />
                <StatCard label="Pages vues" value={stats.totalPageViews} sub={`${stats.viewsThisWeek} cette semaine`} trend={viewsTrend} color="violet" />
                <StatCard label="Clics CTA" value={stats.totalCtaClicks} sub="Boutons d'action" color="amber" />
                <StatCard label="Taux de conversion" value={`${stats.conversionRate.toFixed(1)}%`} sub={`${stats.totalFormSubmits} formulaires soumis`} color="emerald" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl border border-neutral-200/70 p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-sm font-bold text-neutral-900">Trafic des 14 derniers jours</h2>
                    <div className="flex items-center gap-5">
                      <span className="flex items-center gap-1.5 text-[11px] text-neutral-400"><span className="h-0.5 w-4 bg-blue-500 rounded" />Pages vues</span>
                      <span className="flex items-center gap-1.5 text-[11px] text-neutral-400"><span className="h-0.5 w-4 bg-amber-400 rounded" />Clics CTA</span>
                    </div>
                  </div>
                  <AreaChart data={dailyViews} height={220} />
                </div>

                <div className="bg-white rounded-xl border border-neutral-200/70 p-6">
                  <h2 className="text-sm font-bold text-neutral-900 mb-5">Répartition par service</h2>
                  <DonutChart data={serviceBreakdown} />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-neutral-200/70 p-6">
                  <h2 className="text-sm font-bold text-neutral-900 mb-5">Pages les plus visitées</h2>
                  {topPages.length === 0 ? <p className="text-sm text-neutral-400">Aucune donnée.</p> : (
                    <div className="space-y-3">
                      {topPages.map(([page, count], i) => {
                        const max = topPages[0][1];
                        return (
                          <div key={page}>
                            <div className="flex items-center gap-3 text-xs mb-1.5">
                              <span className="h-5 w-5 rounded bg-blue-50 text-blue-500 flex items-center justify-center text-[10px] font-bold shrink-0">{i + 1}</span>
                              <span className="text-neutral-600 truncate flex-1 font-mono text-[11px]">{page}</span>
                              <span className="text-neutral-900 font-bold tabular-nums">{count}</span>
                            </div>
                            <div className="h-1 bg-neutral-100 rounded-full ml-8">
                              <div className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all" style={{ width: `${(count / max) * 100}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-xl border border-neutral-200/70 p-6">
                  <h2 className="text-sm font-bold text-neutral-900 mb-5">Boutons les plus cliqués</h2>
                  {topCta.length === 0 ? <p className="text-sm text-neutral-400">Aucun clic.</p> : (
                    <div className="space-y-3">
                      {topCta.map(([label, count], i) => {
                        const max = topCta[0][1];
                        return (
                          <div key={label}>
                            <div className="flex items-center gap-3 text-xs mb-1.5">
                              <span className="h-5 w-5 rounded bg-amber-50 text-amber-500 flex items-center justify-center text-[10px] font-bold shrink-0">{i + 1}</span>
                              <span className="text-neutral-600 truncate flex-1">{label}</span>
                              <span className="text-neutral-900 font-bold tabular-nums">{count}</span>
                            </div>
                            <div className="h-1 bg-neutral-100 rounded-full ml-8">
                              <div className="h-full bg-gradient-to-r from-amber-300 to-amber-400 rounded-full transition-all" style={{ width: `${(count / max) * 100}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-neutral-200/70">
                <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
                  <h2 className="text-sm font-bold text-neutral-900">Dernières demandes</h2>
                  <button onClick={() => setActive("submissions")} className="text-xs font-semibold text-blue-500 hover:text-blue-600 transition-colors">
                    Tout voir →
                  </button>
                </div>
                <SubmissionsTable subs={localSubs.slice(0, 5)} expanded={expanded} setExpanded={setExpanded} markRead={markRead} deleteSub={deleteSub} />
              </div>
            </div>
          )}

          {/* ═══ SUBMISSIONS ══════════════════════════════════════════════ */}
          {active === "submissions" && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <StatCard label="Total" value={localSubs.length} color="blue" />
                <StatCard label="Non lues" value={localSubs.filter(s => !s.read).length} color="amber" />
                <StatCard label="Cette semaine" value={stats.subsThisWeek} trend={subsTrend} color="emerald" />
              </div>
              <div className="bg-white rounded-xl border border-neutral-200/70">
                <div className="px-6 py-4 border-b border-neutral-100 flex items-center gap-4">
                  <h2 className="text-sm font-bold text-neutral-900">Toutes les demandes</h2>
                  <span className="text-[10px] font-bold bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded-full">{localSubs.length}</span>
                </div>
                <SubmissionsTable subs={localSubs} expanded={expanded} setExpanded={setExpanded} markRead={markRead} deleteSub={deleteSub} />
              </div>
            </div>
          )}

          {/* ═══ ANALYTICS ════════════════════════════════════════════════ */}
          {active === "analytics" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Vues totales" value={stats.totalPageViews} sub={`${stats.viewsThisWeek} cette semaine`} trend={viewsTrend} color="blue" />
                <StatCard label="Clics CTA" value={stats.totalCtaClicks} color="amber" />
                <StatCard label="Taux de conversion" value={`${stats.conversionRate.toFixed(1)}%`} sub="Vues → soumission" color="emerald" />
                <StatCard label="Complétion formulaire" value={`${stats.formCompletionRate.toFixed(0)}%`} sub="Début → envoi" color="violet" />
              </div>

              <div className="bg-white rounded-xl border border-neutral-200/70 p-6">
                <h2 className="text-sm font-bold text-neutral-900 mb-5">Évolution du trafic — 14 jours</h2>
                <AreaChart data={dailyViews} height={260} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-neutral-200/70 p-6">
                  <h2 className="text-sm font-bold text-neutral-900 mb-5">Top pages</h2>
                  {topPages.length === 0 ? <p className="text-sm text-neutral-400">Aucune donnée.</p> : (
                    <div className="space-y-3">
                      {topPages.map(([page, count], i) => {
                        const max = topPages[0][1];
                        return (
                          <div key={page}>
                            <div className="flex items-center gap-3 text-xs mb-1.5">
                              <span className="h-5 w-5 rounded bg-blue-50 text-blue-500 flex items-center justify-center text-[10px] font-bold shrink-0">{i + 1}</span>
                              <span className="text-neutral-600 truncate flex-1 font-mono text-[11px]">{page}</span>
                              <span className="font-bold text-neutral-900 tabular-nums">{count}</span>
                            </div>
                            <div className="h-1 bg-neutral-100 rounded-full ml-8">
                              <div className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full" style={{ width: `${(count / max) * 100}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-xl border border-neutral-200/70 p-6">
                  <h2 className="text-sm font-bold text-neutral-900 mb-5">Événements récents</h2>
                  <div className="space-y-1.5 max-h-[400px] overflow-y-auto pr-2">
                    {recentEvents.length === 0 ? <p className="text-sm text-neutral-400">Aucun événement.</p> : recentEvents.map((ev) => (
                      <div key={ev.id} className="flex items-center gap-3 text-xs py-2 px-2 rounded-lg hover:bg-neutral-50 transition-colors">
                        <span className={`shrink-0 h-6 px-2 rounded flex items-center font-bold text-[10px] ${
                          ev.type === "page_view" ? "bg-blue-50 text-blue-500" :
                          ev.type === "cta_click" ? "bg-amber-50 text-amber-600" :
                          ev.type === "form_start" ? "bg-violet-50 text-violet-500" :
                          "bg-emerald-50 text-emerald-600"
                        }`}>
                          {ev.type === "page_view" ? "VUE" : ev.type === "cta_click" ? "CTA" : ev.type === "form_start" ? "FORM" : "ENVOI"}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-neutral-600 truncate font-mono text-[11px]">{ev.page}</p>
                        </div>
                        {ev.label && <span className="text-neutral-400 text-[10px] bg-neutral-50 px-1.5 py-0.5 rounded">{ev.label}</span>}
                        <span className="text-neutral-300 shrink-0 text-[10px] tabular-nums">{formatDate(ev.createdAt)}</span>
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
        <div className="h-12 w-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
          <svg className="h-6 w-6 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
        </div>
        <p className="text-sm text-neutral-400">Aucune demande pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-neutral-100">
      {subs.map((s) => (
        <div key={s.id} className={`${!s.read ? "bg-blue-50/30" : ""}`}>
          <div
            className="flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-neutral-50/70 transition-colors"
            onClick={() => { setExpanded(expanded === s.id ? null : s.id); if (!s.read) markRead(s.id); }}
          >
            <div className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${!s.read ? "bg-blue-500 text-white" : "bg-neutral-100 text-neutral-500"}`}>
              {s.firstName[0]}{s.lastName[0]}
            </div>

            <div className="flex-1 min-w-0 grid grid-cols-4 gap-4 items-center">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-neutral-900 truncate">{s.firstName} {s.lastName}</p>
                <p className="text-[11px] text-neutral-400 truncate">{s.email}</p>
              </div>
              <span className="text-[11px] font-medium bg-neutral-100 text-neutral-600 px-2 py-1 rounded truncate text-center">{SERVICE_LABELS[s.serviceType] ?? s.serviceType}</span>
              <p className="text-xs text-neutral-500 truncate">{s.moveVolume}</p>
              <p className="text-xs text-neutral-400 text-right tabular-nums">{new Date(s.createdAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}</p>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); deleteSub(s.id); }}
              className="h-8 w-8 flex items-center justify-center rounded-lg text-neutral-300 hover:text-red-400 hover:bg-red-50 transition-all"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>

          {expanded === s.id && (
            <div className="px-6 pb-5 bg-gradient-to-b from-neutral-50 to-white border-t border-neutral-100">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-5 mb-5">
                {[
                  { l: "Téléphone", v: s.phone },
                  { l: "Service", v: SERVICE_LABELS[s.serviceType] ?? s.serviceType },
                  { l: "Volume", v: s.moveVolume },
                  { l: "Date", v: new Date(s.createdAt).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }) },
                ].map((f) => (
                  <div key={f.l} className="bg-white rounded-lg border border-neutral-200/60 p-3">
                    <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider mb-1">{f.l}</p>
                    <p className="text-xs font-semibold text-neutral-800">{f.v}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-lg border border-neutral-200/60 p-4 mb-4">
                <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider mb-2">Description du projet</p>
                <p className="text-sm text-neutral-700 leading-relaxed">{s.projectDescription}</p>
              </div>
              <div className="flex gap-3">
                <a href={`mailto:${s.email}`} className="inline-flex items-center gap-2 text-xs font-semibold bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  Répondre par email
                </a>
                <a href={`tel:${s.phone}`} className="inline-flex items-center gap-2 text-xs font-semibold bg-neutral-100 text-neutral-700 px-4 py-2 rounded-lg hover:bg-neutral-200 transition-colors">
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
