import { Component, computed, inject } from '@angular/core';
import { ConnectionStatus, GameDataService } from 'src/app/services/game-data.service';

@Component({
  selector: 'app-connection-status',
  templateUrl: './connection-status.component.html',
  styleUrl: './connection-status.component.scss',
  standalone: true,
})
export class ConnectionStatusComponent {
  private _gameDataService = inject(GameDataService);

  public connectionStatusDescription = computed(() => {
    const statusDescriptions: { [key in ConnectionStatus]: string } = {
      [ConnectionStatus.Disconnected]: 'Disconnected',
      [ConnectionStatus.Connecting]: 'Connecting...',
      [ConnectionStatus.ConnectionError]: 'Error connecting',
      [ConnectionStatus.Connected]: 'Connected, waiting for game...',
    };

    return statusDescriptions[this._gameDataService.connectionStatus()] || 'Unknown';
  });
}
