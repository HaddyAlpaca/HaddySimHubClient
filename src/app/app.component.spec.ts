import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ConnectionStatus, DisplayType, DisplayUpdate, GameDataService } from './services/game-data.service';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { AppComponentHarness } from './app.component.harness';
import { WritableSignal, signal } from '@angular/core';

describe('App component tests', () => {
  let fixture: ComponentFixture<AppComponent>;
  let harness: AppComponentHarness;
  let mockGameDataService: jasmine.SpyObj<GameDataService>;
  let displayUpdate: WritableSignal<DisplayUpdate>;
  let notification: WritableSignal<string>;

  beforeEach(async () => {
    mockGameDataService = setupMockGameDataService();

    await TestBed.configureTestingModule({
      declarations: [],
      providers: [
        { provide: GameDataService, useValue: mockGameDataService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, AppComponentHarness);
  });

  it('Connection state is displayed when no display type is set', async () => {
    displayUpdate.set({ type: DisplayType.None });

    expect(await harness.isRaceDisplayVisible()).toBeFalse();
    expect(await harness.isTruckDisplayVisible()).toBeFalse();
    expect(await harness.isConnectionStatusVisible()).toBeTrue();
  });

  describe('Snackbar tests', () => {
    it('Snackbar is not visible by default', async () => {
      const snackbarHarness = await harness.getSnackBarHarness();

      expect(await snackbarHarness.isVisible()).toBeFalse();
    });

    it('When a notification emits a snackbar is shown', async () => {
      const snackbarHarness = await harness.getSnackBarHarness();
      notification.set('Some message');

      expect(await snackbarHarness.isVisible()).toBeTrue();
      expect(await snackbarHarness.getMessage()).toEqual('Some message');
    });
  });

  const setupMockGameDataService = () => {
    const service = jasmine.createSpyObj<GameDataService>('gameDataService', [
      'notification',
      'displayUpdate',
      'connectionStatus',
    ]);
    displayUpdate = signal<DisplayUpdate>({ type: DisplayType.None });
    service.displayUpdate.and.callFake(displayUpdate);
    notification = signal('');
    service.notification.and.callFake(notification);
    service.connectionStatus.and.returnValue({ status: ConnectionStatus.Connected });

    return service;
  };
});
