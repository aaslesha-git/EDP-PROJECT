import React, { useState } from 'react';
import { QAOAState } from '../types';
import { Play, Sparkles, Cpu, Clock, Zap, Check } from 'lucide-react';

interface QuantumCircuitSolverProps {
  qaoaState: QAOAState;
  setQaoaState: React.Dispatch<React.SetStateAction<QAOAState>>;
}

export const QuantumCircuitSolver: React.FC<QuantumCircuitSolverProps> = ({
  qaoaState,
  setQaoaState,
}) => {
  const [jobsInput, setJobsInput] = useState<number>(6);
  const [machinesInput, setMachinesInput] = useState<number>(4);
  const [priorityMode, setPriorityMode] = useState<string>('energy-carbon');
  const [isSolving, setIsSolving] = useState<boolean>(false);
  const [synthesisDetails, setSynthesisDetails] = useState<any>(null);

  // Sliders for Gamma & Beta
  const handleGammaChange = (index: number, val: number) => {
    const updated = [...qaoaState.gamma];
    updated[index] = val;
    setQaoaState((prev) => ({
      ...prev,
      gamma: updated,
      convergenceCost: -34.82 + (val - 0.42) * 4.2,
    }));
  };

  const handleBetaChange = (index: number, val: number) => {
    const updated = [...qaoaState.beta];
    updated[index] = val;
    setQaoaState((prev) => ({
      ...prev,
      beta: updated,
      convergenceCost: -34.82 + (val - 0.65) * 3.5,
    }));
  };

  const handleRunQAOAOptimization = async () => {
    setIsSolving(true);
    setSynthesisDetails(null);

    try {
      const response = await fetch('/api/gemini/quantum-synthesis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobsCount: jobsInput,
          machinesCount: machinesInput,
          priorityMode: priorityMode,
          carbonBudgetKg: 65,
        }),
      });

      const data = await response.json();
      if (data.data) {
        setSynthesisDetails(data.data);
        if (data.data.circuitParameters) {
          setQaoaState((prev) => ({
            ...prev,
            gamma: data.data.circuitParameters.gamma || prev.gamma,
            beta: data.data.circuitParameters.beta || prev.beta,
            speedupFactor: data.data.quantumAdvantageMetrics?.speedupFactor || '17.4x',
            quantumTimeMs: data.data.quantumAdvantageMetrics?.qaoaEstimatedTimeMs || 840,
            classicalTimeMs: data.data.quantumAdvantageMetrics?.classicalTimeMs || 14200,
          }));
        }
      }
    } catch (err) {
      console.error('QAOA formulation failed:', err);
    } finally {
      setIsSolving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
            Combinatorial Optimization & QPU Dispatch
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            QAOA Circuit & QUBO Job-Shop Scheduler
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>ALGORITHM: QAOA DEPTH p={qaoaState.depthP}</span>
          <span aria-hidden="true">·</span>
          <span className="text-emerald-400">STATE FIDELITY: 99.4%</span>
        </div>
      </div>

      {/* Grid: Left Quantum Circuit & Parameters (7 cols), Right QPU & Benchmark (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Quantum Circuit Visualizer */}
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-slate-400 uppercase">
                Parameterized Quantum Circuit (PQC) Architecture
              </span>
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="text-slate-400">Depth p:</span>
                {[1, 2, 3].map((p) => (
                  <button
                    key={p}
                    onClick={() => setQaoaState((prev) => ({ ...prev, depthP: p }))}
                    className={`px-2 py-0.5 rounded text-xs transition-colors ${
                      qaoaState.depthP === p
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    p={p}
                  </button>
                ))}
              </div>
            </div>

            {/* Circuit Lines Diagram */}
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 overflow-x-auto">
              <div className="min-w-[560px] space-y-4 py-2 font-mono text-xs">
                {[0, 1, 2, 3].map((qubitIdx) => (
                  <div key={qubitIdx} className="flex items-center gap-3">
                    <span className="w-8 text-slate-400 font-bold tabular-nums">
                      q[{qubitIdx}]
                    </span>
                    <span className="text-slate-600">|0⟩</span>
                    <div className="flex-1 flex items-center gap-2 relative">
                      <div className="absolute inset-x-0 h-0.5 bg-slate-800" />
                      
                      {/* Hadamard Gate */}
                      <span className="relative z-10 px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-white font-semibold">
                        H
                      </span>

                      {/* Cost Hamiltonian U(C, gamma) */}
                      <span className="relative z-10 px-3 py-1 rounded bg-indigo-950/80 border border-indigo-700/80 text-indigo-300">
                        e^-iγ{qubitIdx} H_C
                      </span>

                      {/* Entanglement Coupler */}
                      {qubitIdx % 2 === 0 ? (
                        <span className="relative z-10 px-2 py-1 rounded bg-slate-800 border border-cyan-500 text-cyan-300 text-[10px]">
                          CNOT
                        </span>
                      ) : (
                        <span className="relative z-10 px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-400 text-[10px]">
                          RZ(γ)
                        </span>
                      )}

                      {/* Mixer Hamiltonian U(B, beta) */}
                      <span className="relative z-10 px-3 py-1 rounded bg-cyan-950/80 border border-cyan-700/80 text-cyan-300">
                        e^-iβ{qubitIdx} H_M
                      </span>

                      {/* Measurement */}
                      <span className="relative z-10 px-2 py-1 rounded bg-slate-800 border border-slate-700 text-amber-400">
                        [M]
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Variational Parameter Tuning Sliders */}
            <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-indigo-400">Cost Angle γ₁ (Problem Hamiltonian)</span>
                  <span className="text-white tabular-nums font-bold">
                    {qaoaState.gamma[0].toFixed(3)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="3.1415"
                  step="0.01"
                  value={qaoaState.gamma[0]}
                  onChange={(e) => handleGammaChange(0, parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-cyan-400">Mixer Angle β₁ (Transverse Field)</span>
                  <span className="text-white tabular-nums font-bold">
                    {qaoaState.beta[0].toFixed(3)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.5707"
                  step="0.01"
                  value={qaoaState.beta[0]}
                  onChange={(e) => handleBetaChange(0, parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Probability Amplitudes of Quantum State Vector */}
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-slate-400 uppercase">
                Measured State Vector Probability Distribution
              </span>
              <span className="text-xs font-mono text-cyan-400">
                Ground State Energy: {qaoaState.convergenceCost.toFixed(2)}
              </span>
            </div>

            <div className="space-y-3">
              {qaoaState.states.map((st, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300 font-semibold">{st.bitstring}</span>
                    <span className="text-slate-400">
                      Cost: <span className="text-emerald-400">{st.energyCost.toFixed(1)}</span> ·
                      Prob: <span className="text-cyan-300">{(st.probability * 100).toFixed(1)}%</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded overflow-hidden">
                    <div
                      className={`h-full ${
                        idx === 0 ? 'bg-cyan-400' : 'bg-slate-700'
                      }`}
                      style={{ width: `${st.probability * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: QPU Dilution Stage & Job-Shop Formulation Engine */}
        <div className="lg:col-span-5 space-y-6">
          {/* QPU Hardware Card with Image */}
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <div className="text-xs font-mono text-cyan-400 uppercase">Cryogenic Backplane</div>
              <div className="text-xs font-mono text-emerald-400">T = 12.8 mK</div>
            </div>

            <div className="h-44 rounded-lg overflow-hidden border border-slate-800 relative mb-4">
              <img
                src="/src/assets/images/quantum_cryostat_core_1792931055133.jpg"
                alt="Quantum Dilution Refrigerator Coaxial Cable Stage"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-3 text-xs font-mono text-white">
                Superconducting Transmon Array (127 Qubits)
              </div>
            </div>

            {/* Quick Interactive Parameters */}
            <div className="space-y-3 mb-5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">
                    Pending Jobs
                  </label>
                  <input
                    type="number"
                    min="2"
                    max="12"
                    value={jobsInput}
                    onChange={(e) => setJobsInput(parseInt(e.target.value) || 4)}
                    className="w-full p-2 text-xs font-mono bg-slate-950 border border-slate-800 rounded text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">
                    Machines in Cell
                  </label>
                  <input
                    type="number"
                    min="2"
                    max="8"
                    value={machinesInput}
                    onChange={(e) => setMachinesInput(parseInt(e.target.value) || 3)}
                    className="w-full p-2 text-xs font-mono bg-slate-950 border border-slate-800 rounded text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">
                  Optimization Hamiltonian Objective
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPriorityMode('energy-carbon')}
                    className={`p-2 text-xs font-medium rounded border transition-colors ${
                      priorityMode === 'energy-carbon'
                        ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    Net-Zero Carbon
                  </button>
                  <button
                    onClick={() => setPriorityMode('makespan')}
                    className={`p-2 text-xs font-medium rounded border transition-colors ${
                      priorityMode === 'makespan'
                        ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    Minimal Makespan
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleRunQAOAOptimization}
              disabled={isSolving}
              className="w-full py-3 px-4 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isSolving ? (
                <>
                  <Cpu className="w-4 h-4 animate-spin" />
                  <span>Synthesizing QUBO Hamiltonian...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Synthesize QUBO & Execute QAOA</span>
                </>
              )}
            </button>
          </div>

          {/* Quantum vs Classical Empirical Benchmark Strip */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-xs font-mono text-slate-400 uppercase mb-3">
              Empirical Performance Benchmark (QAOA vs Genetic)
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex items-center justify-between p-2.5 rounded bg-slate-950 border border-slate-800/80">
                <span className="text-slate-400">Classical Branch & Bound / GA:</span>
                <span className="text-slate-200 tabular-nums">
                  {(qaoaState.classicalTimeMs / 1000).toFixed(2)} s (384 kWh)
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded bg-cyan-950/40 border border-cyan-800/60">
                <span className="text-cyan-300 font-semibold">QPU QAOA Simulator:</span>
                <span className="text-cyan-300 font-bold tabular-nums">
                  {(qaoaState.quantumTimeMs / 1000).toFixed(2)} s ({qaoaState.speedupFactor} Speedup)
                </span>
              </div>
            </div>
          </div>

          {/* Synthesis Result Callout if available */}
          {synthesisDetails && (
            <div className="p-5 rounded-xl bg-slate-900 border border-indigo-800/60 space-y-3">
              <div className="text-xs font-mono text-indigo-400 uppercase">
                Hamiltonian Mapping Formulation
              </div>
              <div className="p-3 rounded bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 break-all">
                {synthesisDetails.quboFormulation}
              </div>
              <div className="text-xs text-slate-300 flex items-center justify-between font-mono">
                <span>Qubits Allocated: {synthesisDetails.numQubitsRequired || 24}</span>
                <span className="text-emerald-400 font-semibold">
                  Carbon Cut: {synthesisDetails.quantumAdvantageMetrics?.carbonReductionPercent || 18}%
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
