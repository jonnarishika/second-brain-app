'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function APIPage() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function testAPI() {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/public/brain/query?q=${encodeURIComponent(query)}&limit=5`);
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('API test error:', error);
      setResponse({ error: 'Failed to fetch' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F3EF]">
      {/* Header */}
      <header className="border-b border-[#E5E1D8] bg-[#FDFCFA]">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[32px] font-normal text-[#1A1A1A] tracking-tight leading-none mb-2">
                Public API
              </h1>
              <p className="text-[15px] text-[#6B6B6B] font-light">
                Query the knowledge base programmatically
              </p>
            </div>
            <Link
              href="/"
              className="text-[15px] text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
            >
              ← Back
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-12">
        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-[24px] font-normal text-[#1A1A1A] mb-4">Overview</h2>
          <p className="text-[15px] text-[#2D2D2D] leading-relaxed font-light mb-6">
            The Public Brain API allows external applications to query the knowledge base and retrieve relevant information. 
            All responses include natural language answers along with structured data.
          </p>
          
          <div className="bg-white border border-[#E5E1D8] rounded-[20px] p-6">
            <div className="font-mono text-[13px] text-[#1A1A1A]">
              <div className="text-[#6B6B6B] mb-2">Base URL</div>
              <div className="bg-[#F5F3EF] p-3 rounded-lg">
                {typeof window !== 'undefined' && window.location.origin}/api/public/brain/query
              </div>
            </div>
          </div>
        </section>

        {/* Endpoint */}
        <section className="mb-12">
          <h2 className="text-[24px] font-normal text-[#1A1A1A] mb-6">Endpoint</h2>
          
          <div className="bg-white border border-[#E5E1D8] rounded-[20px] p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1.5 bg-green-50 text-green-700 text-[12px] font-medium rounded-lg">
                GET
              </span>
              <code className="font-mono text-[14px] text-[#1A1A1A]">
                /api/public/brain/query
              </code>
            </div>

            <h3 className="text-[16px] font-medium text-[#1A1A1A] mb-4">Query Parameters</h3>
            <div className="space-y-4">
              <div className="border-l-2 border-[#E5E1D8] pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <code className="font-mono text-[13px] text-[#1A1A1A]">q</code>
                  <span className="text-[11px] text-red-600 font-medium">REQUIRED</span>
                </div>
                <p className="text-[14px] text-[#6B6B6B] font-light">
                  Search query string (e.g., "machine learning", "recipe")
                </p>
              </div>

              <div className="border-l-2 border-[#E5E1D8] pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <code className="font-mono text-[13px] text-[#1A1A1A]">limit</code>
                  <span className="text-[11px] text-[#6B6B6B] font-medium">OPTIONAL</span>
                </div>
                <p className="text-[14px] text-[#6B6B6B] font-light">
                  Maximum number of results (default: 10, max: 50)
                </p>
              </div>

              <div className="border-l-2 border-[#E5E1D8] pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <code className="font-mono text-[13px] text-[#1A1A1A]">type</code>
                  <span className="text-[11px] text-[#6B6B6B] font-medium">OPTIONAL</span>
                </div>
                <p className="text-[14px] text-[#6B6B6B] font-light">
                  Filter by type: "note", "link", or "insight"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Example Response */}
        <section className="mb-12">
          <h2 className="text-[24px] font-normal text-[#1A1A1A] mb-6">Example Response</h2>
          
          <div className="bg-[#1A1A1A] rounded-[20px] p-6 overflow-x-auto">
            <pre className="font-mono text-[13px] text-[#F5F3EF] leading-relaxed">
{`{
  "query": "machine learning",
  "answer": "Found 2 relevant items about 'machine learning'...",
  "totalResults": 2,
  "results": [
    {
      "id": "abc123",
      "title": "Introduction to ML",
      "summary": "Machine learning basics...",
      "tags": ["ai", "learning", "algorithms"],
      "type": "note",
      "createdAt": "2026-02-08T10:30:00Z"
    }
  ],
  "metadata": {
    "searchTerms": ["machine", "learning"],
    "limit": 10,
    "type": "all"
  }
}`}
            </pre>
          </div>
        </section>

        {/* Live Testing */}
        <section className="mb-12">
          <h2 className="text-[24px] font-normal text-[#1A1A1A] mb-6">Try It Out</h2>
          
          <div className="bg-white border border-[#E5E1D8] rounded-[20px] p-8">
            <div className="flex gap-3 mb-6">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && testAPI()}
                placeholder="Enter search query..."
                className="flex-1 px-5 py-3.5 bg-[#F5F3EF] border border-[#E5E1D8] rounded-xl text-[15px] text-[#1A1A1A] placeholder:text-[#A8A8A8] focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]"
              />
              <button
                onClick={testAPI}
                disabled={loading || !query.trim()}
                className="px-6 py-3.5 bg-[#1A1A1A] text-[#FDFCFA] text-[15px] rounded-xl hover:bg-[#2D2D2D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Searching...' : 'Test API'}
              </button>
            </div>

            {response && (
              <div className="bg-[#FAF9F7] rounded-[16px] p-6 border border-[#E5E1D8]">
                <h3 className="text-[14px] font-medium text-[#6B6B6B] uppercase tracking-wide mb-3">
                  Response
                </h3>
                <pre className="font-mono text-[12px] text-[#2D2D2D] overflow-x-auto leading-relaxed">
                  {JSON.stringify(response, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </section>

        {/* Usage Examples */}
        <section>
          <h2 className="text-[24px] font-normal text-[#1A1A1A] mb-6">Usage Examples</h2>
          
          <div className="space-y-4">
            <div className="bg-white border border-[#E5E1D8] rounded-[20px] p-6">
              <h3 className="text-[14px] font-medium text-[#1A1A1A] mb-3">JavaScript / Fetch</h3>
              <pre className="font-mono text-[12px] text-[#2D2D2D] bg-[#F5F3EF] p-4 rounded-lg overflow-x-auto">
{`const query = "artificial intelligence";
const response = await fetch(
  \`/api/public/brain/query?q=\${encodeURIComponent(query)}&limit=5\`
);
const data = await response.json();
console.log(data.answer);`}
              </pre>
            </div>

            <div className="bg-white border border-[#E5E1D8] rounded-[20px] p-6">
              <h3 className="text-[14px] font-medium text-[#1A1A1A] mb-3">Python / Requests</h3>
              <pre className="font-mono text-[12px] text-[#2D2D2D] bg-[#F5F3EF] p-4 rounded-lg overflow-x-auto">
{`import requests

query = "machine learning"
response = requests.get(
    f"/api/public/brain/query",
    params={"q": query, "limit": 5}
)
data = response.json()
print(data["answer"])`}
              </pre>
            </div>

            <div className="bg-white border border-[#E5E1D8] rounded-[20px] p-6">
              <h3 className="text-[14px] font-medium text-[#1A1A1A] mb-3">cURL</h3>
              <pre className="font-mono text-[12px] text-[#2D2D2D] bg-[#F5F3EF] p-4 rounded-lg overflow-x-auto">
{`curl "https://your-domain.com/api/public/brain/query?q=AI&limit=3"`}
              </pre>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}