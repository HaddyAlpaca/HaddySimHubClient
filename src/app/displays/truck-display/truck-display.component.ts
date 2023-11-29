import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';
import { TruckData } from './truck-data';
import { TimespanPipe } from './pipes/timespan/timespan.pipe';
import { GearPipe } from './pipes/gear/gear.pipe';
import { NgClass, DecimalPipe } from '@angular/common';
import { GameDataService } from 'src/app/services/game-data.service';
import { NumberNlPipe } from '../pipes/number-nl/number-nl.pipe';

@UntilDestroy()
@Component({
    selector: 'app-truck-display',
    templateUrl: 'truck-display.component.html',
    styleUrl: 'truck-display.component.css',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [NgClass, DecimalPipe, GearPipe, TimespanPipe, NumberNlPipe]
})
export class TruckDisplayComponent implements OnInit {
  private _data: TruckData = new TruckData();
  get data(): TruckData{
    return this._data;
  }
  currentTime: Date = new Date();

  constructor(private _gameDataService: GameDataService) {
  }

  ngOnInit(): void {
    this._gameDataService.truckData$.pipe(
      tap(data => this._data = data),
      untilDestroyed(this)
    ).subscribe();
  }
}
