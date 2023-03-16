import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DisplayElementComponent } from './display-element.component';
import { DisplayGroupComponent } from './display-group.component';
import { RaceDisplayComponent } from './race-display.component';
import { RaceEssentialsComponent } from './race-essentials.component';

@NgModule({
  declarations: [
    RaceDisplayComponent,
    RaceEssentialsComponent,
    DisplayGroupComponent,
    DisplayElementComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    RaceDisplayComponent,
    RaceEssentialsComponent
  ]
})
export class RaceDisplayModule {

}
