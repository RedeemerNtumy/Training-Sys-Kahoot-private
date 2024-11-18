import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SpecializationListComponent } from './specialization-list.component';
import { By } from '@angular/platform-browser';
import { SpecializationFacadeService } from '@core/services/specialization-facade/specialization-facade.service';
import { specialization } from '@core/models/specialization.interface';

describe('SpecializationListComponent', () => {
  let component: SpecializationListComponent;
  let fixture: ComponentFixture<SpecializationListComponent>;
  let mockSpecializationFacadeService: jest.Mocked<SpecializationFacadeService>;

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
    }
  ];

  beforeEach(async () => {
    mockSpecializationFacadeService = {
      specialization$: of(mockSpecializations),
      sortDirection$: of('desc'),
      toggleSort: jest.fn(),
      delete: jest.fn().mockReturnValue(of(undefined)),
      getSpecializationById: jest.fn().mockReturnValue(of(mockSpecializations[0]))
    } as any;

    await TestBed.configureTestingModule({
      imports: [SpecializationListComponent],
      providers: [
        { provide: SpecializationFacadeService, useValue: mockSpecializationFacadeService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SpecializationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display list of specializations', () => {
    const specializationElements = fixture.debugElement.queryAll(By.css('.specialization-item'));
    expect(specializationElements.length).toBe(2);
  });

  it('should call toggleSort when sort button is clicked', () => {
    const sortButton = fixture.debugElement.query(By.css('.sort-button'));
    sortButton.triggerEventHandler('click', null);
    expect(mockSpecializationFacadeService.toggleSort).toHaveBeenCalled();
  });

  it('should call delete when delete button is clicked', () => {
    component.delete(1);
    expect(mockSpecializationFacadeService.delete).toHaveBeenCalledWith(1);
  });

  
});
