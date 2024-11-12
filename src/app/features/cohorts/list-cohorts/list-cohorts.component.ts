import { Component } from '@angular/core';
import { CohortDataService } from '../../../core/services/cohort-data/cohort-data.service';
import { Cohort, CohortList } from '../../../core/models/cohort.interface';
import { BehaviorSubject, Observable, combineLatest, map, of } from 'rxjs';
import { AsyncPipe, NgFor, NgIf, } from '@angular/common';
import { SearchbarComponent } from '../../../core/shared/searchbar/searchbar.component';
import { Router, } from '@angular/router';

@Component({
  selector: 'app-list-cohorts',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, SearchbarComponent,],
  templateUrl: './list-cohorts.component.html',
  styleUrl: './list-cohorts.component.scss'
})
export class ListCohortsComponent {
  
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
          cohort.name.toLowerCase().includes(searchTerm.toLowerCase())
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

  //Get the Id of selected Cohort from list and make http request to get all details for cohort
  getSelectedCohortDetails(selectedCohortId: string) { 
    this.cohortDataService.selectedCohortId = selectedCohortId;
    this.goToTraineesList()
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

  // Set data into form and route to edit cohort component
  updateCohort(id: string) {
    this.cohortDataService.selectedCohortForUpdate = id;
    this.goToUpdateCohort();
  }

  // Delete item from cohort list
  deleteCohort(id : string) {
    this.cohortDataService.deleteCohort(id).subscribe({
      next: (response) => {
        console.log("successfully deleted cohort", response)
      },
      error: (error) => {
        console.log("error deleting cohort: ", error)
      }
    })
  }

  goToCreateCohort() {
    this.router.navigate(['home/admin/cohorts/create-cohort'])
  }

  goToUpdateCohort() {
    this.router.navigate(['/home/admin/cohorts/update-cohort'])
  }

  goToTraineesList() {
    this.router.navigate(['/home/admin/cohorts/trainees-list'])
  }


}
