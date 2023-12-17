import { AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";
import { Chart } from "chart.js/auto";

export interface Point {
  brake: number;
  throttle: number;
}

@Component({
  selector: 'app-inputs-trace',
  templateUrl: './inputs-trace.component.html',
  standalone: true
})
export class InputsTraceComponent implements AfterViewInit {
  @ViewChild('lineGraphCanvas') private _lineGraphCanvas!: ElementRef<HTMLCanvasElement>;

  private _lineGraph?: Chart;

  private _maxPoints = 100;
  @Input()
  public set maxPoints(value: number) {
    this._maxPoints = value <= 0 ? 100 : value;
    this.createLineGraph();
  }

  ngAfterViewInit(): void {
    this.createLineGraph();
  }

  public addPoint(point: Point): void {
    if (!this._lineGraph) {
      return;
    }

    //Brake
    if (this._lineGraph.data.datasets[0].data.length === this._maxPoints) {
      this._lineGraph.data.datasets[0].data.shift();
    }
    this._lineGraph.data.datasets[0].data.push(point.brake);

    //Throttle
    if (this._lineGraph.data.datasets[1].data.length === this._maxPoints) {
      this._lineGraph.data.datasets[1].data.shift();
    }
    this._lineGraph.data.datasets[1].data.push(point.throttle);

    this._lineGraph.update('none');
  }

  private createLineGraph(): void {
    if (!this._lineGraphCanvas || !this._lineGraphCanvas.nativeElement) {
      return;
    }

    const ctx: CanvasRenderingContext2D = this._lineGraphCanvas.nativeElement.getContext('2d')!;
    this._lineGraph = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: this._maxPoints }, (value, index) => index),
        datasets: [{
          label: 'Brake trace',
          data: Array.from({ length: this._maxPoints }, () => 0),
          borderColor: 'rgb(255, 0, 0)',
          borderWidth: 5,
          fill: false,
          pointStyle: false,
          tension: .3
        }, {
          label: 'Throttle trace',
          data: Array.from({ length: this._maxPoints }, () => 0),
          borderColor: 'rgb(0, 255, 0)',
          borderWidth: 5,
          fill: false,
          pointStyle: false,
          tension: .3
        }]
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
            y: {
                display: true,
                min: 0,
                max: 100
            },
            x: {
                display: false
            }
        }
      }
    });
  }
}
