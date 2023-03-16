import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared.module';
import { TruckDisplayComponent } from './truck-display.component';

@NgModule({
  declarations: [
    TruckDisplayComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    TruckDisplayComponent
  ]
})
export class TruckDisplayModule {
}
