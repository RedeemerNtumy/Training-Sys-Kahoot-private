import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {
  
  @Input() title!: string; // eg. Cohort
  @Input() placeholder!: string; //eg name
  @Input() buttonContent: string = 'Add Cohort';
  @Input() hide!: boolean;

  constructor() {}

}
