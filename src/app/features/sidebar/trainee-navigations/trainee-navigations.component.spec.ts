import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeNavigationsComponent } from './trainee-navigations.component';

describe('TraineeNavigationsComponent', () => {
  let component: TraineeNavigationsComponent;
  let fixture: ComponentFixture<TraineeNavigationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraineeNavigationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TraineeNavigationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
