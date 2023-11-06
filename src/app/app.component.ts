import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TelemetryService, TelemetryType } from './services/telemetry.service';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly TelemetryType = TelemetryType;

  private _telemetryType: TelemetryType = TelemetryType.Unknown;
  get telemetryType(): TelemetryType {
    return this._telemetryType;
  }

  constructor(private _telemetryService: TelemetryService){
    this._telemetryService.telemetry$.pipe(untilDestroyed(this)).subscribe(update => {
      this._telemetryType = update.Type;
    });
  }

  selectTelemetryType(telemetryType: TelemetryType): void {
    this._telemetryType = telemetryType;
  }
}
