import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { TruckDisplayComponent } from './truck-display.component';
import { TruckDashComponentHarness } from './truck-display.component.harness';
import { TruckData } from './truck-data';
import { GearPipe } from './pipes/gear/gear.pipe';
import { TimespanPipe } from './pipes/timespan/timespan.pipe';
import { GameDataService } from 'src/app/services/game-data.service';
import { Subject, of } from 'rxjs';
import { ClockService } from 'src/app/services/clock.service';

describe('TruckDisplayComponent', () => {
  let fixture: ComponentFixture<TruckDisplayComponent>;
  let data: TruckData;
  let mockGameDataService: jasmine.SpyObj<GameDataService>;
  let mockClockService: jasmine.SpyObj<ClockService>;
  let truckDataSubject: Subject<TruckData>;
  let harness: TruckDashComponentHarness;

  beforeEach(async () => {
    //Set default values for the truck data
    data = new TruckData();

    //Setup mocking services
    mockGameDataService = setupMockGameDataService();
    mockClockService = setupMockClockSerivce();

    await TestBed.configureTestingModule({
      imports: [
        TruckDisplayComponent,
        GearPipe,
        TimespanPipe],
      providers: [
        { provide: ClockService, useValue: mockClockService },
        { provide: GameDataService, useValue: mockGameDataService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruckDisplayComponent);
    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, TruckDashComponentHarness);
  });

  describe('Departure tests', () => {
    it('When city is not set a placeholder is shown', async () => {
      patchData({ sourceCity: '' });

      expect(await harness.getElementText('#departure')).toEqual('-');
    });

    it('City is displayed when company is not set', async () => {
      patchData({ sourceCity: 'Berlin', sourceCompany: '' });

      expect(await harness.getElementText('#departure')).toEqual('Berlin');
    });

    it('City and company are displayed both are set', async () => {
      patchData({ sourceCity: 'Berlin', sourceCompany: 'Company B' });

      expect(await harness.getElementText('#departure')).toEqual('Berlin (Company B)');
    });
  });

  describe('Destination tests', () => {
    it('When city is not set a placeholder is shown', async () => {
      patchData({ destinationCity: '', destinationCompany: '' });

      expect(await harness.getElementText('#destination')).toEqual('-');
    });

    it('City is displayed when company is not set', async () => {
      patchData({ destinationCity: 'Paris', destinationCompany: '' });

      expect(await harness.getElementText('#destination')).toEqual('Paris');
    });

    it('City and company are displayed both are set', async () => {
      patchData({ destinationCity: 'Paris', destinationCompany: 'Company A' });

      expect(await harness.getElementText('#destination')).toEqual('Paris (Company A)');
    });
  });

  it('Gears should be displayed', async () => {
    //Reverse 1
    patchData({ gear: -1 });
    expect(await harness.getElementText('.current-gear')).toEqual('R1');

    //Reverse 2
    patchData({ gear: -2 });
    expect(await harness.getElementText('.current-gear')).toEqual('R2');

    //Neutral
    patchData({ gear: 0 });
    expect(await harness.getElementText('.current-gear')).toEqual('N');

    //First
    patchData({ gear: 1 });
    expect(await harness.getElementText('.current-gear')).toEqual('1');

    //Second
    patchData({ gear: 2 });
    expect(await harness.getElementText('.current-gear')).toEqual('2');
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

      expect(await harness.getElementText('#jobCargoName')).toEqual('Helicopter (2500 kg)');
    });
  });

  const setupMockClockSerivce = () => {
    const service = jasmine.createSpyObj<ClockService>('clockService', ['getCurrentTime']);
    service.getCurrentTime.and.returnValue(of(new Date()));

    return service;
  }

  const setupMockGameDataService = () => {
    const service = jasmine.createSpyObj('gameDataService', ['truckData$']);
    truckDataSubject = new Subject<TruckData>();
    service.truckData$ = truckDataSubject.asObservable();
    return service;
  }

  const patchData = (value: { [key: string]: unknown; }) => {
    const newData = {
      ...data,
      ...value
    };

    truckDataSubject.next(newData);
  }
});
