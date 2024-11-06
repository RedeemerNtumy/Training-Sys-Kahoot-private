import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CohortsManagementComponent } from './cohorts-management.component';

describe('CohortsManagementComponent', () => {
  let component: CohortsManagementComponent;
  let fixture: ComponentFixture<CohortsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CohortsManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CohortsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
