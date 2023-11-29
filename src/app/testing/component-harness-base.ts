import { ComponentHarness } from '@angular/cdk/testing';

export class ComponentHarnessBase extends ComponentHarness {
  public async hasElement(selector: string): Promise<boolean> {
    const elm = await this.locatorForOptional(selector)();
    return !!elm;
  }

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

  public async getValue(selector: string): Promise<string | null> {
    const elm = await this.locatorFor(selector)();
    const value = await elm.getAttribute('value');
    return value;
  }
}
