import type { Metadata } from 'next';
import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Projects — Kishor Hamal',
  description:
    'Selected projects in marketing analytics, performance marketing, tracking, and data visualization.',
};

export default function ProjectsPage() {
  return (
    <section className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-sm font-medium tracking-widest text-accent uppercase">
          Work
        </p>
        <h1 className="font-poppins mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Projects
        </h1>
        <p className="mb-12 max-w-lg text-muted-foreground">
          A selection of projects across marketing analytics, performance
          marketing, tracking, and business intelligence.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
