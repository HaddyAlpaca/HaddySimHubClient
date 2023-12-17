export class RaceData {
  sessionType = '';
  IsLimitedTime = false;
  isLimitedSessionLaps = false;
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
  currentLapTime = 0;
  lastLapTime = 0;
  lastLapTimeDelta = 0;
  bestLapTime = 0;
  bestLapTimeDelta = 0;
  gapBehind = 0;
  driverBehindName = ''
  gapAhead = 0;
  driverAheadName = '';
  clutchPct = 0;
  throttlePct = 0;
  brakePct = 0;
  pitLimiterOn = false;
  incidents = 0;
  maxIncidents = 0;
  flag: '' | 'yellow' | 'green' | 'blue' | 'white' | 'finish' | 'black' | 'black-orange' | 'red' = '';
}
