import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, tap } from 'rxjs';
import { TelemetryService } from 'src/app/shared/services';
import { TelemetryType } from 'src/app/shared/services/telemetry.service';
import { GearRange, TruckData } from './data';


@UntilDestroy()
@Component({
  selector: 'app-truck-display',
  templateUrl: './truck-display.component.html',
  styleUrls: ['./truck-display.component.css']
})
export class TruckDisplayComponent implements OnInit {
  readonly GearRange = GearRange;

  private _data: TruckData = this.getDefaultData();
  get data(): TruckData{
    return this._data;
  }
  currentTime: Date = new Date();

  constructor(private _telemetryService: TelemetryService) {
  }

  ngOnInit(): void {
    //Subscribe to the truck data
    this._telemetryService.telemetry$.pipe(
      filter(update => update.Type === TelemetryType.Truck),
      tap(update => this._data = update.Data as TruckData),
      untilDestroyed(this)).subscribe();
  }

  private getDefaultData(): TruckData {
    return {
      destination: '',
      distanceRemaining: 0,
      timeRemaining: 0,
      timeRemainingIrl: 0,
      time: new Date(),
      restTimeRemaining: 0,
      restTimeRemainingIrl: 0,
      fuelPercentage: 0,
      fuelDistance: 0,
      jobTimeRemaining: 0,
      jobTimeRemainingIrl: 0,
      jobIncome: 0,
      speed: 0,
      speedLimit: 0,
      rpm: 0,
      rpmMax: 0,
      cruiseControlOn: false,
      cruiseControlSpeed: 0,
      gear: 0,
      gearRange: GearRange.Low,
      lowBeamOn: false,
      highBeamOn: false,
      parkingBrakeOn: false,
      batteryWarningOn: false
    };
  }
}
