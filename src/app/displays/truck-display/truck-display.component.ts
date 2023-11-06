import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, tap } from 'rxjs';
import { TruckData } from './truck-data';
import { TelemetryService, TelemetryType } from 'src/app/services/telemetry.service';


@UntilDestroy()
@Component({
  selector: 'app-truck-display',
  templateUrl: 'truck-display.component.html',
  styleUrls: ['truck-display.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TruckDisplayComponent implements OnInit {
  private _data: TruckData = new TruckData();

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
}
