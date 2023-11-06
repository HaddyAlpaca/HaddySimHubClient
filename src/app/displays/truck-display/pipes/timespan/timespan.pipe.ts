import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timespan'
})
export class TimespanPipe implements PipeTransform {
  transform(value: number): string {
    let totalMinutes = Math.abs(value);
    const days = Math.floor(totalMinutes / (24 * 60));
    totalMinutes -= days * 24 * 60;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.abs(totalMinutes % 60);

    const sign = Math.sign(value) === -1 ? '-' : '';
    if (days) {
      return `${sign}${days}d ${hours}:` + minutes.toString().padStart(2, '0');
    } else {
      return `${sign}${hours}:` + minutes.toString().padStart(2, '0');
    }
  }
}
