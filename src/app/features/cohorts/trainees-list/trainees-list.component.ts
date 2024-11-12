import { Component } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, filter, map } from 'rxjs';
import { CohortDetails, CohortList, Trainees } from '../../../core/models/cohort.interface';
import { Router } from '@angular/router';
import { CohortDataService } from '../../../core/services/cohort-data/cohort-data.service';
import { AsyncPipe, CommonModule, JsonPipe, NgFor, NgIf } from '@angular/common';
import { SearchbarComponent } from '../../../core/shared/searchbar/searchbar.component';

@Component({
  selector: 'app-trainees-list',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, SearchbarComponent, JsonPipe],
  templateUrl: './trainees-list.component.html',
  styleUrl: './trainees-list.component.scss'
})
export class TraineesListComponent {

  cohort$!: Observable<CohortDetails>; 
  filteredTrainees$!: Observable<Trainees[]>;
  private searchTerm$ = new BehaviorSubject<string>(''); 
  private activeFilter$!: Observable<Trainees[]>;

  ellipsisClicked: boolean = false;
  selectedTraineeName: string | null = '';

  constructor(
    private cohortDataService: CohortDataService, 
    private router: Router,
  ) {}

  ngOnInit() {
    // Get cohort details with trainees list from service
    this.cohort$ = this.cohortDataService.getSelectedCohortDetails();

    this.filteredTrainees$ = combineLatest([this.cohort$, this.searchTerm$]).pipe(
      map(([cohort, searchTerm]) => {
        return cohort.trainees.filter((trainee: any) => {
          const lowerSearchTerm = searchTerm.toLowerCase();
          return (
            trainee.fullName.toLowerCase().includes(lowerSearchTerm) ||
            trainee.email.toLowerCase().includes(lowerSearchTerm)
          );
        });
      })
    );
  }
  
  // Update search term on changes from the search bar
  onSearchChange(searchTerm: string): void {
    this.searchTerm$.next(searchTerm);
  }

  onSortList() {
    this.filteredTrainees$ = this.filteredTrainees$.pipe(
      map((cohorts: Trainees[]) => cohorts.sort((a, b) => -1 - 1))
    )
  }

  filterByActive() {
    this.filteredTrainees$.pipe(
      map((cohorts: Trainees[]) => cohorts.filter(cohort => cohort.status === 'active'))
    )
  }

  filterByInactive() {
    this.filteredTrainees$.pipe(
      map((cohorts: Trainees[]) => cohorts.filter(cohort => cohort.status === 'inactive'))
    )
  }

  toggleEllipsis(selectedTrainee: string, event:Event) {
    event.stopPropagation();
    this.selectedTraineeName = this.selectedTraineeName === selectedTrainee ? null : selectedTrainee;
    if(this.selectedTraineeName === null) {
      this.ellipsisClicked = false;
    }
    else if(this.selectedTraineeName === selectedTrainee) {
      this.ellipsisClicked = true;
    }
  }

  goToCreateCohort() {
    this.router.navigate(['home/admin/cohorts/create-cohort'])
  }

}


