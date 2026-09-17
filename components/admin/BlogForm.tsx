'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { BlogPost } from '@/types';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { MediaPickerModal } from '@/components/admin/MediaPickerModal';
import {
  ArrowLeft,
  Save,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Loader2,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface BlogFormProps {
  blogId?: string;
}

export function BlogForm({ blogId }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(!!blogId);
  const [saving, setSaving] = useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [mediaTarget, setMediaTarget] = useState<'cover' | 'editor'>('cover');

  const [formData, setFormData] = useState<Partial<BlogPost>>({
    slug: '',
    title: '',
    coverImage: '/tracking.webp',
    excerpt: '',
    content: '',
    tags: [],
    readingTime: '5 min read',
    published: false,
    publishedAt: null,
  });

  const [tagsInput, setTagsInput] = useState('');

  useEffect(() => {
    if (blogId) {
      loadBlog(blogId);
    }
  }, [blogId]);

  async function loadBlog(id: string) {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        alert('Blog article not found');
        router.push('/admin/blog');
        return;
      }

      setFormData({
        id: data.id,
        slug: data.slug,
        title: data.title,
        coverImage: data.cover_image,
        cover_image: data.cover_image,
        excerpt: data.excerpt,
        content: data.content,
        tags: data.tags || [],
        readingTime: data.reading_time || '5 min read',
        reading_time: data.reading_time || '5 min read',
        published: data.published,
        publishedAt: data.published_at,
        published_at: data.published_at,
      });

      setTagsInput((data.tags || []).join(', '));
    } catch (err) {
      console.error('Failed loading blog:', err);
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

  // Calculate estimated reading time automatically
  function calculateReadingTime(text: string) {
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 200));
    return `${minutes} min read`;
  }

  function handleContentChange(content: string) {
    const readingTime = calculateReadingTime(content);
    setFormData((prev) => ({ ...prev, content, readingTime, reading_time: readingTime }));
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
      const finalPublished = publishedState !== undefined ? publishedState : (formData.published ?? false);

      const parsedTags = tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        slug: formData.slug.trim(),
        title: formData.title.trim(),
        cover_image: formData.coverImage || formData.cover_image || null,
        excerpt: formData.excerpt || '',
        content: formData.content || '',
        tags: parsedTags,
        reading_time: formData.readingTime || formData.reading_time || '5 min read',
        published: finalPublished,
        published_at: finalPublished
          ? (formData.publishedAt || formData.published_at || new Date().toISOString())
          : null,
        updated_at: new Date().toISOString(),
      };

      if (formData.id) {
        const { error } = await supabase
          .from('blogs')
          .update(payload)
          .eq('id', formData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('blogs').insert(payload);
        if (error) throw error;
      }

      await triggerRevalidate(`/blog/${payload.slug}`);
      await triggerRevalidate('/blog');

      router.push('/admin/blog');
      router.refresh();
    } catch (err: any) {
      alert(`Save error: ${err.message || String(err)}`);
    } finally {
      setSaving(false);
    }
  }

  function handleMediaSelected(url: string) {
    if (mediaTarget === 'cover') {
      setFormData((prev) => ({ ...prev, coverImage: url, cover_image: url }));
    } else {
      const imageMarkdown = `\n![Image](${url})\n`;
      handleContentChange((formData.content || '') + imageMarkdown);
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
            onClick={() => router.push('/admin/blog')}
            className="border-border/60 h-8 text-xs"
          >
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
            Back to Articles
          </Button>
          <div>
            <h2 className="font-poppins text-lg font-bold text-foreground">
              {formData.id ? `Edit: ${formData.title}` : 'Create New Article'}
            </h2>
            <p className="text-xs text-muted-foreground">
              {formData.id ? `ID: ${formData.id}` : 'Write and publish editorial blog posts.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {formData.slug && (
            <a
              href={`/blog/${formData.slug}`}
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
            <span>Publish Article</span>
          </Button>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Title, Excerpt & Rich Text Editor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-border/60 bg-card p-6 space-y-4 shadow-sm">
            <div className="space-y-1.5">
              <Label htmlFor="blog-title" className="text-xs font-semibold">
                Article Title *
              </Label>
              <Input
                id="blog-title"
                value={formData.title || ''}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Server-Side Tracking with GA4 & Meta CAPI: A Complete Guide"
                className="text-sm font-bold font-poppins"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="blog-slug" className="text-xs font-semibold">
                URL Slug *
              </Label>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-muted-foreground font-mono">/blog/</span>
                <Input
                  id="blog-slug"
                  value={formData.slug || ''}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="ga4-server-side-tracking-guide"
                  className="text-xs font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="blog-excerpt" className="text-xs font-semibold">
                Article Excerpt / Summary *
              </Label>
              <Textarea
                id="blog-excerpt"
                value={formData.excerpt || ''}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief description of the article for blog feed and SEO..."
                rows={2}
                className="text-xs leading-relaxed"
              />
            </div>
          </div>

          {/* Editorial Rich Text Editor */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-foreground">Article Content (Markdown)</Label>
            <RichTextEditor
              value={formData.content || ''}
              onChange={handleContentChange}
              onOpenMediaPicker={() => {
                setMediaTarget('editor');
                setIsMediaModalOpen(true);
              }}
            />
          </div>
        </div>

        {/* Right Sidebar: Cover Image, Tags, Reading Time & Publishing */}
        <div className="space-y-6">
          {/* Cover Media */}
          <div className="rounded-xl border border-border/60 bg-card p-6 space-y-4 shadow-sm">
            <h3 className="font-poppins text-sm font-bold text-foreground border-b border-border/40 pb-3">
              Cover Image
            </h3>

            <div className="space-y-3">
              <div className="relative aspect-video rounded-lg overflow-hidden border border-border/60 bg-secondary/30">
                <img
                  src={formData.coverImage || formData.cover_image || '/tracking.webp'}
                  alt="Cover preview"
                  className="h-full w-full object-cover"
                />
              </div>

              <Input
                value={formData.coverImage || formData.cover_image || ''}
                onChange={(e) =>
                  setFormData({ ...formData, coverImage: e.target.value, cover_image: e.target.value })
                }
                placeholder="/tracking.webp or https://..."
                className="text-xs font-mono"
              />

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setMediaTarget('cover');
                  setIsMediaModalOpen(true);
                }}
                className="w-full text-xs gap-1.5 border-border/60"
              >
                <ImageIcon className="h-3.5 w-3.5 text-accent" />
                Select / Upload Cover
              </Button>
            </div>
          </div>

          {/* Article Taxonomy */}
          <div className="rounded-xl border border-border/60 bg-card p-6 space-y-4 shadow-sm">
            <h3 className="font-poppins text-sm font-bold text-foreground border-b border-border/40 pb-3">
              Taxonomy & Metadata
            </h3>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="blog-tags" className="text-xs font-semibold">
                  Article Tags (comma-separated)
                </Label>
                <Input
                  id="blog-tags"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="GA4, GTM, CAPI, Server-Side Tracking"
                  className="text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="blog-reading-time" className="text-xs font-semibold">
                  Estimated Reading Time
                </Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="blog-reading-time"
                    value={formData.readingTime || formData.reading_time || '5 min read'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        readingTime: e.target.value,
                        reading_time: e.target.value,
                      })
                    }
                    className="pl-9 text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Publishing Options */}
          <div className="rounded-xl border border-border/60 bg-card p-6 space-y-4 shadow-sm">
            <h3 className="font-poppins text-sm font-bold text-foreground border-b border-border/40 pb-3">
              Publishing Options
            </h3>

            <div className="flex items-center justify-between p-3 rounded-lg border border-border/40 bg-secondary/20">
              <div>
                <p className="text-xs font-bold text-foreground">Publish Article</p>
                <p className="text-[11px] text-muted-foreground">
                  {formData.published ? 'Visible publicly on /blog' : 'Draft mode / Hidden'}
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

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelect={handleMediaSelected}
      />
    </div>
  );
}
