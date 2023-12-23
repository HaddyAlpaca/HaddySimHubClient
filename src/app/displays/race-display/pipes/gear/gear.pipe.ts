import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'gear',
    standalone: true,
})
export class GearPipe implements PipeTransform {
  private readonly _numberFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

  transform(value: number): string {
    if (value === 0) {
      return 'N';
    } else if(value === -1) {
      return 'R';
    } else if (value === -2) {
      return 'N/A';
    }

    return this._numberFormat.format(value);
  }
}
