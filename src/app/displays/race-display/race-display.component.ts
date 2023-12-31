import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { RaceData } from './race-data';
import { ClockService } from 'src/app/services/clock.service';
import { GameDataService } from 'src/app/services/game-data.service';
import { CommonModule } from '@angular/common';
import { DeltaTimePipe } from './pipes/delta-time/delta-time.pipe';
import { GearPipe } from './pipes/gear/gear.pipe';
import { LapTimePipe } from './pipes/laptime/laptime.pipe';
import { TimespanPipe } from './pipes/timespan/timespan.pipe';
import { InputsTraceComponent } from './inputs-trace.component';
import { tap } from 'rxjs';
import { IRatingPipe } from './pipes/irating/irating.pipe';
import { TrackPositionsComponent } from './track-positions.component';

@UntilDestroy()
@Component({
  selector: 'app-race-display',
  templateUrl: 'race-display.component.html',
  styleUrl: 'race-display.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    DeltaTimePipe,
    GearPipe,
    LapTimePipe,
    TimespanPipe,
    InputsTraceComponent,
    IRatingPipe,
    TrackPositionsComponent,
  ],
})
export class RaceDisplayComponent implements OnInit {
  // @ViewChild(InputsTraceComponent) private _inputsTrace!: InputsTraceComponent;

  private _lastGapBehind = 0;
  private _lastGapAhead = 0;

  private _data: RaceData = new RaceData();
  get data(): RaceData {
    return this._data;
  }

  private _currentTime = new Date();
  public get currentTime(): Date {
    return this._currentTime;
  }

  private _gapBehindDelta = 0;
  public get gapBehindDelta(): number {
    return this._gapBehindDelta;
  }

  private _gapAheadDelta = 0;
  public get gapAheadDelta(): number {
    return this._gapAheadDelta;
  }

  constructor(
    private _gameDataService: GameDataService,
    private _clockService: ClockService,
  ) {
    this._clockService.getCurrentTime().pipe(
      tap((time) => this._currentTime = time),
    ).subscribe();
  }
  ngOnInit(): void {
    this._gameDataService.raceData$.pipe(
      tap(data => {
        this._gapBehindDelta = data.driverBehindDelta - this._lastGapBehind;
        this._lastGapBehind = data.driverBehindDelta;
        this._gapAheadDelta = data.driverAheadDelta - this._lastGapAhead;
        this._lastGapAhead = data.driverAheadDelta;
        this._data = data;
      }),
      untilDestroyed(this),
    ).subscribe();
  }
}
