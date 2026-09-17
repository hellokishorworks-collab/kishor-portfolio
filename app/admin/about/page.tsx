'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { AboutContent, Experience, Tool } from '@/types';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { MediaPickerModal } from '@/components/admin/MediaPickerModal';
import {
  User,
  Save,
  Plus,
  Trash2,
  Image as ImageIcon,
  Loader2,
  Briefcase,
  Wrench,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function AboutCMSPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

  const [formData, setFormData] = useState<AboutContent>({
    profile_intro: '',
    bio_paragraphs: [],
    experiences: [],
    tools: [],
    profile_image: '/kishor.jpg',
  });

  const [bioInput, setBioInput] = useState('');

  useEffect(() => {
    loadAboutContent();
  }, []);

  async function loadAboutContent() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('about_content')
        .select('*')
        .eq('id', 'default')
        .maybeSingle();

      if (!error && data) {
        setFormData({
          profile_intro: data.profile_intro || '',
          bio_paragraphs: data.bio_paragraphs || [],
          experiences: data.experiences || [],
          tools: data.tools || [],
          profile_image: data.profile_image || '/kishor.jpg',
        });
        setBioInput((data.bio_paragraphs || []).join('\n\n'));
      }
    } catch (err) {
      console.error('Error loading about content:', err);
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
      const parsedBio = bioInput
        .split('\n\n')
        .map((p) => p.trim())
        .filter(Boolean);

      const payload = {
        id: 'default',
        profile_intro: formData.profile_intro.trim(),
        bio_paragraphs: parsedBio,
        experiences: formData.experiences,
        tools: formData.tools,
        profile_image: formData.profile_image || '/kishor.jpg',
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('about_content')
        .upsert(payload, { onConflict: 'id' });

      if (error) throw error;

      await triggerRevalidate('/about');
      await triggerRevalidate('/');
      alert('About page content saved successfully!');
    } catch (err: any) {
      alert(`Save failed: ${err.message || String(err)}`);
    } finally {
      setSaving(false);
    }
  }

  // Experience handlers
  function addExperience() {
    const newExp: Experience = {
      id: Date.now().toString(),
      role: 'New Role Title',
      company: 'Company Name',
      period: '2023 - Present',
      location: 'Location',
      focus: 'Description of key responsibilities and impact...',
    };
    setFormData((prev) => ({ ...prev, experiences: [...prev.experiences, newExp] }));
  }

  function updateExperience(index: number, field: keyof Experience, value: string) {
    setFormData((prev) => {
      const updated = [...prev.experiences];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, experiences: updated };
    });
  }

  function removeExperience(index: number) {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index),
    }));
  }

  // Tools handlers
  function addTool() {
    const newTool: Tool = {
      id: Date.now().toString(),
      name: 'New Tool / Skill',
      category: 'Analytics',
    };
    setFormData((prev) => ({ ...prev, tools: [...prev.tools, newTool] }));
  }

  function updateTool(index: number, field: keyof Tool, value: string) {
    setFormData((prev) => {
      const updated = [...prev.tools];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, tools: updated };
    });
  }

  function removeTool(index: number) {
    setFormData((prev) => ({
      ...prev,
      tools: prev.tools.filter((_, i) => i !== index),
    }));
  }

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <AdminLayout onRefresh={loadAboutContent} isRefreshing={loading}>
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h2 className="font-poppins text-xl font-bold text-foreground">About Page CMS</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage your bio, profile image, work experience entries, and core tools stack.
          </p>
        </div>

        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-accent text-background hover:bg-accent/90 text-xs font-semibold gap-1.5 shrink-0"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          <span>Save About Page</span>
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Bio & Intro (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Intro & Bio */}
          <div className="rounded-xl border border-border/60 bg-card p-6 space-y-4 shadow-sm">
            <h3 className="font-poppins text-sm font-bold text-foreground border-b border-border/40 pb-3 flex items-center gap-2">
              <User className="h-4 w-4 text-accent" />
              <span>Bio & Summary</span>
            </h3>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="about-intro" className="text-xs font-semibold">
                  Profile Headline / Introduction *
                </Label>
                <Textarea
                  id="about-intro"
                  value={formData.profile_intro}
                  onChange={(e) => setFormData({ ...formData, profile_intro: e.target.value })}
                  placeholder="I'm a Marketing Analytics & Growth Specialist working at the intersection..."
                  rows={3}
                  className="text-xs leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="about-bio" className="text-xs font-semibold">
                  Detailed Bio Paragraphs (separate paragraphs with blank lines)
                </Label>
                <Textarea
                  id="about-bio"
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                  placeholder="Paragraph 1...\n\nParagraph 2...\n\nParagraph 3..."
                  rows={8}
                  className="text-xs leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="rounded-xl border border-border/60 bg-card p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
              <h3 className="font-poppins text-sm font-bold text-foreground flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-accent" />
                <span>Work Experience Timeline</span>
              </h3>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addExperience}
                className="text-xs gap-1 h-7 border-border/60"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Position</span>
              </Button>
            </div>

            <div className="space-y-4">
              {formData.experiences.map((exp, idx) => (
                <div
                  key={exp.id || idx}
                  className="rounded-lg border border-border/60 bg-secondary/20 p-4 space-y-3 relative group"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
                      Position #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeExperience(idx)}
                      className="text-muted-foreground hover:text-destructive p-1 rounded"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-[11px]">Role / Title</Label>
                      <Input
                        value={exp.role}
                        onChange={(e) => updateExperience(idx, 'role', e.target.value)}
                        className="text-xs h-8"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[11px]">Company / Organization</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) => updateExperience(idx, 'company', e.target.value)}
                        className="text-xs h-8"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[11px]">Period / Timeframe</Label>
                      <Input
                        value={exp.period}
                        onChange={(e) => updateExperience(idx, 'period', e.target.value)}
                        className="text-xs h-8"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[11px]">Location / Remote</Label>
                      <Input
                        value={exp.location}
                        onChange={(e) => updateExperience(idx, 'location', e.target.value)}
                        className="text-xs h-8"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-[11px]">Focus & Responsibilities</Label>
                    <Textarea
                      value={exp.focus}
                      onChange={(e) => updateExperience(idx, 'focus', e.target.value)}
                      rows={2}
                      className="text-xs leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Profile Image & Tools Stack (1 Col) */}
        <div className="space-y-6">
          {/* Profile Image */}
          <div className="rounded-xl border border-border/60 bg-card p-6 space-y-4 shadow-sm">
            <h3 className="font-poppins text-sm font-bold text-foreground border-b border-border/40 pb-3">
              Profile Photo
            </h3>

            <div className="space-y-3">
              <div className="relative aspect-square w-32 mx-auto rounded-full overflow-hidden border-2 border-accent/40 bg-secondary/30 shadow-md">
                <img
                  src={formData.profile_image || '/kishor.jpg'}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>

              <Input
                value={formData.profile_image || ''}
                onChange={(e) => setFormData({ ...formData, profile_image: e.target.value })}
                placeholder="/kishor.jpg or https://..."
                className="text-xs font-mono"
              />

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsMediaModalOpen(true)}
                className="w-full text-xs gap-1.5 border-border/60"
              >
                <ImageIcon className="h-3.5 w-3.5 text-accent" />
                Select / Upload Photo
              </Button>
            </div>
          </div>

          {/* Tools & Stack */}
          <div className="rounded-xl border border-border/60 bg-card p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
              <h3 className="font-poppins text-sm font-bold text-foreground flex items-center gap-2">
                <Wrench className="h-4 w-4 text-accent" />
                <span>Tools & Stack ({formData.tools.length})</span>
              </h3>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addTool}
                className="text-xs gap-1 h-7 border-border/60"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Tool</span>
              </Button>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {formData.tools.map((tool, idx) => (
                <div
                  key={tool.id || idx}
                  className="flex items-center gap-2 rounded-lg border border-border/50 bg-secondary/30 p-2"
                >
                  <Input
                    value={tool.name}
                    onChange={(e) => updateTool(idx, 'name', e.target.value)}
                    placeholder="Tool Name"
                    className="text-xs h-7 flex-1"
                  />
                  <Input
                    value={tool.category}
                    onChange={(e) => updateTool(idx, 'category', e.target.value)}
                    placeholder="Category"
                    className="text-[11px] h-7 w-28 font-mono text-muted-foreground"
                  />
                  <button
                    type="button"
                    onClick={() => removeTool(idx)}
                    className="text-muted-foreground hover:text-destructive p-1 rounded"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelect={(url) => setFormData({ ...formData, profile_image: url })}
      />
    </AdminLayout>
  );
}
