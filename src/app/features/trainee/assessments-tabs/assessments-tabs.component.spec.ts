import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentsTabsComponent } from './assessments-tabs.component';

describe('AssessmentsTabsComponent', () => {
  let component: AssessmentsTabsComponent;
  let fixture: ComponentFixture<AssessmentsTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentsTabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
