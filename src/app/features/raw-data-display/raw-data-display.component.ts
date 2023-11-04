import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, tap } from 'rxjs';
import { TelemetryService } from 'src/app/shared/services';
import { TelemetryType } from 'src/app/shared/services/telemetry.service';

@UntilDestroy()
@Component({
  selector: 'app-raw-data-display',
  templateUrl: 'raw-data-display.component.html',
  styleUrls: ['raw-data-display.component.css']
})
export class RawDataDisplayComponent implements OnInit {
  private _rawData: Record<string, unknown> = {};

  get data(): {[key: string | number | boolean | undefined]} {
    for(const key of Object.keys(this._rawData)) {

    }

  }

  constructor(private _telemetryService: TelemetryService) {
  }

  ngOnInit(): void {
    //Subscribe to the truck data
    this._telemetryService.telemetry$.pipe(
      filter(update => update.Type === TelemetryType.RawData),
      tap(update => this._rawData = update.Data as Record<string, unknown>),
      untilDestroyed(this)).subscribe();
  }
}
