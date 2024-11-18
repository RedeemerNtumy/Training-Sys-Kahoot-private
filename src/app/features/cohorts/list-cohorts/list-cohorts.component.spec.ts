import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCohortsComponent } from './list-cohorts.component';

describe('ListCohortsComponent', () => {
  let component: ListCohortsComponent;
  let fixture: ComponentFixture<ListCohortsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCohortsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListCohortsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
