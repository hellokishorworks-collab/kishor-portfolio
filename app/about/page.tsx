import type { Metadata } from 'next';
import { experiences } from '@/data/experience';
import { tools } from '@/data/tools';

export const metadata: Metadata = {
  title: 'About — Kishor Hamal',
  description:
    'Marketing Analytics & Growth Specialist with 4+ years of experience in data-driven marketing, performance marketing, and business intelligence.',
};

export default function AboutPage() {
  return (
    <section className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 text-sm font-medium tracking-widest text-accent uppercase">
          About Me
        </p>
        <h1 className="font-poppins mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Kishor Hamal
        </h1>

        <div className="space-y-5 text-muted-foreground leading-relaxed">
          <p>
            I&apos;m a Marketing Analytics & Growth Specialist working at the
            intersection of data, marketing, and business intelligence. My
            focus is on turning complex data into clear, actionable decisions
            that drive business growth.
          </p>
          <p>
            With 4+ years of experience managing paid media campaigns,
            implementing tracking infrastructure, and building analytics
            dashboards, I help organizations make smarter, data-informed
            decisions. I&apos;ve worked across e-commerce, SaaS, and agency
            environments, supporting markets in the USA, UK, Australia, and
            Nepal.
          </p>
          <p>
            I&apos;m particularly interested in how marketing data, user
            behavior signals, and business intelligence tools can work together
            to create a complete picture of performance — from first click to
            conversion.
          </p>
          <p>
            I&apos;m currently exploring opportunities for international remote
            roles and preparing for master&apos;s programs in MSBA / data
            analytics to deepen my technical expertise.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="font-poppins mb-6 text-2xl font-bold tracking-tight text-foreground">
            Experience
          </h2>
          <div className="space-y-6">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="rounded-lg border border-border/50 bg-card p-5 transition-colors hover:border-accent/30"
              >
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
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-poppins mb-6 text-2xl font-bold tracking-tight text-foreground">
            Tools & Stack
          </h2>
          <div className="flex flex-wrap gap-3">
            {tools.map((tool) => (
              <span
                key={tool.id}
                className="inline-flex items-center rounded-md border border-border/50 bg-secondary px-4 py-2 text-sm text-secondary-foreground transition-colors hover:border-accent/30 hover:text-foreground"
              >
                {tool.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
