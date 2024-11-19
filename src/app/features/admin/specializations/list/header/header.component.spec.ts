import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { SpecializationFacadeService } from '@core/services/specialization-facade/specialization-facade.service';
import { of } from 'rxjs';
import { MatRippleModule } from '@angular/material/core';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockRouter: jest.Mocked<Router>;
  let mockSpecializationFacade: jest.Mocked<SpecializationFacadeService>;

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn()
    } as any;

    mockSpecializationFacade = {
      sortDirection$: of('asc'),
      toggleSort: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [HeaderComponent, MatRippleModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SpecializationFacadeService, useValue: mockSpecializationFacade }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with sort direction from facade service', (done) => {
    component.sortDirection$.subscribe(direction => {
      expect(direction).toBe('asc');
      done();
    });
  });

  it('should navigate to create page when navigateToCreate is called', () => {
    component.navigateToCreate();
    expect(mockRouter.navigate).toHaveBeenCalledWith([
      'home',
      'admin',
      'specialization',
      'create'
    ]);
  });

  it('should call toggleSort on facade service when toggleSort is called', () => {
    component.toggleSort();
    expect(mockSpecializationFacade.toggleSort).toHaveBeenCalled();
  });

  it('should trigger navigation when add button is clicked', () => {
    const addButton = fixture.debugElement.query(By.css('[data-testid="add-button"]'));
    addButton.triggerEventHandler('click', null);
    expect(mockRouter.navigate).toHaveBeenCalled();
  });

  it('should trigger sort toggle when sort button is clicked', () => {
    const sortButton = fixture.debugElement.query(By.css('[data-testid="sort-button"]'));
    sortButton.triggerEventHandler('click', null);
    expect(mockSpecializationFacade.toggleSort).toHaveBeenCalled();
  });

  describe('sort direction display', () => {
    it('should show ascending icon when sort direction is asc', () => {
      mockSpecializationFacade.sortDirection$ = of('asc');
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      const ascIcon = fixture.debugElement.query(By.css('[data-testid="asc-icon"]'));
      const descIcon = fixture.debugElement.query(By.css('[data-testid="desc-icon"]'));

      expect(ascIcon).toBeTruthy();
      expect(descIcon).toBeFalsy();
    });

    it('should show descending icon when sort direction is desc', () => {
      mockSpecializationFacade.sortDirection$ = of('desc');
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      const ascIcon = fixture.debugElement.query(By.css('[data-testid="asc-icon"]'));
      const descIcon = fixture.debugElement.query(By.css('[data-testid="desc-icon"]'));

      expect(ascIcon).toBeFalsy();
      expect(descIcon).toBeTruthy();
    });
  });
});
