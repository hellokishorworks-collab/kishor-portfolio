'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { SiteSettings } from '@/types';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { MediaPickerModal } from '@/components/admin/MediaPickerModal';
import {
  Settings,
  Save,
  Globe,
  Share2,
  Mail,
  Search,
  Image as ImageIcon,
  Loader2,
  Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function SiteSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'seo' | 'social' | 'contact'>('general');
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

  const [formData, setFormData] = useState<SiteSettings>({
    site_name: 'Kishor Hamal',
    professional_name: 'Kishor Hamal',
    site_description:
      'Marketing Analytics & Growth Specialist with 4+ years of experience in data-driven marketing, performance marketing, and business intelligence.',
    contact_email: 'hello.kishorworks@gmail.com',
    whatsapp_number: '+9779800000000',
    linkedin_url: 'https://linkedin.com/in/kishorhamal',
    booking_url: 'https://cal.com/kishor-hamal-9pejf1/15min',
    github_url: '',
    twitter_url: '',
    default_seo_title: 'Kishor Hamal — Marketing Analytics & Growth Specialist',
    default_seo_description:
      'Marketing Analytics & Growth Specialist with 4+ years of experience in data-driven marketing, performance marketing, and business intelligence.',
    default_og_image: '/tracking.webp',
    canonical_base_url: 'https://kishorhamal.com',
  });

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 'default')
        .maybeSingle();

      if (!error && data) {
        setFormData({
          id: 'default',
          site_name: data.site_name || 'Kishor Hamal',
          professional_name: data.professional_name || 'Kishor Hamal',
          site_description: data.site_description || '',
          contact_email: data.contact_email || 'hello.kishorworks@gmail.com',
          whatsapp_number: data.whatsapp_number || '',
          linkedin_url: data.linkedin_url || '',
          booking_url: data.booking_url || '',
          github_url: data.github_url || '',
          twitter_url: data.twitter_url || '',
          default_seo_title: data.default_seo_title || '',
          default_seo_description: data.default_seo_description || '',
          default_og_image: data.default_og_image || '/tracking.webp',
          canonical_base_url: data.canonical_base_url || 'https://kishorhamal.com',
        });
      }
    } catch (err) {
      console.error('Error loading settings:', err);
    } finally {
      setLoading(false);
    }
  }

  async function triggerRevalidate(path: string) {
    try {
      await fetch('/api/admin/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path }),
      });
    } catch (e) {
      console.error('Revalidation error:', e);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      const payload = {
        id: 'default',
        ...formData,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('site_settings')
        .upsert(payload, { onConflict: 'id' });

      if (error) throw error;

      await triggerRevalidate('/');
      alert('Site settings saved successfully!');
    } catch (err: any) {
      alert(`Save failed: ${err.message || String(err)}`);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <AdminLayout onRefresh={loadSettings} isRefreshing={loading}>
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h2 className="font-poppins text-xl font-bold text-foreground">Site Settings</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configure global website metadata, contact endpoints, social links, and SEO defaults.
          </p>
        </div>

        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-accent text-background hover:bg-accent/90 text-xs font-semibold gap-1.5 shrink-0"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          <span>Save Settings</span>
        </Button>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-border/50">
        <button
          onClick={() => setActiveTab('general')}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors ${
            activeTab === 'general'
              ? 'border-accent text-accent'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Globe className="h-4 w-4" />
          General
        </button>
        <button
          onClick={() => setActiveTab('seo')}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors ${
            activeTab === 'seo'
              ? 'border-accent text-accent'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Search className="h-4 w-4" />
          SEO & Meta
        </button>
        <button
          onClick={() => setActiveTab('social')}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors ${
            activeTab === 'social'
              ? 'border-accent text-accent'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Share2 className="h-4 w-4" />
          Social Profiles
        </button>
        <button
          onClick={() => setActiveTab('contact')}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors ${
            activeTab === 'contact'
              ? 'border-accent text-accent'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Mail className="h-4 w-4" />
          Contact Information
        </button>
      </div>

      {/* TAB 1: GENERAL */}
      {activeTab === 'general' && (
        <div className="rounded-xl border border-border/60 bg-card p-6 space-y-5 max-w-3xl shadow-sm">
          <div className="space-y-1.5">
            <Label htmlFor="site-name" className="text-xs font-semibold">
              Site Brand Name
            </Label>
            <Input
              id="site-name"
              value={formData.site_name}
              onChange={(e) => setFormData({ ...formData, site_name: e.target.value })}
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="prof-name" className="text-xs font-semibold">
              Professional Name
            </Label>
            <Input
              id="prof-name"
              value={formData.professional_name}
              onChange={(e) => setFormData({ ...formData, professional_name: e.target.value })}
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="site-desc" className="text-xs font-semibold">
              Site Bio Description
            </Label>
            <Textarea
              id="site-desc"
              value={formData.site_description}
              onChange={(e) => setFormData({ ...formData, site_description: e.target.value })}
              rows={3}
              className="text-xs leading-relaxed"
            />
          </div>
        </div>
      )}

      {/* TAB 2: SEO */}
      {activeTab === 'seo' && (
        <div className="rounded-xl border border-border/60 bg-card p-6 space-y-5 max-w-3xl shadow-sm">
          <div className="space-y-1.5">
            <Label htmlFor="seo-title" className="text-xs font-semibold">
              Default SEO Title Template
            </Label>
            <Input
              id="seo-title"
              value={formData.default_seo_title}
              onChange={(e) => setFormData({ ...formData, default_seo_title: e.target.value })}
              className="text-xs font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="seo-desc" className="text-xs font-semibold">
              Default Meta Description
            </Label>
            <Textarea
              id="seo-desc"
              value={formData.default_seo_description}
              onChange={(e) => setFormData({ ...formData, default_seo_description: e.target.value })}
              rows={3}
              className="text-xs leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="canonical-url" className="text-xs font-semibold">
              Canonical Base URL
            </Label>
            <Input
              id="canonical-url"
              value={formData.canonical_base_url}
              onChange={(e) => setFormData({ ...formData, canonical_base_url: e.target.value })}
              className="text-xs font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-semibold">Default Social Sharing Image (OG Image)</Label>
            <div className="flex gap-2">
              <Input
                value={formData.default_og_image}
                onChange={(e) => setFormData({ ...formData, default_og_image: e.target.value })}
                className="text-xs font-mono"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsMediaModalOpen(true)}
                className="text-xs gap-1 border-border/60 shrink-0"
              >
                <ImageIcon className="h-3.5 w-3.5 text-accent" />
                Select
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SOCIAL */}
      {activeTab === 'social' && (
        <div className="rounded-xl border border-border/60 bg-card p-6 space-y-5 max-w-3xl shadow-sm">
          <div className="space-y-1.5">
            <Label htmlFor="linkedin" className="text-xs font-semibold">
              LinkedIn Profile URL
            </Label>
            <Input
              id="linkedin"
              value={formData.linkedin_url}
              onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
              className="text-xs font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="github" className="text-xs font-semibold">
              GitHub Profile URL
            </Label>
            <Input
              id="github"
              value={formData.github_url || ''}
              onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
              placeholder="https://github.com/..."
              className="text-xs font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="twitter" className="text-xs font-semibold">
              X / Twitter Profile URL
            </Label>
            <Input
              id="twitter"
              value={formData.twitter_url || ''}
              onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
              placeholder="https://x.com/..."
              className="text-xs font-mono"
            />
          </div>
        </div>
      )}

      {/* TAB 4: CONTACT */}
      {activeTab === 'contact' && (
        <div className="rounded-xl border border-border/60 bg-card p-6 space-y-5 max-w-3xl shadow-sm">
          <div className="space-y-1.5">
            <Label htmlFor="contact-email" className="text-xs font-semibold">
              Contact Inquiry Email
            </Label>
            <Input
              id="contact-email"
              type="email"
              value={formData.contact_email}
              onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="booking-url" className="text-xs font-semibold">
              Calendly / Cal.com Booking Link
            </Label>
            <Input
              id="booking-url"
              value={formData.booking_url}
              onChange={(e) => setFormData({ ...formData, booking_url: e.target.value })}
              className="text-xs font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="whatsapp" className="text-xs font-semibold">
              WhatsApp Number
            </Label>
            <Input
              id="whatsapp"
              value={formData.whatsapp_number}
              onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
              className="text-xs font-mono"
            />
          </div>

          <div className="p-3.5 rounded-lg border border-accent/30 bg-accent/10 text-xs text-accent flex items-center gap-2.5">
            <Lock className="h-4 w-4 shrink-0 text-accent" />
            <span>
              Server secrets (Gmail SMTP password & Supabase service keys) are safely isolated in environment variables.
            </span>
          </div>
        </div>
      )}

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelect={(url) => setFormData({ ...formData, default_og_image: url })}
      />
    </AdminLayout>
  );
}
