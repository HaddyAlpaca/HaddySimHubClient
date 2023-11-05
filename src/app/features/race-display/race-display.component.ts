import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, tap } from 'rxjs';
import { TelemetryService } from 'src/app/shared/services';
import { TelemetryType } from 'src/app/shared/services/telemetry.service';
import { RaceData } from './race-data';

@UntilDestroy()
@Component({
  selector: 'app-race-display',
  templateUrl: 'race-display.component.html',
  styleUrls: ['race-display.component.css']
})
export class RaceDisplayComponent implements OnInit {
  private _data: RaceData = new RaceData();
  get data(): RaceData {
    return this._data;
  }

  get fuelLapsRemaining(): number | null {
    return this._data.fuelPerLap === 0 ? null : this._data.fuel / this._data.fuelPerLap;
  }

  constructor(private _telemetryService: TelemetryService) {}

  ngOnInit(): void {
    this._telemetryService.telemetry$.pipe(
      filter(update => update.Type === TelemetryType.Race),
      tap(update => this._data = update.Data as RaceData),
      untilDestroyed(this))
      .subscribe();
  }
}
