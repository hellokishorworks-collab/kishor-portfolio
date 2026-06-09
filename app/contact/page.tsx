import type { Metadata } from 'next';
import { Mail, MessageCircle, Linkedin } from 'lucide-react';
import { CalButton } from '@/components/CalButton';

export const metadata: Metadata = {
  title: 'Contact — Kishor Hamal',
  description:
    'Get in touch with Kishor Hamal for marketing analytics, performance marketing, and growth opportunities.',
};

export default function ContactPage() {
  return (
    <section className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 text-sm font-medium tracking-widest text-accent uppercase">
          Get in Touch
        </p>

        <h1 className="font-poppins mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Contact
        </h1>

        <p className="mb-10 max-w-lg text-muted-foreground">
          Whether you have a project in mind, a role to discuss, or just want
          to connect — I&apos;d love to hear from you.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <a
            href="mailto:hello.kishorworks@gmail.com"
            className="group flex items-center gap-4 rounded-lg border border-border/50 bg-card p-5 transition-colors hover:border-accent/30"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary">
              <Mail className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Email</p>
              <p className="text-xs text-muted-foreground">
                hello.kishorworks@gmail.com
              </p>
            </div>
          </a>

          <a
            href="https://wa.me/9779713057146"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-lg border border-border/50 bg-card p-5 transition-colors hover:border-accent/30"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary">
              <MessageCircle className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">WhatsApp</p>
              <p className="text-xs text-muted-foreground">+977 9713057146</p>
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/kishorhamal-32595935a/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-lg border border-border/50 bg-card p-5 transition-colors hover:border-accent/30"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary">
              <Linkedin className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">LinkedIn</p>
              <p className="text-xs text-muted-foreground">
                kishorhamal-32595935a
              </p>
            </div>
          </a>
        </div>

        <div className="mt-10 flex justify-center">
          <CalButton />
        </div>

        <p className="mt-3 text-center text-sm text-muted-foreground">
          For remote roles, freelance projects, consulting, or collaboration.
        </p>

        <div className="mt-16 rounded-lg border border-border/50 bg-card p-8">
          <h2 className="font-poppins mb-4 text-xl font-semibold text-foreground">
            Open to Opportunities
          </h2>

          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            I&apos;m currently exploring international remote roles in:
          </p>

          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-accent" />
              Marketing Analytics & Data Intelligence
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-accent" />
              Performance Marketing & Growth
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-accent" />
              Tracking, Measurement & Attribution
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-accent" />
              Business Intelligence & Reporting
            </li>
          </ul>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Target regions: USA, Australia, UK, Germany, Nepal
          </p>
        </div>
      </div>
    </section>
  );
}