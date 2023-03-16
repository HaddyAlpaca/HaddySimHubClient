import { ComponentHarness } from '@angular/cdk/testing';

export class RaceDisplayComponentHarness extends ComponentHarness {
  static hostSelector: 'app-race-display';

  async getElementText(selector: string): Promise<string> {
    const element = await this.locatorFor(selector)();
    const text = await element.text();
    return text;
  }

  async getDisplayGroupText(selector: string): Promise<string> {
    const element = await this.locatorFor(`${selector} > .container > .data`)();
    const text = await element.text();
    return text;
  }

  async getDisplayElementText(selector: string): Promise<string> {
    const element = await this.locatorFor(`${selector} > .data`)();
    const text = await element.text();
    return text;
  }

  async getRpm(): Promise<string | null> {
    const element = await this.locatorFor('#rpm')();
    const value = await element.getAttribute('value');
    return value;
  }

  async getRpmMax(): Promise<string | null> {
    const element = await this.locatorFor('#rpm')();
    const value = await element.getAttribute('max');
    return value;
  }
}
