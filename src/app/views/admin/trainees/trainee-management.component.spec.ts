import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeManagementComponent } from './trainee-management.component';

describe('TraineeManagementComponent', () => {
  let component: TraineeManagementComponent;
  let fixture: ComponentFixture<TraineeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraineeManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TraineeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
