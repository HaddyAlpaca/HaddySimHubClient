import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface TrackPosition {
  lapDistPct: number;
  color: string;
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
}
