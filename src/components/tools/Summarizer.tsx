import React, { useState } from 'react';
import { generateText } from '../../services/gemini';
import { Loader2, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function Summarizer() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const result = await generateText(
        `Please summarize the following text concisely:\n\n${text}`,
        "You are a helpful assistant that specializes in summarizing long texts into concise, readable summaries."
      );
      setSummary(result || '');
    } catch (error) {
      console.error(error);
      setSummary("Error generating summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">AI Text Summarizer</h2>
        <p className="text-muted-foreground">Paste your long text below to get a concise summary.</p>
      </div>

      <div className="space-y-4">
        <textarea
          className="w-full h-48 p-4 rounded-xl border border-black/10 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black/5 resize-none"
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={handleSummarize}
          disabled={loading || !text.trim()}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-black/90 disabled:opacity-50 transition-all"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          Summarize
        </button>
      </div>

      {summary && (
        <div className="p-6 rounded-2xl bg-white border border-black/5 shadow-md animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Summary</h3>
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown>{summary}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
