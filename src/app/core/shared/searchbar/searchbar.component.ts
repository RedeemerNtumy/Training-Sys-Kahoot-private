import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchbarService } from '../../services/searchbar/searchbar.service';
import { FormsModule } from '@angular/forms';
import { CohortDataService } from '../../services/cohort-data/cohort-data.service';

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
  @Output() sortClicked: EventEmitter<void> = new EventEmitter<void>();

  @Output() activeStatus: EventEmitter<void> = new EventEmitter<void>();
  @Output() inactiveStatus: EventEmitter<void> = new EventEmitter<void>();
  @Output() deactivatedStatus: EventEmitter<void> = new EventEmitter<void>();
  
  @Input() title!: string; // eg. Cohort
  @Input() placeholder!: string; //eg name
  @Input() buttonContent: string = 'Add Cohort';
  @Input() hide!: boolean;

  searchValue: string = '';
  filterVisible: boolean = false;

  constructor(
    public searchbarService: SearchbarService,
    public cohortDataService: CohortDataService,
  ) {}

  onAddClick(): void {
    this.addCohortClicked.emit();
  }

  ngOnInit() {

  }

  onSearchInput(): void {
    this.searchChanged.emit(this.searchValue);
  }

  onSortClicked(): void {
    this.sortClicked.emit()
  }

  onActiveClicked(): void {
    this.activeStatus.emit();
  }

  onInactiveClicked(): void {
    this.inactiveStatus.emit();
  }

  onDeactivedClicked(): void {
    this.deactivatedStatus.emit();
  }


  toggleFilter() {
    this.filterVisible = !this.filterVisible;
    console.log(this.filterVisible);
  }




}
