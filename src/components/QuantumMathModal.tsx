import React from 'react';
import { X, BookOpen, Layers, ShieldCheck } from 'lucide-react';

interface QuantumMathModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuantumMathModal: React.FC<QuantumMathModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-y-auto p-6 md:p-8 space-y-6">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
              Mathematical Foundation & Scientific Reference
            </div>
            <h2 className="text-xl font-bold text-white">
              Hybrid Quantum-Generative AI Architecture Formulation
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: QUBO & Problem Hamiltonian */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-cyan-400 uppercase font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            01. Flexible Job-Shop Scheduling Problem (QUBO / Ising Hamiltonian)
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            The multi-machine, precedence-constrained Job-Shop Scheduling Problem (JSSP) with dynamic carbon emission boundaries is mapped onto a Quadratic Unconstrained Binary Optimization (QUBO) Hamiltonian:
          </p>
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
            {"H_C(x) = ∑_{j,m,t} C_{jmt} · x_{jmt} + P_1 ∑_j (∑_{m,t} x_{jmt} - 1)² + P_2 ∑_{m,t} (∑_j x_{jmt})(∑_j x_{jmt} - 1) + λ_carbon ∑_{j,m,t} E_grid(t) · x_{jmt}"}
          </div>
          <div className="text-xs text-slate-400 space-y-1">
            <div><strong className="text-slate-300">{"x_{jmt} ∈ {0, 1}"}:</strong> Binary decision variable indicating job j executes on machine m starting at time slot t.</div>
            <div><strong className="text-slate-300">P_1, P_2:</strong> Quadratic penalty terms enforcing exact job completion and non-overlapping machine occupancy constraints.</div>
            <div><strong className="text-slate-300">λ_carbon · E_grid(t):</strong> Carbon penalty coefficient scaled to real-time grid carbon intensity.</div>
          </div>
        </div>

        {/* Section 2: QAOA State Evolution */}
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <h3 className="text-sm font-bold text-indigo-400 uppercase font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400" />
            02. QAOA Variational State Evolution
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            The trial quantum state |ψ(γ, β)⟩ is prepared by applying alternating layers of problem and mixer Hamiltonians to an equal superposition state:
          </p>
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto leading-relaxed">
            {"|ψ(γ, β)⟩ = ∏_{k=1}^p exp(-i β_k H_M) · exp(-i γ_k H_C) |+⟩^(⊗ n)"}
          </div>
          <div className="text-xs text-slate-400">
            where <strong className="text-slate-300">{"H_M = ∑_{i=1}^n σ_i^x"}</strong> is the transverse mixer Hamiltonian that induces quantum tunneling across local combinatorial energy barriers.
          </div>
        </div>

        {/* Section 3: Generative AI Foundation Models in Manufacturing */}
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <h3 className="text-sm font-bold text-amber-400 uppercase font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            03. Generative Foundation Models & Cyber-Physical Digital Twin
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Large Multimodal Foundation Models (Gemini 3.8 Flash) bridge discrete quantum outputs with continuous cyber-physical reality:
          </p>
          <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-5">
            <li><strong className="text-white">Generative Topology Synthesis:</strong> Translating functional load vectors and boundary fixations into lightweight, 3D printable Voronoi lattice geometries.</li>
            <li><strong className="text-white">Autonomous G-Code Compilation:</strong> Synthesizing 5-axis adaptive trochoidal toolpaths that maintain constant tool engagement and chip thickness, tripling cutting tool lifespan.</li>
            <li><strong className="text-white">Cyber-Physical Anomaly Reasoning:</strong> Real-time high-dimensional cross-correlation of vibration, acoustic, and thermal telemetry to prevent catastrophic tool failures.</li>
          </ul>
        </div>

        {/* Section 4: ISO/TS 15066 Human-Robot Safety Equations */}
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <h3 className="text-sm font-bold text-emerald-400 uppercase font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            04. ISO/TS 15066 Speed & Separation Monitoring (SSM)
          </h3>
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
            {"S_p = (v_h · T_r) + (v_h · T_s) + S_s + C + Z_d + Z_r"}
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Ensures that the 6-DoF cobot decelerates to a complete stop before the operator&apos;s hand can breach the physical hazard zone, prioritizing technician comfort and safety above pure throughput.
          </p>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
          >
            Close Scientific Reference
          </button>
        </div>
      </div>
    </div>
  );
};
