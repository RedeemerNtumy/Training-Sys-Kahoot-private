import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackInfoCardComponent } from './track-info-card.component';

describe('TrackInfoCardComponent', () => {
  let component: TrackInfoCardComponent;
  let fixture: ComponentFixture<TrackInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackInfoCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrackInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
