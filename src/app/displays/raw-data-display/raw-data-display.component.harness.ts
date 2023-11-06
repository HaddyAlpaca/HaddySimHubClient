import { ComponentHarness } from "@angular/cdk/testing"

export class RawDataDisplayComponentHarness extends ComponentHarness {
  static hostSelector = 'app-raw-data-display';

  async getKeyValuePairs(): Promise<{[key: string]: string}> {
    const keys = await this.getElementTexts('.key');
    const values = await this.getElementTexts('.value');

    if (keys.length !== values.length) {
      throw new Error('Number of keys and values do not match');
    }

    const result: {[key:string]: string} = {};
    keys.forEach((key, index) => {
      result[key] = values[index];
    });

    return result;
  }

  private async getElementTexts(selector: string): Promise<string[]> {
    const result: string[] = [];
    const elements = await this.locatorForAll(selector)();

    for(const element of elements) {
      const text = await element.text();
      result.push(text);
    }

    return result;
  }
}
