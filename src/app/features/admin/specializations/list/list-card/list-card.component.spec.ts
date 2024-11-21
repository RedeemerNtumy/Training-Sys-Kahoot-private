import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule, DatePipe } from '@angular/common';
import { ListCardComponent } from './list-card.component';
import { specialization } from '@core/models/specialization.interface';

describe('ListCardComponent', () => {
  let component: ListCardComponent;
  let fixture: ComponentFixture<ListCardComponent>;

  const mockSpecialization: specialization = {
    id: 1,
    name: 'Test Specialization',
    description: 'Test Description',
    prerequisites: ['Prerequisite 1', 'Prerequisite 2'],
    createdAt: '2024-01-01',
    traineesCount: 10
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCardComponent, CommonModule, DatePipe]
    }).compileComponents();

    fixture = TestBed.createComponent(ListCardComponent);
    component = fixture.componentInstance;
    component.specialization = mockSpecialization;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Event handlers', () => {
    it('should emit dropdownToggled event with the original event object when onToggleDropdown is called', () => {
      const emitSpy = jest.spyOn(component.dropdownToggled, 'emit');
      const mockEvent = new MouseEvent('click');

      component.onToggleDropdown(mockEvent);
      expect(emitSpy).toHaveBeenCalledTimes(1);
      expect(emitSpy).toHaveBeenCalledWith(mockEvent);


      component.dropdownToggled.subscribe((emittedEvent) => {
        expect(emittedEvent).toBe(mockEvent);
      });
    });

    it('should emit actionTriggered event with correct payload when onActionClick is called', () => {

      const emitSpy = jest.spyOn(component.actionTriggered, 'emit');


      const mockEvent = new MouseEvent('click');
      const mockAction = 'edit';
      const expectedPayload = {
        event: mockEvent,
        action: mockAction,
        spec: mockSpecialization
      };


      component.onActionClick(mockEvent, mockAction);


      expect(emitSpy).toHaveBeenCalledTimes(1);
      expect(emitSpy).toHaveBeenCalledWith(expectedPayload);


      component.actionTriggered.subscribe((emittedData) => {
        expect(emittedData).toEqual(expectedPayload);
        expect(emittedData.event).toBe(mockEvent);
        expect(emittedData.action).toBe(mockAction);
        expect(emittedData.spec).toEqual(mockSpecialization);
      });
    });

    it('should handle different types of events in onToggleDropdown', () => {
      const emitSpy = jest.spyOn(component.dropdownToggled, 'emit');


      const events = [
        new MouseEvent('click'),
        new MouseEvent('mousedown'),
        new KeyboardEvent('keydown', { key: 'Enter' })
      ];

      events.forEach(event => {
        component.onToggleDropdown(event);
        expect(emitSpy).toHaveBeenCalledWith(event);
      });

      expect(emitSpy).toHaveBeenCalledTimes(events.length);
    });

    it('should handle different action types in onActionClick', () => {
      const emitSpy = jest.spyOn(component.actionTriggered, 'emit');
      const mockEvent = new MouseEvent('click');


      const actions = ['edit', 'delete', ];

      actions.forEach(action => {
        component.onActionClick(mockEvent, action);
        expect(emitSpy).toHaveBeenCalledWith({
          event: mockEvent,
          action,
          spec: mockSpecialization
        });
      });

      expect(emitSpy).toHaveBeenCalledTimes(actions.length);
    });

    it('should maintain event object integrity when emitting events', () => {

      const dropdownEvent = new MouseEvent('click', {
        clientX: 100,
        clientY: 200,
        bubbles: true
      });

      component.dropdownToggled.subscribe((emittedEvent: MouseEvent) => {
        expect(emittedEvent.clientX).toBe(100);
        expect(emittedEvent.clientY).toBe(200);
        expect(emittedEvent.bubbles).toBe(true);
      });

      component.onToggleDropdown(dropdownEvent);
      const actionEvent = new MouseEvent('click', {
        clientX: 150,
        clientY: 250,
        bubbles: true
      });

      component.actionTriggered.subscribe((emitted) => {
        expect((emitted.event as MouseEvent).clientX).toBe(150);
        expect((emitted.event as MouseEvent).clientY).toBe(250);
        expect((emitted.event as MouseEvent).bubbles).toBe(true);
      });

      component.onActionClick(actionEvent, 'edit');
    });
  });


});
