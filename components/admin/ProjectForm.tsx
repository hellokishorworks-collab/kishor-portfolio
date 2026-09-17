'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Project } from '@/types';
import { MediaPickerModal } from '@/components/admin/MediaPickerModal';
import {
  ArrowLeft,
  Save,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Upload,
  Loader2,
  Check,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ProjectFormProps {
  projectId?: string;
}

export function ProjectForm({ projectId }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(!!projectId);
  const [saving, setSaving] = useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

  const [formData, setFormData] = useState<Partial<Project>>({
    slug: '',
    title: '',
    image: '/paid-media.webp',
    summary: '',
    tags: [],
    result: '',
    overview: '',
    problem: '',
    approach: '',
    toolsUsed: [],
    insight: '',
    published: true,
    display_order: 1,
  });

  const [tagsInput, setTagsInput] = useState('');
  const [toolsInput, setToolsInput] = useState('');

  useEffect(() => {
    if (projectId) {
      loadProject(projectId);
    }
  }, [projectId]);

  async function loadProject(id: string) {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        alert('Project not found');
        router.push('/admin/projects');
        return;
      }

      setFormData({
        id: data.id,
        slug: data.slug,
        title: data.title,
        image: data.image,
        summary: data.summary,
        tags: data.tags || [],
        result: data.result,
        overview: data.overview,
        problem: data.problem,
        approach: data.approach,
        toolsUsed: data.tools_used || [],
        insight: data.insight,
        published: data.published,
        display_order: data.display_order,
      });

      setTagsInput((data.tags || []).join(', '));
      setToolsInput((data.tools_used || []).join(', '));
    } catch (err) {
      console.error('Failed loading project:', err);
    } finally {
      setLoading(false);
    }
  }

  function handleTitleChange(title: string) {
    setFormData((prev) => {
      const slug = prev.slug ? prev.slug : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      return { ...prev, title, slug };
    });
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

  async function handleSave(publishedState?: boolean) {
    if (!formData.title || !formData.slug) {
      alert('Title and Slug are required fields.');
      return;
    }

    setSaving(true);
    try {
      const finalPublished = publishedState !== undefined ? publishedState : (formData.published ?? true);

      const parsedTags = tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const parsedTools = toolsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        slug: formData.slug.trim(),
        title: formData.title.trim(),
        image: formData.image || '/paid-media.webp',
        summary: formData.summary || '',
        tags: parsedTags,
        result: formData.result || '',
        overview: formData.overview || '',
        problem: formData.problem || '',
        approach: formData.approach || '',
        tools_used: parsedTools,
        insight: formData.insight || '',
        published: finalPublished,
        display_order: Number(formData.display_order || 1),
        updated_at: new Date().toISOString(),
      };

      if (formData.id) {
        const { error } = await supabase
          .from('projects')
          .update(payload)
          .eq('id', formData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('projects').insert(payload);
        if (error) throw error;
      }

      await triggerRevalidate(`/projects/${payload.slug}`);
      await triggerRevalidate('/projects');

      router.push('/admin/projects');
      router.refresh();
    } catch (err: any) {
      alert(`Save error: ${err.message || String(err)}`);
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
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-5">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => router.push('/admin/projects')}
            className="border-border/60 h-8 text-xs"
          >
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
            Back to Projects
          </Button>
          <div>
            <h2 className="font-poppins text-lg font-bold text-foreground">
              {formData.id ? `Edit: ${formData.title}` : 'Create New Project'}
            </h2>
            <p className="text-xs text-muted-foreground">
              {formData.id ? `ID: ${formData.id}` : 'Fill in project case study information.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {formData.slug && (
            <a
              href={`/projects/${formData.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border/60 bg-secondary px-3 text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              <span>Preview</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleSave(false)}
            disabled={saving}
            className="h-8 text-xs border-border/60"
          >
            Save Draft
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={() => handleSave(true)}
            disabled={saving}
            className="h-8 bg-accent text-background hover:bg-accent/90 text-xs font-semibold gap-1.5"
          >
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
            <span>Publish Project</span>
          </Button>
        </div>
      </div>

      {/* Editor Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Core Case Study Content (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Basic Information */}
          <div className="rounded-xl border border-border/60 bg-card p-6 space-y-4 shadow-sm">
            <h3 className="font-poppins text-sm font-bold text-foreground border-b border-border/40 pb-3">
              1. Basic Information
            </h3>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="proj-title" className="text-xs font-semibold">
                  Project Title *
                </Label>
                <Input
                  id="proj-title"
                  value={formData.title || ''}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Paid Media Performance Optimization"
                  className="text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="proj-slug" className="text-xs font-semibold">
                  URL Slug *
                </Label>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-muted-foreground font-mono">/projects/</span>
                  <Input
                    id="proj-slug"
                    value={formData.slug || ''}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="paid-media-performance-optimization"
                    className="text-xs font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="proj-summary" className="text-xs font-semibold">
                  Short Summary / Excerpt *
                </Label>
                <Textarea
                  id="proj-summary"
                  value={formData.summary || ''}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Optimized Google Ads and Meta Ads campaigns..."
                  rows={2}
                  className="text-xs leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="proj-overview" className="text-xs font-semibold">
                  Project Overview
                </Label>
                <Textarea
                  id="proj-overview"
                  value={formData.overview || ''}
                  onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                  placeholder="Detailed overview of the project scope and environment..."
                  rows={3}
                  className="text-xs leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Case Study Details */}
          <div className="rounded-xl border border-border/60 bg-card p-6 space-y-4 shadow-sm">
            <h3 className="font-poppins text-sm font-bold text-foreground border-b border-border/40 pb-3">
              2. Case Study Analysis & Results
            </h3>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="proj-result" className="text-xs font-semibold">
                  Key Result / Highlight Metric
                </Label>
                <Input
                  id="proj-result"
                  value={formData.result || ''}
                  onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                  placeholder="e.g. Reduced CAC by 28% and improved overall CTR by 1.8x"
                  className="text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="proj-problem" className="text-xs font-semibold">
                  The Problem / Challenge
                </Label>
                <Textarea
                  id="proj-problem"
                  value={formData.problem || ''}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  placeholder="Describe the initial bottlenecks, drop-offs, or inefficiencies..."
                  rows={3}
                  className="text-xs leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="proj-approach" className="text-xs font-semibold">
                  Strategic Approach & Execution
                </Label>
                <Textarea
                  id="proj-approach"
                  value={formData.approach || ''}
                  onChange={(e) => setFormData({ ...formData, approach: e.target.value })}
                  placeholder="Detail the steps taken, tracking implemented, and campaign restructuring..."
                  rows={4}
                  className="text-xs leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="proj-insight" className="text-xs font-semibold">
                  Key Insight / Takeaway
                </Label>
                <Textarea
                  id="proj-insight"
                  value={formData.insight || ''}
                  onChange={(e) => setFormData({ ...formData, insight: e.target.value })}
                  placeholder="Key technical or analytical insight discovered during project..."
                  rows={3}
                  className="text-xs leading-relaxed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Media, Tags, Tools & Settings (1 Col) */}
        <div className="space-y-6">
          {/* Cover Media */}
          <div className="rounded-xl border border-border/60 bg-card p-6 space-y-4 shadow-sm">
            <h3 className="font-poppins text-sm font-bold text-foreground border-b border-border/40 pb-3">
              Cover Image
            </h3>

            <div className="space-y-3">
              <div className="relative aspect-video rounded-lg overflow-hidden border border-border/60 bg-secondary/30">
                <img
                  src={formData.image || '/paid-media.webp'}
                  alt="Cover preview"
                  className="h-full w-full object-cover"
                />
              </div>

              <Input
                value={formData.image || ''}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="/paid-media.webp or https://..."
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
                Select / Upload Media
              </Button>
            </div>
          </div>

          {/* Tags & Tools */}
          <div className="rounded-xl border border-border/60 bg-card p-6 space-y-4 shadow-sm">
            <h3 className="font-poppins text-sm font-bold text-foreground border-b border-border/40 pb-3">
              Taxonomy & Stack
            </h3>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="proj-tags" className="text-xs font-semibold">
                  Category / Tags (comma-separated)
                </Label>
                <Input
                  id="proj-tags"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Google Ads, Meta Ads, Paid Media"
                  className="text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="proj-tools" className="text-xs font-semibold">
                  Tools Used (comma-separated)
                </Label>
                <Input
                  id="proj-tools"
                  value={toolsInput}
                  onChange={(e) => setToolsInput(e.target.value)}
                  placeholder="GA4, GTM, Looker Studio"
                  className="text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="proj-order" className="text-xs font-semibold">
                  Display Order
                </Label>
                <Input
                  id="proj-order"
                  type="number"
                  value={formData.display_order ?? 1}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 1 })}
                  className="text-xs"
                />
              </div>
            </div>
          </div>

          {/* Publishing Controls */}
          <div className="rounded-xl border border-border/60 bg-card p-6 space-y-4 shadow-sm">
            <h3 className="font-poppins text-sm font-bold text-foreground border-b border-border/40 pb-3">
              Publishing Options
            </h3>

            <div className="flex items-center justify-between p-3 rounded-lg border border-border/40 bg-secondary/20">
              <div>
                <p className="text-xs font-bold text-foreground">Publication Status</p>
                <p className="text-[11px] text-muted-foreground">
                  {formData.published ? 'Visible to website visitors' : 'Draft / Hidden'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, published: !formData.published })}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  formData.published ? 'bg-accent' : 'bg-secondary'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow ring-0 transition duration-200 ease-in-out ${
                    formData.published ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Media Selector Modal */}
      <MediaPickerModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelect={(url) => setFormData({ ...formData, image: url })}
      />
    </div>
  );
}
