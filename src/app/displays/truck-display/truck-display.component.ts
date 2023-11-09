import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, tap } from 'rxjs';
import { TruckData } from './truck-data';
import { TelemetryService, TelemetryType } from 'src/app/services/telemetry.service';
import { TimespanPipe } from './pipes/timespan/timespan.pipe';
import { GearPipe } from './pipes/gear/gear.pipe';
import { NgIf, NgClass, DecimalPipe } from '@angular/common';


@UntilDestroy()
@Component({
    selector: 'app-truck-display',
    templateUrl: 'truck-display.component.html',
    styleUrls: ['truck-display.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [NgIf, NgClass, DecimalPipe, GearPipe, TimespanPipe]
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
