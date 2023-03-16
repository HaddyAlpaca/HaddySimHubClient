import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { SharedModule } from 'src/app/shared/shared.module';

import { TruckDisplayComponent } from './truck-display.component';
import { TruckDashComponentHarness } from './truck-display.component.harness';
import { Component } from '@angular/core';
import { TelemetryService, TelemetryType, TelemetryUpdate } from 'src/app/shared/services/telemetry.service';
import { Subject } from 'rxjs';
import { GearRange, TruckData } from './data';

class MockTelemetryService {
  telemetry$: Subject<TelemetryUpdate> = new Subject<TelemetryUpdate>;
}

@Component({
  template: '<app-truck-display></app-truck-display>',
})
class TruckDisplayTestComponent { }

describe('TruckDisplayComponent', () => {
  let fixture: ComponentFixture<TruckDisplayTestComponent>;
  let data: TruckData;
  let mockTelemetryService: MockTelemetryService;

  beforeEach(async () => {
    mockTelemetryService = new MockTelemetryService();

    //Set default values for the truck data
    data = {
      destination: "",
      distanceRemaining: 0,
      timeRemaining: 0,
      timeRemainingIrl: 0,
      time: new Date(),
      restTimeRemaining: 0,
      restTimeRemainingIrl: 0,
      fuelPercentage: 0,
      fuelDistance: 0,
      jobTimeRemaining: 0,
      jobTimeRemainingIrl: 0,
      jobIncome: 0,
      speed: 0,
      speedLimit: 0,
      rpm: 0,
      rpmMax: 0,
      cruiseControlOn: false,
      cruiseControlSpeed: 0,
      gear: 0,
      gearRange: GearRange.Low,
      lowBeamOn: false,
      highBeamOn: false,
      parkingBrakeOn: false,
      batteryWarningOn: false
    };

    await TestBed.configureTestingModule({
      declarations: [
        TruckDisplayComponent,
        TruckDisplayTestComponent
      ],
      imports: [
        SharedModule
      ],
      providers: [
        { provide: TelemetryService, useValue: mockTelemetryService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruckDisplayTestComponent);
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
