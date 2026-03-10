import React, { useState, useMemo } from 'react';
import { 
  Search, 
  LayoutGrid, 
  Menu, 
  X,
  ChevronRight,
  Sparkles,
  GraduationCap,
  FileText,
  BookOpen
} from 'lucide-react';
import { cn } from './lib/utils';
import { AITool, ToolCategory } from './types';

const TOOLS: AITool[] = [
  {
    id: 'generowanie-szkolen',
    name: 'Generowanie Szkoleń',
    description: 'Zaawansowane narzędzie do automatycznego generowania programów i materiałów szkoleniowych.',
    icon: 'GraduationCap',
    category: 'Project',
    type: 'iframe',
    url: 'https://generowanieszkolen.vercel.app/'
  },
  {
    id: 'article-generator',
    name: 'Article Generator',
    description: 'Narzędzie do automatycznego generowania artykułów i treści marketingowych.',
    icon: 'FileText',
    category: 'Project',
    type: 'iframe',
    url: 'https://article-generator-bw0ut9i23-enkidu-pngs-projects.vercel.app/'
  },
  {
    id: 'learn-assecods',
    name: 'Learn Assecods',
    description: 'Platforma edukacyjna do nauki programowania i technologii AI.',
    icon: 'BookOpen',
    category: 'Project',
    type: 'iframe',
    url: 'https://learn.assecods.pl'
  }
];

const CATEGORIES: ToolCategory[] = ['All', 'Project'];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('All');
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const activeTool = TOOLS.find(t => t.id === activeToolId);

  const handleToolClick = (tool: AITool) => {
    if (tool.type === 'external' && tool.url) {
      window.open(tool.url, '_blank');
    } else {
      setActiveToolId(tool.id);
    }
  };

  const getIcon = (iconName: string, className?: string) => {
    switch (iconName) {
      case 'GraduationCap': return <GraduationCap className={className} />;
      case 'FileText': return <FileText className={className} />;
      case 'BookOpen': return <BookOpen className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8F9FA] text-zinc-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-white border-r border-zinc-200 transition-all duration-300 flex flex-col",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="p-6 flex items-center gap-3 border-b border-zinc-100">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          {isSidebarOpen && <span className="font-bold tracking-tight text-xl">AI Hub</span>}
        </div>

        <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
          {/* Kategorie Section */}
          <div>
            {isSidebarOpen && (
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-2 mb-4">
                Przegląd
              </p>
            )}
            <button
              onClick={() => {
                setSelectedCategory('All');
                setActiveToolId(null);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all group",
                selectedCategory === 'All' && !activeToolId
                  ? "bg-zinc-100 text-black font-medium" 
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
              )}
            >
              <LayoutGrid className="w-5 h-5" />
              {isSidebarOpen && <span>Wszystkie</span>}
            </button>
          </div>

          {/* Aplikacje Section */}
          <div className="space-y-1">
            {isSidebarOpen && (
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-2 mb-4">
                Twoje Aplikacje
              </p>
            )}
            {TOOLS.map((tool) => (
              <button
                key={tool.id}
                onClick={() => handleToolClick(tool)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all group",
                  activeToolId === tool.id
                    ? "bg-zinc-100 text-black font-medium" 
                    : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                )}
              >
                {getIcon(tool.icon, "w-5 h-5")}
                {isSidebarOpen && <span className="truncate">{tool.name}</span>}
              </button>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-zinc-100">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-zinc-100 text-zinc-400 transition-colors"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-zinc-200 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4 flex-1 max-w-2xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Szukaj narzędzi AI..."
                className="w-full pl-10 pr-4 py-2 bg-zinc-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-black/5 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-zinc-200 flex items-center justify-center overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {activeToolId && activeTool ? (
            <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="p-8 pb-0">
                <button 
                  onClick={() => setActiveToolId(null)}
                  className="mb-6 flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-black transition-colors"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Powrót do narzędzi
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {activeTool.type === 'component' && activeTool.component ? (
                  <activeTool.component />
                ) : activeTool.type === 'iframe' && activeTool.url ? (
                  <div className="w-full h-full px-8 pb-8">
                    <iframe 
                      src={activeTool.url} 
                      className="w-full h-full rounded-2xl border border-zinc-200 shadow-sm bg-white"
                      title={activeTool.name}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-8">
              <div className="space-y-8">
                <div className="space-y-1">
                  <h1 className="text-3xl font-bold tracking-tight">
                    {selectedCategory === 'All' ? 'Wszystkie Narzędzia AI' : 'Twoje Projekty'}
                  </h1>
                  <p className="text-zinc-500">Odkrywaj i korzystaj z zaawansowanych narzędzi AI.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredTools.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => handleToolClick(tool)}
                      className="group flex flex-col text-left bg-white p-6 rounded-2xl border border-zinc-200 hover:border-black hover:shadow-xl transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-xl bg-zinc-50 flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                        {getIcon(tool.icon, "w-6 h-6")}
                      </div>
                      <h3 className="font-bold text-lg mb-2">{tool.name}</h3>
                      <p className="text-sm text-zinc-500 line-clamp-2 mb-4 flex-1">
                        {tool.description}
                      </p>
                      <div className="flex items-center text-sm font-semibold text-black opacity-0 group-hover:opacity-100 transition-opacity">
                        {tool.type === 'external' ? 'Otwórz link' : 'Otwórz narzędzie'}
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </button>
                  ))}
                  {filteredTools.length === 0 && (
                    <div className="col-span-full py-20 text-center">
                      <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-zinc-300" />
                      </div>
                      <h3 className="text-lg font-medium text-zinc-900">Nie znaleziono narzędzi</h3>
                      <p className="text-zinc-500">Spróbuj zmienić zapytanie lub filtr kategorii.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
