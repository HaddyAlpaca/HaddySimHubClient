import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { SharedModule } from 'src/app/shared/shared.module';

import { TruckDisplayComponent } from './truck-display.component';
import { TruckDashComponentHarness } from './truck-display.component.harness';
import { TelemetryService, TelemetryType, TelemetryUpdate } from 'src/app/shared/services/telemetry.service';
import { TruckData } from './truck-data';
import { Subject } from 'rxjs';

describe('TruckDisplayComponent', () => {
  let fixture: ComponentFixture<TruckDisplayComponent>;
  let data: TruckData;
  let mockTelemetryService: jasmine.SpyObj<TelemetryService>;

  beforeEach(async () => {
    mockTelemetryService = jasmine.createSpyObj<TelemetryService>('telemetryService', ['telemetry$']);
    mockTelemetryService.telemetry$ = new Subject<TelemetryUpdate>();

    //Set default values for the truck data
    data = new TruckData();

    await TestBed.configureTestingModule({
      declarations: [
        TruckDisplayComponent
      ],
      imports: [
        SharedModule
      ],
      providers: [
        { provide: TelemetryService, useValue: mockTelemetryService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruckDisplayComponent);
  });

  it('Gears should be displayed', async () => {
    const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, TruckDashComponentHarness);

    //Reverse
    data.gear = -1;
    setTelemetry(data);
    expect(await harness.getSelectedGear()).toBe('R1');

    //Neutral
    data.gear = 0;
    setTelemetry(data);
    expect(await harness.getSelectedGear()).toBe('N');

    //First
    data.gear = 1;
    setTelemetry(data);
    expect(await harness.getSelectedGear()).toBe('1');
  });

  const setTelemetry = (data: TruckData): void => {
    mockTelemetryService.telemetry$?.next({
      Type: TelemetryType.Truck,
      Data: data
    });
  }
});
