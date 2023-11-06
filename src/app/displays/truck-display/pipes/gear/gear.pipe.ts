import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gear'
})
export class GearPipe implements PipeTransform {

  transform(value: number): string {
    //Neutral
    if (value === 0) return 'N';

    //Reserve
    if (value < 0) return `R${Math.abs(value)}`;

    return value.toString();
  }
}
