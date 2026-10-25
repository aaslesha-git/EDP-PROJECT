import { MachineUnit, ProductionJob, QAOAState, GenerativeDesignSpec, CobotErgonomics, ShopFloorTelemetry } from '../types';

export const initialMachines: MachineUnit[] = [
  {
    id: 'CNC-5AX-ALPHA',
    name: '5-Axis High-Speed Machining Center Alpha',
    type: 'cnc',
    status: 'nominal',
    operator: 'Elena Vance (Lead Machinist)',
    currentJob: 'JOB-701: Titanium Turbine Impeller',
    loadPercent: 78,
    powerKw: 18.4,
    metrics: {
      vibrationMmS: 1.12,
      temperatureC: 44.8,
      spindleOrLaserRpm: 14000,
      co2KgHr: 2.1,
      noiseDb: 72.4,
    },
    location: { x: 180, y: 140 },
  },
  {
    id: 'COBOT-CELL-01',
    name: '6-DoF Collaborative Finishing Station 01',
    type: 'cobot',
    status: 'nominal',
    operator: 'Marcus Thorne (Ergonomics Specialist)',
    currentJob: 'JOB-703: Bio-Mimetic Bracket Deburring',
    loadPercent: 62,
    powerKw: 3.2,
    metrics: {
      vibrationMmS: 0.28,
      temperatureC: 32.1,
      spindleOrLaserRpm: 4500,
      co2KgHr: 0.4,
      noiseDb: 58.1,
    },
    location: { x: 440, y: 140 },
  },
  {
    id: 'SLM-3D-METAL',
    name: 'Direct Metal Laser Sintering (DMLS) Unit',
    type: 'additive',
    status: 'nominal',
    operator: 'Dr. Aris Thorne (Materials Scientist)',
    currentJob: 'JOB-702: Lattice Heat Exchanger Core',
    loadPercent: 91,
    powerKw: 24.5,
    metrics: {
      vibrationMmS: 0.05,
      temperatureC: 185.0, // Powder bed temp
      spindleOrLaserRpm: 1070, // Laser wavelength nm
      co2KgHr: 3.8,
      noiseDb: 52.0,
    },
    location: { x: 700, y: 140 },
  },
  {
    id: 'AGV-FLEET-03',
    name: 'Autonomous Guided Vehicle (AGV-03)',
    type: 'agv',
    status: 'nominal',
    operator: 'Autonomous Dispatch (Fleet Q-Route)',
    currentJob: 'TRANSFER: Billets to Cell Alpha',
    loadPercent: 45,
    powerKw: 1.1,
    metrics: {
      vibrationMmS: 0.42,
      temperatureC: 28.4,
      spindleOrLaserRpm: 120, // Wheel RPM
      co2KgHr: 0.1,
      noiseDb: 48.2,
    },
    location: { x: 440, y: 320 },
  },
  {
    id: 'CNC-5AX-BETA',
    name: '5-Axis Precision Milling Center Beta',
    type: 'cnc',
    status: 'nominal',
    operator: 'Devon Reed (Precision Technician)',
    currentJob: 'JOB-704: Hydraulic Valve Manifold',
    loadPercent: 54,
    powerKw: 14.2,
    metrics: {
      vibrationMmS: 1.05,
      temperatureC: 41.6,
      spindleOrLaserRpm: 11500,
      co2KgHr: 1.8,
      noiseDb: 69.8,
    },
    location: { x: 180, y: 320 },
  },
];

export const initialJobs: ProductionJob[] = [
  {
    id: 'JOB-701',
    partName: 'Aerospace Impeller Blisk (Ti-6Al-4V)',
    priority: 'CRITICAL',
    machineAssigned: 'CNC-5AX-ALPHA',
    progressPercent: 68,
    quantumOptimized: true,
    estDurationMinutes: 145,
    carbonScoreKg: 8.4,
    cobotAssisted: true,
  },
  {
    id: 'JOB-702',
    partName: 'Micro-Channel Heat Exchanger Core',
    priority: 'HIGH',
    machineAssigned: 'SLM-3D-METAL',
    progressPercent: 42,
    quantumOptimized: true,
    estDurationMinutes: 380,
    carbonScoreKg: 19.2,
    cobotAssisted: false,
  },
  {
    id: 'JOB-703',
    partName: 'Topological Structural Bracket',
    priority: 'HIGH',
    machineAssigned: 'COBOT-CELL-01',
    progressPercent: 88,
    quantumOptimized: true,
    estDurationMinutes: 65,
    carbonScoreKg: 3.1,
    cobotAssisted: true,
  },
  {
    id: 'JOB-704',
    partName: 'Conformal Hydraulic Manifold Block',
    priority: 'ROUTINE',
    machineAssigned: 'CNC-5AX-BETA',
    progressPercent: 24,
    quantumOptimized: false,
    estDurationMinutes: 110,
    carbonScoreKg: 6.5,
    cobotAssisted: true,
  },
];

