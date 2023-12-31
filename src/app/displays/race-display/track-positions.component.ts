import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export enum TrackPositionStatus {
  IsPlayer,
  IsPaceCar,
  SameLap,
  LapAhead,
  LapBehind,
  InPits,
}

export interface TrackPosition {
  lapDistPct: number;
  status: TrackPositionStatus;
}

@Component({
  selector: 'app-track-positions',
  templateUrl: './track-positions.component.html',
  styleUrl: './track-positions.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class TrackPositionsComponent {
  @Input()
  public positions: TrackPosition[] = [];

  public readonly TrackPositionStatus = TrackPositionStatus;
}
