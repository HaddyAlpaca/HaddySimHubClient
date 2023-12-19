import { ComponentHarness } from '@angular/cdk/testing';

export class AppComponentHarness extends ComponentHarness {
  static hostSelector: 'app-root';

  public async isRaceDisplayVisible(): Promise<boolean> {
    const elm = await this.locatorForOptional('app-race-display')();
    return !!elm;
  }

  public async isTruckDisplayVisible(): Promise<boolean> {
    const elm = await this.locatorForOptional('app-truck-display')();
    return !!elm;
  }

  public async isConnectionStatusVisible(): Promise<boolean> {
    const elm = await this.locatorForOptional('.connection-state')();
    return !!elm;
  }

  public async getConnectionStatusText(): Promise<string> {
    const elm = await this.locatorFor('.connection-state')();
    const text = await elm.text();
    return text;
  }
}
