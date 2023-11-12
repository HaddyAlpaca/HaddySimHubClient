import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, tap } from 'rxjs';
import { TelemetryService, TelemetryType } from 'src/app/services/telemetry/telemetry.service';

@UntilDestroy()
@Component({
    selector: 'app-raw-data-display',
    templateUrl: 'raw-data-display.component.html',
    styleUrls: ['raw-data-display.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CommonModule]
})
export class RawDataDisplayComponent implements OnInit {
  private _data: Record<string, number | string | boolean> = {};
  get data(): Record<string, number | string | boolean> {
    return this._data;
  }

  constructor(private _telemetryService: TelemetryService) {
  }

  ngOnInit(): void {
    //Subscribe to the truck data
    this._telemetryService.telemetry$.pipe(
      filter(update => update.Type === TelemetryType.RawData),
      tap(update => this._data = update.Data),
      untilDestroyed(this)).subscribe();
  }
}
