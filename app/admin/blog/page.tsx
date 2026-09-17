'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { BlogPost } from '@/types';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { EmptyState } from '@/components/admin/EmptyState';
import {
  FileText,
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  Clock,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string; slug: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadBlogs();
  }, []);

  async function loadBlogs() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setBlogs(
          data.map((b) => ({
            id: b.id,
            slug: b.slug,
            title: b.title,
            coverImage: b.cover_image,
            cover_image: b.cover_image,
            excerpt: b.excerpt,
            content: b.content,
            tags: b.tags || [],
            readingTime: b.reading_time,
            reading_time: b.reading_time,
            published: b.published,
            publishedAt: b.published_at,
            published_at: b.published_at,
            created_at: b.created_at,
          }))
        );
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
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

  async function togglePublish(blog: BlogPost) {
    if (!blog.id) return;
    const nextPublished = !blog.published;
    await supabase
      .from('blogs')
      .update({
        published: nextPublished,
        published_at: nextPublished ? new Date().toISOString() : blog.publishedAt,
      })
      .eq('id', blog.id);

    await triggerRevalidate(`/blog/${blog.slug}`);
    await loadBlogs();
  }

  async function handleDeleteConfirm() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await supabase.from('blogs').delete().eq('id', deleteTarget.id);
      await triggerRevalidate('/blog');
      setDeleteTarget(null);
      await loadBlogs();
    } catch (err: any) {
      alert(`Delete error: ${err.message || String(err)}`);
    } finally {
      setDeleting(false);
    }
  }

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (filterStatus === 'published') return matchesSearch && b.published;
    if (filterStatus === 'draft') return matchesSearch && !b.published;
    return matchesSearch;
  });

  return (
    <AdminLayout onRefresh={loadBlogs} isRefreshing={loading}>
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-poppins text-xl font-bold text-foreground">Editorial Blog CMS</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Write, organize, and publish technical insights and growth marketing articles.
          </p>
        </div>
        <Link href="/admin/blog/new">
          <Button className="bg-accent text-background hover:bg-accent/90 text-xs font-semibold gap-1.5">
            <Plus className="h-4 w-4" />
            Write Article
          </Button>
        </Link>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-border/60 bg-card p-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search articles by title, tag, or slug..."
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
              All ({blogs.length})
            </button>
            <button
              onClick={() => setFilterStatus('published')}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                filterStatus === 'published'
                  ? 'bg-card text-accent font-semibold shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Published ({blogs.filter((b) => b.published).length})
            </button>
            <button
              onClick={() => setFilterStatus('draft')}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                filterStatus === 'draft'
                  ? 'bg-card text-amber-400 font-semibold shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Drafts ({blogs.filter((b) => !b.published).length})
            </button>
          </div>
        </div>
      </div>

      {/* Blog Table / List */}
      {loading ? (
        <div className="flex h-64 items-center justify-center rounded-xl border border-border/60 bg-card">
          <Loader2 className="h-6 w-6 animate-spin text-accent" />
        </div>
      ) : filteredBlogs.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No articles found"
          description={
            searchQuery || filterStatus !== 'all'
              ? 'Try adjusting your search query or status filters.'
              : 'Write your first blog post to share insights with your audience.'
          }
          actionLabel="Write Article"
          onAction={() => (window.location.href = '/admin/blog/new')}
        />
      ) : (
        <div className="rounded-xl border border-border/60 bg-card overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border/60 bg-secondary/30 text-muted-foreground font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Article</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Slug</th>
                  <th className="py-3.5 px-4 hidden sm:table-cell">Read Time</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {filteredBlogs.map((b) => (
                  <tr key={b.id || b.slug} className="hover:bg-secondary/20 transition-colors">
                    {/* Thumbnail & Title */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={b.coverImage || b.cover_image || '/tracking.webp'}
                          alt={b.title}
                          className="h-12 w-18 rounded-lg object-cover bg-secondary border border-border/50 shrink-0"
                        />
                        <div>
                          <p className="font-poppins font-bold text-foreground text-sm leading-snug">
                            {b.title}
                          </p>
                          <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                            {b.excerpt}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Slug */}
                    <td className="py-3.5 px-4 font-mono text-muted-foreground text-[11px] hidden md:table-cell">
                      /{b.slug}
                    </td>

                    {/* Reading Time */}
                    <td className="py-3.5 px-4 hidden sm:table-cell text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {b.readingTime || b.reading_time || '5 min read'}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <StatusBadge status={b.published ? 'published' : 'draft'} />
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`/blog/${b.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                          title="Preview Public Article"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>

                        <button
                          onClick={() => togglePublish(b)}
                          className="p-1.5 rounded text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
                          title={b.published ? 'Unpublish' : 'Publish'}
                        >
                          {b.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>

                        <Link
                          href={`/admin/blog/${b.id}/edit`}
                          className="p-1.5 rounded text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
                          title="Edit Article"
                        >
                          <Edit3 className="h-4 w-4" />
                        </Link>

                        <button
                          onClick={() =>
                            setDeleteTarget({
                              id: b.id!,
                              title: b.title,
                              slug: b.slug,
                            })
                          }
                          className="p-1.5 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                          title="Delete Article"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        isConfirming={deleting}
        title="Delete Article?"
        description={`Are you sure you want to delete "${deleteTarget?.title}" (/${deleteTarget?.slug})? This action cannot be undone.`}
      />
    </AdminLayout>
  );
}
