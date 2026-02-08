import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || searchParams.get('query');
    const limit = parseInt(searchParams.get('limit') || '10');
    const type = searchParams.get('type');

    if (!query) {
      return NextResponse.json(
        { 
          error: 'Query parameter required',
          usage: 'GET /api/public/brain/query?q=your+search+term&limit=10&type=note'
        },
        { status: 400 }
      );
    }

    // Search across title, content, summary, and tags
    const searchTerms = query.toLowerCase().split(' ');
    
    const items = await prisma.knowledgeItem.findMany({
      where: {
        AND: [
          type ? { type } : {},
          {
            OR: searchTerms.flatMap(term => [
              { title: { contains: term, mode: 'insensitive' } },
              { content: { contains: term, mode: 'insensitive' } },
              { summary: { contains: term, mode: 'insensitive' } },
              { tags: { has: term } },
            ]),
          },
        ],
      },
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        summary: true,
        tags: true,
        type: true,
        sourceUrl: true,
        createdAt: true,
      },
    });

    // Calculate relevance scores
    const scoredItems = items.map(item => {
      let score = 0;
      const searchLower = query.toLowerCase();
      
      // Title match (highest weight)
      if (item.title.toLowerCase().includes(searchLower)) score += 10;
      
      // Summary match
      if (item.summary?.toLowerCase().includes(searchLower)) score += 5;
      
      // Tag match
      const matchingTags = item.tags.filter(tag => 
        searchLower.includes(tag.toLowerCase()) || tag.toLowerCase().includes(searchLower)
      );
      score += matchingTags.length * 3;

      return {
        ...item,
        relevanceScore: score,
      };
    });

    // Sort by relevance
    const sortedItems = scoredItems.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Generate answer summary
    const answer = generateAnswer(query, sortedItems.slice(0, 3));

    return NextResponse.json({
      query,
      answer,
      totalResults: items.length,
      results: sortedItems.map(({ relevanceScore, ...item }) => item),
      metadata: {
        searchTerms,
        limit,
        type: type || 'all',
      },
    });

  } catch (error) {
    console.error('Public API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Generate a natural language answer based on top results
function generateAnswer(query: string, topResults: any[]): string {
  if (topResults.length === 0) {
    return `No knowledge found related to "${query}".`;
  }

  if (topResults.length === 1) {
    const item = topResults[0];
    return item.summary || `Found: "${item.title}" - ${item.type}`;
  }

  const titles = topResults.map(r => `"${r.title}"`).join(', ');
  return `Found ${topResults.length} relevant items about "${query}": ${titles}. ${topResults[0].summary || ''}`;
}