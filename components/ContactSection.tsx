import { Mail, MessageCircle, Linkedin } from 'lucide-react';
import { CalButton } from './CalButton';

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

      </div>
    </section>
  );
}