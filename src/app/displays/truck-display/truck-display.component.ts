import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TruckData } from './truck-data';
import { TimespanPipe } from './pipes/timespan/timespan.pipe';
import { NgClass, DecimalPipe, CommonModule } from '@angular/common';
import { NumberNlPipe } from '../pipes/number-nl/number-nl.pipe';
import { DisplayComponent } from '../display.component';
import { WaypointComponent } from './components/waypoint.component';
import { SpeedometerComponent } from 'src/app/components/speedometer/speedometer.component';

@Component({
    selector: 'app-truck-display',
    templateUrl: 'truck-display.component.html',
    styleUrl: 'truck-display.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
      NgClass,
      DecimalPipe,
      TimespanPipe,
      NumberNlPipe,
      CommonModule,
      WaypointComponent,
      SpeedometerComponent,
    ],
})
export class TruckDisplayComponent extends DisplayComponent<TruckData> {
  protected override checkDataType(data: unknown): boolean {
    return (data as TruckData).sourceCity !== undefined;
  }

  protected override createDefaultData(): TruckData {
    return new TruckData();
  }
}
