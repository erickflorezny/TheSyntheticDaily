import { NextResponse } from 'next/server';
import { sidebarStoriesService } from '@/lib/services/stories';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const storyId = parseInt(id, 10);
    
    if (isNaN(storyId)) {
      return NextResponse.json(
        { error: 'Invalid sidebar story ID' },
        { status: 400 }
      );
    }
    
    const sidebarStory = sidebarStoriesService.getSidebarStoryById(storyId);
    
    if (!sidebarStory) {
      return NextResponse.json(
        { error: 'Sidebar story not found' },
        { status: 404 }
      );
    }
    
    // Redirect to the new slug-based URL
    return NextResponse.redirect(
      new URL(`/sidebar/${sidebarStory.slug}`, request.url),
      301 // Permanent redirect
    );
  } catch (error) {
    console.error('Error in sidebar story redirect:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}