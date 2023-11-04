import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { SharedModule } from 'src/app/shared/shared.module';

import { TruckDisplayComponent } from './truck-display.component';
import { TruckDashComponentHarness } from './truck-display.component.harness';
import { Component } from '@angular/core';
import { TelemetryService, TelemetryType, TelemetryUpdate } from 'src/app/shared/services/telemetry.service';
import { Subject } from 'rxjs';
import { TruckData } from './truck-data';

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
    data = new TruckData();

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

  describe('Departure tests', () => {
    it('When city is not set a placeholder is shown', async () => {
      const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, TruckDashComponentHarness);

      data.departureCity = '';
      data.departureCity = '';
      setTelemetry(data);

      expect(await harness.getDeparture()).toEqual('-');
    });

    it('City is displayed when company is not set', async () => {
      const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, TruckDashComponentHarness);

      data.departureCity = 'Berlin';
      data.departureCompany = '';
      setTelemetry(data);

      expect(await harness.getDeparture()).toEqual('Berlin');
    });

    it('City and company are displayed both are set', async () => {
      const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, TruckDashComponentHarness);

      data.departureCity = 'Berlin';
      data.departureCompany = 'Company B';
      setTelemetry(data);

      expect(await harness.getDeparture()).toEqual('Berlin (Company B)');
    });
  });

  describe('Destination tests', () => {
    it('When city is not set a placeholder is shown', async () => {
      const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, TruckDashComponentHarness);

      data.destinationCity = '';
      data.destinationCompany = '';
      setTelemetry(data);

      expect(await harness.getDestination()).toEqual('-');
    });

    it('City is displayed when company is not set', async () => {
      const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, TruckDashComponentHarness);

      data.destinationCity = 'Paris';
      data.destinationCompany = '';
      setTelemetry(data);

      expect(await harness.getDestination()).toEqual('Paris');
    });

    it('City and company are displayed both are set', async () => {
      const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, TruckDashComponentHarness);

      data.destinationCity = 'Paris';
      data.destinationCompany = 'Company A';
      setTelemetry(data);

      expect(await harness.getDestination()).toEqual('Paris (Company A)');
    });
  });

  it('Gears should be displayed', async () => {
    const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, TruckDashComponentHarness);

    //Reverse 1
    data.gear = -1;
    setTelemetry(data);
    expect(await harness.getSelectedGear()).toEqual('R1');

    //Reverse 2
    data.gear = -2;
    setTelemetry(data);
    expect(await harness.getSelectedGear()).toEqual('R2');

    //Neutral
    data.gear = 0;
    setTelemetry(data);
    expect(await harness.getSelectedGear()).toEqual('N');

    //First
    data.gear = 1;
    setTelemetry(data);
    expect(await harness.getSelectedGear()).toEqual('1');

    //Seconde
    data.gear = 2;
    setTelemetry(data);
    expect(await harness.getSelectedGear()).toEqual('2');
  });

  const setTelemetry = (data: TruckData): void => {
    mockTelemetryService.telemetry$?.next({
      Type: TelemetryType.Truck,
      Data: data
    });
  }
});
