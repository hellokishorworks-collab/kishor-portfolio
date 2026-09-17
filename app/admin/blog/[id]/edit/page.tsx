'use client';

import { useParams } from 'next/navigation';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { BlogForm } from '@/components/admin/BlogForm';

export default function EditBlogPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  return (
    <AdminLayout>
      <BlogForm blogId={id} />
    </AdminLayout>
  );
}
