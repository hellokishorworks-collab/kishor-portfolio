'use client';

import { useState } from 'react';
import { Send, Loader as Loader2, CircleCheck as CheckCircle2, CircleAlert as AlertCircle } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { supabase } from '@/lib/supabase';

const INTEREST_OPTIONS = [
  'Remote Role',
  'Freelance Project',
  'Consulting',
  'Collaboration',
  'Other',
] as const;

type FormState = {
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
  budget: string;
};

const initialForm: FormState = {
  name: '',
  email: '',
  company: '',
  interest: '',
  message: '',
  budget: '',
};

type FormErrors = Partial<Record<keyof FormState, string>>;

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = 'Please enter your full name.';
  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!validateEmail(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!values.interest) errors.interest = 'Please select an option.';
  if (!values.message.trim()) errors.message = 'Please enter a message.';
  return errors;
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function updateField<K extends keyof FormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
    if (submitError) setSubmitError(null);
    if (success) setSuccess(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    setSuccess(false);

    try {
      const { error } = await supabase.from('contact_submissions').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim() || null,
        interest: form.interest,
        message: form.message.trim(),
        budget: form.budget.trim() || null,
      });

      if (error) throw error;

      setSuccess(true);
      setForm(initialForm);
      setErrors({});
    } catch {
      setSubmitError(
        'Something went wrong while sending your message. Please try again or email me directly at hello.kishorworks@gmail.com.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-lg border border-border/50 bg-card p-6 md:p-8">
      <h3 className="font-poppins mb-2 text-xl font-semibold text-foreground">
        Send a Message
      </h3>
      <p className="mb-6 text-sm text-muted-foreground">
        Fill out the form and I&apos;ll get back to you.
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground">
            Full Name <span className="text-accent">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            disabled={submitting}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="text-xs text-destructive">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">
            Email <span className="text-accent">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            disabled={submitting}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="text-xs text-destructive">
              {errors.email}
            </p>
          )}
        </div>

        {/* Company */}
        <div className="space-y-2">
          <Label htmlFor="company" className="text-foreground">
            Company / Organization
          </Label>
          <Input
            id="company"
            type="text"
            autoComplete="organization"
            placeholder="Your company (optional)"
            value={form.company}
            onChange={(e) => updateField('company', e.target.value)}
            disabled={submitting}
          />
        </div>

        {/* Interest */}
        <div className="space-y-2">
          <Label htmlFor="interest" className="text-foreground">
            I&apos;m interested in <span className="text-accent">*</span>
          </Label>
          <Select
            value={form.interest}
            onValueChange={(value) => updateField('interest', value)}
            disabled={submitting}
          >
            <SelectTrigger
              id="interest"
              aria-invalid={!!errors.interest}
              aria-describedby={errors.interest ? 'interest-error' : undefined}
            >
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {INTEREST_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.interest && (
            <p id="interest-error" role="alert" className="text-xs text-destructive">
              {errors.interest}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="message" className="text-foreground">
            Message <span className="text-accent">*</span>
          </Label>
          <Textarea
            id="message"
            placeholder="Tell me about your project, role, or inquiry..."
            value={form.message}
            onChange={(e) => updateField('message', e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            disabled={submitting}
            className="min-h-[120px]"
          />
          {errors.message && (
            <p id="message-error" role="alert" className="text-xs text-destructive">
              {errors.message}
            </p>
          )}
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <Label htmlFor="budget" className="text-foreground">
            Project / Budget
          </Label>
          <Input
            id="budget"
            type="text"
            placeholder="e.g. $5,000–$10,000 (optional)"
            value={form.budget}
            onChange={(e) => updateField('budget', e.target.value)}
            disabled={submitting}
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={submitting}
          className="w-full bg-accent text-background hover:bg-accent/90"
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </>
          )}
        </Button>

        {/* Success message */}
        {success && (
          <div
            role="status"
            className="flex items-start gap-3 rounded-md border border-accent/30 bg-accent/10 p-4 text-sm text-foreground"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
            <p>
              Thanks for reaching out. Your message has been received.
            </p>
          </div>
        )}

        {/* Error message */}
        {submitError && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-foreground"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
            <p>{submitError}</p>
          </div>
        )}
      </form>
    </div>
  );
}
