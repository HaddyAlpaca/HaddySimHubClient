import { NgModule } from '@angular/core';
import { TimespanPipe } from './pipes/timespan/timespan.pipe';
import { GearPipe } from './pipes/gear/gear.pipe';
import { DeltaTimePipe } from './pipes/delta-time/delta-time.pipe';
import { LapTimePipe } from './pipes/laptime/laptime.pipe';

@NgModule({
  declarations: [
    TimespanPipe,
    GearPipe,
    DeltaTimePipe,
    LapTimePipe
  ],
  imports: [
  ],
  exports: [
    TimespanPipe,
    GearPipe,
    DeltaTimePipe,
    LapTimePipe
  ]
})
export class SharedModule {
}
