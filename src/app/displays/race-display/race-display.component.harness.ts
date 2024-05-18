import { SpeedometerComponentHarness } from 'src/app/components/speedometer/speedometer.component.harness';
import { ComponentHarnessBase } from 'src/app/testing/component-harness-base';

export class RaceDisplayComponentHarness extends ComponentHarnessBase {
  static hostSelector = 'app-race-display';

  public async getSpeedoHarness(): Promise<SpeedometerComponentHarness> {
    const harness = await this.locatorFor(SpeedometerComponentHarness)();

    return harness;
  }
}
