import { Component, input } from '@angular/core';
import { DeltaTimePipe } from './pipes/delta-time/delta-time.pipe';
import { IRatingPipe } from './pipes/irating/irating.pipe';

export interface DriverInfo {
  name: string;
  license: string;
  licenseColor: string;
  rating: number;
  delta: number;
}

@Component({
  selector: 'app-opponent-delta',
  templateUrl: './opponent-delta.component.html',
  standalone: true,
  imports: [
    DeltaTimePipe,
    IRatingPipe,
  ],
})
export class OpponentDeltaComponent {
  public caption = input.required<string>();
  public driverInfo = input.required<DriverInfo>();
}
