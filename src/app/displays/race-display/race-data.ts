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

export class RaceData {
  isTimedSession = false;
  completedLaps = 0;
  totalLaps = 0;
  sessionTimeRemaining = 0;
  position = 0;
  numberOfCars = 0;
  speed = 0;
  gear = 0;
  rpm = 0;
  rpmMax = 0;
  flag = Flag.None;
  trackTemp = 0;
  airTemp = 0;
  fuel = 0;
  fuelPerLap = 0;
  // Tyres temperatures [LF, RF, LR, RR]
  tyreTemps = [0, 0, 0, 0];
  // Tyres pressures [LF, RF, LR, RR]
  tyrePressures = [0, 0, 0, 0];
  // Brake temperatures [LF, RF, LR, RR]
  brakeTemps = [0, 0, 0, 0];
  tcLevel = 0;
  absLevel = 0;
  engineMapping = 0;
  brakeBias = 0;
  //Current laptime in milliseconds
  currentLapTime = 0;
  // Estimated laptime in milliseconds
  estimatedLapTime = 0;
  // Last laptime in milliseconds
  lastLapTime = 0;
  // Best laptime in milliseconds
  bestLapTime = 0;
  // Delta time in milliseconds
  deltaTime = 0;
  // Gap behind in milliseconds
  gapBehind = 0;
  // Gap ahead in milliseconds
  gapAhead = 0;
}
