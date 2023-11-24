import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'deltatime',
    standalone: true
})
export class DeltaTimePipe implements PipeTransform {
  private readonly _numberFormat = new Intl.NumberFormat('en-US', { minimumFractionDigits: 3 });

  transform(value: number): string {
    return (value >= 0 ? '+' : '') + this._numberFormat.format(value);
  }
}
