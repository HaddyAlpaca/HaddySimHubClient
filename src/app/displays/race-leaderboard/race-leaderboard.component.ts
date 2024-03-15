import { Component, ViewEncapsulation } from '@angular/core';
import { DisplayComponent } from '../display.component';
import { RaceLeaderboardData } from './race-leaderboard.data';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-race-leaderboard',
  templateUrl: './race-leaderboard.component.html',
  styleUrl: './race-leaderboard.component.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatTableModule],
})
export class RaceLeaderboardComponent extends DisplayComponent<RaceLeaderboardData[]> {
  public displayedColumns: string[] = ['position', 'driverName', 'interval'];

  protected override checkDataType(data: unknown): boolean {
    return (data as RaceLeaderboardData[]).length === 0 ||
      (data as RaceLeaderboardData[])[0].position !== undefined;
  }
  protected override createDefaultData(): RaceLeaderboardData[] {
    return [];
  }
}
