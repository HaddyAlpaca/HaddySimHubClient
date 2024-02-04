import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Renderer2, ViewEncapsulation, effect, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, switchMap, tap, timer } from 'rxjs';
import { GameDataService } from 'src/app/services/game-data.service';
import { toObservable } from '@angular/core/rxjs-interop';

@UntilDestroy()
@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrl: 'snackbar.component.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackBarComponent {
  private readonly _timeout = 5000;
  private readonly _element: HTMLElement;
  private _gameDataService = inject(GameDataService);
  private _renderer = inject(Renderer2);
  private _cdr = inject(ChangeDetectorRef);

  private _message = '';
  public get message(): string {
    return this._message;
  }

  private _notification$ = toObservable(this._gameDataService.notification);

  constructor(
    elementRef: ElementRef,
  ) {
    this._element = elementRef.nativeElement;

    this._notification$.pipe(
      filter(message => !!message),
      tap(message => {
        this._message = message;
        this.setVisible(true);
      }),
      switchMap(() => timer(this._timeout)),
      tap(() => this.setVisible(false)),
      untilDestroyed(this),
    );
  }

  private setVisible(value: boolean): void {
    if (value) {
      this._renderer.addClass(this._element, 'show');
    } else {
      this._renderer.removeClass(this._element, 'show');
    }

    this._cdr.detectChanges();
  }
}
