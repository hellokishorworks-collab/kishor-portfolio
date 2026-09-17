'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Check, Search, Image as ImageIcon, Loader2, X } from 'lucide-react';

interface MediaItem {
  name: string;
  url: string;
  created_at?: string;
}

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

export function MediaPickerModal({ isOpen, onClose, onSelect }: MediaPickerModalProps) {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchMediaFiles();
    }
  }, [isOpen]);

  async function fetchMediaFiles() {
    setLoading(true);
    try {
      const { data, error } = await supabase.storage
        .from('portfolio-media')
        .list('uploads', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });

      if (error) {
        // Try root directory fallback
        const { data: rootData } = await supabase.storage
          .from('portfolio-media')
          .list('', { limit: 100 });

        if (rootData) {
          const items = rootData.map((f) => {
            const { data: urlData } = supabase.storage
              .from('portfolio-media')
              .getPublicUrl(f.name);
            return { name: f.name, url: urlData.publicUrl, created_at: f.created_at };
          });
          setMediaList(items);
        }
      } else if (data) {
        const items = data.map((f) => {
          const { data: urlData } = supabase.storage
            .from('portfolio-media')
            .getPublicUrl(`uploads/${f.name}`);
          return { name: f.name, url: urlData.publicUrl, created_at: f.created_at };
        });
        setMediaList(items);
      }
    } catch (err) {
      console.error('Error listing media:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleFileUpload(file: File) {
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error } = await supabase.storage
        .from('portfolio-media')
        .upload(filePath, file);

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('portfolio-media')
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;
      setSelectedUrl(publicUrl);
      await fetchMediaFiles();
    } catch (err: any) {
      alert(`Upload failed: ${err.message || String(err)}`);
    } finally {
      setUploading(false);
    }
  }

  const filteredList = mediaList.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl border-border/60 bg-card p-6">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-border/50 pb-4">
          <DialogTitle className="font-poppins text-lg font-bold text-foreground flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-accent" />
            <span>Select Media from Library</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* Top Bar: Search & Upload */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search media files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs"
              />
            </div>

            <label className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-secondary border border-border/60 px-4 py-2 text-xs font-semibold text-foreground hover:border-accent/40 cursor-pointer transition-colors">
              <Upload className="h-3.5 w-3.5 text-accent" />
              <span>{uploading ? 'Uploading...' : 'Upload New File'}</span>
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

          {/* Media Grid */}
          <div className="h-80 overflow-y-auto rounded-xl border border-border/50 bg-secondary/20 p-4">
            {loading ? (
              <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                <Loader2 className="mr-2 h-5 w-5 animate-spin text-accent" /> Loading files...
              </div>
            ) : filteredList.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-xs text-muted-foreground space-y-2">
                <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
                <p>No media files found in library.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {filteredList.map((item) => {
                  const isSelected = selectedUrl === item.url;
                  return (
                    <div
                      key={item.url}
                      onClick={() => setSelectedUrl(item.url)}
                      className={`group relative aspect-video rounded-lg overflow-hidden border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-accent ring-2 ring-accent/30 shadow-lg'
                          : 'border-border/60 hover:border-accent/50'
                      }`}
                    >
                      <img
                        src={item.url}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between text-white text-[10px]">
                        <p className="truncate font-semibold">{item.name}</p>
                      </div>
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-background font-bold shadow">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="flex items-center justify-between border-t border-border/50 pt-4">
            <div className="text-xs text-muted-foreground truncate max-w-xs sm:max-w-md">
              {selectedUrl ? `Selected: ${selectedUrl}` : 'Select an image from above or upload new file'}
            </div>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="sm" onClick={onClose} className="text-xs">
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                disabled={!selectedUrl}
                onClick={() => {
                  if (selectedUrl) {
                    onSelect(selectedUrl);
                    onClose();
                  }
                }}
                className="bg-accent text-background hover:bg-accent/90 text-xs font-semibold"
              >
                Use Selected Image
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
