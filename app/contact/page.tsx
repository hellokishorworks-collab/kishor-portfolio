import type { Metadata } from 'next';
import { Mail, MessageCircle, Linkedin } from 'lucide-react';
import { CalButton } from '@/components/CalButton';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact — Kishor Hamal',
  description:
    'Get in touch with Kishor Hamal for marketing analytics, performance marketing, and growth opportunities.',
};

export default function ContactPage() {
  return (
    <section className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
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

        {/* Contact methods */}
        <div className="grid gap-4 sm:grid-cols-3">
          <a
            href="mailto:hello.kishorworks@gmail.com"
            className="group flex items-center gap-4 rounded-lg border border-border/50 bg-card p-5 transition-colors hover:border-accent/30"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary">
              <Mail className="h-5 w-5 text-accent" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">Email</p>
              <p className="truncate text-xs text-muted-foreground">
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
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">LinkedIn</p>
              <p className="truncate text-xs text-muted-foreground">
                kishorhamal-32595935a
              </p>
            </div>
          </a>
        </div>

        {/* Primary CTA — single, centered */}
        <div className="mt-8 flex justify-center">
          <CalButton />
        </div>

        {/* Two-column layout: form + compact panel */}
        <div className="mt-16 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <ContactForm />

          <div className="flex flex-col justify-center rounded-lg border border-border/50 bg-card p-6 md:p-8">
            <h2 className="font-poppins mb-3 text-xl font-semibold text-foreground">
              Let&apos;s work together
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Open to remote roles, freelance projects, consulting, and
              collaboration.
            </p>
            <div className="mt-6 border-t border-border/50 pt-5">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Target regions
              </p>
              <p className="mt-2 text-sm text-foreground">
                USA · Australia · UK · Germany · Nepal
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
