import { ComponentHarness } from '@angular/cdk/testing';

export class TruckDashComponentHarness extends ComponentHarness {
  static hostSelector = 'app-truck-dash';

  async getSelectedGear(): Promise<string> {
    const elm = await this.locatorFor('.current-gear')();
    const text = await elm.text();
    return text;
  }
}
