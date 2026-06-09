import { ArrowDown } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 pt-16">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative h-32 w-32">
            <div className="absolute inset-0 rounded-full border-2 border-accent" />
            <img
              src="/Kishor_(1).webp"
              alt="Kishor Hamal"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </div>

        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-4 py-1.5 backdrop-blur-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-medium text-foreground">
              Available for work
            </span>
          </div>
        </div>

        <p className="mb-4 text-sm font-medium tracking-widest text-accent uppercase">
          Marketing Analytics & Growth Specialist
        </p>
        <h1 className="font-poppins mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Data-driven marketer turning insights into business growth
        </h1>
        <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground">
          Hey, I&apos;m Kishor. I work at the intersection of data, marketing,
          and business intelligence to turn insights into clear, actionable
          decisions.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="/projects"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            View Projects
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-muted-foreground"
          >
            Get in Touch
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground">
        <ArrowDown className="h-5 w-5" />
      </div>
    </section>
  );
}
