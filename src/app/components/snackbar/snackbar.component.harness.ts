import { ComponentHarness } from '@angular/cdk/testing';

export class SnackBarComponentHarness extends ComponentHarness {
  static hostSelector = 'app-snackbar';

  public async isVisible(): Promise<boolean> {
    const elm = await this.host();
    const visible = await elm.hasClass('show');
    return visible;
  }

  public async getMessage(): Promise<string> {
    const elm = await this.locatorFor('.snackbar-text')();
    const text = await elm.text();
    return text;
  }
}
