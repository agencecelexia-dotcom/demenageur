import Link from "next/link";
import FadeUp from "@/components/animations/FadeUp";
import { services } from "@/data/services";

const iconSvgs: Record<string, string> = {
  Home: `<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />`,
  Building2: `<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />`,
  Route: `<path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />`,
  Globe: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />`,
  Warehouse: `<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />`,
  PackageCheck: `<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />`,
};

export default function ServicesOverview() {
  return (
    <section className="py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeUp className="text-center mb-20">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-accent-600 mb-4">
            Nos Expertises
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">
            Des Services Complets
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-neutral-500 leading-relaxed">
            Du transport local au fret européen, nous couvrons l&apos;ensemble de vos besoins
            avec le même niveau d&apos;exigence.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, idx) => (
            <FadeUp key={svc.id} delay={idx * 0.07}>
              <Link
                href={`/services/${svc.slug}`}
                className="group flex flex-col p-8 border border-neutral-150 bg-neutral-50 rounded-2xl hover:bg-white hover:border-primary-200 hover:shadow-[0_8px_32px_0_oklch(0%_0_0/0.08)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="mb-6 inline-flex h-11 w-11 items-center justify-center bg-white border border-neutral-200 rounded-xl text-primary-700 group-hover:border-primary-300 group-hover:text-primary-800 group-hover:bg-primary-50 transition-all duration-300">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    dangerouslySetInnerHTML={{ __html: iconSvgs[svc.icon] || iconSvgs.Home }}
                  />
                </div>
                <h3 className="font-heading text-lg font-semibold text-neutral-900 mb-3 group-hover:text-primary-900">
                  {svc.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed flex-1">
                  {svc.shortDescription}
                </p>
                <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-primary-700 group-hover:text-accent-600 transition-all duration-300">
                  <span>En savoir plus</span>
                  <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
