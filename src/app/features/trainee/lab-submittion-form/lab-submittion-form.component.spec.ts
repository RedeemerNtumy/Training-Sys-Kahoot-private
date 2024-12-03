import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabSubmittionFormComponent } from './lab-submittion-form.component';

describe('LabSubmittionFormComponent', () => {
  let component: LabSubmittionFormComponent;
  let fixture: ComponentFixture<LabSubmittionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabSubmittionFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LabSubmittionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
