import { NextRequest, NextResponse } from 'next/server';
import { generateTags } from '@/lib/ai';
import prisma from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { itemId, title, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const tags = await generateTags(title, content);

    // Update item if itemId provided
    if (itemId) {
      await prisma.knowledgeItem.update({
        where: { id: itemId },
        data: { tags },
      });
    }

    return NextResponse.json({ tags });
  } catch (error) {
    console.error('Error generating tags:', error);
    return NextResponse.json(
      { error: 'Failed to generate tags' },
      { status: 500 }
    );
  }
}