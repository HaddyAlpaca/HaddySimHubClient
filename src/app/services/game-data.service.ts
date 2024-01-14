import { Injectable, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Subject, filter, interval, take, tap } from 'rxjs';
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

export enum GameDataType {
  None,
  TruckData,
  RaceData,
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

  private _gameDataTypeSubject = new BehaviorSubject<GameDataType>(GameDataType.None);
  public gameDataType$ = this._gameDataTypeSubject.asObservable();

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
      let countDownSeconds = 10;
      this.connectionStatus.set({ status: ConnectionStatus.ConnectionError, message: error, reloadSeconds: countDownSeconds });

      interval(1000).pipe(
        take(countDownSeconds + 1),
        tap(() => {
          this.connectionStatus.update((value) => ({ ...value, reloadSeconds: countDownSeconds }));
          countDownSeconds--;
          console.log('Countdown: ' + countDownSeconds);
        }),
        filter(() => countDownSeconds <= 0),
        tap(() => window.location.reload()),
      ).subscribe();
    });

    this._hubConnection.onreconnecting((error) => this.connectionStatus.set({ status: ConnectionStatus.Connecting, message: error?.message }));
    this._hubConnection.onreconnected(() => this.connectionStatus.set({ status: ConnectionStatus.Connected }));
    this._hubConnection.onclose((error) => this.connectionStatus.set({ status: ConnectionStatus.Disconnected, message: error?.message }));

    //Monitor emmited data
    this._hubConnection.on('gameDataIdle', () => this._gameDataTypeSubject.next(GameDataType.None));

    this._hubConnection.on('truckData', (data) => {
      this._gameDataTypeSubject.next(GameDataType.TruckData);
      this._truckDataSubject.next(data);
    });

    this._hubConnection.on('raceData', (data) => {
      this._gameDataTypeSubject.next(GameDataType.RaceData);
      this._raceDataSubject.next(data);
    });

    this._hubConnection.on('notification', (data) => {
      this._notificationSubject.next(data);
    });
  }
}
