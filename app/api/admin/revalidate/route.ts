import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const path = body?.path;
    if (path) {
      revalidatePath(path);
      if (path.startsWith('/projects')) {
        revalidatePath('/projects');
        revalidatePath('/');
      }
      if (path.startsWith('/blog')) {
        revalidatePath('/blog');
        revalidatePath('/');
      }
      return NextResponse.json({ revalidated: true, now: Date.now() });
    }
    return NextResponse.json({ error: 'Path is required' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Error revalidating' }, { status: 500 });
  }
}
