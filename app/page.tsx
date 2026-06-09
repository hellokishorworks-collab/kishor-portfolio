import { Hero } from '@/components/Hero';
import { CoreFocus } from '@/components/CoreFocus';
import { ToolsGrid } from '@/components/ToolsGrid';
import { ProjectCard } from '@/components/ProjectCard';
import { ImpactSnapshot } from '@/components/ImpactSnapshot';
import { ExperienceTimeline } from '@/components/ExperienceTimeline';
import { ContactSection } from '@/components/ContactSection';
import { projects } from '@/data/projects';

export default function Home() {
  return (
    <>
      <Hero />
      <CoreFocus />
      <ToolsGrid />

      <section id="projects" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-sm font-medium tracking-widest text-accent uppercase">
            Work
          </p>
          <h2 className="font-poppins mb-12 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Selected Projects
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <ImpactSnapshot />
      <ExperienceTimeline />
      <ContactSection />
    </>
  );
}
