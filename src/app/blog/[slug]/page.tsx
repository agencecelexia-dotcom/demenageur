import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import { formatDate } from "@/lib/utils";
import type { BlogSection } from "@/types";
import FadeUp from "@/components/animations/FadeUp";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

function renderSection(section: BlogSection, idx: number) {
  switch (section.type) {
    case "paragraph":
      return <p key={idx} className="text-neutral-700 leading-relaxed">{section.content}</p>;
    case "h2":
      return <h2 key={idx} className="font-heading text-2xl font-bold text-neutral-900 mt-8 mb-4">{section.content}</h2>;
    case "list":
      return (
        <ul key={idx} className="space-y-2 my-4">
          {section.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-neutral-700">
              <svg className="h-5 w-5 text-accent-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote key={idx} className="border-l-4 border-accent-500 pl-6 py-3 my-6 bg-accent-50 rounded-r-lg">
          <p className="italic text-neutral-700 mb-2">&ldquo;{section.content}&rdquo;</p>
          {section.author && <cite className="text-sm text-neutral-500 not-italic">— {section.author}</cite>}
        </blockquote>
      );
    case "image":
      return (
        <div key={idx} className="relative aspect-video rounded-xl overflow-hidden my-6">
          <Image src={section.src} alt={section.alt} fill className="object-cover" sizes="100vw" />
          {section.caption && <p className="text-xs text-neutral-400 text-center mt-2">{section.caption}</p>}
        </div>
      );
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-0">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />
          <FadeUp>
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-xs font-semibold">
                {post.category}
              </span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-neutral-500 mb-8">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary-200 flex items-center justify-center text-primary-800 font-semibold text-xs">
                  {post.author.charAt(0)}
                </div>
                <span>{post.author}</span>
              </div>
              <span>·</span>
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span>{post.readTime} de lecture</span>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-12">
              <Image src={post.featuredImage} alt={post.title} fill className="object-cover" sizes="100vw" priority />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <FadeUp>
            <p className="text-lg text-neutral-600 leading-relaxed border-b border-neutral-200 pb-8 mb-8">{post.excerpt}</p>
            {post.content && (
              <div className="space-y-4">
                {post.content.map((section, idx) => renderSection(section, idx))}
              </div>
            )}
          </FadeUp>
        </div>
      </section>

      {/* Tags */}
      {post.tags.length > 0 && (
        <section className="pb-12">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 bg-neutral-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-8">Articles similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`}
                  className="group block p-5 rounded-xl bg-white border border-neutral-200 hover:border-primary-300 hover:shadow-md transition-all">
                  <span className="text-xs font-semibold text-accent-600">{p.category}</span>
                  <h3 className="font-semibold text-neutral-900 group-hover:text-primary-900 mt-1 mb-2 transition-colors line-clamp-2">{p.title}</h3>
                  <p className="text-sm text-neutral-500">{p.readTime} de lecture</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="py-8 bg-neutral-50 border-t border-neutral-200 text-center">
        <Link href="/blog" className="text-sm text-primary-700 hover:text-primary-900 transition-colors">
          ← Retour au blog
        </Link>
      </div>
    </>
  );
}
