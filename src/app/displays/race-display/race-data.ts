export class RaceData {
  sessionType = '';
  isTimedSession = false;
  currentLap = 0;
  totalLaps = 0;
  sessionTimeRemaining = 0;
  position = 0;
  speed = 0;
  gear = 0;
  rpm = 0;
  trackTemp = 0;
  airTemp = 0;
  fuelRemaining = 0;
  brakeBias = 0;
  lastLapTime = 0;
  bestLapTime = 0;
  deltaTime = 0;
  gapBehind = 0;
  driverBehind = ''
  gapAhead = 0;
  driverAhead = '';
  clutchPct = 0;
  throttlePct = 0;
  brakePct = 0;
  pitLimiterOn = false;
  incidents = 0;
  maxIncidents = 0;
  flag: '' | 'yellow' | 'green' | 'blue' | 'white' | 'finish' | 'black' | 'black-orange' | 'red' = '';
}
