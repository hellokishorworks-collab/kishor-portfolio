'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { ContactSubmission } from '@/types';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { EmptyState } from '@/components/admin/EmptyState';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Mail,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  Building,
  DollarSign,
  Briefcase,
  ExternalLink,
  Loader2,
  X,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ContactInquiriesPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'sent' | 'failed'>('all');

  // Detail Modal state
  const [activeInquiry, setActiveInquiry] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  async function loadSubmissions() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setSubmissions(data);
      }
    } catch (err) {
      console.error('Error fetching contact submissions:', err);
    } finally {
      setLoading(false);
    }
  }

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch =
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sub.company && sub.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      sub.interest.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.message.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterStatus === 'sent') return matchesSearch && sub.notification_email_sent;
    if (filterStatus === 'failed') return matchesSearch && !sub.notification_email_sent;
    return matchesSearch;
  });

  return (
    <AdminLayout onRefresh={loadSubmissions} isRefreshing={loading}>
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-poppins text-xl font-bold text-foreground">Contact Inquiries</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Inspect incoming project requests, client leads, and email delivery status logs.
          </p>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-border/60 bg-card p-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by sender, email, interest, or message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <div className="flex rounded-lg border border-border/60 bg-secondary/40 p-1">
            <button
              onClick={() => setFilterStatus('all')}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                filterStatus === 'all'
                  ? 'bg-card text-foreground font-semibold shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              All ({submissions.length})
            </button>
            <button
              onClick={() => setFilterStatus('sent')}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                filterStatus === 'sent'
                  ? 'bg-card text-emerald-400 font-semibold shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Delivered ({submissions.filter((s) => s.notification_email_sent).length})
            </button>
            <button
              onClick={() => setFilterStatus('failed')}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                filterStatus === 'failed'
                  ? 'bg-card text-amber-400 font-semibold shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Pending / Failed ({submissions.filter((s) => !s.notification_email_sent).length})
            </button>
          </div>
        </div>
      </div>

      {/* Inquiries List / Table */}
      {loading ? (
        <div className="flex h-64 items-center justify-center rounded-xl border border-border/60 bg-card">
          <Loader2 className="h-6 w-6 animate-spin text-accent" />
        </div>
      ) : filteredSubmissions.length === 0 ? (
        <EmptyState
          icon={Mail}
          title="No contact submissions found"
          description="Submissions sent through your public website contact form will appear here in real time."
        />
      ) : (
        <div className="rounded-xl border border-border/60 bg-card overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border/60 bg-secondary/30 text-muted-foreground font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Sender</th>
                  <th className="py-3.5 px-4 hidden sm:table-cell">Interest</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Submitted Date</th>
                  <th className="py-3.5 px-4">Email Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {filteredSubmissions.map((sub) => (
                  <tr
                    key={sub.id}
                    onClick={() => setActiveInquiry(sub)}
                    className="hover:bg-secondary/20 transition-colors cursor-pointer"
                  >
                    {/* Sender Info */}
                    <td className="py-3.5 px-4">
                      <div>
                        <p className="font-poppins font-bold text-foreground text-sm leading-snug">
                          {sub.name}
                        </p>
                        <p className="text-[11px] text-accent mt-0.5">{sub.email}</p>
                      </div>
                    </td>

                    {/* Service Interest */}
                    <td className="py-3.5 px-4 hidden sm:table-cell">
                      <span className="inline-flex items-center rounded-md border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent">
                        {sub.interest}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-muted-foreground text-[11px] hidden md:table-cell">
                      {new Date(sub.created_at).toLocaleString()}
                    </td>

                    {/* Email Delivery Status */}
                    <td className="py-3.5 px-4">
                      <StatusBadge
                        status={sub.notification_email_sent ? 'sent' : 'pending'}
                        label={sub.notification_email_sent ? 'Delivered' : 'Pending'}
                      />
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveInquiry(sub);
                        }}
                        className="h-7 text-xs border-border/60"
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Inquiry Detail Drawer / Modal */}
      {activeInquiry && (
        <Dialog open={!!activeInquiry} onOpenChange={() => setActiveInquiry(null)}>
          <DialogContent className="sm:max-w-xl border-border/60 bg-card p-6">
            <DialogHeader className="flex flex-row items-center justify-between border-b border-border/40 pb-4">
              <div>
                <DialogTitle className="font-poppins text-lg font-bold text-foreground">
                  Inquiry Details
                </DialogTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Submitted on {new Date(activeInquiry.created_at).toLocaleString()}
                </p>
              </div>
            </DialogHeader>

            <div className="space-y-4 pt-2 text-xs">
              {/* Sender Details Grid */}
              <div className="grid grid-cols-2 gap-3 rounded-lg border border-border/40 bg-secondary/20 p-4">
                <div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase block">Sender Name</span>
                  <span className="font-bold text-foreground text-sm">{activeInquiry.name}</span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase block">Email Address</span>
                  <a href={`mailto:${activeInquiry.email}`} className="font-semibold text-accent hover:underline">
                    {activeInquiry.email}
                  </a>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase block">Company / Agency</span>
                  <span className="text-foreground">{activeInquiry.company || '—'}</span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase block">Estimated Budget</span>
                  <span className="text-foreground">{activeInquiry.budget || '—'}</span>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-foreground block">Message Content</span>
                <div className="rounded-lg border border-border/60 bg-secondary/30 p-4 text-foreground leading-relaxed whitespace-pre-wrap font-sans text-xs">
                  {activeInquiry.message}
                </div>
              </div>

              {/* Email Delivery Audit Trail */}
              <div className="rounded-lg border border-border/60 bg-card p-4 space-y-2">
                <span className="text-xs font-bold text-foreground block">Email Pipeline Status</span>

                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">Owner Notification Email:</span>
                  <StatusBadge
                    status={activeInquiry.notification_email_sent ? 'sent' : 'pending'}
                    label={activeInquiry.notification_email_sent ? 'Sent' : 'Pending / Failed'}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">Visitor Thank-You Autoresponder:</span>
                  <StatusBadge
                    status={activeInquiry.thank_you_email_sent ? 'sent' : 'pending'}
                    label={activeInquiry.thank_you_email_sent ? 'Sent' : 'Pending / Failed'}
                  />
                </div>

                {activeInquiry.email_sent_at && (
                  <p className="text-[10px] text-muted-foreground/70 pt-1 border-t border-border/40">
                    Dispatched at: {new Date(activeInquiry.email_sent_at).toLocaleString()}
                  </p>
                )}
              </div>

              <div className="flex justify-end pt-2">
                <a
                  href={`mailto:${activeInquiry.email}?subject=Re: ${encodeURIComponent(activeInquiry.interest)} — Kishor Hamal`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-accent text-background px-4 py-2 text-xs font-semibold hover:bg-accent/90 transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AdminLayout>
  );
}
