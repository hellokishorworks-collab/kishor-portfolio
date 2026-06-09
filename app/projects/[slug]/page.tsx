import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { projects } from '@/data/projects';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} — Kishor Hamal`,
    description: project.summary,
  };
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <section className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="font-poppins mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {project.title}
        </h1>

        <div className="mb-10 aspect-video overflow-hidden rounded-lg border border-border/50 bg-secondary/30">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="font-poppins mb-2 text-lg font-semibold text-foreground">
              Overview
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.overview}
            </p>
          </div>

          <div>
            <h2 className="font-poppins mb-2 text-lg font-semibold text-foreground">
              Problem
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.problem}
            </p>
          </div>

          <div>
            <h2 className="font-poppins mb-2 text-lg font-semibold text-foreground">
              Approach
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.approach}
            </p>
          </div>

          <div>
            <h2 className="font-poppins mb-2 text-lg font-semibold text-foreground">
              Tools Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.toolsUsed.map((tool) => (
                <span
                  key={tool}
                  className="rounded-md border border-border/50 bg-secondary px-3 py-1.5 text-xs text-secondary-foreground"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-poppins mb-2 text-lg font-semibold text-foreground">
              Insight
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.insight}
            </p>
          </div>

          <div className="rounded-lg border border-accent/20 bg-accent/5 p-5">
            <h2 className="font-poppins mb-2 text-lg font-semibold text-accent">
              Result
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.result}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}