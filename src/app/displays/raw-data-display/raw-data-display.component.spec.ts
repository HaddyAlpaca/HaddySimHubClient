import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RawDataDisplayComponent } from './raw-data-display.component';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { RawDataDisplayComponentHarness } from './raw-data-display.component.harness';
import { GameDataService } from 'src/app/services/game-data.service';
import { Subject } from 'rxjs';

describe('Raw data display tests', () => {
  let fixture: ComponentFixture<RawDataDisplayComponent>;
  let mockGameDataService: jasmine.SpyObj<GameDataService>;
  let rawDataSubject: Subject<object>;

  beforeEach(async () => {
    //Setup mocks
    mockGameDataService = jasmine.createSpyObj('gameDataService', ['rawData$']);
    rawDataSubject = new Subject<object>();
    mockGameDataService.rawData$ = rawDataSubject.asObservable();

    await TestBed.configureTestingModule({
      imports: [RawDataDisplayComponent],
      providers: [{provide: GameDataService, useValue: mockGameDataService }]
    }).compileComponents();

    fixture = TestBed.createComponent(RawDataDisplayComponent);
  });

  it('Raw data is displayed as key value pairs', async () => {
    const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, RawDataDisplayComponentHarness);

    rawDataSubject.next({
      "Key string": "Value string",
      "Key number": 18,
      "Key boolean": true
    });

    expect(await harness.getKeyValuePairs()).toEqual({
      'Key string': 'Value string',
      'Key number': '18',
      'Key boolean': 'true'
    });
  });
});
