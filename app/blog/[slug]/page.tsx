import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import { getBlogBySlug, getPublishedBlogs } from '@/lib/data';

export const revalidate = 60;

export async function generateStaticParams() {
  const blogs = await getPublishedBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const blog = await getBlogBySlug(params.slug);
  if (!blog) return { title: 'Article Not Found' };
  return {
    title: `${blog.title} — Kishor Hamal`,
    description: blog.excerpt,
    openGraph: {
      title: `${blog.title} — Kishor Hamal`,
      description: blog.excerpt,
      type: 'article',
      publishedTime: blog.publishedAt || undefined,
      authors: ['Kishor Hamal'],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <section className="px-6 pt-32 pb-24">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          {blog.publishedAt && (
            <span>
              {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          )}
          {blog.readingTime && (
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {blog.readingTime}
            </span>
          )}
        </div>

        <h1 className="font-poppins mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
          {blog.title}
        </h1>

        <div className="mb-8 flex flex-wrap gap-2">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {blog.coverImage && (
          <div className="mb-10 aspect-video overflow-hidden rounded-xl border border-border/50 bg-secondary/30">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
          {blog.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('## ')) {
              return (
                <h2
                  key={index}
                  className="font-poppins pt-4 text-2xl font-bold tracking-tight text-foreground"
                >
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }
            if (paragraph.startsWith('### ')) {
              return (
                <h3
                  key={index}
                  className="font-poppins pt-2 text-xl font-semibold tracking-tight text-foreground"
                >
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            return <p key={index}>{paragraph}</p>;
          })}
        </div>
      </article>
    </section>
  );
}
