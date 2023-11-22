import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Subject } from 'rxjs';
import { TruckData } from '../displays/truck-display/truck-data';
import { RaceData } from '../displays/race-display/race-data';

export enum ConnectionStatus {
  Disconnected,
  Connecting,
  ConnectionError,
  Connected
}

export enum GameDataType {
  None,
  RawData,
  TruckData,
  RaceData
}

export interface GameDataState {
  connectionStatus: ConnectionStatus;
  rawData: object | null;
  truckData: TruckData | null;
  raceData: RaceData | null;
}

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  private _hubConnection: signalR.HubConnection;

  private _connectionStatusSubject = new BehaviorSubject<ConnectionStatus>(ConnectionStatus.Disconnected);
  public connectionStatus$ = this._connectionStatusSubject.asObservable();

  private _gameDataTypeSubject = new BehaviorSubject<GameDataType>(GameDataType.None);
  public gameDataType$ = this._gameDataTypeSubject.asObservable();

  private _rawDataSubject = new Subject<object>();
  public rawData$ = this._rawDataSubject.asObservable();

  private _truckDataSubject = new Subject<TruckData>();
  public truckData$ = this._truckDataSubject.asObservable();

  private _raceDataSubject = new Subject<RaceData>();
  public raceData$ = this._raceDataSubject.asObservable();

  constructor() {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('game-data')
      .withAutomaticReconnect()
      .build();

    this._connectionStatusSubject.next(ConnectionStatus.Connecting);
    this._hubConnection.start().then(() => {
      this._connectionStatusSubject.next(ConnectionStatus.Connected);
    }).catch(() => {
      this._connectionStatusSubject.next(ConnectionStatus.ConnectionError);
    });

    this._hubConnection.onreconnecting(() => this._connectionStatusSubject.next(ConnectionStatus.Connecting));
    this._hubConnection.onreconnected(() => this._connectionStatusSubject.next(ConnectionStatus.Connected));
    this._hubConnection.onclose(() => this._connectionStatusSubject.next(ConnectionStatus.Disconnected));

    //Monitor emmited data
    this._hubConnection.on('gameDataIdle', () => this._gameDataTypeSubject.next(GameDataType.None));
    this._hubConnection.on('rawData', (data) => {
      this._gameDataTypeSubject.next(GameDataType.RawData);
      this._rawDataSubject.next(data);
    });

    this._hubConnection.on('truckData', (data) => {
      this._gameDataTypeSubject.next(GameDataType.TruckData);
      this._truckDataSubject.next(data);
    });

    this._hubConnection.on('raceData', (data) => {
      this._gameDataTypeSubject.next(GameDataType.RaceData);
      this._raceDataSubject.next(data);
    });
  }
}
