import { NextRequest, NextResponse } from 'next/server';
import { generateSummary } from '@/lib/ai';
import prisma from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { itemId, content } = await request.json();

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    const summary = await generateSummary(content);

    // Update item if itemId provided
    if (itemId) {
      await prisma.knowledgeItem.update({
        where: { id: itemId },
        data: { summary },
      });
    }

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Error in summarize:', error);
    return NextResponse.json(
      { error: 'Failed to generate summary' },
      { status: 500 }
    );
  }
}