import type { Metadata } from "next";
import FadeUp from "@/components/animations/FadeUp";
import BlogCard from "@/components/features/BlogCard";
import { blogPosts } from "@/data/blog-posts";
import { clientConfig } from "@/config/client.config";

export const metadata: Metadata = {
  title: "Blog — Conseils Déménagement",
  description:
    "Conseils, guides et astuces pour réussir votre déménagement. Checklist, emballage, formalités, déménagement Paris, international et plus.",
};

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-primary-900 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <FadeUp>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-400 mb-4">
              Ressources
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
              Le Blog {clientConfig.NOM_ENTREPRISE}
            </h1>
            <p className="max-w-2xl mx-auto text-neutral-300">
              Conseils d&apos;experts, guides pratiques et astuces de nos équipes pour que votre
              déménagement se passe au mieux.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Posts */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, idx) => (
              <FadeUp key={post.id} delay={idx * 0.07}>
                <BlogCard post={post} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
