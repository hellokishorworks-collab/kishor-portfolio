'use client';

import { useState, useRef } from 'react';
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Minus,
  Image as ImageIcon,
  Eye,
  Edit2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onOpenMediaPicker?: () => void;
}

export function RichTextEditor({ value, onChange, onOpenMediaPicker }: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertFormat = (prefix: string, suffix: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const replacement = `${prefix}${selectedText || 'text'}${suffix}`;

    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 50);
  };

  const addLink = () => {
    const url = prompt('Enter URL link:');
    if (url) {
      insertFormat('[', `](${url})`);
    }
  };

  return (
    <div className="rounded-xl border border-border/60 bg-card overflow-hidden shadow-sm">
      {/* Editor Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between border-b border-border/60 bg-secondary/30 p-2.5 gap-2">
        {/* Formatting Buttons */}
        <div className="flex flex-wrap items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertFormat('**', '**')}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-secondary"
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertFormat('*', '*')}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-secondary"
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </Button>

          <div className="h-4 w-[1px] bg-border/60 mx-1" />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertFormat('\n## ')}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-secondary"
            title="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertFormat('\n### ')}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-secondary"
            title="Heading 3"
          >
            <Heading3 className="h-4 w-4" />
          </Button>

          <div className="h-4 w-[1px] bg-border/60 mx-1" />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertFormat('\n- ')}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-secondary"
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertFormat('\n1. ')}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-secondary"
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertFormat('\n> ')}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-secondary"
            title="Blockquote"
          >
            <Quote className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertFormat('`', '`')}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-secondary"
            title="Inline Code"
          >
            <Code className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={addLink}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-secondary"
            title="Insert Link"
          >
            <LinkIcon className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertFormat('\n---\n')}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-secondary"
            title="Horizontal Divider"
          >
            <Minus className="h-4 w-4" />
          </Button>

          {onOpenMediaPicker && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onOpenMediaPicker}
              className="h-8 px-2.5 text-xs gap-1.5 text-accent border-accent/30 hover:bg-accent/10"
              title="Insert Image from Media Library"
            >
              <ImageIcon className="h-3.5 w-3.5" />
              <span>Insert Image</span>
            </Button>
          )}
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center rounded-lg bg-card border border-border/60 p-0.5">
          <button
            type="button"
            onClick={() => setActiveTab('write')}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
              activeTab === 'write'
                ? 'bg-accent/15 text-accent border border-accent/30 shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Edit2 className="h-3.5 w-3.5" />
            <span>Write</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
              activeTab === 'preview'
                ? 'bg-accent/15 text-accent border border-accent/30 shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Preview</span>
          </button>
        </div>
      </div>

      {/* Editor Body / Preview Mode */}
      {activeTab === 'write' ? (
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your blog article using Markdown syntax..."
          rows={18}
          className="w-full border-none focus-visible:ring-0 bg-transparent p-4 font-mono text-xs leading-relaxed resize-y"
        />
      ) : (
        <div className="p-6 prose prose-invert max-w-none text-xs leading-relaxed min-h-[400px] bg-secondary/10 overflow-y-auto">
          {value ? (
            <div className="space-y-4 whitespace-pre-wrap font-sans">
              {value}
            </div>
          ) : (
            <p className="text-muted-foreground italic">No article content to preview.</p>
          )}
        </div>
      )}
    </div>
  );
}
