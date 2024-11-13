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
  private statusFilter$ = new BehaviorSubject<string | null>(null);
  private specializationFilter$ = new BehaviorSubject<string | null>(null);

  ellipsisClicked: boolean = false;
  selectedTraineeName: string | null = '';

  constructor(
    private cohortDataService: CohortDataService, 
    private router: Router,
  ) {}

  ngOnInit() {
    // Get cohort details with trainees list from service
    this.cohort$ = this.cohortDataService.getSelectedCohortDetails(); 

    this.filteredTrainees$ = combineLatest([this.cohort$, this.searchTerm$, this.statusFilter$, this.specializationFilter$]).pipe(
      map(([cohort, searchTerm, statusFilter, specFilter]) => {
        return cohort.trainees.filter((trainee: Trainees) => {
          const lowerSearchTerm = searchTerm.toLowerCase();
          const matchesSearch = trainee.fullName.toLowerCase().includes(lowerSearchTerm) || 
                                trainee.email.toLowerCase().includes(lowerSearchTerm);
          const matchesStatus = statusFilter ? trainee.status === statusFilter : true;
          const matchesSpecialization = specFilter ? trainee.specialization === specFilter : true;
          
          return matchesSearch && matchesStatus && matchesSpecialization;
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
      map((trainees: Trainees[]) => trainees.sort((a, b) => a.fullName.localeCompare(b.fullName)))
    );
  }
  
  // Set the filter for each status and trigger re-evaluation
  filterByActive() {
    this.statusFilter$.next('Active');
  }
  
  filterByInactive() {
    this.statusFilter$.next('Inactive');
  }
  
  filterByDeactivated() {
    this.statusFilter$.next('Deactivated');
  }

  clearStatusFilter() {
    this.statusFilter$.next(null);
  }

  filterBySpecialization(spec: string) {
    this.specializationFilter$.next(spec)
  }

  clearSpecializationFilter() {
    this.specializationFilter$.next(null);
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


