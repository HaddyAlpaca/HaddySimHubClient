import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RaceDisplayComponent } from "./race-display.component";
import { ClockService } from "src/app/services/clock.service";
import { GameDataService } from "src/app/services/game-data.service";
import { BehaviorSubject, Subject, of } from "rxjs";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { RaceDisplayComponentHarness } from "./race-display.component.harness";
import { RaceData } from "./race-data";

describe('Race display component tests', () => {
  let fixture: ComponentFixture<RaceDisplayComponent>;
  let harness: RaceDisplayComponentHarness;
  let mockClockService: jasmine.SpyObj<ClockService>;
  let mockGameDataService: jasmine.SpyObj<GameDataService>;
  let raceDataSubject: Subject<RaceData>;
  let raceData: RaceData;

  beforeEach(async () => {
    //Setup mocks
    mockClockService = setupMockClockSerivce();
    mockGameDataService = setupMockGameDataService();

    await TestBed.configureTestingModule({
      declarations: [],
      providers: [
        { provide: ClockService, useValue: mockClockService },
        { provide: GameDataService, useValue: mockGameDataService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RaceDisplayComponent);
    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, RaceDisplayComponentHarness);
  })

  describe('Laps remaining tests', () => {
    it('When session is a timed session, display only laps completed', async () => {
      patchData({
        isTimedSession: true,
        currentLap: 2
      });

      expect(await harness.getElementText('#laps')).toEqual('2');
    });

    it('When session is not a timed session, display laps completed and total laps', async () => {
      patchData({
        isTimeSession: false,
        currentLap: 2,
        totalLaps: 10
      });

      expect(await harness.getElementText('#laps')).toEqual('2/10');
    });
  });

  describe('Gear tests', () => {
    it('forward gear is displayed', async () => {
      patchData({ gear: 4 });

      expect(await harness.getElementText('.gear')).toEqual('4');
    });

    it('neutral gear is displayed', async () => {
      patchData({ gear: 0 });

      expect(await harness.getElementText('.gear')).toEqual('N');
    });

    it('reverse gear is displayed', async () => {
      patchData({ gear: -1 });

      expect(await harness.getElementText('.gear')).toEqual('R');
    });

    it('Not available gear is handled', async () => {
      patchData({ gear: -2 });

      expect(await harness.getElementText('.gear')).toEqual('N/A');
    });
  });

  it('Speed is displayed', async () => {
    patchData({ speed: 271 });

    expect(await harness.getElementText('#speed')).toEqual('271');
  });

  it('RPM is displayed', async () => {
    patchData({ rpm: 8256 });

    expect(await harness.getElementText('#rpm')).toEqual('8256');
  });

  it('Session type is displayed', async () => {
    patchData({ sessionType: 'Practice' });

    expect(await harness.getElementText('#sessionType')).toEqual('Practice');
  });

  describe('Brake bias tests', () => {
    it('brake bias is displayed', async () => {
      patchData({ brakeBias: 56.2 });

      expect(await harness.getElementText('#brakeBias')).toEqual('56.2');
    });

    it('brake bias without decimal places is displayed with one decimal place', async () => {
      patchData({ brakeBias: 56 });

      expect(await harness.getElementText('#brakeBias')).toEqual('56.0');
    });

    it('brake bias with 2 decimal places is displayed with one decimal place', async () => {
      patchData({ brakeBias: 56.28 });

      expect(await harness.getElementText('#brakeBias')).toEqual('56.3');
    });
  });

  it('Air and track temp are displayed', async () => {
    patchData({ airTemp: 25.3, trackTemp: 32 });

    expect(await harness.getElementText('#temps')).toEqual('25.3°C/32.0°C');
  });

  describe('Last laptime tests', () => {
    it('empty laptime', async () => {
      patchData({ lastLapTime: 0 });

      expect(await harness.getElementText('#lastLapTime')).toEqual('--:--.---');

    });

    it('valid laptime', async () => {
      patchData({ lastLapTime: 94.421 });

      expect(await harness.getElementText('#lastLapTime')).toEqual('01:34.421');

    });
  });

  describe('Best laptime tests', () => {
    it('empty laptime', async () => {
      patchData({ bestLapTime: 0 });

      expect(await harness.getElementText('#bestLapTime')).toEqual('--:--.---');

    });

    it('valid laptime', async () => {
      patchData({ bestLapTime: 92.876 });

      expect(await harness.getElementText('#bestLapTime')).toEqual('01:32.876');
    });
  });

  it('Position is displayed', async () => {
    patchData({ position: 3, numberOfCars: 20 });

    expect(await harness.getElementText('#position')).toEqual('3/20');
  });

  it('Fuel laps are displayed', async () => {
    patchData({ fuelLaps: 14.2 });

    expect(await harness.getElementText('#fuelLaps')).toEqual('14.2');
  });

  it('Remaining session time is displayed', async () => {
    patchData({ sessionTimeRemaining: (60 * 72 + 32) * 1000 });

    expect(await harness.getElementText('#sessionTimeRemaining')).toEqual('01:12:32');
  });

  describe('Delta time', () => {
    it('Delta time is displayed', async () => {
      patchData({ deltaTime: 0.231 });

      expect(await harness.getElementText('#deltaTime')).toEqual('+0.231');
    });

    it('Delta time is green when 0', async () => {
      patchData({ deltaTime: 0 });

      expect(await harness.elementHasClass('#deltaTime', 'text-green')).toBeTrue();
    });

    it('Delta time is green when > 0', async () => {
      patchData({ deltaTime: 0.234 });

      expect(await harness.elementHasClass('#deltaTime', 'text-green')).toBeTrue();
    });

    it('Delta time is green when < 0', async () => {
      patchData({ deltaTime: -0.234 });

      expect(await harness.elementHasClass('#deltaTime', 'text-red')).toBeTrue();
    });
  });

  describe('Driver behind', () => {
    it('Driver name and delta are displayed', async () => {
      patchData({ driverBehind: 'David Coulthard' });

      expect(await harness.getElementText('#driverBehind')).toEqual('David Coulthard');
    });

    it('Block is displayed when driver name is available', async () => {
      patchData({ driverBehind: 'David Coulthard' });

      expect(await harness.elementHasClass('#driverBehindBlock', 'hidden')).toBeFalse();
    });

    it('Block is displayed when driver name is available', async () => {
      patchData({ driverAhead: '' });

      expect(await harness.elementHasClass('#driverBehindBlock', 'hidden')).toBeTrue();
    });

    it('Delta time is displayed', async () => {
      patchData({ gapBehind: 1.2 });

      expect(await harness.getElementText('#gapBehind')).toEqual('1.200');
    });

    it('Delta time is yellow when it is decreased', async () => {
      patchData({ gapBehind: 1.2 });
      patchData({ gapBehind: 1.1 });

      expect(await harness.elementHasClass('#gapBehind', 'text-yellow')).toBeTrue();
    });

    it('Delta time is green when it is increased', async () => {
      patchData({ gapBehind: 1.1 });
      patchData({ gapBehind: 1.3 });

      expect(await harness.elementHasClass('#gapBehind', 'text-green')).toBeTrue();
    });

    it('Delta time has no extra formatting when it has not changed', async () => {
      patchData({ gapBehind: 1.7 });
      patchData({ gapBehind: 1.7 });

      expect(await harness.elementHasClass('#gapBehind', 'text-green')).toBeFalse();
      expect(await harness.elementHasClass('#gapBehind', 'text-yellow')).toBeFalse();
    });
  });

  describe('Driver ahead', () => {
    it('Driver name and delta are displayed', async () => {
      patchData({ driverAhead: 'Enrique Bernoldi' });

      expect(await harness.getElementText('#driverAhead')).toEqual('Enrique Bernoldi');
    });

    it('Block is displayed when driver name is available', async () => {
      patchData({ driverAhead: 'Enrique Bernoldi' });

      expect(await harness.elementHasClass('#driverAheadBlock', 'hidden')).toBeFalse();
    });

    it('Block is displayed when driver name is available', async () => {
      patchData({ driverAhead: '' });

      expect(await harness.elementHasClass('#driverAheadBlock', 'hidden')).toBeTrue();
    });

    it('Delta time is displayed', async () => {
      patchData({ gapAhead: 1.2 });

      expect(await harness.getElementText('#gapAhead')).toEqual('1.200');
    });

    it('Delta time is green when it is decreased', async () => {
      patchData({ gapAhead: 1.2 });
      patchData({ gapAhead: 1.1 });

      expect(await harness.elementHasClass('#gapAhead', 'text-green')).toBeTrue();
    });

    it('Delta time is yellow when it is increased', async () => {
      patchData({ gapAhead: 1.1 });
      patchData({ gapAhead: 1.3 });

      expect(await harness.elementHasClass('#gapAhead', 'text-yellow')).toBeTrue();
    });

    it('Delta time has no extra formatting when it has not changed', async () => {
      patchData({ gapAhead: 1.7 });
      patchData({ gapAhead: 1.7 });

      expect(await harness.elementHasClass('#gapAhead', 'text-green')).toBeFalse();
      expect(await harness.elementHasClass('#gapAhead', 'text-yellow')).toBeFalse();
    });
  });

  it('Throttle percentage is displayed', async () => {
    patchData({ throttlePct: 26 });

      expect(await harness.getValue('#throttle')).toEqual('26');
  });

  it('Brake percentage is displayed', async () => {
      patchData({ brakePct: 43 });

      expect(await harness.getValue('#brake')).toEqual('43');
  });

  describe('Pit limiter', () => {
    it('Pit limter is not shown when off', async () => {
      patchData({ pitLimiterOn: false });

      expect(await harness.hasElement('.pit-limiter')).toBeFalse();
    })

    it('Pit limter is not shown when on', async () => {
      patchData({ pitLimiterOn: true });

      expect(await harness.hasElement('.pit-limiter')).toBeTrue();
    })
  });

  const setupMockClockSerivce = () => {
    const service = jasmine.createSpyObj<ClockService>('clockService', ['getCurrentTime']);
    service.getCurrentTime.and.returnValue(of(new Date()));

    return service;
  }

  const setupMockGameDataService = () => {
    const service = jasmine.createSpyObj<GameDataService>('gameDataService', ['raceData$']);
    raceData = new RaceData();
    raceDataSubject = new BehaviorSubject<RaceData>(raceData);
    service.raceData$ = raceDataSubject.asObservable();

    return service;
  }

  const patchData = (value: { [key: string]: unknown; }) => {
    const data = {
      ...raceData,
      ...value
    };

    raceDataSubject.next(data);
  }
});
