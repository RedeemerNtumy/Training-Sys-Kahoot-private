import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { specialization } from '../../../../../core/models/specialization.interface';
import { DateformatPipe } from '../../../../../core/pipes/dateFormat/dateformat.pipe';


@Component({
  selector: 'app-list-card',
  standalone: true,
  imports: [CommonModule, DateformatPipe],
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent {
  @Input() specialization!: specialization;
  @Input() isDropdownActive = false;
  @Output() dropdownToggled = new EventEmitter<Event>();
  @Output() actionTriggered = new EventEmitter<{event: Event, action: string, spec: specialization}>();

  onToggleDropdown(event: Event): void {
    this.dropdownToggled.emit(event);
  }

  onActionClick(event: Event, action: string): void {
    this.actionTriggered.emit({ event, action, spec: this.specialization });
  }
}
