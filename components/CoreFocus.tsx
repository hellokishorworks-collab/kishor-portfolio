import { ChartBar as BarChart3, Target, Radar, ChartLine as LineChart } from 'lucide-react';
import { services } from '@/data/services';

const iconMap: Record<string, React.ElementType> = {
  BarChart3,
  Target,
  Radar,
  LineChart,
};

export function CoreFocus() {
  return (
    <section id="core-focus" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-sm font-medium tracking-widest text-accent uppercase">
          What I Do
        </p>
        <h2 className="font-poppins mb-12 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Core Focus
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <div
                key={service.id}
                className="group rounded-lg border border-border/50 bg-card p-6 transition-colors hover:border-accent/30"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-secondary">
                  {Icon && (
                    <Icon className="h-5 w-5 text-accent" />
                  )}
                </div>
                <h3 className="font-poppins mb-2 text-lg font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
