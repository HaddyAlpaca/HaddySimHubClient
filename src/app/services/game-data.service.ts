import { Injectable, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject, filter, interval, take, tap } from 'rxjs';
import { TruckData } from '../displays/truck-display/truck-data';
import { RaceData } from '../displays/race-display/race-data';
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

export interface GameDataState {
  connectionStatus: ConnectionStatus;
  truckData: TruckData | null;
  raceData: RaceData | null;
}

@Injectable({
  providedIn: 'root',
})
export class GameDataService {
  private _hubConnection: signalR.HubConnection;

  public connectionStatus = signal<ConnectionInfo>({ status: ConnectionStatus.Disconnected });

  private _displayType = signal(DisplayType.None);
  public displayType = this._displayType.asReadonly();

  private _truckDataSubject = new Subject<TruckData>();
  public truckData$ = this._truckDataSubject.asObservable();

  private _raceDataSubject = new Subject<RaceData>();
  public raceData$ = this._raceDataSubject.asObservable();

  private _notificationSubject = new Subject<string>();
  public notification$ = this._notificationSubject.asObservable();

  constructor() {
    const connectionOptions: IHttpConnectionOptions = {
      transport: HttpTransportType.WebSockets,
      skipNegotiation: false,
      logMessageContent: false,
    };

    const notificationUrl = 'game-data';
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
    this._hubConnection.on('displayType', (type: DisplayType) => this._displayType.set(type));
    this._hubConnection.on('truckData', (data) => this._truckDataSubject.next(data));
    this._hubConnection.on('raceData', (data) => this._raceDataSubject.next(data));
    this._hubConnection.on('notification', (data) => this._notificationSubject.next(data));
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
