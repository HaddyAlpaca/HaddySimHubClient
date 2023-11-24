import { ComponentHarness } from '@angular/cdk/testing';

export class RaceDisplayComponentHarness extends ComponentHarness {
  static hostSelector = 'app-race-display';

  public async getElementText(selector: string): Promise<string> {
    const elm = await this.locatorFor(selector)();
    const text = await elm.text();
    return text;
  }
}
