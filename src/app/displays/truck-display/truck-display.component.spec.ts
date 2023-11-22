import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { TruckDisplayComponent } from './truck-display.component';
import { TruckDashComponentHarness } from './truck-display.component.harness';
import { TruckData } from './truck-data';
import { GearPipe } from './pipes/gear/gear.pipe';
import { TimespanPipe } from './pipes/timespan/timespan.pipe';
import { GameDataService } from 'src/app/services/game-data.service';
import { Subject } from 'rxjs';

describe('TruckDisplayComponent', () => {
  let fixture: ComponentFixture<TruckDisplayComponent>;
  let data: TruckData;
  let mockGameDataService: jasmine.SpyObj<GameDataService>;
  let truckDataSubject: Subject<TruckData>;

  beforeEach(async () => {
    //Set default values for the truck data
    data = new TruckData();

    //Setup mocking services
    mockGameDataService = jasmine.createSpyObj('gameDataService', ['truckData$']);
    truckDataSubject = new Subject<TruckData>();
    mockGameDataService.truckData$ = truckDataSubject.asObservable();

    await TestBed.configureTestingModule({
      imports: [
        TruckDisplayComponent,
        GearPipe,
        TimespanPipe],
      providers: [{ provide: GameDataService, useValue: mockGameDataService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruckDisplayComponent);
  });

  describe('Departure tests', () => {
    it('When city is not set a placeholder is shown', async () => {
      const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, TruckDashComponentHarness);

      data.departureCity = '';
      data.departureCity = '';
      truckDataSubject.next(data);

      expect(await harness.getDeparture()).toEqual('-');
    });

    it('City is displayed when company is not set', async () => {
      const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, TruckDashComponentHarness);

      data.departureCity = 'Berlin';
      data.departureCompany = '';
      truckDataSubject.next(data);

      expect(await harness.getDeparture()).toEqual('Berlin');
    });

    it('City and company are displayed both are set', async () => {
      const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, TruckDashComponentHarness);

      data.departureCity = 'Berlin';
      data.departureCompany = 'Company B';
      truckDataSubject.next(data);

      expect(await harness.getDeparture()).toEqual('Berlin (Company B)');
    });
  });

  describe('Destination tests', () => {
    it('When city is not set a placeholder is shown', async () => {
      const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, TruckDashComponentHarness);

      data.destinationCity = '';
      data.destinationCompany = '';
      truckDataSubject.next(data);

      expect(await harness.getDestination()).toEqual('-');
    });

    it('City is displayed when company is not set', async () => {
      const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, TruckDashComponentHarness);

      data.destinationCity = 'Paris';
      data.destinationCompany = '';
      truckDataSubject.next(data);

      expect(await harness.getDestination()).toEqual('Paris');
    });

    it('City and company are displayed both are set', async () => {
      const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, TruckDashComponentHarness);

      data.destinationCity = 'Paris';
      data.destinationCompany = 'Company A';
      truckDataSubject.next(data);

      expect(await harness.getDestination()).toEqual('Paris (Company A)');
    });
  });

  it('Gears should be displayed', async () => {
    const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, TruckDashComponentHarness);

    //Reverse 1
    data.gear = -1;
    truckDataSubject.next(data);
    expect(await harness.getSelectedGear()).toEqual('R1');

    //Reverse 2
    data.gear = -2;
    truckDataSubject.next(data);
    expect(await harness.getSelectedGear()).toEqual('R2');

    //Neutral
    data.gear = 0;
    truckDataSubject.next(data);
    expect(await harness.getSelectedGear()).toEqual('N');

    //First
    data.gear = 1;
    truckDataSubject.next(data);
    expect(await harness.getSelectedGear()).toEqual('1');

    //Seconde
    data.gear = 2;
    truckDataSubject.next(data);
    expect(await harness.getSelectedGear()).toEqual('2');
  });
});
