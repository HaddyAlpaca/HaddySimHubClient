import { ComponentHarness } from '@angular/cdk/testing';

export class TruckDashComponentHarness extends ComponentHarness {
  static hostSelector = 'app-truck-dash';

  async getDeparture(): Promise<string> {
    return await this.getElementText('#departure');
  }

  async getDestination(): Promise<string> {
    return await this.getElementText('#destination');
  }

  async getSelectedGear(): Promise<string> {
    return await this.getElementText('.current-gear');
  }

  private async getElementText(selector: string): Promise<string> {
    const element = await this.locatorFor(selector)();
    const text = await element.text();

    return text;
  }
}
