import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, tap } from 'rxjs';
import { TelemetryService } from 'src/app/shared/services';
import { TelemetryType } from 'src/app/shared/services/telemetry.service';

@UntilDestroy()
@Component({
  selector: 'app-raw-data-display',
  templateUrl: 'raw-data-display.component.html',
  styleUrls: ['raw-data-display.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RawDataDisplayComponent implements OnInit {
  private _data: {[key: string]: number | string | boolean } = {"A": 12, "B": 19, "Fiets": 1};
  get data(): {[key: string]: number | string | boolean } {
    return this._data;
  }

  constructor(private _telemetryService: TelemetryService) {
  }

  ngOnInit(): void {
    //Subscribe to the truck data
    this._telemetryService.telemetry$.pipe(
      filter(update => update.Type === TelemetryType.RawData),
      tap(update => {
        this._data = update.Data as {[key: string]: number | string | boolean }
      }),
      untilDestroyed(this)).subscribe();
  }
}
