import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TruckData } from './truck-data';
import { TimespanPipe } from './pipes/timespan/timespan.pipe';
import { GearPipe } from './pipes/gear/gear.pipe';
import { NgClass, DecimalPipe, CommonModule } from '@angular/common';
import { NumberNlPipe } from '../pipes/number-nl/number-nl.pipe';
import { DisplayComponent } from '../display.component';

@Component({
    selector: 'app-truck-display',
    templateUrl: 'truck-display.component.html',
    styleUrl: 'truck-display.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgClass, DecimalPipe, GearPipe, TimespanPipe, NumberNlPipe, CommonModule],
})
export class TruckDisplayComponent extends DisplayComponent<TruckData> {


  protected override checkDataType(data: unknown): boolean {
    return (data as TruckData).sourceCity !== undefined;
  }

  protected override createDefaultData(): TruckData {
    return new TruckData();
  }
}
