import FadeUp from "@/components/animations/FadeUp";

const steps = [
  {
    number: "01",
    title: "Demande de Devis",
    desc: "Remplissez notre formulaire ou appelez-nous. Vous recevez un devis détaillé et transparent sous 2 heures.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Planification",
    desc: "Nous étudions votre besoin, planifions l'itinéraire optimal et affectons le véhicule adapté à votre chargement.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Transport",
    desc: "Enlèvement ponctuel, acheminement sécurisé et suivi GPS en temps réel. Vous savez où sont vos marchandises à chaque instant.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H6.375c-.621 0-1.125-.504-1.125-1.125V14.25m0 0V5.625c0-.621.504-1.125 1.125-1.125h9.75c.621 0 1.125.504 1.125 1.125v4.5m-10.875 0h10.875m0 0h2.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-.375" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Livraison Confirmée",
    desc: "Livraison à date et heure garanties. Vous recevez un bon de livraison signé et pouvez nous noter en ligne.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
];

export default function ProcessSection() {
  return (
    <section className="py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeUp className="text-center mb-20">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-accent-600 mb-4">
            Comment ça Marche
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">
            4 Étapes Simples
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-neutral-500 leading-relaxed">
            De votre demande à la livraison, un processus clair et transparent.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <FadeUp key={step.number} delay={i * 0.1}>
              <div className="relative group p-8 rounded-2xl bg-neutral-50 border border-neutral-200 hover:bg-white hover:border-primary-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                {/* Step number */}
                <span className="absolute top-6 right-6 font-heading text-5xl font-bold text-neutral-100 group-hover:text-primary-100 transition-colors">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-900 text-white mb-6 group-hover:bg-accent-500 transition-colors duration-300">
                  {step.icon}
                </div>

                <h3 className="relative z-10 font-heading text-lg font-bold text-neutral-900 mb-3">
                  {step.title}
                </h3>
                <p className="relative z-10 text-sm text-neutral-500 leading-relaxed">
                  {step.desc}
                </p>

                {/* Connector line (hidden on last item) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 border-t-2 border-dashed border-neutral-300" />
                )}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
