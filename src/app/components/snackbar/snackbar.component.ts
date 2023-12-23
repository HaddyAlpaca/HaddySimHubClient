import { Component, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, filter, switchMap, tap, timer } from 'rxjs';
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
  private readonly _debounceTime = 250;
  private readonly _timeout = 5000;
  private readonly _element: HTMLElement;

  private _message = '';
  public get message(): string {
    return this._message;
  }

  constructor(
    elementRef: ElementRef,
    gameDataService: GameDataService,
    private _renderer: Renderer2,
  ) {
    this._element = elementRef.nativeElement;

    gameDataService.notification$.pipe(
      debounceTime(this._debounceTime),
      filter(message => !!message),
      tap(message => {
        this._message = message;
        this.setVisible(true);
      }),
      switchMap(() => timer(this._timeout)),
      tap(() => this.setVisible(false)),
      untilDestroyed(this),
    ).subscribe();
  }

  private setVisible(value: boolean): void {
    if (value) {
      this._renderer.addClass(this._element, 'show');
    } else {
      this._renderer.removeClass(this._element, 'show');
    }
  }
}
