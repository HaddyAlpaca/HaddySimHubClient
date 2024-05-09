import { Component } from '@angular/core';
import { DisplayComponent } from '../display.component';
import { RallyData } from './rally-data';

@Component({
  selector: 'app-rally-display',
  templateUrl: './rally-display.component.html',
  standalone: true,
})
export class RallyDisplayComponent extends DisplayComponent<RallyData> {
  protected override checkDataType(data: unknown): boolean {
    return (data as RallyData).gear !== undefined;
  }
  protected override createDefaultData(): RallyData {
    return new RallyData();
  }
}
