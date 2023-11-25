import { ComponentHarness } from '@angular/cdk/testing';

export class RaceDisplayComponentHarness extends ComponentHarness {
  static hostSelector = 'app-race-display';

  public async getElementText(selector: string): Promise<string> {
    const elm = await this.locatorFor(selector)();
    const text = await elm.text();
    return text;
  }

  public async elementHasClass(selector: string, className: string): Promise<boolean> {
    const elm = await this.locatorFor(selector)();
    const hidden = await elm.hasClass(className);
    return hidden;
  }

  public async getThrottlePct(): Promise<string | null> {
    const elm = await this.locatorFor('#throttle')();
    const value = await elm.getAttribute('value');
    return value;
  }

  public async getBrakePct(): Promise<string | null> {
    const elm = await this.locatorFor('#brake')();
    const value = await elm.getAttribute('value');
    return value;
  }
}
