import React, { useState } from 'react';
import { generateImage } from '../../services/gemini';
import { Loader2, Sparkles, Download } from 'lucide-react';

export default function ImageGen() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const url = await generateImage(prompt);
      setImageUrl(url);
    } catch (error) {
      console.error(error);
      alert("Error generating image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">AI Image Generator</h2>
        <p className="text-muted-foreground">Describe what you want to see, and the AI will create it for you.</p>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 px-4 py-3 rounded-xl border border-black/10 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black/5"
          placeholder="A futuristic city with neon lights and flying cars..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-black/90 disabled:opacity-50 transition-all"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          Generate
        </button>
      </div>

      {loading && (
        <div className="aspect-square w-full max-w-md mx-auto rounded-2xl border border-dashed border-black/20 flex flex-col items-center justify-center gap-4 bg-black/5">
          <Loader2 className="w-8 h-8 animate-spin text-black/40" />
          <p className="text-sm text-black/40 font-medium">Creating your masterpiece...</p>
        </div>
      )}

      {imageUrl && !loading && (
        <div className="space-y-4 animate-in zoom-in-95 duration-500">
          <div className="relative group rounded-2xl overflow-hidden shadow-2xl border border-black/5">
            <img
              src={imageUrl}
              alt="Generated AI"
              className="w-full h-auto"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <a
                href={imageUrl}
                download="ai-generated-image.png"
                className="p-3 bg-white rounded-full text-black hover:scale-110 transition-transform"
              >
                <Download className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
