import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CommonModule } from '@angular/common';
import { TruckDisplayComponent } from './displays/truck-display/truck-display.component';
import { RaceDisplayComponent } from './displays/race-display/race-display.component';
import { distinctUntilChanged, tap } from 'rxjs';
import { GameDataService, GameDataType } from './services/game-data.service';
import { SnackBarComponent } from './components/snackbar/snackbar.component';
import { ConnectionStatusComponent } from './components/connection-status/connection-status.component';

@UntilDestroy()
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [
      CommonModule,
      TruckDisplayComponent,
      RaceDisplayComponent,
      SnackBarComponent,
      ConnectionStatusComponent,
    ],
})
export class AppComponent {
  public GameDataType = GameDataType;

  private _gameDataType = GameDataType.None;
  public get gameDataType(): GameDataType {
    return this._gameDataType;
  }

  constructor(private _gameDataService: GameDataService) {
    //Monitor game data type
    this._gameDataService.gameDataType$.pipe(
      tap((type) => this._gameDataType = type),
      untilDestroyed(this),
    ).subscribe();
  }
}
