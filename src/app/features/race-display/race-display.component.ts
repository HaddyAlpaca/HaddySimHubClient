import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, tap } from 'rxjs';
import { TelemetryService } from 'src/app/shared/services';
import { TelemetryType } from 'src/app/shared/services/telemetry.service';
import { Flag, GripLevel, RaceData, WeatherType } from './race-data';

@UntilDestroy()
@Component({
  selector: 'app-race-display',
  templateUrl: './race-display.component.html',
  styleUrls: ['./race-display.component.css']
})
export class RaceDisplayComponent implements OnInit {
  private _data: RaceData = this.getDefaultData();
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

  private getDefaultData(): RaceData {
    return {
      isTimedSession: false,
      completedLaps: 0,
      totalLaps: 0,
      sessionTimeRemaining: 0,
      position: 0,
      numberOfCars: 0,
      speed: 0,
      gear: 0,
      rpm: 0,
      rpmMax: 0,
      gripLevel: GripLevel.Unknown,
      flag: Flag.None,
      weatherType: WeatherType.Unknown,
      trackTemp: 0,
      airTemp: 0,
      fuel: 0,
      fuelPerLap: 0,
      tyreTemps: [0, 0, 0, 0],
      tyrePressures: [0, 0, 0, 0],
      brakeTemps: [0, 0, 0, 0],
      tcLevel: 0,
      absLevel: 0,
      engineMapping: 0,
      brakeBias: 0,
      currentLapTime: 0,
      estimatedLapTime: 0,
      lastLapTime: 0,
      bestLapTime: 0,
      deltaTime: 0,
      gapBehind: 0,
      gapAhead: 0
    }
  }
}
