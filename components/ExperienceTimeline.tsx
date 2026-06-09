import { experiences } from '@/data/experience';

export function ExperienceTimeline() {
  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-sm font-medium tracking-widest text-accent uppercase">
          Career
        </p>
        <h2 className="font-poppins mb-12 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Experience
        </h2>

        <div className="relative">
          <div className="absolute left-0 top-0 h-full w-px bg-border md:left-4" />

          <div className="space-y-10">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative pl-8 md:pl-12">
                <div className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-background md:left-3" />

                <div className="rounded-lg border border-border/50 bg-card p-5 transition-colors hover:border-accent/30">
                  <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-poppins text-base font-semibold text-foreground">
                      {exp.role}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {exp.period}
                    </span>
                  </div>
                  <p className="mb-2 text-sm font-medium text-accent">
                    {exp.company} &middot; {exp.location}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {exp.focus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
