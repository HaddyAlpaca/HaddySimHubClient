import { ComponentHarness } from '@angular/cdk/testing';

export class RaceLeaderboardComponentHarness extends ComponentHarness {
  static hostSelector = 'app-race-leaderboard';

  public async getRowData(): Promise<string[][]> {
    // const rows = await this.locatorForAll('tr[mat-row]')();

    return [];
  }
}
