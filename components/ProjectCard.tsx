import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/types';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="rounded-lg border border-border/50 bg-card p-6 transition-colors hover:border-accent/30">
        <div className="mb-4 aspect-video overflow-hidden rounded-md bg-secondary/50">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="mb-3 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-poppins mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
          {project.title}
          <ArrowUpRight className="ml-1 inline-block h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
        </h3>

        <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
          {project.summary}
        </p>

        <p className="text-sm font-medium text-accent">
          {project.result}
        </p>
      </div>
    </Link>
  );
}