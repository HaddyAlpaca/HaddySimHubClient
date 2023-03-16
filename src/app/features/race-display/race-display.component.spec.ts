import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { TelemetryService, TelemetryType, TelemetryUpdate } from 'src/app/shared/services/telemetry.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { DisplayElementComponent } from './display-element.component';
import { DisplayGroupComponent } from './display-group.component';
import { Flag, GripLevel, RaceData, WeatherType } from './race-data';
import { RaceDisplayComponent } from './race-display.component';
import { RaceDisplayComponentHarness } from './race-display.component.harness';

class MockTelemetryService {
  telemetry$: Subject<TelemetryUpdate> = new Subject<TelemetryUpdate>;
}

@Component({
  template: '<app-race-display></app-race-display>'
})
class RaceDisplayTestComponent {
}

describe('Race display component test', () => {
  let fixture: ComponentFixture<RaceDisplayTestComponent>;
  let mockTelemetryService: MockTelemetryService;
  let data: RaceData;

  beforeEach(async () => {
    mockTelemetryService = new MockTelemetryService();

    data = {
      isTimedSession: false,
      completedLaps: 0,
      totalLaps: 0,
      sessionTimeRemaining: 0,
      position: 0,
      numberOfCars: 0,
      speed: 0,
      gear: 0,
      rpm: 0,
      rpmMax: 0,
      gripLevel: GripLevel.Unknown,
      flag: Flag.None,
      weatherType: WeatherType.Unknown,
      trackTemp: 0,
      airTemp: 0,
      fuel: 0,
      fuelPerLap: 0,
      tyreTemps: [0, 0, 0, 0],
      tyrePressures: [0, 0, 0, 0],
      brakeTemps: [0, 0, 0, 0],
      tcLevel: 0,
      absLevel: 0,
      engineMapping: 0,
      brakeBias: 0,
      currentLapTime: 0,
      estimatedLapTime: 0,
      lastLapTime: 0,
      bestLapTime: 0,
      deltaTime: 0,
      gapBehind: 0,
      gapAhead: 0
    };

    await TestBed.configureTestingModule({
      declarations: [
        RaceDisplayComponent,
        RaceDisplayTestComponent,
        DisplayElementComponent,
        DisplayGroupComponent
      ],
      imports: [
        SharedModule
      ],
      providers: [
        { provide: TelemetryService, useValue: mockTelemetryService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaceDisplayTestComponent);
  });

  it('RPM is displayed', async () => {
    const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, RaceDisplayComponentHarness);

    data.rpm = 4800;
    data.rpmMax = 8000;
    setTelemetry(data);

    expect(await harness.getRpm()).toBe('4800');
    expect(await harness.getRpmMax()).toBe('8000');
  });

  it('Speed is displayed', async() => {
    const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, RaceDisplayComponentHarness);

    data.speed = 129;
    setTelemetry(data);

    expect(await harness.getElementText('#speed')).toBe('129');
  });

  it('Forward gears are displayed', async() => {
    const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, RaceDisplayComponentHarness);

    data.gear = 2;
    setTelemetry(data);

    expect(await harness.getElementText('#gear')).toBe('2');
  });

  it('Neutral gear is displayed', async() => {
    const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, RaceDisplayComponentHarness);

    data.gear = 0;
    setTelemetry(data);

    expect(await harness.getElementText('#gear')).toBe('N');
  });

  it('Reverse gear is displayed', async() => {
    const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, RaceDisplayComponentHarness);

    data.gear = -1;
    setTelemetry(data);

    expect(await harness.getElementText('#gear')).toBe('R');
  });

  it('Tyre pressures are displayed', async () => {
    const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, RaceDisplayComponentHarness);

    data.tyrePressures[0] = 26.0;
    data.tyrePressures[1] = 25.0;
    data.tyrePressures[2] = 26.3;
    data.tyrePressures[3] = 25.4;
    setTelemetry(data);

    expect(await harness.getElementText('#tyrePressLf')).toBe('26.0');
    expect(await harness.getElementText('#tyrePressRf')).toBe('25.0');
    expect(await harness.getElementText('#tyrePressLr')).toBe('26.3');
    expect(await harness.getElementText('#tyrePressRr')).toBe('25.4');
  });

  it('Tyre temps are displayed', async () => {
    const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, RaceDisplayComponentHarness);

    data.tyreTemps[0] = 75;
    data.tyreTemps[1] = 64;
    data.tyreTemps[2] = 74;
    data.tyreTemps[3] = 68;
    setTelemetry(data);

    expect(await harness.getElementText('#tyreTempLf')).toBe('75');
    expect(await harness.getElementText('#tyreTempRf')).toBe('64');
    expect(await harness.getElementText('#tyreTempLr')).toBe('74');
    expect(await harness.getElementText('#tyreTempRr')).toBe('68');
  });

  it('Brake temps are displayed', async () => {
    const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, RaceDisplayComponentHarness);

    data.brakeTemps[0] = 214;
    data.brakeTemps[1] = 215;
    data.brakeTemps[2] = 138;
    data.brakeTemps[3] = 139;
    setTelemetry(data);

    expect(await harness.getElementText('#brakeTempLf')).toBe('214');
    expect(await harness.getElementText('#brakeTempRf')).toBe('215');
    expect(await harness.getElementText('#brakeTempLr')).toBe('138');
    expect(await harness.getElementText('#brakeTempRr')).toBe('139');
  });

  it('Remaining fuel is displayed', async() => {
    const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, RaceDisplayComponentHarness);

    data.fuel = 59.6;
    setTelemetry(data);

    expect(await harness.getDisplayElementText('#fuelRemaining')).toBe('59.6');
  });

  it('Fuel per lap is displayed', async() => {
    const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, RaceDisplayComponentHarness);

    data.fuelPerLap = 2.1;
    setTelemetry(data);

    expect(await harness.getDisplayElementText('#fuelPerLap')).toBe('2.1');
  });

  it('Fuel laps remaining is displayed', async() => {
    const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, RaceDisplayComponentHarness);

    data.fuel = 59.6;
    data.fuelPerLap = 2.1;
    setTelemetry(data);

    expect(await harness.getDisplayElementText('#fuelLapsRemaining')).toBe('28.4');
  });

  it('TC level is displayed', async() => {
    const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, RaceDisplayComponentHarness);

    data.tcLevel = 3;
    setTelemetry(data);

    expect(await harness.getDisplayGroupText('#tcLevel')).toBe('3');
  });

  it('Engine mapping is displayed', async() => {
    const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, RaceDisplayComponentHarness);

    data.engineMapping = 4;
    setTelemetry(data);

    expect(await harness.getDisplayGroupText('#engineMapping')).toBe('4');
  });

  it('ABS level is displayed', async() => {
    const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, RaceDisplayComponentHarness);

    data.absLevel = 2;
    setTelemetry(data);

    expect(await harness.getDisplayGroupText('#absLevel')).toBe('2');
  });

  it('Brake bias is displayed', async() => {
    const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, RaceDisplayComponentHarness);

    data.brakeBias = 54;
    setTelemetry(data);

    expect(await harness.getDisplayGroupText('#brakeBias')).toBe('54.0');
  });

  it('Position is displayed', async() => {
    const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, RaceDisplayComponentHarness);

    data.position = 5;
    data.numberOfCars = 12;
    setTelemetry(data);

    expect(await harness.getDisplayGroupText('#position')).toBe('5/12');
  });

  it('Current laptime is displayed', async() => {
    const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, RaceDisplayComponentHarness);

    //00:31.426
    data.currentLapTime = 31 * 1000 + 426;
    setTelemetry(data);

    expect(await harness.getDisplayElementText('#currentLapTime')).toBe('00:31.426');
  });

  it('Predicted laptime is displayed', async() => {
    const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, RaceDisplayComponentHarness);

    //02:34.123
    data.estimatedLapTime = 2 * 60000 + 34 * 1000 + 123;
    setTelemetry(data);

    expect(await harness.getDisplayElementText('#predictedLapTime')).toBe('02:34.123');
  });

  it('Last laptime is displayed', async() => {
    const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, RaceDisplayComponentHarness);

    //01:38.597
    data.lastLapTime = 1 * 60000 + 38 * 1000 + 597;
    setTelemetry(data);

    expect(await harness.getDisplayElementText('#lastLapTime')).toBe('01:38.597');
  });

  it('Last laptime is displayed', async() => {
    const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, RaceDisplayComponentHarness);

    //01:32.864
    data.bestLapTime = 1 * 60000 + 32 * 1000 + 864;
    setTelemetry(data);

    expect(await harness.getDisplayElementText('#bestLapTime')).toBe('01:32.864');
  });

  const setTelemetry = (data: RaceData): void => {
    mockTelemetryService.telemetry$?.next({
      Type: TelemetryType.Race,
      Data: data
    });
  };
});
