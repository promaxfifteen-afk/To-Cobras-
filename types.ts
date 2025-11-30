export interface SensitivityData {
  general: number;
  redDot: number;
  scope2x: number;
  scope4x: number;
  sniperScope: number;
  freeLook: number;
}

export interface Preset {
  id: string;
  name: string;
  description: string;
  data: SensitivityData;
}

export enum PlayStyle {
  RUSHER = "Rusher (Aggressive)",
  SNIPER = "Sniper (Passive)",
  SUPPORT = "Support (Tactical)",
  BALANCED = "Balanced (All-rounder)"
}

export type GenerationStatus = 'idle' | 'loading' | 'success' | 'error';