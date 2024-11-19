import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CohortInfoComponent } from './cohort-info.component';

describe('CohortInfoComponent', () => {
  let component: CohortInfoComponent;
  let fixture: ComponentFixture<CohortInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CohortInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CohortInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
