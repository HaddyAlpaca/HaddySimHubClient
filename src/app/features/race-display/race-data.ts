export enum Flag {
  None,
  Green,
  Blue,
  Yellow,
  Red,
  BlackAndOrange,
  Black,
  White,
  Chequered
}

export enum GripLevel {
  Unknown,
  Green,
  Fast,
  Optimum,
  Greasy,
  Damp,
  Wet,
  Flooded
}

export enum WeatherType {
  Unknown,
  Dry,
  Drizzle,
  LightRain,
  MediumRain,
  HeavyRain,
  Thunderstorm
}

export interface RaceData {
  isTimedSession: boolean;
  completedLaps: number;
  totalLaps: number;
  sessionTimeRemaining: number;
  position: number;
  numberOfCars: number;
  speed: number;
  gear: number;
  rpm: number;
  rpmMax: number;
  gripLevel: GripLevel;
  flag: Flag;
  weatherType: WeatherType;
  trackTemp: number;
  airTemp: number;
  fuel: number;
  fuelPerLap: number;
  // Tyres temperatures [LF, RF, LR, RR]
  tyreTemps: number[];
  // Tyres pressures [LF, RF, LR, RR]
  tyrePressures: number[];
  // Brake temperatures [LF, RF, LR, RR]
  brakeTemps: number[];
  tcLevel: number;
  absLevel: number;
  engineMapping: number;
  brakeBias: number;
  //Current laptime in milliseconds
  currentLapTime: number;
  // Estimated laptime in milliseconds
  estimatedLapTime: number;
  // Last laptime in milliseconds
  lastLapTime: number;
  // Best laptime in milliseconds
  bestLapTime: number;
  // Delta time in milliseconds
  deltaTime: number;
  // Gap behind in milliseconds
  gapBehind: number;
  // Gap ahead in milliseconds
  gapAhead: number;
}
