import type { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedBlogs } from '@/lib/data';
import { Clock, ArrowRight } from 'lucide-react';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Blog — Kishor Hamal',
  description:
    'Articles and insights on marketing analytics, GA4, GTM, server-side tracking, performance marketing, and data-driven growth strategies.',
};

export default async function BlogPage() {
  const blogs = await getPublishedBlogs();

  return (
    <section className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-4xl">
        <p className="mb-2 text-sm font-medium tracking-widest text-accent uppercase">
          Insights & Writing
        </p>
        <h1 className="font-poppins mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Blog
        </h1>
        <p className="mb-12 max-w-xl text-muted-foreground">
          Practical strategies and technical guides on marketing analytics, tracking infrastructure, and growth engineering.
        </p>

        <div className="space-y-8">
          {blogs.map((blog) => (
            <article
              key={blog.slug}
              className="group rounded-xl border border-border/50 bg-card p-6 transition-colors hover:border-accent/40"
            >
              <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                {blog.publishedAt && (
                  <span>
                    {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                )}
                {blog.readingTime && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {blog.readingTime}
                  </span>
                )}
              </div>

              <h2 className="font-poppins mb-3 text-xl font-bold text-foreground transition-colors group-hover:text-accent sm:text-2xl">
                <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
              </h2>

              <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                {blog.excerpt}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border/50 bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/blog/${blog.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent transition-transform group-hover:translate-x-1"
                >
                  Read Article <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
