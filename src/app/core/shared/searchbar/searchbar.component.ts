import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchbarService } from '../../services/searchbar/searchbar.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent implements OnInit {

  // Emmitter to be used for triggering button element
  @Output() addCohortClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() searchChanged: EventEmitter<string> = new EventEmitter<string>();
  
  @Input() title!: string; // eg. Cohort
  @Input() placeholder!: string; //eg name
  @Input() buttonContent: string = 'Add Cohort';
  @Input() hide!: boolean;

  searchValue: string = '';

  constructor(
    public searchbarService: SearchbarService,
  ) {}

  onAddClick(): void {
    this.addCohortClicked.emit();
  }

  ngOnInit() {

  }

  onSearchInput(): void {
    this.searchChanged.emit(this.searchValue);
  }



}
