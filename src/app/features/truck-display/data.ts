export enum GearRange {
  Low,
  High
}

export type TruckData = {
  destination: string;
  distanceRemaining: number;
  timeRemaining: number;
  timeRemainingIrl: number;
  time: Date;
  restTimeRemaining: number;
  restTimeRemainingIrl: number;
  fuelPercentage: number;
  fuelDistance: number;
  jobTimeRemaining: number;
  jobTimeRemainingIrl: number;
  jobIncome: number;
  speed: number;
  speedLimit: number;
  rpm: number;
  rpmMax: number;
  cruiseControlOn: boolean;
  cruiseControlSpeed: number;
  gear: number;
  gearRange: GearRange;
  lowBeamOn: boolean;
  highBeamOn: boolean;
  parkingBrakeOn: boolean;
  batteryWarningOn: boolean;
}

