import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoSpecializationAddedComponent } from './no-specialization-added.component';

describe('NoSpecializationAddedComponent', () => {
  let component: NoSpecializationAddedComponent;
  let fixture: ComponentFixture<NoSpecializationAddedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoSpecializationAddedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoSpecializationAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
