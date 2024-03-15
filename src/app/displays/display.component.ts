import { Component, computed, inject, input } from '@angular/core';
import { ClockService } from '../services/clock.service';

@Component({
  template: '',
})
export abstract class DisplayComponent<T> {
  private _clockService = inject(ClockService);

  protected abstract checkDataType(data: unknown): boolean;
  protected abstract createDefaultData(): T;

  public readonly currentTime = this._clockService.time;
  public dataSource = input.required<unknown>({});

  public data = computed(() => {
    const data = this.dataSource();

    return data ? data as T : this.createDefaultData();
  });
}
