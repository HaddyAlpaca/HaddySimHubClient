import { Component, inject } from '@angular/core';
import { ClockService } from '../services/clock.service';

@Component({
  template: '',
})
export abstract class DisplayComponent<T> {
  private _clockService = inject(ClockService);

  public readonly currentTime = this._clockService.time;
}
