import React, { useState } from 'react';
import { MachineUnit, ProductionJob } from '../types';
import { AlertTriangle, CheckCircle, RefreshCw, Activity, ShieldAlert, Cpu, Wrench } from 'lucide-react';

interface DigitalTwinFloorProps {
  machines: MachineUnit[];
  setMachines: React.Dispatch<React.SetStateAction<MachineUnit[]>>;
  jobs: ProductionJob[];
}

export const DigitalTwinFloor: React.FC<DigitalTwinFloorProps> = ({
  machines,
  setMachines,
  jobs,
}) => {
  const [selectedMachineId, setSelectedMachineId] = useState<string>('CNC-5AX-ALPHA');
  const [isDiagnosing, setIsDiagnosing] = useState<boolean>(false);
  const [diagnosticResult, setDiagnosticResult] = useState<any>(null);
  const [filterType, setFilterType] = useState<string>('all');

  const selectedMachine = machines.find((m) => m.id === selectedMachineId) || machines[0];

  // Inject real physical anomaly
  const handleInjectAnomaly = (machineId: string, anomalyType: string) => {
    setMachines((prev) =>
      prev.map((m) => {
        if (m.id !== machineId) return m;
        if (anomalyType === 'chatter') {
          return {
            ...m,
            status: 'alert',
            metrics: {
              ...m.metrics,
              vibrationMmS: 4.85,
              temperatureC: 81.4,
              noiseDb: 89.2,
            },
          };
        } else if (anomalyType === 'proximity') {
          return {
            ...m,
            status: 'alert',
            metrics: {
              ...m.metrics,
              vibrationMmS: 0.85,
              temperatureC: 48.0,
              noiseDb: 64.0,
            },
          };
        } else if (anomalyType === 'thermal') {
          return {
            ...m,
            status: 'alert',
            metrics: {
              ...m.metrics,
              temperatureC: 94.2,
              co2KgHr: 4.9,
            },
          };
        }
        return m;
      })
    );
    setSelectedMachineId(machineId);
    setDiagnosticResult(null);
  };

  // Reset machine to nominal state
  const handleResetMachine = (machineId: string) => {
    setMachines((prev) =>
      prev.map((m) => {
        if (m.id !== machineId) return m;
        return {
          ...m,
          status: 'nominal',
          metrics: {
            ...m.metrics,
            vibrationMmS: m.type === 'cnc' ? 1.12 : m.type === 'cobot' ? 0.28 : 0.05,
            temperatureC: m.type === 'additive' ? 185.0 : m.type === 'cnc' ? 44.0 : 32.0,
            noiseDb: m.type === 'cnc' ? 72.0 : 58.0,
          },
        };
      })
    );
    setDiagnosticResult(null);
  };

  // Run Gemini Root Cause AI
  const handleRunDiagnosis = async () => {
    setIsDiagnosing(true);
    setDiagnosticResult(null);

    try {
      const response = await fetch('/api/gemini/root-cause-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          machineId: selectedMachine.id,
          anomalyType:
            selectedMachine.metrics.vibrationMmS > 2.5
              ? 'Spindle chatter vibration harmonic spike'
              : 'Thermal gradient deviation across build plate',
          sensorReadings: {
            vibration: `${selectedMachine.metrics.vibrationMmS} mm/s`,
            temperature: `${selectedMachine.metrics.temperatureC} C`,
            noise: `${selectedMachine.metrics.noiseDb} dB`,
            load: `${selectedMachine.loadPercent}%`,
          },
        }),
      });

      const data = await response.json();
      if (data.data) {
        setDiagnosticResult(data.data);
      }
    } catch (err) {
      console.error('Diagnosis failed:', err);
    } finally {
      setIsDiagnosing(false);
    }
  };

  const filteredMachines =
    filterType === 'all' ? machines : machines.filter((m) => m.type === filterType);

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
            Cyber-Physical Floor Architecture
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Shop Floor Digital Twin & Machine Telemetry
          </h2>
        </div>

        {/* Interactive Segmented Filter Controls */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
          {['all', 'cnc', 'cobot', 'additive', 'agv'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md uppercase transition-colors whitespace-nowrap ${
                filterType === type
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {type === 'all' ? 'All Units' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Layout: Floor Stage & Machine Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Factory Floor Grid (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-slate-400 uppercase">
                Synchronized Cell Coordinates (ISO 23247 Digital Twin)
              </span>
              <span className="text-xs font-mono text-emerald-400 tabular-nums">
                5 SENSORY NODES ACTIVE
              </span>
            </div>

            {/* Interactive Schematic Map of Cells */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredMachines.map((machine) => {
                const isSelected = machine.id === selectedMachineId;
                const isAlert = machine.status === 'alert';

                return (
                  <button
                    key={machine.id}
                    onClick={() => {
                      setSelectedMachineId(machine.id);
                      setDiagnosticResult(null);
                    }}
                    className={`p-4 rounded-lg text-left transition-all border ${
                      isSelected
                        ? 'border-cyan-400 bg-slate-800/90 shadow-md ring-1 ring-cyan-400/30'
                        : isAlert
                        ? 'border-rose-600/70 bg-rose-950/20 hover:border-rose-500'
                        : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-xs font-mono text-slate-400 truncate max-w-[150px]">
                        {machine.id}
                      </div>
                      <div className="text-xs font-mono">
                        {isAlert ? (
                          <span className="text-rose-400 font-semibold">▲ ALERT</span>
                        ) : (
                          <span className="text-emerald-400">● NOMINAL</span>
                        )}
                      </div>
                    </div>

                    <div className="text-sm font-semibold text-white mb-2 leading-tight">
                      {machine.name}
                    </div>

                    <div className="text-xs text-slate-400 truncate mb-3">
                      {machine.currentJob}
                    </div>

                    {/* Sensor Micro-Gauges */}
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-[11px] font-mono">
                      <div>
                        <div className="text-slate-400 text-[9px] uppercase">Vibration</div>
                        <div
                          className={`font-semibold tabular-nums ${
                            machine.metrics.vibrationMmS > 2.0
                              ? 'text-rose-400 font-bold'
                              : 'text-slate-200'
                          }`}
                        >
                          {machine.metrics.vibrationMmS.toFixed(2)} mm/s
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-[9px] uppercase">Temp</div>
                        <div
                          className={`font-semibold tabular-nums ${
                            machine.metrics.temperatureC > 75
                              ? 'text-rose-400 font-bold'
                              : 'text-slate-200'
                          }`}
                        >
                          {machine.metrics.temperatureC.toFixed(1)}°C
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-[9px] uppercase">Power</div>
                        <div className="font-semibold text-slate-200 tabular-nums">
                          {machine.powerKw.toFixed(1)} kW
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Anomaly Injection Bar */}
            <div className="mt-6 pt-5 border-t border-slate-800">
              <div className="text-xs font-mono text-slate-400 uppercase mb-3 flex items-center justify-between">
                <span>Physical Perturbation & Resilience Testing</span>
                <span className="text-[11px] text-slate-400">Select machine & inject disturbance</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleInjectAnomaly('CNC-5AX-ALPHA', 'chatter')}
                  className="px-3 py-1.5 text-xs font-medium text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/80 rounded transition-colors whitespace-nowrap"
                >
                  Inject Spindle Chatter (Alpha)
                </button>
                <button
                  onClick={() => handleInjectAnomaly('COBOT-CELL-01', 'proximity')}
                  className="px-3 py-1.5 text-xs font-medium text-amber-300 bg-amber-950/40 hover:bg-amber-900/60 border border-amber-800/80 rounded transition-colors whitespace-nowrap"
                >
                  Inject Worker Proximity Stop (Cobot)
                </button>
                <button
                  onClick={() => handleInjectAnomaly('SLM-3D-METAL', 'thermal')}
                  className="px-3 py-1.5 text-xs font-medium text-amber-300 bg-amber-950/40 hover:bg-amber-900/60 border border-amber-800/80 rounded transition-colors whitespace-nowrap"
                >
                  Inject Powder Thermal Drift (SLM)
                </button>
                <button
                  onClick={() => handleResetMachine(selectedMachine.id)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded transition-colors flex items-center gap-1.5 whitespace-nowrap ml-auto"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset Selected Unit
                </button>
              </div>
            </div>
          </div>

          {/* Active Job Dispatch Queue */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-400 uppercase">
                Active Job-Shop Queue
              </span>
              <span className="text-xs font-mono text-cyan-400">
                QAOA SCHEDULE OPTIMIZED
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono">
                    <th className="pb-2">Job ID</th>
                    <th className="pb-2">Component</th>
                    <th className="pb-2">Machine</th>
                    <th className="pb-2 text-right">Duration</th>
                    <th className="pb-2 text-right">Carbon</th>
                    <th className="pb-2 text-right">Progress</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-2.5 font-semibold text-slate-200">{job.id}</td>
                      <td className="py-2.5 text-slate-300 font-sans">{job.partName}</td>
                      <td className="py-2.5 text-slate-400">{job.machineAssigned}</td>
                      <td className="py-2.5 text-right text-slate-300 tabular-nums">
                        {job.estDurationMinutes}m
                      </td>
                      <td className="py-2.5 text-right text-emerald-400 tabular-nums">
                        {job.carbonScoreKg} kg
                      </td>
                      <td className="py-2.5 text-right">
                        <span className="text-cyan-300 font-bold tabular-nums">
                          {job.progressPercent}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Selected Unit Deep Telemetry & Gemini AI Remediation (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div>
                <div className="text-xs font-mono text-cyan-400 uppercase">Selected Node</div>
                <div className="text-lg font-bold text-white">{selectedMachine.name}</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-slate-400 uppercase">Unit Status</div>
                <div className="font-mono text-sm font-semibold">
                  {selectedMachine.status === 'alert' ? (
                    <span className="text-rose-400">▲ ALERT</span>
                  ) : (
                    <span className="text-emerald-400">● NOMINAL</span>
                  )}
                </div>
              </div>
            </div>

            {/* Operator Ergonomic Metadata */}
            <div className="mb-4 text-xs text-slate-300">
              <span className="text-slate-400">Assigned Technician: </span>
              <span className="font-medium text-white">{selectedMachine.operator}</span>
            </div>

            {/* Key Telemetry Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Vibration Amplitude (RMS)</span>
                <span
                  className={`font-bold tabular-nums ${
                    selectedMachine.metrics.vibrationMmS > 2.0 ? 'text-rose-400' : 'text-white'
                  }`}
                >
                  {selectedMachine.metrics.vibrationMmS.toFixed(2)} mm/s
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    selectedMachine.metrics.vibrationMmS > 2.0 ? 'bg-rose-500' : 'bg-cyan-500'
                  }`}
                  style={{
                    width: `${Math.min(100, (selectedMachine.metrics.vibrationMmS / 5.0) * 100)}%`,
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-xs font-mono pt-1">
                <span className="text-slate-400">Spindle/Process Temp</span>
                <span
                  className={`font-bold tabular-nums ${
                    selectedMachine.metrics.temperatureC > 75 ? 'text-rose-400' : 'text-white'
                  }`}
                >
                  {selectedMachine.metrics.temperatureC.toFixed(1)} °C
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    selectedMachine.metrics.temperatureC > 75 ? 'bg-rose-500' : 'bg-amber-400'
                  }`}
                  style={{
                    width: `${Math.min(100, (selectedMachine.metrics.temperatureC / 120.0) * 100)}%`,
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-xs font-mono pt-1">
                <span className="text-slate-400">Spindle Speed / Dynamics</span>
                <span className="font-bold text-white tabular-nums">
                  {selectedMachine.metrics.spindleOrLaserRpm.toLocaleString()} RPM
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-mono pt-1">
                <span className="text-slate-400">Acoustic Pressure</span>
                <span className="font-bold text-slate-300 tabular-nums">
                  {selectedMachine.metrics.noiseDb} dBA
                </span>
              </div>
            </div>

            {/* Trigger Diagnostic AI Button */}
            <button
              onClick={handleRunDiagnosis}
              disabled={isDiagnosing}
              className={`w-full py-3 px-4 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${
                selectedMachine.status === 'alert'
                  ? 'bg-rose-600 hover:bg-rose-500 text-white'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
              }`}
            >
              {isDiagnosing ? (
                <>
                  <Activity className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Multi-Modal Root Cause...</span>
                </>
              ) : (
                <>
                  <Cpu className="w-4 h-4" />
                  <span>
                    {selectedMachine.status === 'alert'
                      ? 'Diagnose Anomaly & Run QAOA Re-Scheduler'
                      : 'Run Preventative Health Diagnostic'}
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Diagnostic & Remediation Output Card */}
          {diagnosticResult && (
            <div className="p-6 rounded-xl bg-slate-900 border border-cyan-800/60 shadow-lg space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-mono text-cyan-400 uppercase">
                    Root Cause Diagnosis
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">
                    {diagnosticResult.rootCauseTitle}
                  </h3>
                </div>
                <span className="text-xs font-mono text-emerald-400 tabular-nums">
                  CONFIDENCE: {(diagnosticResult.confidenceScore * 100).toFixed(0)}%
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                {diagnosticResult.physicalExplanation}
              </div>

              {/* Immediate Operator Guidance (Industry 5.0 Human-Centric) */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 font-semibold uppercase">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Immediate Technician Action</span>
                </div>
                <p className="text-xs text-slate-200 bg-amber-950/20 p-2.5 rounded border border-amber-900/40">
                  {diagnosticResult.immediateOperatorAction}
                </p>
              </div>

              {/* Quantum Adaptive Rescheduling */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-semibold uppercase">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Quantum Rescheduling Mitigation</span>
                </div>
                <p className="text-xs text-slate-300 bg-cyan-950/20 p-2.5 rounded border border-cyan-900/40">
                  {diagnosticResult.quantumAdaptiveRescheduling}
                </p>
              </div>

              {/* Safety & Ergonomics Risk */}
              <div className="text-xs text-slate-400 font-mono pt-2 border-t border-slate-800">
                <span className="text-slate-400 font-semibold">ISO Safety Assessment: </span>
                {diagnosticResult.safetyRiskToHuman}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
