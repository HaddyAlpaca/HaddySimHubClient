import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, tap } from 'rxjs';
import { TelemetryService } from 'src/app/shared/services';
import { TelemetryType } from 'src/app/shared/services/telemetry.service';
import { Flag, RaceData } from './race-data';

interface EssentialData {
  gear: number;
  speed: number;
  rpm: number;
  rpmMax: number;
  position: number;
  completedLaps: number;
  flag: Flag;
}

@UntilDestroy()
@Component({
  selector: 'app-race-essentials',
  templateUrl: './race-essentials.component.html',
  styleUrls: ['./race-essentials.component.css']
})
export class RaceEssentialsComponent implements OnInit {
  private readonly rpmMiddleRangePct = 75;
  private readonly rpmHighRangePct = 90;

  private _data: EssentialData = {
    gear: 0,
    speed: 0,
    rpm: 89,
    rpmMax: 100,
    position: 0,
    completedLaps: 0,
    flag: Flag.None
  };
  get data(): EssentialData {
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

  ngOnInit(): void {
    this._telemetryService.telemetry$.pipe(
      filter(update => update.Type === TelemetryType.Race),
      tap(update => this._data = update.Data as RaceData),
      untilDestroyed(this))
      .subscribe();
  }

  constructor(private _telemetryService: TelemetryService) {}
}
