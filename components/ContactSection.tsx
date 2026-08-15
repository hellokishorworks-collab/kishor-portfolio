'use client';

import { Mail, MessageCircle, Linkedin } from 'lucide-react';
import { CalButton } from './CalButton';
import { ContactForm } from './ContactForm';

export function ContactSection() {
  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">

        <p className="mb-2 text-sm font-medium tracking-widest text-accent uppercase">
          Get in Touch
        </p>

        <h2 className="font-poppins mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Contact
        </h2>

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

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <ContactForm />

          {/* Open to Opportunities */}
          <div className="flex flex-col justify-start">
            <div className="rounded-lg border border-border/50 bg-card p-6 md:p-8">
              <h3 className="font-poppins mb-2 text-xl font-semibold text-foreground">
                Open to Opportunities
              </h3>
              <p className="mb-5 text-sm text-muted-foreground">
                I&apos;m currently exploring international remote roles in:
              </p>
              <ul className="space-y-3">
                {[
                  'Marketing Analytics & Data Intelligence',
                  'Performance Marketing & Growth',
                  'Tracking, Measurement & Attribution',
                  'Business Intelligence & Reporting',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-border/50 pt-5">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Target regions
                </p>
                <p className="mt-2 text-sm text-foreground">
                  USA, Australia, UK, Germany, Nepal
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-border/50 bg-card p-6 md:p-8">
              <p className="text-sm text-muted-foreground">
                For remote roles, freelance projects, consulting, or collaboration.
              </p>
              <div className="mt-4">
                <CalButton />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
