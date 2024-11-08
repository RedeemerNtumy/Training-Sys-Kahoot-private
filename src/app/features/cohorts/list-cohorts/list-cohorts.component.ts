import { Component } from '@angular/core';
import { CohortDataService } from '../../../core/services/cohort-data/cohort-data.service';
import { Cohort, CohortList } from '../../../core/models/cohort.interface';
import { Observable } from 'rxjs';
import { AsyncPipe, NgFor, } from '@angular/common';

@Component({
  selector: 'app-list-cohorts',
  standalone: true,
  imports: [AsyncPipe, NgFor],
  templateUrl: './list-cohorts.component.html',
  styleUrl: './list-cohorts.component.scss'
})
export class ListCohortsComponent {
  
  cohortsList$!: Observable<CohortList[]>;

  constructor(
    private cohortDataService: CohortDataService, 
  ) {}

  ngOnInit() {
    this.cohortsList$ = this.cohortDataService.getAllCohorts()
  }


}
