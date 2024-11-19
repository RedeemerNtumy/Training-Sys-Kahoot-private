import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyChoooseUsComponent } from './why-chooose-us.component';

describe('WhyChoooseUsComponent', () => {
  let component: WhyChoooseUsComponent;
  let fixture: ComponentFixture<WhyChoooseUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyChoooseUsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhyChoooseUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
