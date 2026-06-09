'use client';

import { useEffect, useState } from 'react';

interface StatCard {
  id: string;
  value: string;
  label: string;
  description: string;
  accentColor: 'yellow' | 'green' | 'blue' | 'pink';
}

const stats: StatCard[] = [
  {
    id: 'experience',
    value: '4+',
    label: 'Years of Experience',
    description: 'Marketing Analytics & Growth',
    accentColor: 'yellow',
  },
  {
    id: 'campaigns',
    value: '50+',
    label: 'Campaigns & Projects',
    description: 'Across multiple industries',
    accentColor: 'green',
  },
  {
    id: 'markets',
    value: '5+',
    label: 'International Markets',
    description: 'USA, AUS, UK, SG, Nepal',
    accentColor: 'blue',
  },
  {
    id: 'accuracy',
    value: '99%',
    label: 'Data Accuracy Focus',
    description: 'Tracking, measurement & reporting',
    accentColor: 'pink',
  },
];

const accentClasses: Record<string, string> = {
  yellow: 'text-accent',
  green: 'text-emerald-400',
  blue: 'text-blue-400',
  pink: 'text-pink-400',
};

export function ImpactSnapshot() {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('impact-snapshot');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section
      id="impact-snapshot"
      className="px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-center text-sm font-medium tracking-widest text-accent uppercase">
          Impact Snapshot
        </p>
        <h2 className="font-poppins mx-auto mb-4 max-w-2xl text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          A glimpse of the impact I create through data
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-center text-muted-foreground">
          Key highlights from my work in analytics, performance marketing, and
          growth optimization.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`transform transition-all duration-700 ease-out ${
                isInView
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:bg-card">
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-secondary/20 transition-transform duration-500 group-hover:scale-110" />

                <div className="relative z-10">
                  <div className={`mb-4 text-5xl font-bold ${accentClasses[stat.accentColor]}`}>
                    {stat.value}
                  </div>
                  <p className="font-poppins mb-1 text-base font-semibold text-foreground">
                    {stat.label}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
