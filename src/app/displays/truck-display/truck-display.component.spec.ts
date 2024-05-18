import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { TruckDisplayComponent } from './truck-display.component';
import { TruckDashComponentHarness } from './truck-display.component.harness';
import { TruckData } from './truck-data';
import { Component } from '@angular/core';

describe('TruckDisplayComponent', () => {
  let fixture: ComponentFixture<TruckDisplayTestComponent>;
  let component: TruckDisplayTestComponent;
  let data: TruckData;
  let harness: TruckDashComponentHarness;

  beforeEach(async () => {
    //Set default values for the truck data
    data = new TruckData();

    fixture = TestBed.createComponent(TruckDisplayTestComponent);
    component = fixture.componentInstance;
    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, TruckDashComponentHarness);
  });

  it('Departure is displayed', async () => {
    patchData({ sourceCity: 'Berlin', sourceCompany: 'Company B' });
  });

  it('Destination is displayed', async () => {
    patchData({ sourceCity: 'Paris', sourceCompany: 'Company A' });
  });

  it('Gears should be displayed', async () => {
    //Reverse 1
    patchData({ gear: -1 });

    const speedoHarness = await harness.getSpeedoHarness();
    expect(await speedoHarness.getGear()).toEqual('R1');
  });

  it('Fuel distance is displayed', async () => {
    patchData({ fuelDistance: 814 });

    expect(await harness.getElementText('#fuelDistance')).toEqual('814 km');
  });

  describe('Job', () => {
    it('Income should display a placeholder when not set', async () => {
      patchData({ jobIncome: 0 });

      expect(await harness.getElementText('#jobIncome')).toEqual('-');
    });

    it('Income should be displayed jobIncome when set', async () => {
      patchData({ jobIncome: 32_145 });

      expect(await harness.getElementText('#jobIncome')).toEqual('€ 32.145');
    });

    it('Cargo name placeholder is shown when no cargo', async () => {
      patchData({ jobCargoName: '' });

      expect(await harness.getElementText('#jobCargoName')).toEqual('-');
    });

    it('Cargo name is shown', async () => {
      patchData({ jobCargoName: 'Helicopter', jobCargoMass: 2500 });

      expect(await harness.getElementText('#jobCargoName')).toEqual('Helicopter (2.500 kg)');
    });
  });

  const patchData = (value: { [key: string]: unknown; }) => {
    const newData = {
      ...data,
      ...value,
    };

    component.dataSource = newData;
  }
});

@Component({
  template: '<app-truck-display [dataSource]="dataSource" />',
  standalone: true,
  imports: [TruckDisplayComponent],
})
export class TruckDisplayTestComponent {
  public dataSource = new TruckData();
}
