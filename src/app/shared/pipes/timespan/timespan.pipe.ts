import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timespan'
})
export class TimespanPipe implements PipeTransform {
  transform(value: number): string {
    const hours = Math.floor(Math.abs(value) / 60) * Math.sign(value);
    const minutes = Math.abs(value % 60);
    return `${hours}:` + minutes.toString().padStart(2, '0');
  }
}
