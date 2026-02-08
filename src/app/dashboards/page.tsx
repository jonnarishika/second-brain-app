'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  type: string;
  tags: string[];
  summary: string | null;
  sourceUrl: string | null;
  createdAt: string;
}

export default function Dashboard() {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    fetchItems();
  }, [search, typeFilter]);

  async function fetchItems() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (typeFilter) params.append('type', typeFilter);

      const response = await fetch(`/api/items?${params}`);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F3EF]">
      {/* Header */}
      <header className="border-b border-[#E5E1D8] bg-[#FDFCFA] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[32px] font-normal text-[#1A1A1A] tracking-tight leading-none mb-2">
                Second Brain
              </h1>
              <p className="text-[15px] text-[#6B6B6B] font-light">
                A space for your thoughts
              </p>
            </div>
            <Link
              href="/add"
              className="px-6 py-3 bg-[#1A1A1A] text-[#FDFCFA] text-[15px] font-normal rounded-full hover:bg-[#2D2D2D] transition-all duration-200"
            >
              New thought
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-8 py-12">
        {/* Search & Filters */}
        <div className="mb-12 flex gap-4">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-5 py-3.5 bg-white border border-[#E5E1D8] rounded-xl text-[15px] text-[#1A1A1A] placeholder:text-[#A8A8A8] focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] focus:border-transparent transition-all"
          />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-5 py-3.5 bg-white border border-[#E5E1D8] rounded-xl text-[15px] text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] focus:border-transparent transition-all"
          >
            <option value="">All</option>
            <option value="note">Notes</option>
            <option value="link">Links</option>
            <option value="insight">Insights</option>
          </select>
        </div>

        {/* Items Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="flex gap-2.5 mb-5">
              <div className="w-2 h-2 bg-[#A8A8A8] rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-[#A8A8A8] rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
              <div className="w-2 h-2 bg-[#A8A8A8] rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
            </div>
            <p className="text-[15px] text-[#6B6B6B]">Loading...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 animate-fadeIn">
            <div className="w-20 h-20 mb-6 rounded-full bg-[#E8E4DB] flex items-center justify-center">
              <svg className="w-10 h-10 text-[#A8A8A8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-[17px] text-[#1A1A1A] mb-2 font-normal">Nothing here yet</p>
            <p className="text-[15px] text-[#6B6B6B] font-light">Start capturing your knowledge</p>
          </div>
        ) : (
          <div className="space-y-6 animate-fadeIn">
            {items.map((item) => (
              <article
                key={item.id}
                className="group bg-white rounded-[24px] p-10 border border-[#E5E1D8] hover:border-[#D4CFC4] hover:shadow-sm transition-all duration-200"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3.5 py-1.5 rounded-full text-[13px] font-normal bg-[#F5F3EF] text-[#6B6B6B] tracking-wide">
                        {item.type}
                      </span>
                      <span className="text-[13px] text-[#A8A8A8] font-light">
                        {new Date(item.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <h2 className="text-[28px] font-normal text-[#1A1A1A] tracking-tight leading-snug">
                      {item.title}
                    </h2>
                  </div>
                </div>

                {/* AI Summary */}
                {item.summary && (
                  <div className="mb-6 p-6 bg-[#FAF9F7] rounded-[20px] border border-[#EBE8E0]">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#A8A8A8]"></div>
                      <span className="text-[12px] font-medium text-[#6B6B6B] uppercase tracking-wider">
                        Summary
                      </span>
                    </div>
                    <p className="text-[15px] text-[#2D2D2D] leading-relaxed font-light">
                      {item.summary}
                    </p>
                  </div>
                )}

                {/* Original Content */}
                <details className="mb-6 group/details">
                  <summary className="cursor-pointer text-[14px] text-[#6B6B6B] hover:text-[#1A1A1A] font-normal flex items-center gap-2 transition-colors">
                    <svg className="w-4 h-4 transition-transform group-open/details:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    View original
                  </summary>
                  <div className="mt-4 pl-6">
                    <p className="text-[14px] text-[#4A4A4A] leading-relaxed bg-[#FAF9F7] p-5 rounded-[16px] max-h-64 overflow-y-auto font-light">
                      {item.content}
                    </p>
                  </div>
                </details>

                {/* Tags */}
                {item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2.5 pt-6 border-t border-[#EBE8E0]">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3.5 py-2 text-[13px] bg-[#F5F3EF] text-[#6B6B6B] rounded-full hover:bg-[#EBE8E0] transition-colors font-normal"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}