import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

const CALENDLY_URL = 'https://cal.com/kishor-hamal-9pejf1/15min';
const OWNER_EMAIL = 'hello.kishorworks@gmail.com';

type ContactPayload = {
  name: string;
  email: string;
  company?: string | null;
  interest: string;
  message: string;
  budget?: string | null;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function htmlEscape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildNotificationHtml(p: ContactPayload): string {
  const rows = [
    ['Name', p.name],
    ['Email', p.email],
    ['Company', p.company || '—'],
    ['Interest', p.interest],
    ['Budget', p.budget || '—'],
    ['Message', p.message],
  ];
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;max-width:600px;margin:0 auto">
      <h2 style="margin-bottom:8px">New Contact Form Submission</h2>
      <p style="margin-top:0;color:#666">A new message was submitted through your website contact form.</p>
      <table style="width:100%;border-collapse:collapse;margin-top:16px;font-size:14px">
        ${rows
          .map(
            ([label, value]) => `
            <tr>
              <td style="padding:10px 12px;border:1px solid #eee;background:#fafafa;font-weight:600;width:120px;vertical-align:top">${htmlEscape(label)}</td>
              <td style="padding:10px 12px;border:1px solid #eee;white-space:pre-wrap">${htmlEscape(value)}</td>
            </tr>`
          )
          .join('')}
      </table>
      <p style="margin-top:24px;font-size:13px;color:#666">Reply directly to this email to respond to ${htmlEscape(p.email)}.</p>
    </div>`;
}

function buildThankYouHtml(p: ContactPayload): string {
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;max-width:600px;margin:0 auto">
      <h2 style="margin-bottom:8px">Thanks for reaching out, ${htmlEscape(p.name.split(' ')[0])}!</h2>
      <p style="margin-top:0;color:#444">I appreciate you taking the time to get in touch. I've received your message and will get back to you shortly.</p>
      <p style="color:#444">In the meantime, if you'd like to jump the queue, let's find a time to talk:</p>
      <p style="margin:24px 0">
        <a href="${CALENDLY_URL}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:#111827;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px">
          Book a 15-min Intro Call
        </a>
      </p>
      <p style="color:#666;font-size:13px;margin-top:32px">— Kishor Hamal</p>
    </div>`;
}

function buildNotificationText(p: ContactPayload): string {
  return [
    'New Contact Form Submission',
    '',
    `Name: ${p.name}`,
    `Email: ${p.email}`,
    `Company: ${p.company || '—'}`,
    `Interest: ${p.interest}`,
    `Budget: ${p.budget || '—'}`,
    '',
    'Message:',
    p.message,
  ].join('\n');
}

function buildThankYouText(p: ContactPayload): string {
  return [
    `Hi ${p.name.split(' ')[0]},`,
    '',
    'Thanks for reaching out! I appreciate you taking the time to get in touch.',
    "I've received your message and will get back to you shortly.",
    '',
    'In the meantime, if you would like to jump the queue, book a quick intro call:',
    CALENDLY_URL,
    '',
    '— Kishor Hamal',
  ].join('\n');
}

export async function POST(req: Request) {
  let payload: ContactPayload;
  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const name = (payload.name || '').trim();
  const email = (payload.email || '').trim();
  const interest = payload.interest || '';
  const message = (payload.message || '').trim();
  const company = payload.company?.trim() || null;
  const budget = payload.budget?.trim() || null;

  if (!name || !email || !interest || !message) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Server is not configured.' }, { status: 500 });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  const { data: inserted, error: insertError } = await supabase
    .from('contact_submissions')
    .insert({
      name,
      email,
      company,
      interest,
      message,
      budget,
    })
    .select('id')
    .single();

  if (insertError || !inserted) {
    console.error('Supabase insert failed:', insertError?.message);
    return NextResponse.json(
      { error: 'Could not save your message. Please try again later.' },
      { status: 500 }
    );
  }

  const submissionId = inserted.id as string;
  const cleanPayload: ContactPayload = { name, email, company, interest, message, budget };

  let notificationSent = false;
  let thankYouSent = false;
  let notificationError: string | null = null;
  let thankYouError: string | null = null;
  let emailSentAt: string | null = null;

  if (GMAIL_USER && GMAIL_APP_PASSWORD) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
    });

    try {
      await transporter.sendMail({
        from: GMAIL_USER,
        to: OWNER_EMAIL,
        replyTo: email,
        subject: `New contact form submission from ${name}`,
        text: buildNotificationText(cleanPayload),
        html: buildNotificationHtml(cleanPayload),
      });
      notificationSent = true;
      emailSentAt = new Date().toISOString();
    } catch (err) {
      notificationError = err instanceof Error ? err.message : String(err);
      console.error('Notification email failed:', notificationError);
    }

    try {
      await transporter.sendMail({
        from: GMAIL_USER,
        to: email,
        subject: 'Thanks for reaching out — Kishor Hamal',
        text: buildThankYouText(cleanPayload),
        html: buildThankYouHtml(cleanPayload),
      });
      thankYouSent = true;
      if (!emailSentAt) emailSentAt = new Date().toISOString();
    } catch (err) {
      thankYouError = err instanceof Error ? err.message : String(err);
      console.error('Thank-you email failed:', thankYouError);
    }
  } else {
    notificationError = 'Gmail SMTP credentials not configured';
    thankYouError = 'Gmail SMTP credentials not configured';
    console.warn(notificationError);
  }

  const { error: updateError } = await supabase
    .from('contact_submissions')
    .update({
      notification_email_sent: notificationSent,
      thank_you_email_sent: thankYouSent,
      notification_email_error: notificationError,
      thank_you_email_error: thankYouError,
      email_sent_at: emailSentAt,
    })
    .eq('id', submissionId);

  if (updateError) {
    console.error('Failed to update email tracking:', updateError.message);
  }

  return NextResponse.json({ ok: true });
}
