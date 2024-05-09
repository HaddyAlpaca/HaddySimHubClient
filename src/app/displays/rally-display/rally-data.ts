export interface SectorSplit {
  sector: number;
  time: number;
  delta: number;
}

export class RallyData {
  speed = 0;
  gear = 0;
  rpm = 0;
  stageCompletedPct = 0;
  sectors: Array<SectorSplit> = [];
}
