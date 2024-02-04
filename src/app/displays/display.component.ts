import { Component, computed, inject, input } from '@angular/core';
import { ClockService } from '../services/clock.service';

@Component({
  template: '',
})
export abstract class DisplayComponent<T> {
  private _clockService = inject(ClockService);

  public dataSource = input.required<unknown>({});

  public readonly currentTime = this._clockService.time;

  public data = computed(() => {
    const data = this.dataSource();

    if (!data) {
      return this.createDefaultData();
    }

    return data as T;
  });

  protected abstract checkDataType(data: unknown): boolean;
  protected abstract createDefaultData(): T;
}
