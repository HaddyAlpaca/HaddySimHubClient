import { NgModule } from "@angular/core";
import { TruckDisplayComponent } from "./truck-display.component";
import { CommonModule } from "@angular/common";
import { GearPipe } from "./pipes/gear/gear.pipe";
import { TimespanPipe } from "./pipes/timespan/timespan.pipe";

@NgModule({
  declarations: [
    GearPipe,
    TimespanPipe,
    TruckDisplayComponent],
  imports: [CommonModule],
  exports: [TruckDisplayComponent]
})
export class TruckDisplayModule {}
