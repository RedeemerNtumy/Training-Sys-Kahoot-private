import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGradeHistoryComponent } from './view-grade-history.component';

describe('ViewGradeHistoryComponent', () => {
  let component: ViewGradeHistoryComponent;
  let fixture: ComponentFixture<ViewGradeHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewGradeHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewGradeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
