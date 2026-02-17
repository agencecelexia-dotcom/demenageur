"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Submission, AnalyticsEvent } from "@/lib/storage";

interface Props {
  submissions: Submission[];
  recentEvents: AnalyticsEvent[];
  stats: {
    totalSubmissions: number;
    unread: number;
    totalPageViews: number;
    viewsThisWeek: number;
    totalCtaClicks: number;
    totalFormSubmits: number;
  };
  topPages: [string, number][];
  topCta: [string, number][];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─── Sidebar ────────────────────────────────────────────────────────────────
function Sidebar({ active, setActive }: { active: string; setActive: (v: string) => void }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const links = [
    { id: "overview", label: "Vue d'ensemble", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { id: "submissions", label: "Demandes", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { id: "analytics", label: "Analytique", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 w-60 bg-neutral-950 flex flex-col z-30">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <span className="h-7 w-7 bg-accent-500 flex items-center justify-center">
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </span>
          <div>
            <p className="text-xs font-bold text-white leading-none">Admin Panel</p>
            <p className="text-[10px] text-neutral-500 mt-0.5">Boulocher</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {links.map((l) => (
          <button
            key={l.id}
            onClick={() => setActive(l.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors text-left ${
              active === l.id
                ? "bg-neutral-800 text-white"
                : "text-neutral-500 hover:text-neutral-300 hover:bg-neutral-900"
            }`}
          >
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={l.icon} />
            </svg>
            {l.label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-neutral-800">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-neutral-500 hover:text-red-400 hover:bg-neutral-900 transition-colors"
        >
          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Déconnexion
        </button>
      </div>
    </aside>
  );
}

// ─── Stat card ───────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, icon, accent }: { label: string; value: string | number; sub?: string; icon: string; accent?: boolean }) {
  return (
    <div className={`bg-white border p-6 ${accent ? "border-accent-200 bg-accent-50" : "border-neutral-200"}`}>
      <div className="flex items-start justify-between mb-4">
        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">{label}</p>
        <div className={`h-8 w-8 flex items-center justify-center ${accent ? "bg-accent-100 text-accent-600" : "bg-neutral-100 text-neutral-500"}`}>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
        </div>
      </div>
      <p className={`text-3xl font-bold tracking-tight ${accent ? "text-accent-700" : "text-neutral-900"}`}>{value}</p>
      {sub && <p className="mt-1 text-xs text-neutral-400">{sub}</p>}
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
export default function AdminDashboardClient({ submissions, recentEvents, stats, topPages, topCta }: Props) {
  const [active, setActive] = useState("overview");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [localSubs, setLocalSubs] = useState(submissions);

  async function markRead(id: string) {
    await fetch("/api/admin/submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setLocalSubs((prev) => prev.map((s) => (s.id === id ? { ...s, read: true } : s)));
  }

  async function deleteSub(id: string) {
    if (!confirm("Supprimer cette demande ?")) return;
    await fetch("/api/admin/submissions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setLocalSubs((prev) => prev.filter((s) => s.id !== id));
  }

  const serviceLabels: Record<string, string> = {
    demenagement_local: "Déménagement local",
    demenagement_longue_distance: "Longue distance",
    demenagement_international: "International",
    garde_meubles: "Garde-meubles",
    demenagement_entreprise: "Entreprise",
    transport_specifique: "Transport spécifique",
  };

  return (
    <div className="flex min-h-screen bg-neutral-100">
      <Sidebar active={active} setActive={setActive} />

      {/* Main content */}
      <main className="ml-60 flex-1 min-h-screen">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center px-8 sticky top-0 z-20">
          <h1 className="font-semibold text-neutral-900 capitalize">
            {active === "overview" && "Vue d'ensemble"}
            {active === "submissions" && "Demandes de contact"}
            {active === "analytics" && "Analytique"}
          </h1>
          <div className="ml-auto flex items-center gap-3">
            {stats.unread > 0 && (
              <span className="text-xs bg-accent-500 text-white px-2.5 py-1 font-semibold">
                {stats.unread} non lues
              </span>
            )}
            <span className="text-xs text-neutral-400">
              {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
            </span>
          </div>
        </header>

        <div className="p-8">

          {/* ── OVERVIEW ──────────────────────────────────────────────────── */}
          {active === "overview" && (
            <div className="space-y-8">
              {/* Stat cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  label="Demandes totales"
                  value={stats.totalSubmissions}
                  sub={`${stats.unread} non lues`}
                  icon="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  accent={stats.unread > 0}
                />
                <StatCard
                  label="Pages vues"
                  value={stats.totalPageViews}
                  sub={`${stats.viewsThisWeek} cette semaine`}
                  icon="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
                <StatCard
                  label="Clics CTA"
                  value={stats.totalCtaClicks}
                  sub="Boutons suivis"
                  icon="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5"
                />
                <StatCard
                  label="Formulaires soumis"
                  value={stats.totalFormSubmits}
                  sub="Via analytics tracker"
                  icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </div>

              {/* Two columns */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top pages */}
                <div className="bg-white border border-neutral-200 p-6">
                  <h2 className="text-sm font-semibold text-neutral-900 mb-5">Pages les plus visitées</h2>
                  {topPages.length === 0 ? (
                    <p className="text-sm text-neutral-400">Aucune donnée encore.</p>
                  ) : (
                    <div className="space-y-3">
                      {topPages.map(([page, count]) => {
                        const max = topPages[0][1];
                        return (
                          <div key={page}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-neutral-600 truncate max-w-[200px]">{page}</span>
                              <span className="text-neutral-900 font-semibold">{count}</span>
                            </div>
                            <div className="h-1.5 bg-neutral-100">
                              <div
                                className="h-full bg-primary-600 transition-all"
                                style={{ width: `${(count / max) * 100}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Top CTA clicks */}
                <div className="bg-white border border-neutral-200 p-6">
                  <h2 className="text-sm font-semibold text-neutral-900 mb-5">Clics CTA</h2>
                  {topCta.length === 0 ? (
                    <p className="text-sm text-neutral-400">Aucun clic tracé.</p>
                  ) : (
                    <div className="space-y-3">
                      {topCta.map(([label, count]) => {
                        const max = topCta[0][1];
                        return (
                          <div key={label}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-neutral-600 truncate max-w-[200px]">{label}</span>
                              <span className="text-neutral-900 font-semibold">{count}</span>
                            </div>
                            <div className="h-1.5 bg-neutral-100">
                              <div
                                className="h-full bg-accent-500 transition-all"
                                style={{ width: `${(count / max) * 100}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Last 5 submissions */}
              <div className="bg-white border border-neutral-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
                  <h2 className="text-sm font-semibold text-neutral-900">Dernières demandes</h2>
                  <button onClick={() => setActive("submissions")} className="text-xs text-accent-600 hover:text-accent-700 font-medium">
                    Voir tout →
                  </button>
                </div>
                <SubmissionsTable
                  subs={localSubs.slice(0, 5)}
                  expanded={expanded}
                  setExpanded={setExpanded}
                  markRead={markRead}
                  deleteSub={deleteSub}
                  serviceLabels={serviceLabels}
                />
              </div>
            </div>
          )}

          {/* ── SUBMISSIONS ───────────────────────────────────────────────── */}
          {active === "submissions" && (
            <div className="bg-white border border-neutral-200">
              <div className="px-6 py-4 border-b border-neutral-100 flex items-center gap-4">
                <h2 className="text-sm font-semibold text-neutral-900">Toutes les demandes</h2>
                <span className="text-xs bg-neutral-100 text-neutral-500 px-2 py-0.5 font-medium">{localSubs.length}</span>
              </div>
              <SubmissionsTable
                subs={localSubs}
                expanded={expanded}
                setExpanded={setExpanded}
                markRead={markRead}
                deleteSub={deleteSub}
                serviceLabels={serviceLabels}
              />
            </div>
          )}

          {/* ── ANALYTICS ─────────────────────────────────────────────────── */}
          {active === "analytics" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Vues totales" value={stats.totalPageViews} sub={`${stats.viewsThisWeek} cette semaine`} icon="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                <StatCard label="Clics CTA" value={stats.totalCtaClicks} sub="Boutons data-track" icon="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                <StatCard label="Pages vues / soumissions" value={stats.totalPageViews > 0 ? `${((stats.totalFormSubmits / stats.totalPageViews) * 100).toFixed(1)}%` : "—"} sub="Taux de conversion" icon="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                <StatCard label="Page la plus visitée" value={topPages[0]?.[0] ?? "—"} sub={topPages[0] ? `${topPages[0][1]} vues` : ""} icon="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-neutral-200 p-6">
                  <h2 className="text-sm font-semibold text-neutral-900 mb-5">Top pages</h2>
                  {topPages.length === 0 ? <p className="text-sm text-neutral-400">Aucune donnée.</p> : (
                    <div className="space-y-3">
                      {topPages.map(([page, count]) => {
                        const max = topPages[0][1];
                        return (
                          <div key={page}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-neutral-600 truncate max-w-[200px] font-mono">{page}</span>
                              <span className="font-semibold text-neutral-900">{count}</span>
                            </div>
                            <div className="h-1.5 bg-neutral-100"><div className="h-full bg-primary-600" style={{ width: `${(count / max) * 100}%` }} /></div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="bg-white border border-neutral-200 p-6">
                  <h2 className="text-sm font-semibold text-neutral-900 mb-5">Flux d&apos;événements récents</h2>
                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    {recentEvents.length === 0 ? <p className="text-sm text-neutral-400">Aucun événement.</p> : recentEvents.map((ev) => (
                      <div key={ev.id} className="flex items-start gap-3 text-xs py-2 border-b border-neutral-50 last:border-0">
                        <span className={`mt-0.5 px-1.5 py-0.5 font-semibold shrink-0 ${
                          ev.type === "page_view" ? "bg-blue-50 text-blue-600" :
                          ev.type === "cta_click" ? "bg-amber-50 text-amber-600" :
                          "bg-green-50 text-green-600"
                        }`}>
                          {ev.type === "page_view" ? "VUE" : ev.type === "cta_click" ? "CTA" : "FORM"}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-neutral-600 truncate font-mono">{ev.page}</p>
                          {ev.label && <p className="text-neutral-400">{ev.label}</p>}
                        </div>
                        <span className="text-neutral-400 shrink-0">{formatDate(ev.createdAt)}</span>
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
function SubmissionsTable({ subs, expanded, setExpanded, markRead, deleteSub, serviceLabels }: {
  subs: Submission[];
  expanded: string | null;
  setExpanded: (id: string | null) => void;
  markRead: (id: string) => void;
  deleteSub: (id: string) => void;
  serviceLabels: Record<string, string>;
}) {
  if (subs.length === 0) {
    return <p className="px-6 py-10 text-sm text-neutral-400 text-center">Aucune demande pour le moment.</p>;
  }

  return (
    <div className="divide-y divide-neutral-100">
      {subs.map((s) => (
        <div key={s.id} className={`${!s.read ? "bg-accent-50/40" : ""}`}>
          {/* Row */}
          <div
            className="flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-neutral-50 transition-colors"
            onClick={() => {
              setExpanded(expanded === s.id ? null : s.id);
              if (!s.read) markRead(s.id);
            }}
          >
            {/* Unread dot */}
            <span className={`h-2 w-2 rounded-full shrink-0 ${!s.read ? "bg-accent-500" : "bg-transparent"}`} />

            <div className="flex-1 min-w-0 grid grid-cols-4 gap-4 items-center">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-neutral-900 truncate">{s.firstName} {s.lastName}</p>
                <p className="text-xs text-neutral-400 truncate">{s.email}</p>
              </div>
              <p className="text-xs text-neutral-600 truncate">{serviceLabels[s.serviceType] ?? s.serviceType}</p>
              <p className="text-xs text-neutral-500 truncate">{s.moveVolume}</p>
              <p className="text-xs text-neutral-400 text-right">{new Date(s.createdAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}</p>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); deleteSub(s.id); }}
              className="text-neutral-300 hover:text-red-400 transition-colors ml-2"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          {/* Expanded detail */}
          {expanded === s.id && (
            <div className="px-6 pb-5 bg-neutral-50 border-t border-neutral-100">
              <div className="grid grid-cols-2 gap-4 pt-4 mb-4 text-xs">
                <div><span className="text-neutral-400">Téléphone</span><p className="text-neutral-800 font-medium mt-0.5">{s.phone}</p></div>
                <div><span className="text-neutral-400">Service</span><p className="text-neutral-800 font-medium mt-0.5">{serviceLabels[s.serviceType] ?? s.serviceType}</p></div>
                <div><span className="text-neutral-400">Volume</span><p className="text-neutral-800 font-medium mt-0.5">{s.moveVolume}</p></div>
                <div><span className="text-neutral-400">Date</span><p className="text-neutral-800 font-medium mt-0.5">{new Date(s.createdAt).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p></div>
              </div>
              <div>
                <p className="text-xs text-neutral-400 mb-1">Description du projet</p>
                <p className="text-sm text-neutral-700 leading-relaxed bg-white border border-neutral-200 p-4">{s.projectDescription}</p>
              </div>
              <div className="mt-3 flex gap-3">
                <a href={`mailto:${s.email}`} className="text-xs font-semibold text-accent-600 hover:text-accent-700">
                  Répondre par email →
                </a>
                <a href={`tel:${s.phone}`} className="text-xs font-semibold text-primary-600 hover:text-primary-700">
                  Appeler →
                </a>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
