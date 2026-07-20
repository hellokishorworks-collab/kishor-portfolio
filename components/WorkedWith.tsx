'use client';

import { useState, useEffect, useRef } from 'react';
import { Calendar, Handshake, TrendingUp, Globe, Target, Megaphone, ChartPie as PieChart, Crosshair } from 'lucide-react';

const logos = [
  { name: 'Calilio',           src: '/logos/CALILIO_LOGO.webp' },
  { name: 'CDR Report Writer', src: '/logos/CDR_REPORT_WRITER_LOGO.jpeg' },
  { name: 'Mobilemandu',       src: '/logos/MOBILEMANDU_LOGO.png' },
  { name: 'Black Shark Nepal', src: '/logos/BLACKSHARK_LOGO.jpg' },
  { name: 'Suvedas',           src: '/logos/SUVEDAS_LOGO.png' },
  { name: 'MidFirst Bank',     src: '/logos/Mid_first_logo.png' },
  { name: 'Daraz',             src: '/logos/DARAZ_LOGO.jpeg' },
  { name: 'Yoddha Lab',        src: '/logos/YODDHA_LAB_LOGO.png' },
];

const metrics = [
  { icon: Calendar,   value: '4+',    label: 'Years Experience', sub: 'In Digital Marketing' },
  { icon: Handshake,  value: '8+',    label: 'Brands',           sub: 'Worked With'          },
  { icon: TrendingUp, value: '5+',    label: 'Industries',       sub: 'Served'               },
  { icon: Globe,      value: 'Remote',label: 'Nepal • Global',   sub: 'Open to Opportunities'},
];

const skills = [
  { icon: Target,     label: 'Performance Marketing' },
  { icon: Megaphone,  label: 'Paid Ads'              },
  { icon: PieChart,   label: 'Analytics'             },
  { icon: Crosshair,  label: 'Tracking'              },
  { icon: TrendingUp, label: 'Growth Strategy'       },
];

// triple-duplicate so the loop is seamless even at wide viewports
const track = [...logos, ...logos, ...logos];

export function WorkedWith() {
  const [paused,  setPaused]  = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative overflow-hidden bg-background px-6 py-28"
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[560px] w-[860px] rounded-full bg-accent/[0.05] blur-[150px]" />
      </div>

      <div
        className={`mx-auto max-w-5xl transition-all duration-700 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >

        {/* ── Eyebrow ── */}
        <div className="mb-6 flex items-center justify-center gap-4">
          <span className="h-px w-14 bg-accent/70" />
          <p className="text-[11px] font-semibold tracking-[0.3em] text-accent uppercase">
            Trusted By
          </p>
          <span className="h-px w-14 bg-accent/70" />
        </div>

        {/* ── Heading ── */}
        <h2 className="font-poppins mb-5 text-center text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
          Brands I've{' '}
          <span className="relative text-accent">
            Worked With
            <span className="absolute -bottom-2 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-accent/0 via-accent to-accent/0" />
          </span>
        </h2>

        {/* ── Description ── */}
        <p className="mx-auto mb-14 max-w-xl text-center text-[15px] leading-7 text-muted-foreground">
          I help brands grow through{' '}
          <span className="font-medium text-accent">digital marketing</span>,{' '}
          <span className="font-medium text-accent">performance marketing</span>,{' '}
          paid advertising, marketing analytics, conversion tracking,{' '}
          and data-driven growth strategies.
        </p>

        {/* ── Logo Track ── */}
        <div className="relative rounded-2xl border border-white/[0.08] bg-[#0d0d0d] px-0 py-8 shadow-[0_2px_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.04)]">
          {/* left fade */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-36 rounded-l-2xl bg-gradient-to-r from-[#0d0d0d] to-transparent" />
          {/* right fade */}
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-36 rounded-r-2xl bg-gradient-to-l from-[#0d0d0d] to-transparent" />

          <div className="overflow-hidden">
            <div
              className="flex w-max items-center"
              style={{
                animation: 'marquee-scroll 35s linear infinite',
                animationPlayState: paused ? 'paused' : 'running',
              }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {track.map((logo, i) => (
                <div
                  key={`${logo.name}-${i}`}
                  className="group mx-7 flex shrink-0 cursor-pointer items-center justify-center"
                >
                  <div className="flex h-[72px] w-[148px] items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] px-5 transition-all duration-300 group-hover:border-accent/30 group-hover:bg-white/[0.07] group-hover:shadow-[0_0_24px_rgba(180,140,60,0.14)]">
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className="max-h-10 max-w-[108px] object-contain transition-all duration-300 [filter:grayscale(70%)_opacity(0.75)] group-hover:[filter:grayscale(0%)_opacity(1)] group-hover:scale-[1.06]"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Supporting line ── */}
        <p className="mt-4 text-center text-xs leading-relaxed text-white/30">
          Supporting startups and established brands across SaaS, eCommerce, Finance, Healthcare, and Consumer Technology.
        </p>

        {/* ── Metric Cards ── */}
        <div
          className={`mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 transition-all duration-700 delay-300 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {metrics.map(({ icon: Icon, value, label, sub }) => (
            <div
              key={label}
              className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d0d0d] px-4 py-8 text-center transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_36px_rgba(180,140,60,0.08)]"
            >
              {/* hover glow */}
              <span className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/25 bg-accent/10">
                <Icon size={22} className="text-accent" strokeWidth={1.5} />
              </div>

              <div className="space-y-0.5">
                <div className="font-poppins text-4xl font-bold tracking-tight text-white">
                  {value}
                </div>
                <div className="text-sm font-semibold text-white/80">{label}</div>
                <div className="text-xs text-white/40">{sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Skill Pills ── */}
        <div
          className={`mt-9 flex flex-wrap items-center justify-center gap-x-1 gap-y-3 transition-all duration-700 delay-500 ease-out ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {skills.map(({ icon: Icon, label }, idx) => (
            <div key={label} className="flex items-center gap-3">
              {idx > 0 && <span className="text-white/15">•</span>}
              <div className="flex items-center gap-2 text-[13px] text-white/40 transition-colors duration-200 hover:text-accent/90">
                <Icon size={14} className="text-accent/60" strokeWidth={1.7} />
                <span>{label}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
