import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';

export enum TelemetryType{
  Unknown,
  Race,
  Truck
}

export interface TelemetryUpdate {
  Type: TelemetryType;
  Data: unknown;
}

@Injectable({
  providedIn: 'root'
})
export class TelemetryService {
  private connection: signalR.HubConnection;

  telemetry$: Subject<TelemetryUpdate> = new Subject<TelemetryUpdate>;

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('telemetry')
      .build();

    this.connection.start();

    //Monitor emmited data
    this.connection.on('telemetry-update', (data) => {
      this.telemetry$.next(data);
    });
  }
}
