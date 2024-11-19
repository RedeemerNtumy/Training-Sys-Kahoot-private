import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { SpecializationListComponent } from './specialization-list.component';
import { By } from '@angular/platform-browser';
import { SpecializationFacadeService } from '@core/services/specialization-facade/specialization-facade.service';
import { specialization } from '@core/models/specialization.interface';
import { Router } from '@angular/router';

describe('SpecializationListComponent', () => {
  let component: SpecializationListComponent;
  let fixture: ComponentFixture<SpecializationListComponent>;
  let mockSpecializationFacadeService: jest.Mocked<SpecializationFacadeService>;
  let mockRouter: jest.Mocked<Router>;

  const mockSpecializations: specialization[] = [
    {
      id: 1,
      name: 'Test Specialization 1',
      description: 'Description 1',
      prerequisites: [],
      createdAt: '2023-01-01T00:00:00Z'
    },
    {
      id: 2,
      name: 'Test Specialization 2',
      description: 'Description 2',
      prerequisites: [],
      createdAt: '2023-02-01T00:00:00Z'
    },
    {
      id: 3,
      name: 'Test Specialization 3',
      description: 'Description 3',
      prerequisites: [],
      createdAt: '2023-03-01T00:00:00Z'
    }
  ];

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn()
    } as any;

    mockSpecializationFacadeService = {
      specialization$: of(mockSpecializations),
      delete: jest.fn().mockReturnValue(of(undefined))
    } as any;

    await TestBed.configureTestingModule({
      imports: [SpecializationListComponent],
      providers: [
        { provide: SpecializationFacadeService, useValue: mockSpecializationFacadeService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SpecializationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with first page of specializations', () => {
    component.specializations$.subscribe(specs => {
      expect(specs.length).toBe(2); // pageSize is 2
      expect(specs[0].id).toBe(1);
      expect(specs[1].id).toBe(2);
    });
  });

  it('should calculate total pages correctly', () => {
    expect(component.totalPages).toBe(2); // 3 items with pageSize 2 = 2 pages
  });

  describe('Pagination', () => {
    it('should handle page changes', () => {
      component.onPageChange(2);
      component.specializations$.subscribe(specs => {
        expect(specs.length).toBe(1); // Last page with 1 item
        expect(specs[0].id).toBe(3);
      });
    });
  });

  describe('Dropdown handling', () => {
    it('should toggle dropdown', () => {
      const mockEvent = new Event('click');
      component.toggleDropdown(mockEvent, 1);
      expect(component.activeDropdownIndex).toBe(1);

      // Toggle again should close
      component.toggleDropdown(mockEvent, 1);
      expect(component.activeDropdownIndex).toBe(null);
    });

    it('should close dropdown', () => {
      component.activeDropdownIndex = 1;
      component.closeDropdown();
      expect(component.activeDropdownIndex).toBe(null);
    });
  });

  describe('Action handling', () => {
    it('should handle update action', () => {
      const mockEvent = {
        event: new Event('click'),
        action: 'update',
        spec: mockSpecializations[0]
      };

      component.handleAction(mockEvent);
      expect(mockRouter.navigate).toHaveBeenCalledWith(
        ['home', 'admin', 'specialization', 'create'],
        { queryParams: { id: 1 } }
      );
      expect(component.activeDropdownIndex).toBe(null);
    });

    it('should handle delete action', () => {
      const mockEvent = {
        event: new Event('click'),
        action: 'delete',
        spec: mockSpecializations[0]
      };

      component.handleAction(mockEvent);
      expect(component.deleteModalVisible).toBe(true);
      expect(component.selectedSpecializationId).toBe(1);
      expect(component.deleteFeedbackMap.get(1)).toBe(false);
      expect(component.activeDropdownIndex).toBe(null);
    });
  });

  describe('Delete functionality', () => {
    it('should delete specialization', () => {
      component.delete(1);
      expect(mockSpecializationFacadeService.delete).toHaveBeenCalledWith(1);
    });

    it('should handle delete error', () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation();
      mockSpecializationFacadeService.delete.mockReturnValueOnce(
        throwError(() => new Error('Delete failed'))
      );

      component.delete(1);
      expect(consoleError).toHaveBeenCalledWith(
        'Error deleting specialization:',
        expect.any(Error)
      );
      consoleError.mockRestore();
    });

    it('should handle specialization deletion feedback', fakeAsync(() => {
      component.onSpecializationDeleted(1);
      expect(component.deleteFeedbackMap.get(1)).toBe(true);

      tick(2000);
      expect(component.deleteFeedbackMap.has(1)).toBe(false);
    }));
  });

  // Test for event propagation
  describe('Event handling', () => {
    it('should stop event propagation when toggling dropdown', () => {
      const mockEvent = new Event('click');
      const stopPropagationSpy = jest.spyOn(mockEvent, 'stopPropagation');

      component.toggleDropdown(mockEvent, 1);
      expect(stopPropagationSpy).toHaveBeenCalled();
    });

    it('should stop event propagation when handling actions', () => {
      const mockEvent = {
        event: new Event('click'),
        action: 'update',
        spec: mockSpecializations[0]
      };
      const stopPropagationSpy = jest.spyOn(mockEvent.event, 'stopPropagation');

      component.handleAction(mockEvent);
      expect(stopPropagationSpy).toHaveBeenCalled();
    });
  });
});
