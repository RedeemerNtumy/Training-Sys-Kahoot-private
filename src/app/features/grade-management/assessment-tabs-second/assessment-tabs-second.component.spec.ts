import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentTabsSecondComponent } from './assessment-tabs-second.component';

describe('AssessmentTabsSecondComponent', () => {
  let component: AssessmentTabsSecondComponent;
  let fixture: ComponentFixture<AssessmentTabsSecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentTabsSecondComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentTabsSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
