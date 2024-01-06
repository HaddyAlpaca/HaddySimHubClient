import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnectionStatus, GameDataService } from 'src/app/services/game-data.service';
import { ConnectionStatusComponent } from './connection-status.component';
import { ConnectionStatusComponentHarness } from './connection-status.component.harness';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

describe('ConnectionStatusComponent tests', () => {
  let fixture: ComponentFixture<ConnectionStatusComponent>;
  let mockGameDataService: jasmine.SpyObj<GameDataService>;

  beforeEach(async () => {
    mockGameDataService = jasmine.createSpyObj<GameDataService>('gameDataService', ['connectionStatus']);

    await TestBed.configureTestingModule({
      declarations: [],
      providers: [
        { provide: GameDataService, useValue: mockGameDataService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectionStatusComponent);
  });

  it('Disconnected state is displayed', async () => {
    mockGameDataService.connectionStatus.and.returnValue(ConnectionStatus.Disconnected);
    const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, ConnectionStatusComponentHarness);

    expect(await harness.getConnectionStatusText()).toEqual('Disconnected');
  });

  it('Connecting state is displayed', async () => {
    mockGameDataService.connectionStatus.and.returnValue(ConnectionStatus.Connecting);
    const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, ConnectionStatusComponentHarness);

    expect(await harness.getConnectionStatusText()).toEqual('Connecting...');
  });

  it('Connection error state is displayed', async () => {
    mockGameDataService.connectionStatus.and.returnValue(ConnectionStatus.ConnectionError);
    const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, ConnectionStatusComponentHarness);

    expect(await harness.getConnectionStatusText()).toEqual('Error connecting');
  });

  it('Connected state is displayed', async () => {
    mockGameDataService.connectionStatus.and.returnValue(ConnectionStatus.Connected);
    const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, ConnectionStatusComponentHarness);

    expect(await harness.getConnectionStatusText()).toEqual('Connected, waiting for game...');
  });
});
