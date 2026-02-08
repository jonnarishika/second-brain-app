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
    setAiStatus('Creating knowledge item...');

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
      setAiStatus('Generating AI summary...');
      const summaryResponse = await fetch('/api/ai/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId: item.id,
          content: formData.content,
        }),
      });

      // 3. Generate AI tags
      setAiStatus('Generating AI tags...');
      const tagsResponse = await fetch('/api/ai/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId: item.id,
          title: formData.title,
          content: formData.content,
        }),
      });

      setAiStatus('Success! Redirecting...');
      
      // Redirect to dashboard
      setTimeout(() => {
        router.push('/');
      }, 1000);

    } catch (error) {
      console.error('Error:', error);
      setAiStatus('Error creating item. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                ✨ Add Knowledge
              </h1>
              <p className="text-slate-600 mt-1">
                Capture your ideas — AI will enhance them
              </p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 text-slate-700 hover:text-slate-900 transition-colors"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          {/* Title */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Understanding React Hooks"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Content */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Content *
            </label>
            <textarea
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Paste your notes, article, or insights here..."
              rows={12}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
            <p className="text-xs text-slate-500 mt-2">
              💡 AI will automatically summarize and tag this content
            </p>
          </div>

          {/* Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Type *
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="note">📝 Note</option>
              <option value="link">🔗 Link</option>
              <option value="insight">💡 Insight</option>
            </select>
          </div>

          {/* Source URL (Optional) */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Source URL (optional)
            </label>
            <input
              type="url"
              value={formData.sourceUrl}
              onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })}
              placeholder="https://example.com/article"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* AI Status */}
          {aiStatus && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <p className="text-sm text-emerald-800 flex items-center gap-2">
                {loading && (
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-emerald-600 border-r-transparent"></span>
                )}
                {aiStatus}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing with AI...' : '✨ Save & Enhance with AI'}
          </button>
        </form>

        {/* Info Box */}
        <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">🤖 How AI Helps:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Generates concise 2-3 sentence summary</li>
            <li>• Auto-suggests relevant tags for organization</li>
            <li>• Makes your knowledge easily searchable</li>
          </ul>
        </div>
      </main>
    </div>
  );
}