import { Component, computed, input } from '@angular/core';

@Component({
  template: '',
})
export abstract class DisplayComponent<T> {
  protected abstract checkDataType(data: unknown): boolean;
  protected abstract createDefaultData(): T;

  public dataSource = input.required<unknown>({});

  public data = computed(() => {
    const data = this.dataSource();

    return data ? data as T : this.createDefaultData();
  });
}
