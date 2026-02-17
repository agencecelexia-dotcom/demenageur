import { readSubmissions, readAnalytics } from "@/lib/storage";
import AdminDashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [submissions, events] = await Promise.all([readSubmissions(), readAnalytics()]);

  // ── Analytics computation ────────────────────────────────────────────────
  const pageViews = events.filter((e) => e.type === "page_view");
  const ctaClicks = events.filter((e) => e.type === "cta_click");
  const formSubmits = events.filter((e) => e.type === "form_submit");

  // Top pages
  const pageCount: Record<string, number> = {};
  for (const ev of pageViews) pageCount[ev.page] = (pageCount[ev.page] ?? 0) + 1;
  const topPages = Object.entries(pageCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  // Top CTA labels
  const ctaCount: Record<string, number> = {};
  for (const ev of ctaClicks) {
    const k = ev.label ?? ev.page;
    ctaCount[k] = (ctaCount[k] ?? 0) + 1;
  }
  const topCta = Object.entries(ctaCount).sort((a, b) => b[1] - a[1]).slice(0, 6);

  // Last 7 days views
  const now = Date.now();
  const week = 7 * 24 * 60 * 60 * 1000;
  const viewsThisWeek = pageViews.filter((e) => now - new Date(e.createdAt).getTime() < week).length;
  const unreadCount = submissions.filter((s) => !s.read).length;

  return (
    <AdminDashboardClient
      submissions={submissions}
      recentEvents={events.slice(0, 50)}
      stats={{
        totalSubmissions: submissions.length,
        unread: unreadCount,
        totalPageViews: pageViews.length,
        viewsThisWeek,
        totalCtaClicks: ctaClicks.length,
        totalFormSubmits: formSubmits.length,
      }}
      topPages={topPages}
      topCta={topCta}
    />
  );
}
