import { Component } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { CohortList, TraineeList } from '../../../core/models/cohort.interface';
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

  traineeList$!: Observable<TraineeList[]>; 
  filteredTrainees$!: Observable<TraineeList[]>;
  private searchTerm$ = new BehaviorSubject<string>(''); 

  ellipsisClicked: boolean = false;
  selectedTraineeName: string | null = '';

  constructor(
    private cohortDataService: CohortDataService, 
    private router: Router,
  ) {}

  ngOnInit() {
    this.traineeList$ = this.cohortDataService.getSelectedChortTraineeList(0)

    // this.filteredTrainees$ = combineLatest([this.traineeList$, this.searchTerm$]).pipe(
    //   map(([trainees, searchTerm]) =>
    //     trainees.filter(trainee =>
    //       trainee.name.toLowerCase().includes(searchTerm.toLowerCase())
    //     )
    //   )
    // );

    this.filteredTrainees$ = combineLatest([this.traineeList$, this.searchTerm$]).pipe(
      map(([trainees, searchTerm]) => 
        trainees.filter(trainee => {
          const lowerSearchTerm = searchTerm.toLowerCase();
          return (
            trainee.name.toLowerCase().includes(lowerSearchTerm) ||
            trainee.contact.email.toLowerCase().includes(lowerSearchTerm)
          );
        })
      )
    );
  }
  
  // Update search term on changes from the search bar
  onSearchChange(searchTerm: string): void {
    this.searchTerm$.next(searchTerm);
  }

  onSortList() {
    this.filteredTrainees$ = this.filteredTrainees$.pipe(
      map((cohorts: TraineeList[]) => cohorts.sort((a, b) => -1 - 1))
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
