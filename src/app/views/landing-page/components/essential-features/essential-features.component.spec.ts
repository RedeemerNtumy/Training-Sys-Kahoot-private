import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EssentialFeaturesComponent } from './essential-features.component';

describe('EssentialFeaturesComponent', () => {
  let component: EssentialFeaturesComponent;
  let fixture: ComponentFixture<EssentialFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EssentialFeaturesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EssentialFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
