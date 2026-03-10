import React, { useState } from 'react';
import { generateText } from '../../services/gemini';
import { Loader2, Heart, Frown, Meh, Search } from 'lucide-react';

export default function SentimentAnalyzer() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<{ sentiment: string; score: string; explanation: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const prompt = `Analyze the sentiment of the following text. Return the result in JSON format with keys: "sentiment" (Positive, Negative, or Neutral), "score" (a percentage from 0-100), and "explanation" (a brief sentence explaining why).
      
      Text: "${text}"`;
      
      const response = await generateText(prompt, "You are a sentiment analysis expert. Always return valid JSON.");
      
      // Basic JSON extraction in case model wraps it in markdown
      const jsonMatch = response?.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        setResult(JSON.parse(jsonMatch[0]));
      }
    } catch (error) {
      console.error(error);
      alert("Error analyzing sentiment.");
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive': return <Heart className="w-8 h-8 text-emerald-500 fill-emerald-500" />;
      case 'negative': return <Frown className="w-8 h-8 text-rose-500 fill-rose-500" />;
      default: return <Meh className="w-8 h-8 text-amber-500 fill-amber-500" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">AI Sentiment Analyzer</h2>
        <p className="text-muted-foreground">Analyze the emotional tone of any text snippet.</p>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 px-4 py-3 rounded-xl border border-black/10 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black/5"
          placeholder="I absolutely love this new feature! It makes my life so much easier."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
        />
        <button
          onClick={handleAnalyze}
          disabled={loading || !text.trim()}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-black/90 disabled:opacity-50 transition-all"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          Analyze
        </button>
      </div>

      {result && (
        <div className="p-8 rounded-3xl bg-white border border-black/5 shadow-xl animate-in fade-in zoom-in-95 duration-500 text-center space-y-4">
          <div className="flex justify-center">{getIcon(result.sentiment)}</div>
          <div>
            <h3 className="text-3xl font-bold tracking-tight">{result.sentiment}</h3>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mt-1">
              Confidence: {result.score}%
            </p>
          </div>
          <p className="text-lg text-zinc-600 max-w-md mx-auto">{result.explanation}</p>
        </div>
      )}
    </div>
  );
}
