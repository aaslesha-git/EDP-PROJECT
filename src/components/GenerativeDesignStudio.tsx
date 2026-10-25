import React, { useState } from 'react';
import { GenerativeDesignSpec } from '../types';
import { Sparkles, Download, Layers, Shield, Cog, FileText } from 'lucide-react';

interface GenerativeDesignStudioProps {
  currentSpec: GenerativeDesignSpec;
  setCurrentSpec: React.Dispatch<React.SetStateAction<GenerativeDesignSpec>>;
}

export const GenerativeDesignStudio: React.FC<GenerativeDesignStudioProps> = ({
  currentSpec,
  setCurrentSpec,
}) => {
  const [componentName, setComponentName] = useState<string>('Aerospace Structural Bracket');
  const [material, setMaterial] = useState<string>('Ti-6Al-4V Grade 5 Titanium');
  const [weightReduction, setWeightReduction] = useState<number>(48);
  const [safetyFactor, setSafetyFactor] = useState<number>(2.8);
  const [manufacturingMethod, setManufacturingMethod] = useState<string>(
    'Hybrid DMLS Additive + 5-Axis CNC Precision Finish'
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const componentPresets = [
    { name: 'Aerospace Structural Bracket', material: 'Ti-6Al-4V Grade 5 Titanium', weight: 48, sf: 2.8 },
    { name: 'Cobot 6-DoF End-Effector Wrist', material: 'AlSi10Mg Aerospace Aluminum', weight: 55, sf: 2.4 },
    { name: 'Conformal Hydraulic Manifold', material: 'Inconel 718 Superalloy', weight: 42, sf: 3.2 },
    { name: 'Micro-Turbine Impeller Rotor', material: 'Ti-6Al-4V Grade 5 Titanium', weight: 36, sf: 3.0 },
  ];

  const handleSelectPreset = (preset: any) => {
    setComponentName(preset.name);
    setMaterial(preset.material);
    setWeightReduction(preset.weight);
    setSafetyFactor(preset.sf);
  };

  const handleGenerateDesign = async () => {
    setIsGenerating(true);

    try {
      const response = await fetch('/api/gemini/generative-design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          componentName,
          material,
          weightTarget: weightReduction,
          safetyFactor,
          manufacturingMethod,
        }),
      });

      const data = await response.json();
      if (data.data) {
        setCurrentSpec({
          componentName,
          material,
          weightReduction,
          safetyFactor,
          process: manufacturingMethod,
          topologySummary: data.data.topologySummary || currentSpec.topologySummary,
          stressAnalysis: data.data.stressAnalysis || currentSpec.stressAnalysis,
          toolpathStrategy: data.data.toolpathStrategy || currentSpec.toolpathStrategy,
          gcodeSnippet: data.data.gcodeSnippet || currentSpec.gcodeSnippet,
          humanFactorNotes: data.data.humanFactorNotes || currentSpec.humanFactorNotes,
        });
      }
    } catch (err) {
      console.error('Generative synthesis error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadGcode = () => {
    const element = document.createElement('a');
    const file = new Blob([currentSpec.gcodeSnippet], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${componentName.toLowerCase().replace(/\s+/g, '_')}_qgen.gcode`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
            Foundation Models for Computational Mechanics
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Generative CAD & Adaptive CNC Toolpath Synthesis
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>ALGORITHM: TOPOLOGY OPTIMIZATION + DIFFUSION</span>
          <span aria-hidden="true">·</span>
          <span className="text-amber-400">FEA RESOLUTION: 0.1 mm VOXEL</span>
        </div>
      </div>

      {/* Grid: Left Controls (5 cols), Right Topology & G-Code (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Component Parameters & Presets */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono text-slate-400 uppercase">
                Component Definition & Constraints
              </span>
              <span className="text-xs font-mono text-cyan-400">ISO 10303 STEP</span>
            </div>

            {/* Quick Presets */}
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-2">
                Industry 5.0 Component Presets
              </label>
              <div className="grid grid-cols-2 gap-2">
                {componentPresets.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => handleSelectPreset(p)}
                    className={`p-2.5 text-xs text-left rounded border transition-colors ${
                      componentName === p.name
                        ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300 font-semibold'
                        : 'border-slate-800 bg-slate-950/70 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="truncate">{p.name}</div>
                    <div className="text-[10px] text-slate-400">{p.material.split(' ')[0]}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders: Weight Reduction & Safety Factor */}
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-300">Target Mass Reduction</span>
                  <span className="font-bold text-cyan-400 tabular-nums">{weightReduction}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="65"
                  step="1"
                  value={weightReduction}
                  onChange={(e) => setWeightReduction(parseInt(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-300">Mechanical Safety Factor (SF)</span>
                  <span className="font-bold text-amber-400 tabular-nums">{safetyFactor.toFixed(1)}×</span>
                </div>
                <input
                  type="range"
                  min="1.5"
                  max="4.0"
                  step="0.1"
                  value={safetyFactor}
                  onChange={(e) => setSafetyFactor(parseFloat(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1.5">
                  Feedstock Material
                </label>
                <select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full p-2.5 text-xs font-mono bg-slate-950 border border-slate-800 rounded text-white"
                >
                  <option value="Ti-6Al-4V Grade 5 Titanium">Ti-6Al-4V Grade 5 Titanium (Aerospace)</option>
                  <option value="Inconel 718 Nickel Superalloy">Inconel 718 Nickel Superalloy (Extreme Heat)</option>
                  <option value="AlSi10Mg Aerospace Aluminum">AlSi10Mg Aluminum (Lightweight Cobot)</option>
                  <option value="Recycled Continuous Carbon-PEEK">Recycled Carbon-PEEK (Circular Polymer)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1.5">
                  Manufacturing Process Strategy
                </label>
                <select
                  value={manufacturingMethod}
                  onChange={(e) => setManufacturingMethod(e.target.value)}
                  className="w-full p-2.5 text-xs font-mono bg-slate-950 border border-slate-800 rounded text-white"
                >
                  <option value="Hybrid DMLS Additive + 5-Axis CNC Precision Finish">
                    Hybrid DMLS Additive + 5-Axis CNC Finish
                  </option>
                  <option value="Subtractive 5-Axis High-Speed Trochoidal Milling">
                    Subtractive 5-Axis High-Speed Milling
                  </option>
                  <option value="Wire Arc Additive Manufacturing (WAAM)">
                    Wire Arc Additive Manufacturing (WAAM)
                  </option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerateDesign}
              disabled={isGenerating}
              className="w-full py-3 px-4 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Topology & Toolpaths...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Synthesize Generative Part & G-Code</span>
                </>
              )}
            </button>
          </div>

          {/* Physical Macro Inspection Asset */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-xs font-mono text-slate-400 uppercase mb-3">
              Physical Additive Part Prototype
            </div>
            <div className="h-52 rounded-lg overflow-hidden border border-slate-800 relative">
              <img
                src="/src/assets/images/digital_twin_component_1792931055498.jpg"
                alt="3D Printed Titanium Topology Bracket with Organic Lattice"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs font-mono text-white">
                <span>SN: BKT-TA6V-00451</span>
                <span className="text-cyan-400 font-bold">MASS: -{currentSpec.weightReduction}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Generative Topology Output, FEA & G-Code */}
        <div className="lg:col-span-7 space-y-6">
          {/* Topology Summary */}
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono text-cyan-400 uppercase">
                Active Component: {currentSpec.componentName}
              </span>
              <span className="text-xs font-mono text-emerald-400">FEA CONVERGED</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentSpec.topologySummary}
            </p>

            {/* FEA Stress Metrics Strip */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono">
              <div>
                <div className="text-slate-400 text-[10px] uppercase">Peak Von Mises</div>
                <div className="text-base font-bold text-white tabular-nums">
                  {currentSpec.stressAnalysis.maxVonMisesMpa.toFixed(1)} MPa
                </div>
                <div className="text-[10px] text-slate-400">Yield: {currentSpec.stressAnalysis.yieldStrengthMpa} MPa</div>
              </div>

              <div>
                <div className="text-slate-400 text-[10px] uppercase">Calculated SF</div>
                <div className="text-base font-bold text-emerald-400 tabular-nums">
                  {currentSpec.stressAnalysis.safetyFactorCalculated.toFixed(2)}×
                </div>
                <div className="text-[10px] text-slate-400">Target: {currentSpec.safetyFactor}×</div>
              </div>

              <div>
                <div className="text-slate-400 text-[10px] uppercase">Machining Cycle</div>
                <div className="text-base font-bold text-cyan-300 tabular-nums">
                  {currentSpec.toolpathStrategy.estimatedMachiningTimeMin} min
                </div>
                <div className="text-[10px] text-slate-400">5-Axis Finish</div>
              </div>
            </div>

            {/* Critical Stress Zones */}
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase mb-2">
                Monitored Load & Stress Zones:
              </div>
              <div className="flex flex-wrap gap-2">
                {currentSpec.stressAnalysis.highStressZones.map((zone, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono text-slate-300 px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700"
                  >
                    {zone}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Adaptive Toolpath & G-Code Studio */}
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase">
                  Adaptive Toolpath G-Code Generator
                </div>
                <div className="text-sm font-semibold text-white">
                  {currentSpec.toolpathStrategy.processType}
                </div>
              </div>

              <button
                onClick={handleDownloadGcode}
                className="px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Export .GCODE
              </button>
            </div>

            {/* Machining Parameters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono p-3 rounded bg-slate-950 border border-slate-800">
              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Spindle</span>
                <span className="font-bold text-white tabular-nums">
                  {currentSpec.toolpathStrategy.spindleSpeedRpm} RPM
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Feed Rate</span>
                <span className="font-bold text-white tabular-nums">
                  {currentSpec.toolpathStrategy.feedRateMmMin} mm/min
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Rough Allowance</span>
                <span className="font-bold text-white tabular-nums">
                  {currentSpec.toolpathStrategy.roughingAllowanceMm} mm
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Tolerance</span>
                <span className="font-bold text-emerald-400 tabular-nums">
                  ±{currentSpec.toolpathStrategy.finishingToleranceMm} mm
                </span>
              </div>
            </div>

            {/* G-Code Terminal View */}
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto max-h-48">
              <pre className="leading-relaxed">{currentSpec.gcodeSnippet}</pre>
            </div>

            {/* Industry 5.0 Operator Ergonomic Note */}
            <div className="p-3 rounded bg-slate-950/70 border border-slate-800/80 text-xs text-slate-400">
              <span className="text-cyan-400 font-semibold font-mono">Operator Interaction: </span>
              {currentSpec.humanFactorNotes}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
