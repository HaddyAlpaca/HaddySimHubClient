import { Component } from '@angular/core';
import { RaceLeaderboardData } from './race-leaderboard.data';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { RaceLeaderboardComponent } from './race-leaderboard.component';
import { ClockService } from 'src/app/services/clock.service';
import { RaceLeaderboardComponentHarness } from './race-leaderboard.component.harness';

describe('RaceLeaderboardComponent tests', () => {
  let fixture: ComponentFixture<RaceLeaderboardTestComponent>;
  let component: RaceLeaderboardTestComponent;
  let mockClockService: jasmine.SpyObj<ClockService>;

  beforeEach(async () => {
    //Setup mocks
    mockClockService = setupMockClockSerivce();

    await TestBed.configureTestingModule({
      declarations: [],
      providers: [
        { provide: ClockService, useValue: mockClockService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RaceLeaderboardTestComponent);
    component = fixture.componentInstance;
  });

  it('Data is displayed', async () => {
    component.data = [{
      position: 1,
      driverName: 'Driver A',
      interval: 0,
    }, {
      position: 2,
      driverName: 'Driver B',
      interval: 1.2,
    }, {
      position: 3,
      driverName: 'Driver C',
      interval: 1.34,
    }]

    const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, RaceLeaderboardComponentHarness);

    expect(await harness.getRowData()).toEqual([]);
  });

  const setupMockClockSerivce = () => {
    const service = jasmine.createSpyObj<ClockService>('clockService', ['time']);
    service.time.and.returnValue(new Date());

    return service;
  }
});

@Component({
  template: '<app-race-leaderboard [dataSource]="data" />',
  standalone: true,
  imports: [RaceLeaderboardComponent],
})
export class RaceLeaderboardTestComponent {
  public data: RaceLeaderboardData[] = [];
}
