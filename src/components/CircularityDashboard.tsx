import React, { useState } from 'react';
import { ShopFloorTelemetry } from '../types';
import { Leaf, Sun, Wind, Recycle, TrendingDown, CheckCircle } from 'lucide-react';

interface CircularityDashboardProps {
  telemetry: ShopFloorTelemetry;
}

export const CircularityDashboard: React.FC<CircularityDashboardProps> = ({ telemetry }) => {
  const [shiftHours, setShiftHours] = useState<number>(8);
  const [recycledFeedstockRatio, setRecycledFeedstockRatio] = useState<number>(78);

  const solarPeakHour = 13.0; // 1:00 PM
  const calculatedAvoidedEmissions = ((telemetry.dailyAvoidedCarbonKg * (recycledFeedstockRatio / 70))).toFixed(1);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
            Industry 5.0 Sustainability & Circular Manufacturing
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Net-Zero Microgrid & Closed-Loop Swarf Circularity
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>STANDARD: GHG PROTOCOL SCOPE 1 & 2</span>
          <span aria-hidden="true">·</span>
          <span className="text-emerald-400">STATUS: NET-POSITIVE READY</span>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase">
            <span>Renewable Mix</span>
            <Sun className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">
            {telemetry.gridRenewableMixPercent.toFixed(1)}%
          </div>
          <p className="text-xs text-slate-400">On-site solar array + regional wind</p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase">
            <span>Floor Load</span>
            <Wind className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-cyan-300 tabular-nums">
            {telemetry.totalFloorPowerKw.toFixed(1)} kW
          </div>
          <p className="text-xs text-slate-400">5 synchronized manufacturing cells</p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase">
            <span>Avoided CO2eq</span>
            <TrendingDown className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
            {calculatedAvoidedEmissions} kg
          </div>
          <p className="text-xs text-slate-400">QAOA renewable schedule shifting</p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase">
            <span>Swarf Recycled</span>
            <Recycle className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">
            {recycledFeedstockRatio}%
          </div>
          <p className="text-xs text-slate-400">Closed-loop titanium swarf briquetting</p>
        </div>
      </div>

      {/* Grid: Microgrid Solar Alignment Curve (7 cols) + Swarf Reintegration (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Renewable Peak Shifting */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono text-slate-400 uppercase">
                QAOA Load Shifting vs Solar Generation Profile
              </span>
              <span className="text-xs font-mono text-emerald-400">92% RENEWABLE CAPTURE</span>
            </div>

            {/* Microgrid Schedule Bar Visualizer */}
            <div className="space-y-4">
              <div className="text-xs font-mono text-slate-300">
                Machine Operations Shuffled into Peak Renewable Windows (09:00 - 15:00)
              </div>

              {/* 24-Hour Time Ribbon */}
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                <div className="flex justify-between text-[11px] text-slate-400 pb-1 border-b border-slate-800">
                  <span>06:00</span>
                  <span>09:00</span>
                  <span className="text-amber-400 font-bold">12:00 (Solar Peak)</span>
                  <span>15:00</span>
                  <span>18:00</span>
                  <span>21:00</span>
                </div>

                {/* Machine 1: CNC Alpha */}
                <div className="flex items-center gap-3">
                  <span className="w-24 text-slate-400 text-[11px] truncate">CNC Alpha</span>
                  <div className="flex-1 h-5 bg-slate-900 rounded relative overflow-hidden">
                    <div
                      className="absolute top-0 bottom-0 bg-cyan-500/80 rounded border border-cyan-400 text-[10px] text-slate-950 font-bold flex items-center justify-center"
                      style={{ left: '25%', width: '40%' }}
                    >
                      Ti Roughing (Peak Solar)
                    </div>
                  </div>
                </div>

                {/* Machine 2: SLM Sintering */}
                <div className="flex items-center gap-3">
                  <span className="w-24 text-slate-400 text-[11px] truncate">SLM 3D</span>
                  <div className="flex-1 h-5 bg-slate-900 rounded relative overflow-hidden">
                    <div
                      className="absolute top-0 bottom-0 bg-amber-500/80 rounded border border-amber-400 text-[10px] text-slate-950 font-bold flex items-center justify-center"
                      style={{ left: '15%', width: '60%' }}
                    >
                      Quad-Laser Additive Build
                    </div>
                  </div>
                </div>

                {/* Machine 3: Cobot Cell */}
                <div className="flex items-center gap-3">
                  <span className="w-24 text-slate-400 text-[11px] truncate">Cobot 01</span>
                  <div className="flex-1 h-5 bg-slate-900 rounded relative overflow-hidden">
                    <div
                      className="absolute top-0 bottom-0 bg-emerald-500/80 rounded border border-emerald-400 text-[10px] text-slate-950 font-bold flex items-center justify-center"
                      style={{ left: '45%', width: '30%' }}
                    >
                      Deburring & Inspection
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {"The QAOA scheduler formulates a carbon penalty term λ_carbon · E_grid(t) inside the cost Hamiltonian, ensuring heavy 18 kW cutting operations are scheduled strictly when on-site rooftop photovoltaics generate surplus zero-emission power."}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Circular Swarf Atomization */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono text-slate-400 uppercase">
                Closed-Loop Swarf Metallurgy
              </span>
              <span className="text-xs font-mono text-cyan-400">CIRCULAR LCA</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-slate-300">Recycled Scrap Swarf Ratio</span>
                <span className="font-bold text-cyan-400 tabular-nums">
                  {recycledFeedstockRatio}%
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="95"
                value={recycledFeedstockRatio}
                onChange={(e) => setRecycledFeedstockRatio(parseInt(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Circular Cycle Breakdown */}
            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 rounded bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">CNC Cutting Swarf Generated</span>
                <span className="font-bold text-white tabular-nums">42.8 kg / shift</span>
              </div>
              <div className="p-3 rounded bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Ultrasonic Degreased & Briquetted</span>
                <span className="font-bold text-emerald-400 tabular-nums">41.2 kg (96.2%)</span>
              </div>
              <div className="p-3 rounded bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Plasma Atomized into SLM Powder</span>
                <span className="font-bold text-cyan-300 tabular-nums">39.8 kg Re-injected</span>
              </div>
            </div>

            <div className="p-3 rounded bg-emerald-950/20 border border-emerald-900/40 text-xs text-emerald-300">
              <div className="font-semibold mb-1">Cradle-to-Gate Carbon Savings:</div>
              Virgin titanium extraction emits 38 kg CO2/kg. Closed-loop swarf recycling emits just 3.2 kg CO2/kg—a 91.5% lifecycle decarbonization.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