export const defaultQAOAState: QAOAState = {
  numQubits: 8,
  depthP: 3,
  gamma: [0.42, 0.78, 1.15],
  beta: [0.65, 0.38, 0.19],
  convergenceCost: -34.82,
  classicalTimeMs: 12450,
  quantumTimeMs: 680,
  speedupFactor: '18.3x',
  states: [
    { bitstring: '|10100101⟩', probability: 0.342, energyCost: -34.82 },
    { bitstring: '|10100110⟩', probability: 0.285, energyCost: -33.15 },
    { bitstring: '|10010101⟩', probability: 0.164, energyCost: -31.40 },
    { bitstring: '|11100001⟩', probability: 0.098, energyCost: -28.90 },
    { bitstring: '|00101101⟩', probability: 0.065, energyCost: -26.10 },
    { bitstring: '|01011010⟩', probability: 0.046, energyCost: -22.40 },
  ],
  isSimulating: false,
};

export const defaultGenerativeSpec: GenerativeDesignSpec = {
  componentName: 'Aerospace Structural Bracket',
  material: 'Ti-6Al-4V Grade 5 Titanium',
  weightReduction: 48,
  safetyFactor: 2.8,
  process: 'Hybrid DMLS Additive + 5-Axis CNC Precision Finish',
  topologySummary: 'Generative bio-mimetic trabecular strut network. Load paths calculated under 14.5 kN multi-axis shear and bending forces. Voronoi porosity distribution eliminates 48% dead mass while raising natural resonant frequency to 410 Hz (avoiding machine spindle chatter bands).',
  stressAnalysis: {
    maxVonMisesMpa: 284.6,
    yieldStrengthMpa: 880.0,
    safetyFactorCalculated: 3.09,
    highStressZones: [
      'Primary mounting lug transition radius',
      'Central diagonal tension strut fork',
      'Lower anchor fastener recess',
    ],
  },
  toolpathStrategy: {
    processType: '5-Axis Adaptive Continuous Trochoidal Milling',
    spindleSpeedRpm: 12800,
    feedRateMmMin: 1950,
    roughingAllowanceMm: 0.65,
    finishingToleranceMm: 0.006,
    estimatedMachiningTimeMin: 38.2,
  },
  gcodeSnippet: `; Q-GEN 5.0 HIGH-EFFICIENCY GENERATIVE PASS
G21 G90 G17 G64 P0.005
T06 M06 (8MM 4-FLUTE SOLID CARBIDE BALL NOSE)
S12800 M03 M08
G00 X-18.420 Y22.150 Z4.000
G01 Z-0.800 F900
G02 X14.200 Y22.150 I16.310 J0.000 F1950
G01 X24.800 Y8.400 Z-1.200
G03 X32.100 Y-6.500 R18.500
G00 Z25.000 M09
M05`,
  humanFactorNotes: 'Operator interaction required only for initial zero-point clamp verification. Automated cobot passes deburr delicate lattice nodes, reducing repetitive wrist vibration by 92%.',
};

export const defaultCobotErgonomics: CobotErgonomics = {
  activeTask: 'Turbine Blade Surface Tactile & Ultrasonic Inspection',
  workerExperience: 'Senior Precision Inspector (Grade IV)',
  fatigueIndex: 32, // Low-moderate
  hrcSafetyMode: 'ISO/TS 15066 Power and Force Limiting (PFL)',
  cobotSpeedCap: 250, // mm/s
  separationDistanceMeters: 1.25,
  lumbarStrainReliefPercent: 64,
  isoCompliant: true,
  humanTasks: [
    'Tactile defect sensory confirmation',
    'Cognitive sign-off on conformal deviations',
    'Customized torque wrench quality stamp',
  ],
  cobotTasks: [
    'Heavy fixture stabilization (16.2 kg holding force)',
    'High-resolution stereoscopic 3D optical scan',
    'Automated micro-rotational part indexing',
  ],
};

export const defaultShopTelemetry: ShopFloorTelemetry = {
  gridRenewableMixPercent: 86.4,
  totalFloorPowerKw: 61.4,
  carbonIntensityGramsPerKwh: 42.0,
  dailyAvoidedCarbonKg: 184.2,
  activeMachinistsOnShift: 4,
  ergonomicScoreOverall: 94.2,
};
