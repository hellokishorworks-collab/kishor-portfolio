'use client';

import { useRef, useState, useEffect } from 'react';
import { Calendar, Handshake, ChartBar as BarChart2, Globe, Target, Megaphone, ChartPie as PieChart, Crosshair, TrendingUp } from 'lucide-react';

const logos: { name: string; src: string; bg?: string }[] = [
  { name: 'Calilio',           src: '/logos/CALILIO_LOGO.webp' },
  { name: 'CDR Report Writer', src: '/logos/CDR_REPORT_WRITER_LOGO.jpeg' },
  { name: 'Mobilemandu',       src: '/logos/MOBILEMANDU_LOGO.png' },
  { name: 'Black Shark Nepal', src: '/logos/BLACKSHARK_LOGO.jpg' },
  { name: 'Daraz',             src: '/logos/DARAZ_LOGO.jpeg' },
  { name: 'MidFirst Bank',     src: '/logos/Mid_first_logo.png' },
  { name: 'Yoddha Lab',        src: '/logos/YODDHA_LAB_LOGO.png' },
  { name: 'Suvedas',           src: '/logos/SUVEDAS_LOGO.png' },
];

const metrics = [
  {
    icon: Calendar,
    value: '4+',
    label: 'Years Experience',
    sub: 'In Digital Marketing',
  },
  {
    icon: Handshake,
    value: '8+',
    label: 'Brands',
    sub: 'Worked With',
  },
  {
    icon: BarChart2,
    value: '5+',
    label: 'Industries',
    sub: 'Served',
  },
  {
    icon: Globe,
    value: 'Remote',
    label: 'Nepal • Global',
    sub: 'Open to Opportunities',
  },
];

const skills = [
  { icon: Target,    label: 'Performance Marketing' },
  { icon: Megaphone, label: 'Paid Ads' },
  { icon: PieChart,  label: 'Analytics' },
  { icon: Crosshair, label: 'Tracking' },
  { icon: TrendingUp,label: 'Growth Strategy' },
];

// Duplicate for seamless loop
const marqueeLogos = [...logos, ...logos];

export function WorkedWith() {
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative overflow-hidden px-6 py-28"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[900px] rounded-full bg-accent/[0.04] blur-[140px]" />
      </div>

      <div
        className={`mx-auto max-w-6xl transition-all duration-700 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* ── Eyebrow ── */}
        <div className="mb-5 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent/60" />
          <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">
            Trusted By
          </p>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent/60" />
        </div>

        {/* ── Heading ── */}
        <h2 className="font-poppins mb-6 text-center text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Brands I've{' '}
          <span className="relative inline-block text-accent">
            Worked With
            <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-gradient-to-r from-accent/0 via-accent to-accent/0" />
          </span>
        </h2>

        {/* ── Description ── */}
        <p className="mx-auto mb-14 max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
          I've helped startups, SaaS companies, eCommerce brands, and growing businesses improve{' '}
          <span className="text-accent font-medium">acquisition, analytics,</span> and{' '}
          <span className="text-accent font-medium">performance marketing.</span>
        </p>

        {/* ── Logo Marquee Container ── */}
        <div className="relative rounded-2xl border border-white/[0.07] bg-white/[0.02] py-10 shadow-[0_0_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-sm">
          {/* Left fade */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-28 bg-gradient-to-r from-[hsl(0,0%,4%)] via-[hsl(0,0%,4%)]/70 to-transparent" />
          {/* Right fade */}
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-28 bg-gradient-to-l from-[hsl(0,0%,4%)] via-[hsl(0,0%,4%)]/70 to-transparent" />

          <div className="overflow-hidden">
            <div
              className="flex w-max items-center"
              style={{
                animation: 'marquee-scroll 32s linear infinite',
                animationPlayState: paused ? 'paused' : 'running',
              }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {marqueeLogos.map((logo, i) => (
                <div
                  key={`${logo.name}-${i}`}
                  className="group mx-8 flex shrink-0 items-center justify-center"
                >
                  <div className="relative flex h-16 w-36 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 transition-all duration-300 group-hover:border-accent/30 group-hover:bg-white/[0.06] group-hover:shadow-[0_0_20px_rgba(180,140,60,0.12)]">
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className="max-h-10 max-w-[100px] object-contain transition-all duration-300 [filter:grayscale(80%)_brightness(0.85)] group-hover:[filter:grayscale(0%)_brightness(1)] group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Supporting text ── */}
        <p className="mt-5 text-center text-xs tracking-wide text-muted-foreground/70">
          Supporting startups and established brands across{' '}
          <span className="text-muted-foreground">SaaS, eCommerce, Finance, Healthcare,</span> and{' '}
          <span className="text-muted-foreground">Consumer Technology.</span>
        </p>

        {/* ── Metric Cards ── */}
        <div
          className={`mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 transition-all duration-700 delay-200 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {metrics.map(({ icon: Icon, value, label, sub }) => (
            <div
              key={label}
              className="group relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-7 text-center transition-all duration-300 hover:border-accent/25 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(180,140,60,0.07)]"
            >
              {/* subtle glow dot */}
              <div className="absolute inset-0 flex items-start justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="mt-4 h-12 w-12 rounded-full bg-accent/10 blur-xl" />
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/20 bg-accent/10">
                <Icon size={20} className="text-accent" strokeWidth={1.6} />
              </div>

              <div>
                <div className="font-poppins text-3xl font-bold tracking-tight text-foreground">
                  {value}
                </div>
                <div className="mt-0.5 text-sm font-semibold text-foreground/80">{label}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Skill Pills ── */}
        <div
          className={`mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 transition-all duration-700 delay-400 ease-out ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {skills.map(({ icon: Icon, label }, idx) => (
            <div key={label} className="flex items-center gap-2">
              {idx > 0 && (
                <span className="hidden text-white/20 sm:inline">•</span>
              )}
              <div className="flex items-center gap-2 text-xs text-muted-foreground transition-colors duration-200 hover:text-accent">
                <Icon size={14} className="text-accent/70" strokeWidth={1.8} />
                <span>{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
