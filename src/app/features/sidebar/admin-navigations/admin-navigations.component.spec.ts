import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNavigationsComponent } from './admin-navigations.component';

describe('AdminNavigationsComponent', () => {
  let component: AdminNavigationsComponent;
  let fixture: ComponentFixture<AdminNavigationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminNavigationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminNavigationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
