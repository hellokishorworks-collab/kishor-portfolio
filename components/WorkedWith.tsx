'use client';

import { useState, useEffect, useRef } from 'react';
import { Compass, Rocket, ChartBar as BarChart3, RefreshCw, TrendingUp, ArrowRight } from 'lucide-react';

const logos = [
  { name: 'Rain Local',        src: '/logos/rainlocal_logo.jpeg' },
  { name: 'Calilio',           src: '/logos/CALILIO_LOGO.webp' },
  { name: 'CDR Report Writer', src: '/logos/CDR_REPORT_WRITER_LOGO.jpeg' },
  { name: 'Mobilemandu',       src: '/logos/MOBILEMANDU_LOGO.png' },
  { name: 'Black Shark Nepal', src: '/logos/BLACKSHARK_LOGO.jpg' },
  { name: 'Suvedas',           src: '/logos/SUVEDAS_LOGO.png' },
  { name: 'MidFirst Bank',     src: '/logos/Mid_first_logo.png' },
  { name: 'Daraz',             src: '/logos/DARAZ_LOGO.jpeg' },
  { name: 'Yoddha Lab',        src: '/logos/YODDHA_LAB_LOGO.png' },
];

const approach = [
  { icon: Compass,    label: 'Strategy' },
  { icon: Rocket,     label: 'Launch'   },
  { icon: BarChart3,  label: 'Measure'  },
  { icon: RefreshCw,  label: 'Optimize' },
  { icon: TrendingUp,  label: 'Scale'   },
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
      className="relative overflow-hidden bg-background px-6 py-32"
    >
      {/* ambient golden glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[900px] rounded-full bg-accent/[0.04] blur-[160px]" />
      </div>

      <div
        className={`mx-auto max-w-6xl transition-all duration-700 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >

        {/* ── Eyebrow ── */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-accent/60" />
          <p className="text-[11px] font-semibold tracking-[0.3em] text-accent uppercase">
            Trusted By
          </p>
          <span className="h-px w-12 bg-accent/60" />
        </div>

        {/* ── Heading ── */}
        <h2 className="font-poppins mb-7 text-center text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
          Brands I've{' '}
          <span className="relative text-accent">
            Worked With
            <span className="absolute -bottom-2 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-accent/0 via-accent to-accent/0" />
          </span>
        </h2>

        {/* ── Description ── */}
        <p className="mx-auto mb-20 max-w-xl text-center text-[15px] leading-7 text-muted-foreground">
          I help brands grow through{' '}
          <span className="font-medium text-accent">digital marketing</span>,{' '}
          <span className="font-medium text-accent">performance marketing</span>,{' '}
          marketing analytics, business intelligence,{' '}
          and data-driven decision making.
        </p>

        {/* ── Logo Marquee ── */}
        <div className="relative rounded-2xl border border-accent/10 bg-white/[0.015] py-20 backdrop-blur-sm [box-shadow:0_0_80px_-20px_rgba(180,140,60,0.18)]">
          {/* left fade mask */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-40 rounded-l-2xl bg-gradient-to-r from-background via-background/80 to-transparent" />
          {/* right fade mask */}
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-40 rounded-r-2xl bg-gradient-to-l from-background via-background/80 to-transparent" />

          <div className="overflow-hidden">
            <div
              className="flex w-max items-center"
              style={{
                animation: 'marquee-scroll 38s linear infinite',
                animationPlayState: paused ? 'paused' : 'running',
              }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {track.map((logo, i) => (
                <div
                  key={`${logo.name}-${i}`}
                  className="group flex shrink-0 items-center"
                >
                  <div className="flex items-center justify-center px-12">
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className="h-20 w-auto select-none object-contain transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                  {/* thin vertical divider */}
                  <span className="h-14 w-px bg-white/[0.08]" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Supporting line ── */}
        <p className="mt-8 text-center text-xs leading-relaxed text-white/30">
          Supporting startups and established brands across SaaS, eCommerce, Finance, Healthcare, and Consumer Technology.
        </p>

        {/* ── My Approach ── */}
        <div
          className={`mt-24 transition-all duration-700 delay-300 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h3 className="font-poppins mb-10 text-center text-2xl font-semibold tracking-tight text-white md:text-3xl">
            My Approach
          </h3>

          {/* step flow */}
          <div className="flex flex-wrap items-center justify-center gap-y-6">
            {approach.map(({ icon: Icon, label }, idx) => (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center gap-3 px-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/[0.06]">
                    <Icon size={20} className="text-accent" strokeWidth={1.6} />
                  </div>
                  <span className="text-sm font-medium text-white/80">{label}</span>
                </div>
                {idx < approach.length - 1 && (
                  <ArrowRight
                    size={18}
                    className="mx-1 text-accent/40"
                    strokeWidth={1.5}
                  />
                )}
              </div>
            ))}
          </div>

          {/* subtitle */}
          <p className="mx-auto mt-10 max-w-lg text-center text-sm leading-relaxed text-muted-foreground">
            Helping businesses make smarter marketing decisions through analytics, experimentation, and continuous optimization.
          </p>
        </div>

      </div>
    </section>
  );
}
