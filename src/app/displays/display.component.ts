import { Component, computed, inject } from '@angular/core';
import { ClockService } from '../services/clock.service';
import { GameDataService } from '../services/game-data.service';

@Component({
  template: '',
})
export abstract class DisplayComponent<T> {
  private _clockService = inject(ClockService);
  private _gameDataService = inject(GameDataService);

  public readonly currentTime = this._clockService.time;

  public data = computed(() => {
    const data = this._gameDataService.displayUpdate().data;

    if (!data) {
      return this.createDefaultData();
    }

    return data as T;
  });

  protected abstract checkDataType(data: unknown): boolean;
  protected abstract createDefaultData(): T;
}
