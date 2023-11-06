import { NgModule } from "@angular/core";
import { DisplayElementComponent } from "./display-element.component";
import { DisplayGroupComponent } from "./display-group.component";
import { LapTimePipe } from "./pipes/laptime/laptime.pipe";
import { DeltaTimePipe } from "./pipes/delta-time/delta-time.pipe";
import { RaceDisplayComponent } from "./race-display.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    DisplayElementComponent,
    DisplayGroupComponent,
    LapTimePipe,
    DeltaTimePipe,
    RaceDisplayComponent
  ],
  imports: [CommonModule],
  exports: [RaceDisplayComponent]
})
export class RaceDisplayModule {}
