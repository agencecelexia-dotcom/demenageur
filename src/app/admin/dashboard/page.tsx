import { readSubmissions, readAnalytics } from "@/lib/storage";
import AdminDashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [submissions, events] = await Promise.all([readSubmissions(), readAnalytics()]);

  const pageViews = events.filter((e) => e.type === "page_view");
  const ctaClicks = events.filter((e) => e.type === "cta_click");
  const formSubmits = events.filter((e) => e.type === "form_submit");
  const formStarts = events.filter((e) => e.type === "form_start");

  // ── Top pages ─────────────────────────────────────────────────────────────
  const pageCount: Record<string, number> = {};
  for (const ev of pageViews) pageCount[ev.page] = (pageCount[ev.page] ?? 0) + 1;
  const topPages = Object.entries(pageCount).sort((a, b) => b[1] - a[1]).slice(0, 8);

  // ── Top CTA ───────────────────────────────────────────────────────────────
  const ctaCount: Record<string, number> = {};
  for (const ev of ctaClicks) {
    const k = ev.label ?? ev.page;
    ctaCount[k] = (ctaCount[k] ?? 0) + 1;
  }
  const topCta = Object.entries(ctaCount).sort((a, b) => b[1] - a[1]).slice(0, 6);

  // ── Daily views (last 14 days) ────────────────────────────────────────────
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  const dailyViews: { label: string; views: number; clicks: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const start = now - (i + 1) * day;
    const end = now - i * day;
    const d = new Date(end);
    dailyViews.push({
      label: d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" }),
      views: pageViews.filter((e) => { const t = new Date(e.createdAt).getTime(); return t >= start && t < end; }).length,
      clicks: ctaClicks.filter((e) => { const t = new Date(e.createdAt).getTime(); return t >= start && t < end; }).length,
    });
  }

  // ── Weekly comparisons ────────────────────────────────────────────────────
  const week = 7 * day;
  const viewsThisWeek = pageViews.filter((e) => now - new Date(e.createdAt).getTime() < week).length;
  const viewsLastWeek = pageViews.filter((e) => {
    const t = now - new Date(e.createdAt).getTime();
    return t >= week && t < 2 * week;
  }).length;
  const subsThisWeek = submissions.filter((s) => now - new Date(s.createdAt).getTime() < week).length;
  const subsLastWeek = submissions.filter((s) => {
    const t = now - new Date(s.createdAt).getTime();
    return t >= week && t < 2 * week;
  }).length;

  const unreadCount = submissions.filter((s) => !s.read).length;

  // ── Service breakdown ─────────────────────────────────────────────────────
  const serviceCount: Record<string, number> = {};
  for (const s of submissions) serviceCount[s.serviceType] = (serviceCount[s.serviceType] ?? 0) + 1;
  const serviceBreakdown = Object.entries(serviceCount).sort((a, b) => b[1] - a[1]);

  // ── Conversion rate ───────────────────────────────────────────────────────
  const conversionRate = pageViews.length > 0 ? ((formSubmits.length / pageViews.length) * 100) : 0;
  const formCompletionRate = formStarts.length > 0 ? ((formSubmits.length / formStarts.length) * 100) : 0;

  return (
    <AdminDashboardClient
      submissions={submissions}
      recentEvents={events.slice(0, 50)}
      stats={{
        totalSubmissions: submissions.length,
        unread: unreadCount,
        totalPageViews: pageViews.length,
        viewsThisWeek,
        viewsLastWeek,
        subsThisWeek,
        subsLastWeek,
        totalCtaClicks: ctaClicks.length,
        totalFormSubmits: formSubmits.length,
        conversionRate,
        formCompletionRate,
      }}
      dailyViews={dailyViews}
      topPages={topPages}
      topCta={topCta}
      serviceBreakdown={serviceBreakdown}
    />
  );
}
