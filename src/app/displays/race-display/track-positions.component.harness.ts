import { ComponentHarness } from '@angular/cdk/testing';

export class TrackPositionsComponentHarness extends ComponentHarness {
  static hostSelector = 'app-track-positions';

  public async getTrackItems(): Promise<{ left: string }[]> {
    const elements = await this.locatorForAll('track-item')();

    const result: { left: string }[] = [];
    for (const elm of elements) {
      const left = await elm.getCssValue('left');
      result.push({ left });
    }

    return result;
  }
}
