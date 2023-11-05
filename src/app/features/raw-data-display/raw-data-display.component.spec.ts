import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RawDataDisplayComponent } from './raw-data-display.component';
import { TelemetryService } from 'src/app/shared/services';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { RawDataDisplayComponentHarness } from './raw-data-display.component.harness';
import { Subject } from 'rxjs';
import { TelemetryType, TelemetryUpdate } from 'src/app/shared/services/telemetry.service';

describe('Raw data display tests', () => {
  let fixture: ComponentFixture<RawDataDisplayComponent>;
  let mockTelemetryService: jasmine.SpyObj<TelemetryService>;

  beforeEach(async () => {
    mockTelemetryService = jasmine.createSpyObj<TelemetryService>('telemetryService', ['telemetry$']);
    mockTelemetryService.telemetry$ = new Subject<TelemetryUpdate>();

    await TestBed.configureTestingModule({
      declarations: [RawDataDisplayComponent],
      imports: [],
      providers: [
        { provide: TelemetryService, useValue: mockTelemetryService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RawDataDisplayComponent);
  });

  it('Raw data is displayed as key value pairs', async () => {
    const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, RawDataDisplayComponentHarness);

    setTelemetry({
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

  const setTelemetry = (data: unknown): void => {
    mockTelemetryService.telemetry$?.next({
      Type: TelemetryType.RawData,
      Data: data
    });
  };
});
