import { Component, input } from '@angular/core';
import { DeltaTimePipe } from './pipes/delta-time/delta-time.pipe';
import { IRatingPipe } from './pipes/irating/irating.pipe';

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
  public name = input<string>();
  public delta = input<number>();
  public license = input<string>();
  public licenseColor = input<string>();
  public rating = input<number>();
}
