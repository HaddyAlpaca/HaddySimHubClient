import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackPositionsComponent } from './track-positions.component';
import { TrackPositionsComponentHarness } from './track-positions.component.harness';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

describe('TrackPositionsComponent tests', () => {
  let fixture: ComponentFixture<TrackPositionsComponent>;
  let harness: TrackPositionsComponentHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackPositionsComponent);
    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, TrackPositionsComponentHarness);
  });

  it('locates the track position elements correctly', async () => {
    const items = await harness.getTrackItems();

  });
});
