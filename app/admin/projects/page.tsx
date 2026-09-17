'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Project } from '@/types';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { EmptyState } from '@/components/admin/EmptyState';
import {
  FolderKanban,
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Copy,
  ExternalLink,
  Filter,
  Loader2,
  ArrowUpDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ProjectsListPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string; slug: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (!error && data) {
        setProjects(
          data.map((p) => ({
            id: p.id,
            slug: p.slug,
            title: p.title,
            image: p.image,
            summary: p.summary,
            tags: p.tags || [],
            result: p.result,
            overview: p.overview,
            problem: p.problem,
            approach: p.approach,
            toolsUsed: p.tools_used || [],
            insight: p.insight,
            published: p.published,
            display_order: p.display_order,
            created_at: p.created_at,
          }))
        );
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
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

  async function togglePublish(project: Project) {
    if (!project.id) return;
    const nextPublished = !project.published;
    await supabase
      .from('projects')
      .update({ published: nextPublished })
      .eq('id', project.id);

    await triggerRevalidate(`/projects/${project.slug}`);
    await loadProjects();
  }

  async function duplicateProject(project: Project) {
    const newSlug = `${project.slug}-copy-${Date.now().toString().slice(-4)}`;
    const newTitle = `${project.title} (Copy)`;

    const payload = {
      slug: newSlug,
      title: newTitle,
      image: project.image,
      summary: project.summary,
      tags: project.tags,
      result: project.result,
      overview: project.overview,
      problem: project.problem,
      approach: project.approach,
      tools_used: project.toolsUsed,
      insight: project.insight,
      published: false, // create duplicates as draft
      display_order: (project.display_order || 0) + 1,
    };

    const { error } = await supabase.from('projects').insert(payload);
    if (error) {
      alert(`Duplicate failed: ${error.message}`);
    } else {
      await loadProjects();
    }
  }

  async function handleDeleteConfirm() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await supabase.from('projects').delete().eq('id', deleteTarget.id);
      await triggerRevalidate('/projects');
      setDeleteTarget(null);
      await loadProjects();
    } catch (err: any) {
      alert(`Delete error: ${err.message || String(err)}`);
    } finally {
      setDeleting(false);
    }
  }

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (filterStatus === 'published') return matchesSearch && p.published;
    if (filterStatus === 'draft') return matchesSearch && !p.published;
    return matchesSearch;
  });

  return (
    <AdminLayout onRefresh={loadProjects} isRefreshing={loading}>
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-poppins text-xl font-bold text-foreground">Projects CMS</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage portfolio project case studies, metadata, tools, and publication status.
          </p>
        </div>
        <Link href="/admin/projects/new">
          <Button className="bg-accent text-background hover:bg-accent/90 text-xs font-semibold gap-1.5">
            <Plus className="h-4 w-4" />
            Create Project
          </Button>
        </Link>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-border/60 bg-card p-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects by title, tag, or slug..."
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
              All ({projects.length})
            </button>
            <button
              onClick={() => setFilterStatus('published')}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                filterStatus === 'published'
                  ? 'bg-card text-accent font-semibold shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Published ({projects.filter((p) => p.published).length})
            </button>
            <button
              onClick={() => setFilterStatus('draft')}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                filterStatus === 'draft'
                  ? 'bg-card text-amber-400 font-semibold shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Drafts ({projects.filter((p) => !p.published).length})
            </button>
          </div>
        </div>
      </div>

      {/* Project Table / List */}
      {loading ? (
        <div className="flex h-64 items-center justify-center rounded-xl border border-border/60 bg-card">
          <Loader2 className="h-6 w-6 animate-spin text-accent" />
        </div>
      ) : filteredProjects.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="No projects found"
          description={
            searchQuery || filterStatus !== 'all'
              ? 'Try adjusting your search query or status filters.'
              : 'Create your first project case study to showcase on your website.'
          }
          actionLabel="Create Project"
          onAction={() => (window.location.href = '/admin/projects/new')}
        />
      ) : (
        <div className="rounded-xl border border-border/60 bg-card overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border/60 bg-secondary/30 text-muted-foreground font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Project</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Slug</th>
                  <th className="py-3.5 px-4 hidden sm:table-cell">Tags</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {filteredProjects.map((project) => (
                  <tr key={project.id || project.slug} className="hover:bg-secondary/20 transition-colors">
                    {/* Thumbnail & Title */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={project.image || '/paid-media.webp'}
                          alt={project.title}
                          className="h-12 w-18 rounded-lg object-cover bg-secondary border border-border/50 shrink-0"
                        />
                        <div>
                          <p className="font-poppins font-bold text-foreground text-sm leading-snug">
                            {project.title}
                          </p>
                          <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                            {project.summary}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Slug */}
                    <td className="py-3.5 px-4 font-mono text-muted-foreground text-[11px] hidden md:table-cell">
                      /{project.slug}
                    </td>

                    {/* Tags */}
                    <td className="py-3.5 px-4 hidden sm:table-cell">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground border border-border/40 font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="text-[10px] text-muted-foreground/70">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <StatusBadge status={project.published ? 'published' : 'draft'} />
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`/projects/${project.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                          title="Preview Public Page"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>

                        <button
                          onClick={() => togglePublish(project)}
                          className="p-1.5 rounded text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
                          title={project.published ? 'Unpublish' : 'Publish'}
                        >
                          {project.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>

                        <button
                          onClick={() => duplicateProject(project)}
                          className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                          title="Duplicate Project"
                        >
                          <Copy className="h-4 w-4" />
                        </button>

                        <Link
                          href={`/admin/projects/${project.id}/edit`}
                          className="p-1.5 rounded text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
                          title="Edit Project"
                        >
                          <Edit3 className="h-4 w-4" />
                        </Link>

                        <button
                          onClick={() =>
                            setDeleteTarget({
                              id: project.id!,
                              title: project.title,
                              slug: project.slug,
                            })
                          }
                          className="p-1.5 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                          title="Delete Project"
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
        title="Delete Project?"
        description={`Are you sure you want to delete "${deleteTarget?.title}" (/${deleteTarget?.slug})? This action cannot be undone.`}
      />
    </AdminLayout>
  );
}
