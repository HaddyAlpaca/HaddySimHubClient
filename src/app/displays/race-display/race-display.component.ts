import { ChangeDetectionStrategy, Component, ViewEncapsulation, effect } from '@angular/core';
import { RaceData } from './race-data';
import { CommonModule } from '@angular/common';
import { DeltaTimePipe } from './pipes/delta-time/delta-time.pipe';
import { LapTimePipe } from './pipes/laptime/laptime.pipe';
import { TimespanPipe } from './pipes/timespan/timespan.pipe';
import { IRatingPipe } from './pipes/irating/irating.pipe';
import { TrackPositionsComponent } from './track-positions.component';
import { DisplayComponent } from '../display.component';
import { SpeedometerComponent } from 'src/app/components/speedometer/speedometer.component';
import { DataElementComponent } from 'src/app/components/data-element/data-element.component';

@Component({
  selector: 'app-race-display',
  templateUrl: 'race-display.component.html',
  styleUrl: 'race-display.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    DeltaTimePipe,
    LapTimePipe,
    TimespanPipe,
    IRatingPipe,
    TrackPositionsComponent,
    SpeedometerComponent,
    DataElementComponent,
  ],
})
export class RaceDisplayComponent extends DisplayComponent<RaceData> {
  protected override checkDataType(data: unknown): boolean {
    return (data as RaceData).gear !== undefined;
  }

  protected override createDefaultData(): RaceData {
    return new RaceData();
  }
  private _lastGapBehind = 0;
  private _lastGapAhead = 0;

  private _gapBehindDelta = 0;
  public get gapBehindDelta(): number {
    return this._gapBehindDelta;
  }

  private _gapAheadDelta = 0;
  public get gapAheadDelta(): number {
    return this._gapAheadDelta;
  }

  constructor() {
    super();

    effect(() => {
      const data = this.data();

      this._gapBehindDelta = data.driverBehindDelta - this._lastGapBehind;
      this._lastGapBehind = data.driverBehindDelta;
      this._gapAheadDelta = data.driverAheadDelta - this._lastGapAhead;
      this._lastGapAhead = data.driverAheadDelta;
    });
  }
}
