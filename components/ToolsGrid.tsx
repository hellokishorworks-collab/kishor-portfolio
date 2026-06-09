import { tools } from '@/data/tools';

export function ToolsGrid() {
  return (
    <section id="tools" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-sm font-medium tracking-widest text-accent uppercase">
          Tech Stack
        </p>
        <h2 className="font-poppins mb-12 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
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
    </section>
  );
}
