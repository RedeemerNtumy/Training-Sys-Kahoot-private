import { Component } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { CohortList } from '../../../core/models/cohort.interface';
import { Router } from '@angular/router';
import { CohortDataService } from '../../../core/services/cohort-data/cohort-data.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { SearchbarComponent } from '../../../core/shared/searchbar/searchbar.component';

@Component({
  selector: 'app-trainees-list',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, SearchbarComponent,],
  templateUrl: './trainees-list.component.html',
  styleUrl: './trainees-list.component.scss'
})
export class TraineesListComponent {

  cohortsList$!: Observable<CohortList[]>; 
  filteredCohorts$!: Observable<CohortList[]>;
  private searchTerm$ = new BehaviorSubject<string>(''); 

  ellipsisClicked: boolean = false;
  selectedCohortName: string | null = '';

  constructor(
    private cohortDataService: CohortDataService, 
    private router: Router,
  ) {}

  ngOnInit() {
    this.cohortsList$ = this.cohortDataService.getAllCohorts()

    this.filteredCohorts$ = combineLatest([this.cohortsList$, this.searchTerm$]).pipe(
      map(([cohorts, searchTerm]) =>
        cohorts.filter(cohort =>
          cohort.cohort.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }
  
  // Update search term on changes from the search bar
  onSearchChange(searchTerm: string): void {
    this.searchTerm$.next(searchTerm);
  }

  onSortList() {
    this.filteredCohorts$ = this.filteredCohorts$.pipe(
      map((cohorts: CohortList[]) => cohorts.sort((a, b) => -1 - 1))
    )
  }

  toggleEllipsis(selectedCohort: string, event:Event) {
    event.stopPropagation();
    this.selectedCohortName = this.selectedCohortName === selectedCohort ? null : selectedCohort;
    if(this.selectedCohortName === null) {
      this.ellipsisClicked = false;
    }
    else if(this.selectedCohortName === selectedCohort) {
      this.ellipsisClicked = true;
    }
  }

  goToCreateCohort() {
    this.router.navigate(['home/admin/cohorts/create-cohort'])
  }

}
