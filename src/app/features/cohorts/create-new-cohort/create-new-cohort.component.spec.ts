import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewCohortComponent } from './create-new-cohort.component';

describe('CreateNewCohortComponent', () => {
  let component: CreateNewCohortComponent;
  let fixture: ComponentFixture<CreateNewCohortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewCohortComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateNewCohortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
