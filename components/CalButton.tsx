import { Calendar } from 'lucide-react';

export function CalButton() {
  return (
    <a
      href="https://cal.com/kishor-hamal-9pejf1/15min"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 rounded-lg bg-accent px-6 py-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
    >
      <Calendar className="h-5 w-5" />
      Book a 15-min Intro Call
    </a>
  );
}