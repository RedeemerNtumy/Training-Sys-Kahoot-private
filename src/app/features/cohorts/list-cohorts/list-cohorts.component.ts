import { Component } from '@angular/core';
import { CohortDataService } from '../../../core/services/cohort-data/cohort-data.service';
import { Cohort, CohortList } from '../../../core/models/cohort.interface';
import { Observable } from 'rxjs';
import { AsyncPipe, NgFor, NgIf, } from '@angular/common';
import { SearchbarComponent } from '../../../core/shared/searchbar/searchbar.component';

@Component({
  selector: 'app-list-cohorts',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, SearchbarComponent],
  templateUrl: './list-cohorts.component.html',
  styleUrl: './list-cohorts.component.scss'
})
export class ListCohortsComponent {
  
  cohortsList$!: Observable<CohortList[]> | null;

  constructor(
    private cohortDataService: CohortDataService, 
  ) {}

  ngOnInit() {
    this.cohortsList$ = this.cohortDataService.getAllCohorts()
  }


}
