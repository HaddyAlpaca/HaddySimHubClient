import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-display-group',
    templateUrl: './display-group.component.html',
    styleUrls: ['./display-group.component.css'],
    standalone: true
})
export class DisplayGroupComponent {
  @Input() title = '';
  @Input() borderColor = 'white';
  @Input() data: string | number | undefined;
}
