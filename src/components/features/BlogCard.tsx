import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-500 text-white text-xs font-semibold">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-3 text-xs text-neutral-400 mb-3">
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readTime} de lecture</span>
        </div>
        <h3 className="font-heading text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-900 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-neutral-600 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-2 text-xs text-neutral-500">
          <div className="h-6 w-6 rounded-full bg-primary-200 flex items-center justify-center text-primary-800 font-semibold text-xs">
            {post.author.charAt(0)}
          </div>
          <span>{post.author}</span>
        </div>
      </div>
    </Link>
  );
}
