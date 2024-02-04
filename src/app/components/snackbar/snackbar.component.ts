import { ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewEncapsulation, effect, inject } from '@angular/core';
import { GameDataService } from 'src/app/services/game-data.service';

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

  public readonly message = this._gameDataService.notification;

  constructor(
    elementRef: ElementRef,
  ) {
    this._element = elementRef.nativeElement;

    effect(() => {
      if (this._gameDataService.notification()) {
        this.setVisible(true);

        setTimeout(() => {
          this.setVisible(false);
        }, this._timeout);
      }
    })
  }

  private setVisible(value: boolean): void {
    if (value) {
      this._renderer.addClass(this._element, 'show');
    } else {
      this._renderer.removeClass(this._element, 'show');
    }
  }
}
