import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCohortComponent } from './update-cohort.component';

describe('UpdateCohortComponent', () => {
  let component: UpdateCohortComponent;
  let fixture: ComponentFixture<UpdateCohortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCohortComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateCohortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
