import { NextResponse } from 'next/server';
import { storiesService } from '@/lib/services/stories';

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
        { error: 'Invalid story ID' },
        { status: 400 }
      );
    }
    
    const story = storiesService.getStoryById(storyId);
    
    if (!story) {
      return NextResponse.json(
        { error: 'Story not found' },
        { status: 404 }
      );
    }
    
    // Redirect to the new slug-based URL
    return NextResponse.redirect(
      new URL(`/stories/${story.slug}`, request.url),
      301 // Permanent redirect
    );
  } catch (error) {
    console.error('Error in story redirect:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}