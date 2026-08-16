import type { Metadata } from 'next';
import { Linkedin, Mail, MessageCircle } from 'lucide-react';
import { CalButton } from '@/components/CalButton';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact — Kishor Hamal',
  description:
    'Get in touch with Kishor Hamal for marketing analytics, performance marketing, and growth opportunities.',
};

const contactMethods = [
  {
    label: 'Email',
    value: 'hello.kishorworks@gmail.com',
    href: 'mailto:hello.kishorworks@gmail.com',
    icon: Mail,
  },
  {
    label: 'WhatsApp',
    value: '+977 9713057146',
    href: 'https://wa.me/9779713057146',
    icon: MessageCircle,
  },
  {
    label: 'LinkedIn',
    value: 'kishorhamal-32595935a',
    href: 'https://www.linkedin.com/in/kishorhamal-32595935a/',
    icon: Linkedin,
  },
];

export default function ContactPage() {
  return (
    <section className="px-6 pb-24 pt-28 sm:pt-32">
      <div className="mx-auto grid w-full max-w-6xl items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:gap-16 xl:gap-24">
        <div>
          <div className="mb-8 max-w-xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
              Get in Touch
            </p>
            <h1 className="font-poppins text-4xl font-bold leading-[1.12] tracking-tight text-foreground sm:text-5xl">
              Contact
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
              Whether you have a project in mind, a role to discuss, or just
              want to connect — I&apos;d love to hear from you.
            </p>
          </div>

          <ContactForm />
        </div>

        <aside className="pt-2 lg:pt-16">
          <div className="mb-9 flex items-center gap-3">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
              I&apos;m here to help
            </p>
          </div>

          <h2 className="font-poppins max-w-lg text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl">
            Let&apos;s Build Something Great
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
            I help businesses and teams grow through data-driven marketing,
            analytics, and performance strategies. Let&apos;s turn your ideas
            into measurable results.
          </p>

          <div className="mt-10 space-y-3">
            {contactMethods.map(({ label, value, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-4 rounded-xl border border-transparent p-3 transition-colors hover:border-border/60 hover:bg-card"
              >
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-secondary text-accent transition-colors group-hover:bg-accent group-hover:text-background">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-base font-semibold text-foreground">
                    {label}
                  </span>
                  <span className="mt-1 block truncate text-sm text-muted-foreground">
                    {value}
                  </span>
                </span>
              </a>
            ))}
          </div>

          <div className="mt-8 border-t border-border/50 pt-8">
            <p className="mb-4 text-sm font-semibold text-foreground">
              Ready to talk?
            </p>
            <CalButton />
          </div>
        </aside>
      </div>
    </section>
  );
}
