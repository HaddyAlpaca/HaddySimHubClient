import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ConnectionStatus, GameDataService, GameDataType } from './services/game-data.service';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { AppComponentHarness } from './app.component.harness';
import { Subject, of } from 'rxjs';
import { RaceData } from './displays/race-display/race-data';

describe('App component tests', () => {
  let fixture: ComponentFixture<AppComponent>;
  let harness: AppComponentHarness;
  let mockGameDataService: jasmine.SpyObj<GameDataService>;
  let connectionStatusSubject: Subject<ConnectionStatus>;
  let gameDataTypeSubject: Subject<GameDataType>;
  let notificationSubject: Subject<string>;

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

  describe('Connection state tests', () => {
    it('Connection state is displayed when no game data type is set', async () => {
      gameDataTypeSubject.next(GameDataType.None);

      expect(await harness.isRaceDisplayVisible()).toBeFalse();
      expect(await harness.isTruckDisplayVisible()).toBeFalse();
      expect(await harness.isConnectionStatusVisible()).toBeTrue();
    });

    it('Disconnected state is displayed', async () => {
      gameDataTypeSubject.next(GameDataType.None);
      connectionStatusSubject.next(ConnectionStatus.Disconnected);

      expect(await harness.getConnectionStatusText()).toEqual('Disconnected');
    });

    it('Connecting state is displayed', async () => {
      gameDataTypeSubject.next(GameDataType.None);
      connectionStatusSubject.next(ConnectionStatus.Connecting);

      expect(await harness.getConnectionStatusText()).toEqual('Connecting...');
    });

    it('Connection error state is displayed', async () => {
      gameDataTypeSubject.next(GameDataType.None);
      connectionStatusSubject.next(ConnectionStatus.ConnectionError);

      expect(await harness.getConnectionStatusText()).toEqual('Error connecting');
    });

    it('Connected state is displayed', async () => {
      gameDataTypeSubject.next(GameDataType.None);
      connectionStatusSubject.next(ConnectionStatus.Connected);

      expect(await harness.getConnectionStatusText()).toEqual('Connected, waiting for game...');
    });
  });

  describe('Snackbar tests', () => {
    it('Snackbar is not visible by default', async () => {
      const snackbarHarness = await harness.getSnackBarHarness();

      expect(await snackbarHarness.isVisible()).toBeFalse();
    });

    it('When a notification emits a snackbar is shown', async () => {
      notificationSubject.next('Some message');

      const snackbarHarness = await harness.getSnackBarHarness();

      expect(await snackbarHarness.isVisible()).toBeTrue();
      expect(await snackbarHarness.getMessage()).toEqual('Some message');
    });
  });

  const setupMockGameDataService = () => {
    const service = jasmine.createSpyObj<GameDataService>('gameDataService', [
      'connectionStatus$',
      'gameDataType$',
      'raceData$',
      'notification$',
    ]);
    connectionStatusSubject = new Subject<ConnectionStatus>();
    service.connectionStatus$ = connectionStatusSubject.asObservable();
    gameDataTypeSubject = new Subject<GameDataType>();
    service.gameDataType$ = gameDataTypeSubject.asObservable();
    service.raceData$ = of(new RaceData());
    notificationSubject = new Subject<string>;
    service.notification$ = notificationSubject.asObservable();

    return service;
  };
});
