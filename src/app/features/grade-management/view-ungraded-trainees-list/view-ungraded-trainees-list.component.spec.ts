import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUngradedTraineesListComponent } from './view-ungraded-trainees-list.component';

describe('ViewUngradedTraineesListComponent', () => {
  let component: ViewUngradedTraineesListComponent;
  let fixture: ComponentFixture<ViewUngradedTraineesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewUngradedTraineesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewUngradedTraineesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
