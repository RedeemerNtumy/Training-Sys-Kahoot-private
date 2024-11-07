import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerNavigationsComponent } from './trainer-navigations.component';

describe('TrainerNavigationsComponent', () => {
  let component: TrainerNavigationsComponent;
  let fixture: ComponentFixture<TrainerNavigationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerNavigationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainerNavigationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
