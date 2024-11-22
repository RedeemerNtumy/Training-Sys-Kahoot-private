import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssessmentListComponent } from './view-assessment-list.component';

describe('ViewAssessmentListComponent', () => {
  let component: ViewAssessmentListComponent;
  let fixture: ComponentFixture<ViewAssessmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAssessmentListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAssessmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
