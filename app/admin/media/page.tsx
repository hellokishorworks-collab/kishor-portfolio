'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { EmptyState } from '@/components/admin/EmptyState';
import {
  Image as ImageIcon,
  Upload,
  Search,
  Copy,
  Trash2,
  Check,
  ExternalLink,
  Loader2,
  Grid,
  List,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type MediaFile = {
  name: string;
  path: string;
  url: string;
  created_at?: string;
  size?: number;
};

export default function MediaLibraryPage() {
  const [mediaList, setMediaList] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Selected detail / preview modal state
  const [activeMedia, setActiveMedia] = useState<MediaFile | null>(null);

  // Delete modal target
  const [deleteTarget, setDeleteTarget] = useState<MediaFile | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchMediaFiles();
  }, []);

  async function fetchMediaFiles() {
    setLoading(true);
    try {
      // List files inside uploads/ folder
      const { data: uploadsData, error: errUploads } = await supabase.storage
        .from('portfolio-media')
        .list('uploads', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });

      let items: MediaFile[] = [];

      if (!errUploads && uploadsData) {
        items = uploadsData
          .filter((f) => f.name !== '.emptyFolderPlaceholder')
          .map((f) => {
            const path = `uploads/${f.name}`;
            const { data: urlData } = supabase.storage
              .from('portfolio-media')
              .getPublicUrl(path);

            return {
              name: f.name,
              path,
              url: urlData.publicUrl,
              created_at: f.created_at,
              size: f.metadata?.size,
            };
          });
      }

      // Also list root files if any
      const { data: rootData } = await supabase.storage
        .from('portfolio-media')
        .list('', { limit: 100 });

      if (rootData) {
        rootData
          .filter((f) => !f.id && f.name !== 'uploads' && f.name !== '.emptyFolderPlaceholder')
          .forEach((f) => {
            const { data: urlData } = supabase.storage
              .from('portfolio-media')
              .getPublicUrl(f.name);

            items.push({
              name: f.name,
              path: f.name,
              url: urlData.publicUrl,
              created_at: f.created_at,
              size: f.metadata?.size,
            });
          });
      }

      setMediaList(items);
    } catch (err) {
      console.error('Error fetching media:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleFileUpload(file: File) {
    if (!file) return;
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error } = await supabase.storage
        .from('portfolio-media')
        .upload(filePath, file);

      if (error) throw error;

      await fetchMediaFiles();
    } catch (err: any) {
      alert(`Upload failed: ${err.message || String(err)}`);
    } finally {
      setUploading(false);
    }
  }

  function handleCopyUrl(url: string) {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  }

  async function handleDeleteConfirm() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const { error } = await supabase.storage
        .from('portfolio-media')
        .remove([deleteTarget.path]);

      if (error) throw error;

      setDeleteTarget(null);
      if (activeMedia?.path === deleteTarget.path) setActiveMedia(null);
      await fetchMediaFiles();
    } catch (err: any) {
      alert(`Delete failed: ${err.message || String(err)}`);
    } finally {
      setDeleting(false);
    }
  }

  const filteredMedia = mediaList.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout onRefresh={fetchMediaFiles} isRefreshing={loading}>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-poppins text-xl font-bold text-foreground">Media Library</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Upload and manage assets stored in Supabase Storage (`portfolio-media`).
          </p>
        </div>

        <label className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent text-background px-4 py-2 text-xs font-semibold hover:bg-accent/90 cursor-pointer transition-colors shrink-0">
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          <span>{uploading ? 'Uploading Asset...' : 'Upload Media Asset'}</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
            }}
          />
        </label>
      </div>

      {/* Filter and View Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-border/60 bg-card p-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search media by filename..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <div className="flex rounded-lg border border-border/60 bg-secondary/40 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md text-xs transition-colors ${
                viewMode === 'grid'
                  ? 'bg-card text-accent font-semibold shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              title="Grid View"
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md text-xs transition-colors ${
                viewMode === 'list'
                  ? 'bg-card text-accent font-semibold shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              title="List View"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files?.[0]) handleFileUpload(e.dataTransfer.files[0]);
        }}
        className="rounded-xl border border-dashed border-border/70 bg-card/40 p-6 text-center hover:border-accent/40 transition-colors"
      >
        <p className="text-xs text-muted-foreground">
          Drag and drop images here to upload directly into the <span className="text-accent font-mono">portfolio-media</span> bucket.
        </p>
      </div>

      {/* Media Grid or List Display */}
      {loading ? (
        <div className="flex h-64 items-center justify-center rounded-xl border border-border/60 bg-card">
          <Loader2 className="h-6 w-6 animate-spin text-accent" />
        </div>
      ) : filteredMedia.length === 0 ? (
        <EmptyState
          icon={ImageIcon}
          title="No media assets found"
          description="Upload project images, blog covers, or bio photos to store them in Supabase."
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMedia.map((media) => (
            <div
              key={media.path}
              className="group relative rounded-xl border border-border/60 bg-card overflow-hidden shadow-sm transition-all hover:border-accent/50"
            >
              <div className="aspect-video relative overflow-hidden bg-secondary/30">
                <img
                  src={media.url}
                  alt={media.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-3 space-y-2">
                <p className="text-xs font-bold text-foreground truncate">{media.name}</p>

                <div className="flex items-center justify-between gap-1 pt-1 border-t border-border/40 text-[11px]">
                  <button
                    onClick={() => handleCopyUrl(media.url)}
                    className="flex items-center gap-1 text-muted-foreground hover:text-accent font-medium transition-colors"
                  >
                    {copiedUrl === media.url ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setDeleteTarget(media)}
                    className="text-muted-foreground hover:text-destructive p-1 rounded transition-colors"
                    title="Delete File"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-border/60 bg-card overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/60 bg-secondary/30 text-muted-foreground font-semibold">
              <tr>
                <th className="py-3 px-4">Asset</th>
                <th className="py-3 px-4">Path</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filteredMedia.map((media) => (
                <tr key={media.path} className="hover:bg-secondary/20 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={media.url}
                        alt={media.name}
                        className="h-10 w-14 rounded-md object-cover bg-secondary border border-border/40"
                      />
                      <span className="font-semibold text-foreground">{media.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-muted-foreground text-[11px]">
                    {media.path}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleCopyUrl(media.url)}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-accent font-medium px-2 py-1 rounded bg-secondary/50"
                      >
                        {copiedUrl === media.url ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                        <span>{copiedUrl === media.url ? 'Copied' : 'URL'}</span>
                      </button>
                      <button
                        onClick={() => setDeleteTarget(media)}
                        className="p-1.5 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10"
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
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        isConfirming={deleting}
        title="Delete Media File?"
        description={`Are you sure you want to delete "${deleteTarget?.name}" from Supabase storage? This action cannot be undone.`}
      />
    </AdminLayout>
  );
}
