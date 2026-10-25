export interface MachineUnit {
  id: string;
  name: string;
  type: 'cnc' | 'cobot' | 'additive' | 'agv';
  status: 'nominal' | 'optimizing' | 'alert' | 'maintenance';
  operator: string;
  currentJob: string;
  loadPercent: number;
  powerKw: number;
  metrics: {
    vibrationMmS: number;
    temperatureC: number;
    spindleOrLaserRpm: number;
    co2KgHr: number;
    noiseDb: number;
  };
  location: { x: number; y: number };
}

export interface ProductionJob {
  id: string;
  partName: string;
  priority: 'CRITICAL' | 'HIGH' | 'ROUTINE';
  machineAssigned: string;
  progressPercent: number;
  quantumOptimized: boolean;
  estDurationMinutes: number;
  carbonScoreKg: number;
  cobotAssisted: boolean;
}

export interface QuantumStateVector {
  bitstring: string;
  probability: number;
  energyCost: number;
}

export interface QAOAState {
  numQubits: number;
  depthP: number;
  gamma: number[];
  beta: number[];
  convergenceCost: number;
  classicalTimeMs: number;
  quantumTimeMs: number;
  speedupFactor: string;
  states: QuantumStateVector[];
  isSimulating: boolean;
}

export interface GenerativeDesignSpec {
  componentName: string;
  material: string;
  weightReduction: number;
  safetyFactor: number;
  process: string;
  topologySummary: string;
  stressAnalysis: {
    maxVonMisesMpa: number;
    yieldStrengthMpa: number;
    safetyFactorCalculated: number;
    highStressZones: string[];
  };
  toolpathStrategy: {
    processType: string;
    spindleSpeedRpm: number;
    feedRateMmMin: number;
    roughingAllowanceMm: number;
    finishingToleranceMm: number;
    estimatedMachiningTimeMin: number;
  };
  gcodeSnippet: string;
  humanFactorNotes: string;
}

export interface CobotErgonomics {
  activeTask: string;
  workerExperience: string;
  fatigueIndex: number; // 0 - 100
  hrcSafetyMode: string;
  cobotSpeedCap: number; // mm/s
  separationDistanceMeters: number;
  lumbarStrainReliefPercent: number;
  isoCompliant: boolean;
  humanTasks: string[];
  cobotTasks: string[];
}

export interface ShopFloorTelemetry {
  gridRenewableMixPercent: number;
  totalFloorPowerKw: number;
  carbonIntensityGramsPerKwh: number;
  dailyAvoidedCarbonKg: number;
  activeMachinistsOnShift: number;
  ergonomicScoreOverall: number;
}
