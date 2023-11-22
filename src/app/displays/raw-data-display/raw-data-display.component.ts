import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';
import { GameDataService } from 'src/app/services/game-data.service';

@UntilDestroy()
@Component({
    selector: 'app-raw-data-display',
    templateUrl: 'raw-data-display.component.html',
    styleUrl: 'raw-data-display.component.css',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CommonModule]
})
export class RawDataDisplayComponent implements OnInit {
  private _data: {[key: string]: number | string | boolean } = {};
  get data(): {[key: string]: number | string | boolean } {
    return this._data;
  }

  constructor(private _gameDataSerivce: GameDataService) {
  }

  ngOnInit(): void {
    this._gameDataSerivce.rawData$.pipe(
      tap(data =>this._data = data! as {[key: string]: number | string | boolean }),
      untilDestroyed(this)
    ).subscribe();
  }
}
