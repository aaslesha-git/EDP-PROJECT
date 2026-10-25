import React from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenOptimizer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenOptimizer }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#0b0f17]/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => setActiveTab('overview')}
          className="text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 text-left"
        >
          Q-GEN 5.0
        </button>

        {/* Zone 2: 4-5 single-line clean text links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('digital-twin')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white ${
              activeTab === 'digital-twin' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Digital Twin
          </button>
          <button
            onClick={() => setActiveTab('quantum-qaoa')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white ${
              activeTab === 'quantum-qaoa' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Quantum QAOA
          </button>
          <button
            onClick={() => setActiveTab('generative-cad')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white ${
              activeTab === 'generative-cad' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Generative CAD
          </button>
          <button
            onClick={() => setActiveTab('cobot-ergonomics')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white ${
              activeTab === 'cobot-ergonomics' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Human-Cobot Symbiosis
          </button>
          <button
            onClick={() => setActiveTab('circularity')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white ${
              activeTab === 'circularity' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Net-Zero Circularity
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenOptimizer}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            Run Hybrid Optimizer
          </button>
        </div>
      </div>
    </header>
  );
};
