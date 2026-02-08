'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddKnowledge() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'note',
    sourceUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [aiStatus, setAiStatus] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setAiStatus('Capturing your thought...');

    try {
      // 1. Create the item
      const createResponse = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!createResponse.ok) throw new Error('Failed to create item');
      
      const item = await createResponse.json();

      // 2. Generate AI summary
      setAiStatus('Understanding the content...');
      await fetch('/api/ai/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId: item.id,
          content: formData.content,
        }),
      });

      // 3. Generate AI tags
      setAiStatus('Creating connections...');
      await fetch('/api/ai/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId: item.id,
          title: formData.title,
          content: formData.content,
        }),
      });

      setAiStatus('Complete');
      
      // Redirect to dashboard
      setTimeout(() => {
        router.push('/dashboards');  // After saving;
      }, 800);

    } catch (error) {
      console.error('Error:', error);
      setAiStatus('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F3EF]">
      {/* Header */}
      <header className="border-b border-[#E5E1D8] bg-[#FDFCFA]">
        <div className="max-w-4xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[32px] font-normal text-[#1A1A1A] tracking-tight leading-none mb-2">
                New thought
              </h1>
              <p className="text-[15px] text-[#6B6B6B] font-light">
                Capture what's on your mind
              </p>
            </div>
            <Link
              href="/dashboards"
              className="text-[15px] text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors font-normal"
            >
              Cancel
            </Link>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-4xl mx-auto px-8 py-12">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Title */}
          <div className="space-y-3">
            <label className="block text-[14px] font-normal text-[#6B6B6B] tracking-wide">
              Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="What's this about?"
              className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-[#E5E1D8] text-[32px] font-normal text-[#1A1A1A] placeholder:text-[#C4C0B7] focus:outline-none focus:border-[#1A1A1A] transition-colors"
            />
          </div>

          {/* Content */}
          <div className="space-y-3">
            <label className="block text-[14px] font-normal text-[#6B6B6B] tracking-wide">
              Content
            </label>
            <textarea
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Write or paste your thoughts here..."
              rows={16}
              className="w-full px-0 py-4 bg-transparent border-0 text-[17px] text-[#1A1A1A] placeholder:text-[#C4C0B7] focus:outline-none resize-none leading-relaxed font-light"
            />
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-6 pt-8 border-t border-[#E5E1D8]">
            {/* Type */}
            <div className="space-y-3">
              <label className="block text-[14px] font-normal text-[#6B6B6B] tracking-wide">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-5 py-3.5 bg-white border border-[#E5E1D8] rounded-xl text-[15px] text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] focus:border-transparent transition-all"
              >
                <option value="note">Note</option>
                <option value="link">Link</option>
                <option value="insight">Insight</option>
              </select>
            </div>

            {/* Source URL (Optional) */}
            <div className="space-y-3">
              <label className="block text-[14px] font-normal text-[#6B6B6B] tracking-wide">
                Source (optional)
              </label>
              <input
                type="url"
                value={formData.sourceUrl}
                onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-5 py-3.5 bg-white border border-[#E5E1D8] rounded-xl text-[15px] text-[#1A1A1A] placeholder:text-[#C4C0B7] focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* AI Status */}
          {aiStatus && (
            <div className="p-6 bg-[#FAF9F7] rounded-[20px] border border-[#E5E1D8]">
              <div className="flex items-center gap-3">
                {loading && (
                  <div className="flex gap-2">
                    <div className="w-1.5 h-1.5 bg-[#A8A8A8] rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-[#A8A8A8] rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                    <div className="w-1.5 h-1.5 bg-[#A8A8A8] rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                  </div>
                )}
                <p className="text-[15px] text-[#2D2D2D] font-light">
                  {aiStatus}
                </p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-8">
            <p className="text-[13px] text-[#A8A8A8] font-light">
              AI will summarize and organize
            </p>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 bg-[#1A1A1A] text-[#FDFCFA] text-[15px] font-normal rounded-full hover:bg-[#2D2D2D] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}