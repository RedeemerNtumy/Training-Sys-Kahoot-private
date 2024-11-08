import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {

  // Emmitter to be used for triggering button element
  @Output() addCohortClicked: EventEmitter<void> = new EventEmitter<void>();
  
  @Input() title!: string; // eg. Cohort
  @Input() placeholder!: string; //eg name
  @Input() buttonContent: string = 'Add Cohort';
  @Input() hide!: boolean;

  constructor() {}

  onAddClick(): void {
    this.addCohortClicked.emit();
  }



}
