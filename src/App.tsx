import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DigitalTwinFloor } from './components/DigitalTwinFloor';
import { QuantumCircuitSolver } from './components/QuantumCircuitSolver';
import { GenerativeDesignStudio } from './components/GenerativeDesignStudio';
import { HumanCentricCobot } from './components/HumanCentricCobot';
import { CircularityDashboard } from './components/CircularityDashboard';
import { QuantumMathModal } from './components/QuantumMathModal';
import {
  initialMachines,
  initialJobs,
  defaultQAOAState,
  defaultGenerativeSpec,
  defaultCobotErgonomics,
  defaultShopTelemetry,
} from './data/mockData';
import { MachineUnit, ProductionJob, QAOAState, GenerativeDesignSpec, CobotErgonomics, ShopFloorTelemetry } from './types';
import { Cpu, Layers, UserCheck, Recycle, Activity, ArrowRight, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [machines, setMachines] = useState<MachineUnit[]>(initialMachines);
  const [jobs, setJobs] = useState<ProductionJob[]>(initialJobs);
  const [qaoaState, setQaoaState] = useState<QAOAState>(defaultQAOAState);
  const [currentSpec, setCurrentSpec] = useState<GenerativeDesignSpec>(defaultGenerativeSpec);
  const [cobotData, setCobotData] = useState<CobotErgonomics>(defaultCobotErgonomics);
  const [telemetry, setTelemetry] = useState<ShopFloorTelemetry>(defaultShopTelemetry);
  const [isMathModalOpen, setIsMathModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Bar Navigation (Strict 3-Zone Contract) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenOptimizer={() => setActiveTab('quantum-qaoa')}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'overview' && (
          <div className="space-y-16">
            <HeroSection
              onExploreTwin={() => setActiveTab('digital-twin')}
              onExploreQAOA={() => setActiveTab('quantum-qaoa')}
              onOpenMathGuide={() => setIsMathModalOpen(true)}
            />

            {/* Architecture Overview Bento / Navigation Hub */}
            <div className="max-w-7xl mx-auto px-6 space-y-12 pb-16">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                    Industry 5.0 Core Tenets
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Five Architectural Pillars of the Hybrid Framework
                  </h2>
                </div>
                <p className="text-xs text-slate-400 max-w-md">
                  Seamlessly bridging quantum variational solvers with generative multimodal AI and human-centric shop floor ergonomics.
                </p>
              </div>

              {/* 5 Distinct Pillar Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Pillar 1: Digital Twin */}
                <div
                  onClick={() => setActiveTab('digital-twin')}
                  className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/90 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-800/80 flex items-center justify-center text-cyan-400">
                        <Activity className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono text-emerald-400">ISO 23247</span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      Cyber-Physical Digital Twin
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Real-time bidirectional synchronization with 5-axis CNC machining centers, additive lasers, and autonomous mobile robots.
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center text-xs font-semibold text-cyan-400 gap-1.5">
                    <span>Inspect Floor Telemetry</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Pillar 2: QAOA Circuit */}
                <div
                  onClick={() => setActiveTab('quantum-qaoa')}
                  className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/90 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-lg bg-indigo-950/80 border border-indigo-800/80 flex items-center justify-center text-indigo-400">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono text-indigo-300">18.3× SPEEDUP</span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                      Quantum QAOA & QUBO Solver
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Variational quantum circuits resolving NP-hard job-shop scheduling, robot cell routing, and carbon-capped dispatch.
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center text-xs font-semibold text-indigo-400 gap-1.5">
                    <span>Launch Quantum Circuit</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Pillar 3: Generative CAD */}
                <div
                  onClick={() => setActiveTab('generative-cad')}
                  className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900/90 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-lg bg-amber-950/80 border border-amber-800/80 flex items-center justify-center text-amber-400">
                        <Layers className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono text-amber-300">-48% MASS</span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      Generative CAD & G-Code Synthesis
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Foundation model topology optimization and automatic adaptive 5-axis trochoidal toolpath G-code compilation.
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center text-xs font-semibold text-amber-400 gap-1.5">
                    <span>Synthesize Toolpaths</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Pillar 4: Human-Cobot Symbiosis */}
                <div
                  onClick={() => setActiveTab('cobot-ergonomics')}
                  className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900/90 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-emerald-800/80 flex items-center justify-center text-emerald-400">
                        <UserCheck className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono text-emerald-300">ISO/TS 15066</span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                      Human-Cobot Symbiosis
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Dynamic speed and separation monitoring (SSM) protecting worker physical well-being, reducing lumbar strain by 64%.
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center text-xs font-semibold text-emerald-400 gap-1.5">
                    <span>Configure Ergonomics</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Pillar 5: Circularity & Net-Zero */}
                <div
                  onClick={() => setActiveTab('circularity')}
                  className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/90 transition-all cursor-pointer group flex flex-col justify-between md:col-span-2 lg:col-span-2"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-800/80 flex items-center justify-center text-cyan-400">
                        <Recycle className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono text-cyan-300">94% CIRCULAR</span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      Net-Zero Microgrid & Closed-Loop Swarf Recycling
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Quantum dispatch schedules high-energy CNC roughing cycles strictly during rooftop solar and wind generation peaks, while titanium cutting swarf is ultrasonically briquetted and re-atomized into 3D printing powder.
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center text-xs font-semibold text-cyan-400 gap-1.5">
                    <span>View Energy & Carbon Telemetry</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 1: Digital Twin */}
        {activeTab === 'digital-twin' && (
          <div className="max-w-7xl mx-auto px-6 py-8">
            <DigitalTwinFloor
              machines={machines}
              setMachines={setMachines}
              jobs={jobs}
            />
          </div>
        )}

        {/* Tab 2: Quantum QAOA */}
        {activeTab === 'quantum-qaoa' && (
          <div className="max-w-7xl mx-auto px-6 py-8">
            <QuantumCircuitSolver
              qaoaState={qaoaState}
              setQaoaState={setQaoaState}
            />
          </div>
        )}

        {/* Tab 3: Generative CAD */}
        {activeTab === 'generative-cad' && (
          <div className="max-w-7xl mx-auto px-6 py-8">
            <GenerativeDesignStudio
              currentSpec={currentSpec}
              setCurrentSpec={setCurrentSpec}
            />
          </div>
        )}

        {/* Tab 4: Cobot Ergonomics */}
        {activeTab === 'cobot-ergonomics' && (
          <div className="max-w-7xl mx-auto px-6 py-8">
            <HumanCentricCobot
              cobotData={cobotData}
              setCobotData={setCobotData}
            />
          </div>
        )}

        {/* Tab 5: Circularity */}
        {activeTab === 'circularity' && (
          <div className="max-w-7xl mx-auto px-6 py-8">
            <CircularityDashboard telemetry={telemetry} />
          </div>
        )}
      </main>

      {/* Scientific Reference Modal */}
      <QuantumMathModal
        isOpen={isMathModalOpen}
        onClose={() => setIsMathModalOpen(false)}
      />

      {/* Clean Footer (Compliant with Anti-Slop Discipline) */}
      <footer className="border-t border-slate-800 py-8 bg-[#0b0f17] text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono">
            Q-GEN 5.0 Hybrid Quantum-Generative AI Manufacturing Framework
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsMathModalOpen(true)}
              className="hover:text-white transition-colors underline underline-offset-2"
            >
              Hamiltonian Math Specification
            </button>
            <span>·</span>
            <span>ISO/TS 15066 & ISO 23247 Compliant</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
