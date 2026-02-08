'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DeveloperPage() {
  const [query, setQuery] = useState('recipe');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/public/brain/query?q=${encodeURIComponent(query)}&limit=5`);
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: 'Failed to fetch data' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F3EF]">
      {/* Header */}
      <header className="border-b border-[#E5E1D8] bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-8 py-6 flex justify-between items-center">
          <Link href="/" className="text-[20px] font-normal text-[#1A1A1A]">
            Second Brain
          </Link>
          <nav className="flex gap-6">
            <Link href="/" className="text-[15px] text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">
              Home
            </Link>
            <Link href="/dashboards" className="text-[15px] text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">
              Dashboard
            </Link>
            <Link href="/add" className="text-[15px] text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">
              Add Note
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-8 py-20">
        {/* Title Section */}
        <div className="mb-16">
          <div className="inline-block px-4 py-2 bg-white border border-[#E5E1D8] rounded-full text-[13px] text-[#6B6B6B] font-light mb-6">
            Developer Access
          </div>
          <h1 className="text-[56px] font-normal text-[#1A1A1A] mb-4">
            Query your knowledge<br />programmatically
          </h1>
          <p className="text-[17px] text-[#6B6B6B] font-light max-w-2xl">
            Access your Second Brain knowledge base through a simple REST API. No authentication required for public queries.
          </p>
        </div>

        {/* Interactive Testing Section */}
        <div className="bg-white border border-[#E5E1D8] rounded-[24px] p-10 mb-12">
          <h2 className="text-[24px] font-normal text-[#1A1A1A] mb-6">
            Try it now
          </h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-[14px] text-[#6B6B6B] font-light mb-2">
                Search query
              </label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try: recipe, learning, work..."
                className="w-full px-4 py-3 bg-[#F5F3EF] border border-[#E5E1D8] rounded-[16px] text-[15px] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] transition-all"
              />
            </div>

            <button
              onClick={testAPI}
              disabled={loading}
              className="px-8 py-3 bg-[#1A1A1A] text-[#FDFCFA] text-[15px] font-normal rounded-full hover:bg-[#2D2D2D] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Searching...' : 'Run Query'}
            </button>
          </div>

          {response && (
            <div className="bg-[#F5F3EF] border border-[#E5E1D8] rounded-[16px] p-6 overflow-auto">
              <div className="text-[13px] text-[#6B6B6B] font-mono">
                <pre className="whitespace-pre-wrap">
                  {JSON.stringify(response, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* API Documentation */}
        <div className="space-y-12">
          {/* Endpoint */}
          <section>
            <h2 className="text-[32px] font-normal text-[#1A1A1A] mb-6">
              Endpoint
            </h2>
            <div className="bg-white border border-[#E5E1D8] rounded-[20px] p-8">
              <code className="text-[15px] font-mono text-[#1A1A1A] bg-[#F5F3EF] px-4 py-2 rounded-[12px] block">
                GET /api/public/brain/query
              </code>
            </div>
          </section>

          {/* Parameters */}
          <section>
            <h2 className="text-[32px] font-normal text-[#1A1A1A] mb-6">
              Query parameters
            </h2>
            <div className="bg-white border border-[#E5E1D8] rounded-[20px] p-8 space-y-6">
              <div className="pb-6 border-b border-[#E5E1D8]">
                <div className="flex items-start justify-between mb-2">
                  <code className="text-[15px] font-mono text-[#1A1A1A]">q</code>
                  <span className="px-3 py-1 bg-[#F5F3EF] text-[13px] text-[#6B6B6B] rounded-full">required</span>
                </div>
                <p className="text-[15px] text-[#6B6B6B] font-light">
                  Search query string. Searches across titles, content, summaries, and tags.
                </p>
              </div>

              <div className="pb-6 border-b border-[#E5E1D8]">
                <div className="flex items-start justify-between mb-2">
                  <code className="text-[15px] font-mono text-[#1A1A1A]">limit</code>
                  <span className="px-3 py-1 bg-[#F5F3EF] text-[13px] text-[#6B6B6B] rounded-full">optional</span>
                </div>
                <p className="text-[15px] text-[#6B6B6B] font-light">
                  Maximum number of results to return (default: 10, max: 50)
                </p>
              </div>

              <div>
                <div className="flex items-start justify-between mb-2">
                  <code className="text-[15px] font-mono text-[#1A1A1A]">type</code>
                  <span className="px-3 py-1 bg-[#F5F3EF] text-[13px] text-[#6B6B6B] rounded-full">optional</span>
                </div>
                <p className="text-[15px] text-[#6B6B6B] font-light">
                  Filter by type: <code className="text-[14px] bg-[#F5F3EF] px-2 py-1 rounded">note</code>, <code className="text-[14px] bg-[#F5F3EF] px-2 py-1 rounded">link</code>, or <code className="text-[14px] bg-[#F5F3EF] px-2 py-1 rounded">insight</code>
                </p>
              </div>
            </div>
          </section>

          {/* Example Request */}
          <section>
            <h2 className="text-[32px] font-normal text-[#1A1A1A] mb-6">
              Example request
            </h2>
            <div className="bg-white border border-[#E5E1D8] rounded-[20px] p-8">
              <pre className="text-[14px] font-mono text-[#1A1A1A] overflow-x-auto">
{`GET https://your-domain.com/api/public/brain/query?q=machine+learning&limit=5&type=note`}
              </pre>
            </div>
          </section>

          {/* Example Response */}
          <section>
            <h2 className="text-[32px] font-normal text-[#1A1A1A] mb-6">
              Response format
            </h2>
            <div className="bg-white border border-[#E5E1D8] rounded-[20px] p-8">
              <pre className="text-[13px] font-mono text-[#6B6B6B] overflow-x-auto">
{`{
  "query": "machine learning",
  "answer": "Found 3 relevant items...",
  "totalResults": 3,
  "results": [
    {
      "id": "uuid",
      "title": "Introduction to ML",
      "summary": "AI summary of the content...",
      "tags": ["ai", "learning", "tech"],
      "type": "note",
      "createdAt": "2026-02-08T10:30:00.000Z",
      "relevance": 0.95
    }
  ]
}`}
              </pre>
            </div>
          </section>

          {/* Usage Notes */}
          <section>
            <h2 className="text-[32px] font-normal text-[#1A1A1A] mb-6">
              Usage notes
            </h2>
            <div className="bg-white border border-[#E5E1D8] rounded-[20px] p-8 space-y-4">
              <p className="text-[15px] text-[#6B6B6B] font-light">
                • No authentication required for public queries
              </p>
              <p className="text-[15px] text-[#6B6B6B] font-light">
                • Results are ranked by relevance score
              </p>
              <p className="text-[15px] text-[#6B6B6B] font-light">
                • Natural language answers are AI-generated
              </p>
              <p className="text-[15px] text-[#6B6B6B] font-light">
                • Responses are cached for improved performance
              </p>
            </div>
          </section>
        </div>

        {/* Footer CTA */}
        <div className="mt-20 text-center">
          <p className="text-[15px] text-[#6B6B6B] font-light mb-6">
            Ready to start using the API?
          </p>
          <Link
            href="/dashboards"
            className="inline-block px-8 py-3 bg-[#1A1A1A] text-[#FDFCFA] text-[15px] font-normal rounded-full hover:bg-[#2D2D2D] transition-all duration-300"
          >
            View your knowledge base
          </Link>
        </div>
      </div>
    </div>
  );
}