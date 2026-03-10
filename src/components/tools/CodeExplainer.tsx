import React, { useState } from 'react';
import { generateText } from '../../services/gemini';
import { Loader2, Code2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function CodeExplainer() {
  const [code, setCode] = useState('');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleExplain = async () => {
    if (!code.trim()) return;
    setLoading(true);
    try {
      const result = await generateText(
        `Please explain the following code snippet in detail:\n\n\`\`\`\n${code}\n\`\`\``,
        "You are an expert software engineer who explains complex code in simple terms. Use markdown for your response."
      );
      setExplanation(result || '');
    } catch (error) {
      console.error(error);
      setExplanation("Error explaining code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">AI Code Explainer</h2>
        <p className="text-muted-foreground">Paste a code snippet and get a detailed explanation of how it works.</p>
      </div>

      <div className="space-y-4">
        <textarea
          className="w-full h-64 p-4 rounded-xl border border-black/10 bg-zinc-950 text-zinc-100 font-mono text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-white/10 resize-none"
          placeholder="// Paste your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          onClick={handleExplain}
          disabled={loading || !code.trim()}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-black/90 disabled:opacity-50 transition-all"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Code2 className="w-4 h-4" />}
          Explain Code
        </button>
      </div>

      {explanation && (
        <div className="p-6 rounded-2xl bg-white border border-black/5 shadow-md animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Explanation</h3>
          <div className="prose prose-sm max-w-none prose-zinc">
            <ReactMarkdown>{explanation}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
