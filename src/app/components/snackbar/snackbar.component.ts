import { Component, ElementRef, Renderer2, ViewEncapsulation, effect, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { take, tap, timer } from 'rxjs';
import { GameDataService } from 'src/app/services/game-data.service';

@UntilDestroy()
@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrl: 'snackbar.component.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class SnackBarComponent {
  private readonly _timeout = 5000;
  private readonly _element: HTMLElement;
  private _gameDataService = inject(GameDataService);
  private _renderer = inject(Renderer2);

  private _message = '';
  public get message(): string {
    return this._message;
  }

  constructor(
    elementRef: ElementRef,
  ) {
    this._element = elementRef.nativeElement;

    effect(() => {
      const message = this._gameDataService.notification();

      if (message) {
        this.setVisible(true);
        timer(this._timeout).pipe(
          take(1),
          tap(() => this.setVisible(false)),
          untilDestroyed(this),
        ).subscribe();
      } else {
        this.setVisible(false);
      }
    });
  }

  private setVisible(value: boolean): void {
    if (value) {
      this._renderer.addClass(this._element, 'show');
    } else {
      this._renderer.removeClass(this._element, 'show');
    }
  }
}
