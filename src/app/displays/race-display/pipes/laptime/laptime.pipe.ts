import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'laptime',
    standalone: true
})
export class LapTimePipe implements PipeTransform {
  transform(milliseconds: number): string {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const fraction = milliseconds - (seconds * 1000) - (minutes * 60 * 1000);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${fraction.toString().padStart(3, '0')}`;
  }
}
