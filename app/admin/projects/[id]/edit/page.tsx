'use client';

import { useParams } from 'next/navigation';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ProjectForm } from '@/components/admin/ProjectForm';

export default function EditProjectPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  return (
    <AdminLayout>
      <ProjectForm projectId={id} />
    </AdminLayout>
  );
}
