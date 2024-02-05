import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruckDisplayComponent } from './displays/truck-display/truck-display.component';
import { RaceDisplayComponent } from './displays/race-display/race-display.component';
import { DisplayType, GameDataService } from './services/game-data.service';
import { ConnectionStatusComponent } from './components/connection-status/connection-status.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [
      CommonModule,
      TruckDisplayComponent,
      RaceDisplayComponent,
      ConnectionStatusComponent,
      MatSnackBarModule,
    ],
})
export class AppComponent {
  private _gameDataService = inject(GameDataService);
  private _snackBarService = inject(MatSnackBar);

  public readonly DisplayType = DisplayType;
  public displayUpdate = this._gameDataService.displayUpdate;
  public connectionStatus = this._gameDataService.connectionStatus;

  public debugMessage = this._gameDataService.debugInfo;

  constructor() {
    effect(() => {
      const message  = this._gameDataService.notification()
      if (message) {
        this._snackBarService.open(message, undefined, { duration: 5_000 });
      }
    });
  }
}
