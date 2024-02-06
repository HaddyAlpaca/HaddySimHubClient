import { Injectable, signal } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap, timer } from 'rxjs';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class ClockService {
  private readonly _time = signal(new Date());
  public readonly time = this._time.asReadonly();

  constructor() {
    timer(0, 1000).pipe(
      tap(() => this._time.set(new Date())),
      untilDestroyed(this),
    ).subscribe();
  }
}
