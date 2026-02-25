import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";
import FadeUp from "@/components/animations/FadeUp";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { clientConfig } from "@/config/client.config";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-primary-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src={service.image} alt={service.title} fill className="object-cover" sizes="100vw" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <FadeUp>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-400 mb-4">Service</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">{service.title}</h1>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">{service.shortDescription}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="px-8 py-4 rounded-lg bg-accent-500 text-white font-semibold hover:bg-accent-600 transition-colors">
                Demander un devis gratuit
              </Link>
              <a href={`tel:${clientConfig.TELEPHONE.replace(/\s/g, "")}`} className="px-8 py-4 rounded-lg border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors">
                {clientConfig.TELEPHONE}
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: service.title }]} />
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Main */}
            <div className="lg:col-span-3">
              <FadeUp>
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10">
                  <Image src={service.image} alt={service.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4">À propos de ce service</h2>
                <p className="text-neutral-600 leading-relaxed">{service.fullDescription}</p>
              </FadeUp>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Features */}
              <FadeUp delay={0.1}>
                <div className="p-6 rounded-2xl bg-primary-50 border border-primary-100">
                  <h3 className="font-heading text-lg font-bold text-primary-900 mb-4">Ce qui est inclus</h3>
                  <ul className="space-y-3">
                    {service.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-sm text-neutral-700">
                        <svg className="h-5 w-5 text-accent-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>

              {/* Pricing */}
              <FadeUp delay={0.15}>
                <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <h3 className="font-heading text-lg font-bold text-neutral-900 mb-3">Tarifs</h3>
                  <p className="text-2xl font-bold text-accent-600 mb-1">{service.price}</p>
                  <p className="text-sm text-neutral-500">Durée estimée : {service.duration}</p>
                  <p className="text-xs text-neutral-400 mt-2">Devis personnalisé gratuit sous 24h</p>
                  <Link
                    href="/contact"
                    className="mt-4 block w-full text-center px-4 py-3 rounded-lg bg-accent-500 text-white font-semibold hover:bg-accent-600 transition-colors text-sm"
                  >
                    Obtenir un devis
                  </Link>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* Other services */}
      {others.length > 0 && (
        <section className="py-16 bg-neutral-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-8">Nos autres services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {others.map((s) => (
                <Link key={s.id} href={`/services/${s.slug}`}
                  className="group block p-5 rounded-xl border border-neutral-200 bg-white hover:border-primary-300 hover:shadow-md transition-all">
                  <h3 className="font-semibold text-neutral-900 group-hover:text-primary-900 mb-2 transition-colors">{s.title}</h3>
                  <p className="text-sm text-neutral-500 line-clamp-2">{s.shortDescription}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
