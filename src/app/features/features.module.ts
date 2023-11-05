import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DisplayElementComponent } from './race-display/display-element.component';
import { DisplayGroupComponent } from './race-display/display-group.component';
import { RaceDisplayComponent } from './race-display/race-display.component';
import { RaceEssentialsComponent } from './race-display/race-essentials.component';
import { TruckDisplayComponent } from './truck-display/truck-display.component';
import { RawDataDisplayComponent } from './raw-data-display/raw-data-display.component';

@NgModule({
  declarations: [
    RaceDisplayComponent,
    RaceEssentialsComponent,
    DisplayGroupComponent,
    DisplayElementComponent,
    TruckDisplayComponent,
    RawDataDisplayComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    RaceDisplayComponent,
    RaceEssentialsComponent,
    TruckDisplayComponent,
    RawDataDisplayComponent
  ]
})
export class FeaturesModule {
}
