import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';
import { Flag, RaceData } from './race-data';
import { ClockService } from 'src/app/services/clock.service';
import { GameDataService } from 'src/app/services/game-data.service';

@UntilDestroy()
@Component({
  selector: 'app-race-display',
  templateUrl: 'race-display.component.html',
  styleUrls: ['race-display.component.css'],
  standalone: true
})
export class RaceDisplayComponent implements OnInit {
  private readonly rpmMiddleRangePct = 75;
  private readonly rpmHighRangePct = 90;

  private _data: RaceData = new RaceData();
  get data(): RaceData {
    return this._data;
  }

  get rpmPercentage(): number {
    if (this._data.rpmMax === 0) return 0;

    return Math.round(this._data.rpm / this._data.rpmMax * 100);
  }

  get rpmFillColor(): string {
    if (this.rpmPercentage >= 90) return 'red';
    if (this.rpmPercentage >= this.rpmMiddleRangePct) return 'green';

    return 'white';
  }

  get rpmLabelColor(): string {
    return this.rpmPercentage >= this.rpmMiddleRangePct ? 'white' : 'black';
  }

  get flagColor(): string {

    switch(this._data.flag) {
      case Flag.Green:
        return 'green';
      default:
        return 'transparent';
    }
  }

  private _currentTime = new Date();
  public get currentTime(): Date {
    return this._currentTime;
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
      tap(data => this._data = data),
      untilDestroyed(this)
    ).subscribe();
  }
}
