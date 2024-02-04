import { ComponentHarness } from '@angular/cdk/testing';
import { ConnectionStatusComponentHarness } from './components/connection-status/connection-status.component.harness';
import { RaceDisplayComponentHarness } from './displays/race-display/race-display.component.harness';
import { TruckDashComponentHarness } from './displays/truck-display/truck-display.component.harness';

export class AppComponentHarness extends ComponentHarness {
  static hostSelector: 'app-root';

  public async isRaceDisplayVisible(): Promise<boolean> {
    const elm = await this.locatorForOptional(RaceDisplayComponentHarness)();
    return !!elm;
  }

  public async isTruckDisplayVisible(): Promise<boolean> {
    const elm = await this.locatorForOptional(TruckDashComponentHarness)();
    return !!elm;
  }

  public async isConnectionStatusVisible(): Promise<boolean> {
    const elm = await this.locatorForOptional(ConnectionStatusComponentHarness)();
    return !!elm;
  }
}
