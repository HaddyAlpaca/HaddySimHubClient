import { Injectable, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { filter, interval, take, tap } from 'rxjs';
import { HttpTransportType, HubConnectionBuilder, IHttpConnectionOptions, LogLevel } from '@microsoft/signalr';

export interface ConnectionInfo {
  status: ConnectionStatus;
  message?: string;
  reloadSeconds?: number;
}

export enum ConnectionStatus {
  Disconnected,
  Connecting,
  ConnectionError,
  Connected,
}

export enum DisplayType {
  None,
  TruckDashboard,
  RaceDashboard,
  RaceTimingOverview,
}

export interface DisplayUpdate {
  type: DisplayType;
  data?: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class GameDataService {
  private _hubConnection: signalR.HubConnection;

  public connectionStatus = signal<ConnectionInfo>({ status: ConnectionStatus.Disconnected });

  private _displayUpdate = signal<DisplayUpdate>({ type: DisplayType.None });
  public displayUpdate = this._displayUpdate.asReadonly();

  private _notification = signal('');
  public notification = this._notification.asReadonly();

  private _debugInfo = signal('');
  public debugInfo = this._debugInfo.asReadonly();

  constructor() {
    const connectionOptions: IHttpConnectionOptions = {
      transport: HttpTransportType.WebSockets,
      skipNegotiation: false,
      logMessageContent: false,
    };

    const notificationUrl = 'display-data';
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(notificationUrl, connectionOptions)
      .configureLogging(LogLevel.Error) // Warning => then if the frontend receives messages but isn't subscribed to a topic shows a warning.
      .withAutomaticReconnect()
      .build();

    this.connectionStatus.set({ status: ConnectionStatus.Connecting });
    this._hubConnection.start().then(() => {
      this.connectionStatus.set({ status: ConnectionStatus.Connected });
    }).catch((error) => {
      this.connectionStatus.set({ status: ConnectionStatus.ConnectionError, message: error });
      this.startReloadSequence();
    });

    this._hubConnection.onreconnecting((error) => this.connectionStatus.set({ status: ConnectionStatus.Connecting, message: error?.message }));
    this._hubConnection.onreconnected(() => this.connectionStatus.set({ status: ConnectionStatus.Connected }));
    this._hubConnection.onclose((error) => {
      this.connectionStatus.set({ status: ConnectionStatus.Disconnected, message: error?.message })
      this.startReloadSequence();
    });

    //Monitor emmited data
    this._hubConnection.on('displayUpdate', (update: DisplayUpdate) => {
      this._debugInfo.set(`Display update: ${JSON.stringify(update)}`);

      this._displayUpdate.set(update);
    });
    this._hubConnection.on('notification', (message: string) => {
      this._debugInfo.set(`Notification: ${message}`);
      this._notification.set(message);
    });
  }

  private startReloadSequence(): void {
    let countDownSeconds = 10;
    this.connectionStatus.update((value) => ({ ...value, reloadSeconds: countDownSeconds}))
    interval(1000).pipe(
      take(countDownSeconds + 1),
      tap(() => {
        this.connectionStatus.update((value) => ({ ...value, reloadSeconds: countDownSeconds }));
        countDownSeconds--;
      }),
      filter(() => countDownSeconds <= 0),
      tap(() => window.location.reload()),
    ).subscribe();
  }
}
