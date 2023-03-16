import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display-element',
  templateUrl: './display-element.component.html',
  styleUrls: ['./display-element.component.css']
})
export class DisplayElementComponent {
  @Input() title = '';
  @Input() titleColor = '';
  @Input() contentAlign = 'left';
}
