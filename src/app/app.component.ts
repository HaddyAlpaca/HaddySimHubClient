import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CommonModule } from '@angular/common';
import { RawDataDisplayComponent } from './displays/raw-data-display/raw-data-display.component';
import { TruckDisplayComponent } from './displays/truck-display/truck-display.component';
import { RaceDisplayComponent } from './displays/race-display/race-display.component';
import { tap } from 'rxjs';
import { ConnectionStatus, GameDataService, GameDataType } from './services/game-data.service';

@UntilDestroy()
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: true,
    imports: [CommonModule, RawDataDisplayComponent, TruckDisplayComponent, RaceDisplayComponent]
})
export class AppComponent {
  public GameDataType = GameDataType;

  private _gameDataType = GameDataType.None;
  public get gameDataType(): GameDataType {
    return this._gameDataType;
  }

  private _connectionStatus = ConnectionStatus.Disconnected;
  public get connectionStatusDescription(): string {
    let description = '';
    switch(this._connectionStatus) {
      case ConnectionStatus.Disconnected:
        description = 'Disconnected';
        break;

      case ConnectionStatus.Connecting:
        description = 'Connecting';
        break;

      case ConnectionStatus.ConnectionError:
        description = 'Error connecting';
        break;

      case ConnectionStatus.Connected:
        description = 'Connected';
        break;
    }

    return description;
  }

  constructor(private _gameDataService: GameDataService) {
    //Monitor connection status
    this._gameDataService.connectionStatus$.pipe(
      tap((status) => this._connectionStatus = status),
      untilDestroyed(this)
    ).subscribe();

    //Monitor game data type
    this._gameDataService.gameDataType$.pipe(
      tap((type) => this._gameDataType = type),
      untilDestroyed(this)
    ).subscribe();
  }
}
