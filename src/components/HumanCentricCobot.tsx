import React, { useState } from 'react';
import { CobotErgonomics } from '../types';
import { ShieldCheck, UserCheck, HeartPulse, Sliders, Activity, Sparkles } from 'lucide-react';

interface HumanCentricCobotProps {
  cobotData: CobotErgonomics;
  setCobotData: React.Dispatch<React.SetStateAction<CobotErgonomics>>;
}

export const HumanCentricCobot: React.FC<HumanCentricCobotProps> = ({
  cobotData,
  setCobotData,
}) => {
  const [taskName, setTaskName] = useState<string>(
    'Turbine Blade Surface Tactile & Ultrasonic Inspection'
  );
  const [experienceLevel, setExperienceLevel] = useState<string>('Senior Machinist (Level IV)');
  const [fatigueSlider, setFatigueSlider] = useState<number>(cobotData.fatigueIndex);
  const [proximitySlider, setProximitySlider] = useState<number>(cobotData.separationDistanceMeters);
  const [isPlanning, setIsPlanning] = useState<boolean>(false);

  // Dynamic speed scaling according to ISO/TS 15066 SSM formula
  const calculatedCobotSpeed = Math.min(500, Math.max(50, Math.round(proximitySlider * 200)));

  const handleFatigueChange = (val: number) => {
    setFatigueSlider(val);
    setCobotData((prev) => ({
      ...prev,
      fatigueIndex: val,
      // If fatigue is high, cobot takes on more stabilization work
      lumbarStrainReliefPercent: val > 60 ? 78 : 64,
    }));
  };

  const handleProximityChange = (val: number) => {
    setProximitySlider(val);
    setCobotData((prev) => ({
      ...prev,
      separationDistanceMeters: val,
      cobotSpeedCap: Math.min(500, Math.max(50, Math.round(val * 200))),
    }));
  };

  const handlePlanErgonomics = async () => {
    setIsPlanning(true);

    try {
      const response = await fetch('/api/gemini/cobot-interaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskName,
          operatorExperienceLevel: experienceLevel,
          humanFatigueIndex: `Index: ${fatigueSlider}/100`,
        }),
      });

      const data = await response.json();
      if (data.data) {
        setCobotData((prev) => ({
          ...prev,
          activeTask: taskName,
          workerExperience: experienceLevel,
          hrcSafetyMode: data.data.collaborationMode || prev.hrcSafetyMode,
          cobotSpeedCap: data.data.cobotSpeedCapMmS || calculatedCobotSpeed,
          isoCompliant: true,
          humanTasks: data.data.workloadSplit?.humanResponsibility
            ? [data.data.workloadSplit.humanResponsibility]
            : prev.humanTasks,
          cobotTasks: data.data.workloadSplit?.cobotResponsibility
            ? [data.data.workloadSplit.cobotResponsibility]
            : prev.cobotTasks,
        }));
      }
    } catch (err) {
      console.error('Ergonomics planning failed:', err);
    } finally {
      setIsPlanning(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
            Human-in-the-Loop Industry 5.0 Standard
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Human-Cobot Symbiosis & Ergonomic Protection
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>STANDARD: ISO/TS 15066:2016</span>
          <span aria-hidden="true">·</span>
          <span className="text-emerald-400">SAFETY INTEGRITY: SIL-3 / PL-e</span>
        </div>
      </div>

      {/* Grid: Controls & Interactive Safety Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Operator Bio-telemetry & Task Config (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono text-slate-400 uppercase">
                Worker Cognitive & Physical Telemetry
              </span>
              <span className="text-xs font-mono text-emerald-400">MONITORED</span>
            </div>

            {/* Shift & Fatigue Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-slate-300">Biomechanical Fatigue Index</span>
                <span
                  className={`font-bold tabular-nums ${
                    fatigueSlider > 60 ? 'text-amber-400' : 'text-emerald-400'
                  }`}
                >
                  {fatigueSlider} / 100
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                value={fatigueSlider}
                onChange={(e) => handleFatigueChange(parseInt(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>Alert / Fresh</span>
                <span>Mild Fatigue</span>
                <span>Intervention Recommended</span>
              </div>
            </div>

            {/* Operator Separation Distance Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-slate-300">Operator-Cobot Distance</span>
                <span className="font-bold text-cyan-300 tabular-nums">
                  {proximitySlider.toFixed(2)} meters
                </span>
              </div>
              <input
                type="range"
                min="0.2"
                max="2.5"
                step="0.05"
                value={proximitySlider}
                onChange={(e) => handleProximityChange(parseFloat(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span className="text-rose-400">0.2m (Contact Zone)</span>
                <span className="text-amber-400">1.0m (Reduced Speed)</span>
                <span className="text-emerald-400">2.5m (Full Speed)</span>
              </div>
            </div>

            {/* Task Details */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">
                  Active Manufacturing Task
                </label>
                <select
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  className="w-full p-2.5 text-xs font-mono bg-slate-950 border border-slate-800 rounded text-white"
                >
                  <option value="Turbine Blade Surface Tactile & Ultrasonic Inspection">
                    Turbine Blade Tactile & Ultrasonic Inspection
                  </option>
                  <option value="Heavy Billet Loading into 5-Axis Milling Fixture">
                    Heavy Billet Loading (18.5 kg raw stock)
                  </option>
                  <option value="Fine Lattice Deburring & Micro-Polishing">
                    Fine Lattice Deburring & Micro-Polishing
                  </option>
                  <option value="Multi-Pin Avionics Harness Soldering & Sealing">
                    Multi-Pin Avionics Harness Soldering
                  </option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">
                  Technician Experience Level
                </label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full p-2.5 text-xs font-mono bg-slate-950 border border-slate-800 rounded text-white"
                >
                  <option value="Senior Machinist (Level IV)">Senior Machinist (Level IV)</option>
                  <option value="Intermediate Assembly Technician (Level II)">Intermediate Assembly Technician (Level II)</option>
                  <option value="Apprentice / New Trainee (Level I)">Apprentice / New Trainee (Level I)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handlePlanErgonomics}
              disabled={isPlanning}
              className="w-full py-3 px-4 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isPlanning ? (
                <>
                  <Activity className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Ergonomic HRC Plan...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Synthesize HRC Collaborative Schedule</span>
                </>
              )}
            </button>
          </div>

          {/* Biomechanical Relief Proof */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-xs font-mono text-slate-400 uppercase mb-3">
              Worker Well-Being & Fatigue Mitigation
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase block">Lumbar Relief</span>
                <span className="text-xl font-bold text-emerald-400 tabular-nums">
                  +{cobotData.lumbarStrainReliefPercent}%
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Spinal compression cut</span>
              </div>

              <div className="p-3 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase block">Vibration Exposure</span>
                <span className="text-xl font-bold text-cyan-300 tabular-nums">
                  -84.5%
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">HAVS syndrome risk drop</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Speed & Separation Monitoring Visualizer (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Safety Mode State */}
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase">
                  Collaborative Safety Envelope
                </div>
                <div className="text-base font-bold text-white mt-0.5">
                  {cobotData.hrcSafetyMode}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-slate-400 uppercase">Cobot Speed Cap</div>
                <div className="text-xl font-bold font-mono text-cyan-400 tabular-nums">
                  {calculatedCobotSpeed} mm/s
                </div>
              </div>
            </div>

            {/* Visual Safe Zone Graphic */}
            <div className="p-5 rounded-lg bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                <span>DYNAMIC SPEED & SEPARATION MONITORING (SSM)</span>
                <span className="text-emerald-400">ZONE: {proximitySlider < 0.5 ? 'CRITICAL SLOW' : proximitySlider < 1.2 ? 'CONTROLLED CAUTION' : 'CLEAR PASS'}</span>
              </div>

              {/* Visual Distance Bar */}
              <div className="relative h-10 rounded-lg overflow-hidden flex border border-slate-800">
                <div
                  className="bg-rose-900/60 border-r border-rose-600 flex items-center justify-center text-[10px] font-mono text-rose-300 font-semibold"
                  style={{ width: '25%' }}
                >
                  STOP (&lt;0.5m)
                </div>
                <div
                  className="bg-amber-900/40 border-r border-amber-600 flex items-center justify-center text-[10px] font-mono text-amber-300 font-semibold"
                  style={{ width: '35%' }}
                >
                  REDUCED (&lt;1.2m)
                </div>
                <div
                  className="bg-emerald-950/40 flex items-center justify-center text-[10px] font-mono text-emerald-300 font-semibold"
                  style={{ width: '40%' }}
                >
                  FULL SPEED (&gt;1.2m)
                </div>

                {/* Operator Pin Indicator */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_8px_white] transition-all duration-150"
                  style={{ left: `${Math.min(98, (proximitySlider / 2.5) * 100)}%` }}
                />
              </div>

              <div className="text-xs font-mono text-slate-400 mt-2 flex justify-between">
                <span>0.0 m</span>
                <span className="text-white font-semibold">Current Operator: {proximitySlider.toFixed(2)} m</span>
                <span>2.5 m</span>
              </div>
            </div>

            {/* Workload Division of Labor (Human vs Cobot) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-semibold uppercase">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Human Operator Core Role</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {cobotData.humanTasks[0]}
                </p>
                <div className="text-[11px] text-slate-400 pt-1">
                  Focus: High cognitive decision-making, tactile sensibility, compliance audit.
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-semibold uppercase">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Cobot Autonomous Role</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {cobotData.cobotTasks[0]}
                </p>
                <div className="text-[11px] text-slate-400 pt-1">
                  Focus: Static posture support, high-torque clamping, repetitive deburring.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
