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
      <div className="mx-auto w-full max-w-xl">
        {/* Header */}
        <p className="mb-2 text-sm font-medium tracking-widest text-accent uppercase">
          Get in Touch
        </p>

        <h1 className="font-poppins mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Contact
        </h1>

        <p className="mb-10 text-muted-foreground">
          Whether you have a project in mind, a role to discuss, or just want
          to connect — I&apos;d love to hear from you.
        </p>

        {/* Contact form */}
        <ContactForm />

        {/* Contact methods */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href="mailto:hello.kishorworks@gmail.com"
            className="flex items-center gap-3 rounded-lg border border-border/50 bg-card px-5 py-3 transition-colors hover:border-accent/30"
          >
            <Mail className="h-5 w-5 flex-shrink-0 text-accent" />
            <span className="text-sm font-medium text-foreground">Email</span>
          </a>

          <a
            href="https://wa.me/9779713057146"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-border/50 bg-card px-5 py-3 transition-colors hover:border-accent/30"
          >
            <MessageCircle className="h-5 w-5 flex-shrink-0 text-accent" />
            <span className="text-sm font-medium text-foreground">WhatsApp</span>
          </a>

          <a
            href="https://www.linkedin.com/in/kishorhamal-32595935a/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-border/50 bg-card px-5 py-3 transition-colors hover:border-accent/30"
          >
            <Linkedin className="h-5 w-5 flex-shrink-0 text-accent" />
            <span className="text-sm font-medium text-foreground">LinkedIn</span>
          </a>
        </div>

        {/* Single CTA */}
        <div className="mt-8 flex justify-center">
          <CalButton />
        </div>
      </div>
    </section>
  );
}
