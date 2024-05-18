import { Component, ViewEncapsulation } from '@angular/core';
import { DisplayComponent } from '../display.component';
import { RallyData } from './rally-data';
import { SpeedometerComponent } from 'src/app/components/speedometer/speedometer.component';
import { DataElementComponent } from 'src/app/components/data-element/data-element.component';

@Component({
  selector: 'app-rally-display',
  styleUrl: './rally-display.component.scss',
  templateUrl: './rally-display.component.html',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    SpeedometerComponent,
    DataElementComponent,
  ],
})
export class RallyDisplayComponent extends DisplayComponent<RallyData> {
  protected override checkDataType(data: unknown): boolean {
    return (data as RallyData).gear !== undefined;
  }
  protected override createDefaultData(): RallyData {
    return new RallyData();
  }
}
