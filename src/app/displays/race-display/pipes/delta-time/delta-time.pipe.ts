import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'delta-time',
    standalone: true
})
export class DeltaTimePipe implements PipeTransform {
  private readonly _numberFormat = new Intl.NumberFormat('en-US', { minimumFractionDigits: 3 });

  transform(value: number): string {
    return this._numberFormat.format(value);
  }
}
