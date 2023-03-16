import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TruckDisplayModule } from './features/truck-display/truck-display.module';
import { RaceDisplayModule } from './features/race-display/race-display.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        TruckDisplayModule,
        RaceDisplayModule
    ]
})
export class AppModule { }
