import React from 'react';
import { ArrowRight, Cpu, Sparkles, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onExploreTwin: () => void;
  onExploreQAOA: () => void;
  onOpenMathGuide: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreTwin,
  onExploreQAOA,
  onOpenMathGuide,
}) => {
  return (
    <section className="relative pt-12 pb-16 border-b border-slate-800 bg-[#0b0f17]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Editorial Subtitle Kicker (No Pill Badges) */}
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-4 tracking-wider uppercase">
          <span>Autonomous Cyber-Physical Systems</span>
          <span aria-hidden="true">·</span>
          <span>Industry 5.0 Human-Centric Architecture</span>
          <span aria-hidden="true">·</span>
          <span>NISQ & Annealing QAOA</span>
        </div>

        {/* 2-Column Split: Headline + Hero Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-12">
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-white leading-[1.12] mb-6 [text-wrap:balance]">
                Hybrid Quantum-Generative AI Framework for Resilient Manufacturing
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
                Unifying Quantum Approximate Optimization (QAOA) with Generative Foundation Models to eliminate job-shop bottlenecks, synthesize lightweight generative toolpaths, and ensure ergonomic human-cobot safety across smart manufacturing cells.
              </p>
            </div>

            {/* Functional Interactive CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreTwin}
                className="px-5 py-3 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                Inspect Digital Twin Floor
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onExploreQAOA}
                className="px-5 py-3 text-sm font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
              >
                Launch QAOA Solver
              </button>
              <button
                onClick={onOpenMathGuide}
                className="px-4 py-3 text-sm font-medium text-slate-400 hover:text-white transition-colors underline underline-offset-4 whitespace-nowrap"
              >
                Hamiltonian Math Spec
              </button>
            </div>
          </div>

          {/* Right Column: Hero High-Fidelity Industrial Visual Asset */}
          <div className="lg:col-span-5 relative group">
            <div className="h-full min-h-[340px] rounded-xl overflow-hidden border border-slate-800 bg-slate-900 relative">
              <img
                src="/src/assets/images/hero_quantum_facility_1792931054337.jpg"
                alt="Industry 5.0 High-Precision Smart Factory Cell with Cobots and CNC Machines"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              
              {/* Telemetry Monospace Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-slate-950/85 backdrop-blur-md border border-slate-800">
                <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-1">
                  <span className="text-cyan-400 font-semibold">CELL-ALPHA / ACTIVE RUN</span>
                  <span className="tabular-nums">SYNCHRONIZED</span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-xs">
                  <div>
                    <div className="text-slate-400 text-[10px] uppercase font-mono">Spindle Power</div>
                    <div className="font-mono font-bold text-white tabular-nums">18.4 kW</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px] uppercase font-mono">Cobot Distance</div>
                    <div className="font-mono font-bold text-emerald-400 tabular-nums">1.25 m</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px] uppercase font-mono">QPU Latency</div>
                    <div className="font-mono font-bold text-cyan-300 tabular-nums">680 ms</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quantitative Rigor Strip (Adjacent to Claim, Tabular Figures) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Quantum Speedup</span>
            </div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">
              18.3<span className="text-sm font-normal text-slate-400 ml-1">× faster</span>
            </div>
            <p className="text-xs text-slate-400">vs classical genetic JSSP algorithms</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Mass Reduction</span>
            </div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">
              48.2<span className="text-sm font-normal text-slate-400 ml-1">% mass cut</span>
            </div>
            <p className="text-xs text-slate-400">Generative topology with Ti-6Al-4V</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ergonomic Relief</span>
            </div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">
              64.0<span className="text-sm font-normal text-slate-400 ml-1">% strain drop</span>
            </div>
            <p className="text-xs text-slate-400">ISO/TS 15066 safety-certified HRC</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase">
              <span className="text-emerald-400">●</span>
              <span>Carbon Neutrality</span>
            </div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">
              -22.6<span className="text-sm font-normal text-slate-400 ml-1">% CO2eq</span>
            </div>
            <p className="text-xs text-slate-400">Grid microgrid renewable peak alignment</p>
          </div>
        </div>
      </div>
    </section>
  );
};
