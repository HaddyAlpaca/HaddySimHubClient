import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';
import { RaceData } from './race-data';
import { ClockService } from 'src/app/services/clock.service';
import { GameDataService } from 'src/app/services/game-data.service';
import { CommonModule } from '@angular/common';
import { DeltaTimePipe } from './pipes/delta-time/delta-time.pipe';
import { GearPipe } from './pipes/gear/gear.pipe';
import { LapTimePipe } from './pipes/laptime/laptime.pipe';
import { TimespanPipe } from './pipes/timespan/timespan.pipe';

@UntilDestroy()
@Component({
  selector: 'app-race-display',
  templateUrl: 'race-display.component.html',
  styleUrls: ['race-display.component.css'],
  standalone: true,
  imports: [CommonModule, DeltaTimePipe, GearPipe, LapTimePipe, TimespanPipe]
})
export class RaceDisplayComponent implements OnInit {
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
    private _clockService: ClockService
  ) {
    this._clockService.getCurrentTime().pipe(
      tap((time) => this._currentTime = time)
    ).subscribe();
  }

  ngOnInit(): void {
    this._gameDataService.raceData$.pipe(
      tap(data => {
        this._gapBehindDelta = data.gapBehind - this._lastGapBehind;
        this._lastGapBehind = data.gapBehind;
        this._gapAheadDelta = data.gapAhead - this._lastGapAhead;
        this._lastGapAhead = data.gapAhead;
        this._data = data;
      }),
      untilDestroyed(this)
    ).subscribe();
  }
}
