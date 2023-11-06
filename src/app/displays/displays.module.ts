import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ServicesModule } from '../services/services.module';
import { RaceDisplayModule } from './race-display/race-display.module';
import { RawDataDisplayModule } from './raw-data-display/raw-data-display.module';
import { TruckDisplayModule } from './truck-display/truck-display.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ServicesModule
  ],
  exports: [
    RaceDisplayModule,
    TruckDisplayModule,
    RawDataDisplayModule
  ]
})
export class DisplaysModule {
}
