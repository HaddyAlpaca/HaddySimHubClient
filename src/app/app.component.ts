import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruckDisplayComponent } from './displays/truck-display/truck-display.component';
import { RaceDisplayComponent } from './displays/race-display/race-display.component';
import { DisplayType, GameDataService } from './services/game-data.service';
import { SnackBarComponent } from './components/snackbar/snackbar.component';
import { ConnectionStatusComponent } from './components/connection-status/connection-status.component';

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
  private _gameDataService = inject(GameDataService);

  public readonly DisplayType = DisplayType;
  public displayUpdate = this._gameDataService.displayUpdate;
}
