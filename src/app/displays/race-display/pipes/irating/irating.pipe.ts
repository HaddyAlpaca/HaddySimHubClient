import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'irating',
  standalone: true,
})
export class IRatingPipe implements PipeTransform {
  private readonly _numberFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
  private readonly _kNumberFormat = new Intl.NumberFormat('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  transform(value: number): string {
    if (value < 1000) {
      return this._numberFormat.format(value);
    } else {
      return this._kNumberFormat.format(value / 1000) + 'k';
    }
  }

}
